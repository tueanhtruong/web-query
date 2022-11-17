/* eslint-disable security/detect-unsafe-regex */
import { messageSW, Workbox } from 'workbox-window';
import { WorkboxLifecycleEvent } from 'workbox-window/utils/WorkboxEvent';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export const register = () => {
  if (!isLocalhost) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const wb = new Workbox('/service-worker.js');
      let registration: ServiceWorkerRegistration;

      const showSkipWaitingPrompt = (_event: WorkboxLifecycleEvent) => {
        // `event.wasWaitingBeforeRegister` will be false if this is
        // the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously
        // updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        wb.addEventListener('controlling', (_event: WorkboxLifecycleEvent) => {
          window.location.reload();
        });

        if (registration && registration.waiting) {
          // Send a message to the waiting service worker,
          // instructing it to activate.
          // Note: for this to work, you have to add a message
          // listener in your service worker. See below.
          messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        }
      };

      wb.addEventListener('installed', (event: WorkboxLifecycleEvent) => {
        if (event.isUpdate) {
          console.log('🔄🔄🔄 Reload window to remove cache');
          window.location.reload();
        }
      });

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', showSkipWaitingPrompt);

      wb.register().then((response?: ServiceWorkerRegistration) => {
        if (!response) return;

        registration = response;
        console.log('✔️✔️✔️ Service Worker Registration Successfully!');
      });
    }
  }
};
