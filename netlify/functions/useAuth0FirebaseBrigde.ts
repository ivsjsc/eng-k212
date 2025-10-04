import { useAuth0 } from '@auth0/auth0-react';
import { auth as fbAuth } from '../services/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuth0FirebaseBridge() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthenticated && fbAuth) {
        const claims = await getIdTokenClaims();
        const idToken = claims.__raw;
        const res = await fetch('/.netlify/functions/auth0-to-firebase', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ idToken })
        });
        const data = await res.json();
        await signInWithCustomToken(fbAuth, data.customToken);
        setReady(true);
      } else {
        setReady(false);
      }
    })();
  }, [isAuthenticated]);

  return { bridgeReady: ready };
}