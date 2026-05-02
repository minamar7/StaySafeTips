import { GoogleGenerativeAI } from "@google/generative-ai";
import { kv } from "@vercel/kv";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    const { sign, lang } = req.query;
    if (!sign) return res.status(400).json({ error: "Sign is required" });

    const targetLang = lang || 'en';
    const today = new Date().toISOString().split('T')[0]; // Format: 2026-05-02
    const cacheKey = `forecast:${targetLang}:${today}`;

    try {
        // 1. Προσπάθεια ανάκτησης από το Cache (Vercel KV)
        const cachedForecasts = await kv.get(cacheKey);

        if (cachedForecasts && cachedForecasts[sign]) {
            console.log("Serving from Cache");
            return res.status(200).json(cachedForecasts[sign]);
        }

        // 2. Αν δεν υπάρχει στο Cache, καλούμε το Gemini για ΟΛΑ τα ζώδια μαζί
        // (Αυτό γίνεται 1 φορά την ημέρα για οικονομία)
        console.log("Generating new forecasts via AI...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Act as the 'Stay Safe Elite' Security Oracle. 
            Generate daily security horoscopes for ALL 12 zodiac signs in ${targetLang}.
            Return ONLY a valid JSON object where keys are zodiac signs (in English, capitalized: Aries, Taurus, etc.) 
            and values are objects with:
            { "forecast": "25 words max", "protocol": "5 words max", "security_index": (65-98) }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "");
        const allForecasts = JSON.parse(text);

        // 3. Αποθήκευση στο Cache για 24 ώρες (86400 δευτερόλεπτα)
        await kv.set(cacheKey, allForecasts, { ex: 86400 });

        // 4. Επιστροφή του συγκεκριμένου ζωδίου που ζητήθηκε
        res.status(200).json(allForecasts[sign]);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Cosmic link failed." });
    }
}
