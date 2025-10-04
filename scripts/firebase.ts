const runtimeConfig = typeof window !== 'undefined' && (window as any).__FIREBASE_CONFIG__;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || runtimeConfig?.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || runtimeConfig?.authDomain,
  // ...
};