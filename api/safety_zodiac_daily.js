const { createClient } = require('@vercel/kv');

// Σύνδεση με τη βάση ZODIAC_KV
const kv = createClient({
  url: process.env.ZODIAC_KV_REST_API_URL,
  token: process.env.ZODIAC_KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const zodiacSign = sign || 'Aries';
    
    // ΕΔΩ ΕΙΝΑΙ Η ΔΙΟΡΘΩΣΗ: Χρήση του ακριβούς ονόματος από το Vercel Dashboard
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing API Key: Safety_Zodiac_Daily' });
    }

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        // 1. Έλεγχος Cache (Vercel KV)
        const cachedData = await kv.get(cacheKey);
        
        if (cachedData && cachedData.forecasts && cachedData.forecasts[zodiacSign]) {
            return res.status(200).json({
                planetary_context: cachedData.planetary_context,
                ...cachedData.forecasts[zodiacSign]
            });
        }

        // 2. Κλήση Gemini AI
        const prompt = `Today is ${today}. You are the 'Stay Safe Elite' Cosmic Security Analyst. 
        Provide a digital security horoscope for ALL 12 signs in ${targetLang}. 
        Return ONLY valid JSON:
        {
            "planetary_context": "summary",
            "forecasts": {
                "Aries": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Taurus": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Gemini": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Cancer": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Leo": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Virgo": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Libra": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Scorpio": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Sagittarius": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Capricorn": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Aquarius": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99},
                "Pisces": {"forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99}
            }
        }`;

        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await apiResponse.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = rawText.replace(/```json|```/g, "").trim();
        const allForecasts = JSON.parse(cleanJson);

        // 3. Αποθήκευση στη βάση για 24 ώρες
        await kv.set(cacheKey, allForecasts, { ex: 86400 });

        return res.status(200).json({
            planetary_context: allForecasts.planetary_context,
            ...allForecasts.forecasts[zodiacSign]
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sync Error', detail: err.message });
    }
};
