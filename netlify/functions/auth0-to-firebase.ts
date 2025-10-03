import type { Handler } from '@netlify/functions';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT_JSON!))
  });
}

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header: any, cb: any) {
  client.getSigningKey(header.kid, (err, key: any) => {
    if (err) return cb(err);
    const signingKey = key.getPublicKey();
    cb(null, signingKey);
  });
}

export const handler: Handler = async (event) => {
  try {
    const { idToken } = JSON.parse(event.body || '{}');
    if (!idToken) return { statusCode: 400, body: 'Missing idToken' };

    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(idToken, getKey, {
        audience: process.env.AUTH0_CLIENT_ID,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
      }, (err, payload) => err ? reject(err) : resolve(payload));
    });

    const rawSub = decoded.sub; // e.g. "github|1234567"
    const firebaseUid = rawSub.replace('|','_');

    const customToken = await admin.auth().createCustomToken(firebaseUid, {
      auth0Provider: rawSub.split('|')[0]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ customToken })
    };
  } catch (e:any) {
    return { statusCode: 500, body: e.message };
  }
};