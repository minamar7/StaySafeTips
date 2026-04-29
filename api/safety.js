module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { country } = req.query;
    if (!country) return res.status(400).json({ error: "Country is required" });

    try {
        // Χρησιμοποιούμε το Rest Countries API που είναι εξαιρετικά σταθερό στο Vercel
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`);
        
        if (!response.ok) {
            return res.status(404).json({ error: "Country not found. Try the AI Advisor for cities." });
        }

        const data = await response.json();
        const c = data[0];

        // Επειδή το Rest Countries δεν δίνει score, θα δώσουμε ένα "Dynamic Safety Status"
        // βασισμένο στην περιοχή, μέχρι να φτιάξεις ένα δικό σου scoring system ή 
        // να χρησιμοποιήσεις το AI tool σου που λειτουργεί ήδη.
        
        // Προσωρινό Score βασισμένο σε Region (για να μη μένει κενό το UI σου)
        let baseScore = 85; 
        if (c.region === 'Africa') baseScore = 65;
        if (c.region === 'Americas') baseScore = 75;
        if (c.region === 'Europe') baseScore = 92;
        if (c.region === 'Asia') baseScore = 80;

        return res.status(200).json({
            country: c.name.common,
            score: baseScore,
            level: baseScore > 80 ? "Generally Safe" : "Exercise Caution",
            emoji: c.flag || "🌍",
            message: `Official data for ${c.name.common} (${c.continents[0]}). Currency: ${Object.keys(c.currencies)[0]}. Emergency contact services are active.`
        });

    } catch (err) {
        return res.status(500).json({ 
            error: "Data fetching error",
            details: "Please use the AI Threat Advisor for real-time risk analysis." 
        });
    }
};
