const { createClient } = require('@vercel/kv');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en'; 
    const zodiacSign = sign || 'Aries';
    const apiKey = process.env.Safety_Zodiac_Daily;

    try {
        const kv = createClient({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
        });

        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `zodiac_elite_${targetLang}_${today}`;

        let allData = await kv.get(cacheKey);

        if (!allData) {
            // Χρήση του gemini-1.5-flash που είναι πιο σταθερό για JSON παραγωγή
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Return ONLY a JSON object for 12 zodiac signs in ${targetLang}. 
                            Tone: Sharp, sarcastic cybersecurity expert.
                            Format: {"forecasts": {"Aries": {"forecast": "...", "protocol": "...", "security_index": 85}, ...}}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            if (!data.candidates) throw new Error("AI Failed to respond");

            let aiText = data.candidates[0].content.parts[0].text.trim();
            // Καθαρισμός από τυχόν markdown που χαλάει το JSON
            aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
            
            allData = JSON.parse(aiText);
            await kv.set(cacheKey, allData, { ex: 86400 });
        }

        const result = allData.forecasts[zodiacSign] || allData.forecasts["Aries"];
        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ error: 'Crash', details: err.message });
    }
};
