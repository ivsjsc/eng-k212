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
