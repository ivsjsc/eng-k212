import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

export const api = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.status(204).send('');
  }

  if (req.method === 'GET') {
    return res.json({ ok: true, time: new Date().toISOString() });
  }

  return res.status(405).json({ error: 'Method not allowed' });
});