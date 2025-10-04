main-auth0-wrapper.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const useAuth0 = import.meta.env.VITE_USE_AUTH0 === 'true';

const Root = () => {
  if (!useAuth0) return <App />;
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN!}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);