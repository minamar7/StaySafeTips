(function() {
  const initApp = () => {
    console.log("🚀 Stay Safe Elite Initialized");

    // Elements
    const onboarding = document.getElementById("onboarding");
    const appShell = document.querySelector(".app-shell");
    const startBtn = document.getElementById("onboarding-start");
    const screens = document.querySelectorAll(".app-screen");
    const tabs = document.querySelectorAll(".nav-tab");
    
    // Στοιχεία Αποτελέσματος
    const resultOverlay = document.getElementById("quiz-result");
    const resultContinueBtn = document.getElementById("quiz-result-continue");

    // --- 1. Λειτουργία Εναλλαγής Οθονών ---
    window.showScreen = (targetId) => {
      console.log("Navigating to:", targetId);
      
      screens.forEach(s => {
        if (s.id === `screen-${targetId}`) {
          s.style.display = "block";
          s.classList.add("active");
        } else {
          s.style.display = "none";
          s.classList.remove("active");
        }
      });

      tabs.forEach(t => {
        t.classList.toggle("active", t.getAttribute("data-target") === targetId);
      });

      // Αν κλείνουμε το Quiz, σιγουρευόμαστε ότι το overlay φεύγει
      if (targetId !== 'quiz' && resultOverlay) {
        resultOverlay.classList.add("hidden");
        resultOverlay.style.display = "none";
      }
    };

    // --- 2. Κλείσιμο του Result Overlay (ΣΥΝΕΧΕΙΑ) ---
    if (resultContinueBtn) {
      resultContinueBtn.addEventListener("click", () => {
        console.log("Continuing to home...");
        if (resultOverlay) {
          resultOverlay.classList.add("hidden");
          resultOverlay.style.display = "none";
        }
        window.showScreen("home");
      });
    }

    // --- 3. Onboarding Logic ---
    const completeOnboarding = () => {
      if (onboarding) onboarding.style.display = "none";
      if (appShell) {
        appShell.classList.remove("hidden");
        appShell.style.display = "block";
      }
      localStorage.setItem("ss_onboarding_done", "true");
      window.showScreen("home");
    };

    if (startBtn) {
      startBtn.addEventListener("click", completeOnboarding);
    }

    // Έλεγχος αν έχει ήδη γίνει το onboarding
    if (localStorage.getItem("ss_onboarding_done") === "true") {
      completeOnboarding();
    } else {
      if (onboarding) onboarding.style.display = "flex";
    }
    
    // --- 4. Tab Navigation ---
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");
        window.showScreen(target);
      });
    });

    // --- 5. Quiz Launchers (Σύνδεση με το quiz.js) ---
    window.launchQuiz = (badgeId) => {
      const lang = document.getElementById("lang-select")?.value || 'el';
      window.showScreen("quiz");
      
      setTimeout(() => {
        if (window.QuizEngine) {
          window.QuizEngine.start(lang, badgeId);
        } else {
          console.error("QuizEngine not found!");
        }
      }, 100);
    };

    // Event Listeners για τα κουμπιά των Quizzes
    document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
    document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));
  };

  // Safe Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
