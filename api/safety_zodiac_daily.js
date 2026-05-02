const { createClient } = require('@vercel/kv');

// Δυναμική σύνδεση: Δοκιμάζει όλες τις πιθανές μεταβλητές που είδαμε στο Dashboard σου
const kv = createClient({
  url: process.env.ZODIAC_KV_REST_API_URL || process.env.ZODIAC_KV_URL || process.env.ZODIAC_KV_REDIS_URL,
  token: process.env.ZODIAC_KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
    // CORS Headers για να επιτρέπεται η κλήση από το GitHub Pages
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Χειρισμός του preflight request
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const apiKey = process.env.Safety_Zodiac_Daily; // Το κλειδί σου από το Vercel Dashboard

    if (!sign) return res.status(400).json({ error: 'Sign is required' });

    // Δημιουργία κλειδιού για το cache (π.χ. zodiac:el:2026-05-02)
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        // 1. Προσπάθεια ανάκτησης από τη βάση (Vercel KV)
        let cachedData = await kv.get(cacheKey);
        
        if (cachedData && cachedData.forecasts && cachedData.forecasts[sign]) {
            console.log("Serving from Cache");
            return res.status(200).json({
                planetary_context: cachedData.planetary_context,
                ...cachedData.forecasts[sign]
            });
        }

        // 2. Αν δεν υπάρχει στο cache, καλούμε το Gemini AI
        console.log("Fetching from Gemini AI...");
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: Today is ${today}. You are the 'Stay Safe Elite' Cosmic Security Analyst.
                        Provide a digital security horoscope for ALL 12 signs.
                        The response MUST be in ${targetLang}.
                        Return ONLY a JSON object:
                        {
                            "planetary_context": "summary in ${targetLang}",
                            "forecasts": {
                                "Aries": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Taurus": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Gemini": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Cancer": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Leo": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Virgo": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Libra": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Scorpio": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Sagittarius": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Capricorn": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Aquarius": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 },
                                "Pisces": { "forecast": "max 25 words", "protocol": "max 5 words", "security_index": 60-99 }
                            }
                        }`
                    }]
                }]
            })
        });

        const data = await apiResponse.json();
        
        if (!data.candidates || !data.candidates[0]) {
            throw new Error("AI provider returned an empty response.");
        }

        const rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = rawText.replace(/```json|```/g, "").trim();
        const allForecasts = JSON.parse(cleanJson);

        // 3. Αποθήκευση στη βάση (Expiration: 24 ώρες)
        await kv.set(cacheKey, allForecasts, { ex: 86400 });

        // Επιστροφή μόνο του ζητούμενου ζωδίου
        return res.status(200).json({
            planetary_context: allForecasts.planetary_context,
            ...allForecasts.forecasts[sign]
        });

    } catch (err) {
        console.error("Critical Error:", err.message);
        return res.status(500).json({ error: 'Database/AI Sync Error', detail: err.message });
    }
};
