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
    const apiKey = process.env.AERODATABOX_KEY;
    const apiHost = "aerodatabox.p.rapidapi.com";

    const url = `https://aerodatabox.p.rapidapi.com/flights/number/${flightNum}`;

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost
      }
    });

    const data = await response.json();

    if (!data || !data[0]) {
      return res.status(404).json({ error: "Flight not found" });
    }

    const f = data[0];

    return res.status(200).json({
      flight: f.number,
      airline: f.airline?.name,
      status: f.status,
      departure: {
        airport: f.departure?.airport?.name,
        iata: f.departure?.airport?.iata,
        terminal: f.departure?.terminal,
        gate: f.departure?.gate,
        time: f.departure?.scheduledTimeLocal
      },
      arrival: {
        airport: f.arrival?.airport?.name,
        iata: f.arrival?.airport?.iata,
        terminal: f.arrival?.terminal,
        gate: f.arrival?.gate,
        time: f.arrival?.scheduledTimeLocal
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "AeroDataBox API error",
      message: err.message
    });
  }
};