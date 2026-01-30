/**
 * Stay Safe Premium - Final Production app.js
 */

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang-select");
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");

  /* ---------------------------------------------------------
     STORAGE ENGINE
  ---------------------------------------------------------- */
  const Storage = {
    saveLanguage(lang) { localStorage.setItem("ss_lang", lang); },
    loadLanguage() { return localStorage.getItem("ss_lang") || "en"; },
    
    saveBadge(badgeId) {
      const badges = JSON.parse(localStorage.getItem("ss_badges") || "[]");
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem("ss_badges", JSON.stringify(badges));
      }
    },
    loadBadges() { return JSON.parse(localStorage.getItem("ss_badges") || "[]"); },
    
    saveQuizProgress(score, total) {
      localStorage.setItem("ss_quiz_score", score);
      localStorage.setItem("ss_quiz_total", total);
    },
    loadQuizProgress() {
      return {
        score: Number(localStorage.getItem("ss_quiz_score") || 0),
        total: Number(localStorage.getItem("ss_quiz_total") || 0)
      };
    }
  };

  /* ---------------------------------------------------------
     BADGE SYSTEM
  ---------------------------------------------------------- */
  const ALL_BADGES = ["badge-home", "badge-digital", "badge-scam", "badge-emergency"];

  function updateBadgeProgress() {
    const unlocked = Storage.loadBadges();
    const pill = document.getElementById("badges-pill");
    if (pill) pill.textContent = `${unlocked.length} / ${ALL_BADGES.length} unlocked`;
  }

  function unlockBadge(badgeId) {
    const badgeElement = document.getElementById(badgeId);
    if (!badgeElement) return;

    badgeElement.classList.remove("locked");
    badgeElement.classList.add("unlocked");
    
    Storage.saveBadge(badgeId);
    updateBadgeProgress();
  }

  /* ---------------------------------------------------------
     LANGUAGE ENGINE
  ---------------------------------------------------------- */
  function initializeLanguage() {
    const saved = Storage.loadLanguage();
    langSelect.value = saved;
    if (window.I18N) window.I18N.apply(saved);
  }

  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    Storage.saveLanguage(lang);
    if (window.I18N) window.I18N.apply(lang);
  });

  /* ---------------------------------------------------------
     NAVIGATION (TABS)
  ---------------------------------------------------------- */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-target");
      screens.forEach((s) => {
        s.classList.toggle("active", s.id === `screen-${target}`);
      });

      if (target === "premium") renderPremiumList();
      if (window.Analytics) Analytics.track(`tab_open_${target}`);
    });
  });

  /* ---------------------------------------------------------
     QUIZ LOGIC & EVENTS
  ---------------------------------------------------------- */
  window.addEventListener("quizCompleted", (e) => {
    const { score, total, badgeId } = e.detail;
    Storage.saveQuizProgress(score, total);
    
    const percent = Math.round((score / total) * 100);
    const resultScoreEl = document.getElementById("quiz-result-score");
    if (resultScoreEl) resultScoreEl.textContent = `Score: ${percent}%`;

    if (percent >= 80 && badgeId) {
      unlockBadge(badgeId);
      document.getElementById("quiz-result-badge")?.classList.remove("hidden");
    }

    document.getElementById("quiz-result")?.classList.remove("hidden");
  });

  document.getElementById("quiz-result-continue")?.addEventListener("click", () => {
    document.getElementById("quiz-result").classList.add("hidden");
  });

  /* ---------------------------------------------------------
     ONBOARDING & LOADING
  ---------------------------------------------------------- */
  const onboarding = document.getElementById("onboarding");
  if (!localStorage.getItem("ss_onboarding_done")) {
    onboarding?.classList.remove("hidden");
  }

  document.getElementById("onboarding-start")?.addEventListener("click", () => {
    localStorage.setItem("ss_onboarding_done", "true");
    onboarding?.classList.add("hidden");
    document.querySelector(".app-shell").classList.remove("hidden");
  });

  function showLoading(duration = 500) {
    const loader = document.getElementById("loading-overlay");
    loader?.classList.remove("hidden");
    setTimeout(() => loader?.classList.add("hidden"), duration);
  }

  /* ---------------------------------------------------------
     UI BUTTONS (QUIZ LAUNCH)
  ---------------------------------------------------------- */
  const launchQuiz = (badgeId) => {
    showLoading(600);
    document.querySelector('[data-target="quiz"]').click();
    if (window.QuizEngine) {
      QuizEngine.start(langSelect.value, { badgeId });
    }
  };

  document.getElementById("home-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-home"));
  document.getElementById("digital-quiz-btn")?.addEventListener("click", () => launchQuiz("badge-digital"));

  /* ---------------------------------------------------------
     PREMIUM HUB
  ---------------------------------------------------------- */
  const premiumFeatures = [
    { id: "emergency", label: "🚨 Emergency Button", page: "emergency.html" },
    { id: "checkup", label: "🔐 Security Checkup", page: "checkup.html" },
    { id: "offline", label: "📱 Offline Mode", page: "offline.html" }
  ];

  function renderPremiumList() {
    const isPremium = localStorage.getItem("ss_premium") === "true";
    const list = document.getElementById("premium-list");
    if (!list) return;

    list.innerHTML = premiumFeatures.map(f => `
      <li class="premium-item" onclick="handleFeatureClick('${f.page}')">
        <span>${f.label}</span>
        ${!isPremium ? '<span class="lock">🔒</span>' : '<span>➔</span>'}
      </li>
    `).join("");
  }

  window.handleFeatureClick = (page) => {
    const isPremium = localStorage.getItem("ss_premium") === "true";
    if (!isPremium) {
      document.getElementById("paywall")?.classList.remove("hidden");
    } else {
      window.location.href = page;
    }
  };

  /* ---------------------------------------------------------
     OFFLINE & SERVICE WORKER
  ---------------------------------------------------------- */
  window.addEventListener("offline", () => {
    document.body.classList.add("is-offline");
    console.log("App is offline");
  });

  window.addEventListener("online", () => {
    document.body.classList.remove("is-offline");
    console.log("App is online");
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => console.log("SW Active"))
      .catch(err => console.error("SW Error:", err));
  }

  // Final Init
  initializeLanguage();
  Storage.loadBadges().forEach(id => unlockBadge(id));
  updateBadgeProgress();
});
