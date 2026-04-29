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
    const apiKey = process.env.AERODATABOX_KEY; // ✅ Σωστό όνομα από Vercel

    const today = new Date().toISOString().split("T")[0];

    const url = `https://aerodatabox.p.rapidapi.com/flights/iata/${encodeURIComponent(flightNum)}/${today}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
        "x-rapidapi-key": apiKey
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Flight not found or API error" });
    }

    const data = await response.json();
    const f = Array.isArray(data) ? data[0] : data;

    if (!f) {
      return res.status(404).json({ error: "No flight data found" });
    }

    const dep = f.departure || {};
    const arr = f.arrival   || {};

    return res.status(200).json({
      flight:  f.number || flightNum,
      airline: f.airline?.name || "-",
      status:  f.status || "-",

      departure: {
        airport:  dep.airport?.name || "-",
        iata:     dep.airport?.iata || "-",
        terminal: dep.terminal      || "-",
        gate:     dep.gate          || "-",
        time:     dep.actualTime    || dep.scheduledTime || "-"
      },

      arrival: {
        airport:  arr.airport?.name || "-",
        iata:     arr.airport?.iata || "-",
        terminal: arr.terminal      || "-",
        gate:     arr.gate          || "-",
        time:     arr.actualTime    || arr.scheduledTime || "-"
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Aviation API error",
      message: err.message
    });
  }
};