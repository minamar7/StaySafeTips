import { GoogleGenerativeAI } from "@google/generative-ai";
import { kv } from "@vercel/kv";

// Χρήση του API Key που ονόμασες στο Vercel
const genAI = new GoogleGenerativeAI(process.env.Safety_Zodiac_Daily);

export default async function handler(req, res) {
    // Παίρνουμε το ζώδιο και τη γλώσσα από το request
    const { sign, lang } = req.query;
    
    // Αν δεν οριστεί γλώσσα, προεπιλογή τα Αγγλικά (en)
    const targetLang = lang || 'en';
    
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `zodiac:${targetLang}:${today}`;

    try {
        let dailyData = await kv.get(cacheKey);

        if (!dailyData) {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Το Prompt λέει στο AI να απαντήσει ΣΤΗ ΓΛΩΣΣΑ που του στέλνουμε
            const prompt = `
                Today is ${today}. You are the 'Stay Safe Elite' Cosmic Analyst.
                1. Analyze planetary transits for today.
                2. Generate a digital security horoscope for all 12 signs.
                3. IMPORTANT: Write all descriptions and forecasts ONLY in this language: ${targetLang}.
                
                Return ONLY JSON:
                {
                    "planetary_context": "summary of planets in ${targetLang}",
                    "forecasts": {
                        "Aries": { "forecast": "...", "protocol": "...", "security_index": 85 },
                        ...
                    }
                }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().replace(/```json|```/g, "").trim();
            dailyData = JSON.parse(text);

            await kv.set(cacheKey, dailyData, { ex: 86400 });
        }

        if (sign && dailyData.forecasts[sign]) {
            res.status(200).json({
                planetary_context: dailyData.planetary_context,
                ...dailyData.forecasts[sign]
            });
        } else {
            res.status(200).json(dailyData);
        }

    } catch (error) {
        res.status(500).json({ error: "Cosmic sync failed" });
    }
}
