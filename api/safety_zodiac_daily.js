module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'el';
    const zodiacSign = sign || 'Aries';

    // Χρήση της δικής σου μεταβλητής από το Vercel
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing Safety_Zodiac_Daily API Key' });
    }

    try {
        // Χρήση του μοντέλου που λειτουργεί στο άλλο σου αρχείο
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a Cybersecurity & Zodiac Expert. Provide a daily safety forecast for the zodiac sign ${zodiacSign} in ${targetLang} language. 
                        Return ONLY a JSON object with this exact structure:
                        {"forecast": "a short text about digital safety", "protocol": "a specific security tip", "security_index": 85}
                        Do not include markdown or other text.`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        // Καθαρισμός του κειμένου από τυχόν markdown (```json ... ```)
        let aiText = data.candidates[0].content.parts[0].text;
        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Επιστροφή του JSON απευθείας στην εφαρμογή
        const finalJson = JSON.parse(aiText);
        return res.status(200).json(finalJson);

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch AI data', detail: err.message });
    }
};
