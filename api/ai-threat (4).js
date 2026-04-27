// api/ai-threat.js — Vercel Serverless Function
// Proxy για Gemini API — το key μένει στο Vercel, δεν φαίνεται στο GitHub

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing messages array' });
    }

    const apiKey = process.env.Travel_Ai_Threat;
    if (!apiKey) {
        return res.status(500).json({ error: 'Travel_Ai_Threat env variable is not set on Vercel' });
    }

    const SYSTEM_PROMPT = `You are a Travel Security AI Advisor embedded in the "Stay Safe Elite" travel safety app. When a user mentions a country, city, or destination, provide a concise security briefing covering:
1. 🔴 Top security threats (crime, terrorism, civil unrest)
2. 🟡 Common scams targeting tourists
3. 🏥 Health & medical risks
4. ⚠️ Areas / neighbourhoods to avoid
5. ✅ Key safety tips

Use short bullet points with relevant emojis. Be factual, helpful, and not alarmist. If no destination is mentioned, ask which country or city they want to know about. Keep responses under 300 words.`;

    try {
        const geminiContents = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: geminiContents,
                generationConfig: {
                    maxOutputTokens: 800,
                    temperature: 0.7
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            return res.status(500).json({ error: 'Empty response from Gemini', raw: JSON.stringify(data).slice(0, 500) });
        }

        return res.status(200).json({
            content: [{ type: 'text', text }]
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to contact AI service', detail: err.message });
    }
};
