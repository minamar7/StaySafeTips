/**
 * Stay Safe Elite - Complete Quiz System
 * Handles multi-language scenarios, scoring, and badge awarding.
 */

const questions = {
  en: [
    { icon: "📨", q: "You receive an email saying your account will be closed unless you click a link. What should you do?", options: ["Click the link","Reply to the email","Ignore it and check your account through the official website","Forward it to friends"], correct: 2 },
    { icon: "🔑", q: "A website asks you to create a password. Which option is the safest?", options: ["Your pet’s name","12345678","A long unique password with symbols","Your birthday"], correct: 2 },
    { icon: "💬", q: "A stranger messages you asking for a verification code you received. What should you do?", options: ["Give them the code","Ask why they need it","Block and report the message","Ignore it"], correct: 2 },
    { icon: "📶", q: "You connect to free public Wi‑Fi. What should you avoid doing?", options: ["Reading news","Checking social media","Logging into banking apps","Watching videos"], correct: 2 },
    { icon: "🔍", q: "A friend sends you a suspicious link. What’s the safest action?", options: ["Click it","Ask them if it’s safe","Delete it and warn them","Forward it"], correct: 2 }
  ],
  el: [
    { icon: "📨", q: "Λαμβάνεις email που λέει ότι ο λογαριασμός σου θα κλείσει αν δεν πατήσεις έναν σύνδεσμο. Τι κάνεις;", options: ["Πατάω τον σύνδεσμο","Απαντώ στο email","Το αγνοώ και ελέγχω από την επίσημη ιστοσελίδα","Το προωθώ σε φίλους"], correct: 2 },
    { icon: "🔑", q: "Ποιος είναι ο πιο ασφαλής κωδικός πρόσβασης;", options: ["Το όνομα του κατοικιδίου μου","12345678","Ένας μακρύς, μοναδικός κωδικός με σύμβολα","Η ημερομηνία γέννησής μου"], correct: 2 },
    { icon: "💬", q: "Κάποιος άγνωστος ζητά τον κωδικό επαλήθευσης που έλαβες. Τι κάνεις;", options: ["Του τον δίνω","Ρωτάω γιατί τον θέλει","Τον μπλοκάρω και τον αναφέρω","Το αγνοώ"], correct: 2 },
    { icon: "📶", q: "Χρησιμοποιείς δωρεάν δημόσιο Wi‑Fi. Τι πρέπει να αποφύγεις;", options: ["Να διαβάζω νέα","Να μπαίνω στα social","Να συνδεθώ στην τράπεζά μου","Να βλέπω βίντεο"], correct: 2 },
    { icon: "🔍", q: "Φίλος σου στέλνει ύποπτο link. Τι κάνεις;", options: ["Το πατάω","Ρωτάω αν είναι ασφαλές","Το διαγράφω και τον προειδοποιώ","Το προωθώ"], correct: 2 }
  ]
};

class QuizEngine {
  constructor(lang = "el") {
    this.lang = questions[lang] ? lang : "el";
    this.data = questions[this.lang];
    this.currentIndex = 0;
    this.score = 0;
    
    // UI Elements
    this.questionEl = document.getElementById("quiz-question");
    this.optionsEl = document.getElementById("quiz-options");
    this.nextBtn = document.getElementById("quiz-next-btn");
    this.pillEl = document.getElementById("quiz-pill");
    this.resultOverlay = document.getElementById("quiz-result");
  }

  static start(lang) {
    console.log("QuizEngine: Initialization for", lang);
    const instance = new QuizEngine(lang);
    instance.loadQuestion();
    window.currentQuiz = instance; // Global reference for buttons
    return instance;
  }

  loadQuestion() {
    if (!this.questionEl || !this.optionsEl) return;
    
    this.nextBtn.disabled = true;
    const qData = this.data[this.currentIndex];
    
    // Update Header Progress
    if (this.pillEl) {
        this.pillEl.textContent = this.lang === 'el' ? 
            `Ερώτηση ${this.currentIndex + 1} από ${this.data.length}` : 
            `Question ${this.currentIndex + 1} of ${this.data.length}`;
    }
    
    this.questionEl.innerHTML = `
      <div class="q-card">
        <span class="q-icon">${qData.icon}</span>
        <p class="q-text">${qData.q}</p>
      </div>
    `;

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
    const correct = this.data[this.currentIndex].correct;
    const allBtns = this.optionsEl.querySelectorAll(".opt-btn");

    allBtns.forEach(b => b.disabled = true);

    if (idx === correct) {
      btn.classList.add("correct");
      this.score++;
    } else {
      btn.classList.add("wrong");
      allBtns[correct].classList.add("correct");
    }

    this.nextBtn.disabled = false;
    this.nextBtn.onclick = () => this.nextQuestion();
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.data.length) {
      this.loadQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    const finalScore = Math.round((this.score / this.data.length) * 100);
    
    // Εμφάνιση Result Overlay
    if (this.resultOverlay) {
        this.resultOverlay.classList.remove("hidden");
        document.getElementById("quiz-result-score").textContent = `Score: ${finalScore}%`;
        
        // Awarding Badge
        if (finalScore >= 80) {
            this.dispatchBadge("badge-digital");
        }
    }

    // Σύνδεση με το κουμπί Continue του Overlay
    const continueBtn = document.getElementById("quiz-result-continue");
    if (continueBtn) {
        continueBtn.onclick = () => {
            this.resultOverlay.classList.add("hidden");
            location.reload(); // Reset state
        };
    }
  }

  dispatchBadge(badgeId) {
    // Custom Event για να το ακούσει το app.js
    const event = new CustomEvent("quizCompleted", {
      detail: { score: this.score, total: this.data.length, badgeId: badgeId }
    });
    window.dispatchEvent(event);
  }
}

// Global Export
window.QuizEngine = QuizEngine;
