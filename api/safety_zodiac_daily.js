const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  // ─────────────────────────────
  // CORS
  // ─────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ─────────────────────────────
  // Query Params
  // ─────────────────────────────
  const { sign, lang } = req.query;

  const targetLang = lang || 'en';
  const zodiacSign = sign || 'Aries';

  const apiKey = process.env.SAFETY_ZODIAC_DAILY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Missing Gemini API Key'
    });
  }

  // ─────────────────────────────
  // Cache Key
  // ─────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `zodiac:${targetLang}:${today}`;

  try {
    // ==================================================
    // 1. TRY CACHE FIRST
    // ==================================================
    const cachedData = await kv.get(cacheKey);

    if (
      cachedData &&
      cachedData.forecasts &&
      cachedData.forecasts[zodiacSign]
    ) {
      return res.status(200).json({
        source: 'cache',
        planetary_context: cachedData.planetary_context,
        ...cachedData.forecasts[zodiacSign]
      });
    }

    // ==================================================
    // 2. FETCH FROM GEMINI
    // ==================================================
    const prompt = `
Today is ${today}.

You are Stay Safe Elite Cosmic Security Analyst.

Create a modern digital-security horoscope for ALL 12 zodiac signs.

Language: ${targetLang}

Return ONLY valid JSON.

{
  "planetary_context":"max 20 words",
  "forecasts":{
    "Aries":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Taurus":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Gemini":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Cancer":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Leo":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Virgo":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Libra":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Scorpio":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Sagittarius":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Capricorn":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Aquarius":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60},
    "Pisces":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60}
  }
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error('Gemini returned empty response');
    }

    let rawText = data.candidates[0].content.parts[0].text;

    rawText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const allForecasts = JSON.parse(rawText);

    // ==================================================
    // 3. SAVE TO CACHE
    // ==================================================
    await kv.set(cacheKey, allForecasts, {
      ex: 86400
    });

    // ==================================================
    // 4. RETURN SELECTED SIGN
    // ==================================================
    if (!allForecasts.forecasts[zodiacSign]) {
      return res.status(400).json({
        error: 'Invalid zodiac sign'
      });
    }

    return res.status(200).json({
      source: 'ai',
      planetary_context: allForecasts.planetary_context,
      ...allForecasts.forecasts[zodiacSign]
    });

  } catch (error) {
    console.error('API ERROR:', error);

    return res.status(500).json({
      error: 'Safety Zodiac API Failed',
      detail: error.message
    });
  }
};