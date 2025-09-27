import fs from 'fs';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const backupPath = new URL('../service-account-backup/service-account.json', import.meta.url).pathname;

if (!fs.existsSync(backupPath)) {
  console.error('Backup service account not found at', backupPath);
  process.exit(1);
}

const raw = fs.readFileSync(backupPath, 'utf8');
process.env.SERVICE_ACCOUNT_JSON = raw;

import { handler } from '../netlify/functions/setUserAi.js';

(async () => {
  const event = {
    httpMethod: 'POST',
    headers: { authorization: 'Bearer invalid-token' },
    body: JSON.stringify({ uid: 'some-uid', aiEnabled: true }),
  };
  const res = await handler(event, {});
  console.log('Response:', res);
})();
