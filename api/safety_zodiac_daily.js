const Redis = require('ioredis');

let redis;
function getRedis() {
    if (!redis) {
        redis = new Redis(process.env.ZODIAC_KV_REDIS_URL, {
            tls: { rejectUnauthorized: false },
            lazyConnect: true,
            maxRetriesPerRequest: 1,
        });
    }
    return redis;
}

const ALL_SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const zodiacSign = sign || 'Aries';
    
    // ΠΡΟΣΟΧΗ: Το όνομα πρέπει να είναι ΤΑΥΤΟΣΗΜΟ με το Vercel Dashboard
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) return res.status(500).json({ error: 'No API Key configured' });

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        const client = getRedis();
        const cached = await client.get(cacheKey);
        if (cached) {
            const allData = JSON.parse(cached);
            if (allData[zodiacSign]) {
                return res.status(200).json(allData[zodiacSign]);
            }
        }
    } catch (cacheErr) {
        console.warn('Redis error:', cacheErr.message);
    }

    try {
        // ΔΙΟΡΘΩΣΗ: Αλλαγή από 2.5 σε 3-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a brutally sarcastic cybersecurity expert. Generate a daily security forecast for ALL 12 zodiac signs in "${targetLang}". 
                        Return ONLY raw JSON:
                        {
                          "Aries": {"forecast": "...", "protocol": "...", "security_index": 75},
                          ... (all 12 signs)
                        }`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({ error: 'AI Error', detail: data });
        }

        let aiText = data.candidates[0].content.parts[0].text.trim();
        aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();

        const match = aiText.match(/\{[\s\S]*\}/);
        if (!match) return res.status(500).json({ error: 'Invalid JSON from AI' });

        const allSigns = JSON.parse(match[0]);

        const valid = ALL_SIGNS.every(s => allSigns[s]);
        if (!valid) return res.status(500).json({ error: 'Incomplete data' });

        try {
            const client = getRedis();
            await client.set(cacheKey, JSON.stringify(allSigns), 'EX', 86400);
        } catch (e) {}

        return res.status(200).json(allSigns[zodiacSign]);

    } catch (err) {
        return res.status(500).json({ error: 'Server Error', detail: err.message });
    }
};
