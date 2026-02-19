const CACHE_NAME = 'le-middle-v2';
const STATIC_ASSETS = [
  '/manifest.json',
  '/grid.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API requests - always go to network
  if (url.pathname.startsWith('/api')) return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  // Skip navigation requests (HTML pages) - let them go to network for proper i18n routing
  // This prevents caching redirects and ensures locale detection works correctly
  if (request.mode === 'navigate') return;

  // Only cache static assets (images, fonts, scripts, styles)
  const isStaticAsset = 
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ico)$/);

  if (!isStaticAsset) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached response and update cache in background
        event.waitUntil(
          fetch(request).then((response) => {
            if (response.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response);
              });
            }
          }).catch(() => {})
        );
        return cachedResponse;
      }

      // Not in cache - fetch from network
      return fetch(request).then((response) => {
        // Cache successful responses
        if (response.ok && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Return offline response for static assets only
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

