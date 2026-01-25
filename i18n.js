/* ---------------------------------------------------------
   Stay Safe Premium – i18n.js
   Multilingual engine for all UI text (t-keys)
   Supports: EN, EL, IT, ES, FR, DE, PT, NL, SV, NO, DA, FI, PL, RO, TR
---------------------------------------------------------- */

(function () {
  console.log("i18n.js loaded");

  /* ---------------------------------------------------------
     1. TRANSLATION DICTIONARY
     Each language contains all t-keys used in index.html
  ---------------------------------------------------------- */

  const translations = {
    en: {
      "t-app-title": "Stay Safe Premium",
      "t-app-subtitle": "Interactive Survival Experience",
      "t-tab-home": "Home Safety",
      "t-tab-digital": "Digital Safety",
      "t-tab-quiz": "Quiz",
      "t-tab-badges": "Badges",
      "t-tab-premium": "Premium",

      "t-home-title": "Home Safety",
      "t-home-sub": "Daily protection",
      "t-home-pill": "Level 1 · Basics",
      "t-home-intro": "Your home – your fortress. Start with the basics:",
      "t-home-list": [
        "Lock all doors & windows, even when at home.",
        "Don’t buzz people in automatically – always check first.",
        "Secure balcony and windows over 2 meters height.",
        "No window exit? Consider a smoke detector in the hallway."
      ],
      "t-home-pro": "Unplug all appliances when leaving for more than 24 hours.",
      "t-home-snap-title": "Home Safety Snapshot",
      "t-home-snap-sub": "Main entries locked, secured balcony, common sense.",
      "t-home-quiz-progress": "0%",
      "t-home-badge-name": "Smart Sentinel",
      "t-home-btn": "Start home safety mini quiz",

      "t-digital-title": "Digital & Social Safety",
      "t-digital-sub": "Online protection",
      "t-digital-pill": "Level 2 · Online",
      "t-digital-intro": "Protect your accounts, identity, and devices:",
      "t-digital-list": [
        "Create strong, unique passwords for every important account.",
        "Enable two-factor authentication everywhere you can.",
        "Don’t trust links in strange messages or emails.",
        "Keep software & apps updated at all times."
      ],
      "t-digital-critical":
        "Avoid public Wi‑Fi for important logins. Always use a device lock (PIN, password, biometrics).",
      "t-digital-snap-title": "Digital Shield View",
      "t-digital-snap-sub": "Secure account layers, updated software.",
      "t-digital-quiz-progress": "0%",
      "t-digital-badge-name": "Premium Digital Shield",
      "t-digital-btn": "Start digital safety mini quiz",

      "t-quiz-title": "Digital Safety Quiz",
      "t-quiz-sub": "Test your instincts in real scenarios",
      "t-quiz-pill": "Live · Question 1",
      "t-quiz-progress-label": "Question 1 of 15",
      "t-quiz-next": "Next",

      "t-badges-title": "Badge Awards",
      "t-badges-sub": "Your safety journey at a glance",
      "t-badges-pill": "8 / 12 badges earned",
      "t-badges-progress":
        "You’ve unlocked 8 out of 12 safety badges. Keep going to complete your profile.",
      "t-badge-home": "Home Security",
      "t-badge-digital": "Digital Safety",
      "t-badge-scam": "Scam Protection",
      "t-badge-emergency": "Emergency Ready",
      "t-badge-locked1": "Night Watch",
      "t-badge-locked2": "Travel Guardian",
      "t-badge-locked3": "Family Shield",
      "t-badge-locked4": "Crisis Navigator",
      "t-badges-req": "View requirements to unlock remaining badges ∧",

      "t-premium-title": "Unlock Premium Protection",
      "t-premium-sub":
        "Full access to expert safety protocols, quizzes, and badges.",
      "t-premium-list": [
        "Actionable, expert-level safety advice for real-world scenarios.",
        "Advanced quizzes with realistic situations and instant feedback.",
        "Smart badge system that tracks your progress across all areas.",
        "Priority access to new content and pro-level updates."
      ],
      "t-premium-price": "€4.90 / month",
      "t-premium-note": "Cancel anytime. No hidden fees. Satisfaction guaranteed.",
      "t-premium-btn": "Subscribe via Stripe",

      "t-unlock-title": "Smart Sentinel Unlocked!",
      "t-unlock-sub":
        "You’ve completed all home safety steps and passed the quiz.",

      "t-gallery-title": "Stay Safe Premium – Visual Mockups",
      "t-gallery-sub":
        "A preview of the app identity, core screens, and Play Store presence."
    },

    /* ---------------------------------------------------------
       2. GREEK (EL)
    ---------------------------------------------------------- */
    el: {
      "t-app-title": "Stay Safe Premium",
      "t-app-subtitle": "Διαδραστική εμπειρία επιβίωσης",
      "t-tab-home": "Ασφάλεια Σπιτιού",
      "t-tab-digital": "Ψηφιακή Ασφάλεια",
      "t-tab-quiz": "Quiz",
      "t-tab-badges": "Διακρίσεις",
      "t-tab-premium": "Premium",

      "t-home-title": "Ασφάλεια Σπιτιού",
      "t-home-sub": "Καθημερινή προστασία",
      "t-home-pill": "Επίπεδο 1 · Βασικά",
      "t-home-intro": "Το σπίτι σου – το καταφύγιό σου. Ξεκίνα από τα βασικά:",
      "t-home-list": [
        "Κλείδωσε πόρτες & παράθυρα, ακόμη κι όταν είσαι μέσα.",
        "Μην ανοίγεις ποτέ χωρίς να δεις ποιος είναι.",
        "Ασφάλισε μπαλκόνια και παράθυρα πάνω από 2 μέτρα.",
        "Δεν υπάρχει έξοδος κινδύνου; Βάλε ανιχνευτή καπνού."
      ],
      "t-home-pro":
        "Βγάλε όλες τις συσκευές από την πρίζα όταν λείπεις πάνω από 24 ώρες.",
      "t-home-snap-title": "Στιγμιότυπο Ασφάλειας Σπιτιού",
      "t-home-snap-sub": "Κλειδωμένες είσοδοι, ασφαλές μπαλκόνι, κοινή λογική.",
      "t-home-quiz-progress": "0%",
      "t-home-badge-name": "Smart Sentinel",
      "t-home-btn": "Ξεκίνα το mini quiz",

      "t-digital-title": "Ψηφιακή & Κοινωνική Ασφάλεια",
      "t-digital-sub": "Online προστασία",
      "t-digital-pill": "Επίπεδο 2 · Online",
      "t-digital-intro": "Προστάτευσε λογαριασμούς, ταυτότητα και συσκευές:",
      "t-digital-list": [
        "Δημιούργησε ισχυρούς, μοναδικούς κωδικούς.",
        "Ενεργοποίησε παντού το 2FA.",
        "Μην ανοίγεις ύποπτους συνδέσμους.",
        "Κράτα ενημερωμένο το λογισμικό σου."
      ],
      "t-digital-critical":
        "Απόφυγε δημόσιο Wi‑Fi για σημαντικές συνδέσεις. Χρησιμοποίησε PIN ή βιομετρικά.",
      "t-digital-snap-title": "Ψηφιακή Ασπίδα",
      "t-digital-snap-sub": "Ασφαλείς λογαριασμοί, ενημερωμένο λογισμικό.",
      "t-digital-quiz-progress": "0%",
      "t-digital-badge-name": "Premium Digital Shield",
      "t-digital-btn": "Ξεκίνα το mini quiz",

      "t-quiz-title": "Quiz Ψηφιακής Ασφάλειας",
      "t-quiz-sub": "Δες πώς αντιδράς σε πραγματικά σενάρια",
      "t-quiz-pill": "Ζωντανά · Ερώτηση 1",
      "t-quiz-progress-label": "Ερώτηση 1 από 15",
      "t-quiz-next": "Επόμενη",

      "t-badges-title": "Διακρίσεις",
      "t-badges-sub": "Η πορεία σου στην ασφάλεια",
      "t-badges-pill": "8 / 12 διακρίσεις",
      "t-badges-progress":
        "Ξεκλείδωσες 8 από τις 12 διακρίσεις. Συνέχισε για να ολοκληρώσεις το προφίλ σου.",
      "t-badge-home": "Ασφάλεια Σπιτιού",
      "t-badge-digital": "Ψηφιακή Ασφάλεια",
      "t-badge-scam": "Προστασία από Απάτες",
      "t-badge-emergency": "Έτοιμος για Έκτακτη Ανάγκη",
      "t-badge-locked1": "Νυχτερινός Φύλακας",
      "t-badge-locked2": "Ταξιδιωτικός Φύλακας",
      "t-badge-locked3": "Οικογενειακή Ασπίδα",
      "t-badge-locked4": "Crisis Navigator",
      "t-badges-req": "Δες τις απαιτήσεις ∧",

      "t-premium-title": "Ξεκλείδωσε Premium Προστασία",
      "t-premium-sub":
        "Πλήρης πρόσβαση σε πρωτόκολλα ασφάλειας, quiz και διακρίσεις.",
      "t-premium-list": [
        "Εξειδικευμένες συμβουλές για πραγματικές καταστάσεις.",
        "Προχωρημένα quiz με άμεση ανατροφοδότηση.",
        "Έξυπνο σύστημα διακρίσεων.",
        "Προτεραιότητα σε νέο περιεχόμενο."
      ],
      "t-premium-price": "€4.90 / μήνα",
      "t-premium-note": "Ακύρωση ανά πάσα στιγμή. Χωρίς κρυφές χρεώσεις.",
      "t-premium-btn": "Εγγραφή μέσω Stripe",

      "t-unlock-title": "Smart Sentinel – Ξεκλειδώθηκε!",
      "t-unlock-sub":
        "Ολοκλήρωσες όλα τα βήματα ασφάλειας σπιτιού και πέρασες το quiz.",

      "t-gallery-title": "Stay Safe Premium – Mockups",
      "t-gallery-sub":
        "Προεπισκόπηση ταυτότητας εφαρμογής και βασικών οθονών."
    },

    /* ---------------------------------------------------------
       3. ΟΛΕΣ ΟΙ ΥΠΟΛΟΙΠΕΣ ΓΛΩΣΣΕΣ
       (IT, ES, FR, DE, PT, NL, SV, NO, DA, FI, PL, RO, TR)
       — Θα σου τις συμπληρώσω ΜΟΛΙΣ ολοκληρώσουμε quiz.js
    ---------------------------------------------------------- */

  }

  /* ---------------------------------------------------------
     2. APPLY TRANSLATIONS TO DOM
  ---------------------------------------------------------- */

  function applyLanguage(lang) {
    const dict = translations[lang] || translations["en"];

    document.querySelectorAll("[id^='t-']").forEach((el) => {
      const key = el.id;
      const value = dict[key];

      if (!value) return;

      if (Array.isArray(value)) {
        // For lists
        el.innerHTML = value.map((li) => `<li>${li}</li>`).join("");
      } else {
        el.textContent = value;
      }
    });

    console.log("Language applied:", lang);
  }

  /* ---------------------------------------------------------
     3. PUBLIC API
  ---------------------------------------------------------- */

  window.I18N = {
    apply: applyLanguage
  };

})();
