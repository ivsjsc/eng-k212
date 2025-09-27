import React from 'react';
import { createRoot } from 'react-dom/client';
// FIX: Explicitly adding the .tsx extension can help resolve module issues in some environments.
import App from './App.tsx';
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
