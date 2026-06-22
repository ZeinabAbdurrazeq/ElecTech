const CACHE_NAME = 'v1-static-assets';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/features.css',
  './css/values.css',
  './css/services.css',
  './css/board.css',
  './css/contact.css',
  './css/vision.css',
  './scripts/script.js',
  './resources/Minimalist ELECTECH logo design.png',
  './resources/logo-removebg-preview.png',
  './resources/logo.png',
  './resources/logo2.png',
  './resources/logoYellow.png',
  './resources/icons/icon-192.png',
  './resources/icons/icon-512.png',
  './resources/Integrity.png',
  './resources/Quality.png',
  './resources/COLLABORATION.png',
  './resources/Social-Responsibility.png',
  './resources/CUSTOMER-SATISFACTION.png',
  './resources/capital-projects.svg',
  './resources/construction.svg',
  './resources/investment-venture-capital.svg',
  './resources/procurement-distribution.svg',
  './resources/real-estate.svg',
  './resources/technology-solutions.svg',
  './resources/w-corp-brokerage.svg',
  './resources/w-corp-handshake.svg',
  './resources/w-corp-return.svg',
  './offline.html'
];

// Install Event - cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and adding assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - cache-first with network fallback, and offline page fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests to avoid caching issues with POST submissions (like the contact form)
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch((error) => {
        // Check if the request is a navigation page request
        if (
          event.request.mode === 'navigate' ||
          (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))
        ) {
          return caches.match('./offline.html');
        }
        throw error;
      });
    })
  );
});
