const { createClient } = require('@vercel/kv');

// Σύνδεση με τη βάση ZODIAC_KV χρησιμοποιώντας τις δικές σου μεταβλητές
const kv = createClient({
  url: process.env.ZODIAC_KV_REST_API_URL,
  token: process.env.ZODIAC_KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
  // CORS Headers για να επιτρέπεται η κλήση από το GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { sign, lang } = req.query;
  const targetLang = lang || 'en';
  const zodiacSign = sign || 'Aries';
  
  // Χρήση του ακριβούς ονόματος μεταβλητής από το Dashboard σου
  const apiKey = process.env.Safety_Zodiac_Daily;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API Key: Safety_Zodiac_Daily' });
  }

  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `zodiac:${targetLang}:${today}`;

  try {
    // 1. ΕΛΕΓΧΟΣ CACHE
    const cachedData = await kv.get(cacheKey);

    if (cachedData && cachedData.forecasts && cachedData.forecasts[zodiacSign]) {
      return res.status(200).json({
        source: 'cache',
        planetary_context: cachedData.planetary_context,
        ...cachedData.forecasts[zodiacSign]
      });
    }

    // 2. ΚΛΗΣΗ ΣΤΟ GEMINI
    const prompt = `Today is ${today}. You are Stay Safe Elite Cosmic Security Analyst. Create a digital-security horoscope for ALL 12 zodiac signs. Language: ${targetLang}. Return ONLY valid JSON: {"planetary_context":"max 20 words", "forecasts":{"Aries":{"forecast":"max 25 words","protocol":"max 5 words","security_index":80}, "Taurus":{...}}}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();
    if (!data.candidates) throw new Error('Gemini API Error');

    let rawText = data.candidates[0].content.parts[0].text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const allForecasts = JSON.parse(rawText);

    // 3. ΑΠΟΘΗΚΕΥΣΗ ΣΤΗ ΒΑΣΗ (24h)
    await kv.set(cacheKey, allForecasts, { ex: 86400 });

    return res.status(200).json({
      source: 'ai',
      planetary_context: allForecasts.planetary_context,
      ...allForecasts.forecasts[zodiacSign]
    });

  } catch (error) {
    console.error('API ERROR:', error);
    return res.status(500).json({ error: 'Safety Zodiac API Failed', detail: error.message });
  }
};
