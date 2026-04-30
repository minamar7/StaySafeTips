module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.Travel_Ai_Threat;
  // Προσθέτουμε το userLang που στέλνει το Travel Hub
  const { country, userLang } = req.body;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Ορίζουμε τη γλώσσα απάντησης
    const instructions = userLang === 'el' 
      ? "Respond strictly in GREEK language." 
      : "Respond in English.";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Provide a short travel safety briefing for ${country}.
            Include: 🔴 Threats, 🟡 Scams, 🟢 Tips.
            Keep it under 200 words. ${instructions}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response available.";

    // Επιστρέφουμε το αποτέλεσμα (το Travel Hub περιμένει το 'assessment' ή το 'result')
    return res.status(200).json({ 
        result: text,
        assessment: text // Προσθήκη για συμβατότητα με το travel-hub.html
    });

  } catch (err) {
    return res.status(500).json({ error: "AI Generation Failed" });
  }
};
