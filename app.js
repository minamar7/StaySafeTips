document.addEventListener("DOMContentLoaded", () => {
  // --- Elements ---
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  const onboarding = document.getElementById("onboarding");
  const appShell = document.querySelector(".app-shell");
  const startBtn = document.getElementById("onboarding-start");
  const langSelect = document.getElementById("lang-select");

  // --- 1. Λειτουργία Εναλλαγής Οθονών (Robust Version) ---
  function showScreen(targetId) {
    console.log("Switching to screen:", targetId);
    
    // Κρύβουμε όλες τις οθόνες
    screens.forEach(s => {
      s.classList.remove("active");
      s.style.display = "none"; 
    });

    // Εμφάνιση της στοχευμένης οθόνης
    const targetScreen = document.getElementById(`screen-${targetId}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
      targetScreen.style.display = "block";
    } else {
      console.warn(`Screen with ID screen-${targetId} not found!`);
    }
    
    // Ενημέρωση Tabs
    tabs.forEach(t => {
      if (t.getAttribute("data-target") === targetId) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });
    
    window.scrollTo(0, 0);
  }

  // --- 2. Onboarding Logic ---
  if (startBtn && onboarding && appShell) {
    startBtn.addEventListener("click", () => {
      onboarding.classList.add("hidden");
      onboarding.style.display = "none"; // Hard hide
      appShell.classList.remove("hidden");
      appShell.style.display = "flex";   // Force flex
      localStorage.setItem("ss_onboarding_done", "true");
      showScreen("home");
    });
  }

  // Έλεγχος αν είναι ήδη έτοιμο
  if (localStorage.getItem("ss_onboarding_done") === "true") {
    if (onboarding) onboarding.style.display = "none";
    if (appShell) {
        appShell.classList.remove("hidden");
        appShell.style.display = "flex";
    }
    showScreen("home");
  }

  // --- 3. Navigation Logic (Tabs) ---
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");
      if (target) {
        showScreen(target);
        // Αν είναι το tab του quiz, τρέξε τη μηχανή
        if (target === "quiz") {
          window.launchQuiz("quiz"); 
        }
      }
    });
  });

  // --- 4. Quiz Launcher ---
  window.launchQuiz = (badgeId) => {
    const currentLang = langSelect ? langSelect.value : 'el';
    showScreen("quiz");

    // Μικρή καθυστέρηση για να προλάβει το DOM να δείξει την οθόνη
    setTimeout(() => {
      if (window.QuizEngine && typeof window.QuizEngine.start === "function") {
        window.QuizEngine.start(currentLang, badgeId);
      } else {
        console.error("⚠️ QuizEngine is missing or start function not found!");
      }
    }, 50);
  };

  // --- 5. Event Listeners για κουμπιά εντός οθονών ---
  const bindQuizBtn = (id, badge) => {
    document.getElementById(id)?.addEventListener("click", () => window.launchQuiz(badge));
  };

  bindQuizBtn("home-quiz-btn", "badge-home");
  bindQuizBtn("digital-quiz-btn", "badge-digital");
  bindQuizBtn("scam-quiz-btn", "badge-scam");
  bindQuizBtn("emergency-quiz-btn", "badge-emergency");

  // --- 6. Elite Hub Content ---
  const renderEliteHub = () => {
    const premiumList = document.getElementById("premium-list");
    if (!premiumList) return;

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
  };

  renderEliteHub();

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
