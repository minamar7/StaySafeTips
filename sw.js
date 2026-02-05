const VERSION = "v13-elite-full"; // Ανέβασα το version για να πάρει τις αλλαγές
const STATIC_CACHE = `ss-elite-static-${VERSION}`;

const STATIC_ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "manifest.webmanifest",
  "sw.js",
  "app.js",
  "quiz.js",
  "i18n.js",
  "translations.js",
  "analytics.js",
  "api.js",
  
  // Όλα τα HTML εργαλεία που είδα στα αρχεία σου
  "checkup.html",
  "dojo.html",
  "sos_hub.html",
  "scam-alerts.html",
  "emergency.html",
  "offline.html",
  "password-generator.html",
  "privacy.html",
  "advanced-tips.html",
  "premium-ml.html",
  "premium-paywall.html",
  "premium-suite.html",

  // Τα JSON δεδομένα (Πολύ σημαντικό για το Quiz)
  "dojo.json",
  "emergency_hub.json",
  "questions_free_el.json",
  "questions_free_en.json",
  "questions_free_de.json",
  "questions_free_es.json",
  "questions_free_fr.json",
  "questions_free_hi.json",
  "questions_free_it.json",
  "questions_free_pt.json",
  "questions_free_ru.json",
  "questions_free_zh.json",
  "questions_premium_el.json",
  "questions_premium_en.json",
  "questions_premium_de.json",
  "questions_premium_es.json",
  "questions_premium_fr.json",
  "questions_premium_hi.json",
  "questions_premium_it.json",
  "questions_premium_pt.json",
  "questions_premium_ru.json",
  "questions_premium_zh.json",

  // Icons (Σιγουρέψου ότι υπάρχουν στον φάκελο icons/)
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// ... υπόλοιπος κώδικας (install, activate, fetch) όπως τον φτιάξαμε πριν
