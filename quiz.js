window.QuizEngine = {
  sources: {
    free: lang => `questions_free_${lang}.json`,
    premium: lang => `questions_premium_${lang}.json`
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

    const userLvlEl = document.getElementById("user-level");
    const userLvl = userLvlEl ? parseInt(userLvlEl.textContent) : 1;
    const isPremium = localStorage.getItem("isPremiumUser") === "true";

    if (userLvl >= 7 && !isPremium) {
      this.showPaywall();
      return;
    }

    const sourceFile = userLvl >= 7 ? this.sources.premium(lang) : this.sources.free(lang);

    try {
      const resp = await fetch(`${sourceFile}?v=${Date.now()}`);
      const data = await resp.json();
      const langData = data[lang] || data; 
      const levelKey = String(userLvl);
      
      let questionsPool = langData.levels?.[levelKey] || langData[badgeId] || [];

      const masteredKey = `mastered_${lang}_lvl${userLvl}`;
      const mastered = JSON.parse(localStorage.getItem(masteredKey) || "[]");
      let available = questionsPool.filter(q => !mastered.includes(q.q));

      if (available.length === 0) {
        available = questionsPool;
        localStorage.setItem(masteredKey, "[]");
      }

      this.activeQuestions = available.sort(() => Math.random() - 0.5).slice(0, 5);
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;

      const res = document.getElementById("quiz-result");
      if (res) { res.classList.add("hidden"); res.style.display = "none"; }

      this.render();
    } catch (e) {
      console.error("Quiz Error:", e);
    }
  },

  render() {
    const qData = this.activeQuestions[this.currentIndex];
    if (!qData) return;
    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");
    
    if (pill) pill.textContent = (this.currentLang === "el" ? "Ερώτηση" : "Question") + ` ${this.currentIndex + 1} / ${this.activeQuestions.length}`;
    if (qBox) qBox.innerHTML = `<p class="q-text" style="font-size:1.1rem; font-weight:bold; text-align:center;">${qData.q}</p>`;
    
    if (oBox) {
      oBox.innerHTML = "";
      qData.o.forEach((opt, idx) => {
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
    const userLvlEl = document.getElementById("user-level");
    const userLvl = userLvlEl ? parseInt(userLvlEl.textContent) : 1;
    const buttons = document.querySelectorAll(".option-btn");
    const isCorrect = (idx === qData.a);

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === qData.a) b.classList.add("correct");
      if (i === idx && !isCorrect) b.classList.add("wrong");
    });

    const explanation = qData.exp || qData.explain;
    if (explanation) {
      const qBox = document.getElementById("quiz-question");
      qBox.innerHTML += `<p class="explain" style="margin-top:12px; color: var(--gold); font-size:0.9rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">💡 ${explanation}</p>`;
    }

    if (isCorrect) {
      this.score++;
      const masteredKey = `mastered_${this.currentLang}_lvl${userLvl}`;
      let mastered = JSON.parse(localStorage.getItem(masteredKey) || "[]");
      if (!mastered.includes(qData.q)) {
        mastered.push(qData.q);
        localStorage.setItem(masteredKey, JSON.stringify(mastered));
      }
    }

    setTimeout(() => {
      this.currentIndex++;
      this.currentIndex < this.activeQuestions.length ? this.render() : this.showResult();
    }, 2500);
  },

  showResult() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const btnBox = document.getElementById("quiz-options");
    const isPremium = localStorage.getItem("isPremiumUser") === "true";
    const percent = Math.round((this.score / this.activeQuestions.length) * 100);

    if (res) { res.classList.remove("hidden"); res.style.display = "flex"; }
    if (scoreText) scoreText.textContent = (this.currentLang === "el" ? "Σκορ" : "Score") + `: ${percent}%`;
    if (btnBox) btnBox.innerHTML = "";

    if (percent >= 60) {
      if (isPremium) {
        this.createBtn(btnBox, this.currentLang === "el" ? "ΣΥΝΕΧΕΙΑ" : "CONTINUE", () => {
          this.updateXP(50);
          window.showScreen?.("home");
        });
      } else {
        // Επιλογή Double XP
        this.createBtn(btnBox, `💎 ${this.currentLang === "el" ? "ΔΙΠΛΟ XP (VIDEO)" : "DOUBLE XP (VIDEO)"}`, () => {
          this.playRewardVideo(100);
        }, "#ca8a04");

        // Επιλογή Απλή
        this.createBtn(btnBox, `📺 ${this.currentLang === "el" ? "ΣΥΝΕΧΕΙΑ (VIDEO)" : "CONTINUE (VIDEO)"}`, () => {
          this.playRewardVideo(50);
        }, "#15803d");
      }
    } else {
      this.createBtn(btnBox, this.currentLang === "el" ? "ΔΟΚΙΜΑΣΕ ΞΑΝΑ" : "RETRY", () => {
        this.start(this.currentLang, this.badge);
      }, "#dc2626");
    }
  },

  createBtn(container, text, action, bgColor = "var(--gold)") {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = text;
    btn.style.background = bgColor;
    btn.style.marginTop = "10px";
    btn.onclick = action;
    container.appendChild(btn);
  },

  playRewardVideo(xpAmount) {
    // Έλεγχος αν ο λογαριασμός AdMob είναι ενεργός
    if (window.admob && window.admob.rewardVideo) {
      window.admob.rewardVideo.show();
      document.addEventListener("admob.rewardvideo.events.REWARD", () => {
        this.updateXP(xpAmount);
        window.showScreen?.("home");
      }, { once: true });
    } else {
      // PRO MODE: Αν δεν έχεις AdMob ακόμα, σε αφήνει να περάσεις για να τεστάρεις
      console.log("AdMob not active. Simulation mode.");
      this.updateXP(xpAmount);
      window.showScreen?.("home");
    }
  },

  updateXP(amount) {
    const xpFill = document.getElementById("xp-fill");
    const lv = document.getElementById("user-level");
    if (!xpFill || !lv) return;
    let currentW = parseFloat(xpFill.style.width) || 0;
    let nextW = currentW + (amount / 5);
    if (nextW >= 100) {
      lv.textContent = parseInt(lv.textContent) + 1;
      xpFill.style.width = "0%";
    } else {
      xpFill.style.width = nextW + "%";
    }
  },

  showPaywall() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    if (res) {
      res.classList.remove("hidden");
      res.style.display = "flex";
      scoreText.innerHTML = `<span style="color:var(--gold); font-size: 1.2rem; font-weight:bold;">Level 7+ Required 🔒</span><br><p style="font-size:0.9rem; padding:10px;">Upgrade to Premium for AI & Deepfake training.</p>`;
    }
  }
};
