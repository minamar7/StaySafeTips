document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. SELECTORS & STATE
  ---------------------------------------------------------- */
  const langSelect = document.getElementById("lang-select");
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");
  
  const State = {
    isPremium: localStorage.getItem("ss_premium") === "true",
    lang: localStorage.getItem("ss_lang") || "el",
    badges: JSON.parse(localStorage.getItem("ss_badges") || "[]")
  };

  /* ---------------------------------------------------------
     2. UI ENGINE
  ---------------------------------------------------------- */
  const UI = {
    showLoading(duration = 600) {
      const loader = document.getElementById("loading-overlay");
      if (loader) {
        loader.classList.remove("hidden");
        setTimeout(() => loader.classList.add("hidden"), duration);
      }
    },
    haptic(type = 15) {
      if (window.navigator.vibrate) window.navigator.vibrate(type);
    },
    syncBadges() {
      State.badges.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.remove("locked"); el.classList.add("unlocked"); }
      });
    }
  };

  /* ---------------------------------------------------------
     3. NAVIGATION (Tabs)
  ---------------------------------------------------------- */
  function handleNavigation() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");
        
        // Update UI Tabs
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Update Screens
        screens.forEach((s) => {
          s.classList.remove("active");
          if (s.id === `screen-${target}`) s.classList.add("active");
        });

        UI.haptic(10);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ---------------------------------------------------------
     4. QUIZ BRIDGE
  ---------------------------------------------------------- */
  window.launchQuiz = (badgeId) => {
    UI.showLoading(500);
    // Προσομοίωση κλικ στο tab του Quiz
    document.querySelector('[data-target="quiz"]')?.click();

    if (window.QuizEngine) {
      window.QuizEngine.start(State.lang, { badgeId });
    } else {
      console.error("QuizEngine not found!");
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));

  /* ---------------------------------------------------------
     5. ONBOARDING & INIT
  ---------------------------------------------------------- */
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      onboarding.classList.add("hidden");
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
    });
  }

  function init() {
    // Check if onboarding done
    if (localStorage.getItem("ss_onboarding_done") === "true") {
      onboarding?.classList.add("hidden");
      appShell?.classList.remove("hidden");
    }

    handleNavigation();
    UI.syncBadges();
    
    if (window.I18N) window.I18N.apply(State.lang);
    console.log("Stay Safe Elite: Systems Nominal");
  }

  init();
});
