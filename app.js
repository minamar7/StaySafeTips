document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang-select");
  const tabs = document.querySelectorAll(".nav-tab");
  const screens = document.querySelectorAll(".app-screen");

  /* STORAGE ENGINE */

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

  /* AUTO-DETECT LANGUAGE */

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

  /* TABS */

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
      }
    });
  });

  /* BADGES */

  function unlockBadge(badgeId) {
    const badge = document.getElementById(badgeId);
    if (!badge) return;

    badge.classList.remove("locked");
    badge.classList.add("unlocked");

    badge.style.animation = "none";
    void badge.offsetWidth;
    badge.style.animation = "";

    Storage.saveBadge(badgeId);
  }

  const unlocked = Storage.loadBadges();
  unlocked.forEach((id) => unlockBadge(id));

  /* QUIZ PROGRESS LOAD */

  const qp = Storage.loadQuizProgress();
  if (qp.total > 0) {
    const percent = Math.round((qp.score / qp.total) * 100);
    const homeProg = document.getElementById("t-home-quiz-progress");
    if (homeProg) homeProg.textContent = percent + "%";
  }

  /* QUIZ EVENTS */

  window.addEventListener("quizCompleted", (e) => {
    const { score, total } = e.detail;
    Storage.saveQuizProgress(score, total);
    Analytics.track("quiz_completed", { score, total });

    if (score / total >= 0.7) {
      unlockBadge("badge-digital");
    }
  });

  /* ONBOARDING */

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

  /* PAYWALL */

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
    // window.location.href = "https://checkout.stripe.com/your-link";
  });

  document.getElementById("premium-btn").addEventListener("click", openPaywall);

  /* A2HS */

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

  /* NOTIFICATIONS */

  window.requestNotificationPermission = async function () {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Stay Safe Premium", {
        body: "Οι ειδοποιήσεις ενεργοποιήθηκαν!",
        icon: "icons/icon-192.png"   // FIXED PATH
      });
    }
  };

  /* HOME / DIGITAL QUIZ BUTTONS */

  document.getElementById("home-quiz-btn").addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    document.querySelector('[data-target="quiz"]').classList.add("active");
    screens.forEach((s) => s.classList.remove("active"));
    document.getElementById("screen-quiz").classList.add("active");
    QuizEngine.start(langSelect.value);
  });

  document.getElementById("digital-quiz-btn").addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    document.querySelector('[data-target="quiz"]').classList.add("active");
    screens.forEach((s) => s.classList.remove("active"));
    document.getElementById("screen-quiz").classList.add("active");
    QuizEngine.start(langSelect.value);
  });

  /* SERVICE WORKER */

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")   // FIXED PATH
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("SW error:", err));
  }

  Analytics.track("app_open");
});
  
