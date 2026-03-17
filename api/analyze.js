module.exports = async function handler(req, res) {
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
            content: `You are an elite personal safety AI. Respond ONLY with valid JSON, no markdown, no extra text:
{"level":"low"|"medium"|"high"|"critical","score":<1-100>,"assessment":"2-3 sentences","actions":["action1","action2","action3","action4"]}
Scenario: ${scenario || 'personal'}`
          },
          { role: 'user', content: situation }
        ]
      })
    });

    const data = await response.json();
    const raw = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
}