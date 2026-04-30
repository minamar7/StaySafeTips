module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Διαβάζουμε και το country και το lang από το query
    const { country, lang } = req.query; 
    const currentLang = lang || 'en'; // Προεπιλογή τα αγγλικά

    if (!country) return res.status(400).json({ error: "Country is required" });

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`);
        
        if (!response.ok) {
            const errorMsg = currentLang === 'el' ? "Η χώρα δεν βρέθηκε." : "Country not found.";
            return res.status(404).json({ error: errorMsg });
        }

        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data found");
        
        const c = data[0];

        const currency = c.currencies ? Object.keys(c.currencies)[0] : "N/A";
        const continent = c.continents ? c.continents[0] : c.region;

        let baseScore = 80; 
        if (c.region === 'Africa') baseScore = 65;
        if (c.region === 'Americas') baseScore = 75;
        if (c.region === 'Europe') baseScore = 92;
        if (c.region === 'Oceania') baseScore = 88;

        // Μεταφράσεις για το Level και το Message
        let levelText = "";
        let messageText = "";

        if (currentLang === 'el') {
            levelText = baseScore > 80 ? "Γενικά Ασφαλής" : "Προσοχή Απαιτείται";
            messageText = `Επίσημα δεδομένα για: ${c.name.common} (${continent}). Τοπικό Νόμισμα: ${currency}. Οι υπηρεσίες έκτακτης ανάγκης παρακολουθούνται.`;
        } else {
            levelText = baseScore > 80 ? "Generally Safe" : "Exercise Caution";
            messageText = `Official data for ${c.name.common} (${continent}). Local Currency: ${currency}. Emergency services are monitored.`;
        }

        return res.status(200).json({
            country: c.name.common,
            score: baseScore,
            level: levelText,
            emoji: c.flag || "🌍",
            message: messageText
        });

    } catch (err) {
        console.error("Backend Error:", err);
        return res.status(500).json({ 
            error: "Data fetching error"
        });
    }
};
