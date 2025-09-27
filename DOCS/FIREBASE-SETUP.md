# Firebase setup (local & deploy)

This document lists the exact steps to configure Firebase locally and for Netlify deployments.

## 1) Create local env file (do NOT commit)

Copy the example file and edit values:

```powershell
copy .env.local.example .env.local
code .env.local
```

The `.env.local` file should contain keys beginning with `VITE_`, which Vite exposes as `import.meta.env` in the client.

## 2) Login to Firebase CLI and select your project

```powershell
# install firebase-tools if needed
npm install -g firebase-tools
firebase login
# list projects and choose one
firebase projects:list
# set the active project for CLI
firebase use --add arctic-outpost-472823-r2
```

## 3) Deploy Firestore rules

```powershell
firebase deploy --only firestore:rules
```

## 4) Update Netlify environment variables

In Netlify site settings → Build & deploy → Environment → Edit Variables, add the following variables copied from your `.env.local`:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_DATABASE_URL
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

Then trigger a redeploy (or re-run the build) on Netlify so the environment variables are used during the production build.

## 5) Run the app locally and test

```powershell
npm run dev
# open http://localhost:5173
```

## Security notes

- Never commit `.env.local` or `service-account.b64` to the repository. `.gitignore` already covers these files.
- Use Netlify environment variables (or your cloud provider's secret store) for production secrets.
