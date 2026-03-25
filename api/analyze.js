module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.GEMINI_API_KEY;
  const { situation } = req.body;

  try {
    // ΕΔΩ ΕΙΝΑΙ ΤΟ ΔΙΟΡΘΩΜΕΝΟ URL ΠΟΥ ΔΕΝ ΒΓΑΖΕΙ 404
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Analyze this: ${situation}. Return JSON: {"level":"High","score":85,"assessment":"text"}` }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }

    const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(aiText));

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI", message: error.message });
  }
};
