module.exports = async (req, res) => {
  // 1. Ρύθμιση CORS Headers για επικοινωνία με το GitHub Pages
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Χειρισμός του OPTIONS (Preflight request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Αποδοχή μόνο POST αιτημάτων
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { situation, scenario } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Config Error', details: 'Missing API Key in Vercel' });
    }

    // Χρησιμοποιούμε τη native fetch του Node.js (δεν χρειάζεται require)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this ${scenario || 'safety'} situation: "${situation}". 
                  Respond ONLY with a valid JSON object: 
                  {"level":"low"|"medium"|"high"|"critical", "score":0-100, "assessment":"2-3 sentences"}`
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();

    // Έλεγχος για σφάλματα από την Google
    if (data.error) {
      return res.status(500).json({ error: 'Google API Error', details: data.error.message });
    }

    // Έλεγχος αν υπάρχει απάντηση
    if (!data.candidates || !data.candidates[0].content) {
      return res.status(500).json({ error: 'AI Error', details: 'No response from AI core' });
    }

    // Καθαρισμός του κειμένου (αφαίρεση markdown αν υπάρχει)
    let rawText = data.candidates[0].content.parts[0].text.trim();
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Επιστροφή έγκυρου JSON στο frontend
    const result = JSON.parse(rawText);
    return res.status(200).json(result);

  } catch (err) {
    // Καταγραφή του σφάλματος για να το βλέπεις στα Logs
    console.error('Server Crash:', err.message);
    return res.status(500).json({ error: 'Server Crash', details: err.message });
  }
};
