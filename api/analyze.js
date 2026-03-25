module.exports = async (req, res) => {
  // CORS Headers για να δουλεύει η κλήση από το GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!situation) return res.status(400).json({ error: 'Missing text' });

  try {
    // ΠΡΟΣΟΧΗ: Αυτό το URL είναι το μόνο που δουλεύει σωστά
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Analyze this security threat: "${situation}". Return ONLY a JSON object with keys: "level", "score", "assessment".` }] }]
      })
    });

    const data = await response.json();

    // Εδώ θα πιάσουμε το 404 αν το URL είναι λάθος
    if (data.error) {
      return res.status(data.error.code || 500).json({ 
        error: 'Google API Error', 
        message: data.error.message 
      });
    }

    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(aiText));

  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
};
