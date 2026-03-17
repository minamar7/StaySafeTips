// Χρησιμοποιούμε την πιο συμβατή μορφή για Node.js στο Vercel
module.exports = async (req, res) => {
  // 1. Ρύθμιση CORS για να δέχεται αιτήματα από το GitHub Pages
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // Χειρισμός του OPTIONS (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Μόνο POST επιτρέπεται
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { situation, scenario } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // ΕΛΕΓΧΟΣ 1: Υπάρχει το κλειδί;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Configuration Error', 
        details: 'GEMINI_API_KEY is missing from Vercel Environment Variables.' 
      });
    }

    // Κλήση στην Google
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this safety situation: "${situation}". Scenario: ${scenario || 'general'}. 
                  Return ONLY a JSON object: {"level":"low"|"medium"|"high"|"critical","score":0-100,"assessment":"2 sentences"}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();

    // ΕΛΕΓΧΟΣ 2: Μήπως η Google απέρριψε το κλειδί;
    if (data.error) {
      return res.status(500).json({ 
        error: 'Google API Error', 
        details: data.error.message 
      });
    }

    // ΕΛΕΓΧΟΣ 3: Μήπως το AI μπλόκαρε το περιεχόμενο (Safety Filters);
    if (!data.candidates || !data.candidates[0].content) {
      return res.status(200).json({ 
        level: 'unknown', 
        score: 0, 
        assessment: 'The AI could not analyze this specific situation due to safety filters.' 
      });
    }

    // Καθαρισμός και επιστροφή του αποτελέσματος
    let rawText = data.candidates[0].content.parts[0].text.trim();
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const result = JSON.parse(rawText);
    return res.status(200).json(result);

  } catch (err) {
    // ΕΛΕΓΧΟΣ 4: Γενικό σφάλμα στον server
    return res.status(500).json({ 
      error: 'Server Exception', 
      details: err.message 
    });
  }
};
