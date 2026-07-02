/* Bodhi Map — service worker (offline + installable PWA).
   Precaches the app shell so it works offline after install; runtime-caches
   everything else same-origin (cache-first). Bump CACHE to invalidate. */
const CACHE = 'bodhi-v0.5.0';
const PRECACHE = [
  './', './index.html', './app.html', './m.html',
  './css/style.css',
  './js/cytoscape.min.js', './js/layout-base.js', './js/cose-base.js', './js/cytoscape-fcose.js',
  './js/data.js', './js/graph.js',
  './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './fonts/manrope-400.woff2', './fonts/manrope-500.woff2', './fonts/manrope-600.woff2',
  './fonts/manrope-700.woff2', './fonts/manrope-800.woff2',
  './images/bodhi-tree.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // let cross-origin pass through
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      if (req.mode === 'navigate') {
        return (await caches.match('./app.html')) || (await caches.match('./index.html'));
      }
      throw err;
    }
  })());
});
