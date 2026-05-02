const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    // CORS headers για να μπορεί η εφαρμογή να "διαβάζει" το API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Λήψη παραμέτρων από το URL (π.χ. ?sign=Aries&lang=el)
    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    
    // Χρήση του ΔΙΚΟΥ ΣΟΥ API KEY από το Vercel
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!sign) return res.status(400).json({ error: 'Zodiac sign is required' });

    // Διαχείριση Ημερομηνίας και Cache
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        // 1. Έλεγχος αν έχουμε ήδη τις προβλέψεις της ημέρας στο KV
        let cachedData = await kv.get(cacheKey);
        
        if (cachedData && cachedData.forecasts && cachedData.forecasts[sign]) {
            console.log("Serving from Vercel KV Cache");
            return res.status(200).json({
                planetary_context: cachedData.planetary_context,
                ...cachedData.forecasts[sign]
            });
        }

        // 2. Αν δεν υπάρχουν, καλούμε το Gemini (όπως στο ai-threat.js)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: Today is ${today}. You are the 'Stay Safe Elite' Cosmic Security Analyst.
                        Task: Analyze current planetary transits and generate a digital security horoscope for ALL 12 signs.
                        IMPORTANT: The response MUST be entirely in this language: ${targetLang}.
                        
                        Return ONLY a JSON object:
                        {
                            "planetary_context": "Brief summary of planets today in ${targetLang}",
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
        
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        // Καθαρισμός και αποθήκευση στο Cache
        const rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = rawText.replace(/```json|```/g, "").trim();
        const allForecasts = JSON.parse(cleanJson);

        await kv.set(cacheKey, allForecasts, { ex: 86400 });

        // Επιστροφή των δεδομένων στη γλώσσα του χρήστη
        return res.status(200).json({
            planetary_context: allForecasts.planetary_context,
            ...allForecasts.forecasts[sign]
        });

    } catch (err) {
        return res.status(500).json({ error: 'Sync failed', detail: err.message });
    }
};
