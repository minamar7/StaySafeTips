module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.GEMINI_API_KEY;
  // Εδώ παίρνουμε και το userLang που θα στείλει το index.html
  const { situation, userLang } = req.body;

  const langMap = {
    'el': 'GREEK', 'en': 'ENGLISH', 'zh': 'CHINESE (Simplified)',
    'de': 'GERMAN', 'fr': 'FRENCH', 'es': 'SPANISH',
    'it': 'ITALIAN', 'pt': 'PORTUGUESE', 'ru': 'RUSSIAN', 'hi': 'HINDI'
  };
  const targetLang = langMap[userLang] || 'ENGLISH';

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this safety threat: "${situation}". 
            IMPORTANT: The "assessment" field MUST be written entirely in ${targetLang}.
            Return ONLY a valid JSON: {"level":"High","score":85,"assessment":"expert advice in ${targetLang}"}`
          }]
        }]
      })
    });

    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(aiText));

  } catch (error) {
    res.status(500).json({ error: "API connection failed" });
  }
};
