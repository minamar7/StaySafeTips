const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { sign, lang } = req.query;
  const targetLang = lang || 'en';
  const zodiacSign = sign || 'Aries';
  const apiKey = process.env.Safety_Zodiac_Daily;

  if (!apiKey) return res.status(500).json({ error: 'Missing Gemini API Key' });

  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `zodiac:${targetLang}:${today}`;

  try {
    // 1. Έλεγχος αν υπάρχει ήδη η πρόβλεψη στη βάση
    const cachedData = await kv.get(cacheKey);

    if (cachedData && cachedData.forecasts && cachedData.forecasts[zodiacSign]) {
      return res.status(200).json({
        source: 'cache',
        planetary_context: cachedData.planetary_context,
        ...cachedData.forecasts[zodiacSign]
      });
    }

    // 2. Κλήση στο Gemini AI
    const prompt = `Today is ${today}. You are Stay Safe Elite Cosmic Security Analyst. Create a modern digital-security horoscope for ALL 12 signs in ${targetLang}. Return ONLY valid JSON: {"planetary_context":"max 20 words", "forecasts":{"Aries":{"forecast":"max 25 words","protocol":"max 5 words","security_index":60}, "Taurus":{...}}}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();
    if (!data.candidates) throw new Error('Gemini Error');

    let rawText = data.candidates[0].content.parts[0].text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const allForecasts = JSON.parse(rawText);

    // 3. Αποθήκευση στη βάση (για 24 ώρες)
    await kv.set(cacheKey, allForecasts, { ex: 86400 });

    // 4. Επιστροφή δεδομένων
    return res.status(200).json({
      source: 'ai',
      planetary_context: allForecasts.planetary_context,
      ...allForecasts.forecasts[zodiacSign]
    });

  } catch (error) {
    console.error('API ERROR:', error);
    return res.status(500).json({ error: 'API Failed', detail: error.message });
  }
};
