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
  BASE + "icon-192.png",
  BASE + "icon-512.png",
  BASE + "icon-maskable-192.png",
  BASE + "icon-maskable-512.png",
  BASE + "screenshot1.png",
  BASE + "screenshot2.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return Promise.allSettled(
        STATIC_ASSETS.map(url => 
          cache.add(url).catch(err => console.warn(`Skipped: ${url}`))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== STATIC_CACHE).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match(BASE + 'offline.html');
      });
    })
  );
});
