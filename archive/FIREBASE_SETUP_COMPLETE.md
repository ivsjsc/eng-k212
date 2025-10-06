# Firebase Setup Complete ✅

## Cấu hình đã hoàn tất

### 1. Firebase Project
- **Project ID**: `english-c0f9d`
- **Project Number**: `1007733924723`
- **Display Name**: english-learners

### 2. Firestore Database
✅ Database đã được tạo (default)
✅ Security rules đã deploy
✅ Indexes đã deploy

### 3. Security Rules (firestore.rules)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{uid} {
      allow create: if signedIn();
      allow read, update, delete: if isOwner(uid) || isAdmin();
    }

    // Classes collection (teacher-doc schema)
    match /classes/{teacherId} {
      allow read, write: if isOwner(teacherId) || isAdmin();
    }

    // Tests collection (dev/testing)
    match /tests/{testId} {
      allow read, write: if signedIn();
    }
  }
}
```

### 4. Environment Variables (.env.local)
```bash
VITE_FIREBASE_API_KEY=AIzaSyB-SwBnsXJ9n2pXqp-CTlQaPffnF01wE-I
VITE_FIREBASE_AUTH_DOMAIN=english-c0f9d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=english-c0f9d
VITE_FIREBASE_STORAGE_BUCKET=english-c0f9d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1007733924723
VITE_FIREBASE_APP_ID=1:1007733924723:web:d3ae42984480e6d326db06
VITE_FIREBASE_MEASUREMENT_ID=G-T1RSW11LGN
```

### 5. Files Modified
- ✅ `.firebaserc` - Updated project ID to `english-c0f9d`
- ✅ `firestore.rules` - Updated security rules for classes/{teacherId} schema
- ✅ `firestore.indexes.json` - Clean indexes config
- ✅ `firebase.json` - Complete hosting + firestore config
- ✅ `services/analytics.ts` - New Firestore analytics service
- ✅ `src/hooks/useClassAnalytics.ts` - Updated to use Firestore

## Cách sử dụng

### Test local
```powershell
npm run dev
```

### Deploy to Firebase Hosting
```powershell
npm run build
firebase deploy --project english-c0f9d
```

### Deploy chỉ Firestore rules
```powershell
firebase deploy --only firestore:rules --project english-c0f9d
```

### Deploy chỉ Functions
```powershell
firebase deploy --only functions --project english-c0f9d
```

## Kiểm tra dữ liệu

### Xem Firestore data
https://console.firebase.google.com/project/english-c0f9d/firestore

### Xem Authentication users
https://console.firebase.google.com/project/english-c0f9d/authentication

### Xem Hosting
https://console.firebase.google.com/project/english-c0f9d/hosting

## Schema Firestore (Teacher-doc)

```
firestore/
├── users/
│   └── {userId}
│       ├── id: string
│       ├── name: string
│       ├── email: string
│       ├── role: 'student' | 'teacher'
│       └── ...
└── classes/
    └── {teacherId}  // Document ID = teacher's UID
        ├── class-1
        │   ├── name: string
        │   ├── teacherId: string
        │   └── students: Student[]
        ├── class-2
        └── ...
```

## Service Account (for CI/CD)

Nếu cần deploy từ GitHub Actions hoặc CI/CD:

1. Tạo service account key từ Firebase Console
2. Download JSON file
3. Base64 encode:
   ```powershell
   $content = Get-Content "serviceAccountKey.json" -Raw
   $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
   [Convert]::ToBase64String($bytes) | Out-File service-account.b64
   ```
4. Add to GitHub Secrets: `FIREBASE_SERVICE_ACCOUNT`

## Troubleshooting

### Lỗi 403 Permission Denied
```powershell
# Enable required APIs
gcloud services enable firestore.googleapis.com --project=english-c0f9d
gcloud services enable iam.googleapis.com --project=english-c0f9d
```

### Lỗi CORS
Đã được xử lý trong `firebase.json` với headers phù hợp.

### Lỗi Authentication
Kiểm tra `.env.local` có đúng API keys không, restart dev server sau khi thay đổi env.

---

**Setup completed on**: October 4, 2025
**Completed by**: GitHub Copilot
