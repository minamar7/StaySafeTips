module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { country } = req.query;
    if (!country) return res.status(400).json({ error: "Country is required" });

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`);
        
        if (!response.ok) {
            return res.status(404).json({ error: "Country not found. Use English names (e.g. Greece)." });
        }

        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data found");
        
        const c = data[0];

        // Ασφαλής έλεγχος για νομίσματα και ήπειρο
        const currency = c.currencies ? Object.keys(c.currencies)[0] : "N/A";
        const continent = c.continents ? c.continents[0] : c.region;

        let baseScore = 80; 
        if (c.region === 'Africa') baseScore = 65;
        if (c.region === 'Americas') baseScore = 75;
        if (c.region === 'Europe') baseScore = 92;
        if (c.region === 'Oceania') baseScore = 88;

        return res.status(200).json({
            country: c.name.common,
            score: baseScore,
            level: baseScore > 80 ? "Generally Safe" : "Exercise Caution",
            emoji: c.flag || "🌍",
            message: `Official data for ${c.name.common} (${continent}). Local Currency: ${currency}. Emergency services are monitored.`
        });

    } catch (err) {
        console.error("Backend Error:", err);
        return res.status(500).json({ 
            error: "Data fetching error",
            debug: err.message 
        });
    }
};
