// Helper to call Netlify function from client; uses firebase auth to get fresh id token.
import { auth } from './firebase';
import type { User } from 'firebase/auth';

async function getIdTokenOrThrow(user: User | null) {
  if (!user) throw new Error('Not authenticated');
  // force refresh to pick up latest claims when needed
  return await user.getIdToken(true);
}

/**
 * Call Netlify function to set aiEnabled for a user.
 * Requires the current user to be admin (token will be verified server-side).
 */
export async function setUserAiNetlify(targetUid: string, aiEnabled: boolean) {
  const user = auth?.currentUser;
  if (!user) throw new Error('Not signed in');

  const idToken = await getIdTokenOrThrow(user);

  const res = await fetch('/.netlify/functions/setUserAi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ uid: targetUid, aiEnabled })
  });

  const payload = await res.json();
  if (!res.ok) throw new Error(payload?.error || 'setUserAi failed');
  return payload;
}