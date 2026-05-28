self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));
self.addEventListener("fetch", (e) => e.respondWith(fetch(e.request)));

self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : { title: "New message", body: "" };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/1_black.png",
      badge: "/1_black.png",
      tag: "whatsapp-message",
      renotify: true,
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const existing = list.find((c) => c.url.includes("/whatsapp"));
      if (existing) return existing.focus();
      return clients.openWindow("/whatsapp");
    })
  );
});
