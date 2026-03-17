const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  const { situation } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const postData = JSON.stringify({
    contents: [{ parts: [{ text: `Analyze this safety situation and return ONLY a JSON: {"level":"high","score":90,"assessment":"test"}. Situation: ${situation}` }] }]
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => { data += chunk; });
    response.on('end', () => {
      try {
        const jsonResponse = JSON.parse(data);
        if (jsonResponse.error) return res.status(500).json(jsonResponse.error);
        const text = jsonResponse.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
        res.status(200).json(JSON.parse(text));
      } catch (e) {
        res.status(500).json({ error: "Parse Error", details: data });
      }
    });
  });

  request.on('error', (e) => {
    res.status(500).json({ error: "Request Error", message: e.message });
  });

  request.write(postData);
  request.end();
};
