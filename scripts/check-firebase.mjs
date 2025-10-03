import { initializeApp, getApps } from 'firebase/app';

// Same config as in services/firebase.ts
// Read config from environment when available (do not commit secrets)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'AIzaSyBcHFYOgJW26hE5m_yB7Uin2kT9nDHrYNs',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'englishlearners-8df3c.firebaseapp.com',
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL || 'https://englishlearners-8df3c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'englishlearners-8df3c',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'englishlearners-8df3c.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '319158527417',
  appId: process.env.VITE_FIREBASE_APP_ID || 'REPLACE_WITH_YOUR_FIREBASE_APP_ID',
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || 'REPLACE_WITH_YOUR_MEASUREMENT_ID'
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
