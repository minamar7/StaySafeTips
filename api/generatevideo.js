export default async function handler(req, res) {
    // Ρύθμιση CORS για το GitHub Pages σου
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://minamar7.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, aspectRatio } = req.body;
    
    // ΔΙΟΡΘΩΣΗ: Εδώ διαβάζουμε το κλειδί σου με το όνομα που του έδωσες στο Vercel!
    const apiKey = process.env.generatevideo; 

    if (!apiKey) {
        return res.status(500).json({ error: 'Το API Key (generatevideo) δεν βρέθηκε στο Vercel.' });
    }

    try {
        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-video:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                aspectRatio: aspectRatio || "16:9"
            })
        });

        const data = await googleResponse.json();

        if (!googleResponse.ok) {
            return res.status(googleResponse.status).json({ error: data.error?.message || 'Σφάλμα από το Veo API' });
        }
        
        const videoUrl = data.generatedVideos?.[0]?.videoUri || data.videoUrl;

        if (!videoUrl) {
            return res.status(500).json({ error: 'Δεν επιστράφηκε URL βίντεο.' });
        }

        return res.status(200).json({ videoUrl: videoUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
