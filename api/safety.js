// api/safety.js
module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { country } = req.query;

    if (!country) {
        return res.status(400).json({ error: "Country name is required" });
    }

    try {
        // Fetch global advisory data
        const response = await fetch('https://www.travel-advisory.info/api/repository/suggestions');
        const data = await response.json();

        // Search for the country in the API data (case insensitive)
        const countryEntry = Object.values(data.data).find(
            c => c.name.toLowerCase() === country.toLowerCase()
        );

        if (!countryEntry) {
            return res.status(404).json({ 
                error: "Country not found in global database. For city-specific safety, use the AI Threat Advisor." 
            });
        }

        // The API returns a score from 0 (Safe) to 5 (Dangerous).
        // We convert it to a 0-100 scale where 100 is Safest.
        const rawScore = countryEntry.advisory.score;
        const invertedScore = Math.round((5 - rawScore) * 20);

        // Determine Risk Level and Color
        let level = "Low Risk";
        let statusEmoji = "✅";
        if (invertedScore < 50) {
            level = "High Risk";
            statusEmoji = "🚨";
        } else if (invertedScore < 80) {
            level = "Medium Risk";
            statusEmoji = "⚠️";
        }

        return res.status(200).json({
            country: countryEntry.name,
            code: countryEntry.iso_alpha2,
            score: invertedScore,
            level: level,
            emoji: statusEmoji,
            message: countryEntry.advisory.message || "No specific advisory available.",
            attribution: countryEntry.advisory.sources_active + " official sources"
        });

    } catch (err) {
        return res.status(500).json({ 
            error: "Safety API connection error",
            details: err.message 
        });
    }
};
