module.exports = async (req, res) => {
  // 1. Ρύθμιση CORS για να επιτρέπεται η κλήση από το GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Χειρισμός του προκαταρκτικού ελέγχου (browser preflight)
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Έλεγχος αν η κλήση είναι POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!situation) return res.status(400).json({ error: 'Missing situation text' });

  try {
    // 2. Η κλήση προς το Gemini API χρησιμοποιώντας fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this security situation: "${situation}". 
            Return ONLY a valid JSON object (no markdown, no backticks) with these keys: 
            {"level": "string", "score": number, "assessment": "string"}`
          }]
        }]
      })
    });

    const data = await response.json();

    // Έλεγχος αν η Google επέστρεψε σφάλμα (π.χ. το 404 που είδαμε)
    if (data.error) {
      return res.status(500).json({ error: 'Google AI Error', message: data.error.message });
    }

    // 3. Επεξεργασία της απάντησης
    let rawText = data.candidates[0].content.parts[0].text;
    
    // Καθαρισμός από τυχόν ```json ... ``` που μπορεί να βάλει η AI
    let cleanJsonText = rawText.replace(/```json|```/g, "").trim();

    const finalResult = JSON.parse(cleanJsonText);
    res.status(200).json(finalResult);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Fail", message: error.message });
  }
};
