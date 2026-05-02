const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { sign, lang } = req.query;
  const targetLang = lang || 'en';
  const zodiacSign = sign || 'Aries';
  const apiKey = process.env.Safety_Zodiac_Daily;

  if (!apiKey) return res.status(500).json({ error: 'Missing Safety_Zodiac_Daily Key' });

  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `zodiac:${targetLang}:${today}`;

  try {
    const cachedData = await kv.get(cacheKey);
    if (cachedData && cachedData.forecasts && cachedData.forecasts[zodiacSign]) {
      return res.status(200).json(cachedData.forecasts[zodiacSign]);
    }

    const prompt = `Return ONLY valid JSON for all 12 signs in ${targetLang} for ${today}. Format: {"forecasts": {"Aries": {"forecast":"...", "protocol":"...", "security_index":85}, ...}}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    const allForecasts = JSON.parse(rawText);

    await kv.set(cacheKey, allForecasts, { ex: 86400 });

    return res.status(200).json(allForecasts.forecasts[zodiacSign]);

  } catch (err) {
    return res.status(500).json({ error: 'API Error', detail: err.message });
  }
};
