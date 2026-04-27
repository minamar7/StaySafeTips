module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { num } = req.query;
    // Χρήση του ονόματος που έχεις στο Vercel
    const apiKey = process.env.AVIATION_API_KEY;

    try {
        // Χρήση http (όχι https) για να μην απορρίψει την κλήση το API
        const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${num.toUpperCase()}&limit=1`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) return res.status(200).json({ error: data.error.message });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Flight API Error' });
    }
};
