const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config({ path: '.env.oauth' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Microsoft OAuth2 Configuration
const OAUTH_CONFIG = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  tenantId: process.env.OAUTH_TENANT_ID,
  redirectUri: process.env.OAUTH_REDIRECT_URI,
  authorizeUrl: `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/authorize`,
  tokenUrl: `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/token`,
  userInfoUrl: 'https://graph.microsoft.com/v1.0/me'
};

// Route: Initiate Microsoft OAuth login
app.get('/auth/microsoft', (req, res) => {
  const scopes = 'openid profile email User.Read';
  const state = req.query.state || 'default';

  const authUrl = new URL(OAUTH_CONFIG.authorizeUrl);
  authUrl.searchParams.set('client_id', OAUTH_CONFIG.clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', OAUTH_CONFIG.redirectUri);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('prompt', 'select_account');

  console.log('🔗 Redirecting to Microsoft OAuth:', authUrl.toString());
  res.redirect(authUrl.toString());
});

// Route: Handle OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code, error, error_description, state } = req.query;

  console.log('📨 OAuth callback received:', { code: code ? 'present' : 'missing', error, state });

  if (error) {
    console.error('❌ OAuth error:', error, error_description);
    return res.status(400).json({
      error: 'OAuth Error',
      details: { error, error_description }
    });
  }

  if (!code) {
    console.error('❌ Missing authorization code');
    return res.status(400).json({
      error: 'Missing Authorization Code',
      message: 'No authorization code received from Microsoft'
    });
  }

  try {
    // Exchange authorization code for access token
    console.log('🔄 Exchanging code for tokens...');

    const tokenParams = new URLSearchParams();
    tokenParams.append('client_id', OAUTH_CONFIG.clientId);
    tokenParams.append('client_secret', OAUTH_CONFIG.clientSecret);
    tokenParams.append('code', code);
    tokenParams.append('redirect_uri', OAUTH_CONFIG.redirectUri);
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('scope', 'openid profile email User.Read');

    const tokenResponse = await fetch(OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: tokenParams
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('❌ Token exchange error:', tokenData);
      return res.status(400).json({
        error: 'Token Exchange Failed',
        details: tokenData
      });
    }

    console.log('✅ Tokens received successfully');

    // Decode ID token to get user info (basic decoding, not full verification)
    let userInfo = null;
    if (tokenData.id_token) {
      try {
        const idTokenParts = tokenData.id_token.split('.');
        const payload = JSON.parse(Buffer.from(idTokenParts[1], 'base64').toString());
        userInfo = {
          sub: payload.sub,
          name: payload.name,
          email: payload.preferred_username || payload.email,
          given_name: payload.given_name,
          family_name: payload.family_name,
          picture: payload.picture
        };
        console.log('👤 User info from ID token:', userInfo);
      } catch (decodeError) {
        console.warn('⚠️ Could not decode ID token:', decodeError.message);
      }
    }

    // Optionally fetch additional user info from Microsoft Graph API
    if (tokenData.access_token) {
      try {
        console.log('📊 Fetching additional user info from Graph API...');
        const graphResponse = await fetch(OAUTH_CONFIG.userInfoUrl, {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Accept': 'application/json'
          }
        });

        if (graphResponse.ok) {
          const graphData = await graphResponse.json();
          userInfo = { ...userInfo, ...graphData };
          console.log('📊 Graph API data:', graphData);
        }
      } catch (graphError) {
        console.warn('⚠️ Could not fetch Graph API data:', graphError.message);
      }
    }

    // Create session token (JWT)
    const sessionToken = jwt.sign(
      {
        userId: userInfo?.sub || userInfo?.id,
        email: userInfo?.email,
        name: userInfo?.name,
        provider: 'microsoft',
        loginTime: new Date().toISOString()
      },
      process.env.JWT_SECRET || 'default-secret-change-in-production',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // In production, you would:
    // 1. Store user in database
    // 2. Create proper session
    // 3. Redirect to dashboard

    console.log('🎉 OAuth flow completed successfully');

    // For testing: return all data
    res.json({
      success: true,
      message: 'Microsoft OAuth successful!',
      user: userInfo,
      tokens: {
        access_token: tokenData.access_token ? 'present' : 'missing',
        id_token: tokenData.id_token ? 'present' : 'missing',
        refresh_token: tokenData.refresh_token ? 'present' : 'missing',
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type
      },
      sessionToken: sessionToken,
      redirectUrl: '/dashboard', // Where to redirect after login
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('💥 OAuth callback error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Route: Logout
app.post('/auth/logout', (req, res) => {
  // In production, invalidate session/token
  res.json({
    success: true,
    message: 'Logged out successfully',
    logoutUrl: `https://login.microsoftonline.com/${OAUTH_CONFIG.tenantId}/oauth2/v2.0/logout`
  });
});

// Route: Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    oauth: {
      configured: !!(process.env.OAUTH_CLIENT_ID && process.env.OAUTH_CLIENT_SECRET),
      tenantId: process.env.OAUTH_TENANT_ID,
      redirectUri: process.env.OAUTH_REDIRECT_URI
    }
  });
});

// Route: Test page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ENGLISH LEARNERS - Microsoft OAuth Test</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .btn { background: #0078d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
        .btn:hover { background: #106ebe; }
        .code { background: #f4f4f4; padding: 15px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>🔐 ENGLISH LEARNERS - Microsoft OAuth2 Test</h1>

      <div class="warning">
        <strong>⚠️ Important:</strong> Make sure to set your CLIENT_SECRET in .env.oauth file before testing!
      </div>

      <h2>🚪 Start Microsoft Login</h2>
      <a href="/auth/microsoft" class="btn">🔵 Sign in with Microsoft</a>

      <h2>📋 Test URLs</h2>
      <div class="code">
        Login URL: http://localhost:${PORT}/auth/microsoft<br>
        Callback URL: http://localhost:${PORT}/auth/callback<br>
        Health Check: http://localhost:${PORT}/health
      </div>

      <h2>🔧 Configuration</h2>
      <div class="code">
        Client ID: ${OAUTH_CONFIG.clientId}<br>
        Tenant ID: ${OAUTH_CONFIG.tenantId}<br>
        Redirect URI: ${OAUTH_CONFIG.redirectUri}<br>
        Client Secret: ${OAUTH_CONFIG.clientSecret ? '✅ Configured' : '❌ Missing - Set OAUTH_CLIENT_SECRET'}
      </div>

      <h2>📚 Instructions</h2>
      <ol>
        <li>Set your CLIENT_SECRET in .env.oauth file</li>
        <li>Click "Sign in with Microsoft" button</li>
        <li>Complete Microsoft login flow</li>
        <li>Check the JSON response for tokens and user info</li>
      </ol>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ENGLISH LEARNERS OAuth Server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔗 Microsoft Login: http://localhost:${PORT}/auth/microsoft`);

  if (!process.env.OAUTH_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET === 'your-client-secret-here') {
    console.warn('⚠️  WARNING: OAUTH_CLIENT_SECRET not set! Please configure it in .env.oauth');
  }
});

module.exports = app;