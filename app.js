/**
 * Stay Safe Elite - Final Production app.js
 * The core engine of the Stay Safe experience.
 */

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
  
  // Global State
  const State = {
    isPremium: localStorage.getItem("ss_premium") === "true",
    lang: localStorage.getItem("ss_lang") || "el",
    badges: JSON.parse(localStorage.getItem("ss_badges") || "[]")
  };

  /* ---------------------------------------------------------
     2. UI & ANIMATION ENGINE
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
        if (el) {
            el.classList.remove("locked");
            el.classList.add("unlocked");
        }
      });
    },

    updateConnectionStatus() {
        const status = navigator.onLine;
        document.body.classList.toggle("is-offline", !status);
    }
  };

  /* ---------------------------------------------------------
     3. NAVIGATION SYSTEM
  ---------------------------------------------------------- */
  function handleNavigation() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        UI.haptic(10);
        const target = tab.getAttribute("data-target");

        // Ενημέρωση Tabs
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Ενημέρωση Οθονών
        screens.forEach((s) => {
          s.classList.toggle("active", s.id === `screen-${target}`);
        });

        if (target === "premium") renderPremiumHub();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ---------------------------------------------------------
     4. ONBOARDING & INITIALIZATION
  ---------------------------------------------------------- */
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      UI.haptic(40);
      onboarding.classList.add("hidden");
      appShell.classList.remove("hidden");
      localStorage.setItem("ss_onboarding_done", "true");
    });
  }

  function initApp() {
    // Έλεγχος αν το onboarding έχει ήδη ολοκληρωθεί
    if (localStorage.getItem("ss_onboarding_done") === "true") {
      onboarding?.classList.add("hidden");
      appShell?.classList.remove("hidden");
    }

    // Φόρτωση Γλώσσας
    if (window.I18N) window.I18N.apply(State.lang);
    if (langSelect) langSelect.value = State.lang;

    handleNavigation();
    UI.syncBadges();
    UI.updateConnectionStatus();
    
    console.log("🛡️ Stay Safe Elite: Systems Online");
  }

  /* ---------------------------------------------------------
     5. QUIZ ENGINE BRIDGE
  ---------------------------------------------------------- */
  const launchQuiz = (badgeId) => {
    UI.showLoading(500);
    // Μεταφορά στο tab του quiz
    const quizTab = document.querySelector('[data-target="quiz"]');
    if (quizTab) quizTab.click();

    // Εκκίνηση QuizEngine (από το quiz.js)
    if (window.QuizEngine) {
      window.QuizEngine.start(State.lang, { badgeId });
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-digital"));

  // Ακρόαση για ολοκλήρωση Quiz
  window.addEventListener("quizCompleted", (e) => {
    const { score, total, badgeId } = e.detail;
    const percent = (score / total) * 100;

    if (percent >= 80 && badgeId) {
      if (!State.badges.includes(badgeId)) {
        State.badges.push(badgeId);
        localStorage.setItem("ss_badges", JSON.stringify(State.badges));
        UI.syncBadges();
      }
    }
  });

  /* ---------------------------------------------------------
     6. PREMIUM HUB LOGIC
  ---------------------------------------------------------- */
  const premiumFeatures = [
    { id: "emergency", label: "🚨 Emergency Hub", page: "emergency.html" },
    { id: "checkup", label: "🛡️ Security Checkup", page: "checkup.html" },
    { id: "passgen", label: "🔑 SafePass Pro", page: "password.html" }
  ];

  function renderPremiumHub() {
    const list = document.getElementById("premium-list");
    if (!list) return;

    list.innerHTML = premiumFeatures.map(f => `
      <div class="premium-card ${!State.isPremium ? 'locked-feature' : ''}" 
           onclick="handleFeatureAccess('${f.page}')">
        <div class="card-content">
          <h3>${f.label}</h3>
          <p>Elite Protection Module</p>
        </div>
        <div class="card-action">${!State.isPremium ? '🔒' : '➔'}</div>
      </div>
    `).join("");
  }

  window.handleFeatureAccess = (page) => {
    UI.haptic(20);
    if (!State.isPremium) {
      document.getElementById("upgrade-banner")?.classList.remove("hidden");
      alert("Απαιτείται Premium συνδρομή για πρόσβαση.");
    } else {
      window.location.href = page;
    }
  };

  /* ---------------------------------------------------------
     7. SERVICE WORKER REGISTRATION
  ---------------------------------------------------------- */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("SW: Protection Active"))
      .catch(err => console.error("SW: Shield Failure", err));
  }

  // Έναρξη!
  initApp();
});
