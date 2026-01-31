document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");

  // --- 1. Λειτουργία Εναλλαγής Οθονών ---
  function showScreen(targetId) {
    screens.forEach(s => {
      s.classList.remove("active");
      if (s.id === `screen-${targetId}`) s.classList.add("active");
    });
    tabs.forEach(t => {
      t.classList.toggle("active", t.getAttribute("data-target") === targetId);
    });
    window.scrollTo(0, 0);
  }

  // --- 2. Onboarding Logic ---
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      onboarding.classList.add("hidden"); // Χρήση class για συνέπεια
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
      showScreen("home");
    });
  }

  if (localStorage.getItem("ss_onboarding_done") === "true") {
    if (onboarding) onboarding.classList.add("hidden");
    if (appShell) appShell.classList.remove("hidden");
    showScreen("home");
  }

  // --- 3. Navigation Logic ---
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");
      showScreen(target);
    });
  });

  // --- 4. Quiz Launcher ---
  window.launchQuiz = (badgeId) => {
    showScreen("quiz");
    if (window.QuizEngine) {
      window.QuizEngine.start('el', badgeId);
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));
});
