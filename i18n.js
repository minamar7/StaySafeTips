/**
 * Stay Safe Elite – I18N Controller
 * Lightweight • Safe • Scalable • Analytics-ready
 */
(() => {
  "use strict";

  /* ============================
     TRANSLATIONS
  ============================ */
  const translations = {
    en: {
      "t-app-title": "Stay Safe Premium",
      "t-app-subtitle": "Interactive Survival Experience",
      "t-tab-home": "Home",
      "t-tab-digital": "Digital",
      "t-tab-quiz": "Quiz",
      "t-tab-badges": "Badges",
      "t-tab-premium": "Elite",
      "t-home-title": "Home Safety",
      "t-home-btn": "Start Home Quiz",
      "t-digital-title": "Digital Safety",
      "t-digital-btn": "Start Digital Quiz",
      "t-quiz-title": "Safety IQ Quiz",
      "t-quiz-sub": "Real-life scenarios",
      "t-quiz-next": "Next",
      "t-badges-title": "Your Badges",
      "t-badges-sub": "Your progress at a glance",
      "t-premium-title": "Elite Hub",
      "t-premium-sub": "Advanced protection protocols",
      "t-home-list": [
        "Lock all doors & windows.",
        "Check before you open the door.",
        "Install smoke detectors."
      ],
      "t-digital-list": [
        "Use strong passwords.",
        "Enable 2FA (Two-Factor Auth).",
        "Avoid public Wi-Fi."
      ]
    },

    el: {
      "t-app-title": "Stay Safe Elite",
      "t-app-subtitle": "Premium Εμπειρία Ασφάλειας",
      "t-tab-home": "Σπίτι",
      "t-tab-digital": "Ψηφιακά",
      "t-tab-quiz": "Quiz",
      "t-tab-badges": "Σήματα",
      "t-tab-premium": "Elite",
      "t-home-title": "Ασφάλεια Σπιτιού",
      "t-home-btn": "Έναρξη Home Quiz",
      "t-digital-title": "Ψηφιακή Ασφάλεια",
      "t-digital-btn": "Έναρξη Digital Quiz",
      "t-quiz-title": "Quiz Ασφαλείας",
      "t-quiz-sub": "Σενάρια πραγματικής ζωής",
      "t-quiz-next": "Επόμενο",
      "t-badges-title": "Τα Σήματά σου",
      "t-badges-sub": "Η πρόοδός σου με μια ματιά",
      "t-premium-title": "Elite Hub",
      "t-premium-sub": "Προηγμένα πρωτόκολλα προστασίας",
      "t-home-list": [
        "Κλειδώνετε πόρτες και παράθυρα.",
        "Ελέγχετε πριν ανοίξετε την πόρτα.",
        "Τοποθετήστε ανιχνευτές καπνού."
      ],
      "t-digital-list": [
        "Χρησιμοποιείτε ισχυρούς κωδικούς.",
        "Ενεργοποιήστε το 2FA.",
        "Αποφύγετε δημόσια Wi-Fi."
      ]
    }
  };

  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "ss_lang";

  /* ============================
     CORE APPLY
  ============================ */
  const applyLanguage = (lang) => {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    if (!dict) return;

    // data-i18n (primary)
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const value = dict[key];
      if (!value) return;

      if (Array.isArray(value)) {
        el.innerHTML = value.map(v => `<li>${v}</li>`).join("");
      } else {
        el.textContent = value;
      }
    });

    // id fallback (legacy support)
    Object.entries(dict).forEach(([key, value]) => {
      const el = document.getElementById(key);
      if (!el) return;

      if (Array.isArray(value)) {
        el.innerHTML = value.map(v => `<li>${v}</li>`).join("");
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // 🔗 analytics hook (silent)
    window.track?.("language_change", { lang });
  };

  /* ============================
     INIT
  ============================ */
  const init = () => {
    const langSelect = document.getElementById("lang-select");
    const savedLang =
      localStorage.getItem(STORAGE_KEY) ||
      navigator.language?.slice(0, 2) ||
      "el";

    applyLanguage(savedLang);

    if (langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener("change", e => {
        applyLanguage(e.target.value);
      });
    }
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

  /* ============================
     PUBLIC API
  ============================ */
  window.I18N = Object.freeze({
    apply: applyLanguage,
    get: (key, lang) =>
      (translations[lang] || translations[DEFAULT_LANG])?.[key] || key,
    available: () => Object.keys(translations)
  });
})();