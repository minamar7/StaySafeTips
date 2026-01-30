/**
 * Stay Safe Premium - Final Production app.js
 * The core engine of the Stay Safe experience.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. SELECTORS & STATE
  ---------------------------------------------------------- */
  const langSelect = document.getElementById("lang-select");
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");
  
  // Global State for current session
  const State = {
    isPremium: localStorage.getItem("ss_premium") === "true",
    lang: localStorage.getItem("ss_lang") || "en",
    badges: JSON.parse(localStorage.getItem("ss_badges") || "[]")
  };

  /* ---------------------------------------------------------
     2. STORAGE & DATA ENGINE
  ---------------------------------------------------------- */
  const Storage = {
    save(key, val) { localStorage.setItem(`ss_${key}`, JSON.stringify(val)); },
    get(key) { 
        const data = localStorage.getItem(`ss_${key}`);
        try { return data ? JSON.parse(data) : null; } catch(e) { return data; }
    },
    unlockBadge(badgeId) {
      if (!State.badges.includes(badgeId)) {
        State.badges.push(badgeId);
        localStorage.setItem("ss_badges", JSON.stringify(State.badges));
        UI.syncBadges();
      }
    }
  };

  /* ---------------------------------------------------------
     3. UI & ANIMATION ENGINE
  ---------------------------------------------------------- */
  const UI = {
    showLoading(duration = 600) {
      const loader = document.getElementById("loading-overlay");
      if (loader) {
        loader.classList.remove("hidden");
        setTimeout(() => loader.classList.add("hidden"), duration);
      }
    },

    haptic(type = 10) {
      if (window.navigator.vibrate) window.navigator.vibrate(type);
    },

    syncBadges() {
      const unlocked = State.badges;
      const pill = document.getElementById("badges-pill");
      if (pill) pill.textContent = `${unlocked.length} / 12 unlocked`;

      unlocked.forEach(id => {
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
        if (!status) console.warn("Stay Safe: Running in Offline Mode");
    }
  };

  /* ---------------------------------------------------------
     4. NAVIGATION & TABS
  ---------------------------------------------------------- */
  function handleNavigation() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        UI.haptic(15);
        const target = tab.getAttribute("data-target");

        // UI Updates
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        screens.forEach((s) => {
          s.classList.toggle("active", s.id === `screen-${target}`);
        });

        // Specialized Logic per Tab
        if (target === "premium") renderPremiumHub();
        if (target === "badges") UI.syncBadges();
        
        // Auto-scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ---------------------------------------------------------
     5. PREMIUM HUB LOGIC
  ---------------------------------------------------------- */
  const premiumFeatures = [
    { id: "emergency", label: "🚨 Emergency Hub", page: "emergency.html" },
    { id: "checkup", label: "🛡️ Security Checkup", page: "checkup.html" },
    { id: "passgen", label: "🔑 SafePass Pro", page: "password-generator.html" },
    { id: "alerts", label: "🛑 Live Scam Alerts", page: "scam-alerts.html" },
    { id: "offline", label: "🌐 Offline Survival", page: "offline.html" }
  ];

  function renderPremiumHub() {
    const list = document.getElementById("premium-list");
    if (!list) return;

    list.innerHTML = premiumFeatures.map(f => `
      <div class="premium-card ${!State.isPremium ? 'locked-feature' : ''}" 
           onclick="handleFeatureAccess('${f.page}')">
        <div class="card-content">
          <h3>${f.label}</h3>
          <p>Advanced protection module</p>
        </div>
        <div class="card-action">
          ${!State.isPremium ? '🔒' : '➔'}
        </div>
      </div>
    `).join("");
  }

  window.handleFeatureAccess = (page) => {
    UI.haptic(20);
    if (!State.isPremium) {
      window.location.href = "premium-paywall.html";
    } else {
      UI.showLoading(400);
      setTimeout(() => window.location.href = page, 400);
    }
  };

  /* ---------------------------------------------------------
     6. EVENTS & INITIALIZATION
  ---------------------------------------------------------- */
  
  // Language Change
  langSelect?.addEventListener("change", (e) => {
    const lang = e.target.value;
    State.lang = lang;
    localStorage.setItem("ss_lang", lang);
    if (window.I18N) window.I18N.apply(lang);
    UI.haptic(5);
  });

  // Quiz Completion Bridge
  window.addEventListener("quizCompleted", (e) => {
    const { score, total, badgeId } = e.detail;
    const percent = (score / total) * 100;

    if (percent >= 80 && badgeId) {
      Storage.unlockBadge(badgeId);
      UI.haptic([50, 30, 50]); // Victory vibration
    }
  });

  // Connectivity Listeners
  window.addEventListener("online", UI.updateConnectionStatus);
  window.addEventListener("offline", UI.updateConnectionStatus);

  // Initialize App
  function init() {
    // 1. Language
    if (window.I18N) window.I18N.apply(State.lang);
    if (langSelect) langSelect.value = State.lang;

    // 2. Navigation
    handleNavigation();

    // 3. Sync UI
    UI.syncBadges();
    UI.updateConnectionStatus();

    // 4. Onboarding Gate
    if (!localStorage.getItem("ss_onboarding_done")) {
        document.getElementById("onboarding")?.classList.remove("hidden");
    }

    console.log("Stay Safe Premium: Systems Nominal");
  }

  /* ---------------------------------------------------------
     7. SERVICE WORKER REGISTRATION
  ---------------------------------------------------------- */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("SW: Protection Active"))
      .catch(err => console.error("SW: Shield Failure", err));
  }

  init();
});
