const VERSION = "v13-elite-full"; 
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
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// 1. Εγκατάσταση: Αποθήκευση όλων των αρχείων στην Cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("🛡️ SW: Shielding Assets...");
      return Promise.allSettled(
        STATIC_ASSETS.map(url => 
          cache.add(url).catch(err => console.warn(`⚠️ Failed to cache: ${url}`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// 2. Ενεργοποίηση: Διαγραφή παλιών εκδόσεων Cache
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
// Σερβίρει αμέσως από Cache και ενημερώνει στο παρασκήνιο
self.addEventListener("fetch", event => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback σε περίπτωση που είμαστε offline και το αρχείο δεν υπάρχει στην cache
          if (event.request.mode === 'navigate') {
            return caches.match('offline.html');
          }
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
