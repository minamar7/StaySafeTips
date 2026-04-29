const https = require('https');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { country } = req.query;
    if (!country) return res.status(400).json({ error: "Country is required" });

    const fetchData = () => {
        return new Promise((resolve, reject) => {
            const url = 'https://www.travel-advisory.info/api/repository/suggestions';
            
            https.get(url, { headers: { 'User-Agent': 'TravelHub/1.0' } }, (resp) => {
                let data = '';
                resp.on('data', (chunk) => { data += chunk; });
                resp.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error("Failed to parse API response"));
                    }
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
    };

    try {
        const result = await fetchData();
        
        // Μετατροπή σε array για ευκολότερη αναζήτηση
        const countries = Object.values(result.data);
        const match = countries.find(c => c.name.toLowerCase() === country.toLowerCase());

        if (!match) {
            return res.status(404).json({ error: "Country not found in database." });
        }

        const score = Math.round((5 - match.advisory.score) * 20);
        
        let level = "Low Risk";
        let emoji = "✅";
        if (score < 50) { level = "High Risk"; emoji = "🚨"; }
        else if (score < 80) { level = "Medium Risk"; emoji = "⚠️"; }

        return res.status(200).json({
            country: match.name,
            score: score,
            level: level,
            emoji: emoji,
            message: match.advisory.message || "No specific warnings."
        });

    } catch (err) {
        // Επιστρέφουμε το ΑΚΡΙΒΕΣ σφάλμα για να το δούμε στην οθόνη
        return res.status(500).json({ 
            error: "Connection Error", 
            debug: err.message 
        });
    }
};
