<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Travel Safety Advisor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
    <style>
        :root {
            --bg: #020617;
            --card: rgba(15, 23, 42, 0.9);
            --accent: #38bdf8;
            --travel: #0ea5e9;
            --text: #f8fafc;
            --muted: #94a3b8;
            --danger: #ef4444;
            --success: #22c55e;
            --gold: #facc15;
        }
        * { box-sizing: border-box; font-family: -apple-system, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
        body {
            margin: 0;
            background: var(--bg);
            color: var(--text);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        .container { width: 100%; max-width: 500px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 1.5rem; color: var(--accent); margin: 0; text-transform: uppercase; }
        .search-container {
            background: var(--card);
            padding: 20px;
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .input-group { display: flex; gap: 10px; margin-top: 15px; }
        input {
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
            padding: 12px;
            border-radius: 12px;
            color: white;
            outline: none;
        }
        button {
            background: var(--travel);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: bold;
            cursor: pointer;
        }
        #results { margin-top: 20px; width: 100%; }
        .result-card {
            background: var(--card);
            padding: 20px;
            border-radius: 18px;
            border-left: 4px solid var(--accent);
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .loading { text-align: center; color: var(--muted); padding: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ Travel AI Advisor</h1>
            <p style="color: var(--muted); font-size: 0.8rem;">Expert safety analysis for any destination</p>
        </div>

        <div class="search-container">
            <label style="font-size: 0.8rem; color: var(--muted);">Enter Destination (Country or City):</label>
            <div class="input-group">
                <input type="text" id="destinationInput" placeholder="e.g. Mexico City, Thailand...">
                <button onclick="askAI()">ANALYZE</button>
            </div>
        </div>

        <div id="results"></div>
    </div>

    <script>
        async function askAI() {
            const dest = document.getElementById('destinationInput').value.trim();
            const resDiv = document.getElementById('results');
            if(!dest) return;

            resDiv.innerHTML = '<div class="loading">Consulting AI Advisor...</div>';

            try {
                // Στέλνουμε το αίτημα στο analyze.js χωρίς να αλλάξουμε το API
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // Στέλνουμε το prompt με τέτοιο τρόπο ώστε το analyze.js 
                        // να το δει σαν μια "κατάσταση" (situation) και να απαντήσει JSON
                        situation: `I am traveling to ${dest}. Provide a safety report: Is it safe? List dangerous areas to avoid and essential safety tips. Use emojis and keep it in English.`
                    })
                });

                const data = await response.json();
                
                // Επειδή το analyze.js επιστρέφει JSON: {level, score, assessment}
                if(data.assessment) {
                    resDiv.innerHTML = `
                        <div class="result-card">
                            <div style="margin-bottom: 10px;">
                                <span style="color:${data.level==='High'?'var(--danger)':'var(--success)'}; font-weight:bold;">
                                    ${data.level.toUpperCase()} RISK
                                </span>
                                <span style="margin-left:15px; color:var(--gold);">Score: ${data.score}/100</span>
                            </div>
                            <div style="font-size:0.9rem;">\${data.assessment}</div>
                        </div>
                    `;
                } else {
                    resDiv.innerHTML = '<div class="result-card">Could not analyze destination. Try again.</div>';
                }
            } catch (err) {
                resDiv.innerHTML = '<div class="result-card">Connection error. Check your API settings.</div>';
            }
        }
    </script>
</body>
</html>
