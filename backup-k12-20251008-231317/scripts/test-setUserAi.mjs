// Test harness runs in TEST_NO_ADMIN mode by default so no local service account is required.
process.env.TEST_NO_ADMIN = '1';

import { handler } from '../netlify/functions/setUserAi.js';

(async () => {
  // Run in TEST_NO_ADMIN mode so firebase-admin isn't required locally.
  process.env.TEST_NO_ADMIN = '1';
  const event = { httpMethod: 'POST', headers: { authorization: 'Bearer mock-admin-token' }, body: JSON.stringify({ uid: 'some-user', aiEnabled: true }) };
  const res = await handler(event, {});
  console.log('res', res);
})();
