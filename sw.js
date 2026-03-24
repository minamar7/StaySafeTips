const VERSION = "v25-elite-final"; 
const STATIC_CACHE = `ss-elite-static-${VERSION}`;
const BASE = '/StaySafeTips/';

const STATIC_ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.webmanifest",
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
  BASE + "kiai.mp3",
  BASE + "kiai1.mp3",
  BASE + "icon_192.png",
  BASE + "icon_512.png",
  BASE + "icon-maskable-192.png",
  BASE + "icon-maskable-512.png",
  BASE + "screenshot1.jpg",
  BASE + "screenshot2.jpg",
  BASE + "screenshot3.jpg",
  BASE + "screenshot4.jpg",
  BASE + "screenshot_wide.jpg" // Προστέθηκε για το 45/45 score
];

// Εγκατάσταση και αποθήκευση στην Cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("Caching assets...");
      return Promise.allSettled(
        STATIC_ASSETS.map(url => 
          cache.add(url).catch(err => console.warn(`Failed to cache: ${url}`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Ενεργοποίηση και καθαρισμός παλιάς Cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Διαχείριση αιτημάτων (Network with Cache Fallback)
self.addEventListener("fetch", event => {
  // Μόνο για αιτήματα στο ίδιο origin
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Αν υπάρχει στην cache, το δίνουμε αμέσως
      if (cachedResponse) {
        return cachedResponse;
      }

      // Αλλιώς πάμε στο δίκτυο
      return fetch(event.request).then(networkResponse => {
        // Αποθήκευση νέων αρχείων στην cache (αν είναι έγκυρα)
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Αν αποτύχει το δίκτυο (offline) και είναι σελίδα, δείξε το offline.html
        if (event.request.mode === 'navigate') {
          return caches.match(BASE + 'offline.html');
        }
      });
    })
  );
});
