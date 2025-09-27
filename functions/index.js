// Example Cloud Function (Node 18 runtime) to allow admins to set per-user AI flag via Admin SDK.
// Deploy this with Firebase CLI from the functions folder (or adapt to your existing cloud functions).
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.setUserAi = functions.https.onCall(async (data, context) => {
  // Only authenticated callers
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can call this function.');
  }

  // Only allow callers who have admin claim
  const callerClaims = context.auth.token || {};
  if (!callerClaims.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admin users can set flags.');
  }

  const targetUid = data.uid;
  const aiEnabled = !!data.aiEnabled;

  if (!targetUid) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing target uid');
  }

  // Option A: set custom claim (note: token refresh required on client to see change)
  try {
    await admin.auth().setCustomUserClaims(targetUid, { ...(data.otherClaims || {}), aiEnabled });
  } catch (err) {
    console.error('Error setting custom claims', err);
    throw new functions.https.HttpsError('internal', 'Failed to set claims');
  }

  // Option B (recommended if you want easy per-user settings): also write to Firestore
  try {
    await admin.firestore().doc(`userSettings/${targetUid}`).set({ aiEnabled }, { merge: true });
  } catch (err) {
    console.error('Error writing userSettings', err);
    // not fatal
  }

  return { success: true };
});
