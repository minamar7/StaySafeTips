module.exports = async (req, res) => {
  // CORS Headers για να μπορεί το GitHub Pages να καλεί το Vercel API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!situation) return res.status(400).json({ error: 'Missing text' });

  try {
    // Η κλήση fetch είναι πιο αξιόπιστη για Serverless περιβάλλοντα
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Analyze this security threat: "${situation}". Return ONLY a JSON: {"level":"High","score":85,"assessment":"expert advice"}` }] }]
      })
    });

    const data = await response.json();

    // Αν η Google επιστρέψει σφάλμα (όπως το 404 που είδαμε), θα το εμφανίσει εδώ
    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }

    // Καθαρισμός του κειμένου από τυχόν markdown χαρακτήρες
    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(aiText));

  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
};
