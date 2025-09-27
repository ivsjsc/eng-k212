import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function run(){
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  let b64Path = path.join(scriptDir, '..', 'service-account.b64');
  if (!fs.existsSync(b64Path)) b64Path = path.join(process.cwd(), 'service-account.b64');
  if (!fs.existsSync(b64Path)){
    console.error('service-account.b64 not found');
    process.exit(1);
  }
  const b64 = fs.readFileSync(b64Path, 'utf8').trim();
  let saJson;
  try{ saJson = JSON.parse(Buffer.from(b64, 'base64').toString('utf8')); } catch(e){ console.error('Failed to parse service account:', e.message); process.exit(1); }

  let admin;
  try{ admin = (await import('firebase-admin')).default || (await import('firebase-admin'));
  } catch(e){ console.error('firebase-admin not installed. Run: npm install firebase-admin'); process.exit(1); }

  admin.initializeApp({ credential: admin.credential.cert(saJson), databaseURL: saJson.database_url || saJson.databaseURL || undefined });
  const firestore = admin.firestore();
  const auth = admin.auth();

  try{
    console.log('Listing up to 20 documents in Firestore collection `users`...');
    const snap = await firestore.collection('users').limit(20).get();
    if (snap.empty) {
      console.log('No documents found in collection `users`.');
    } else {
      snap.forEach(d => {
        console.log('-', d.id, JSON.stringify(d.data()));
      });
    }
  } catch(e){ console.error('Error reading Firestore users collection:', e.message || e); }

  try{
    console.log('\nListing up to 20 Firebase Auth users...');
    const list = await auth.listUsers(20);
    if (!list.users || list.users.length === 0) console.log('No auth users found.');
    else list.users.forEach(u => console.log('-', u.uid, u.email || u.phoneNumber || '(no email/phone)', 'disabled=' + u.disabled));
  } catch(e){ console.error('Error listing auth users:', e.message || e); }

  process.exit(0);
}

run();
