
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { country } = req.query;

  try {
    // 1. Παίρνουμε όλα τα δεδομένα ασφαλείας
    const response = await fetch('https://www.travel-advisory.info/api/repository/suggestions');
    const data = await response.json();

    // 2. Αναζήτηση της χώρας στα δεδομένα
    const countryData = Object.values(data.data).find(
      c => c.name.toLowerCase() === country.toLowerCase()
    );

    if (!countryData) {
      return res.status(404).json({ error: "Country not found" });
    }

    // Αντιστοίχιση σκορ (Το API δίνει 0-5, εμείς το κάνουμε 0-100)
    // 0 = Πολύ Ασφαλές, 5 = Πολύ Επικίνδυνο. Οπότε:
    const rawScore = countryData.advisory.score;
    const finalScore = Math.round((5 - rawScore) * 20); 

    let level = "Low Risk";
    if (finalScore < 50) level = "High Risk";
    else if (finalScore < 80) level = "Medium Risk";

    return res.status(200).json({
      country: countryData.name,
      score: finalScore,
      level: level,
      message: countryData.advisory.message,
      emoji: "🛡️"
    });

  } catch (err) {
    return res.status(500).json({ error: "Safety API error" });
  }
};

     