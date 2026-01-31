// Χρησιμοποιούμε μια αυτοεκτελούμενη συνάρτηση για αποφυγή συγκρούσεων
(function() {
  const initApp = () => {
    console.log("🛡️ Stay Safe Elite: Initializing...");

    // Elements με έλεγχο ύπαρξης
    const onboarding = document.getElementById("onboarding");
    const appShell = document.querySelector(".app-shell");
    const startBtn = document.getElementById("onboarding-start");
    const screens = document.querySelectorAll(".app-screen");
    const tabs = document.querySelectorAll(".nav-tab");

    // 1. Καθολική λειτουργία εμφάνισης οθόνης
    window.showScreen = (targetId) => {
      console.log(`🚀 Navigating to: ${targetId}`);
      
      let targetFound = false;
      screens.forEach(s => {
        if (s.id === `screen-${targetId}`) {
          s.style.display = "block";
          s.classList.add("active");
          targetFound = true;
        } else {
          s.style.display = "none";
          s.classList.remove("active");
        }
      });

      if (!targetFound) console.error(`❌ Screen screen-${targetId} not found!`);

      tabs.forEach(t => {
        t.classList.toggle("active", t.getAttribute("data-target") === targetId);
      });
      window.scrollTo(0, 0);
    };

    // 2. Onboarding Logic
    const completeOnboarding = () => {
      if (onboarding) onboarding.style.display = "none";
      if (appShell) {
        appShell.classList.remove("hidden");
        appShell.style.display = "flex";
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

    // 3. Tab Navigation
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");
        window.showScreen(target);
        if (target === "quiz") window.launchQuiz("quiz");
      });
    });

    // 4. Quiz Launcher
    window.launchQuiz = (badgeId) => {
      const lang = document.getElementById("lang-select")?.value || 'el';
      window.showScreen("quiz");
      
      setTimeout(() => {
        if (window.QuizEngine) {
          window.QuizEngine.start(lang, badgeId);
        } else {
          alert("Το QuizEngine δεν έχει φορτώσει ακόμα. Παρακαλώ ανανεώστε.");
        }
      }, 100);
    };

    // 5. Button Listeners
    const buttons = {
      "home-quiz-btn": "badge-home",
      "digital-quiz-btn": "badge-digital",
      "scam-quiz-btn": "badge-scam",
      "emergency-quiz-btn": "badge-emergency"
    };

    Object.entries(buttons).forEach(([id, badge]) => {
      document.getElementById(id)?.addEventListener("click", () => window.launchQuiz(badge));
    });

    // 6. Badges
    const saved = JSON.parse(localStorage.getItem("ss_badges") || "[]");
    saved.forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove("locked"); el.classList.add("unlocked"); }
    });
  };

  // Εκτέλεση
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
