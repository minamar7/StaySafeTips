import { GoogleGenerativeAI } from '@google/generative-ai';
import Redis from 'ioredis';

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

// Οι 10 γλώσσες από την εικόνα 169.jpg χαρτογραφημένες για το Gemini
const LANGUAGE_MAP = {
    'el': 'GREEK (Ελληνικά)',
    'en': 'ENGLISH',
    'de': 'GERMAN (Deutsch)',
    'fr': 'FRENCH (Français)',
    'es': 'SPANISH (Español)',
    'it': 'ITALIAN (Italiano)',
    'pt': 'PORTUGUESE (Português)',
    'ru': 'RUSSIAN (Русский)',
    'zh': 'CHINESE (中文)',
    'hi': 'HINDI (हिन्दी)'
};

export default async function handler(req, res) {
    // CORS Headers
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

    // 1. Έλεγχος Redis Cache για το συγκεκριμένο ζώδιο και γλώσσα
    try {
        const client = getRedis();
        const cached = await client.get(cacheKey);
        if (cached) {
            const allData = JSON.parse(cached);
            if (allData[zodiacSign]) {
                console.log(`Cache HIT: ${cacheKey} → ${zodiacSign}`);
                
                // Κλείνουμε σωστά τη σύνδεση για το Vercel Serverless
                await client.quit().catch(() => {});
                redis = null;
                
                return res.status(200).json(allData[zodiacSign]);
            }
        }
        console.log(`Cache MISS: ${cacheKey} — fetching all 12 signs from Gemini...`);
    } catch (cacheErr) {
        console.warn('Redis read error (continuing):', cacheErr.message);
    }

    // 2. Κλήση Gemini μέσω του επίσημου SDK
    try {
        const ai = new GoogleGenerativeAI(apiKey);
        
        // Δυναμικός εντοπισμός της γλώσσας από το MAP
        const fullLanguageName = LANGUAGE_MAP[targetLang] || 'ENGLISH';

        const model = ai.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            // System instruction για να επιβάλλεται η γλώσσα καθολικά στο μοντέλο
            systemInstruction: `You are a brutally sarcastic, darkly funny cybersecurity expert inside an app called "Stay Safe Elite". The app features these specific tools: Safe Timer, SOS Hub, Nature Alerts, Scam Alerts, Security Checkup, AI Threat Intel, Vault, Travel Hub, Elite Dojo (Tang Soo Do defense training), Threat Radar, Scam Radar.

CRITICAL: You must write the entire response text naturally and completely in the ${fullLanguageName} language. Every single word inside the JSON fields (forecast and protocol) must be in ${fullLanguageName}. Do not translate or change the technical names of the app tools listed above.`,
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate a daily security forecast for ALL 12 zodiac signs. 

Rules for each sign:
- Use a sharp, sarcastic, darkly funny tone — like a cynical cybersecurity engineer
- Naturally mention 1-2 of the app tools listed above by name
- Give REAL, actionable security expert advice — not generic fluff
- Personalize based on each sign's well-known cosmic traits
- The content for forecast and protocol MUST be in ${fullLanguageName}
- security_index must be an integer between 60 and 99

Return ONLY a valid JSON object matching this structure exactly (No markdown, no wrappers):
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
}`;

        const result = await model.generateContent(prompt);
        let aiText = result.response.text().trim();

        // Καθαρισμός τυχόν markdown σε μία ενιαία γραμμή
        aiText = aiText.replace(/```json/g, '').replace(/
```/g, '').trim();

        const allSigns = JSON.parse(aiText);

        // Έλεγχος εγκυρότητας των 12 ζωδίων
        const valid = ALL_SIGNS.every(s => allSigns[s] && allSigns[s].forecast);
        if (!valid) {
            return res.status(500).json({ error: 'Incomplete data from Gemini', detail: Object.keys(allSigns) });
        }

        // 3. Αποθήκευση στο Redis για 24 ώρες
        try {
            const client = getRedis();
            await client.set(cacheKey, JSON.stringify(allSigns), 'EX', 86400);
            console.log(`✅ Cached all 12 signs for language ${targetLang}: ${cacheKey}`);
        } catch (cacheErr) {
            console.warn('Redis save error:', cacheErr.message);
        }

        // 4. Επιστροφή μόνο του ζητούμενου ζωδίου
        return res.status(200).json(allSigns[zodiacSign]);

    } catch (err) {
        return res.status(500).json({ error: 'Server Error', detail: err.message });
    } finally {
        // 5. Κλείνουμε πάντα τη σύνδεση Redis στο τέλος
        if (redis) {
            await redis.quit().catch(() => {});
            redis = null;
        }
    }
}
