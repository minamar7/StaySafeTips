const CACHE_STATIC = "ssp-static-v4";
const CACHE_DYNAMIC = "ssp-dynamic-v1";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./quiz.js",
  "./i18n.js",
  "./styles.css",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_STATIC && key !== CACHE_DYNAMIC)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  const request = event.request;

  // Μόνο requests από το ίδιο origin
  if (!request.url.startsWith(self.location.origin)) return;

  // HTML → network-first
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_DYNAMIC).then(cache => cache.put(request, resClone));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // CSS/JS/images → cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(res => {
        const resClone = res.clone();
        caches.open(CACHE_DYNAMIC).then(cache => cache.put(request, resClone));
        return res;
      });
    })
  );
});