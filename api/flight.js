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

    // Helper για να πιάνει ΚΑΙ ελληνικά ΚΑΙ αγγλικά keys
    const get = (obj, ...keys) => {
      for (const k of keys) {
        if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
      }
      return null;
    };

    return res.status(200).json({
      flight: get(f.flight, "iata", "number"),
      airline: get(f.airline, "name"),
      status: f.flight_status,

      departure: {
        airport: get(f.departure, "αεροδρόμιο", "airport"),
        iata: get(f.departure, "iata"),
        terminal: get(f.departure, "τερματικό", "terminal"),
        gate: get(f.departure, "πύλη", "gate"),
        time: get(f.departure, "προγραμματισμένο", "scheduled", "estimated", "actual")
      },

      arrival: {
        airport: get(f.arrival, "αεροδρόμιο", "airport"),
        iata: get(f.arrival, "iata"),
        terminal: get(f.arrival, "τερματικός σταθμός", "terminal"),
        gate: get(f.arrival, "πύλη", "gate"),
        time: get(f.arrival, "προγραμματισμένο", "scheduled", "estimated", "actual")
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Aviation API error",
      message: err.message
    });
  }
};