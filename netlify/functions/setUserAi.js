// Netlify Function: setUserAi.js (ESM)
// Supports TEST_NO_ADMIN=1 for local testing without firebase-admin installed.

function parseServiceAccount(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) {}
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')); } catch (e) {}
  return null;
}

let adminModule = null;

async function initAdminIfNeeded() {
  if (adminModule) return;
  const saRaw = process.env.SERVICE_ACCOUNT_JSON || '';
  const sa = parseServiceAccount(saRaw);
  if (!sa && !process.env.TEST_NO_ADMIN) throw new Error('SERVICE_ACCOUNT_JSON is missing or invalid');

  if (process.env.TEST_NO_ADMIN) {
    // Minimal mock for local testing
    adminModule = {
      auth() {
        return {
          async verifyIdToken(token) {
            if (!token) throw new Error('Missing token (mock)');
            return { uid: 'mock-admin', admin: true };
          },
          async getUser(uid) {
            return { uid, customClaims: {} };
          },
          async setCustomUserClaims(uid, claims) { return; }
        };
      },
      firestore() {
        return { collection() { return { doc() { return { set: async () => {} } } } } };
      }
    };
    return;
  }

  // Real firebase-admin init
  const adminPkg = await import('firebase-admin').catch(() => null);
  if (!adminPkg) throw new Error('firebase-admin is not installed locally; set TEST_NO_ADMIN=1 to run tests without it');
  const admin = adminPkg.default || adminPkg;
  adminModule = admin;
  admin.initializeApp({ credential: admin.credential.cert(sa), projectId: sa.project_id });
}

export const handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({ error: 'Use POST' }) };
    const authHeader = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
    const m = authHeader.match(/^Bearer\s+(.*)$/i);
    if (!m) return { statusCode: 401, body: JSON.stringify({ error: 'Missing bearer' }) };
    const idToken = m[1];

    await initAdminIfNeeded();

    const decoded = await adminModule.auth().verifyIdToken(idToken).catch(err => { throw { code: 401, message: 'Invalid ID token: ' + (err && err.message ? err.message : err) }; });
    if (!decoded || !decoded.admin) return { statusCode: 403, body: JSON.stringify({ error: 'Caller is not an admin' }) };

    let body = {};
    try { body = event.body ? JSON.parse(event.body) : {}; } catch (e) { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }; }
    const uid = body.uid;
    const aiEnabled = !!body.aiEnabled;
    if (!uid) return { statusCode: 400, body: JSON.stringify({ error: 'Missing field: uid' }) };

    const user = await adminModule.auth().getUser(uid);
    const existingClaims = user.customClaims || {};
    const newClaims = Object.assign({}, existingClaims, { aiEnabled });
    await adminModule.auth().setCustomUserClaims(uid, newClaims);

    const firestore = adminModule.firestore();
    await firestore.collection('userSettings').doc(uid).set({ aiEnabled }, { merge: true });

    return { statusCode: 200, body: JSON.stringify({ success: true, uid, aiEnabled }) };
  } catch (err) {
    const code = err && err.code && Number(err.code) ? Number(err.code) : 500;
    const message = err && err.message ? err.message : (err && err.error ? err.error : String(err));
    return { statusCode: code, body: JSON.stringify({ error: message }) };
  }
};

