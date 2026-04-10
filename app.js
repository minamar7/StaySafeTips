/**
 * Stay Safe Elite – Core App Controller
 */

(() => {
  "use strict";

  const log = (...args) => console.log("🛡️", ...args);

  /* ============================
     STATE
  ============================ */
  const state = {
    currentScreen: "home",
    onboardingDone: localStorage.getItem("ss_onboarding_done") === "true",
    testerTapCount: 0,
    testerTimer: null
  };

  /* ============================
     DOM CACHE
  ============================ */
  const DOM = {
    onboarding: document.getElementById("onboarding"),
    appShell: document.querySelector(".app-shell"),
    startBtn: document.getElementById("onboarding-start"),
    screens: document.querySelectorAll(".app-screen"),
    tabs: document.querySelectorAll(".nav-tab"),
    resultOverlay: document.getElementById("quiz-result"),
    resultContinue: document.getElementById("quiz-result-continue"),
    langSelect: document.getElementById("lang-select"),
    // Νέα στοιχεία για κλείδωμα
    upgradeBtn: document.getElementById("upgrade-btn") 
  };

  /* ============================
     PREMIUM ENGINE
  ============================ */
  const isPremium = () => {
    if (window.AndroidBilling && typeof window.AndroidBilling.isPremium === "function") {
      return window.AndroidBilling.isPremium() === true;
    }
    return localStorage.getItem("isPremiumUser") === "true";
  };

  // Συνάρτηση που καλείται όταν θέλουμε να δείξουμε το paywall
  const openPaywall = () => {
    log("Redirecting to Paywall...");
    if (window.AndroidBilling && typeof window.AndroidBilling.launchBilling === "function") {
       window.AndroidBilling.launchBilling();
    } else {
       // Αν δεν είσαι σε κινητό, άνοιξε τη σελίδα paywall
       window.location.href = "premium.html"; 
    }
  };

  /* ============================
     UTILITIES
  ============================ */
  const haptic = (ms = 10) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  const hideResultOverlay = () => {
    if (!DOM.resultOverlay) return;
    DOM.resultOverlay.classList.add("hidden");
    DOM.resultOverlay.style.display = "none";
  };

  /* ============================
     NAVIGATION
  ============================ */
  const showScreen = (target) => {
    if (!target || state.currentScreen === target) return;

    // ➤ ΕΛΕΓΧΟΣ PREMIUM ΓΙΑ ΣΥΓΚΕΚΡΙΜΕΝΕΣ ΟΘΟΝΕΣ
    const premiumScreens = ["dojo", "ai-threat", "checkup", "scams"];
    if (premiumScreens.includes(target) && !isPremium()) {
      openPaywall();
      return;
    }

    log("Navigate →", target);
    state.currentScreen = target;

    DOM.screens.forEach(screen => {
      const isActive = screen.id === `screen-${target}`;
      screen.classList.toggle("active", isActive);
      screen.style.display = isActive ? "block" : "none";
    });

    DOM.tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.target === target);
    });

    if (target !== "quiz") hideResultOverlay();
  };

  window.showScreen = showScreen;

  /* ============================
     TESTER UNLOCK (3 TAPS)
  ============================ */
  const handleTesterUnlock = () => {
    state.testerTapCount++;
    haptic(5);

    clearTimeout(state.testerTimer);
    state.testerTimer = setTimeout(() => { state.testerTapCount = 0; }, 1000);

    if (state.testerTapCount === 3) {
      localStorage.setItem("isPremiumUser", "true");
      haptic(50);
      alert("✅ Reviewer Mode: Premium Unlocked!");
      location.reload(); // Ανανέωση για να δει τις αλλαγές
    }
  };

  /* ============================
     QUIZ BRIDGE
  ============================ */
  window.launchQuiz = (badgeId) => {
    const lang = DOM.langSelect?.value || "el";
    haptic(12);
    showScreen("quiz");

    requestAnimationFrame(() => {
      if (window.QuizEngine?.start) {
        window.QuizEngine.start(lang, badgeId);
      }
    });
  };

  /* ============================
     EVENT BINDINGS
  ============================ */
  const bindEvents = () => {
    DOM.startBtn?.addEventListener("click", completeOnboarding);

    DOM.resultContinue?.addEventListener("click", () => {
      haptic(10);
      hideResultOverlay();
      showScreen("home");
    });

    DOM.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        haptic(8);
        showScreen(tab.dataset.target);
      });
    });

    // ➤ REVIEWER UNLOCK ΣΤΟ UPGRADE BUTTON
    DOM.upgradeBtn?.addEventListener("click", handleTesterUnlock);

    // ➤ CLICK HANDLERS ΓΙΑ ΤΑ PREMIUM ΕΡΓΑΛΕΙΑ (DOJO κλπ)
    // Πρόσθεσε στο HTML σου τα αντίστοιχα IDs
    document.getElementById("btn-dojo")?.addEventListener("click", () => showScreen("dojo"));
    document.getElementById("btn-ai")?.addEventListener("click", () => showScreen("ai-threat"));
    document.getElementById("btn-checkup")?.addEventListener("click", () => showScreen("checkup"));
    document.getElementById("btn-scams")?.addEventListener("click", () => showScreen("scams"));

    document.getElementById("home-quiz-btn")
      ?.addEventListener("click", () => launchQuiz("badge-home"));

    document.getElementById("digital-quiz-btn")
      ?.addEventListener("click", () => launchQuiz("badge-digital"));
  };

  /* ============================
     BOOTSTRAP
  ============================ */
  const init = () => {
    log("Stay Safe Elite Initialized");
    bindEvents();

    if (state.onboardingDone) {
      DOM.onboarding?.classList.add("hidden");
      DOM.appShell?.classList.remove("hidden");
      DOM.appShell.style.display = "block";
      showScreen("home");
    } else {
      if (DOM.onboarding) DOM.onboarding.style.display = "flex";
    }
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();
