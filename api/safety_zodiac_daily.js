module.exports = async (req, res) => {
    // Επιθετικοί Headers για να μην κόβει το browser την επικοινωνία (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const zodiacSign = sign || 'Aries';
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) return res.status(500).json({ error: 'No API Key' });

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a sarcastic cybersecurity expert. Provide a daily security forecast for ${zodiacSign} in ${targetLang}. 
                        Return ONLY a valid JSON object: {"forecast": "...", "protocol": "...", "security_index": 85}. 
                        Strictly NO markdown, NO backticks.`
                    }]
                }]
            })
        });

        const data = await response.json();
        let aiText = data.candidates[0].content.parts[0].text.trim();
        
        // Καθαρισμός αν το AI βάλει ```json
        const match = aiText.match(/\{[\s\S]*\}/);
        if (match) aiText = match[0];

        // Στέλνουμε το αποτέλεσμα ως αντικείμενο
        return res.status(200).json(JSON.parse(aiText));

    } catch (err) {
        return res.status(500).json({ error: 'JSON Parse Error', detail: err.message });
    }
};
