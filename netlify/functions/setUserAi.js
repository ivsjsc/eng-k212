// Netlify Function: setUserAi
// Expects POST with JSON body: { "uid": "<targetUid>", "aiEnabled": true|false }
// Requires Authorization: Bearer <idToken> header (idToken of an admin user)
// Requires env var SERVICE_ACCOUNT_JSON set (raw JSON or base64-encoded JSON)

const parseServiceAccount = (raw) => {
  if (!raw) return null;
  // Try plain JSON first
  try {
    return JSON.parse(raw);
  } catch (e) {
    // Try base64 decode
    try {
      const buff = Buffer.from(raw, 'base64');
      return JSON.parse(buff.toString('utf8'));
    } catch (e2) {
      return null;
    }
  }
};

let adminApp = null;
let admin = null;

const initAdminIfNeeded = async () => {
  if (adminApp) return;
  const saRaw = process.env.SERVICE_ACCOUNT_JSON;
  const sa = parseServiceAccount(saRaw);
  if (!sa) throw new Error('SERVICE_ACCOUNT_JSON is missing or invalid (not JSON or base64 JSON)');
  // initialize firebase-admin lazily
  admin = require('firebase-admin');
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(sa),
    projectId: sa.project_id || undefined,
  });
};

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed, use POST' }) };
    }

    const authHeader = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
    const tokenMatch = authHeader.match(/^Bearer\s+(.*)$/i);
    if (!tokenMatch) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Missing Authorization Bearer token' }) };
    }
    const idToken = tokenMatch[1];

    await initAdminIfNeeded();

    // Verify caller token and admin claim
    const decoded = await admin.auth().verifyIdToken(idToken).catch((err) => {
      throw { code: 401, message: 'Invalid ID token: ' + String(err && err.message ? err.message : err) };
    });

    if (!decoded || !decoded.admin) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Caller is not an admin' }) };
    }

    let body = {};
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const uid = body.uid;
    const aiEnabled = !!body.aiEnabled;
    if (!uid) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing field: uid' }) };
    }

    // Get existing claims, merge, set
    const user = await admin.auth().getUser(uid);
    const existingClaims = user.customClaims || {};
    const newClaims = Object.assign({}, existingClaims, { aiEnabled });
    await admin.auth().setCustomUserClaims(uid, newClaims);

    // Mirror to Firestore
    const firestore = admin.firestore();
    await firestore.collection('userSettings').doc(uid).set({ aiEnabled }, { merge: true });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, uid, aiEnabled }),
    };
  } catch (err) {
    // If err has code property returned intentionally
    const code = err && err.code && Number(err.code) ? Number(err.code) : 500;
    const message = err && err.message ? err.message : (err && err.error ? err.error : String(err));
    return { statusCode: code, body: JSON.stringify({ error: message }) };
  }
};
