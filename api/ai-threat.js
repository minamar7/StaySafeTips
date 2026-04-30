module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.Travel_Ai_Threat;
  const { situation, country, userLang } = req.body;
  const query = situation || country; 

  const langMap = {
    'el': 'GREEK', 'en': 'ENGLISH', 'de': 'GERMAN', 'fr': 'FRENCH', 
    'es': 'SPANISH', 'it': 'ITALIAN', 'pt': 'PORTUGUESE', 'ru': 'RUSSIAN'
  };
  const targetLang = langMap[userLang] || 'ENGLISH';

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze: "${query}". 
            Return ONLY a valid JSON object in ${targetLang}. 
            Format: {"assessment": "Write a short safety briefing with 🔴 Threats, 🟡 Scams, 🟢 Tips in ${targetLang}."}`
          }]
        }]
      })
    });

    const data = await response.json();
    
    // Η ίδια λογική parse που σου δουλεύει
    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(aiText);

    // Επιστρέφουμε το αποτέλεσμα έτσι ώστε το Travel Hub να το διαβάζει όπως πριν
    res.status(200).json({
      assessment: parsed.assessment,
      result: parsed.assessment 
    });

  } catch (error) {
    res.status(500).json({ error: "API connection failed" });
  }
};
