import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { 
    getAuth, type Auth,
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup, // Included from 'main'
    signInWithRedirect,
    getRedirectResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification, // Included from 'chore/firebase-reset'
    sendPasswordResetEmail // Included from 'chore/firebase-reset'
} from "firebase/auth";
import { 
    getFirestore, type Firestore,
    doc, 
    getDoc, 
    setDoc, 
    updateDoc
} from "firebase/firestore";
import { getFunctions } from 'firebase/functions';
import { logger } from '../utils/logger';

// Firebase configuration: prefer build-time VITE_ envs, but allow a runtime fallback
// by exposing a `window.__FIREBASE_CONFIG__` object (for example via a public/env.js uploaded
// to the site or served by the host). This lets you fix or rotate keys without rebuilding.
const runtimeConfig = typeof window !== 'undefined' ? (window as any).__FIREBASE_CONFIG__ : undefined;

const _env = (import.meta as any).env || {};
const firebaseConfig = {
    apiKey: _env.VITE_FIREBASE_API_KEY || runtimeConfig?.apiKey,
    authDomain: _env.VITE_FIREBASE_AUTH_DOMAIN || runtimeConfig?.authDomain,
    databaseURL: _env.VITE_FIREBASE_DATABASE_URL || runtimeConfig?.databaseURL,
    projectId: _env.VITE_FIREBASE_PROJECT_ID || runtimeConfig?.projectId,
    storageBucket: _env.VITE_FIREBASE_STORAGE_BUCKET || runtimeConfig?.storageBucket,
    messagingSenderId: _env.VITE_FIREBASE_MESSAGING_SENDER_ID || runtimeConfig?.messagingSenderId,
    appId: _env.VITE_FIREBASE_APP_ID || runtimeConfig?.appId,
    measurementId: _env.VITE_FIREBASE_MEASUREMENT_ID || runtimeConfig?.measurementId
};


let auth: Auth | null = null;
let db: Firestore | null = null;
let firebaseError: string | null = null; // Standardized error variable name
let googleProvider: GoogleAuthProvider | null = null;
let functionsClient: ReturnType<typeof getFunctions> | null = null;
let analyticsClient: Analytics | null = null; // Standardized analytics variable name

try {
    if (firebaseConfig && firebaseConfig.apiKey) {
        // Avoid double-initialization during HMR or if this module is evaluated multiple times
        const app: FirebaseApp = getApps().length ? (getApps()[0] as FirebaseApp) : initializeApp(firebaseConfig);
        // Helpful debug log so client-side initialisation is visible in the browser console
        try {
            // app.options is present on successful initialization
            logger.debug('Firebase initialized (client). Project ID:', app.options?.projectId || '(unknown)');
        } catch (e) {
            // ignore logging errors in unusual environments
        }
        auth = getAuth(app);
        db = getFirestore(app);
        // export client Functions instance for callable functions
        try {
            functionsClient = getFunctions(app);
        } catch (e) {
            // ignore if functions can't initialize in current environment
        }
        // Initialize Analytics only in browser environments when measurementId is present
        try {
            // getAnalytics requires a browser environment; guard with typeof window
            if (typeof window !== 'undefined' && (app.options?.measurementId || firebaseConfig.measurementId)) {
                analyticsClient = getAnalytics(app);
            }
        } catch (e) {
            // ignore analytics initialization failures (e.g., in tests or SSR)
        }
        googleProvider = new GoogleAuthProvider();
    } else {
        firebaseError = "Firebase configuration is missing or invalid. Please check your environment variables (.env.local file).";
        logger.error(firebaseError);
    }
} catch (e: any) {
    firebaseError = `Firebase initialization failed: ${e.message}`;
    logger.error(firebaseError, e);
}

// Note: server-side admin logic has been moved to Netlify Functions under netlify/functions/
// This file is client-only and must not import `firebase-admin` (server SDK).

export { 
    auth, 
    db, 
    firebaseError,
    googleProvider,
    functionsClient,
    analyticsClient,
    
    // Auth helpers
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    updateProfile,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification,
    sendPasswordResetEmail,

    // Firestore helpers
    doc,
    getDoc,
    setDoc,
    updateDoc
};
