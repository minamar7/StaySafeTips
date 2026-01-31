const VERSION = "v12-elite-final"; 
const STATIC_CACHE = `ss-elite-static-${VERSION}`;

// Αρχεία προς αποθήκευση στη συσκευή
const STATIC_ASSETS = [
  "./",
  "index.html",
  "scam.html",
  "quiz.html",
  "styles.css",
  "app.js",
  "quiz.js",
  "i18n.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// 1. Εγκατάσταση Service Worker και Cache Assets
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

// 2. Ενεργοποίηση και καθαρισμός παλιάς Cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== STATIC_CACHE)
            .map(key => caches.delete(key))
      )
    )
  );
  console.log("🛡️ SW: Active & Updated");
  self.clients.claim();
});

// 3. Fetch Strategy: Stale-While-Revalidate + Offline fallback
self.addEventListener("fetch", event => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          console.warn("⚠️ SW: Network failed for", event.request.url);
        });

        // Αν υπάρχει cache, δείχνει αμέσως. Αν όχι, περιμένει fetch
        return cachedResponse || fetchPromise || new Response("Offline – Δεν υπάρχει αποθηκευμένο περιεχόμενο", {
          status: 503,
          statusText: "Service Worker Offline"
        });
      });
    })
  );
});