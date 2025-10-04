import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth, type Auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore, type Firestore,
  doc, getDoc, setDoc, updateDoc
} from 'firebase/firestore';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

// Centralized firebase configuration (no hard-coded fallback)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Lightweight validation & visibility
console.debug('[FIREBASE CONFIG CHECK]', {
  apiKey: (firebaseConfig.apiKey || '').slice(0, 8),
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  appId: firebaseConfig.appId,
  storageBucket: firebaseConfig.storageBucket
});

if (
  firebaseConfig.projectId &&
  firebaseConfig.authDomain &&
  !firebaseConfig.authDomain.includes(firebaseConfig.projectId)
) {
  console.warn('[FIREBASE CONFIG MISMATCH]', {
    expectedInAuthDomain: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
let functionsClient: ReturnType<typeof getFunctions> | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let firebaseInitError: string | null = null;

try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Missing required Firebase environment variables.');
  }

  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();

  try { functionsClient = getFunctions(app); } catch {}

  try {
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } catch {
    // Analytics optional
  }

  console.debug('[FIREBASE] Initialized OK');
} catch (e: any) {
  firebaseInitError = e?.message || 'Unknown init error';
  console.error('[FIREBASE INIT FAILED]', e);
}

export {
  auth,
  db,
  analytics,
  firebaseInitError,
  googleProvider,
  functionsClient,

  // Auth helpers
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendPasswordResetEmail,

  // Firestore helpers
  doc, getDoc, setDoc, updateDoc
};