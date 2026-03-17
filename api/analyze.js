module.exports = async (req, res) => {
  // 1. CORS Headers για επικοινωνία με το GitHub Pages
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Χειρισμός του OPTIONS (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Αποδοχή μόνο POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { situation, scenario } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Configuration Error', details: 'Missing GEMINI_API_KEY in Vercel settings.' });
    }

    // Χρήση της Native Fetch (Node.js 18+) - Χωρίς require('node-fetch')
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this safety situation: "${situation}". Scenario type: ${scenario || 'general'}. 
                  Respond ONLY with a valid JSON object. 
                  Format: {"level":"low"|"medium"|"high"|"critical","score":0-100,"assessment":"2-3 sentences"}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();

    // Έλεγχος αν η Google επέστρεψε σφάλμα
    if (data.error) {
      return res.status(500).json({ error: 'Google API Error', details: data.error.message });
    }

    // Έλεγχος αν υπάρχει απάντηση από το AI
    if (!data.candidates || !data.candidates[0].content) {
      return res.status(500).json({ error: 'AI Error', details: 'No content generated. Check safety filters.' });
    }

    let rawText = data.candidates[0].content.parts[0].text.trim();
    
    // Καθαρισμός από τυχόν markdown blocks
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const result = JSON.parse(rawText);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Server Exception', details: err.message });
  }
};
