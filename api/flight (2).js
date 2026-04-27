// api/flight.js — Vercel Serverless Function
// Proxy για AviationStack API — το key μένει στο Vercel, δεν φαίνεται στο GitHub

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { num } = req.query;
    if (!num) {
        return res.status(400).json({ error: 'Missing flight number' });
    }

    const apiKey = process.env.AVIATION_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'AVIATION_API_KEY env variable is not set on Vercel' });
    }

    try {
        const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${num.toUpperCase()}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch flight data', detail: err.message });
    }
};
