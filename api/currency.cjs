// api/currency.js
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // Χρήση του Open Access endpoint (δωρεάν, χωρίς key για βασικά rates)
        const response = await fetch('https://open.er-api.com/v6/latest/EUR');
        
        if (!response.ok) throw new Error("Currency API unreachable");
        
        const data = await response.json();

        // Επιστρέφουμε μόνο τα rates και την ημερομηνία ενημέρωσης
        return res.status(200).json({
            rates: data.rates,
            updated: data.time_last_update_utc
        });

    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
};
