const CACHE = 'ei100d-v4';
const BASE = new URL('./', self.location).href;

const ASSETS = [
  'index.html',
  'admin.html',
  'lessons.json',
  'config.js',
  'manifest.json',
  'js/guest-access.js',
  'js/razorpay-pay.js',
  'js/ai-service.js',
  'js/certificates.js',
  'js/pwa.js',
  'icons/icon.svg'
].map(f => BASE + f);

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok && (url.pathname.endsWith('.json') || url.pathname.includes('/js/'))) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
