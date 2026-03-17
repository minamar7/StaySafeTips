// /api/analyze.js
// Vercel Serverless Function — Gemini AI Threat Analyzer
// 
// ΟΔΗΓΙΕΣ:
// 1. Πήγαινε Vercel Dashboard → Project → Settings → Environment Variables
// 2. Πρόσθεσε: GEMINI_API_KEY = το key σου από aistudio.google.com
// 3. Deploy — τελείωσε!

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { situation, scenario } = req.body;
  if (!situation) return res.status(400).json({ error: 'No situation provided' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });

  try {
    // Χρησιμοποιούμε το Gemini 1.5 Flash που είναι δωρεάν και ταχύτατο
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an elite personal safety AI analyzer. Analyze the situation and respond ONLY with a valid JSON object. 
                  No markdown, no explanation, no extra text.

                  Format:
                  {"level":"low"|"medium"|"high"|"critical","score":0-100,"assessment":"2-3 sentences","actions":["action 1","action 2","action 3","action 4"]}

                  Scenario type: ${scenario || 'personal'}
                  Situation: ${situation}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json" // Αναγκάζει το Gemini να βγάλει καθαρό JSON
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Gemini API error', details: err });
    }

    const data = await response.json();
    
    // Το Gemini επιστρέφει το κείμενο στο candidates[0].content.parts[0].text
    const raw = data.candidates[0].content.parts[0].text.trim();
    
    // Parsing του JSON για να βεβαιωθούμε ότι είναι έγκυρο
    const result = JSON.parse(raw);
    
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
}
