module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const flightNum = req.query.num;
  if (!flightNum) {
    return res.status(400).json({ error: "Missing flight number" });
  }

  try {
    const apiKey = process.env.AVIATION_API_KEY;
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNum}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      return res.status(404).json({ error: "Flight not found" });
    }

    const f = data.data[0];

    return res.status(200).json({
      flight: f.flight.iata,
      airline: f.airline.name,
      status: f.flight_status,
      departure: {
        airport: f.departure["αεροδρόμιο"] || f.departure.airport,
        iata: f.departure.iata,
        terminal: f.departure["τερματικό"] || f.departure.terminal,
        gate: f.departure["πύλη"] || f.departure.gate,
        time: f.departure["προγραμματισμένο"] || f.departure.scheduled
      },
      arrival: {
        airport: f.arrival["αεροδρόμιο"] || f.arrival.airport,
        iata: f.arrival.iata,
        terminal: f.arrival["τερματικός σταθμός"] || f.arrival.terminal,
        gate: f.arrival["πύλη"] || f.arrival.gate,
        time: f.arrival["προγραμματισμένο"] || f.arrival.scheduled
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Aviation API error",
      message: err.message
    });
  }
};