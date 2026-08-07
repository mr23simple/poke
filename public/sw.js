const CACHE_NAME = 'external-images-v3';
const ALLOWED_HOSTS = [
    'raw.githubusercontent.com',
    'leekduck.com',
    'pokeapi.co',
    'unpkg.com',
    'raids.nl'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const isImage = /\.(png|jpe?g|gif|webp|ico|svg)(\?.*)?$/i.test(url.pathname) || url.pathname.includes('/sprites/') || url.pathname.includes('/Pokemon/');
    const isAllowedHost = ALLOWED_HOSTS.some(host => url.hostname.endsWith(host));
    const isSameOrigin = url.origin === self.location.origin;

    if (isImage && (isAllowedHost || isSameOrigin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    // Stale-while-revalidate for background freshness check
                    fetch(event.request).then((networkResponse) => {
                        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse);
                            });
                        }
                    }).catch(() => {});
                    return cachedResponse;
                }

                return fetch(event.request).then((networkResponse) => {
                    if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
                        return networkResponse;
                    }

                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                });
            })
        );
    }
});
