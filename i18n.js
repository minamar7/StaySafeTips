(function () {
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
    // Μπορείς να προσθέσεις it, es, fr, de όπως πριν...
  };

  /**
   * Apply translations to the DOM
   */
  function applyLanguage(lang) {
    const dict = translations[lang] || translations["en"];

    // 1. Μετάφραση μέσω data-i18n (Προτιμότερο)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (value) {
        if (Array.isArray(value)) {
          el.innerHTML = value.map((li) => `<li>${li}</li>`).join("");
        } else {
          el.textContent = value;
        }
      }
    });

    // 2. Μετάφραση μέσω ID (για συμβατότητα με τα t- keys σου)
    Object.keys(dict).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            if (Array.isArray(dict[key])) {
                el.innerHTML = dict[key].map(li => `<li>${li}</li>`).join("");
            } else {
                el.textContent = dict[key];
            }
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("ss_lang", lang); // Αποθήκευση επιλογής
  }

  // Αρχικοποίηση
  document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");
    const savedLang = localStorage.getItem("ss_lang") || "el";

    if (langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener("change", (e) => applyLanguage(e.target.value));
    }

    applyLanguage(savedLang);
  });

  window.I18N = {
    apply: applyLanguage,
    get: (key, lang) => (translations[lang] || translations["en"])[key] || key
  };
})();
