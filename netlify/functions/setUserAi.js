import admin from 'firebase-admin';

function parseServiceAccount(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) {}
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')); } catch (e) {}
  return null;
}

let adminApp = null;

async function initAdminIfNeeded() {
  if (adminApp) return;
  const saRaw = process.env.SERVICE_ACCOUNT_JSON;
  const sa = parseServiceAccount(saRaw);
  if (!sa) throw new Error('SERVICE_ACCOUNT_JSON is missing or invalid');
  adminApp = admin.initializeApp({ credential: admin.credential.cert(sa), projectId: sa.project_id });
}

export const handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({ error: 'Use POST' }) };
    const authHeader = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
    const m = authHeader.match(/^Bearer\s+(.*)$/i);
    if (!m) return { statusCode: 401, body: JSON.stringify({ error: 'Missing bearer' }) };
    const idToken = m[1];

    await initAdminIfNeeded();

    const decoded = await admin.auth().verifyIdToken(idToken).catch(err => { throw { code: 401, message: 'Invalid ID token: ' + (err && err.message ? err.message : err) }; });
    if (!decoded || !decoded.admin) return { statusCode: 403, body: JSON.stringify({ error: 'Caller is not an admin' }) };

    let body = {};
    try { body = event.body ? JSON.parse(event.body) : {}; } catch (e) { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }; }
    const uid = body.uid;
    const aiEnabled = !!body.aiEnabled;
    if (!uid) return { statusCode: 400, body: JSON.stringify({ error: 'Missing field: uid' }) };

    const user = await admin.auth().getUser(uid);
    const existingClaims = user.customClaims || {};
    const newClaims = Object.assign({}, existingClaims, { aiEnabled });
    await admin.auth().setCustomUserClaims(uid, newClaims);

    const firestore = admin.firestore();
    await firestore.collection('userSettings').doc(uid).set({ aiEnabled }, { merge: true });

    return { statusCode: 200, body: JSON.stringify({ success: true, uid, aiEnabled }) };
  } catch (err) {
    const code = err && err.code && Number(err.code) ? Number(err.code) : 500;
    const message = err && err.message ? err.message : (err && err.error ? err.error : String(err));
    return { statusCode: code, body: JSON.stringify({ error: message }) };
  }
};
// Minimal Netlify function for local testing
// This file intentionally keeps behavior simple so it can be required and called locally.

function parseServiceAccount(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) {}
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')); } catch (e) {}
  return null;
}

let admin = null;

async function initAdminIfNeeded() {
  if (admin) return;
  const saRaw = process.env.SERVICE_ACCOUNT_JSON;
  const sa = parseServiceAccount(saRaw);
  if (!sa) throw new Error('SERVICE_ACCOUNT_JSON is missing or invalid');
  admin = require('firebase-admin');
  admin.initializeApp({ credential: admin.credential.cert(sa), projectId: sa.project_id });
}

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({ error: 'Use POST' }) };
    const authHeader = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
    const m = authHeader.match(/^Bearer\s+(.*)$/i);
    if (!m) return { statusCode: 401, body: JSON.stringify({ error: 'Missing bearer' }) };
    const idToken = m[1];
    // initialize admin (will throw if env missing)
    await initAdminIfNeeded();
    // verify token - may throw
    await admin.auth().verifyIdToken(idToken);
    const body = event.body ? JSON.parse(event.body) : {};
    if (!body.uid) return { statusCode: 400, body: JSON.stringify({ error: 'missing uid' }) };
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err && err.message ? err.message : err) }) };
  }
};
