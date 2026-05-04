const Redis = require('ioredis');

let redis;
function getRedis() {
    if (!redis) {
        redis = new Redis(process.env.ZODIAC_KV_REDIS_URL, {
            tls: { rejectUnauthorized: false },
            lazyConnect: true,
            maxRetriesPerRequest: 1,
        });
    }
    return redis;
}

const ALL_SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sign, lang } = req.query;
    const targetLang = lang || 'en';
    const zodiacSign = sign || 'Aries';
    const apiKey = process.env.Safety_Zodiac_Daily;

    if (!apiKey) return res.status(500).json({ error: 'No API Key configured' });

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    // 1. Έλεγχος Redis Cache για το συγκεκριμένο ζώδιο
    try {
        const client = getRedis();
        const cached = await client.get(cacheKey);
        if (cached) {
            const allData = JSON.parse(cached);
            if (allData[zodiacSign]) {
                console.log(`Cache HIT: ${cacheKey} → ${zodiacSign}`);
                return res.status(200).json(allData[zodiacSign]);
            }
        }
        console.log(`Cache MISS: ${cacheKey} — fetching all 12 signs from Gemini...`);
    } catch (cacheErr) {
        console.warn('Redis read error (continuing):', cacheErr.message);
    }

    // 2. Κλήση Gemini για ΟΛΑ τα 12 ζώδια μαζί
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a brutally sarcastic, darkly funny cybersecurity expert inside an app called "Stay Safe Elite". The app has these tools: Safe Timer (timed safety check-ins), SOS Hub (emergency contacts), Nature Alerts (weather threats), Scam Alerts (live fraud database), Security Checkup (digital safety scan), AI Threat Intel (AI risk analysis), Vault (secure storage), Travel Hub (stay safe abroad), Elite Dojo (Tang Soo Do defense training), Threat Radar (live threat scanning), Scam Radar (real-time threat broadcasts).

Generate a daily security forecast for ALL 12 zodiac signs in the language "${targetLang}".

Rules for each sign:
- Use sharp, sarcastic, darkly funny tone — like a cybersecurity stand-up comedian
- Naturally mention 1-2 of the app tools by name
- Give REAL, actionable security expert advice — not generic fluff
- Personalize to each sign's personality traits
- Respond ENTIRELY in the language "${targetLang}" — every single word
- security_index must be a number between 60 and 99

CRITICAL: Return ONLY raw JSON, no backticks, no markdown, no explanation:
{
  "Aries":        {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Taurus":       {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Gemini":       {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Cancer":       {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Leo":          {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Virgo":        {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Libra":        {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Scorpio":      {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Sagittarius":  {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Capricorn":    {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Aquarius":     {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75},
  "Pisces":       {"forecast": "2-3 sentences", "protocol": "1 tip", "security_index": 75}
}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({ error: 'Gemini returned no response', detail: JSON.stringify(data) });
        }

        let aiText = data.candidates[0].content.parts[0].text.trim();

        // Aggressive καθαρισμός
        aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();

        const match = aiText.match(/\{[\s\S]*\}/);
        if (!match) return res.status(500).json({ error: 'No JSON found', detail: aiText });

        const allSigns = JSON.parse(match[0]);

        // Βεβαιώσου ότι υπάρχουν όλα τα 12 ζώδια
        const valid = ALL_SIGNS.every(s => allSigns[s] && allSigns[s].forecast);
        if (!valid) return res.status(500).json({ error: 'Incomplete data from Gemini', detail: Object.keys(allSigns) });

        // 3. Αποθήκευση ΟΛΩΝ στο Redis για 24 ώρες
        try {
            const client = getRedis();
            await client.set(cacheKey, JSON.stringify(allSigns), 'EX', 86400);
            console.log(`✅ Cached all 12 signs: ${cacheKey}`);
        } catch (cacheErr) {
            console.warn('Redis save error:', cacheErr.message);
        }

        // 4. Επιστροφή μόνο του ζητούμενου ζωδίου
        return res.status(200).json(allSigns[zodiacSign]);

    } catch (err) {
        return res.status(500).json({ error: 'Server Error', detail: err.message });
    }
};
 