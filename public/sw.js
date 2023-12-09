const CURRENT_CACHE = 'main-cache' + new Date().toDateString;


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
    if (event.request.headers.length) {
        console.log(event, event.request, event.request.headers);
        if (event.request.headers.get['content-type'].includes('image')) {
            event.respondWith(
                fromCache(event.request).catch(() => fromNetwork(event.request, 2000)),
            );
            return;
        }
    }

    event.respondWith(
        fromNetwork(event.request, 2000).catch(() => fromCache(event.request)),
    );
});
