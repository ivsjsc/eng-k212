import { initializeApp, getApps } from 'firebase/app';

// Same config as in services/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyB9lCtWV3f5pbGQJ6gvFeGbuAtF3Dl1fPs",
  authDomain: "arctic-outpost-472823-r2.firebaseapp.com",
  databaseURL: "https://arctic-outpost-472823-r2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arctic-outpost-472823-r2",
  storageBucket: "arctic-outpost-472823-r2.appspot.com",
  messagingSenderId: "125352513706",
  appId: "1:125352513706:web:0bdd068ff703ff569680d3",
  measurementId: "G-T492DDR4DZ"
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
