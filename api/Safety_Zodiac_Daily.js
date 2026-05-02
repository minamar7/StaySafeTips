// Χρησιμοποιούμε τον client για να ορίσουμε χειροκίνητα τις μεταβλητές
const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.ZODIAC_KV_REST_API_URL,
  token: process.env.ZODIAC_KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!sign) return res.status(400).json({ error: 'Sign is required' });

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        // Έλεγχος στο Cache
        let cachedData = await kv.get(cacheKey);
        
        if (cachedData && cachedData.forecasts && cachedData.forecasts[sign]) {
            return res.status(200).json({
                planetary_context: cachedData.planetary_context,
                ...cachedData.forecasts[sign]
            });
        }

        // Αν δεν υπάρχει, καλούμε το Gemini
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: Today is ${today}. You are the 'Stay Safe Elite' Cosmic Analyst. 
                        Provide a digital security horoscope for ALL signs in ${targetLang}.
                        Return ONLY JSON:
                        {
                            "planetary_context": "summary in ${targetLang}",
                            "forecasts": {
                                "Aries": { "forecast": "...", "protocol": "...", "security_index": 85 },
                                ... (all 12 signs)
                            }
                        }`
                    }]
                }]
            })
        });

        const data = await apiResponse.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = rawText.replace(/```json|```/g, "").trim();
        const allForecasts = JSON.parse(cleanJson);

        // Αποθήκευση στο KV
        await kv.set(cacheKey, allForecasts, { ex: 86400 });

        return res.status(200).json({
            planetary_context: allForecasts.planetary_context,
            ...allForecasts.forecasts[sign]
        });

    } catch (err) {
        return res.status(500).json({ error: 'Sync failed', detail: err.message });
    }
};
