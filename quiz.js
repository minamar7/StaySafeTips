// ===============================
// Stay Safe Premium - Quiz System
// ===============================

// --------------------------------
// 1. MULTILINGUAL QUESTION BANK
// --------------------------------

onst questions = {

  // ======================
  // 🇬🇧 ENGLISH
  // ======================
  en: [
    { icon: "📨", q: "You receive an email saying your account will be closed unless you click a link. What should you do?", options: ["Click the link","Reply to the email","Ignore it and check your account through the official website","Forward it to friends"], correct: 2 },
    { icon: "🔑", q: "A website asks you to create a password. Which option is the safest?", options: ["Your pet’s name","12345678","A long unique password with symbols","Your birthday"], correct: 2 },
    { icon: "💬", q: "A stranger messages you asking for a verification code you received. What should you do?", options: ["Give them the code","Ask why they need it","Block and report the message","Ignore it"], correct: 2 },
    { icon: "📶", q: "You connect to free public Wi‑Fi. What should you avoid doing?", options: ["Reading news","Checking social media","Logging into banking apps","Watching videos"], correct: 2 },
    { icon: "🔍", q: "A friend sends you a suspicious link. What’s the safest action?", options: ["Click it","Ask them if it’s safe","Delete it and warn them","Forward it"], correct: 2 },
    { icon: "🛒", q: "What is the safest way to update your apps?", options: ["Download APKs from random websites","Use the official app store","Wait months before updating","Never update"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Someone calls claiming to be 'technical support' and asks for remote access. What should you do?", options: ["Allow access","Ask for their ID","Hang up immediately","Follow their instructions"], correct: 2 },
    { icon: "🔐", q: "What is two‑factor authentication (2FA)?", options: ["Using two passwords","A second step like a code or authentication app","Logging in twice","A backup email"], correct: 1 },
    { icon: "💾", q: "You find a USB stick on the ground. What should you do?", options: ["Plug it into your computer","Give it to a friend","Throw it away","Leave it or give it to lost & found"], correct: 3 },
    { icon: "⚠️", q: "A website URL looks strange (e.g., 'paypa1.com'). What does this usually mean?", options: ["It’s a new version","It’s a typo","It’s likely a phishing site","It’s safe"], correct: 2 },
    { icon: "🛡️", q: "What is the safest way to store passwords?", options: ["In a notebook","In your phone notes","In a password manager","Use one password for all accounts"], correct: 2 },
    { icon: "📱", q: "An app asks for permissions it doesn’t need (e.g., a flashlight app wants contacts). What should you do?", options: ["Allow everything","Allow only if you trust it","Deny and uninstall","Restart your phone"], correct: 2 },
    { icon: "🎁", q: "You get a message saying 'You won a prize! Click here.' What should you do?", options: ["Click immediately","Share with friends","Delete it","Reply asking for details"], correct: 2 },
    { icon: "⭐", q: "What should you do before installing a new app?", options: ["Check reviews and permissions","Install immediately","Ask a friend","Ignore permissions"], correct: 0 },
    { icon: "🧹", q: "Your device feels slow and shows strange pop‑ups. What’s the safest step?", options: ["Install random 'cleaner' apps","Restart only","Run an antivirus or security scan","Ignore it"], correct: 2 }
  ],

  // ======================
  // 🇬🇷 GREEK
  // ======================
  el: [
    { icon: "📨", q: "Λαμβάνεις email που λέει ότι ο λογαριασμός σου θα κλείσει αν δεν πατήσεις έναν σύνδεσμο. Τι κάνεις;", options: ["Πατάς τον σύνδεσμο","Απαντάς στο email","Το αγνοείς και ελέγχεις τον λογαριασμό από την επίσημη ιστοσελίδα","Το προωθείς σε φίλους"], correct: 2 },
    { icon: "🔑", q: "Ένα site σου ζητά να δημιουργήσεις κωδικό. Ποια επιλογή είναι η πιο ασφαλής;", options: ["Το όνομα του κατοικιδίου σου","12345678","Ένας μεγάλος, μοναδικός κωδικός με σύμβολα","Η ημερομηνία γέννησής σου"], correct: 2 },
    { icon: "💬", q: "Κάποιος άγνωστος σου ζητά τον κωδικό επιβεβαίωσης που μόλις έλαβες. Τι κάνεις;", options: ["Του δίνεις τον κωδικό","Ρωτάς γιατί τον χρειάζεται","Τον μπλοκάρεις και τον αναφέρεις","Το αγνοείς"], correct: 2 },
    { icon: "📶", q: "Συνδέεσαι σε δωρεάν δημόσιο Wi‑Fi. Τι πρέπει να αποφύγεις;", options: ["Να διαβάζεις ειδήσεις","Να μπαίνεις στα social","Να συνδέεσαι σε τραπεζικές εφαρμογές","Να βλέπεις βίντεο"], correct: 2 },
    { icon: "🔍", q: "Ένας φίλος σου στέλνει έναν ύποπτο σύνδεσμο. Ποια είναι η πιο ασφαλής επιλογή;", options: ["Τον πατάς","Τον ρωτάς αν είναι ασφαλές","Το διαγράφεις και τον ενημερώνεις","Το προωθείς"], correct: 2 },
    { icon: "🛒", q: "Ποιος είναι ο ασφαλέστερος τρόπος να ενημερώνεις τις εφαρμογές σου;", options: ["Κατεβάζεις APK από τυχαία sites","Χρησιμοποιείς το επίσημο app store","Περιμένεις μήνες πριν ενημερώσεις","Δεν ενημερώνεις ποτέ"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Κάποιος σε καλεί ως 'τεχνική υποστήριξη' και ζητά απομακρυσμένη πρόσβαση. Τι κάνεις;", options: ["Του δίνεις πρόσβαση","Ζητάς τα στοιχεία του","Κλείνεις αμέσως το τηλέφωνο","Ακολουθείς τις οδηγίες του"], correct: 2 },
    { icon: "🔐", q: "Τι είναι το two‑factor authentication (2FA);", options: ["Δύο κωδικοί","Ένα δεύτερο βήμα, όπως κωδικός ή εφαρμογή","Διπλή είσοδος","Ένα εφεδρικό email"], correct: 1 },
    { icon: "💾", q: "Βρίσκεις ένα USB στο δρόμο. Τι κάνεις;", options: ["Το βάζεις στον υπολογιστή σου","Το δίνεις σε φίλο","Το πετάς","Το αφήνεις ή το δίνεις στα χαμένα"], correct: 3 },
    { icon: "⚠️", q: "Ένα URL φαίνεται περίεργο (π.χ. 'paypa1.com'). Τι σημαίνει αυτό;", options: ["Είναι νέα έκδοση","Είναι απλό λάθος","Πιθανό phishing site","Είναι ασφαλές"], correct: 2 },
    { icon: "🛡️", q: "Ποιος είναι ο ασφαλέστερος τρόπος αποθήκευσης κωδικών;", options: ["Σε ένα τετράδιο","Στις σημειώσεις του κινητού","Σε password manager","Ένας κωδικός για όλα"], correct: 2 },
    { icon: "📱", q: "Μια εφαρμογή ζητά άδειες που δεν χρειάζεται. Τι κάνεις;", options: ["Τα επιτρέπεις όλα","Τα επιτρέπεις μόνο αν την εμπιστεύεσαι","Τα αρνείσαι και την απεγκαθιστάς","Κάνεις επανεκκίνηση"], correct: 2 },
    { icon: "🎁", q: "Λαμβάνεις μήνυμα 'Κέρδισες δώρο! Πάτα εδώ'. Τι κάνεις;", options: ["Το πατάς","Το μοιράζεσαι με φίλους","Το διαγράφεις","Ρωτάς για λεπτομέρειες"], correct: 2 },
    { icon: "⭐", q: "Τι πρέπει να κάνεις πριν εγκαταστήσεις μια νέα εφαρμογή;", options: ["Να δεις κριτικές και άδειες","Να την εγκαταστήσεις αμέσως","Να ρωτήσεις έναν φίλο","Να αγνοήσεις τις άδειες"], correct: 0 },
    { icon: "🧹", q: "Η συσκευή σου είναι αργή και εμφανίζει περίεργα pop‑ups. Τι κάνεις;", options: ["Εγκαθιστάς τυχαίες 'cleaner' εφαρμογές","Κάνεις μόνο επανεκκίνηση","Τρέχεις antivirus ή έλεγχο ασφαλείας","Το αγνοείς"], correct: 2 }
  ],

  // ======================
  // 🇮🇹 ITALIAN
  // ======================
  it: [
  {
    icon: "📨",
    q: "Ricevi un'email che dice che il tuo account verrà chiuso se non clicchi un link. Cosa fai?",
    options: [
      "Clicchi il link",
      "Rispondi all'email",
      "Lo ignori e controlli l'account dal sito ufficiale",
      "Lo inoltri agli amici"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Un sito ti chiede di creare una password. Qual è l'opzione più sicura?",
    options: [
      "Il nome del tuo animale domestico",
      "12345678",
      "Una password lunga, unica e con simboli",
      "La tua data di nascita"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Uno sconosciuto ti chiede un codice di verifica che hai ricevuto. Cosa fai?",
    options: [
      "Gli dai il codice",
      "Chiedi perché ne ha bisogno",
      "Blocchi e segnali il messaggio",
      "Lo ignori"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Ti connetti a un Wi‑Fi pubblico gratuito. Cosa dovresti evitare?",
    options: [
      "Leggere notizie",
      "Controllare i social",
      "Accedere alle app bancarie",
      "Guardare video"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Un amico ti invia un link sospetto. Qual è l'azione più sicura?",
    options: [
      "Cliccarlo",
      "Chiedergli se è sicuro",
      "Cancellarlo e avvisarlo",
      "Inoltrarlo"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Qual è il modo più sicuro per aggiornare le app?",
    options: [
      "Scaricare APK da siti casuali",
      "Usare lo store ufficiale",
      "Aspettare mesi prima di aggiornare",
      "Non aggiornare mai"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Qualcuno ti chiama dicendo di essere 'assistenza tecnica' e chiede accesso remoto. Cosa fai?",
    options: [
      "Concedi l'accesso",
      "Chiedi un documento",
      "Chiudi subito la chiamata",
      "Segui le sue istruzioni"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "Cos'è l'autenticazione a due fattori (2FA)?",
    options: [
      "Usare due password",
      "Un secondo passaggio come un codice o un'app",
      "Accedere due volte",
      "Una email di backup"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Trovi una chiavetta USB per terra. Cosa fai?",
    options: [
      "La colleghi al computer",
      "La dai a un amico",
      "La butti",
      "La lasci lì o la porti agli oggetti smarriti"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Un URL sembra strano (es. 'paypa1.com'). Cosa significa?",
    options: [
      "È una nuova versione",
      "È un errore di battitura",
      "Probabilmente è un sito di phishing",
      "È sicuro"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Qual è il modo più sicuro per conservare le password?",
    options: [
      "Su un quaderno",
      "Nelle note del telefono",
      "In un password manager",
      "Una sola password per tutti gli account"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Un'app chiede permessi che non le servono (es. torcia che chiede contatti). Cosa fai?",
    options: [
      "Consenti tutto",
      "Consenti solo se ti fidi",
      "Nega e disinstalla",
      "Riavvia il telefono"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Ricevi un messaggio: 'Hai vinto un premio! Clicca qui'. Cosa fai?",
    options: [
      "Clicchi subito",
      "Lo condividi con gli amici",
      "Lo cancelli",
      "Chiedi dettagli"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "Cosa dovresti fare prima di installare una nuova app?",
    options: [
      "Controllare recensioni e permessi",
      "Installarla subito",
      "Chiedere a un amico",
      "Ignorare i permessi"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Il dispositivo è lento e compaiono pop‑up strani. Cosa fai?",
    options: [
      "Installi app 'cleaner' casuali",
      "Riavvii soltanto",
      "Esegui antivirus o controllo di sicurezza",
      "Ignori il problema"
    ],
    correct: 2
  }
],

  // ======================
  // 🇪🇸 SPANISH
  // ======================
  es: [
  {
    icon: "📨",
    q: "Recibes un correo diciendo que tu cuenta será cerrada si no haces clic en un enlace. ¿Qué haces?",
    options: [
      "Hacer clic en el enlace",
      "Responder al correo",
      "Ignorarlo y revisar tu cuenta desde el sitio oficial",
      "Reenviarlo a amigos"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Un sitio web te pide crear una contraseña. ¿Cuál es la opción más segura?",
    options: [
      "El nombre de tu mascota",
      "12345678",
      "Una contraseña larga, única y con símbolos",
      "Tu fecha de nacimiento"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Un desconocido te pide un código de verificación que recibiste. ¿Qué haces?",
    options: [
      "Darle el código",
      "Preguntar por qué lo necesita",
      "Bloquear y reportar el mensaje",
      "Ignorarlo"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Te conectas a una red Wi‑Fi pública gratuita. ¿Qué deberías evitar?",
    options: [
      "Leer noticias",
      "Revisar redes sociales",
      "Iniciar sesión en apps bancarias",
      "Ver videos"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Un amigo te envía un enlace sospechoso. ¿Qué es lo más seguro?",
    options: [
      "Hacer clic",
      "Preguntarle si es seguro",
      "Eliminarlo y advertirle",
      "Reenviarlo"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "¿Cuál es la forma más segura de actualizar tus aplicaciones?",
    options: [
      "Descargar APK desde sitios aleatorios",
      "Usar la tienda oficial",
      "Esperar meses antes de actualizar",
      "Nunca actualizar"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Alguien te llama diciendo ser 'soporte técnico' y pide acceso remoto. ¿Qué haces?",
    options: [
      "Dar acceso",
      "Pedir identificación",
      "Colgar inmediatamente",
      "Seguir sus instrucciones"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "¿Qué es la autenticación de dos factores (2FA)?",
    options: [
      "Usar dos contraseñas",
      "Un segundo paso como un código o app",
      "Iniciar sesión dos veces",
      "Un correo de respaldo"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Encuentras una memoria USB en el suelo. ¿Qué haces?",
    options: [
      "Conectarla a tu computadora",
      "Dársela a un amigo",
      "Tirarla",
      "Dejarla o llevarla a objetos perdidos"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Una URL se ve extraña (ej. 'paypa1.com'). ¿Qué significa?",
    options: [
      "Es una nueva versión",
      "Es un error de escritura",
      "Probablemente es phishing",
      "Es segura"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "¿Cuál es la forma más segura de guardar contraseñas?",
    options: [
      "En una libreta",
      "En las notas del teléfono",
      "En un gestor de contraseñas",
      "Una sola contraseña para todo"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Una app pide permisos que no necesita (ej. linterna pide contactos). ¿Qué haces?",
    options: [
      "Permitir todo",
      "Permitir solo si confías",
      "Denegar y desinstalar",
      "Reiniciar el teléfono"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Recibes un mensaje: '¡Ganaste un premio! Haz clic aquí'. ¿Qué haces?",
    options: [
      "Hacer clic",
      "Compartirlo con amigos",
      "Eliminarlo",
      "Pedir detalles"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "¿Qué deberías hacer antes de instalar una nueva app?",
    options: [
      "Revisar opiniones y permisos",
      "Instalarla de inmediato",
      "Preguntar a un amigo",
      "Ignorar los permisos"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Tu dispositivo está lento y aparecen ventanas emergentes extrañas. ¿Qué haces?",
    options: [
      "Instalar apps 'cleaner' aleatorias",
      "Solo reiniciar",
      "Ejecutar antivirus o análisis de seguridad",
      "Ignorarlo"
    ],
    correct: 2
  }
 ],

  // ======================
  // 🇫🇷 FRENCH
  // ======================
  fr: [
  {
    icon: "📨",
    q: "Vous recevez un email disant que votre compte sera fermé si vous ne cliquez pas sur un lien. Que faites‑vous ?",
    options: [
      "Cliquer sur le lien",
      "Répondre à l’email",
      "L’ignorer et vérifier votre compte via le site officiel",
      "Le transférer à des amis"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Un site vous demande de créer un mot de passe. Quelle option est la plus sûre ?",
    options: [
      "Le nom de votre animal",
      "12345678",
      "Un mot de passe long, unique et avec des symboles",
      "Votre date de naissance"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Un inconnu vous demande un code de vérification que vous avez reçu. Que faites‑vous ?",
    options: [
      "Lui donner le code",
      "Demander pourquoi il en a besoin",
      "Bloquer et signaler le message",
      "L’ignorer"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Vous vous connectez à un Wi‑Fi public gratuit. Que devez‑vous éviter ?",
    options: [
      "Lire les actualités",
      "Aller sur les réseaux sociaux",
      "Vous connecter à vos applications bancaires",
      "Regarder des vidéos"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Un ami vous envoie un lien suspect. Quelle est l’action la plus sûre ?",
    options: [
      "Cliquer dessus",
      "Lui demander si c’est sûr",
      "Le supprimer et l’avertir",
      "Le transférer"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Quelle est la manière la plus sûre de mettre à jour vos applications ?",
    options: [
      "Télécharger des APK depuis des sites aléatoires",
      "Utiliser la boutique officielle",
      "Attendre plusieurs mois avant de mettre à jour",
      "Ne jamais mettre à jour"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Quelqu’un vous appelle en prétendant être du 'support technique' et demande un accès à distance. Que faites‑vous ?",
    options: [
      "Donner l’accès",
      "Demander une pièce d’identité",
      "Raccrocher immédiatement",
      "Suivre ses instructions"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "Qu’est‑ce que l’authentification à deux facteurs (2FA) ?",
    options: [
      "Utiliser deux mots de passe",
      "Un second facteur comme un code ou une application",
      "Se connecter deux fois",
      "Un email de secours"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Vous trouvez une clé USB par terre. Que faites‑vous ?",
    options: [
      "La brancher à votre ordinateur",
      "La donner à un ami",
      "La jeter",
      "La laisser ou la remettre aux objets trouvés"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Une URL semble étrange (ex. 'paypa1.com'). Que cela signifie‑t‑il ?",
    options: [
      "C’est une nouvelle version",
      "C’est une faute de frappe",
      "C’est probablement un site de phishing",
      "C’est sûr"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Quelle est la manière la plus sûre de stocker vos mots de passe ?",
    options: [
      "Dans un carnet",
      "Dans les notes de votre téléphone",
      "Dans un gestionnaire de mots de passe",
      "Un seul mot de passe pour tout"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Une application demande des permissions dont elle n’a pas besoin (ex. une lampe torche demande vos contacts). Que faites‑vous ?",
    options: [
      "Tout autoriser",
      "Autoriser seulement si vous lui faites confiance",
      "Refuser et désinstaller",
      "Redémarrer le téléphone"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Vous recevez un message : 'Vous avez gagné un cadeau ! Cliquez ici'. Que faites‑vous ?",
    options: [
      "Cliquer immédiatement",
      "Le partager avec des amis",
      "Le supprimer",
      "Demander plus de détails"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "Que devez‑vous faire avant d’installer une nouvelle application ?",
    options: [
      "Vérifier les avis et les permissions",
      "L’installer immédiatement",
      "Demander à un ami",
      "Ignorer les permissions"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Votre appareil est lent et affiche des pop‑ups étranges. Que faites‑vous ?",
    options: [
      "Installer des applications 'cleaner' aléatoires",
      "Redémarrer seulement",
      "Lancer un antivirus ou une analyse de sécurité",
      "Ignorer le problème"
    ],
    correct: 2
  }
],

  // ======================
  // 🇩🇪 GERMAN
  // ======================
  de: [
  {
    icon: "📨",
    q: "Du erhältst eine E‑Mail, die behauptet, dein Konto werde geschlossen, wenn du nicht auf einen Link klickst. Was tust du?",
    options: [
      "Auf den Link klicken",
      "Auf die E‑Mail antworten",
      "Ignorieren und dein Konto über die offizielle Website prüfen",
      "An Freunde weiterleiten"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Eine Website fordert dich auf, ein Passwort zu erstellen. Welche Option ist am sichersten?",
    options: [
      "Der Name deines Haustiers",
      "12345678",
      "Ein langes, einzigartiges Passwort mit Symbolen",
      "Dein Geburtsdatum"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Ein Fremder bittet dich um einen Bestätigungscode, den du erhalten hast. Was tust du?",
    options: [
      "Den Code geben",
      "Fragen, warum er ihn braucht",
      "Nachricht blockieren und melden",
      "Ignorieren"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Du verbindest dich mit einem kostenlosen öffentlichen WLAN. Was solltest du vermeiden?",
    options: [
      "Nachrichten lesen",
      "Soziale Medien nutzen",
      "Dich in Banking‑Apps einloggen",
      "Videos ansehen"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Ein Freund sendet dir einen verdächtigen Link. Was ist am sichersten?",
    options: [
      "Darauf klicken",
      "Fragen, ob er sicher ist",
      "Löschen und den Freund warnen",
      "Weiterleiten"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Wie aktualisierst du Apps am sichersten?",
    options: [
      "APKs von zufälligen Websites herunterladen",
      "Den offiziellen App‑Store nutzen",
      "Monate warten, bevor du aktualisierst",
      "Nie aktualisieren"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Jemand ruft an und behauptet, vom 'Technischen Support' zu sein, und bittet um Fernzugriff. Was tust du?",
    options: [
      "Zugriff gewähren",
      "Nach einem Ausweis fragen",
      "Sofort auflegen",
      "Den Anweisungen folgen"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "Was ist Zwei‑Faktor‑Authentifizierung (2FA)?",
    options: [
      "Zwei Passwörter verwenden",
      "Ein zweiter Schritt wie ein Code oder eine App",
      "Zweimal einloggen",
      "Eine Backup‑E‑Mail"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Du findest einen USB‑Stick auf dem Boden. Was tust du?",
    options: [
      "An deinen Computer anschließen",
      "Einem Freund geben",
      "Wegwerfen",
      "Liegen lassen oder zum Fundbüro bringen"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Eine URL sieht seltsam aus (z. B. 'paypa1.com'). Was bedeutet das?",
    options: [
      "Es ist eine neue Version",
      "Es ist ein Tippfehler",
      "Es ist wahrscheinlich eine Phishing‑Seite",
      "Es ist sicher"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Wie speicherst du Passwörter am sichersten?",
    options: [
      "In einem Notizbuch",
      "In den Handy‑Notizen",
      "In einem Passwort‑Manager",
      "Ein Passwort für alle Konten"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Eine App fordert Berechtigungen an, die sie nicht benötigt (z. B. Taschenlampe will Kontakte). Was tust du?",
    options: [
      "Alles erlauben",
      "Nur erlauben, wenn du ihr vertraust",
      "Verweigern und deinstallieren",
      "Handy neu starten"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Du erhältst eine Nachricht: 'Du hast einen Preis gewonnen! Klicke hier.' Was tust du?",
    options: [
      "Sofort klicken",
      "Mit Freunden teilen",
      "Löschen",
      "Nach Details fragen"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "Was solltest du tun, bevor du eine neue App installierst?",
    options: [
      "Bewertungen und Berechtigungen prüfen",
      "Sofort installieren",
      "Einen Freund fragen",
      "Berechtigungen ignorieren"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Dein Gerät ist langsam und zeigt seltsame Pop‑ups. Was tust du?",
    options: [
      "Zufällige 'Cleaner'‑Apps installieren",
      "Nur neu starten",
      "Antivirus oder Sicherheitsprüfung durchführen",
      "Ignorieren"
    ],
    correct: 2
  }
],

  // ======================
  // 🇵🇹 PORTUGUESE
  // ======================
  pt: [
  {
    icon: "📨",
    q: "Você recebe um e‑mail dizendo que sua conta será encerrada se não clicar em um link. O que você faz?",
    options: [
      "Clicar no link",
      "Responder ao e‑mail",
      "Ignorar e verificar sua conta pelo site oficial",
      "Encaminhar para amigos"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Um site pede para você criar uma senha. Qual opção é a mais segura?",
    options: [
      "O nome do seu animal de estimação",
      "12345678",
      "Uma senha longa, única e com símbolos",
      "Sua data de nascimento"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Um desconhecido pede um código de verificação que você recebeu. O que você faz?",
    options: [
      "Dar o código",
      "Perguntar por que ele precisa",
      "Bloquear e denunciar a mensagem",
      "Ignorar"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Você se conecta a um Wi‑Fi público gratuito. O que deve evitar?",
    options: [
      "Ler notícias",
      "Ver redes sociais",
      "Entrar em aplicativos bancários",
      "Assistir vídeos"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Um amigo envia um link suspeito. Qual é a ação mais segura?",
    options: [
      "Clicar",
      "Perguntar se é seguro",
      "Excluir e avisá‑lo",
      "Encaminhar"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Qual é a forma mais segura de atualizar seus aplicativos?",
    options: [
      "Baixar APKs de sites aleatórios",
      "Usar a loja oficial",
      "Esperar meses antes de atualizar",
      "Nunca atualizar"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Alguém liga dizendo ser do 'suporte técnico' e pede acesso remoto. O que você faz?",
    options: [
      "Conceder acesso",
      "Pedir identificação",
      "Desligar imediatamente",
      "Seguir as instruções"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "O que é autenticação de dois fatores (2FA)?",
    options: [
      "Usar duas senhas",
      "Um segundo passo como um código ou aplicativo",
      "Entrar duas vezes",
      "Um e‑mail de backup"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Você encontra um pendrive no chão. O que faz?",
    options: [
      "Conectar ao computador",
      "Dar para um amigo",
      "Jogar fora",
      "Deixar lá ou entregar aos achados e perdidos"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Uma URL parece estranha (ex.: 'paypa1.com'). O que isso significa?",
    options: [
      "É uma nova versão",
      "É um erro de digitação",
      "Provavelmente é um site de phishing",
      "É seguro"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Qual é a forma mais segura de armazenar senhas?",
    options: [
      "Em um caderno",
      "Nas notas do celular",
      "Em um gerenciador de senhas",
      "Uma senha única para tudo"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Um aplicativo pede permissões que não precisa (ex.: lanterna pedindo contatos). O que você faz?",
    options: [
      "Permitir tudo",
      "Permitir apenas se confiar",
      "Negar e desinstalar",
      "Reiniciar o celular"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Você recebe uma mensagem: 'Você ganhou um prêmio! Clique aqui'. O que faz?",
    options: [
      "Clicar imediatamente",
      "Compartilhar com amigos",
      "Excluir",
      "Pedir detalhes"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "O que você deve fazer antes de instalar um novo aplicativo?",
    options: [
      "Verificar avaliações e permissões",
      "Instalar imediatamente",
      "Perguntar a um amigo",
      "Ignorar permissões"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Seu dispositivo está lento e aparecem pop‑ups estranhos. O que você faz?",
    options: [
      "Instalar aplicativos 'cleaner' aleatórios",
      "Apenas reiniciar",
      "Executar antivírus ou verificação de segurança",
      "Ignorar"
    ],
    correct: 2
  }
],

  // ======================
  // 🇹🇷 TURKISH
  // ======================
  tr: [
  {
    icon: "📨",
    q: "Hesabınızın kapanacağını söyleyen ve bir bağlantıya tıklamanızı isteyen bir e‑posta alıyorsunuz. Ne yaparsınız?",
    options: [
      "Bağlantıya tıklamak",
      "E‑postayı yanıtlamak",
      "Yoksaymak ve hesabı resmi site üzerinden kontrol etmek",
      "Arkadaşlara iletmek"
    ],
    correct: 2
  },
  {m
    icon: "🔑",
    q: "Bir site sizden şifre oluşturmanızı istiyor. En güvenli seçenek hangisidir?",
    options: [
      "Evcil hayvanınızın adı",
      "12345678",
      "Uzun, benzersiz ve semboller içeren bir şifre",
      "Doğum tarihiniz"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Bir yabancı size gelen doğrulama kodunu istiyor. Ne yaparsınız?",
    options: [
      "Kodu vermek",
      "Neden istediğini sormak",
      "Mesajı engelleyip şikayet etmek",
      "Yoksaymak"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Ücretsiz bir halka açık Wi‑Fi ağına bağlanıyorsunuz. Neden kaçınmalısınız?",
    options: [
      "Haber okumak",
      "Sosyal medyaya bakmak",
      "Bankacılık uygulamalarına giriş yapmak",
      "Video izlemek"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Bir arkadaşınız size şüpheli bir bağlantı gönderiyor. En güvenli seçenek hangisidir?",
    options: [
      "Tıklamak",
      "Güvenli olup olmadığını sormak",
      "Silmek ve arkadaşınızı uyarmak",
      "İletmek"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Uygulamaları güncellemenin en güvenli yolu nedir?",
    options: [
      "Rastgele sitelerden APK indirmek",
      "Resmi uygulama mağazasını kullanmak",
      "Güncellemek için aylarca beklemek",
      "Hiç güncellememek"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Biri sizi arayıp 'teknik destek' olduğunu söyleyerek uzaktan erişim istiyor. Ne yaparsınız?",
    options: [
      "Erişim vermek",
      "Kimlik istemek",
      "Hemen telefonu kapatmak",
      "Talimatlarını takip etmek"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "İki faktörlü kimlik doğrulama (2FA) nedir?",
    options: [
      "İki şifre kullanmak",
      "Kod veya uygulama gibi ikinci bir adım",
      "İki kez giriş yapmak",
      "Yedek e‑posta"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Yerde bir USB bellek buluyorsunuz. Ne yaparsınız?",
    options: [
      "Bilgisayara takmak",
      "Bir arkadaşınıza vermek",
      "Çöpe atmak",
      "Olduğu yerde bırakmak veya kayıp eşyalara teslim etmek"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "Bir URL garip görünüyor (ör. 'paypa1.com'). Bu ne anlama gelir?",
    options: [
      "Yeni bir sürüm",
      "Yazım hatası",
      "Muhtemelen bir phishing sitesi",
      "Güvenlidir"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Şifreleri saklamanın en güvenli yolu nedir?",
    options: [
      "Bir deftere yazmak",
      "Telefon notlarına kaydetmek",
      "Bir şifre yöneticisi kullanmak",
      "Tüm hesaplar için tek şifre"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Bir uygulama ihtiyaç duymadığı izinleri istiyor (ör. fener uygulaması rehber istiyor). Ne yaparsınız?",
    options: [
      "Hepsine izin vermek",
      "Sadece güveniyorsanız izin vermek",
      "Reddetmek ve uygulamayı kaldırmak",
      "Telefonu yeniden başlatmak"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Bir mesaj alıyorsunuz: 'Ödül kazandınız! Buraya tıklayın'. Ne yaparsınız?",
    options: [
      "Hemen tıklamak",
      "Arkadaşlarla paylaşmak",
      "Silmek",
      "Detay sormak"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "Yeni bir uygulama yüklemeden önce ne yapmalısınız?",
    options: [
      "Yorumları ve izinleri kontrol etmek",
      "Hemen yüklemek",
      "Bir arkadaşınıza sormak",
      "İzinleri görmezden gelmek"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Cihazınız yavaş ve garip pop‑up’lar gösteriyor. Ne yaparsınız?",
    options: [
      "Rastgele 'cleaner' uygulamaları yüklemek",
      "Sadece yeniden başlatmak",
      "Antivirüs veya güvenlik taraması çalıştırmak",
      "Yoksaymak"
    ],
    correct: 2
  }
],

  // ======================
  // 🇨🇳 CHINESE
  // ======================
  zh: [
  {
    icon: "📨",
    q: "你收到一封邮件，说如果不点击链接你的账户将被关闭。你应该怎么做？",
    options: [
      "点击链接",
      "回复邮件",
      "忽略它并通过官方网站检查账户",
      "转发给朋友"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "一个网站要求你创建密码。哪种最安全？",
    options: [
      "宠物的名字",
      "12345678",
      "一个长且独特并包含符号的密码",
      "你的生日"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "一个陌生人向你索要你收到的验证码。你应该怎么做？",
    options: [
      "把验证码给他",
      "问他为什么需要",
      "拉黑并举报",
      "忽略"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "你连接到免费的公共 Wi‑Fi。你应该避免什么？",
    options: [
      "看新闻",
      "浏览社交媒体",
      "登录银行应用",
      "看视频"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "朋友发给你一个可疑链接。最安全的做法是什么？",
    options: [
      "点击它",
      "问他是否安全",
      "删除并提醒他",
      "转发"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "更新应用程序最安全的方法是什么？",
    options: [
      "从随机网站下载 APK",
      "使用官方应用商店",
      "几个月都不更新",
      "永远不更新"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "有人打电话自称“技术支持”，并要求远程访问。你应该怎么做？",
    options: [
      "允许访问",
      "要求对方提供身份证明",
      "立即挂断电话",
      "按照对方指示操作"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "什么是双重验证（2FA）？",
    options: [
      "使用两个密码",
      "第二步验证，例如验证码或验证应用",
      "登录两次",
      "备用邮箱"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "你在地上捡到一个 USB。你应该怎么做？",
    options: [
      "插到电脑上",
      "给朋友",
      "扔掉",
      "放着不动或交给失物招领"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "一个网址看起来很奇怪（例如 'paypa1.com'）。这意味着什么？",
    options: [
      "是新版本",
      "是拼写错误",
      "可能是钓鱼网站",
      "是安全的"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "存储密码最安全的方法是什么？",
    options: [
      "写在笔记本上",
      "存到手机备忘录",
      "使用密码管理器",
      "所有账户用同一个密码"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "一个应用请求不必要的权限（例如手电筒应用请求通讯录）。你应该怎么做？",
    options: [
      "全部允许",
      "只有在你信任它时才允许",
      "拒绝并卸载",
      "重启手机"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "你收到一条消息：“你中奖了！点击领取。”你应该怎么做？",
    options: [
      "立即点击",
      "分享给朋友",
      "删除",
      "询问详情"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "安装新应用之前你应该做什么？",
    options: [
      "查看评论和权限",
      "立即安装",
      "问朋友",
      "忽略权限"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "你的设备变慢并出现奇怪的弹窗。你应该怎么做？",
    options: [
      "安装随机的“清理”应用",
      "只重启",
      "运行杀毒或安全扫描",
      "忽略"
    ],
    correct: 2
  }
],

  // ======================
  // 🇷🇺 RUSSIAN
  // ======================
  ru: [
  {
    icon: "📨",
    q: "Вы получаете письмо, в котором говорится, что ваш аккаунт будет закрыт, если вы не перейдёте по ссылке. Что вы сделаете?",
    options: [
      "Перейти по ссылке",
      "Ответить на письмо",
      "Игнорировать и проверить аккаунт через официальный сайт",
      "Переслать друзьям"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "Сайт просит вас создать пароль. Какой вариант самый безопасный?",
    options: [
      "Имя вашего питомца",
      "12345678",
      "Длинный уникальный пароль с символами",
      "Дата вашего рождения"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "Незнакомец просит код подтверждения, который вы получили. Что вы сделаете?",
    options: [
      "Отдать код",
      "Спросить, зачем он ему нужен",
      "Заблокировать и пожаловаться",
      "Проигнорировать"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "Вы подключаетесь к бесплатному общественному Wi‑Fi. Чего следует избегать?",
    options: [
      "Читать новости",
      "Проверять соцсети",
      "Входить в банковские приложения",
      "Смотреть видео"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "Друг прислал вам подозрительную ссылку. Какой вариант самый безопасный?",
    options: [
      "Перейти по ссылке",
      "Спросить, безопасно ли это",
      "Удалить и предупредить друга",
      "Переслать"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "Как самый безопасный способ обновлять приложения?",
    options: [
      "Скачивать APK с случайных сайтов",
      "Использовать официальный магазин приложений",
      "Ждать несколько месяцев перед обновлением",
      "Никогда не обновлять"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "Кто‑то звонит, представляется 'техподдержкой' и просит удалённый доступ. Что вы сделаете?",
    options: [
      "Предоставить доступ",
      "Попросить удостоверение",
      "Сразу положить трубку",
      "Следовать инструкциям"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "Что такое двухфакторная аутентификация (2FA)?",
    options: [
      "Использование двух паролей",
      "Второй шаг, например код или приложение",
      "Двойной вход",
      "Резервная почта"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "Вы находите USB‑накопитель на улице. Что вы сделаете?",
    options: [
      "Подключить к компьютеру",
      "Отдать другу",
      "Выбросить",
      "Оставить или передать в бюро находок"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "URL выглядит странно (например, 'paypa1.com'). Что это может означать?",
    options: [
      "Это новая версия сайта",
      "Это опечатка",
      "Это, вероятно, фишинговый сайт",
      "Это безопасно"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "Как самый безопасный способ хранить пароли?",
    options: [
      "В блокноте",
      "В заметках телефона",
      "В менеджере паролей",
      "Один пароль для всех аккаунтов"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "Приложение запрашивает ненужные разрешения (например, фонарик просит доступ к контактам). Что вы сделаете?",
    options: [
      "Разрешить всё",
      "Разрешить только если доверяете",
      "Отклонить и удалить приложение",
      "Перезагрузить телефон"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "Вы получаете сообщение: 'Вы выиграли приз! Нажмите здесь'. Что вы сделаете?",
    options: [
      "Сразу нажать",
      "Поделиться с друзьями",
      "Удалить",
      "Спросить подробности"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "Что нужно сделать перед установкой нового приложения?",
    options: [
      "Проверить отзывы и разрешения",
      "Установить сразу",
      "Спросить друга",
      "Игнорировать разрешения"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "Ваше устройство работает медленно и показывает странные всплывающие окна. Что вы сделаете?",
    options: [
      "Установить случайные 'cleaner'‑приложения",
      "Просто перезагрузить",
      "Запустить антивирус или проверку безопасности",
      "Игнорировать"
    ],
    correct: 2
  }
],

  // ======================
  // 🇮🇳 HINDI
  // ======================
  hi: [
  {
    icon: "📨",
    q: "आपको एक ईमेल मिलता है जिसमें लिखा है कि आपका अकाउंट बंद हो जाएगा अगर आप लिंक पर क्लिक नहीं करते। आप क्या करेंगे?",
    options: [
      "लिंक पर क्लिक करना",
      "ईमेल का जवाब देना",
      "इसे अनदेखा करना और आधिकारिक वेबसाइट से अकाउंट चेक करना",
      "दोस्तों को फॉरवर्ड करना"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "एक वेबसाइट आपसे पासवर्ड बनाने को कहती है। सबसे सुरक्षित विकल्प कौन‑सा है?",
    options: [
      "आपके पालतू का नाम",
      "12345678",
      "लंबा, यूनिक और सिंबल वाला पासवर्ड",
      "आपकी जन्मतिथि"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "एक अजनबी आपसे वह वेरिफिकेशन कोड मांगता है जो आपको मिला है। आप क्या करेंगे?",
    options: [
      "उसे कोड दे देना",
      "पूछना कि उसे क्यों चाहिए",
      "ब्लॉक और रिपोर्ट करना",
      "अनदेखा करना"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "आप फ्री पब्लिक Wi‑Fi से कनेक्ट होते हैं। आपको क्या नहीं करना चाहिए?",
    options: [
      "न्यूज़ पढ़ना",
      "सोशल मीडिया चेक करना",
      "बैंकिंग ऐप में लॉगिन करना",
      "वीडियो देखना"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "एक दोस्त आपको एक संदिग्ध लिंक भेजता है। सबसे सुरक्षित विकल्प क्या है?",
    options: [
      "लिंक पर क्लिक करना",
      "पूछना कि यह सुरक्षित है या नहीं",
      "लिंक डिलीट करना और दोस्त को चेतावनी देना",
      "इसे आगे भेजना"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "ऐप्स को अपडेट करने का सबसे सुरक्षित तरीका क्या है?",
    options: [
      "रैंडम वेबसाइट से APK डाउनलोड करना",
      "ऑफिशियल ऐप स्टोर का उपयोग करना",
      "कई महीनों तक अपडेट न करना",
      "कभी अपडेट न करना"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "कोई व्यक्ति कॉल करके खुद को 'टेक्निकल सपोर्ट' बताता है और रिमोट एक्सेस मांगता है। आप क्या करेंगे?",
    options: [
      "उसे एक्सेस दे देना",
      "उसकी पहचान पूछना",
      "तुरंत कॉल काट देना",
      "उसके निर्देशों का पालन करना"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "टू‑फैक्टर ऑथेंटिकेशन (2FA) क्या है?",
    options: [
      "दो पासवर्ड का उपयोग",
      "एक दूसरा स्टेप, जैसे कोड या ऐप",
      "दो बार लॉगिन करना",
      "एक बैकअप ईमेल"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "आपको जमीन पर एक USB ड्राइव मिलती है। आप क्या करेंगे?",
    options: [
      "इसे कंप्यूटर में लगाना",
      "दोस्त को दे देना",
      "फेंक देना",
      "वहीं छोड़ देना या खोया‑पाया में जमा करना"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "एक URL अजीब लगता है (जैसे 'paypa1.com')। इसका क्या मतलब हो सकता है?",
    options: [
      "यह नई वर्ज़न है",
      "यह टाइपो है",
      "यह शायद फ़िशिंग साइट है",
      "यह सुरक्षित है"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "पासवर्ड स्टोर करने का सबसे सुरक्षित तरीका क्या है?",
    options: [
      "एक नोटबुक में लिखना",
      "फोन की नोट्स में सेव करना",
      "पासवर्ड मैनेजर का उपयोग करना",
      "सभी अकाउंट के लिए एक ही पासवर्ड"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "एक ऐप ऐसी परमिशन मांगता है जिसकी उसे जरूरत नहीं है (जैसे टॉर्च ऐप कॉन्टैक्ट्स मांगता है)। आप क्या करेंगे?",
    options: [
      "सब कुछ अनुमति देना",
      "केवल तभी अनुमति देना जब आप भरोसा करते हों",
      "अनुमति न देना और ऐप अनइंस्टॉल करना",
      "फोन रीस्टार्ट करना"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "आपको एक संदेश मिलता है: 'आपने इनाम जीता है! यहाँ क्लिक करें'। आप क्या करेंगे?",
    options: [
      "तुरंत क्लिक करना",
      "दोस्तों के साथ शेयर करना",
      "डिलीट करना",
      "डिटेल पूछना"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "नई ऐप इंस्टॉल करने से पहले आपको क्या करना चाहिए?",
    options: [
      "रिव्यू और परमिशन चेक करना",
      "तुरंत इंस्टॉल करना",
      "दोस्त से पूछना",
      "परमिशन को अनदेखा करना"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "आपका डिवाइस धीमा हो गया है और अजीब पॉप‑अप दिखा रहा है। आप क्या करेंगे?",
    options: [
      "रैंडम 'क्लीनर' ऐप इंस्टॉल करना",
      "सिर्फ रीस्टार्ट करना",
      "एंटीवायरस या सिक्योरिटी स्कैन चलाना",
      "अनदेखा करना"
    ],
    correct: 2
  }
],

  // ======================
  // 🇸🇦 ARABIC
  // ======================
  ar: [
  {
    icon: "📨",
    q: "تتلقى رسالة بريد إلكتروني تقول إن حسابك سيُغلق إذا لم تضغط على الرابط. ماذا تفعل؟",
    options: [
      "الضغط على الرابط",
      "الرد على البريد",
      "تجاهله والتحقق من حسابك عبر الموقع الرسمي",
      "إعادة توجيهه للأصدقاء"
    ],
    correct: 2
  },
  {
    icon: "🔑",
    q: "يطلب منك موقع إنشاء كلمة مرور. ما هو الخيار الأكثر أمانًا؟",
    options: [
      "اسم حيوانك الأليف",
      "12345678",
      "كلمة مرور طويلة وفريدة مع رموز",
      "تاريخ ميلادك"
    ],
    correct: 2
  },
  {
    icon: "💬",
    q: "يطلب منك شخص غريب رمز التحقق الذي وصلك. ماذا تفعل؟",
    options: [
      "إعطاؤه الرمز",
      "سؤاله لماذا يحتاجه",
      "حظره والإبلاغ عنه",
      "تجاهله"
    ],
    correct: 2
  },
  {
    icon: "📶",
    q: "تتصل بشبكة Wi‑Fi عامة مجانية. ماذا يجب أن تتجنب؟",
    options: [
      "قراءة الأخبار",
      "تصفح وسائل التواصل",
      "تسجيل الدخول إلى التطبيقات البنكية",
      "مشاهدة الفيديوهات"
    ],
    correct: 2
  },
  {
    icon: "🔍",
    q: "يرسل لك صديق رابطًا مريبًا. ما هو الخيار الأكثر أمانًا؟",
    options: [
      "الضغط عليه",
      "سؤاله إن كان آمنًا",
      "حذفه وتحذيره",
      "إعادة توجيهه"
    ],
    correct: 2
  },
  {
    icon: "🛒",
    q: "ما هي الطريقة الأكثر أمانًا لتحديث التطبيقات؟",
    options: [
      "تحميل ملفات APK من مواقع عشوائية",
      "استخدام متجر التطبيقات الرسمي",
      "الانتظار أشهر قبل التحديث",
      "عدم التحديث أبدًا"
    ],
    correct: 1
  },
  {
    icon: "🕵️‍♂️",
    q: "يتصل بك شخص ويدّعي أنه من 'الدعم الفني' ويطلب وصولًا عن بُعد. ماذا تفعل؟",
    options: [
      "منحه الوصول",
      "طلب هويته",
      "إغلاق المكالمة فورًا",
      "اتباع تعليماته"
    ],
    correct: 2
  },
  {
    icon: "🔐",
    q: "ما هي المصادقة الثنائية (2FA)؟",
    options: [
      "استخدام كلمتي مرور",
      "خطوة ثانية مثل رمز أو تطبيق",
      "تسجيل الدخول مرتين",
      "بريد إلكتروني احتياطي"
    ],
    correct: 1
  },
  {
    icon: "💾",
    q: "تعثر على USB على الأرض. ماذا تفعل؟",
    options: [
      "توصيله بجهازك",
      "إعطاؤه لصديق",
      "رميه",
      "تركه أو تسليمه لمفقودات"
    ],
    correct: 3
  },
  {
    icon: "⚠️",
    q: "يبدو رابط URL غريبًا (مثل 'paypa1.com'). ماذا يعني ذلك؟",
    options: [
      "نسخة جديدة",
      "خطأ مطبعي",
      "غالبًا موقع تصيّد",
      "آمن"
    ],
    correct: 2
  },
  {
    icon: "🛡️",
    q: "ما هي الطريقة الأكثر أمانًا لتخزين كلمات المرور؟",
    options: [
      "كتابتها في دفتر",
      "حفظها في ملاحظات الهاتف",
      "استخدام مدير كلمات مرور",
      "كلمة مرور واحدة لكل الحسابات"
    ],
    correct: 2
  },
  {
    icon: "📱",
    q: "يطلب تطبيق أذونات لا يحتاجها (مثل تطبيق مصباح يطلب جهات الاتصال). ماذا تفعل؟",
    options: [
      "السماح بكل شيء",
      "السماح فقط إذا كنت تثق به",
      "الرفض وإلغاء التثبيت",
      "إعادة تشغيل الهاتف"
    ],
    correct: 2
  },
  {
    icon: "🎁",
    q: "تتلقى رسالة: 'لقد ربحت جائزة! اضغط هنا'. ماذا تفعل؟",
    options: [
      "الضغط فورًا",
      "مشاركتها مع الأصدقاء",
      "حذفها",
      "طلب تفاصيل"
    ],
    correct: 2
  },
  {
    icon: "⭐",
    q: "ماذا يجب أن تفعل قبل تثبيت تطبيق جديد؟",
    options: [
      "فحص التقييمات والأذونات",
      "تثبيته فورًا",
      "سؤال صديق",
      "تجاهل الأذونات"
    ],
    correct: 0
  },
  {
    icon: "🧹",
    q: "جهازك بطيء ويظهر نوافذ منبثقة غريبة. ماذا تفعل؟",
    options: [
      "تثبيت تطبيقات تنظيف عشوائية",
      "إعادة التشغيل فقط",
      "تشغيل مضاد الفيروسات أو فحص الأمان",
      "تجاهل المشكلة"
    ],
    correct: 2
  }
],
};


// --------------------------------
// 2. QUIZ ENGINE
// --------------------------------

    class QuizEngine {
  constructor(lang = "en") {
    this.lang = questions[lang] ? lang : "en";
    this.data = questions[this.lang];
    this.index = 0;
    this.score = 0;
  }

  getCurrent() {
    return this.data[this.index];
  }

  answer(optionIndex) {
    if (optionIndex === this.getCurrent().correct) {
      this.score++;
    }
    this.index++;
    return this.index < this.data.length;
  }

  getResult() {
    return {
      score: this.score,
      total: this.data.length
    };
  }
}


// --------------------------------
// 3. EXPORT
// --------------------------------

export { questions, QuizEngine };
