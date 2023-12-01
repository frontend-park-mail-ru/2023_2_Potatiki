const CURRENT_CACHE = 'main-cache';


self.addEventListener('activate', (evt) =>
    evt.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CURRENT_CACHE) {
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    ),
);

const fromNetwork = (request, timeout) =>
    new Promise((fulfill, reject) => {
        const timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
            if (request.method === 'GET') {
                const cloneResponse = response.clone();
                update(request, cloneResponse);
            }
        }, reject);
    });

const fromCache = (request) =>
    caches
        .open(CURRENT_CACHE)
        .then((cache) =>
            cache
                .match(request),
        );

const update = (request, response) =>
    caches
        .open(CURRENT_CACHE)
        .then((cache) =>
            cache.put(request, response),
        );

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fromNetwork(event.request, 5000).catch(() => fromCache(event.request)),
    );
});
