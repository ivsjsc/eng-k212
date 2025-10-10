# OAuth Configuration Guide for IVS English K-12 App

## 🔐 Microsoft OAuth Setup

### 1. Azure AD Application Registration

1. Go to [Azure Portal](https://portal.azure.com) → Azure Active Directory → App registrations
2. Click "New registration"
3. Configure:
   - **Name**: IVS English Learning App
   - **Supported account types**: Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts
   - **Redirect URI**: 
     - Type: Web
     - URI: `https://eng.ivsacademy.edu.vn`
     - Also add: `https://english-c0f9d.web.app` (Firebase hosting)
     - Also add: `http://localhost:5173` (Development)

### 2. Get Client Credentials

After registration:
- Copy **Application (client) ID** → This is your `VITE_MICROSOFT_CLIENT_ID`
- Copy **Directory (tenant) ID** → This is your `VITE_MICROSOFT_TENANT_ID`
- Go to "Certificates & secrets" → Create new client secret → Copy the **Value** (not the Secret ID)

### 3. Configure API Permissions

In your app registration:
1. Go to "API permissions"
2. Add these Microsoft Graph permissions:
   - `openid` (Sign users in)
   - `profile` (View users' basic profile)
   - `email` (View users' email address)
   - `User.Read` (Read user profile)
3. Click "Grant admin consent" (if you're admin)

### 4. Configure Authentication

1. Go to "Authentication" section
2. Under "Implicit grant and hybrid flows", enable:
   - ✅ ID tokens
   - ✅ Access tokens
3. Under "Advanced settings":
   - Allow public client flows: **No**
   - Enable the following mobile and desktop flows: **No**
4. Save changes

### 5. Configure Logout URL

1. In "Authentication" section → "Front-channel logout URL"
2. Add: `https://eng.ivsacademy.edu.vn/logout`
3. Save

### 6. Update Environment Variables

Create or update `.env` file:

```bash
# Microsoft OAuth
VITE_MICROSOFT_CLIENT_ID=your-client-id-here
VITE_MICROSOFT_TENANT_ID=your-tenant-id-here
VITE_MICROSOFT_REDIRECT_URI=https://eng.ivsacademy.edu.vn

# For development
# VITE_MICROSOFT_REDIRECT_URI=http://localhost:5173
```

---

## 🔵 LinkedIn OAuth Setup

### 1. Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click "Create app"
3. Fill in:
   - **App name**: IVS English Learning
   - **LinkedIn Page**: Your company page
   - **Privacy policy URL**: `https://eng.ivsacademy.edu.vn/legal/privacy-policy.html`
   - **App logo**: Upload your logo

### 2. Configure OAuth 2.0 Settings

1. Go to "Auth" tab
2. Add **Authorized redirect URLs**:
   - `https://eng.ivsacademy.edu.vn`
   - `https://english-c0f9d.web.app`
   - `http://localhost:5173` (for development)

### 3. Get Client Credentials

In "Auth" tab:
- Copy **Client ID** → This is your `VITE_LINKEDIN_CLIENT_ID`
- Copy **Client Secret** → This is your `VITE_LINKEDIN_CLIENT_SECRET`

### 4. Request OAuth Scopes

1. Go to "Products" tab
2. Request access to "Sign In with LinkedIn using OpenID Connect"
3. Wait for approval (usually instant)

### 5. Update Environment Variables

Add to `.env`:

```bash
# LinkedIn OAuth
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

---

## 🔥 Firebase Authentication Configuration

### 1. Enable OAuth Providers in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `english-c0f9d`
3. Go to Authentication → Sign-in method
4. Enable these providers:

#### Microsoft
- Click "Microsoft" → Enable
- **Application (client) ID**: Paste your Microsoft Client ID
- **Application (client) secret**: Create in Azure Portal → Certificates & secrets
- **Tenant ID**: Your Azure AD Tenant ID
- Save

#### Google
- Click "Google" → Enable (already enabled)
- Use Firebase-provided OAuth client

#### LinkedIn (if supported)
- Note: Firebase doesn't natively support LinkedIn
- Use custom token flow via Cloud Functions

### 2. Configure Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:
- ✅ `localhost` (for development)
- ✅ `english-c0f9d.web.app`
- ✅ `english-c0f9d.firebaseapp.com`
- ➕ Add: `eng.ivsacademy.edu.vn`
- ➕ Add: `ivsacademy.edu.vn`

---

## 🌐 Custom Domain Setup

### Current Status
- Firebase Hosting: `english-c0f9d.web.app`
- Custom Domain: `eng.ivsacademy.edu.vn` (to be configured)

### Steps to Connect Custom Domain

1. **In Firebase Console**:
   - Go to Hosting → Add custom domain
   - Enter: `eng.ivsacademy.edu.vn`
   - Follow DNS verification steps

2. **DNS Configuration** (at domain registrar):
   ```
   Type: A
   Name: eng
   Value: 151.101.1.195 (Firebase IP)
   
   Type: A
   Name: eng
   Value: 151.101.65.195 (Firebase IP)
   ```

3. **SSL Certificate**:
   - Firebase automatically provisions SSL
   - Wait 24-48 hours for propagation

---

## 👥 User Role-Based OAuth Mapping

### Student (Vietnamese)
- **Primary**: Email/Password (Firebase Auth)
- **Secondary**: Google OAuth
- **Tertiary**: Microsoft OAuth (for school accounts)
- **Language**: Default to Vietnamese

### Teacher (Vietnamese)
- **Primary**: Email/Password
- **Secondary**: Microsoft OAuth (for organization accounts)
- **Language**: Default to Vietnamese

### Teacher (Foreigner)
- **Primary**: Microsoft OAuth (recommended)
- **Secondary**: Google OAuth
- **Tertiary**: LinkedIn OAuth
- **Language**: Default to English

---

## 📱 MSAL Configuration (for future native app)

If building React Native or Desktop app:

```typescript
import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: process.env.VITE_MICROSOFT_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.VITE_MICROSOFT_TENANT_ID}`,
    redirectUri: 'https://eng.ivsacademy.edu.vn',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Login request
const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
};

// Initiate login
await msalInstance.loginPopup(loginRequest);
```

---

## ✅ Testing OAuth Flow

### 1. Development Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:5173
# Click "Login / Sign Up"
# Test each OAuth provider
```

### 2. Production Testing

```bash
# Build and deploy
npm run build
firebase deploy --only hosting

# Visit https://english-c0f9d.web.app
# Test OAuth flows
```

### 3. Verify User Profile

After successful login:
- ✅ User name displayed: "Xin chào, Nguyễn Văn A 👋"
- ✅ Role badge shown (Student/Teacher)
- ✅ S-Score widget visible (for students)
- ✅ Proper language selected based on role

---

## 🚨 Common Issues & Solutions

### Issue: "Redirect URI mismatch"
**Solution**: Ensure redirect URI in OAuth app matches exactly (including http/https)

### Issue: "Microsoft sign-in failed"
**Solution**: 
1. Check if `microsoftProvider` is initialized in `firebase.ts`
2. Verify Firebase Authentication has Microsoft enabled
3. Check browser console for detailed error

### Issue: "Popup blocked"
**Solution**: Use `signInWithRedirect` instead of `signInWithPopup`:
```typescript
await signInWithRedirect(auth, microsoftProvider);
```

### Issue: "LinkedIn not working"
**Solution**: LinkedIn requires custom implementation via Cloud Functions (not natively supported by Firebase)

---

## 📝 Next Steps

1. ✅ Update `.env.example` with all OAuth variables
2. ✅ Create Microsoft Azure AD app
3. ✅ Configure Firebase Authentication
4. ✅ Test OAuth flows in development
5. ✅ Deploy to production
6. ✅ Configure custom domain
7. ✅ Test with real users

---

## 📧 Support

For OAuth configuration help:
- Email: support@ivs.edu.vn
- Documentation: This file
- Firebase Console: https://console.firebase.google.com/project/english-c0f9d

---

**Last Updated**: October 7, 2025
**Maintained By**: IVS Development Team
