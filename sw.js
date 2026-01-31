const VERSION = "v11-final"; 
const STATIC_CACHE = `ssp-static-${VERSION}`;

// Μειωμένη λίστα για δοκιμή - Βάλε ΜΟΝΟ όσα αρχεία υπάρχουν σίγουρα στο GitHub σου
const STATIC_ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "quiz.js",
  "i18n.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      // Χρησιμοποιούμε μια πιο "ελαστική" μέθοδο για να μην κολλάει αν λείπει ένα εικονίδιο
      return Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url))
      ).then(() => console.log("SW: Assets Cached (Safe Mode)"));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== STATIC_CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // Απλή στρατηγική: Cache First, fallback to Network
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
