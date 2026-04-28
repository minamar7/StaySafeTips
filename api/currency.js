module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Free EUR-based API (σταθερό, δεν χρειάζεται API key)
    const url = "https://api.exchangerate.host/latest?base=EUR";

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.rates) {
      return res.status(500).json({ error: "Currency data unavailable" });
    }

    return res.status(200).json({
      base: "EUR",
      rates: data.rates,
      date: data.date
    });

  } catch (err) {
    return res.status(500).json({
      error: "Currency API connection failed",
      message: err.message
    });
  }
};