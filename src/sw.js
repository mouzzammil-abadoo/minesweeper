var cacheName = 'tictactoe-pwa';
var filesToCache = [
    '/minesweeper/',
    '/minesweeper/index.html',
    '/minesweeper/assets/css/vendor.css',
    '/minesweeper/assets/css/style.css',
    '/minesweeper/js/vendor.js',
    '/minesweeper/js/all.js',
    '/minesweeper/js/templates.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});