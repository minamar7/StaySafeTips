module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'el';
    const zodiacSign = sign || 'Aries';

    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing Safety_Zodiac_Daily API Key' });
    }

    try {
        // ΔΙΟΡΘΩΜΕΝΟ URL (Χωρίς το v1beta αν σου βγάζει error, ή με τη σωστή δομή)
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Provide a short daily security forecast for ${zodiacSign} in ${targetLang}. 
                        Return ONLY JSON: {"forecast": "...", "protocol": "...", "security_index": 85}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // Αν το gemini-1.5-flash εξακολουθεί να μην βρίσκεται, δοκίμασε το gemini-pro
            return res.status(500).json({ error: data.error.message, code: data.error.code });
        }

        let aiText = data.candidates[0].content.parts[0].text;
        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

        return res.status(200).json(JSON.parse(aiText));

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch AI data', detail: err.message });
    }
};
