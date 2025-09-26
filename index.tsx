import React from 'react';
import { createRoot } from 'react-dom/client';
// FIX: Explicitly adding the .tsx extension can help resolve module issues in some environments.
import App from './App.tsx';
import './index.css';

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
  console.error('Fatal Error: Root element #root not found in the DOM.');
}
