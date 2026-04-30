// api/ai-threat.js — Συγχρονισμένο με τη λειτουργία του analyze.js
module.exports = async (req, res) => {
    // CORS headers για να επιτρέπεται η κλήση από την εφαρμογή
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing messages array' });
    }

    // Χρήση της μεταβλητής Travel_Ai_Threat από το Vercel
    const apiKey = process.env.Travel_Ai_Threat;
    
    // Παίρνουμε το τελευταίο μήνυμα (τη χώρα/πόλη)
    const userPrompt = messages[messages.length - 1].content;

    try {
        // Χρήση του gemini-3-flash-preview που ξέρουμε ότι λειτουργεί
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

        if (data.error) {
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        // Εξαγωγή του κειμένου από την απάντηση της Google
        const aiText = data.candidates[0].content.parts[0].text;

        // Επιστροφή στο format που περιμένει το travel-hub.html
        return res.status(200).json({
            content: [{ type: 'text', text: aiText }]
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch AI data', detail: err.message });
    }
};
