module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Config Error', details: 'Missing API Key' });
  }

  try {
    const fetch = require('node-fetch'); // Force import αν χρειάζεται
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Analyze this: ${situation}. Return JSON: {"level":"low","score":10,"assessment":"test"}` }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: 'Google Error', details: data.error.message });
    }

    // Επιστροφή της απάντησης αυτούσιας για test
    const text = data.candidates[0].content.parts[0].text;
    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).json({ error: 'Crash', details: err.message });
  }
};
