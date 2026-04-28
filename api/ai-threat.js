
    
        module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { messages } = req.body;
    const apiKey = process.env.Travel_Ai_Threat; 
    const userPrompt = messages[messages.length - 1].content;

    try {
        // Χρήση του ίδιου URL/Model με το analyze.js
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a Travel Security Expert. Provide a concise safety briefing for: ${userPrompt}. 
                        Include: 🔴 Security Threats, 🟡 Common Scams, ✅ Safety Tips. 
                        Use bullet points and emojis. Keep it under 250 words.`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        return res.status(200).json({
            content: [{ type: 'text', text: aiText }]
        });
    } catch (err) {
        return res.status(500).json({ error: "AI Generation Failed" });
    }
};
