// /api/analyze.js
// Vercel Serverless Function — Groq AI Threat Analyzer
// 
// ΟΔΗΓΙΕΣ:
// 1. Πήγαινε Vercel Dashboard → Project → Settings → Environment Variables
// 2. Πρόσθεσε: GROQ_API_KEY = το key σου από console.groq.com
// 3. Deploy — τελείωσε!

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { situation, scenario } = req.body;
  if (!situation) return res.status(400).json({ error: 'No situation provided' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content: `You are an elite personal safety AI analyzer. Analyze the situation and respond ONLY with a valid JSON object — no markdown, no explanation, no extra text.

Format:
{"level":"low"|"medium"|"high"|"critical","score":<1-100>,"assessment":"<2-3 sentence threat assessment>","actions":["<action 1>","<action 2>","<action 3>","<action 4>"]}

Threat levels:
- low (1-25): Minimal risk
- medium (26-55): Moderate risk, stay alert
- high (56-80): Significant danger, act now
- critical (81-100): Life-threatening, emergency response needed

Scenario type: ${scenario || 'personal'}
Be direct, practical, and prioritize life safety. Actions must be specific and immediately actionable.`
          },
          {
            role: 'user',
            content: situation
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Groq API error', details: err });
    }

    const data = await response.json();
    const raw = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
}