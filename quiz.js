// ===============================
// Stay Safe Premium - Quiz System
// ===============================

window.QUESTIONS = {

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
    { icon: "📱", q: "An app asks for permissions it doesn’t need. What should you do?", options: ["Allow everything","Allow only if you trust it","Deny and uninstall","Restart your phone"], correct: 2 },
    { icon: "🎁", q: "You get a message saying 'You won a prize! Click here.' What should you do?", options: ["Click immediately","Share with friends","Delete it","Reply asking for details"], correct: 2 },
    { icon: "⭐", q: "What should you do before installing a new app?", options: ["Check reviews and permissions","Install immediately","Ask a friend","Ignore permissions"], correct: 0 },
    { icon: "🧹", q: "Your device feels slow and shows strange pop‑ups. What’s the safest step?", options: ["Install random cleaner apps","Restart only","Run an antivirus or security scan","Ignore it"], correct: 2 }
  ],

  // ======================
  // 🇩🇪 DEUTSCH
  // ======================
  de: [
    { icon: "📨", q: "Du erhältst eine E‑Mail, die behauptet, dein Konto werde geschlossen, wenn du nicht auf einen Link klickst. Was tust du?", options: ["Auf den Link klicken","Auf die E‑Mail antworten","Ignorieren und dein Konto über die offizielle Website prüfen","An Freunde weiterleiten"], correct: 2 },
    { icon: "🔑", q: "Welche Passwortoption ist am sichersten?", options: ["Name deines Haustiers","12345678","Ein langes, einzigartiges Passwort mit Symbolen","Dein Geburtsdatum"], correct: 2 },
    { icon: "💬", q: "Ein Fremder bittet dich um einen Verifizierungscode. Was tust du?", options: ["Code weitergeben","Fragen warum","Blockieren und melden","Ignorieren"], correct: 2 },
    { icon: "📶", q: "Was solltest du in öffentlichem WLAN vermeiden?", options: ["Nachrichten lesen","Social Media","Banking","Videos ansehen"], correct: 2 },
    { icon: "🔍", q: "Ein Freund sendet einen verdächtigen Link. Was tust du?", options: ["Klicken","Fragen ob sicher","Löschen und warnen","Weiterleiten"], correct: 2 },
    { icon: "🛒", q: "Wie aktualisierst du Apps sicher?", options: ["APKs herunterladen","Offiziellen Store nutzen","Monate warten","Nie aktualisieren"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Jemand ruft als 'Support' an und will Fernzugriff. Was tust du?", options: ["Zugriff geben","Nach Ausweis fragen","Sofort auflegen","Anweisungen folgen"], correct: 2 },
    { icon: "🔐", q: "Was ist 2FA?", options: ["Zwei Passwörter","Zweiter Schritt wie Code","Zweimal einloggen","Backup‑E‑Mail"], correct: 1 },
    { icon: "💾", q: "Du findest einen USB‑Stick. Was tust du?", options: ["Einstecken","Freund geben","Wegwerfen","Fundbüro"], correct: 3 },
    { icon: "⚠️", q: "URL wie 'paypa1.com' bedeutet:", options: ["Neue Version","Tippfehler","Phishing","Sicher"], correct: 2 },
    { icon: "🛡️", q: "Wie speicherst du Passwörter sicher?", options: ["Notizbuch","Handynotizen","Passwortmanager","Ein Passwort für alles"], correct: 2 },
    { icon: "📱", q: "App will unnötige Berechtigungen. Was tust du?", options: ["Alles erlauben","Nur wenn vertraut","Ablehnen & löschen","Neustart"], correct: 2 },
    { icon: "🎁", q: "Nachricht: 'Du hast gewonnen! Klick hier'. Was tust du?", options: ["Klicken","Teilen","Löschen","Nachfragen"], correct: 2 },
    { icon: "⭐", q: "Vor Installation solltest du:", options: ["Bewertungen prüfen","Sofort installieren","Freund fragen","Ignorieren"], correct: 0 },
    { icon: "🧹", q: "Gerät langsam & Pop‑ups. Was tun?", options: ["Cleaner‑Apps","Neustart","Antivirus","Ignorieren"], correct: 2 }
  ],

  // ======================
  // 🇮🇹 ITALIANO
  // ======================
  it: [
    { icon: "📨", q: "Ricevi un'email che dice che il tuo account verrà chiuso se non clicchi un link. Cosa fai?", options: ["Clicco","Rispondo","Controllo dal sito ufficiale","Inoltro"], correct: 2 },
    { icon: "🔑", q: "Qual è la password più sicura?", options: ["Nome del tuo animale","12345678","Password lunga e unica con simboli","Data di nascita"], correct: 2 },
    { icon: "💬", q: "Uno sconosciuto chiede un codice di verifica. Cosa fai?", options: ["Lo do","Chiedo perché","Blocco e segnalo","Ignoro"], correct: 2 },
    { icon: "📶", q: "Cosa evitare nel Wi‑Fi pubblico?", options: ["Leggere notizie","Social","Banca online","Video"], correct: 2 },
    { icon: "🔍", q: "Un amico manda un link sospetto. Cosa fai?", options: ["Clicco","Chiedo se è sicuro","Elimino e avviso","Inoltro"], correct: 2 },
    { icon: "🛒", q: "Come aggiornare app in sicurezza?", options: ["APK casuali","Store ufficiale","Aspettare mesi","Mai aggiornare"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Supporto tecnico chiede accesso remoto. Cosa fai?", options: ["Accetto","Chiedo ID","Riaggancio","Seguo istruzioni"], correct: 2 },
    { icon: "🔐", q: "Cos’è il 2FA?", options: ["Due password","Secondo passo come codice","Doppio login","Email backup"], correct: 1 },
    { icon: "💾", q: "Trovi una USB. Cosa fai?", options: ["La collego","La do a un amico","La butto","La porto agli oggetti smarriti"], correct: 3 },
    { icon: "⚠️", q: "URL strano come 'paypa1.com' significa:", options: ["Nuova versione","Errore","Phishing","Sicuro"], correct: 2 },
    { icon: "🛡️", q: "Come conservare password?", options: ["Quaderno","Note telefono","Password manager","Una password per tutto"], correct: 2 },
    { icon: "📱", q: "App chiede permessi inutili. Cosa fai?", options: ["Permetto tutto","Solo se mi fido","Nego e disinstallo","Riavvio"], correct: 2 },
    { icon: "🎁", q: "Messaggio: 'Hai vinto!'. Cosa fai?", options: ["Clicco","Condivido","Elimino","Chiedo info"], correct: 2 },
    { icon: "⭐", q: "Prima di installare un’app:", options: ["Controllo recensioni","Installo subito","Chiedo a un amico","Ignoro"], correct: 0 },
    { icon: "🧹", q: "Dispositivo lento e popup. Cosa fai?", options: ["Cleaner app","Riavvio","Antivirus","Ignoro"], correct: 2 }
  ],

  // ======================
  // 🇨🇳 中文
  // ======================
  zh: [
    { icon: "📨", q: "你收到一封邮件，说你的账户将被关闭，除非你点击链接。你应该怎么做？", options: ["点击链接","回复邮件","忽略并通过官方网站检查账户","转发给朋友"], correct: 2 },
    { icon: "🔑", q: "以下哪种密码最安全？", options: ["宠物名字","12345678","长且独特并包含符号的密码","生日"], correct: 2 },
    { icon: "💬", q: "陌生人向你索要验证码。你应该怎么做？", options: ["告诉他","问他为什么需要","拉黑并举报","忽略"], correct: 2 },
    { icon: "📶", q: "使用公共 Wi‑Fi 时应避免什么？", options: ["看新闻","刷社交媒体","登录银行","看视频"], correct: 2 },
    { icon: "🔍", q: "朋友发来可疑链接。你应该怎么做？", options: ["点击","询问是否安全","删除并提醒他","转发"], correct: 2 },
    { icon: "🛒", q: "更新应用最安全的方法是什么？", options: ["下载随机 APK","使用官方应用商店","几个月不更新","永远不更新"], correct: 1 },
    { icon: "🕵️‍♂️", q: "有人自称技术支持并要求远程访问。你应该怎么做？", options: ["允许访问","要求证件","立即挂断","按他说的做"], correct: 2 },
    { icon: "🔐", q: "什么是双重验证 (2FA)？", options: ["两个密码","第二步验证，如验证码","登录两次","备用邮箱"], correct: 1 },
    { icon: "💾", q: "你捡到 USB。你应该怎么做？", options: ["插电脑","给朋友","扔掉","交给失物招领"], correct: 3 },
    { icon: "⚠️", q: "URL 如 'paypa1.com' 通常意味着：", options: ["新版本","拼写错误","钓鱼网站","安全"], correct: 2 },
    { icon: "🛡️", q: "密码最安全的存储方式是？", options: ["写在本子上","手机备忘录","密码管理器","所有账户同一密码"], correct: 2 },
    { icon: "📱", q: "应用请求不必要权限。你应该？", options: ["全部允许","信任时允许","拒绝并卸载","重启"], correct: 2 },
    { icon: "🎁", q: "消息：'你中奖了！点击领取'。你应该？", options: ["点击","分享","删除","询问详情"], correct: 2 },
    { icon: "⭐", q: "安装应用前你应该？", options: ["查看评论和权限","立即安装","问朋友","忽略权限"], correct: 0 },
    { icon: "🧹", q: "设备变慢并弹窗。你应该？", options: ["安装清理软件","重启","杀毒扫描","忽略"], correct: 2 }
  ],
// ======================
  // 🇬🇷 ΕΛΛΗΝΙΚΑ
  // ======================
  el: [
    { icon: "📨", q: "Λαμβάνεις email που λέει ότι ο λογαριασμός σου θα κλείσει αν δεν πατήσεις έναν σύνδεσμο. Τι κάνεις;", options: ["Πατάω τον σύνδεσμο","Απαντώ στο email","Το αγνοώ και ελέγχω από την επίσημη ιστοσελίδα","Το προωθώ σε φίλους"], correct: 2 },
    { icon: "🔑", q: "Ποιος είναι ο πιο ασφαλής κωδικός πρόσβασης;", options: ["Το όνομα του κατοικιδίου μου","12345678","Ένας μακρύς, μοναδικός κωδικός με σύμβολα","Η ημερομηνία γέννησής μου"], correct: 2 },
    { icon: "💬", q: "Κάποιος άγνωστος ζητά τον κωδικό επαλήθευσης που έλαβες. Τι κάνεις;", options: ["Του τον δίνω","Ρωτάω γιατί τον θέλει","Τον μπλοκάρω και τον αναφέρω","Το αγνοώ"], correct: 2 },
    { icon: "📶", q: "Χρησιμοποιείς δωρεάν δημόσιο Wi‑Fi. Τι πρέπει να αποφύγεις;", options: ["Να διαβάζω νέα","Να μπαίνω στα social","Να συνδεθώ στην τράπεζά μου","Να βλέπω βίντεο"], correct: 2 },
    { icon: "🔍", q: "Φίλος σου στέλνει ύποπτο link. Τι κάνεις;", options: ["Το πατάω","Ρωτάω αν είναι ασφαλές","Το διαγράφω και τον προειδοποιώ","Το προωθώ"], correct: 2 },
    { icon: "🛒", q: "Ποιος είναι ο ασφαλέστερος τρόπος ενημέρωσης εφαρμογών;", options: ["Κατεβάζω APK από τυχαία sites","Χρησιμοποιώ το επίσημο app store","Περιμένω μήνες","Δεν ενημερώνω ποτέ"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Κάποιος καλεί και λέει ότι είναι 'τεχνική υποστήριξη' και ζητά απομακρυσμένη πρόσβαση. Τι κάνεις;", options: ["Του δίνω πρόσβαση","Ζητάω ταυτότητα","Κλείνω αμέσως το τηλέφωνο","Ακολουθώ οδηγίες"], correct: 2 },
    { icon: "🔐", q: "Τι είναι το 2FA;", options: ["Δύο κωδικοί","Δεύτερο βήμα όπως κωδικός ή εφαρμογή","Διπλή είσοδος","Εφεδρικό email"], correct: 1 },
    { icon: "💾", q: "Βρίσκεις USB στο δρόμο. Τι κάνεις;", options: ["Το βάζω στον υπολογιστή","Το δίνω σε φίλο","Το πετάω","Το αφήνω ή το δίνω στα χαμένα"], correct: 3 },
    { icon: "⚠️", q: "URL όπως 'paypa1.com' σημαίνει συνήθως:", options: ["Νέα έκδοση","Τυπογραφικό λάθος","Πιθανό phishing","Είναι ασφαλές"], correct: 2 },
    { icon: "🛡️", q: "Πού αποθηκεύεις με ασφάλεια κωδικούς;", options: ["Σε τετράδιο","Στις σημειώσεις του κινητού","Σε password manager","Έναν κωδικό για όλα"], correct: 2 },
    { icon: "📱", q: "Μια εφαρμογή ζητά άσχετα δικαιώματα. Τι κάνεις;", options: ["Τα επιτρέπω όλα","Επιτρέπω μόνο αν την εμπιστεύομαι","Αρνούμαι και την διαγράφω","Κάνω restart"], correct: 2 },
    { icon: "🎁", q: "Μήνυμα: 'Κέρδισες δώρο! Πάτα εδώ'. Τι κάνεις;", options: ["Πατάω","Το μοιράζομαι","Το διαγράφω","Ρωτάω λεπτομέρειες"], correct: 2 },
    { icon: "⭐", q: "Πριν εγκαταστήσεις εφαρμογή, τι κάνεις;", options: ["Ελέγχω κριτικές και δικαιώματα","Την εγκαθιστώ αμέσως","Ρωτάω φίλο","Αγνοώ τα δικαιώματα"], correct: 0 },
    { icon: "🧹", q: "Η συσκευή είναι αργή και εμφανίζει περίεργα popup. Τι κάνεις;", options: ["Εγκαθιστώ random cleaner apps","Κάνω restart","Τρέχω antivirus ή scan","Το αγνοώ"], correct: 2 }
  ],

  // ======================
  // 🇪🇸 ESPAÑOL
  // ======================
  es: [
    { icon: "📨", q: "Recibes un correo diciendo que tu cuenta será cerrada si no haces clic en un enlace. ¿Qué haces?", options: ["Hago clic","Respondo","Lo ignoro y reviso desde la web oficial","Lo reenvío"], correct: 2 },
    { icon: "🔑", q: "¿Cuál es la contraseña más segura?", options: ["El nombre de tu mascota","12345678","Una contraseña larga y única con símbolos","Tu cumpleaños"], correct: 2 },
    { icon: "💬", q: "Un desconocido te pide un código de verificación. ¿Qué haces?", options: ["Se lo doy","Pregunto por qué","Bloqueo y denuncio","Ignoro"], correct: 2 },
    { icon: "📶", q: "Usas Wi‑Fi público. ¿Qué debes evitar?", options: ["Leer noticias","Redes sociales","Entrar al banco","Ver videos"], correct: 2 },
    { icon: "🔍", q: "Un amigo te envía un enlace sospechoso. ¿Qué haces?", options: ["Clic","Pregunto si es seguro","Lo elimino y lo aviso","Lo reenvío"], correct: 2 },
    { icon: "🛒", q: "¿Cómo actualizas apps de forma segura?", options: ["Descargar APKs","Usar la tienda oficial","Esperar meses","Nunca actualizar"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Alguien llama diciendo ser soporte técnico y pide acceso remoto. ¿Qué haces?", options: ["Doy acceso","Pido identificación","Cuelgo inmediatamente","Sigo instrucciones"], correct: 2 },
    { icon: "🔐", q: "¿Qué es 2FA?", options: ["Dos contraseñas","Un segundo paso como un código","Iniciar sesión dos veces","Un correo alternativo"], correct: 1 },
    { icon: "💾", q: "Encuentras un USB en el suelo. ¿Qué haces?", options: ["Lo conecto","Lo doy a un amigo","Lo tiro","Lo dejo o lo llevo a objetos perdidos"], correct: 3 },
    { icon: "⚠️", q: "Una URL como 'paypa1.com' suele ser:", options: ["Nueva versión","Error","Sitio de phishing","Seguro"], correct: 2 },
    { icon: "🛡️", q: "¿Cómo guardas contraseñas de forma segura?", options: ["En un cuaderno","En notas del móvil","En un gestor de contraseñas","Una para todo"], correct: 2 },
    { icon: "📱", q: "Una app pide permisos innecesarios. ¿Qué haces?", options: ["Permito todo","Permito solo si confío","Deniego y desinstalo","Reinicio"], correct: 2 },
    { icon: "🎁", q: "Mensaje: '¡Ganaste un premio! Haz clic aquí'. ¿Qué haces?", options: ["Clic","Lo comparto","Lo elimino","Pido detalles"], correct: 2 },
    { icon: "⭐", q: "Antes de instalar una app, debes:", options: ["Revisar opiniones y permisos","Instalar ya","Preguntar a un amigo","Ignorar permisos"], correct: 0 },
    { icon: "🧹", q: "Tu dispositivo está lento y muestra pop‑ups. ¿Qué haces?", options: ["Instalo apps limpiadoras","Reinicio","Ejecutar antivirus","Ignoro"], correct: 2 }
  ],

  // ======================
  // 🇹🇷 TÜRKÇE
  // ======================
  tr: [
    { icon: "📨", q: "Hesabınızın kapanacağını söyleyen bir e‑posta alıyorsunuz. Ne yaparsınız?", options: ["Bağlantıya tıklarım","E‑postayı yanıtlarım","Yoksayar ve resmi siteden kontrol ederim","Arkadaşlara gönderirim"], correct: 2 },
    { icon: "🔑", q: "En güvenli şifre hangisidir?", options: ["Evcil hayvan adı","12345678","Uzun ve benzersiz sembollü şifre","Doğum günü"], correct: 2 },
    { icon: "💬", q: "Biri sizden doğrulama kodu istiyor. Ne yaparsınız?", options: ["Veririm","Neden istediğini sorarım","Engeller ve bildiririm","Yoksayarım"], correct: 2 },
    { icon: "📶", q: "Halka açık Wi‑Fi kullanırken ne yapmamalısınız?", options: ["Haber okumak","Sosyal medya","Bankacılık uygulamasına girmek","Video izlemek"], correct: 2 },
    { icon: "🔍", q: "Bir arkadaşınız şüpheli bir bağlantı gönderiyor. Ne yaparsınız?", options: ["Tıklarım","Güvenli mi diye sorarım","Siler ve uyarırım","İletirim"], correct: 2 },
    { icon: "🛒", q: "Uygulamaları güvenli şekilde nasıl güncellersiniz?", options: ["Rastgele APK indiririm","Resmi mağazayı kullanırım","Aylarca beklerim","Hiç güncellemem"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Biri teknik destek olduğunu söyleyip uzaktan erişim istiyor. Ne yaparsınız?", options: ["Erişim veririm","Kimlik isterim","Hemen kapatırım","Talimatları uygularım"], correct: 2 },
    { icon: "🔐", q: "2FA nedir?", options: ["İki şifre","Kod gibi ikinci adım","İki kez giriş","Yedek e‑posta"], correct: 1 },
    { icon: "💾", q: "Yerde USB buluyorsunuz. Ne yaparsınız?", options: ["Bilgisayara takarım","Arkadaşa veririm","Atarım","Bırakırım veya kayıp eşyalara veririm"], correct: 3 },
    { icon: "⚠️", q: "‘paypa1.com’ gibi URL genelde nedir?", options: ["Yeni sürüm","Yazım hatası","Phishing sitesi","Güvenli"], correct: 2 },
    { icon: "🛡️", q: "Şifreleri en güvenli nasıl saklarsınız?", options: ["Deftere yazarım","Telefon notlarına","Şifre yöneticisine","Tek şifre kullanırım"], correct: 2 },
    { icon: "📱", q: "Bir uygulama gereksiz izinler istiyor. Ne yaparsınız?", options: ["Hepsini veririm","Güvenirsem veririm","Reddeder ve silerim","Yeniden başlatırım"], correct: 2 },
    { icon: "🎁", q: "Mesaj: 'Ödül kazandınız! Tıklayın'. Ne yaparsınız?", options: ["Tıklarım","Paylaşırım","Silerim","Detay sorarım"], correct: 2 },
    { icon: "⭐", q: "Uygulama yüklemeden önce ne yapmalısınız?", options: ["Yorum ve izinlere bakarım","Hemen yüklerim","Arkadaşa sorarım","İzinleri yok sayarım"], correct: 0 },
    { icon: "🧹", q: "Cihaz yavaş ve pop‑up gösteriyor. Ne yaparsınız?", options: ["Temizlik uygulaması indiririm","Yeniden başlatırım","Antivirüs çalıştırırım","Yoksayarım"], correct: 2 }
  ],

  // ======================
  // 🇫🇷 FRANÇAIS
  // ======================
  fr: [
    { icon: "📨", q: "Vous recevez un email disant que votre compte sera fermé si vous ne cliquez pas sur un lien. Que faites‑vous ?", options: ["Je clique","Je réponds","J’ignore et vérifie via le site officiel","Je transfère"], correct: 2 },
    { icon: "🔑", q: "Quel est le mot de passe le plus sûr ?", options: ["Nom de votre animal","12345678","Mot de passe long et unique avec symboles","Date de naissance"], correct: 2 },
    { icon: "💬", q: "Un inconnu vous demande un code de vérification. Que faites‑vous ?", options: ["Je le donne","Je demande pourquoi","Je bloque et signale","J’ignore"], correct: 2 },
    { icon: "📶", q: "Avec un Wi‑Fi public, que faut‑il éviter ?", options: ["Lire les actualités","Réseaux sociaux","Accéder à la banque","Regarder des vidéos"], correct: 2 },
    { icon: "🔍", q: "Un ami vous envoie un lien suspect. Que faites‑vous ?", options: ["Je clique","Je demande si c’est sûr","Je supprime et l’avertis","Je transfère"], correct: 2 },
    { icon: "🛒", q: "Comment mettre à jour vos apps en sécurité ?", options: ["Télécharger des APK","Utiliser le store officiel","Attendre des mois","Ne jamais mettre à jour"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Quelqu’un appelle en disant être support technique et demande un accès à distance. Que faites‑vous ?", options: ["Je donne accès","Je demande une pièce d’identité","Je raccroche immédiatement","Je suis les instructions"], correct: 2 },
    { icon: "🔐", q: "Qu’est‑ce que le 2FA ?", options: ["Deux mots de passe","Un second facteur comme un code","Se connecter deux fois","Email de secours"], correct: 1 },
    { icon: "💾", q: "Vous trouvez une clé USB au sol. Que faites‑vous ?", options: ["Je la branche","Je la donne à un ami","Je la jette","Je la laisse ou la donne aux objets trouvés"], correct: 3 },
    { icon: "⚠️", q: "Une URL comme 'paypa1.com' signifie souvent :", options: ["Nouvelle version","Faute de frappe","Site de phishing","Sûr"], correct: 2 },
    { icon: "🛡️", q: "Comment stocker vos mots de passe en sécurité ?", options: ["Carnet","Notes du téléphone","Gestionnaire de mots de passe","Un seul mot de passe"], correct: 2 },
    { icon: "📱", q: "Une app demande des permissions inutiles. Que faites‑vous ?", options: ["Tout autoriser","Autoriser seulement si confiance","Refuser et désinstaller","Redémarrer"], correct: 2 },
    { icon: "🎁", q: "Message : 'Vous avez gagné un prix ! Cliquez ici'. Que faites‑vous ?", options: ["Je clique","Je partage","Je supprime","Je demande des détails"], correct: 2 },
    { icon: "⭐", q: "Avant d’installer une app, vous devez :", options: ["Vérifier avis et permissions","Installer immédiatement","Demander à un ami","Ignorer les permissions"], correct: 0 },
    { icon: "🧹", q: "Votre appareil est lent et affiche des pop‑ups. Que faites‑vous ?", options: ["Installer des apps nettoyantes","Redémarrer","Lancer un antivirus","Ignorer"], correct: 2 }
  ],
// ======================
  // 🇳🇱 NEDERLANDS
  // ======================
  nl: [
    { icon: "📨", q: "Je ontvangt een e‑mail dat je account wordt gesloten tenzij je op een link klikt. Wat doe je?", options: ["Ik klik","Ik antwoord","Ik negeer het en controleer via de officiële site","Ik stuur het door"], correct: 2 },
    { icon: "🔑", q: "Wat is het veiligste wachtwoord?", options: ["Naam van je huisdier","12345678","Lang uniek wachtwoord met symbolen","Geboortedatum"], correct: 2 },
    { icon: "💬", q: "Een onbekende vraagt om een verificatiecode. Wat doe je?", options: ["Ik geef het","Ik vraag waarom","Ik blokkeer en meld","Ik negeer"], correct: 2 },
    { icon: "📶", q: "Wat moet je vermijden op openbaar Wi‑Fi?", options: ["Nieuws lezen","Social media","Bankieren","Video’s kijken"], correct: 2 },
    { icon: "🔍", q: "Een vriend stuurt een verdachte link. Wat doe je?", options: ["Klikken","Vragen of het veilig is","Verwijderen en waarschuwen","Doorsturen"], correct: 2 },
    { icon: "🛒", q: "Hoe update je apps veilig?", options: ["APKs downloaden","Officiële app store gebruiken","Maanden wachten","Nooit updaten"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Iemand belt als 'technische ondersteuning' en vraagt om toegang. Wat doe je?", options: ["Toegang geven","ID vragen","Direct ophangen","Instructies volgen"], correct: 2 },
    { icon: "🔐", q: "Wat is 2FA?", options: ["Twee wachtwoorden","Tweede stap zoals een code","Twee keer inloggen","Back‑up e‑mail"], correct: 1 },
    { icon: "💾", q: "Je vindt een USB‑stick. Wat doe je?", options: ["Inpluggen","Aan een vriend geven","Weggooien","Laten liggen of naar gevonden voorwerpen brengen"], correct: 3 },
    { icon: "⚠️", q: "Een URL zoals 'paypa1.com' betekent meestal:", options: ["Nieuwe versie","Typfout","Phishing site","Veilig"], correct: 2 },
    { icon: "🛡️", q: "Hoe bewaar je wachtwoorden veilig?", options: ["Notitieboek","Telefoonnotities","Wachtwoordmanager","Eén wachtwoord voor alles"], correct: 2 },
    { icon: "📱", q: "Een app vraagt onnodige rechten. Wat doe je?", options: ["Alles toestaan","Alleen toestaan als ik vertrouw","Weigeren en verwijderen","Herstarten"], correct: 2 },
    { icon: "🎁", q: "Bericht: 'Je hebt een prijs gewonnen! Klik hier'. Wat doe je?", options: ["Klikken","Delen","Verwijderen","Details vragen"], correct: 2 },
    { icon: "⭐", q: "Voor installatie van een app moet je:", options: ["Reviews en rechten controleren","Direct installeren","Vriend vragen","Rechten negeren"], correct: 0 },
    { icon: "🧹", q: "Je apparaat is traag en toont pop‑ups. Wat doe je?", options: ["Cleaner apps installeren","Herstarten","Antivirus uitvoeren","Negeren"], correct: 2 }
  ],

  // ======================
  // 🇸🇪 SVENSKA
  // ======================
  sv: [
    { icon: "📨", q: "Du får ett mejl som säger att ditt konto stängs om du inte klickar på en länk. Vad gör du?", options: ["Klickar","Svarar","Ignorerar och kontrollerar via officiella sidan","Vidarebefordrar"], correct: 2 },
    { icon: "🔑", q: "Vilket lösenord är säkrast?", options: ["Husdjurets namn","12345678","Långt unikt lösenord med symboler","Födelsedag"], correct: 2 },
    { icon: "💬", q: "En främling ber om en verifieringskod. Vad gör du?", options: ["Ger koden","Frågar varför","Blockerar och rapporterar","Ignorerar"], correct: 2 },
    { icon: "📶", q: "Vad ska du undvika på offentligt Wi‑Fi?", options: ["Läsa nyheter","Sociala medier","Bankärenden","Titta på video"], correct: 2 },
    { icon: "🔍", q: "En vän skickar en misstänkt länk. Vad gör du?", options: ["Klickar","Frågar om den är säker","Raderar och varnar","Vidarebefordrar"], correct: 2 },
    { icon: "🛒", q: "Hur uppdaterar du appar säkert?", options: ["Ladda ner APK","Använda officiella appbutiken","Vänta månader","Aldrig uppdatera"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Någon ringer och säger att de är teknisk support och vill ha fjärråtkomst. Vad gör du?", options: ["Ger åtkomst","Ber om ID","Lägger på direkt","Följer instruktioner"], correct: 2 },
    { icon: "🔐", q: "Vad är 2FA?", options: ["Två lösenord","Ett andra steg som kod","Logga in två gånger","Reserv‑e‑post"], correct: 1 },
    { icon: "💾", q: "Du hittar ett USB‑minne. Vad gör du?", options: ["Stoppar in det","Ger det till en vän","Slänger det","Lämnar det eller ger till hittegods"], correct: 3 },
    { icon: "⚠️", q: "En URL som 'paypa1.com' betyder oftast:", options: ["Ny version","Stavfel","Phishing‑sida","Säker"], correct: 2 },
    { icon: "🛡️", q: "Hur lagrar du lösenord säkert?", options: ["Anteckningsbok","Mobilanteckningar","Lösenordshanterare","Ett lösenord för allt"], correct: 2 },
    { icon: "📱", q: "En app begär onödiga behörigheter. Vad gör du?", options: ["Tillåter allt","Tillåter om jag litar på den","Nekar och avinstallerar","Startar om"], correct: 2 },
    { icon: "🎁", q: "Meddelande: 'Du vann ett pris! Klicka här'. Vad gör du?", options: ["Klickar","Delar","Raderar","Frågar om detaljer"], correct: 2 },
    { icon: "⭐", q: "Innan du installerar en app bör du:", options: ["Kolla recensioner och behörigheter","Installera direkt","Fråga en vän","Ignorera behörigheter"], correct: 0 },
    { icon: "🧹", q: "Enheten är långsam och visar pop‑ups. Vad gör du?", options: ["Installerar rengöringsappar","Startar om","Kör antivirus","Ignorerar"], correct: 2 }
  ],

  // ======================
  // 🇳🇴 NORSK
  // ======================
  no: [
    { icon: "📨", q: "Du får en e‑post som sier at kontoen din stenges hvis du ikke klikker på en lenke. Hva gjør du?", options: ["Klikker","Svar","Ignorerer og sjekker via offisiell side","Videresender"], correct: 2 },
    { icon: "🔑", q: "Hva er det sikreste passordet?", options: ["Kjæledyrets navn","12345678","Langt unikt passord med symboler","Fødselsdato"], correct: 2 },
    { icon: "💬", q: "En fremmed ber om en verifiseringskode. Hva gjør du?", options: ["Gir koden","Spør hvorfor","Blokkerer og rapporterer","Ignorerer"], correct: 2 },
    { icon: "📶", q: "Hva bør du unngå på offentlig Wi‑Fi?", options: ["Lese nyheter","Sosiale medier","Banktjenester","Se videoer"], correct: 2 },
    { icon: "🔍", q: "En venn sender en mistenkelig lenke. Hva gjør du?", options: ["Klikker","Spør om den er trygg","Sletter og advarer","Videresender"], correct: 2 },
    { icon: "🛒", q: "Hvordan oppdaterer du apper sikkert?", options: ["Laste ned APK","Bruke offisiell appbutikk","Vente måneder","Aldri oppdatere"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Noen ringer og sier de er teknisk støtte og ber om fjernaksess. Hva gjør du?", options: ["Gir tilgang","Ber om ID","Legger på umiddelbart","Følger instruksjoner"], correct: 2 },
    { icon: "🔐", q: "Hva er 2FA?", options: ["To passord","Andre steg som kode","Logge inn to ganger","Reserve‑e‑post"], correct: 1 },
    { icon: "💾", q: "Du finner en USB‑penn. Hva gjør du?", options: ["Setter den i PC","Gir til venn","Kaster den","Lar den ligge eller leverer til hittegods"], correct: 3 },
    { icon: "⚠️", q: "En URL som 'paypa1.com' betyr vanligvis:", options: ["Ny versjon","Tastefeil","Phishing‑side","Trygg"], correct: 2 },
    { icon: "🛡️", q: "Hvordan lagrer du passord sikkert?", options: ["Notatbok","Mobilnotater","Passordmanager","Ett passord for alt"], correct: 2 },
    { icon: "📱", q: "En app ber om unødvendige tillatelser. Hva gjør du?", options: ["Tillater alt","Tillater hvis jeg stoler på den","Avslår og avinstallerer","Starter på nytt"], correct: 2 },
    { icon: "🎁", q: "Melding: 'Du har vunnet en premie! Klikk her'. Hva gjør du?", options: ["Klikker","Deler","Sletter","Ber om detaljer"], correct: 2 },
    { icon: "⭐", q: "Før du installerer en app bør du:", options: ["Sjekke anmeldelser og tillatelser","Installere med en gang","Spørre en venn","Ignorere tillatelser"], correct: 0 },
    { icon: "🧹", q: "Enheten er treg og viser pop‑ups. Hva gjør du?", options: ["Installerer cleaner‑apper","Starter på nytt","Kjører antivirus","Ignorerer"], correct: 2 }
  ],

  // ======================
  // 🇩🇰 DANSK
  // ======================
  da: [
    { icon: "📨", q: "Du modtager en e‑mail om, at din konto lukkes, hvis du ikke klikker på et link. Hvad gør du?", options: ["Klikker","Svarer","Ignorerer og tjekker via officiel side","Videresender"], correct: 2 },
    { icon: "🔑", q: "Hvad er den sikreste adgangskode?", options: ["Kæledyrs navn","12345678","Lang unik adgangskode med symboler","Fødselsdato"], correct: 2 },
    { icon: "💬", q: "En fremmed beder om en verifikationskode. Hvad gør du?", options: ["Giver den","Spørger hvorfor","Blokerer og rapporterer","Ignorerer"], correct: 2 },
    { icon: "📶", q: "Hvad bør du undgå på offentligt Wi‑Fi?", options: ["Læse nyheder","Sociale medier","Banktjenester","Se videoer"], correct: 2 },
    { icon: "🔍", q: "En ven sender et mistænkeligt link. Hvad gør du?", options: ["Klikker","Spørger om det er sikkert","Sletter og advarer","Videresender"], correct: 2 },
    { icon: "🛒", q: "Hvordan opdaterer du apps sikkert?", options: ["Downloader APK","Bruger officiel app‑butik","Venter måneder","Opdaterer aldrig"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Nogen ringer og siger, de er teknisk support og vil have fjernadgang. Hvad gør du?", options: ["Giver adgang","Beder om ID","Lægger på med det samme","Følger instruktioner"], correct: 2 },
    { icon: "🔐", q: "Hvad er 2FA?", options: ["To adgangskoder","Andet trin som en kode","Logge ind to gange","Backup‑email"], correct: 1 },
    { icon: "💾", q: "Du finder et USB‑drev. Hvad gør du?", options: ["Sætter det i PC","Giver til ven","Smider det ud","Lader det ligge eller afleverer det til hittegods"], correct: 3 },
    { icon: "⚠️", q: "En URL som 'paypa1.com' betyder normalt:", options: ["Ny version","Tastefejl","Phishing‑side","Sikker"], correct: 2 },
    { icon: "🛡️", q: "Hvordan opbevarer du adgangskoder sikkert?", options: ["Notesbog","Telefonnoter","Password‑manager","Én adgangskode til alt"], correct: 2 },
    { icon: "📱", q: "En app beder om unødvendige tilladelser. Hvad gør du?", options: ["Tillader alt","Tillader kun hvis jeg stoler på den","Afviser og afinstallerer","Genstarter"], correct: 2 },
    { icon: "🎁", q: "Besked: 'Du har vundet en præmie! Klik her'. Hvad gør du?", options: ["Klikker","Deler","Sletter","Spørger om detaljer"], correct: 2 },
    { icon: "⭐", q: "Før du installerer en app, bør du:", options: ["Tjekke anmeldelser og tilladelser","Installere med det samme","Spørge en ven","Ignorere tilladelser"], correct: 0 },
    { icon: "🧹", q: "Din enhed er langsom og viser pop‑ups. Hvad gør du?", options: ["Installerer rengøringsapps","Genstarter","Kører antivirus","Ignorerer"], correct: 2 }
  ],
// ======================
  // 🇫🇮 SUOMI (FINNISH)
  // ======================
  fi: [
    { icon: "📨", q: "Saat sähköpostin, jossa väitetään tilisi sulkeutuvan, ellei klikkaa linkkiä. Mitä teet?", options: ["Klikkaan","Vastaan","Ohitan ja tarkistan viralliselta sivulta","Lähetän eteenpäin"], correct: 2 },
    { icon: "🔑", q: "Mikä salasana on turvallisin?", options: ["Lemmikin nimi","12345678","Pitkä ja uniikki salasana symboleilla","Syntymäpäivä"], correct: 2 },
    { icon: "💬", q: "Tuntematon pyytää vahvistuskoodia. Mitä teet?", options: ["Annan koodin","Kysyn miksi","Estän ja raportoin","Ohitan"], correct: 2 },
    { icon: "📶", q: "Mitä tulee välttää julkisessa Wi‑Fi‑verkossa?", options: ["Uutisten lukemista","Sosiaalista mediaa","Pankkiasioita","Videoiden katselua"], correct: 2 },
    { icon: "🔍", q: "Ystävä lähettää epäilyttävän linkin. Mitä teet?", options: ["Klikkaan","Kysyn onko turvallinen","Poistan ja varoitan","Lähetän eteenpäin"], correct: 2 },
    { icon: "🛒", q: "Miten päivität sovellukset turvallisesti?", options: ["Lataan APK‑tiedostoja","Käytän virallista sovelluskauppaa","Odotan kuukausia","En päivitä koskaan"], correct: 1 },
    { icon: "🕵️‍♂️", q: "N joku soittaa ja väittää olevansa tekninen tuki ja pyytää etäkäyttöä. Mitä teet?", options: ["Annan pääsyn","Pyydän henkilöllisyystodistusta","Lopetan puhelun heti","Seuraan ohjeita"], correct: 2 },
    { icon: "🔐", q: "Mitä tarkoittaa 2FA?", options: ["Kaksi salasanaa","Toinen vaihe kuten koodi","Logge in kahdesti","Varasähköposti"], correct: 1 },
    { icon: "💾", q: "Löydät USB‑muistin. Mitä teet?", options: ["Liitän sen tietokoneeseen","Annan ystävälle","Heitän pois","Jätän tai vien löytötavaroihin"], correct: 3 },
    { icon: "⚠️", q: "URL kuten 'paypa1.com' tarkoittaa yleensä:", options: ["Uusi versio","Kirjoitusvirhe","Phishing‑sivusto","Turvallinen"], correct: 2 },
    { icon: "🛡️", q: "Miten säilytät salasanat turvallisesti?", options: ["Vihko","Puhelimen muistiinpanot","Salasananhallintaohjelma","Yksi salasana kaikkeen"], correct: 2 },
    { icon: "📱", q: "Sovellus pyytää tarpeettomia oikeuksia. Mitä teet?", options: ["Sallin kaiken","Sallin jos luotan","Estän ja poistan","Käynnistän uudelleen"], correct: 2 },
    { icon: "🎁", q: "Viesti: 'Voitit palkinnon! Klikkaa tästä'. Mitä teet?", options: ["Klikkaan","Jaan ystäville","Poistan","Kysyn lisätietoja"], correct: 2 },
    { icon: "⭐", q: "Ennen sovelluksen asentamista sinun tulisi:", options: ["Tarkistaa arviot ja oikeudet","Asentaa heti","Kysyä ystävältä","Ohittaa oikeudet"], correct: 0 },
    { icon: "🧹", q: "Laite on hidas ja näyttää ponnahdusikkunoita. Mitä teet?", options: ["Asennan puhdistussovelluksia","Käynnistän uudelleen","Ajan virustarkistuksen","Ohitan"], correct: 2 }
  ],

  // ======================
  // 🇵🇱 POLSKI
  // ======================
  pl: [
    { icon: "📨", q: "Otrzymujesz e‑mail, że konto zostanie zamknięte, jeśli nie klikniesz linku. Co robisz?", options: ["Klikam","Odpowiadam","Ignoruję i sprawdzam na oficjalnej stronie","Przesyłam dalej"], correct: 2 },
    { icon: "🔑", q: "Które hasło jest najbezpieczniejsze?", options: ["Imię zwierzaka","12345678","Długie unikalne hasło z symbolami","Data urodzenia"], correct: 2 },
    { icon: "💬", q: "Obcy prosi o kod weryfikacyjny. Co robisz?", options: ["Podaję","Pytam dlaczego","Blokuję i zgłaszam","Ignoruję"], correct: 2 },
    { icon: "📶", q: "Czego unikać w publicznym Wi‑Fi?", options: ["Czytania wiadomości","Social mediów","Bankowości","Oglądania filmów"], correct: 2 },
    { icon: "🔍", q: "Znajomy wysyła podejrzany link. Co robisz?", options: ["Klikam","Pytam czy bezpieczne","Usuwam i ostrzegam","Przesyłam dalej"], correct: 2 },
    { icon: "🛒", q: "Jak bezpiecznie aktualizować aplikacje?", options: ["Pobierać APK","Używać oficjalnego sklepu","Czekać miesiącami","Nigdy nie aktualizować"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Ktoś dzwoni jako 'wsparcie techniczne' i chce dostęp zdalny. Co robisz?", options: ["Daję dostęp","Proszę o ID","Rozłączam natychmiast","Wykonuję instrukcje"], correct: 2 },
    { icon: "🔐", q: "Co to jest 2FA?", options: ["Dwa hasła","Drugi krok jak kod","Podwójne logowanie","E‑mail zapasowy"], correct: 1 },
    { icon: "💾", q: "Znajdujesz pendrive. Co robisz?", options: ["Podłączam","Daję znajomemu","Wyrzucam","Zostawiam lub oddaję do biura rzeczy znalezionych"], correct: 3 },
    { icon: "⚠️", q: "Adres jak 'paypa1.com' oznacza zwykle:", options: ["Nowa wersja","Literówka","Phishing","Bezpieczne"], correct: 2 },
    { icon: "🛡️", q: "Jak bezpiecznie przechowywać hasła?", options: ["W notesie","W notatkach telefonu","W menedżerze haseł","Jedno hasło do wszystkiego"], correct: 2 },
    { icon: "📱", q: "Aplikacja prosi o zbędne uprawnienia. Co robisz?", options: ["Zezwalam wszystko","Zezwalam jeśli ufam","Odrzucam i usuwam","Restartuję"], correct: 2 },
    { icon: "🎁", q: "Wiadomość: 'Wygrałeś nagrodę! Kliknij tutaj'. Co robisz?", options: ["Klikam","Udostępniam","Usuwam","Pytam o szczegóły"], correct: 2 },
    { icon: "⭐", q: "Przed instalacją aplikacji powinieneś:", options: ["Sprawdzić opinie i uprawnienia","Instalować od razu","Pytać znajomego","Ignorować uprawnienia"], correct: 0 },
    { icon: "🧹", q: "Urządzenie jest wolne i pokazuje wyskakujące okna. Co robisz?", options: ["Instaluję aplikacje czyszczące","Restartuję","Uruchamiam antywirusa","Ignoruję"], correct: 2 }
  ],

  // ======================
  // 🇷🇴 ROMÂNĂ
  // ======================
  ro: [
    { icon: "📨", q: "Primești un email care spune că contul tău va fi închis dacă nu dai clic pe un link. Ce faci?", options: ["Dau clic","Răspund","Ignor și verific pe site‑ul oficial","Trimit mai departe"], correct: 2 },
    { icon: "🔑", q: "Care este cea mai sigură parolă?", options: ["Numele animalului","12345678","Parolă lungă și unică cu simboluri","Data nașterii"], correct: 2 },
    { icon: "💬", q: "Un străin cere un cod de verificare. Ce faci?", options: ["Îl dau","Întreb de ce","Blochez și raportez","Ignor"], correct: 2 },
    { icon: "📶", q: "Ce trebuie evitat pe Wi‑Fi public?", options: ["Citirea știrilor","Rețele sociale","Accesarea băncii","Vizionarea videoclipurilor"], correct: 2 },
    { icon: "🔍", q: "Un prieten trimite un link suspect. Ce faci?", options: ["Dau clic","Întreb dacă e sigur","Șterg și avertizez","Trimit mai departe"], correct: 2 },
    { icon: "🛒", q: "Cum actualizezi aplicațiile în siguranță?", options: ["Descarc APK","Folosesc magazinul oficial","Aștept luni","Nu actualizez niciodată"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Cineva sună ca 'suport tehnic' și cere acces remote. Ce faci?", options: ["Ofer acces","Cer act de identitate","Închid imediat","Urmez instrucțiile"], correct: 2 },
    { icon: "🔐", q: "Ce este 2FA?", options: ["Două parole","Al doilea pas precum un cod","Autentificare dublă","Email de rezervă"], correct: 1 },
    { icon: "💾", q: "Găsești un USB pe jos. Ce faci?", options: ["Îl conectez","Îl dau unui prieten","Îl arunc","Îl las sau îl duc la obiecte pierdute"], correct: 3 },
    { icon: "⚠️", q: "Un URL precum 'paypa1.com' înseamnă de obicei:", options: ["Versiune nouă","Greșeală","Site de phishing","Sigur"], correct: 2 },
    { icon: "🛡️", q: "Cum stochezi parolele în siguranță?", options: ["Caiet","Notițe telefon","Manager de parole","O singură parolă"], correct: 2 },
    { icon: "📱", q: "O aplicație cere permisiuni inutile. Ce faci?", options: ["Permit tot","Permit doar dacă am încredere","Refuz și dezinstalez","Repornez"], correct: 2 },
    { icon: "🎁", q: "Mesaj: 'Ai câștigat un premiu! Click aici'. Ce faci?", options: ["Dau clic","Distribui","Șterg","Cer detalii"], correct: 2 },
    { icon: "⭐", q: "Înainte de instalarea unei aplicații trebuie să:", options: ["Verifici recenzii și permisiuni","Instalezi imediat","Întrebi un prieten","Ignori permisiunile"], correct: 0 },
    { icon: "🧹", q: "Dispozitivul este lent și apar pop‑ups. Ce faci?", options: ["Instalez aplicații de curățare","Repornez","Rulez antivirus","Ignor"], correct: 2 }
  ],

  // ======================
  // 🇦🇪 العربية (ARABIC)
  // ======================
  ar: [
    { icon: "📨", q: "تتلقى رسالة تقول إن حسابك سيُغلق إذا لم تضغط على رابط. ماذا تفعل؟", options: ["أضغط الرابط","أرد على الرسالة","أتجاهل وأفحص من الموقع الرسمي","أعيد إرسالها للأصدقاء"], correct: 2 },
    { icon: "🔑", q: "ما هي أقوى كلمة مرور؟", options: ["اسم الحيوان الأليف","12345678","كلمة مرور طويلة وفريدة مع رموز","تاريخ الميلاد"], correct: 2 },
    { icon: "💬", q: "شخص غريب يطلب رمز التحقق الذي وصلك. ماذا تفعل؟", options: ["أعطيه الرمز","أسأله لماذا","أحظره وأبلغ عنه","أتجاهله"], correct: 2 },
    { icon: "📶", q: "ماذا يجب تجنبه عند استخدام Wi‑Fi عام؟", options: ["قراءة الأخبار","السوشيال ميديا","الدخول إلى البنك","مشاهدة الفيديو"], correct: 2 },
    { icon: "🔍", q: "صديق يرسل رابطًا مشبوهًا. ماذا تفعل؟", options: ["أضغط","أسأله إن كان آمنًا","أحذفه وأحذره","أعيد إرساله"], correct: 2 },
    { icon: "🛒", q: "ما هي الطريقة الأكثر أمانًا لتحديث التطبيقات؟", options: ["تحميل ملفات APK عشوائية","استخدام المتجر الرسمي","الانتظار لأشهر","عدم التحديث أبدًا"], correct: 1 },
    { icon: "🕵️‍♂️", q: "يتصل شخص ويدّعي أنه دعم فني ويطلب وصولًا عن بُعد. ماذا تفعل؟", options: ["أعطيه الوصول","أطلب هويته","أغلق المكالمة فورًا","أتبع تعليماته"], correct: 2 },
    { icon: "🔐", q: "ما هو التحقق بخطوتين (2FA)؟", options: ["كلمتا مرور","خطوة ثانية مثل رمز","تسجيل الدخول مرتين","بريد احتياطي"], correct: 1 },
    { icon: "💾", q: "تجد USB على الأرض. ماذا تفعل؟", options: ["أوصله بالكمبيوتر","أعطيه لصديق","أرميه","أتركه أو أسلمه للمفقودات"], correct: 3 },
    { icon: "⚠️", q: "رابط مثل 'paypa1.com' يعني غالبًا:", options: ["نسخة جديدة","خطأ مطبعي","موقع تصيّد","آمن"], correct: 2 },
    { icon: "🛡️", q: "كيف تخزن كلمات المرور بأمان؟", options: ["دفتر ملاحظات","ملاحظات الهاتف","مدير كلمات مرور","كلمة مرور واحدة لكل شيء"], correct: 2 },
    { icon: "📱", q: "تطبيق يطلب أذونات غير ضرورية. ماذا تفعل؟", options: ["أسمح بكل شيء","أسمح فقط إذا أثق به","أرفض وأحذفه","أعيد تشغيل الهاتف"], correct: 2 },
    { icon: "🎁", q: "رسالة: 'ربحت جائزة! اضغط هنا'. ماذا تفعل؟", options: ["أضغط","أشاركها","أحذفها","أسأل عن التفاصيل"], correct: 2 },
    { icon: "⭐", q: "قبل تثبيت تطبيق، يجب أن:", options: ["تتحقق من التقييمات والأذونات","تثبته فورًا","تسأل صديقًا","تتجاهل الأذونات"], correct: 0 },
    { icon: "🧹", q: "جهازك بطيء ويظهر نوافذ منبثقة. ماذا تفعل؟", options: ["أثبت تطبيقات تنظيف عشوائية","أعيد التشغيل","أجري فحص أمان أو مضاد فيروسات","أتجاهل"], correct: 2 }
  ],
// ======================
  // 🇮🇳 हिन्दी (HINDI)
  // ======================
  hi: [
    { icon: "📨", q: "आपको एक ईमेल मिलता है जिसमें लिखा है कि आपका अकाउंट बंद हो जाएगा यदि आप लिंक पर क्लिक नहीं करते। आप क्या करेंगे?", options: ["लिंक पर क्लिक करूँगा","ईमेल का जवाब दूँगा","इसे अनदेखा कर आधिकारिक वेबसाइट से चेक करूँगा","दोस्तों को भेज दूँगा"], correct: 2 },
    { icon: "🔑", q: "सबसे सुरक्षित पासवर्ड कौन सा है?", options: ["पालतू का नाम","12345678","लंबा और यूनिक पासवर्ड जिसमें सिंबल हों","जन्मतिथि"], correct: 2 },
    { icon: "💬", q: "कोई अजनबी आपसे वेरिफिकेशन कोड मांगता है। आप क्या करेंगे?", options: ["कोड दे दूँगा","पूछूँगा क्यों चाहिए","ब्लॉक और रिपोर्ट करूँगा","अनदेखा करूँगा"], correct: 2 },
    { icon: "📶", q: "पब्लिक Wi‑Fi पर आपको क्या नहीं करना चाहिए?", options: ["न्यूज़ पढ़ना","सोशल मीडिया","बैंक अकाउंट लॉगिन","वीडियो देखना"], correct: 2 },
    { icon: "🔍", q: "दोस्त एक संदिग्ध लिंक भेजता है। आप क्या करेंगे?", options: ["क्लिक करूँगा","पूछूँगा सुरक्षित है या नहीं","डिलीट कर चेतावनी दूँगा","फॉरवर्ड करूँगा"], correct: 2 },
    { icon: "🛒", q: "ऐप्स को सुरक्षित तरीके से कैसे अपडेट करें?", options: ["रैंडम APK डाउनलोड करें","ऑफिशियल ऐप स्टोर का उपयोग करें","महीनों इंतजार करें","कभी अपडेट न करें"], correct: 1 },
    { icon: "🕵️‍♂️", q: "कोई कॉल कर कहता है कि वह 'टेक सपोर्ट' है और रिमोट एक्सेस चाहता है। आप क्या करेंगे?", options: ["एक्सेस दे दूँगा","आईडी माँगूँगा","तुरंत कॉल काट दूँगा","इंस्ट्रक्शन फॉलो करूँगा"], correct: 2 },
    { icon: "🔐", q: "2FA क्या है?", options: ["दो पासवर्ड","दूसरा स्टेप जैसे कोड","दो बार लॉगिन","बैकअप ईमेल"], correct: 1 },
    { icon: "💾", q: "आपको जमीन पर USB मिलता है। आप क्या करेंगे?", options: ["कंप्यूटर में लगाऊँगा","दोस्त को दे दूँगा","फेंक दूँगा","वहीं छोड़ दूँगा या खोया‑पाया में जमा करूँगा"], correct: 3 },
    { icon: "⚠️", q: "‘paypa1.com’ जैसा URL आमतौर पर क्या दर्शाता है?", options: ["नई वर्ज़न","टाइपो","फ़िशिंग साइट","सुरक्षित"], correct: 2 },
    { icon: "🛡️", q: "पासवर्ड सुरक्षित कैसे रखें?", options: ["डायरी में लिखें","फोन नोट्स में रखें","पासवर्ड मैनेजर में रखें","एक ही पासवर्ड हर जगह"], correct: 2 },
    { icon: "📱", q: "कोई ऐप अनावश्यक परमिशन मांगता है। आप क्या करेंगे?", options: ["सब अनुमति दे दूँगा","विश्वास हो तो ही अनुमति दूँगा","रिजेक्ट कर अनइंस्टॉल करूँगा","फोन रीस्टार्ट करूँगा"], correct: 2 },
    { icon: "🎁", q: "मैसेज: 'आपने इनाम जीता! यहाँ क्लिक करें'. आप क्या करेंगे?", options: ["क्लिक करूँगा","दोस्तों से शेयर करूँगा","डिलीट करूँगा","डिटेल पूछूँगा"], correct: 2 },
    { icon: "⭐", q: "ऐप इंस्टॉल करने से पहले आपको क्या करना चाहिए?", options: ["रिव्यू और परमिशन चेक करें","तुरंत इंस्टॉल करें","दोस्त से पूछें","परमिशन इग्नोर करें"], correct: 0 },
    { icon: "🧹", q: "डिवाइस स्लो है और पॉप‑अप दिखा रहा है। आप क्या करेंगे?", options: ["रैंडम क्लीनर ऐप इंस्टॉल करूँगा","रीस्टार्ट करूँगा","एंटीवायरस स्कैन चलाऊँगा","अनदेखा करूँगा"], correct: 2 }
  ]

}; // END OF window.QUESTIONS



// ===============================
// 2. QUIZ ENGINE (PREMIUM LOGIC)
// ===============================

window.QuizEngine = {

  currentLang: "en",
  currentIndex: 0,
  score: 0,
  questions: [],

  init(lang) {
    this.currentLang = lang;
    this.questions = window.QUESTIONS[lang];
    this.currentIndex = 0;
    this.score = 0;
    this.render();
  },

  render() {
    const q = this.questions[this.currentIndex];
    document.getElementById("q-icon").textContent = q.icon;
    document.getElementById("q-text").textContent = q.q;

    const opts = document.getElementById("q-options");
    opts.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.onclick = () => this.answer(i);
      opts.appendChild(btn);
    });

    document.getElementById("progress").textContent =
      `${this.currentIndex + 1} / ${this.questions.length}`;
  },

  answer(i) {
    const correct = this.questions[this.currentIndex].correct;
    if (i === correct) this.score++;

    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.finish();
    } else {
      this.render();
    }
  },

  finish() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    document.getElementById("result-score").textContent =
      `${this.score} / ${this.questions.length}`;
  }
};
