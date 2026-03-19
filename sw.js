const VERSION = "v21-ultra-stable"; 
const STATIC_CACHE = `ss-elite-static-${VERSION}`;

// Ορίζουμε το Base Path για το GitHub Pages
const BASE = '/StaySafeTips/';

const STATIC_ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.webmanifest",
  BASE + "sw.js",
  BASE + "styles.css",
  BASE + "app.js",
  BASE + "quiz.js",
  BASE + "i18n.js",
  BASE + "translations.js",
  BASE + "analytics.js",
  BASE + "api.js",
  BASE + "checkup.html",
  BASE + "dojo.html",
  BASE + "sos-hub.html",
  BASE + "scam-alerts.html",
  BASE + "scam-alerts2.html",
  BASE + "emergency.html",
  BASE + "offline.html",
  BASE + "cancel.html",
  BASE + "success.html",
  BASE + "timer.html",
  BASE + "techniques.html",
  BASE + "weather-alerts.html",
  BASE + "reflexdrill.html",
  BASE + "focus-drill.html",
  BASE + "password-generator.html",
  BASE + "privacy.html",
  BASE + "premium-ml.html",
  BASE + "premium-paywall.html",
  BASE + "premium-suite.html",
  BASE + "emergency_hub.json",
  // Ήχοι
  BASE + "kiai.mp3",
  BASE + "kiai1.mp3",
  // Γλώσσες (Free & Premium)
  BASE + "questions_free_el.json",
  BASE + "questions_free_en.json",
  BASE + "questions_free_de.json",
  BASE + "questions_free_es.json",
  BASE + "questions_free_fr.json",
  BASE + "questions_free_hi.json",
  BASE + "questions_free_it.json",
  BASE + "questions_free_pt.json",
  BASE + "questions_free_ru.json",
  BASE + "questions_free_zh.json",
  BASE + "questions_premium_el.json",
  BASE + "questions_premium_en.json",
  BASE + "questions_premium_de.json",
  BASE + "questions_premium_es.json",
  BASE + "questions_premium_fr.json",
  BASE + "questions_premium_hi.json",
  BASE + "questions_premium_it.json",
  BASE + "questions_premium_pt.json",
  BASE + "questions_premium_ru.json",
  BASE + "questions_premium_zh.json",
  // Icons & Screenshots
  BASE + "icon-192.png",
  BASE + "icon-512.png",
  BASE + "icon-maskable-192.png",
  BASE + "icon-maskable-512.png",
  BASE + "screenshot1.png",
  BASE + "screenshot2.jpg", // Διόρθωση κατάληξης βάσει του φακέλου σας
  BASE + "screenshot3.png",
  BASE + "screenshot4.png"
];

// 1. Εγκατάσταση: Shielding Assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("🛡️ SW: Shielding Elite Assets...");
      return Promise.allSettled(
        STATIC_ASSETS.map(url => 
          cache.add(url).catch(err => console.warn(`⚠️ Failed to cache: ${url}`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// 2. Ενεργοποίηση: Cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== STATIC_CACHE)
            .map(key => caches.delete(key))
      )
    )
  );
  console.log("🛡️ SW: Active & Updated to " + VERSION);
  self.clients.claim();
});

// 3. Fetch Strategy: Stale-While-Revalidate
self.addEventListener("fetch", event => {
  // Μόνο αιτήματα από την ίδια προέλευση
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Ενημέρωση της cache μόνο αν η απόκριση είναι έγκυρη
          if (networkResponse && networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Αν η συσκευή είναι offline και το αίτημα αφορά πλοήγηση σελίδας
          if (event.request.mode === 'navigate') {
            return caches.match(BASE + 'offline.html');
          }
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
