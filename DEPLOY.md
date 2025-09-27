# Deploy & Admin guide

## Prepare and deploy Cloud Function (setUserAi)

1. Ensure Firebase CLI is installed and you're logged in:

```pwsh
npm install -g firebase-tools
firebase login
```

2. Choose your Firebase project (one-time):

```pwsh
cd e:\IVS\Apps\eng-k212\eng-k212
firebase use --add
# follow interactive prompts and select `arctic-outpost-472823-r2` (your project)
```

3. Deploy functions:

```pwsh
cd functions
npm install
cd ..
firebase deploy --only functions:setUserAi
```

## Set an admin user locally (using service account)

1. In Firebase Console -> Project Settings -> Service accounts -> Generate new private key. Save `service-account.json` locally (DO NOT commit it).

2. Run the script to set admin & ai claim for a user:

```pwsh
node scripts/set-admin-claim.js .\service-account.json TARGET_UID --admin --ai
```

## Notes
- Ensure `functions/index.js` is the code you want to deploy. It expects to run in Firebase Functions environment.
- After setting custom claims, the user may need to sign out and sign in again (or call `getIdToken(true)`) to refresh the token and see updated claims.
