// /api/analyze.js
export default async function handler(req, res) {
  // --- ΠΡΟΣΘΗΚΗ ΓΙΑ ΔΙΟΡΘΩΣΗ COMMUNICATION ERROR ---
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Χειρισμός του OPTIONS request (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // ------------------------------------------------

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { situation, scenario } = req.body;
  if (!situation) return res.status(400).json({ error: 'No situation provided' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an elite personal safety AI analyzer. Analyze the situation and respond ONLY with a valid JSON object. 
                  Format: {"level":"low"|"medium"|"high"|"critical","score":0-100,"assessment":"2-3 sentences","actions":["action 1","action 2","action 3","action 4"]}
                  Scenario: ${scenario || 'personal'}. Situation: ${situation}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: 'Gemini Error', details: data.error.message });
    }

    const raw = data.candidates[0].content.parts[0].text.trim();
    const result = JSON.parse(raw);
    
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
}
