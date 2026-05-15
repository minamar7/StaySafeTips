export default async function handler(req, res) {
    // Ρύθμιση CORS για να επιτρέπεται η πρόσβαση μόνο από το GitHub Pages σου
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://minamar7.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Αν ο browser κάνει προ-έλεγχο OPTIONS (CORS preflight), απαντάμε αμέσως 200 OK
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Επιτρέπουμε μόνο POST requests από το HTML σου
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, aspectRatio } = req.body;
    
    // Τραβάει το API Key που έχεις ορίσει στα Environment Variables του Vercel
    const apiKey = process.env.VEO_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ error: 'Το API Key (VEO_API_KEY) δεν έχει ρυθμιστεί στα Environment Variables του Vercel.' });
    }

    try {
        // Κλήση προς το επίσημο Veo 3 API της Google
        const googleResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-video:predict?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                aspectRatio: aspectRatio || "16:9"
            })
        });

        if (!googleResponse.ok) {
            const errorData = await googleResponse.json();
            return res.status(googleResponse.status).json({ error: errorData });
        }

        const data = await googleResponse.json();
        
        // Εξαγωγή του URL του παραγόμενου βίντεο από την απάντηση
        const videoUrl = data.generatedVideos?.[0]?.videoUri || data.videoUrl;

        if (!videoUrl) {
            return res.status(500).json({ error: 'Το API της Google απάντησε επιτυχώς, αλλά δεν επέστρεψε URL βίντεο.' });
        }

        // Επιστροφή του URL στο frontend
        return res.status(200).json({ videoUrl: videoUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
