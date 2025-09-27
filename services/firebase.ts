import { initializeApp, type FirebaseApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    type Auth
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc,
    type Firestore
} from "firebase/firestore";
import { getFunctions } from 'firebase/functions';

// User-provided Firebase configuration to fix connection issues.
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


let auth: Auth | null = null;
let db: Firestore | null = null;
let firebaseError: string | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let functionsClient: ReturnType<typeof getFunctions> | null = null;

try {
  if (firebaseConfig && firebaseConfig.apiKey) {
      const app: FirebaseApp = initializeApp(firebaseConfig);
      // Helpful debug log so client-side initialisation is visible in the browser console
      try {
        // app.options is present on successful initialization
        // eslint-disable-next-line no-console
        console.log('Firebase initialized (client). Project ID:', app.options?.projectId || '(unknown)');
      } catch (e) {
        // ignore console errors in unusual environments
      }
      auth = getAuth(app);
      db = getFirestore(app);
        // export client Functions instance for callable functions
        try {
          functionsClient = getFunctions(app);
        } catch (e) {
          // ignore if functions can't initialize in current environment
        }
      googleProvider = new GoogleAuthProvider();
  } else {
      firebaseError = "Firebase configuration is missing or invalid. Please check the hardcoded config in services/firebase.ts.";
      console.error(firebaseError);
  }
} catch (e: any) {
  firebaseError = `Firebase initialization failed: ${e.message}`;
  console.error(firebaseError, e);
}

// Note: server-side admin logic has been moved to Netlify Functions under netlify/functions/
// This file is client-only and must not import `firebase-admin` (server SDK).

export { 
    auth, 
    db, 
    firebaseError,
    googleProvider,
  functionsClient,
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
    doc,
    getDoc,
    setDoc,
    updateDoc
};