/* ---------------------------------------------------------
   Stay Safe Premium – Service Worker (sw.js)
   Strategy: Hybrid (Stale-While-Revalidate & Network-First)
---------------------------------------------------------- */

const VERSION = "v10-final"; 
const STATIC_CACHE = `ssp-static-${VERSION}`;
const DYNAMIC_CACHE = `ssp-dynamic-${VERSION}`;

// Περιλαμβάνουμε ΟΛΑ τα αρχεία για πλήρη offline εμπειρία
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./quiz.js",
  "./i18n.js",
  "./manifest.webmanifest",
  "./premium-suite.html",
  "./premium-paywall.html",
  "./emergency.html",
  "./checkup.html",
  "./password-generator.html",
  "./offline.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// --- INSTALL: Αποθήκευση βασικών αρχείων ---
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("SW: Caching Static Assets...");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// --- ACTIVATE: Καθαρισμός παλιών εκδόσεων ---
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// --- FETCH: Διαχείριση αιτημάτων ---
self.addEventListener("fetch", event => {
  const req = event.request;

  // Αγνοούμε αιτήματα προς άλλες πηγές (π.χ. Google Analytics)
  if (!req.url.startsWith(self.location.origin)) return;

  // 1. Στρατηγική Network-First για HTML (για να βλέπει ο χρήστης αμέσως αλλαγές αν έχει ίντερνετ)
  if (req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => {
          // Αν είναι offline, δείξε την αποθηκευμένη σελίδα ή το index.html
          return caches.match(req).then(cached => cached || caches.match("./index.html"));
        })
    );
    return;
  }

  // 2. Στρατηγική Stale-While-Revalidate για Assets (CSS, JS, Images)
  // Σερβίρει αμέσως από το cache και ενημερώνει το cache στο παρασκήνιο
  event.respondWith(
    caches.match(req).then(cachedResponse => {
      const fetchPromise = fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(req, clone));
        }
        return networkResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
