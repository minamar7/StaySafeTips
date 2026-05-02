module.exports = async (req, res) => {
    // CORS headers για να επιτρέπεται η κλήση από το HTML σου
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'el';
    const zodiacSign = sign || 'Aries';

    // Χρήση της μεταβλητής σου από το Vercel
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing Safety_Zodiac_Daily API Key' });
    }

    try {
        // Χρήση του gemini-3-flash-preview όπως το ζήτησες
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a professional Cybersecurity Expert. Provide a daily security forecast for the zodiac sign ${zodiacSign} in ${targetLang} language. 
                        Return ONLY a valid JSON object. Do not include markdown formatting or backticks.
                        Structure: {"forecast": "a short professional text", "protocol": "a specific security tip", "security_index": 85}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        // Καθαρισμός του κειμένου (σε περίπτωση που η AI βάλει ```json)
        let aiText = data.candidates[0].content.parts[0].text;
        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Μετατροπή σε JSON και αποστολή στο frontend
        const finalJson = JSON.parse(aiText);
        return res.status(200).json(finalJson);

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch AI data', detail: err.message });
    }
};
