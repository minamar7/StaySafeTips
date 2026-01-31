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

      // ΔΙΟΡΘΩΣΗ: Αν πατηθεί το κεντρικό Tab Quiz, ξεκινάει το γενικό QuizEngine
      if (target === "quiz") {
        window.launchQuiz("quiz"); 
      }
    });
  });

  // --- 4. Quiz Launcher (Δυναμικό) ---
  window.launchQuiz = (badgeId) => {
    const currentLang = langSelect ? langSelect.value : 'el';
    showScreen("quiz");

    if (window.QuizEngine) {
      window.QuizEngine.start(currentLang, badgeId);
    } else {
      console.error("⚠️ QuizEngine not found!");
    }
  };

  // --- 5. Event Listeners για Κουμπιά Quiz ---
  document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));
  document.getElementById("scam-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-scam"));
  document.getElementById("emergency-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-emergency"));

  // --- 6. Elite Hub Content (Δυναμική Φόρτωση) ---
  const premiumList = document.getElementById("premium-list");
  if (premiumList) {
    const protocols = [
      { id: "P-01", title: "Physical Breach Defense", desc: "Οδηγίες θωράκισης εισόδων σε κρίσιμες καταστάσεις." },
      { id: "P-02", title: "Dark Web Scanner", desc: "Εργαλεία ελέγχου διαρροής των κωδικών σας." },
      { id: "P-03", title: "Secure Travel Protocol", desc: "Προστασία δεδομένων και ασφάλεια σε ταξίδια εξωτερικού." }
    ];

    premiumList.innerHTML = protocols.map(p => `
      <div class="daily-card" style="border-left: 4px solid #f59e0b; margin-bottom: 12px; padding: 15px; background: rgba(30, 41, 59, 0.5); border-radius: 10px;">
        <span style="color: #f59e0b; font-size: 0.7rem; font-weight: bold;">${p.id}</span>
        <h3 style="margin: 5px 0; color: #fff;">${p.title}</h3>
        <p style="font-size: 0.85rem; color: #94a3b8; margin: 0;">${p.desc}</p>
      </div>
    `).join('');
  }

  // --- 7. Badges Persistence ---
  const savedBadges = JSON.parse(localStorage.getItem("ss_badges") || "[]");
  savedBadges.forEach(badgeId => {
    const bEl = document.getElementById(badgeId);
    if (bEl) {
      bEl.classList.remove("locked");
      bEl.classList.add("unlocked");
    }
  });
});
