const STATIC_CACHE = "ssp-static-v4";
const DYNAMIC_CACHE = "ssp-dynamic-v1";

/* 
  ΣΗΜΑΝΤΙΚΟ:
  Στο GitHub Pages το site ζει μέσα σε φάκελο.
  Άρα ΟΛΑ τα paths πρέπει να είναι relative ("./").
*/

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

/* INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const request = event.request;

  // 🟢 NETWORK FIRST για HTML
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 🔵 CACHE FIRST για assets
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((response) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
      );
    })
  );
});