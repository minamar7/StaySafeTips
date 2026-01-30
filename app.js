document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");

  // --- 1. Onboarding Logic ---
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      onboarding.style.display = "none";
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
    });
  }

  if (localStorage.getItem("ss_onboarding_done") === "true") {
    if (onboarding) onboarding.style.display = "none";
    if (appShell) appShell.classList.remove("hidden");
  }

  // --- 2. Navigation Logic ---
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");
      
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      screens.forEach(s => {
        s.classList.toggle("active", s.id === `screen-${target}`);
      });
    });
  });

  // --- 3. Quiz Launcher ---
  window.launchQuiz = (badgeId) => {
    // Ενεργοποιούμε το tab του quiz
    const quizTab = document.querySelector('[data-target="quiz"]');
    if (quizTab) quizTab.click();

    if (window.QuizEngine) {
      window.QuizEngine.start('el', badgeId);
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-digital"));
});
