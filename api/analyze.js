// Χρησιμοποιούμε module.exports αντί για export default για μέγιστη συμβατότητα
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { situation, scenario } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing API Key in Vercel settings' });
    }

    // Χρήση του ενσωματωμένου fetch του Node.js 18+
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this ${scenario || 'safety'} situation: "${situation}". 
                  Return ONLY a JSON object with these keys: 
                  "level" (low, medium, high, or critical), 
                  "score" (0-100), 
                  "assessment" (2 sentences).`
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
      return res.status(500).json({ error: 'Google API Error', details: data.error.message });
    }

    if (!data.candidates || !data.candidates[0].content) {
      return res.status(500).json({ error: 'AI Safety Block', details: 'The AI refused to analyze this content.' });
    }

    let rawText = data.candidates[0].content.parts[0].text.trim();
    // Καθαρισμός από τυχόν markdown
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const result = JSON.parse(rawText);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Server Crash', details: err.message });
  }
};
