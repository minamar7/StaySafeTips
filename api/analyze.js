module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Έλεγχος αν υπάρχει body (το Vercel μερικές φορές το χάνει αν δεν σταλεί σωστό Content-Type)
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!situation) return res.status(400).json({ error: 'Missing situation text' });
  if (!apiKey) return res.status(500).json({ error: 'Server configuration error: Missing API Key' });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Analyze this security situation: "${situation}". 
            Return ONLY a JSON object (no markdown, no backticks) with these exact keys: 
            {"level": "string", "score": number, "assessment": "string"}` 
          }] 
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: 'Google AI Error', details: data.error });
    }

    // Καθαρισμός της απάντησης από τυχόν Markdown (```json ... ```)
    let rawText = data.candidates[0].content.parts[0].text;
    let cleanJsonText = rawText.replace(/```json|```/g, "").trim();

    try {
      const finalResult = JSON.parse(cleanJsonText);
      res.status(200).json(finalResult);
    } catch (parseError) {
      // Αν η AI επιστρέψει κείμενο αντί για JSON, το "πακετάρουμε" εμείς για να μην σκάσει το frontend
      res.status(200).json({
        level: "Analysis Complete",
        score: 50,
        assessment: rawText
      });
    }

  } catch (error) {
    res.status(500).json({ error: "Fetch Error", message: error.message });
  }
};
