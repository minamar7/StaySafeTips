// api/safety.js
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { country } = req.query;

    if (!country) {
        return res.status(400).json({ error: "Country name is required" });
    }

    try {
        // Χρησιμοποιούμε ένα εναλλακτικό endpoint του ίδιου API που είναι πιο σταθερό
        const response = await fetch('https://www.travel-advisory.info/api/repository/suggestions', {
            headers: {
                'User-Agent': 'TravelHubUltra/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const result = await response.json();

        // Έλεγχος αν το result.data υπάρχει
        if (!result || !result.data) {
            throw new Error("Invalid API response structure");
        }

        // Αναζήτηση χώρας
        const countryEntry = Object.values(result.data).find(
            c => c.name && c.name.toLowerCase() === country.toLowerCase()
        );

        if (!countryEntry) {
            return res.status(404).json({ 
                error: "Country not found. Use AI Advisor for cities." 
            });
        }

        const rawScore = countryEntry.advisory.score;
        const invertedScore = Math.round((5 - rawScore) * 20);

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
            score: invertedScore,
            level: level,
            emoji: statusEmoji,
            message: countryEntry.advisory.message || "No specific advisory available."
        });

    } catch (err) {
        console.error("Safety API Error:", err.message);
        return res.status(500).json({ 
            error: "Safety API connection error",
            details: err.message 
        });
    }
};
