// ==========================================
// Stay Safe Premium - Complete Quiz System
// ==========================================

const questions = {
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
    { icon: "⚠️", q: "A website URL looks strange (e.g., 'paypa1.com'). What does this usually mean?", options: ["It’s a typo","It’s a phishing site","It’s safe","It’s a new version"], correct: 1 },
    { icon: "🛡️", q: "What is the safest way to store passwords?", options: ["In a notebook","In your phone notes","In a password manager","Use one password for all accounts"], correct: 2 },
    { icon: "📱", q: "An app asks for permissions it doesn’t need. What should you do?", options: ["Allow everything","Allow only if you trust it","Deny and uninstall","Restart your phone"], correct: 2 },
    { icon: "🎁", q: "You get a message saying 'You won a prize! Click here.' What should you do?", options: ["Click immediately","Share with friends","Delete it","Reply asking for details"], correct: 2 },
    { icon: "⭐", q: "What should you do before installing a new app?", options: ["Check reviews and permissions","Install immediately","Ask a friend","Ignore permissions"], correct: 0 },
    { icon: "🧹", q: "Your device feels slow and shows strange pop‑ups. What’s the safest step?", options: ["Install random cleaner apps","Restart only","Run an antivirus or security scan","Ignore it"], correct: 2 }
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
  // 🇫🇷 FRANÇAIS
  // ======================
  fr: [
    { icon: "📨", q: "Compte menacé de fermeture via email. Que faites-vous ?", options: ["Cliquer","Répondre","Vérifier via le site officiel","Partager"], correct: 2 },
    { icon: "🔑", q: "Mot de passe le plus sûr ?", options: ["Nom animal","12345678","Long, unique avec symboles","Anniversaire"], correct: 2 },
    { icon: "📶", q: "Wi-Fi public, à éviter ?", options: ["Actualités","Social","Banque","Vidéos"], correct: 2 },
    { icon: "🛒", q: "Mise à jour d'app sûre ?", options: ["Site web hasard","Store officiel","Attendre","Jamais"], correct: 1 },
    { icon: "🕵️‍♂️", q: "Faux support technique ?", options: ["Accepter","Raccrocher","Demander ID","Obéir"], correct: 1 }
    // ... add more for full list
  ]
};

// ==========================================
// 2. QUIZ ENGINE LOGIC
// ==========================================

class QuizEngine {
  constructor(lang = "en") {
    this.lang = questions[lang] ? lang : "en";
    this.currentQuestions = questions[this.lang];
    this.currentIndex = 0;
    this.score = 0;
    
    // UI Selectors
    this.questionEl = document.getElementById("quiz-question");
    this.optionsEl = document.getElementById("quiz-options");
    this.nextBtn = document.getElementById("quiz-next-btn");
    this.pillEl = document.getElementById("quiz-pill");
    this.resultEl = document.getElementById("quiz-result");
  }

  static start(lang) {
    const engine = new QuizEngine(lang);
    engine.loadQuestion();
    return engine;
  }

  loadQuestion() {
    this.nextBtn.disabled = true;
    const qData = this.currentQuestions[this.currentIndex];
    
    // Update Header
    this.pillEl.textContent = `Question ${this.currentIndex + 1} of ${this.currentQuestions.length}`;
    
    // Question HTML
    this.questionEl.innerHTML = `
      <div class="q-card">
        <span class="q-icon">${qData.icon}</span>
        <p class="q-text">${qData.q}</p>
      </div>
    `;

    // Options HTML
    this.optionsEl.innerHTML = "";
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.onclick = () => this.handleAnswer(idx, btn);
      this.optionsEl.appendChild(btn);
    });
  }

  handleAnswer(idx, btn) {
    const correct = this.currentQuestions[this.currentIndex].correct;
    const allBtns = this.optionsEl.querySelectorAll(".opt-btn");

    allBtns.forEach(b => b.disabled = true);

    if (idx === correct) {
      btn.classList.add("correct");
      this.score++;
      if (window.Analytics) Analytics.track("quiz_answer_correct");
    } else {
      btn.classList.add("wrong");
      allBtns[correct].classList.add("correct");
      if (window.Analytics) Analytics.track("quiz_answer_wrong");
    }

    this.nextBtn.disabled = false;
    this.nextBtn.onclick = () => this.nextQuestion();
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.currentQuestions.length) {
      this.loadQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    const finalScore = Math.round((this.score / this.currentQuestions.length) * 100);
    this.resultEl.classList.remove("hidden");
    document.getElementById("quiz-result-score").textContent = `Score: ${finalScore}%`;
    
    // Save progress
    if (localStorage) {
      localStorage.setItem("ss_quiz_score", finalScore);
      if (finalScore >= 80) {
          this.awardBadge("badge-digital");
      }
    }
  }

  awardBadge(id) {
    const badge = document.getElementById(id);
    if (badge) {
        badge.classList.remove("locked");
        badge.classList.add("unlocked");
        document.getElementById("quiz-result-badge").classList.remove("hidden");
    }
  }
}

// Global Export
window.QuizEngine = QuizEngine;
