const { createClient } = require('@vercel/kv');

module.exports = async (req, res) => {
  // CORS Headers για να μπορεί το HTML να μιλάει με το API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { sign, lang } = req.query;
  const targetLang = lang || 'el';
  const zodiacSign = sign || 'Aries';
  
  // ΕΛΕΓΧΟΣ 1: Υπάρχει το API Key της Google;
  const apiKey = process.env.Safety_Zodiac_Daily;
  if (!apiKey) {
    return res.status(500).json({ error: "Το API Key 'Safety_Zodiac_Daily' λείπει από το Vercel Settings." });
  }

  try {
    // ΕΛΕΓΧΟΣ 2: Σύνδεση με τη βάση KV
    // Αν δεν έχεις συνδέσει το Storage, το 'createClient' θα πετάξει error εδώ
    const kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    // Προσπάθεια ανάκτησης από τη βάση
    let cachedData = null;
    try {
      cachedData = await kv.get(cacheKey);
    } catch (kvError) {
      console.error("KV Error:", kvError);
      // Συνεχίζουμε χωρίς cache αν η βάση έχει πρόβλημα
    }

    if (cachedData && cachedData.forecasts && cachedData.forecasts[zodiacSign]) {
      return res.status(200).json(cachedData.forecasts[zodiacSign]);
    }

    // Κλήση στο Gemini
    const prompt = `Return ONLY a valid JSON object for all 12 zodiac signs in ${targetLang} language for date ${today}. Format: {"forecasts": {"Aries": {"forecast":"...", "protocol":"...", "security_index":85}, ...}}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ error: "Το Gemini API δεν επέστρεψε δεδομένα. Ελέγξτε το κλειδί σας.", raw: data });
    }

    const rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    const allForecasts = JSON.parse(rawText);

    // Αποθήκευση στη βάση (αν δουλεύει)
    try {
      await kv.set(cacheKey, allForecasts, { ex: 86400 });
    } catch (e) {}

    return res.status(200).json(allForecasts.forecasts[zodiacSign]);

  } catch (err) {
    return res.status(500).json({ 
      error: "Critical Server Error", 
      message: err.message,
      stack: err.stack 
    });
  }
};
