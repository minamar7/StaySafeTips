window.QuizEngine = {
  content: {
    el: {
      "badge-home": [
        { q: "Είναι ασφαλές να αφήνεις το κλειδί κάτω από το χαλάκι;", options: ["Ναι", "Όχι", "Μόνο αν λείπω λίγο"], correct: 1 },
        { q: "Τι κάνουμε αν μυρίσει υγραέριο στο σπίτι;", options: ["Ανάβουμε φως", "Ανοίγουμε παράθυρα", "Καλούμε την αστυνομία"], correct: 1 },
        { q: "Πόσο συχνά ελέγχουμε τον ανιχνευτή καπνού;", options: ["Κάθε χρόνο", "Ποτέ", "Κάθε μήνα"], correct: 2 }
      ],
      "badge-digital": [
        { q: "Είναι ασφαλές να δίνεις κωδικούς μέσω email;", options: ["Ναι", "Όχι", "Μόνο στην τράπεζα"], correct: 1 },
        { q: "Τι είναι το 2FA;", options: ["Διπλός κωδικός", "Δεύτερο βήμα ασφαλείας", "Εφαρμογή chat"], correct: 1 },
        { q: "Βρίσκεις ένα USB στο δρόμο. Τι κάνεις;", options: ["Το βάζω στο PC", "Το πετάω", "Το χαρίζω"], correct: 1 }
      ],
      "badge-scam": [
        { q: "Λαμβάνεις SMS: 'Το δέμα σας εκκρεμεί'. Τι κάνεις;", options: ["Πατάω το link", "Το διαγράφω", "Στέλνω στοιχεία"], correct: 1 },
        { q: "Κάποιος τηλεφωνεί από την 'Τράπεζα' για το PIN σας.", options: ["Του το δίνω", "Κλείνω το τηλέφωνο", "Τον ρωτάω ποιος είναι"], correct: 1 }
      ],
      "badge-emergency": [
        { q: "Ποιος είναι ο ευρωπαϊκός αριθμός έκτακτης ανάγκης;", options: ["100", "911", "112"], correct: 2 },
        { q: "Τι κάνουμε σε περίπτωση σεισμού;", options: ["Τρέχουμε έξω", "Μπαίνουμε κάτω από γραφείο", "Παίρνουμε ασανσέρ"], correct: 1 }
      ],
      "quiz": [
        { q: "Ποια είναι η πιο ασφαλής μέθοδος κλειδώματος κινητού;", options: ["PIN 4 ψηφίων", "Μοτίβο", "Βιομετρικά στοιχεία"], correct: 2 },
        { q: "Τι προσφέρει η χρήση ενός VPN;", options: ["Ταχύτερο ίντερνετ", "Κρυπτογράφηση σύνδεσης", "Δωρεάν συνδρομές"], correct: 1 },
        { q: "Κοινό password σε όλους τους λογαριασμούς είναι:", options: ["Καλή πρακτική", "Επικίνδυνο", "Βολικό και ασφαλές"], correct: 1 }
      ]
    },
    en: {
      "badge-home": [
        { q: "Is it safe to leave the key under the mat?", options: ["Yes", "No", "Only for a while"], correct: 1 },
        { q: "What to do if you smell gas at home?", options: ["Turn on lights", "Open windows", "Call the police"], correct: 1 },
        { q: "How often should you test smoke alarms?", options: ["Yearly", "Never", "Monthly"], correct: 2 }
      ],
      "badge-digital": [
        { q: "Is it safe to share passwords via email?", options: ["Yes", "No", "Only with the bank"], correct: 1 },
        { q: "What is 2FA?", options: ["Double password", "Second security step", "A chat app"], correct: 1 },
        { q: "You find a USB in the street. What do you do?", options: ["Plug it in", "Throw it away", "Give it as a gift"], correct: 1 }
      ],
      "quiz": [
        { q: "What is the most secure phone lock method?", options: ["4-digit PIN", "Pattern", "Biometrics"], correct: 2 },
        { q: "What does a VPN provide?", options: ["Faster internet", "Connection encryption", "Free accounts"], correct: 1 },
        { q: "Using the same password everywhere is:", options: ["Good practice", "Dangerous", "Convenient and safe"], correct: 1 }
      ]
    }
  },

  activeQuestions: [],
  currentIndex: 0,
  score: 0,
  badge: '',
  currentLang: 'el',

  start: function(lang, badgeId) {
    this.currentLang = lang || 'el';
    this.badge = badgeId || 'quiz';
    this.activeQuestions = this.content[this.currentLang][this.badge] || this.content[this.currentLang]["quiz"];
    this.currentIndex = 0;
    this.score = 0;
    
    // Reset UI
    const res = document.getElementById("quiz-result");
    if (res) {
        res.classList.add("hidden");
        res.style.display = "none";
    }
    
    this.render();
  },

  render: function() {
    const qData = this.activeQuestions[this.currentIndex];
    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");

    const label = this.currentLang === 'el' ? 'Ερώτηση' : 'Question';
    if (pill) pill.textContent = `${label} ${this.currentIndex + 1} / ${this.activeQuestions.length}`;
    
    if (qBox) qBox.innerHTML = `<p class="q-text" style="font-size:1.2rem; font-weight:bold; text-align:center; margin-bottom:20px;">${qData.q}</p>`;
    
    if (oBox) {
      oBox.innerHTML = "";
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn"; // Χρήση του νέου CSS class για μεγάλα κουμπιά
        btn.style.width = "100%";
        btn.style.marginBottom = "12px";
        btn.style.pointerEvents = "auto";
        btn.textContent = opt;
        btn.onclick = () => this.check(idx);
        oBox.appendChild(btn);
      });
    }
  },

  check: function(idx) {
    if (idx === this.activeQuestions[this.currentIndex].correct) {
      this.score++;
    }
    
    this.currentIndex++;
    if (this.currentIndex < this.activeQuestions.length) {
      this.render();
    } else {
      this.showResult();
    }
  },

  showResult: function() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const percent = Math.round((this.score / this.activeQuestions.length) * 100);
    
    if (res) {
        res.classList.remove("hidden");
        res.style.display = "flex";
    }
    
    const scoreLabel = this.currentLang === 'el' ? 'Σκορ' : 'Score';
    if (scoreText) scoreText.textContent = `${scoreLabel}: ${percent}%`;

    // 🏆 Gamification: XP & Badges
    if (percent >= 60) {
      this.updateXP(50); // Δώσε 50 XP
      if (this.badge.startsWith('badge-')) {
        this.unlockBadge(this.badge);
      }
    }

    const continueBtn = document.getElementById("quiz-result-continue");
    if (continueBtn) {
      continueBtn.onclick = () => {
        res.classList.add("hidden");
        res.style.display = "none";
        if (window.showScreen) window.showScreen("home");
      };
    }
  },

  updateXP: function(amount) {
    let xpFill = document.getElementById("xp-fill");
    if (xpFill) {
      let currentWidth = parseInt(xpFill.style.width) || 10;
      let newWidth = Math.min(currentWidth + (amount / 5), 100);
      xpFill.style.width = newWidth + "%";
      if (newWidth >= 100) {
          const lv = document.getElementById("user-level");
          if (lv) lv.textContent = parseInt(lv.textContent) + 1;
          xpFill.style.width = "10%";
      }
    }
  },

  unlockBadge: function(badgeId) {
    const b = document.getElementById(badgeId);
    if (b) {
      b.classList.remove("locked");
      b.classList.add("unlocked");
      
      let saved = JSON.parse(localStorage.getItem("ss_badges") || "[]");
      if (!saved.includes(badgeId)) {
        saved.push(badgeId);
        localStorage.setItem("ss_badges", JSON.stringify(saved));
      }
    }
  }
};
