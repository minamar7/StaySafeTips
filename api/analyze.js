module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.GEMINI_API_KEY;
  const { situation } = req.body;

  try {
    // ΠΡΟΣΟΧΗ: Το μοντέλο πλέον ονομάζεται gemini-3-flash-preview
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this safety threat: "${situation}". 
            Return ONLY a valid JSON: {"level":"High","score":85,"assessment":"expert advice"}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      // Εδώ θα δούμε αν φταίει το κλειδί ή το όνομα του μοντέλου
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }

    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(aiText));

  } catch (error) {
    res.status(500).json({ error: "API connection failed", message: error.message });
  }
};
