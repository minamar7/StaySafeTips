module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { num } = req.query;
  const apiKey = process.env.AVIATION_API_KEY;

  if (!num) {
    return res.status(400).json({ error: "Missing flight number" });
  }

  try {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${num.toUpperCase()}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.info || "API Error" });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "API Connection Failed" });
  }
};