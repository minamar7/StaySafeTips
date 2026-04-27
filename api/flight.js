module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { num } = req.query;
    const apiKey = process.env.AVIATION_API_KEY; // Ακριβώς όπως στο Vercel

    try {
        // Υποχρεωτικά http για το free plan του AviationStack
        const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${num.toUpperCase()}&limit=1`;
        
        const response = await fetch(url);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Flight Error" });
    }
};
