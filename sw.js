const CACHE_NAME = 'klemmbausteinbude-v2';
const PRECACHE_URLS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  // Grundausstattung für den ersten Offline-Aufruf cachen.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Alte Versionen entfernen und den neuen Worker sofort übernehmen.
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Fremde Ursprünge (z. B. externe PDF-Links) werden durchgereicht.
  if (url.origin !== self.location.origin) return;

  const isHtml = request.mode === 'navigate' || request.destination === 'document' ||
    url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  const isStatic = request.destination === 'image' || url.pathname.endsWith('manifest.json');

  if (isHtml) {
    // HTML network-first: Updates kommen an, offline greift der Cache.
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request).then(cached => cached || caches.match('./index.html'))));
  } else if (isStatic) {
    // Icons und Manifest cache-first laden.
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    })));
  }
});
