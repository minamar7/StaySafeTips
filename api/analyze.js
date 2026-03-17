export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { situation, scenario } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY στο Vercel' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an elite personal safety AI analyzer. Analyze the situation and respond ONLY with a valid JSON object. 
                  Format: {"level":"low"|"medium"|"high"|"critical","score":0-100,"assessment":"2-3 sentences"}
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
    
    // Έλεγχος αν η Google έστειλε σφάλμα (π.χ. λάθος API Key)
    if (data.error) {
      return res.status(500).json({ error: 'Google API Error', details: data.error.message });
    }

    // Έλεγχος αν υπάρχει απάντηση στο σωστό σημείο
    if (!data.candidates || !data.candidates[0].content) {
      return res.status(500).json({ error: 'No AI response', details: 'Check safety filters or prompt' });
    }

    let rawText = data.candidates[0].content.parts[0].text.trim();
    
    // ΚΡΙΣΙΜΟ: Καθαρισμός του κειμένου από markdown tags αν υπάρχουν
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const result = JSON.parse(rawText);
      return res.status(200).json(result);
    } catch (parseErr) {
      return res.status(500).json({ error: 'JSON Parse Failed', raw: rawText });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
}
