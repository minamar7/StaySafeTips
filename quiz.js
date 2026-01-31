window.QuizEngine = {
  questions: [
    { q: "Είναι ασφαλές να δίνεις κωδικούς μέσω email;", options: ["Ναι", "Όχι", "Μόνο στην τράπεζα"], correct: 1 },
    { q: "Τι είναι το 2FA;", options: ["Διπλός κωδικός", "Δεύτερο βήμα ασφαλείας", "Εφαρμογή chat"], correct: 1 },
    { q: "Βρίσκεις ένα USB στο δρόμο. Τι κάνεις;", options: ["Το βάζω στο PC", "Το πετάω", "Το χαρίζω"], correct: 1 }
  ],
  currentIndex: 0,
  score: 0,
  badge: '',

  start: function(lang, badgeId) {
    this.currentIndex = 0;
    this.score = 0;
    this.badge = badgeId;
    
    const res = document.getElementById("quiz-result");
    if (res) res.classList.add("hidden");
    
    this.render();
  },

  render: function() {
    const qData = this.questions[this.currentIndex];
    const qBox = document.getElementById("quiz-question");
    const oBox = document.getElementById("quiz-options");
    const pill = document.getElementById("quiz-pill");

    if (pill) pill.textContent = `Ερώτηση ${this.currentIndex + 1} από ${this.questions.length}`;
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
    
    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) nextBtn.disabled = true;
  },

  check: function(idx) {
    if (idx === this.questions[this.currentIndex].correct) {
      this.score++;
    }
    
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.render();
    } else {
      this.showResult();
    }
  },

  showResult: function() {
    const res = document.getElementById("quiz-result");
    const scoreText = document.getElementById("quiz-result-score");
    const percent = Math.round((this.score / this.questions.length) * 100);
    
    if (res) res.classList.remove("hidden");
    if (scoreText) scoreText.textContent = `Σκορ: ${percent}%`;

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

    const continueBtn = document.getElementById("quiz-result-continue");
    if (continueBtn) {
      continueBtn.onclick = () => {
        res.classList.add("hidden");
        // Επιστροφή στο Home χρησιμοποιώντας το κουμπί του μενού
        document.querySelector('[data-target="home"]').click();
      };
    }
  }
};
