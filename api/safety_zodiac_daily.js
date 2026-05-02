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
        const cacheKey = `zodiac_final_${targetLang}_${today}`;

        let allData = await kv.get(cacheKey);

        if (!allData) {
            // Δοκιμάζουμε το Gemini 3 Flash, αν αποτύχει πάμε στο 1.5 Flash
            const models = ['gemini-3-flash-preview', 'gemini-1.5-flash'];
            let success = false;

            for (let model of models) {
                try {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: `You are a Cybersecurity Expert with sharp sarcasm. Provide a daily security forecast for ALL 12 zodiac signs in ${targetLang}. 
                                    Return ONLY JSON: {"forecasts": {"Aries": {"forecast": "...", "protocol": "...", "security_index": 85}, ...}}`
                                }]
                            }]
                        })
                    });

                    const data = await response.json();
                    let aiText = data.candidates[0].content.parts[0].text.trim();
                    aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
                    
                    allData = JSON.parse(aiText);
                    await kv.set(cacheKey, allData, { ex: 86400 });
                    success = true;
                    break; 
                } catch (e) {
                    console.error(`Model ${model} failed, trying next...`);
                }
            }
            if (!success) throw new Error("All AI models failed");
        }

        const result = allData.forecasts[zodiacSign] || allData.forecasts["Aries"];
        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ error: 'System busy', detail: err.message });
    }
};
