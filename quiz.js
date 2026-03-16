window.QuizEngine = {
  sources: {
    free:    lang => `questions_free_${lang}.json`,
    premium: lang => `questions_premium_${lang}.json`
  },

  difficulty: {
    "badge-home": 1, "badge-digital": 1.2,
    "badge-scam": 1.5, "badge-emergency": 1.3, "quiz": 1
  },

  activeQuestions: [],
  currentIndex:    0,
  score:           0,
  streak:          0,       // ← streak ερωτήσεων μέσα στο τρέχον quiz
  badge:           "",
  currentLang:     "el",
  _timer:          null,    // interval ref

  /* ─────────────────────────────────────────
     XP & LEVEL  –  persist στο localStorage
  ───────────────────────────────────────── */
  getXP()    { return parseFloat(localStorage.getItem("xp_val")  || "0"); },
  getLevel() { return parseInt(  localStorage.getItem("xp_level") || "1"); },

  saveXP(xp, level) {
    localStorage.setItem("xp_val",   String(xp));
    localStorage.setItem("xp_level", String(level));
  },

  syncXPBar() {
    const xpFill = document.getElementById("xp-fill");
    const lvEl   = document.getElementById("user-level");
    if (xpFill) xpFill.style.width = this.getXP() + "%";
    if (lvEl)   lvEl.textContent   = this.getLevel();
  },

  /* ─────────────────────────────────────────
     DAILY STREAK  –  persist στο localStorage
  ───────────────────────────────────────── */
  getDailyStreak() { return parseInt(localStorage.getItem("daily_streak") || "1"); },

  updateDailyStreak() {
    const today     = new Date().toDateString();
    const lastDay   = localStorage.getItem("streak_last_day") || "";
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let streak      = this.getDailyStreak();

    if (lastDay === today) return streak;          // ήδη μετρήθηκε σήμερα
    if (lastDay === yesterday) { streak++; }       // συνεχόμενη μέρα
    else if (lastDay !== today) { streak = 1; }    // έσπασε το streak

    localStorage.setItem("daily_streak",    String(streak));
    localStorage.setItem("streak_last_day", today);

    const el = document.getElementById("streak_val");
    if (el) el.textContent = streak;
    return streak;
  },

  /* ─────────────────────────────────────────
     PREMIUM CHECK
     Ελέγχεται από το Kotlin/Android bridge.
     Το localStorage χρησιμοποιείται ΜΟΝΟ ως
     cache — η πηγή αλήθειας είναι το native.
  ───────────────────────────────────────── */
  isPremium() {
    // Αν υπάρχει Android bridge, ρώτα το native
    if (window.AndroidBilling && typeof window.AndroidBilling.isPremium === "function") {
      return window.AndroidBilling.isPremium() === true;
    }
    // Fallback για web / testing
    return localStorage.getItem("isPremiumUser") === "true";
  },

  /* ─────────────────────────────────────────
     START
  ───────────────────────────────────────── */
  async start(lang = "el", badgeId = "quiz") {
    this.currentLang = lang;
    this.badge       = badgeId;
    this.score       = 0;
    this.streak      = 0;

    this.updateDailyStreak();
    this.syncXPBar();

    const userLvl    = this.getLevel();
    const premium    = this.isPremium();

    // Paywall: level 7+ χωρίς premium
    if (userLvl >= 7 && !premium) {
      this.showPaywall();
      return;
    }

    const sourceFile = (userLvl >= 7)
      ? this.sources.premium(lang)
      : this.sources.free(lang);

    try {
      const resp   = await fetch(`${sourceFile}?v=${Date.now()}`);
      const data   = await resp.json();
      const langData  = data[lang] || data;
      const levelKey  = String(userLvl);
      let questionsPool = langData.levels?.[levelKey] || langData[badgeId] || [];

      // Mastered filter
      const masteredKey = `mastered_${lang}_lvl${userLvl}`;
      const mastered    = JSON.parse(localStorage.getItem(masteredKey) || "[]");
      let available     = questionsPool.filter(q => !mastered.includes(q.q));
      if (available.length === 0) {
        available = questionsPool;
        localStorage.setItem(masteredKey, "[]");
      }

      // Difficulty: πλήθος ερωτήσεων βάσει difficulty multiplier
      const diff       = this.difficulty[badgeId] || 1;
      const count      = Math.min(Math.round(5 * diff), available.length) || 5;
      this.activeQuestions = available
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

      this.currentIndex = 0;

      const res = document.getElementById("quiz-result");
      if (res) { res.classList.add("hidden"); res.style.display = "none"; }

      this.render();
    } catch (e) {
      console.error("Quiz Error:", e);
    }
  },

  /* ─────────────────────────────────────────
     RENDER  (+ timer)
  ───────────────────────────────────────── */
  render() {
    const qData = this.activeQuestions[this.currentIndex];
    if (!qData) return;

    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");

    if (pill) pill.textContent =
      (this.currentLang === "el" ? "Ερώτηση" : "Question") +
      ` ${this.currentIndex + 1} / ${this.activeQuestions.length}`;

    // ── Progress bar (αν υπάρχει) ──
    const pFill = document.getElementById("quiz-progress-fill");
    if (pFill) {
      const pct = ((this.currentIndex) / this.activeQuestions.length * 100).toFixed(1);
      pFill.style.width = pct + "%";
    }

    // ── Streak badge ──
    this._renderStreakBadge();

    if (qBox) qBox.innerHTML =
      `<p class="q-text" style="font-size:1.1rem;font-weight:bold;text-align:center;">${qData.q}</p>`;

    if (oBox) {
      oBox.innerHTML = "";
      qData.o.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className   = "option-btn";
        btn.textContent = opt;
        btn.onclick     = () => this.check(idx);
        oBox.appendChild(btn);
      });
    }

    // ── Timer (30 δευτ. ανά ερώτηση) ──
    this._startTimer(30);
  },

  /* ─────────────────────────────────────────
     TIMER
  ───────────────────────────────────────── */
  _startTimer(seconds) {
    this._stopTimer();
    let remaining = seconds;
    this._updateTimerUI(remaining, seconds);

    this._timer = setInterval(() => {
      remaining--;
      this._updateTimerUI(remaining, seconds);
      if (remaining <= 0) {
        this._stopTimer();
        this._timeOut();
      }
    }, 1000);
  },

  _stopTimer() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  },

  _updateTimerUI(remaining, total) {
    let el = document.getElementById("quiz-timer");
    if (!el) {
      // Δημιούργησε το timer αν δεν υπάρχει
      const qBox = document.getElementById("quiz-question");
      if (!qBox) return;
      el = document.createElement("div");
      el.id = "quiz-timer";
      el.style.cssText = `
        display:flex; align-items:center; justify-content:center; gap:8px;
        margin-bottom:12px; font-size:0.8rem; font-weight:800;
        letter-spacing:0.05em;
      `;
      qBox.parentNode.insertBefore(el, qBox);
    }

    const pct   = (remaining / total) * 100;
    const color = remaining > 15 ? "var(--accent)"
                : remaining > 7  ? "var(--gold)"
                :                  "var(--danger)";

    el.innerHTML = `
      <span style="color:${color}">⏱ ${remaining}s</span>
      <div style="flex:1;height:4px;background:#1e293b;border-radius:2px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:2px;transition:width 0.9s linear;"></div>
      </div>
    `;
  },

  _timeOut() {
    // Χρόνος εξέπνευσε — δείχνει σωστή απάντηση & προχωράει
    const qData   = this.activeQuestions[this.currentIndex];
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === qData.a) b.classList.add("correct");
    });

    // Streak reset
    this.streak = 0;
    this._renderStreakBadge();

    const qBox = document.getElementById("quiz-question");
    if (qBox) {
      const timeMsg = document.createElement("p");
      timeMsg.style.cssText = "margin-top:10px;color:var(--danger);font-size:0.85rem;text-align:center;font-weight:700;";
      timeMsg.textContent = this.currentLang === "el" ? "⏰ Ο χρόνος σου έληξε!" : "⏰ Time's up!";
      qBox.appendChild(timeMsg);
    }

    setTimeout(() => {
      this.currentIndex++;
      this.currentIndex < this.activeQuestions.length
        ? this.render()
        : this.showResult();
    }, 2000);
  },

  /* ─────────────────────────────────────────
     STREAK BADGE
  ───────────────────────────────────────── */
  _renderStreakBadge() {
    let el = document.getElementById("quiz-streak-badge");
    if (!el) {
      el = document.createElement("div");
      el.id = "quiz-streak-badge";
      el.style.cssText = `
        text-align:center; font-size:0.75rem; font-weight:800;
        letter-spacing:0.08em; min-height:22px; margin-bottom:6px;
        transition: all 0.3s;
      `;
      const pill = document.getElementById("quiz-pill");
      if (pill) pill.parentNode.insertBefore(el, pill.nextSibling);
    }

    if (this.streak >= 3) {
      const flames = this.streak >= 7 ? "🔥🔥🔥" : this.streak >= 5 ? "🔥🔥" : "🔥";
      el.innerHTML = `<span style="color:var(--gold)">${flames} ${this.streak} STREAK!</span>`;
      // Micro-animation
      el.style.transform = "scale(1.15)";
      setTimeout(() => { el.style.transform = "scale(1)"; }, 300);
    } else {
      el.innerHTML = "";
    }
  },

  /* ─────────────────────────────────────────
     CHECK ANSWER
  ───────────────────────────────────────── */
  check(idx) {
    this._stopTimer();
    const qData    = this.activeQuestions[this.currentIndex];
    const userLvl  = this.getLevel();
    const buttons  = document.querySelectorAll(".option-btn");
    const isCorrect = (idx === qData.a);

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === qData.a) b.classList.add("correct");
      if (i === idx && !isCorrect) b.classList.add("wrong");
    });

    // Explanation
    const explanation = qData.exp || qData.explain;
    if (explanation) {
      const qBox = document.getElementById("quiz-question");
      if (qBox) qBox.innerHTML +=
        `<p class="explain" style="margin-top:12px;color:var(--gold);font-size:0.9rem;border-top:1px solid rgba(255,255,255,0.1);padding-top:10px;">💡 ${explanation}</p>`;
    }

    if (isCorrect) {
      this.score++;
      this.streak++;

      // Mastered
      const masteredKey = `mastered_${this.currentLang}_lvl${userLvl}`;
      let mastered = JSON.parse(localStorage.getItem(masteredKey) || "[]");
      if (!mastered.includes(qData.q)) {
        mastered.push(qData.q);
        localStorage.setItem(masteredKey, JSON.stringify(mastered));
      }
    } else {
      this.streak = 0;
    }

    this._renderStreakBadge();

    setTimeout(() => {
      this.currentIndex++;
      this.currentIndex < this.activeQuestions.length
        ? this.render()
        : this.showResult();
    }, 2500);
  },

  /* ─────────────────────────────────────────
     SHOW RESULT
  ───────────────────────────────────────── */
  showResult() {
    this._stopTimer();

    // Καθάρισε timer & streak badge από UI
    const timerEl  = document.getElementById("quiz-timer");
    const badgeEl  = document.getElementById("quiz-streak-badge");
    if (timerEl) timerEl.remove();
    if (badgeEl) badgeEl.remove();

    const res       = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const btnBox    = document.getElementById("quiz-options");
    const premium   = this.isPremium();
    const percent   = Math.round((this.score / this.activeQuestions.length) * 100);

    if (res) { res.classList.remove("hidden"); res.style.display = "flex"; }
    if (scoreText) scoreText.textContent =
      (this.currentLang === "el" ? "Σκορ" : "Score") + `: ${percent}%`;
    if (btnBox) btnBox.innerHTML = "";

    // Confetti για 100%
    if (percent === 100 && window.confetti) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }

    if (percent >= 60) {
      if (premium) {
        this.createBtn(btnBox,
          this.currentLang === "el" ? "ΣΥΝΕΧΕΙΑ" : "CONTINUE",
          () => { this.updateXP(50); window.showScreen?.("home"); }
        );
      } else {
        this.createBtn(btnBox,
          `💎 ${this.currentLang === "el" ? "ΔΙΠΛΟ XP (VIDEO)" : "DOUBLE XP (VIDEO)"}`,
          () => { this.playRewardVideo(100); }, "#ca8a04"
        );
        this.createBtn(btnBox,
          `📺 ${this.currentLang === "el" ? "ΣΥΝΕΧΕΙΑ (VIDEO)" : "CONTINUE (VIDEO)"}`,
          () => { this.playRewardVideo(50); }, "#15803d"
        );
      }
    } else {
      this.createBtn(btnBox,
        this.currentLang === "el" ? "ΔΟΚΙΜΑΣΕ ΞΑΝΑ" : "RETRY",
        () => { this.start(this.currentLang, this.badge); }, "#dc2626"
      );
    }
  },

  /* ─────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────── */
  createBtn(container, text, action, bgColor = "var(--gold)") {
    const btn = document.createElement("button");
    btn.className  = "option-btn";
    btn.innerHTML  = text;
    btn.style.background = bgColor;
    btn.style.marginTop  = "10px";
    btn.onclick = action;
    container.appendChild(btn);
  },

  playRewardVideo(xpAmount) {
    if (window.admob && window.admob.rewardVideo) {
      window.admob.rewardVideo.show();
      document.addEventListener("admob.rewardvideo.events.REWARD", () => {
        this.updateXP(xpAmount);
        window.showScreen?.("home");
      }, { once: true });
    } else {
      // Dev / simulation mode
      console.log("AdMob not active — simulation mode.");
      this.updateXP(xpAmount);
      window.showScreen?.("home");
    }
  },

  /* ─────────────────────────────────────────
     UPDATE XP  –  persist στο localStorage
  ───────────────────────────────────────── */
  updateXP(amount) {
    // Bonus XP αν streak >= 5
    if (this.streak >= 5) amount = Math.round(amount * 1.5);

    let xp    = this.getXP();
    let level = this.getLevel();

    xp += (amount / 5);   // κάθε 5 XP = 1% της μπάρας

    if (xp >= 100) {
      level++;
      xp = xp - 100;      // carry over
      // Level-up notification
      this._showLevelUp(level);
    }

    this.saveXP(parseFloat(xp.toFixed(2)), level);
    this.syncXPBar();
  },

  _showLevelUp(newLevel) {
    const banner = document.createElement("div");
    banner.style.cssText = `
      position:fixed; top:80px; left:50%; transform:translateX(-50%) translateY(-20px);
      background:linear-gradient(135deg,var(--gold),#f59e0b);
      color:#020617; padding:12px 28px; border-radius:16px;
      font-weight:900; font-size:1rem; z-index:99999;
      box-shadow:0 8px 32px rgba(250,204,21,0.5);
      animation: lvlup 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
    `;
    banner.textContent = `⭐ LEVEL ${newLevel} UNLOCKED!`;

    const style = document.createElement("style");
    style.textContent = `@keyframes lvlup {
      from{opacity:0;transform:translateX(-50%) translateY(-20px)}
      to{opacity:1;transform:translateX(-50%) translateY(0)}
    }`;
    document.head.appendChild(style);
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 3000);

    if (window.confetti) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.3 } });
    }
  },

  /* ─────────────────────────────────────────
     PAYWALL
  ───────────────────────────────────────── */
  showPaywall() {
    const res       = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const btnBox    = document.getElementById("quiz-options");

    if (res) { res.classList.remove("hidden"); res.style.display = "flex"; }

    if (scoreText) scoreText.innerHTML = `
      <span style="color:var(--gold);font-size:1.2rem;font-weight:bold;">
        Level 7+ Required 🔒
      </span>
      <br>
      <p style="font-size:0.9rem;padding:10px;">
        Upgrade to Premium for AI &amp; Deepfake training.
      </p>
    `;

    if (btnBox) {
      btnBox.innerHTML = "";
      this.createBtn(btnBox,
        `💎 ${this.currentLang === "el" ? "ΑΝΑΒΑΘΜΙΣΗ ΤΩΡΑ" : "UPGRADE NOW"}`,
        () => {
          // Κάλεσε το Android billing bridge
          if (window.AndroidBilling && typeof window.AndroidBilling.launchBilling === "function") {
            window.AndroidBilling.launchBilling();
          } else {
            window.location.href = "premium.html";
          }
        }, "linear-gradient(135deg,var(--gold),#f59e0b)"
      );
    }
  }
};
