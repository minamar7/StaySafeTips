window.QuizEngine = {
  // Όλες οι ερωτήσεις συγκεντρωμένες ανά γλώσσα και κατηγορία
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
        { q: "Λαμβάνεις SMS: 'Το δέμα σας εκκρεμεί, πάτα εδώ'. Τι κάνεις;", options: ["Πατάω το link", "Το διαγράφω αμέσως", "Στέλνω στοιχεία"], correct: 1 },
        { q: "Κάποιος τηλεφωνεί από την 'Τράπεζα' και ζητάει PIN. Τι κάνεις;", options: ["Του το δίνω", "Κλείνω το τηλέφωνο", "Τον ρωτάω ποιος είναι"], correct: 1 }
      ],
      "badge-emergency": [
        { q: "Ποιος είναι ο ευρωπαϊκός αριθμός έκτακτης ανάγκης;", options: ["100", "911", "112"], correct: 2 },
        { q: "Τι κάνουμε σε περίπτωση σεισμού;", options: ["Τρέχουμε έξω", "Μπαίνουμε κάτω από γραφείο", "Παίρνουμε ασανσέρ"], correct: 1 }
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
      "badge-scam": [
        { q: "SMS says: 'Package pending, click here'. What do you do?", options: ["Click the link", "Delete it", "Send info"], correct: 1 },
        { q: "Bank calls asking for your PIN. What do you do?", options: ["Give it to them", "Hang up", "Ask who they are"], correct: 1 }
      ],
      "badge-emergency": [
        { q: "What is the European emergency number?", options: ["100", "911", "112"], correct: 2 },
        { q: "What to do during an earthquake?", options: ["Run outside", "Hide under a desk", "Take the elevator"], correct: 1 }
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
    this.badge = badgeId || 'badge-home';
    
    // Φόρτωση σωστών ερωτήσεων
    this.activeQuestions = this.content[this.currentLang][this.badge] || this.content[this.currentLang]["badge-home"];
    
    this.currentIndex = 0;
    this.score = 0;
    
    document.getElementById("quiz-result")?.classList.add("hidden");
    this.render();
  },

  render: function() {
    const qData = this.activeQuestions[this.currentIndex];
    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");

    const label = this.currentLang === 'el' ? 'Ερώτηση' : 'Question';
    const total = this.activeQuestions.length;

    if (pill) pill.textContent = `${label} ${this.currentIndex + 1} / ${total}`;
    if (qBox) qBox.innerHTML = `<div class="q-card"><p class="q-text">${qData.q}</p></div>`;
    
    if (oBox) {
      oBox.innerHTML = "";
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "main-cta"; 
        btn.style.margin = "8px 0";
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
    
    if (res) res.classList.remove("hidden");
    
    const scoreLabel = this.currentLang === 'el' ? 'Σκορ' : 'Score';
    if (scoreText) scoreText.textContent = `${scoreLabel}: ${percent}%`;

    // Ξεκλείδωμα αν το σκορ είναι >= 80%
    if (percent >= 80) {
      const b = document.getElementById(this.badge);
      if (b) {
        b.classList.remove("locked");
        b.classList.add("unlocked");
        
        let saved = JSON.parse(localStorage.getItem("ss_badges") || "[]");
        if (!saved.includes(this.badge)) {
          saved.push(this.badge);
          localStorage.setItem("ss_badges", JSON.stringify(saved));
        }
      }
    }

    document.getElementById("quiz-result-continue").onclick = () => {
      res.classList.add("hidden");
      document.querySelector('[data-target="home"]').click();
    };
  }
};
