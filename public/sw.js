importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
)

// self.addEventListener('install', (event) => {
//   const offlinePage = new Request('/')
//   event.waitUntil(
//     caches.open('static').then((cache) => cache.add(offlinePage))
//   )
// })

// self.addEventListener('fetch', (event) => {
//   const { request } = event

//   if (request.mode === 'navigate') {
//     event.respondWith(
//       fetch(request).catch(() =>
//         caches.match('/').then((response) => response)
//       )
//     )
//   }
// })
self.addEventListener('fetch', (event) => {
    const { request } = event;
  
    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request).catch(() =>
          new Response('You are currently offline. Please check your internet connection.')
        )
      );
    }
  });
  
