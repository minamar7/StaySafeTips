/**
 * Stay Safe Elite – Core App Controller
 * Navigation • Onboarding • Quiz Bridge • UX Enhancements
 */

(() => {
  "use strict";

  const log = (...args) => console.log("🛡️", ...args);

  /* ============================
     STATE
  ============================ */
  const state = {
    currentScreen: "home",
    onboardingDone: localStorage.getItem("ss_onboarding_done") === "true"
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
    langSelect: document.getElementById("lang-select")
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

    log("Navigate →", target);
    state.currentScreen = target;

    DOM.screens.forEach(screen => {
      const isActive = screen.id === `screen-${target}`;
      screen.classList.toggle("active", isActive);
      screen.style.display = isActive ? "block" : "none";
    });

    DOM.tabs.forEach(tab => {
      tab.classList.toggle(
        "active",
        tab.dataset.target === target
      );
    });

    if (target !== "quiz") hideResultOverlay();
  };

  window.showScreen = showScreen; // exposed intentionally

  /* ============================
     ONBOARDING
  ============================ */
  const completeOnboarding = () => {
    log("Onboarding completed");
    haptic(15);

    DOM.onboarding?.classList.add("hidden");
    DOM.appShell?.classList.remove("hidden");
    DOM.appShell.style.display = "block";

    localStorage.setItem("ss_onboarding_done", "true");
    showScreen("home");
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
      } else {
        console.error("❌ QuizEngine missing");
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
      DOM.onboarding.style.display = "flex";
    }
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();