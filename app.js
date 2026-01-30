document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");

  const State = {
    lang: localStorage.getItem("ss_lang") || "el",
    badges: JSON.parse(localStorage.getItem("ss_badges") || "[]")
  };

  // --- NAVIGATION ---
  function switchTab(target) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.target === target));
    screens.forEach(s => s.classList.toggle("active", s.id === `screen-${target}`));
    window.scrollTo(0, 0);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.target));
  });

  // --- ONBOARDING ---
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      onboarding.classList.add("hidden");
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
    });
  }

  // --- QUIZ LAUNCHER ---
  window.launchQuiz = (badgeId) => {
    switchTab("quiz"); // Αλλάζει την οθόνη
    if (window.QuizEngine && typeof window.QuizEngine.start === 'function') {
      setTimeout(() => {
        window.QuizEngine.start(State.lang, { badgeId });
      }, 300);
    } else {
      console.error("QuizEngine not ready");
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));

  // Initial Check
  if (localStorage.getItem("ss_onboarding_done") === "true") {
    onboarding?.classList.add("hidden");
    appShell?.classList.remove("hidden");
  }
});
