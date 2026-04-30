module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.Travel_Ai_Threat;
  const { country } = req.body;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Provide a short travel safety briefing for ${country}.
            Include: 🔴 Threats, 🟡 Scams, 🟢 Tips.
            Keep it under 200 words.`
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

    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: "AI Generation Failed" });
  }
};