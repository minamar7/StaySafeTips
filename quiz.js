window.QuizEngine = {
  sources: {
    free: "quiz.json",
    premium: "questions_premium.json"
  },

  content: {
    el: {
      "badge-home": [
        { q: "Είναι ασφαλές να αφήνεις το κλειδί κάτω από το χαλάκι;", options: ["Ναι", "Όχι", "Μόνο αν λείπω λίγο"], correct: 1, explain: "Οι διαρρήκτες ελέγχουν πρώτα χαλάκια και γλάστρες." },
        { q: "Τι κάνουμε αν μυρίσει υγραέριο στο σπίτι;", options: ["Ανάβουμε φως", "Ανοίγουμε παράθυρα", "Καλούμε την αστυνομία"], correct: 1, explain: "Δεν αγγίζουμε διακόπτες. Αερίζουμε άμεσα τον χώρο." },
        { q: "Πόσο συχνά ελέγχουμε τον ανιχνευτή καπνού;", options: ["Κάθε χρόνο", "Ποτέ", "Κάθε μήνα"], correct: 2, explain: "Ο μηνιαίος έλεγχος σώζει ζωές." }
      ],
      "badge-digital": [
        { q: "Είναι ασφαλές να δίνεις κωδικούς μέσω email;", options: ["Ναι", "Όχι", "Μόνο στην τράπεζα"], correct: 1, explain: "Καμία σοβαρή υπηρεσία δεν ζητά κωδικούς." },
        { q: "Τι είναι το 2FA;", options: ["Διπλός κωδικός", "Δεύτερο βήμα ασφαλείας", "Εφαρμογή chat"], correct: 1, explain: "Προσθέτει επιπλέον επίπεδο προστασίας." }
      ],
      "quiz": [
        { q: "Ποια είναι η πιο ασφαλής μέθοδος κλειδώματος κινητού;", options: ["PIN 4 ψηφίων", "Μοτίβο", "Βιομετρικά στοιχεία"], correct: 2, explain: "Τα βιομετρικά είναι δυσκολότερο να παραβιαστούν." }
      ]
    },
    en: {
      "quiz": [
        { q: "What is the most secure phone lock method?", options: ["4-digit PIN", "Pattern", "Biometrics"], correct: 2, explain: "Biometrics are harder to bypass." }
      ]
    }
  },

  difficulty: { "badge-home": 1, "badge-digital": 1.2, "badge-scam": 1.5, "badge-emergency": 1.3, "quiz": 1 },
  activeQuestions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  badge: "",
  currentLang: "el",

  async start(lang = "el", badgeId = "quiz") {
    this.currentLang = lang;
    this.badge = badgeId;

    const userLvl = parseInt(document.getElementById("user-level")?.textContent) || 1;
    const isPremium = localStorage.getItem("isPremiumUser") === "true";

    // Paywall
    if (userLvl >= 7 && !isPremium) {
      this.showPaywall();
      return;
    }

    let questionsPool = [];
    const sourceFile = userLvl >= 7 ? this.sources.premium : this.sources.free;

    try {
      const resp = await fetch(`${sourceFile}?v=${Date.now()}`);
      const data = await resp.json();

      const levelKey = String(userLvl);

      // ⭐ NEW LEVEL-BASED LOADING ⭐
      questionsPool =
        data[lang]?.levels?.[levelKey] ||     // ← FREE/PREMIUM LEVELS
        data[lang]?.[badgeId] ||              // fallback
        data[lang]?.quiz ||                   // fallback
        this.content[lang][badgeId] ||        // local fallback
        this.content[lang].quiz;

    } catch (e) {
      console.warn("Using local content as fallback.");

      const levelKey = String(userLvl);

      questionsPool =
        this.content[lang]?.levels?.[levelKey] ||
        this.content[lang][badgeId] ||
        this.content[lang].quiz;
    }

    // No-repeat system
    const masteredKey = `mastered_${lang}_${badgeId}`;
    const mastered = JSON.parse(localStorage.getItem(masteredKey) || "[]");

    let available = questionsPool.filter(q => !mastered.includes(q.q));

    if (available.length === 0) {
      available = questionsPool;
      localStorage.setItem(masteredKey, "[]");
    }

    this.activeQuestions = available.sort(() => Math.random() - 0.5).slice(0, 3);
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;

    const res = document.getElementById("quiz-result");
    if (res) { res.classList.add("hidden"); res.style.display = "none"; }

    this.render();
  },

  showPaywall() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const btn = document.getElementById("quiz-result-continue");
    if (res) {
      res.classList.remove("hidden");
      res.style.display = "flex";
      scoreText.innerHTML =
        `<span style="color:var(--gold); font-size: 1.4rem; font-weight: bold;">Level 7+ Required 🔒</span><br><p style="margin-top:10px; padding: 0 10px;">Έφτασες στο επίπεδο Premium! Ξεκλείδωσε το πλήρες περιεχόμενο για να συνεχίσεις.</p>`;
      btn.textContent = "Unlock Premium";
      btn.onclick = () => alert("Redirecting to Purchase...");
    }
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
      qBox.innerHTML =
        `<p class="q-text" style="font-size:1.2rem;font-weight:bold;text-align:center;">${qData.q}</p>`;
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

      const masteredKey = `mastered_${this.currentLang}_${this.badge}`;
      let mastered = JSON.parse(localStorage.getItem(masteredKey) || "[]");
      if (!mastered.includes(qData.q)) {
        mastered.push(qData.q);
        localStorage.setItem(masteredKey, JSON.stringify(mastered));
      }

      if (this.streak >= 3) this.updateXP(20);
    } else {
      this.streak = 0;
    }

    if (qData.explain) {
      const qBox = document.getElementById("quiz-question");
      qBox.innerHTML +=
        `<p class="explain" style="margin-top:10px; color: var(--gold); padding: 5px;">💡 ${qData.explain}</p>`;
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
    const percent = Math.round((this.score / this.activeQuestions.length) * 100);

    if (res) { res.classList.remove("hidden"); res.style.display = "flex"; }
    if (scoreText) {
      scoreText.textContent =
        (this.currentLang === "el" ? "Σκορ" : "Score") + `: ${percent}%`;
    }

    localStorage.setItem(
      `quiz_${this.badge}`,
      JSON.stringify({ percent, date: Date.now() })
    );

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

    let currentW = parseFloat(xpFill.style.width) || 0;
    let nextW = currentW + amount / 5;

    if (nextW >= 100) {
      lv.textContent = parseInt(lv.textContent) + 1;
      xpFill.style.width = nextW - 100 + "%";
    } else {
      xpFill.style.width = nextW + "%";
    }
  },

  unlockBadge(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("locked");
    el.classList.add("unlocked");
    const saved = JSON.parse(localStorage.getItem("ss_badges") || "[]");
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem("ss_badges", JSON.stringify(saved));
    }
  }
};