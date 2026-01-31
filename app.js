document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");
  const langSelect = document.getElementById("lang-select");

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
      onboarding.classList.add("hidden");
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
      showScreen("home");
    });
  }

  // Έλεγχος αν ο χρήστης έχει ολοκληρώσει το onboarding στο παρελθόν
  if (localStorage.getItem("ss_onboarding_done") === "true") {
    if (onboarding) onboarding.classList.add("hidden");
    if (appShell) appShell.classList.remove("hidden");
    showScreen("home");
  }

  // --- 3. Navigation Logic (Tabs) ---
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");
      showScreen(target);
    });
  });

  // --- 4. Quiz Launcher (Δυναμικό) ---
  window.launchQuiz = (badgeId) => {
    // 1. Εντοπισμός επιλεγμένης γλώσσας
    const currentLang = langSelect ? langSelect.value : 'el';
    
    // 2. Μεταφορά στην οθόνη του Quiz
    showScreen("quiz");

    // 3. Εκκίνηση της μηχανής του Quiz
    if (window.QuizEngine) {
      window.QuizEngine.start(currentLang, badgeId);
    } else {
      console.error("QuizEngine not found! Make sure quiz.js is loaded.");
    }
  };

  // --- 5. Event Listeners για όλα τα κουμπιά Quiz ---
  // Home Quiz
  document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
  
  // Digital Quiz
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));
  
  // Scam Quiz (Αν υπάρχει κουμπί στο HTML)
  document.getElementById("scam-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-scam"));
  
  // Emergency Quiz (Αν υπάρχει κουμπί στο HTML)
  document.getElementById("emergency-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-emergency"));

  // Φόρτωση ήδη κερδισμένων badges από το LocalStorage
  const savedBadges = JSON.parse(localStorage.getItem("ss_badges") || "[]");
  savedBadges.forEach(badgeId => {
    const bEl = document.getElementById(badgeId);
    if (bEl) {
      bEl.classList.remove("locked");
      bEl.classList.add("unlocked");
    }
  });
});
