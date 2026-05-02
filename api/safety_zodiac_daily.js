module.exports = async (req, res) => {
    // CORS headers
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
        // ΤΟ URL ΠΟΥ ΕΠΑΙΞΕ ΤΗΝ ΠΡΩΤΗ ΦΟΡΑ
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a sarcastic cybersecurity expert. Provide a daily security forecast for the zodiac sign ${zodiacSign} in ${targetLang} language. 
                        Return ONLY a valid JSON object. 
                        Structure: {"forecast": "sarcastic text", "protocol": "security tip", "security_index": 85}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        // Ο ΠΙΟ ΣΗΜΑΝΤΙΚΟΣ ΚΑΘΑΡΙΣΜΟΣ
        let aiText = data.candidates[0].content.parts[0].text.trim();
        
        // Αφαιρούμε τα πάντα που ΔΕΝ είναι το JSON (markdown, backticks, κλπ)
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            aiText = jsonMatch[0];
        }

        const finalJson = JSON.parse(aiText);
        return res.status(200).json(finalJson);

    } catch (err) {
        return res.status(500).json({ error: 'AI Error', detail: err.message });
    }
};
