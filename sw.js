const CACHE_NAME = "samkran-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/logo-192.png",
  "./icons/logo-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});