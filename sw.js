const VERSION = "v12-elite-final"; 
const STATIC_CACHE = `ss-elite-static-${VERSION}`;

// Αρχεία προς αποθήκευση στη συσκευή
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

// 1. Εγκατάσταση και αποθήκευση αρχείων
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("🛡️ SW: Shielding Assets...");
      return Promise.allSettled(
        STATIC_ASSETS.map(url => 
          cache.add(url).catch(err => console.log(`⚠️ Failed to cache: ${url}`))
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
  console.log("🛡️ SW: Shield Active & Updated");
  self.clients.claim();
});

// 3. Στρατηγική Fetch: Stale-While-Revalidate
// Ιδανικό για Apps: Δείχνει αμέσως την cache και ανανεώνει κρυφά
self.addEventListener("fetch", event => {
  // Παράβλεψη αιτημάτων εκτός του δικού μας domain (π.χ. analytics)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Αποθήκευση της νέας έκδοσης στην cache για την επόμενη φορά
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          // Αν το δίκτυο αποτύχει, έχουμε ήδη το cachedResponse
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
