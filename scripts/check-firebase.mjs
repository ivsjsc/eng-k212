import { initializeApp, getApps } from 'firebase/app';

// Same config as in services/firebase.ts
// Read config from environment when available (do not commit secrets)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'REPLACE_WITH_YOUR_FIREBASE_API_KEY',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'english-c0f9d.firebaseapp.com',
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL || 'https://english-c0f9d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'english-c0f9d',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'english-c0f9d.firebasestorage.app',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '125352513706',
  appId: process.env.VITE_FIREBASE_APP_ID || '1:125352513706:web:0bdd068ff703ff569680d3',
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-T492DDR4DZ'
};

(async () => {
  try {
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully.');
    console.log('App name:', app.name || '(default)');
    console.log('Project ID:', (app.options && app.options.projectId) || '(unknown)');
    console.log('Number of initialized apps:', getApps().length);
    process.exit(0);
  } catch (e) {
    console.error('Firebase initialization failed:', e);
    process.exit(2);
  }
})();
