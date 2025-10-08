/**
 * Usage: node scripts/set-admin-claim.js <serviceAccountJsonPath> <targetUid> --admin
 * Example: node scripts/set-admin-claim.js ./service-account.json abc123 --admin
 */
import admin from 'firebase-admin';
import fs from 'fs';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/set-admin-claim.js <serviceAccountJsonPath> <targetUid> [--ai] [--admin]');
  process.exit(2);
}

const [serviceAccountPath, targetUid, ...flags] = args;
const adminFlag = flags.includes('--admin');
const aiFlag = flags.includes('--ai');

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

async function run() {
  const claims = {};
  if (adminFlag) claims.admin = true;
  if (aiFlag) claims.aiEnabled = true;

  try {
    await admin.auth().setCustomUserClaims(targetUid, claims);
    console.log('Set claims for', targetUid, claims);
  } catch (e) {
    console.error('Failed to set claims', e);
  }
}

run();
