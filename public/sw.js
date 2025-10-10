const CACHE_NAME = 'ivs-english-cache-v1';
const RUNTIME_CACHE = 'ivs-runtime-cache-v1';

// Assets to cache immediately on install
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/images/logo/logo.svg',
  '/images/logo/logo-lighting.webp',
  '/google-icon.svg',
  '/microsoft-icon.svg',
  '/linkedin-icon.svg',
  '/sounds/click.mp3',
  '/sounds/confirm.mp3',
  '/sounds/cancel.mp3'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.open(RUNTIME_CACHE).then(cache => {
      return fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request).then(cached => {
            if (cached) {
              console.log('[SW] Serving from cache:', request.url);
              return cached;
            }
            
            // If HTML request fails and not cached, show offline page
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // For other resources, just fail
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        });
    })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
