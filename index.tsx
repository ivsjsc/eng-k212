import React from 'react';
import { createRoot } from 'react-dom/client';
// FIX: Explicitly adding the .tsx extension can help resolve module issues in some environments.
import App from './App';
import './index.css';
import { logger } from './utils/logger';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Hide the initial loader after the app has been mounted
  const loader = document.querySelector('.initial-loader');
  if (loader) {
    loader.remove();
  }
} else {
  logger.critical('Fatal Error: Root element #root not found in the DOM.');
}

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('[PWA] Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, prompt user to reload
                if (confirm('Phiên bản mới của ứng dụng đã sẵn sàng. Tải lại trang để cập nhật?')) {
                  newWorker.postMessage('skipWaiting');
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  });
  
  // Handle controller change (new SW activated)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}
