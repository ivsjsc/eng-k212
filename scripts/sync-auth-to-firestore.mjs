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

  // Defaults for new user docs
  const defaultUser = (uid, email, displayName) => ({
    id: uid,
    name: displayName || (email ? email.split('@')[0] : `User ${uid.substring(0,6)}`),
    avatar: 'fa-user-astronaut',
    level: 'N/A',
    points: 0,
    badges: [],
    role: 'student',
    age: '',
    gradeLevel: '',
    gender: '',
    streak: 0,
    pinnedCourses: [],
    title: '',
    subject: ''
  });

  try{
    console.log('Listing up to 1000 auth users...');
    const res = await auth.listUsers(1000);
    const toCreate = [];
    for(const u of res.users){
      const uid = u.uid;
      const docRef = firestore.collection('users').doc(uid);
      const snap = await docRef.get();
      if (!snap.exists){
        console.log('Will create user doc for', uid, u.email || u.phoneNumber || 'no-email');
        toCreate.push({uid, email: u.email, displayName: u.displayName});
      } else {
        console.log('Already has doc:', uid);
      }
    }

    for(const item of toCreate){
      const docRef = firestore.collection('users').doc(item.uid);
      const docData = defaultUser(item.uid, item.email, item.displayName);
      await docRef.set(docData);
      console.log('Created doc for', item.uid);
    }

    console.log('Done. Created', toCreate.length, 'user docs.');
  } catch(e){
    console.error('Error during sync:', e.message || e);
  }

  process.exit(0);
}

run();
