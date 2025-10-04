import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Auth0Test: React.FC = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    error
  } = useAuth0();

  if (isLoading) return <div>Loading Auth0...</div>;
  if (error) return <div style={{color:'red'}}>Auth0 error: {error.message}</div>;

  return (
    <div style={{padding: 32}}>
      <h1>Auth0 POC</h1>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login with GitHub</button>
      )}
      {isAuthenticated && (
        <>
          <pre style={{background:'#111',color:'#0f0',padding:16}}>
{JSON.stringify(user, null, 2)}
          </pre>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};