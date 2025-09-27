import fs from 'fs';
import path from 'path';

async function run() {
  const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
  const b64Path = path.join(root, 'service-account.b64');
  if (!fs.existsSync(b64Path)) {
    console.error('service-account.b64 not found in project root. Place your base64-encoded service account as service-account.b64');
    process.exit(1);
  }

  const b64 = fs.readFileSync(b64Path, 'utf8').trim();
  let saJson;
  try {
    const raw = Buffer.from(b64, 'base64').toString('utf8');
    saJson = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to decode/parse service-account.b64:', e.message || e);
    process.exit(1);
  }

  // dynamic import to avoid adding dependency at edit-time; script will fail with instruction if missing
  let admin;
  try {
    admin = await import('firebase-admin');
  } catch (e) {
    console.error('firebase-admin is not installed. Run: npm install firebase-admin');
    process.exit(1);
  }

  const firebaseAdmin = admin.default || admin;
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(saJson),
      databaseURL: saJson.database_url || saJson.databaseURL || undefined
    });
  } catch (e) {
    console.error('Failed to initialize firebase-admin:', e.message || e);
    process.exit(1);
  }

  const auth = firebaseAdmin.auth();
  const firestore = firebaseAdmin.firestore();
  let realtime;
  try { realtime = (await import('firebase-admin/database')).getDatabase(); } catch (e) { realtime = null; }

  const testEmail = `test+${Date.now()}@example.invalid`;
  const testPassword = 'Test123!@#';
  console.log('Creating test user:', testEmail);
  let userRecord;
  try {
    userRecord = await auth.createUser({ email: testEmail, password: testPassword, displayName: 'Test User' });
    console.log('Created user uid=', userRecord.uid);
  } catch (e) {
    console.error('Failed to create user:', e.message || e);
    process.exit(1);
  }

  const uid = userRecord.uid;
  const results = { auth: false, firestore: false, realtime: false };

  // Firestore test
  try {
    const docRef = firestore.collection('tests').doc(uid);
    await docRef.set({ createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(), note: 'firestore test' });
    const snap = await docRef.get();
    if (snap.exists && snap.data().note === 'firestore test') {
      console.log('Firestore write/read OK');
      results.firestore = true;
    } else {
      console.error('Firestore read mismatch');
    }
  } catch (e) {
    console.error('Firestore error:', e.message || e);
  }

  // Realtime DB test (if available)
  if (realtime) {
    try {
      const dbRef = realtime.ref(`tests/${uid}`);
      await dbRef.set({ createdAt: Date.now(), note: 'realtime test' });
      const snap = await dbRef.get();
      if (snap.exists() && snap.val().note === 'realtime test') {
        console.log('Realtime DB write/read OK');
        results.realtime = true;
      } else {
        console.error('Realtime DB read mismatch');
      }
    } catch (e) {
      console.error('Realtime DB error:', e.message || e);
    }
  } else {
    console.warn('Realtime Database module not available in this install; skipped realtime test');
  }

  // Auth test: set custom claim then read it back
  try {
    await auth.setCustomUserClaims(uid, { testFlag: true });
    const refreshed = await auth.getUser(uid);
    if (refreshed && refreshed.customClaims && refreshed.customClaims.testFlag === true) {
      console.log('Auth custom claim set/read OK');
      results.auth = true;
    } else {
      console.error('Auth custom claim mismatch');
    }
  } catch (e) {
    console.error('Auth error (set/read claims):', e.message || e);
  }

  // Cleanup
  try {
    // remove test firestore doc
    try { await firestore.collection('tests').doc(uid).delete(); } catch (e) {}
    // remove realtime entry
    if (realtime) {
      try { await realtime.ref(`tests/${uid}`).remove(); } catch (e) {}
    }
    // delete auth user
    await auth.deleteUser(uid);
    console.log('Cleaned up test user and data');
  } catch (e) {
    console.error('Cleanup error:', e.message || e);
  }

  console.log('RESULTS:', results);
  const ok = results.auth && results.firestore && (realtime ? results.realtime : true);
  process.exit(ok ? 0 : 2);
}

run();
