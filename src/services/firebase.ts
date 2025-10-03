import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
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
} from "firebase/auth";
import {
  getFirestore, type Firestore,
  doc, getDoc, setDoc, updateDoc
} from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getFunctions } from 'firebase/functions';

// Firebase configuration from environment variables
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

let auth: Auth | null = null;
let db: Firestore | null = null;
let firebaseInitError: string | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let functionsClient: ReturnType<typeof getFunctions> | null = null;
let analyticsClient: Analytics | null = null;

try {
  if (firebaseConfig && firebaseConfig.apiKey) {
    const app: FirebaseApp = getApps().length ? getApps()[0] as FirebaseApp : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    try { functionsClient = getFunctions(app); } catch {}
    try {
      if (typeof window !== 'undefined' && (app.options?.measurementId || firebaseConfig.measurementId)) {
        analyticsClient = getAnalytics(app);
      }
    } catch {}
    console.debug('[FIREBASE] Initialized OK');
  } else {
    firebaseInitError = "Firebase configuration is missing or invalid. Please check your environment variables (.env.local file).";
    console.error(firebaseInitError);
  }
} catch (e: any) {
  firebaseInitError = `Firebase initialization failed: ${e.message}`;
  console.error(firebaseInitError, e);
}

export {
  auth,
  db,
  firebaseInitError,
  googleProvider,
  functionsClient,
  analyticsClient,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendPasswordResetEmail,
  doc,
  getDoc,
  setDoc,
  updateDoc
};