window.QuizEngine = {
  content: {
    el: {
      "badge-home": [
        /* LEVEL 1 (Εμφανίζονται στο Level 1 του χρήστη) */
        {
          q: "Είναι ασφαλές να αφήνεις το κλειδί κάτω από το χαλάκι;",
          options: ["Ναι", "Όχι", "Μόνο αν λείπω λίγο"],
          correct: 1,
          explain: "Οι διαρρήκτες ελέγχουν πρώτα χαλάκια και γλάστρες."
        },
        {
          q: "Τι κάνουμε αν μυρίσει υγραέριο στο σπίτι;",
          options: ["Ανάβουμε φως", "Ανοίγουμε παράθυρα", "Καλούμε την αστυνομία"],
          correct: 1,
          explain: "Δεν αγγίζουμε διακόπτες. Αερίζουμε άμεσα τον χώρο."
        },
        {
          q: "Πόσο συχνά ελέγχουμε τον ανιχνευτή καπνού;",
          options: ["Κάθε χρόνο", "Ποτέ", "Κάθε μήνα"],
          correct: 2,
          explain: "Ο μηνιαίος έλεγχος σώζει ζωές."
        },
        /* LEVEL 2 (Ξεκλειδώνουν αυτόματα όταν ο χρήστης πάει Level 2) */
        {
          q: "Τι κάνουμε αν πιάσει φωτιά το τηγάνι με λάδι;",
          options: ["Ρίχνουμε νερό", "Σκεπάζουμε με καπάκι", "Φυσάμε τη φωτιά"],
          correct: 1,
          explain: "Το νερό προκαλεί έκρηξη στο καυτό λάδι. Κλείστε το οξυγόνο με καπάκι."
        },
        {
          q: "Ποια είναι η καλύτερη θέση για ένα χρηματοκιβώτιο;",
          options: ["Πίσω από πίνακα", "Βιδωμένο στο πάτωμα", "Μέσα στην ντουλάπα"],
          correct: 1,
          explain: "Πρέπει να είναι σταθερά στερεωμένο για να μην κλαπεί ολόκληρο."
        },
        {
          q: "Πώς προστατεύουμε το σπίτι όταν λείπουμε μέρες;",
          options: ["Κλείνουμε όλα τα φώτα", "Χρονοδιακόπτης φώτων", "Κλειδί στη γλάστρα"],
          correct: 1,
          explain: "Ένα σπίτι που φαίνεται κατοικημένο αποτρέπει τους διαρρήκτες."
        }
      ],
      "badge-digital": [
        {
          q: "Είναι ασφαλές να δίνεις κωδικούς μέσω email;",
          options: ["Ναι", "Όχι", "Μόνο στην τράπεζα"],
          correct: 1,
          explain: "Καμία υπηρεσία δεν ζητά κωδικούς μέσω email."
        },
        {
          q: "Τι είναι το 2FA;",
          options: ["Διπλός κωδικός", "Δεύτερο βήμα ασφαλείας", "Εφαρμογή chat"],
          correct: 1,
          explain: "Προσθέτει ένα επιπλέον επίπεδο προστασίας."
        }
      ],
      "quiz": [
        {
          q: "Ποια είναι η πιο ασφαλής μέθοδος κλειδώματος κινητού;",
          options: ["PIN 4 ψηφίων", "Μοτίβο", "Βιομετρικά στοιχεία"],
          correct: 2,
          explain: "Τα βιομετρικά είναι δυσκολότερο να παραβιαστούν."
        }
      ]
    },

    en: {
      "quiz": [
        {
          q: "What is the most secure phone lock method?",
          options: ["4-digit PIN", "Pattern", "Biometrics"],
          correct: 2,
          explain: "Biometrics are harder to bypass."
        }
      ]
    }
  },

  difficulty: {
    "badge-home": 1,
    "badge-digital": 1.2,
    "badge-scam": 1.5,
    "badge-emergency": 1.3,
    "quiz": 1
  },

  activeQuestions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  badge: "",
  currentLang: "el",

  start(lang = "el", badgeId = "quiz") {
    this.currentLang = lang;
    this.badge = badgeId;

    // 1. Λήψη επιπέδου χρήστη και ερωτήσεων που έχουν ήδη απαντηθεί (Mastered)
    const userLvl = parseInt(document.getElementById("user-level")?.textContent) || 1;
    const mastered = JSON.parse(localStorage.getItem(`mastered_${badgeId}`) || "[]");
    const allPool = this.content[lang][badgeId] || this.content[lang]["quiz"];

    // 2. Έξυπνο φιλτράρισμα: Leveling (ανά 3άδα) + Μνήμη
    let available = allPool.filter((qData, index) => {
      const isNew = !mastered.includes(qData.q);
      const qLevel = Math.floor(index / 3) + 1;
      return isNew && qLevel <= userLvl;
    });

    // Αν δεν υπάρχουν νέες ερωτήσεις για το επίπεδο, δείξε όλο το pool μέχρι το επίπεδο του χρήστη
    if (available.length === 0) {
      available = allPool.filter((_, index) => (Math.floor(index / 3) + 1) <= userLvl);
    }

    // 3. Τυχαία επιλογή 3 ερωτήσεων
    this.activeQuestions = [...available]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;

    const res = document.getElementById("quiz-result");
    if (res) {
      res.classList.add("hidden");
      res.style.display = "none";
    }

    this.render();
  },

  render() {
    const qData = this.activeQuestions[this.currentIndex];
    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");

    if (pill) {
      pill.textContent =
        (this.currentLang === "el" ? "Ερώτηση" : "Question") +
        ` ${this.currentIndex + 1} / ${this.activeQuestions.length}`;
    }

    if (qBox) {
      qBox.innerHTML = `
        <p class="q-text" style="font-size:1.2rem;font-weight:bold;text-align:center;">
          ${qData.q}
        </p>
      `;
    }

    if (oBox) {
      oBox.innerHTML = "";
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => this.check(idx);
        oBox.appendChild(btn);
      });
    }
  },

  check(idx) {
    const qData = this.activeQuestions[this.currentIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === qData.correct) b.classList.add("correct");
      if (i === idx && idx !== qData.correct) b.classList.add("wrong");
    });

    if (idx === qData.correct) {
      this.score++;
      this.streak++;
      
      // Προσθήκη στη λίστα Mastered
      let mastered = JSON.parse(localStorage.getItem(`mastered_${this.badge}`) || "[]");
      if (!mastered.includes(qData.q)) {
        mastered.push(qData.q);
        localStorage.setItem(`mastered_${this.badge}`, JSON.stringify(mastered));
      }

      if (this.streak >= 3) this.updateXP(20);
    } else {
      this.streak = 0;
    }

    if (qData.explain) {
      const qBox = document.getElementById("quiz-question");
      qBox.innerHTML += `<p class="explain" style="color:var(--gold); font-size:0.95rem; margin-top:10px;">💡 ${qData.explain}</p>`;
    }

    setTimeout(() => {
      this.currentIndex++;
      this.currentIndex < this.activeQuestions.length
        ? this.render()
        : this.showResult();
    }, 1200);
  },

  showResult() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const percent = Math.round(
      (this.score / this.activeQuestions.length) * 100
    );

    if (res) {
      res.classList.remove("hidden");
      res.style.display = "flex";
    }

    if (scoreText) {
      scoreText.textContent =
        (this.currentLang === "el" ? "Σκορ" : "Score") + `: ${percent}%`;
    }

    if (percent >= 60) {
      const xp = 50 * (this.difficulty[this.badge] || 1);
      this.updateXP(Math.round(xp));
      if (this.badge.startsWith("badge-")) this.unlockBadge(this.badge);
    }

    const btn = document.getElementById("quiz-result-continue");
    if (btn) btn.onclick = () => window.showScreen?.("home");
  },

  updateXP(amount) {
    const xpFill = document.getElementById("xp-fill");
    const lv = document.getElementById("user-level");
    if (!xpFill || !lv) return;

    let currentWidth = parseFloat(xpFill.style.width) || 0;
    let newWidth = currentWidth + (amount / 5);

    if (newWidth >= 100) {
      lv.textContent = parseInt(lv.textContent) + 1;
      xpFill.style.width = (newWidth - 100) + "%"; // Μεταφορά υπολοίπου
    } else {
      xpFill.style.width = newWidth + "%";
    }
  },

  unlockBadge(id) {
    const el = document.getElementById(id);
    if (!el || !el.classList.contains("locked")) return;

    el.classList.remove("locked");
    el.classList.add("unlocked");

    const saved = JSON.parse(localStorage.getItem("ss_badges") || "[]");
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem("ss_badges", JSON.stringify(saved));
    }
  }
};
