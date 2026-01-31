(function() {
  const initApp = () => {
    const onboarding = document.getElementById("onboarding");
    const appShell = document.querySelector(".app-shell");
    const startBtn = document.getElementById("onboarding-start");
    const screens = document.querySelectorAll(".app-screen");
    const tabs = document.querySelectorAll(".nav-tab");
    
    // Στοιχεία Αποτελέσματος
    const resultOverlay = document.getElementById("quiz-result");
    const resultContinueBtn = document.getElementById("quiz-result-continue");

    // 1. Σωστό κλείσιμο του Result Overlay
    if (resultContinueBtn) {
      resultContinueBtn.addEventListener("click", () => {
        if (resultOverlay) {
          resultOverlay.classList.add("hidden");
          resultOverlay.style.display = "none"; // Hard hide
        }
        window.showScreen("home"); // Επιστροφή στην αρχική
      });
    }

    // 2. Λειτουργία Εναλλαγής Οθονών
    window.showScreen = (targetId) => {
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
    };

    // 3. Onboarding Logic
    const completeOnboarding = () => {
      if (onboarding) onboarding.style.display = "none";
      if (appShell) {
        appShell.classList.remove("hidden");
        appShell.style.display = "block";
      }
      localStorage.setItem("ss_onboarding_done", "true");
      window.showScreen("home");
    };

    if (startBtn) startBtn.onclick = completeOnboarding;

    if (localStorage.getItem("ss_onboarding_done") === "true") {
      completeOnboarding();
    }
    
    // 4. Tab Clicks
    tabs.forEach(tab => {
      tab.onclick = () => window.showScreen(tab.getAttribute("data-target"));
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
