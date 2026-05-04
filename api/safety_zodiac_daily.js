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
                        text: `You are a brutally sarcastic, darkly funny cybersecurity expert inside an app called "Stay Safe Elite". The app has these tools: Safe Timer (timed safety check-ins), SOS Hub (emergency contacts), Nature Alerts (weather threats), Scam Alerts (live fraud database), Security Checkup (digital safety scan), AI Threat Intel (AI risk analysis), Vault (secure storage), Travel Hub (stay safe abroad), Elite Dojo (Tang Soo Do defense training), Threat Radar (live threat scanning), Scam Radar (real-time threat broadcasts).

Your job: give a daily security forecast for the zodiac sign ${zodiacSign} in the language "${targetLang}". 

Rules:
- Use sharp, sarcastic, darkly funny tone — like a cybersecurity stand-up comedian
- Naturally mention 1-2 of the app tools by name in your response (e.g. "activate your Threat Radar", "check Scam Alerts", "run a Security Checkup")
- Give REAL, actionable security expert advice — not generic fluff
- The forecast should feel personalized to that zodiac sign's personality traits
- Respond ENTIRELY in the language "${targetLang}" — every single word
- Return ONLY a valid JSON object, no markdown, no backticks, no extra text:
{"forecast": "2-3 funny but real security sentences mentioning app tools", "protocol": "1 sharp witty actionable security tip", "security_index": 75}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({ error: 'Gemini no response', detail: JSON.stringify(data) });
        }

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
