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

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing API Key' });
    }

    try {
        const kv = createClient({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
        });

        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `zodiac_sarcastic_${targetLang}_${today}`;

        let allData = await kv.get(cacheKey);

        if (!allData) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a world-class Cybersecurity Expert with a sharp, sarcastic, and witty sense of humor. 
                            Provide a daily security forecast for ALL 12 zodiac signs in ${targetLang} language. 
                            The tone should be "Elite Sarcasm" - mocking bad digital habits while giving real protection advice.
                            
                            Return ONLY a valid JSON object with this exact structure:
                            {"forecasts": {"Aries": {"forecast": "sarcastic short text", "protocol": "witty tip", "security_index": 85}, ...}}
                            Do not use markdown formatting or the word "json".`
                        }]
                    }]
                })
            });

            const data = await response.json();
            let aiText = data.candidates[0].content.parts[0].text.trim();
            aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
            
            allData = JSON.parse(aiText);
            await kv.set(cacheKey, allData, { ex: 86400 });
        }

        const result = allData.forecasts[zodiacSign] || allData.forecasts["Aries"];
        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ error: 'System error', detail: err.message });
    }
};
