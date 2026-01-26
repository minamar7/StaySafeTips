document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang-select");
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");

  /* ---------------------------------------------------------
     STORAGE ENGINE
  ---------------------------------------------------------- */

  const Storage = {
    saveLanguage(lang) {
      localStorage.setItem("ss_lang", lang);
    },
    loadLanguage() {
      return localStorage.getItem("ss_lang") || "en";
    },
    saveBadge(badgeId) {
      const badges = JSON.parse(localStorage.getItem("ss_badges") || "[]");
      if (!badges.includes(badgeId)) {
        badges.push(badgeId);
        localStorage.setItem("ss_badges", JSON.stringify(badges));
      }
    },
    loadBadges() {
      return JSON.parse(localStorage.getItem("ss_badges") || "[]");
    },
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
     BADGE META
  ---------------------------------------------------------- */

  const ALL_BADGES = [
    "badge-home",
    "badge-digital",
    "badge-scam",
    "badge-emergency",
    "badge-night",
    "badge-travel",
    "badge-family",
    "badge-crisis"
  ];

  function updateBadgeProgress() {
    const unlocked = Storage.loadBadges();
    const unlockedCount = unlocked.length;
    const total = ALL_BADGES.length;

    const pill = document.getElementById("badges-pill");
    const progress = document.getElementById("badges-progress");

    if (pill) {
      pill.textContent = `${unlockedCount} / ${total} badges unlocked`;
    }
    if (progress) {
      progress.textContent = `You’ve unlocked ${unlockedCount} of ${total} badges. Keep going.`;
    }
  }

  /* ---------------------------------------------------------
     LANGUAGE INIT
  ---------------------------------------------------------- */

  const supportedLangs = [
    "en","el","it","es","fr","de","pt","nl","sv","no","da","fi","pl","ro","tr",
    "zh","ar","hi"
  ];

  function detectBrowserLanguage() {
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    return supportedLangs.includes(browserLang) ? browserLang : "en";
  }

  function initializeLanguage() {
    const saved = Storage.loadLanguage();
    if (saved) {
      langSelect.value = saved;
      window.I18N.apply(saved);
      return;
    }
    const detected = detectBrowserLanguage();
    langSelect.value = detected;
    window.I18N.apply(detected);
    Storage.saveLanguage(detected);
  }

  initializeLanguage();

  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    Storage.saveLanguage(lang);
    window.I18N.apply(lang);
  });

  /* ---------------------------------------------------------
     TABS
  ---------------------------------------------------------- */

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-target");
      screens.forEach((s) => {
        s.classList.toggle("active", s.id === `screen-${target}`);
      });

      if (target === "premium") {
        Analytics.track("premium_tab_open");
        renderPremiumList(); // 🔥 εδώ καλούμε το premium hub
      }
    });
  });

  /* ---------------------------------------------------------
     BADGE UNLOCK + MODAL
  ---------------------------------------------------------- */

  function showBadgeModal(badgeId) {
    const modal = document.getElementById("badge-modal");
    const name = document.getElementById("badge-modal-name");

    const dict = I18N.getDict(Storage.loadLanguage());
    const key = `t-badge-${badgeId.replace("badge-", "")}`;

    name.textContent = dict[key] || "Badge";

    modal.classList.remove("hidden");
  }

  document.getElementById("badge-modal-close").addEventListener("click", () => {
    document.getElementById("badge-modal").classList.add("hidden");
  });

  function unlockBadge(badgeId) {
    const badge = document.getElementById(badgeId);
    if (!badge) return;

    badge.classList.remove("locked");
    badge.classList.add("unlocked");

    badge.style.animation = "none";
    void badge.offsetWidth;
    badge.style.animation = "";

    Storage.saveBadge(badgeId);
    updateBadgeProgress();
    showBadgeModal(badgeId);
  }

  Storage.loadBadges().forEach((id) => unlockBadge(id));
  updateBadgeProgress();

  /* ---------------------------------------------------------
     QUIZ PROGRESS LOAD
  ---------------------------------------------------------- */

  const qp = Storage.loadQuizProgress();
  if (qp.total > 0) {
    const percent = Math.round((qp.score / qp.total) * 100);
    const homeProg = document.getElementById("t-home-quiz-progress");
    if (homeProg) homeProg.textContent = percent + "%";
  }

  /* ---------------------------------------------------------
     QUIZ RESULT SCREEN
  ---------------------------------------------------------- */

  const quizResult = document.getElementById("quiz-result");
  const quizResultScore = document.getElementById("quiz-result-score");
  const quizResultBadge = document.getElementById("quiz-result-badge");
  const quizResultContinue = document.getElementById("quiz-result-continue");

  quizResultContinue.addEventListener("click", () => {
    quizResult.classList.add("hidden");
  });

  /* ---------------------------------------------------------
     QUIZ EVENTS
  ---------------------------------------------------------- */

  window.addEventListener("quizCompleted", (e) => {
    const { score, total, badgeId } = e.detail;

    Storage.saveQuizProgress(score, total);
    Analytics.track("quiz_completed", { score, total });

    const percent = Math.round((score / total) * 100);
    quizResultScore.textContent = `You scored ${percent}%`;

    if (percent >= 70 && badgeId) {
      quizResultBadge.classList.remove("hidden");
      unlockBadge(badgeId);
    } else {
      quizResultBadge.classList.add("hidden");
    }

    quizResult.classList.remove("hidden");
  });

  /* ---------------------------------------------------------
     LOADING OVERLAY
  ---------------------------------------------------------- */

  function showLoading() {
    document.getElementById("loading-overlay").classList.remove("hidden");
  }

  function hideLoading() {
    document.getElementById("loading-overlay").classList.add("hidden");
  }

  /* ---------------------------------------------------------
     ONBOARDING
  ---------------------------------------------------------- */

  const onboarding = document.getElementById("onboarding");
  const onboardingStart = document.getElementById("onboarding-start");

  if (!localStorage.getItem("ss_onboarding_done")) {
    onboarding.classList.remove("hidden");
  }

  onboardingStart.addEventListener("click", () => {
    localStorage.setItem("ss_onboarding_done", "1");
    onboarding.classList.add("hidden");
    Analytics.track("onboarding_completed");
  });

  /* ---------------------------------------------------------
     PAYWALL
  ---------------------------------------------------------- */

  const paywall = document.getElementById("paywall");
  const paywallSubscribe = document.getElementById("paywall-subscribe");
  const paywallClose = document.getElementById("paywall-close");

  function openPaywall() {
    paywall.classList.remove("hidden");
    Analytics.track("paywall_open");
  }

  paywallClose.addEventListener("click", () => {
    paywall.classList.add("hidden");
    Analytics.track("paywall_dismiss");
  });

  paywallSubscribe.addEventListener("click", () => {
    Analytics.track("paywall_subscribe_click");
  });

  document.getElementById("premium-btn")?.addEventListener("click", openPaywall);

  /* ---------------------------------------------------------
     A2HS
  ---------------------------------------------------------- */

  let deferredPrompt;
  const a2hsBanner = document.getElementById("a2hs-banner");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    a2hsBanner.classList.remove("hidden");
  });

  window.installApp = function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt = null;
    a2hsBanner.classList.add("hidden");
  };

  /* ---------------------------------------------------------
     NOTIFICATIONS
  ---------------------------------------------------------- */

  window.requestNotificationPermission = async function () {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Stay Safe Premium", {
        body: "Οι ειδοποιήσεις ενεργοποιήθηκαν!",
        icon: "icons/icon-192.png"
      });
    }
  };

  /* ---------------------------------------------------------
     QUIZ START BUTTONS (WITH BADGE ID)
  ---------------------------------------------------------- */

  document.getElementById("home-quiz-btn").addEventListener("click", () => {
    showLoading();
    setTimeout(() => hideLoading(), 500);

    tabs.forEach((t) => t.classList.remove("active"));
    document.querySelector('[data-target="quiz"]').classList.add("active");
    screens.forEach((s) => s.classList.remove("active"));
    document.getElementById("screen-quiz").classList.add("active");

    QuizEngine.start(langSelect.value, { badgeId: "badge-home" });
  });

  document.getElementById("digital-quiz-btn").addEventListener("click", () => {
    showLoading();
    setTimeout(() => hideLoading(), 500);

    tabs.forEach((t) => t.classList.remove("active"));
    document.querySelector('[data-target="quiz"]').classList.add("active");
    screens.forEach((s) => s.classList.remove("active"));
    document.getElementById("screen-quiz").classList.add("active");

    QuizEngine.start(langSelect.value, { badgeId: "badge-digital" });
  });

  /* ---------------------------------------------------------
     SERVICE WORKER
  ---------------------------------------------------------- */

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("SW error:", err));
  }

  /* ---------------------------------------------------------
     OFFLINE BANNER
  ---------------------------------------------------------- */

  let offlineBar = null;

  function showOfflineBar() {
    if (offlineBar) return;
    offlineBar = document.createElement("div");
    offlineBar.className = "offline-banner";
    offlineBar.textContent = I18N.get("t-offline-msg", Storage.loadLanguage());
    document.body.appendChild(offlineBar);
  }

  function hideOfflineBar() {
    if (!offlineBar) return;
    offlineBar.remove();
    offlineBar = null;
  }

  window.addEventListener("offline", showOfflineBar);
  window.addEventListener("online", hideOfflineBar);

  Analytics.track("app_open");

  /* ---------------------------------------------------------
     PREMIUM FEATURES
  ---------------------------------------------------------- */

  const premiumFeatures = [
    { id: "emergency", label: "🚨 Emergency Button", page: "emergency.html" },
    { id: "checkup", label: "🔐 Security Checkup", page: "checkup.html" },
    { id: "advanced", label: "🧠 Advanced Safety Tips", page: "advanced-tips.html" },
    { id: "alerts", label: "🛑 Scam Alerts", page: "scam-alerts.html" },
    { id: "password", label: "🔑 Password Generator", page: "password-generator.html" },
    { id: "offline", label: "📱 Offline Mode", page: "offline.html" }
  ];

  function renderPremiumList() {
    const isPremium = localStorage.getItem("premium") === "true";
    const list = document.getElementById("premium-list");
    const banner = document.getElementById("upgrade-banner");

    if (!list || !banner) return;

    list.innerHTML = premiumFeatures.map(f => `
      <li class="premium-item" onclick="openPremiumFeature('${f.page}')">
        <span>${f.label}</span>
        ${!isPremium ? '<span class="lock">🔒</span>' : ''}
      </li>
    `).join("");

    banner.style.display = isPremium ? "none" : "block";
  }

  window.openPremiumFeature = function(page) {
    const isPremium = localStorage.getItem("premium") === "true";
    if (!isPremium) {
      document.querySelector('[data-target="premium"]').click();
      return;
    }
    window.location.href = page;
  };

  window.unlockPremium = function() {
    localStorage.setItem("premium", "true");
    renderPremiumList();
    Analytics.track("premium_unlocked");
  };
});