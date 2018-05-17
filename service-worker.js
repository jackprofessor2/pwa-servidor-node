let cacheName = 'iNotes-v1';
let filesToCache = [
    'servidor.js',
    './',
    'index.html',
    'css/style.css',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js',
    'js/scripts.js',
    'images/logo.png',
    'images/option.png',
    'images/Pen.png',
    'images/Pointer.png',
    'images/Save.png',
    'images/Trash.png',
    'images/icons/icon-128x128.png',
    'images/icons/icon-144x144.png',
    'images/icons/icon-152x152.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-256x256.png',
    'images/icons/icon-512x512.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );

    return;
});
