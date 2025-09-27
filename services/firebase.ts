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
const admin = require('firebase-admin');

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

function loadServiceAccount() {
  const raw = process.env.SERVICE_ACCOUNT_JSON || '';
  if (!raw) throw new Error('SERVICE_ACCOUNT_JSON is not set');
  try {
    if (raw.trim().startsWith('{')) return JSON.parse(raw);
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  } catch (e) {
    throw new Error('Invalid SERVICE_ACCOUNT_JSON: ' + e.message);
  }
}

// initialize admin once
if (!admin.apps.length) {
  const serviceAccount = loadServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async function (event, context) {
  try {
    // Only POST
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    // Verify Authorization header contains idToken
    const authHeader = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
    const idToken = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null;
    if (!idToken) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Missing Authorization header' }) };
    }

    // Verify token and admin claim
    const caller = await admin.auth().verifyIdToken(idToken);
    if (!caller || !caller.admin) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden: admin only' }) };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { uid, aiEnabled } = body;
    if (!uid) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing uid' }) };
    }

    // Set custom claim
    await admin.auth().setCustomUserClaims(uid, { aiEnabled: !!aiEnabled });

    // Mirror to Firestore for client reads
    await admin.firestore().doc(`userSettings/${uid}`).set({ aiEnabled: !!aiEnabled }, { merge: true });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('setUserAi error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'server error' }) };
  }
};

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