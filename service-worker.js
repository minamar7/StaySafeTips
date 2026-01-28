const VERSION = "v6"; // ⬅️  ΕΔΩ
const STATIC_CACHE = `ssp-static-${VERSION}`;
const DYNAMIC_CACHE = `ssp-dynamic-${VERSION}`;
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./quiz.js",
  "./i18n.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => !key.includes(VERSION))
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  const req = event.request;

  if (!req.url.startsWith(self.location.origin)) return;

  // 🧠 HTML → Network First (για onboarding, νέα screens κλπ)
  if (req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 🎨 CSS / JS / Images → Stale While Revalidate
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        const clone = res.clone();
        caches.open(DYNAMIC_CACHE).then(c => c.put(req, clone));
        return res;
      });

      return cached || fetchPromise;
    })
  );
});