// ============================================
// SpelBok - Service Worker
// Enables offline functionality and caching
// ============================================

const CACHE_NAME = "spelbok-alpha";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/css/styles.css",
  "./assets/js/app.js",
  "./assets/js/i18n.js",
  "./assets/i18n/sv.json",
  "./assets/i18n/de.json",
  "./assets/i18n/en.json",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        console.log("Service Worker: Serving from cache:", event.request.url);
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Only cache GET requests for same origin
          if (
            event.request.method === "GET" &&
            event.request.url.startsWith(self.location.origin)
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch((error) => {
          console.log("Service Worker: Fetch failed, serving offline");
          // Return offline message
          return new Response("SpelBok läuft im Offline-Modus", {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        });
    }),
  );
});

// Background sync (optional - for future enhancements)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-songs") {
    console.log("Service Worker: Background sync");
    // Here you could implement background sync logic
  }
});

// Push notifications (optional - for future enhancements)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "./assets/icons/icon-192x192.png",
      badge: "./assets/icons/icon-72x72.png",
      vibrate: [200, 100, 200],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});
