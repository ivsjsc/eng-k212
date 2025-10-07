# IVS Academy PWA Integration Guide

Mục tiêu tài liệu này là hướng dẫn từng bước để tích hợp Firebase Authentication và Firestore, cấu hình PWA để cài đặt trên iOS và Android, và chuẩn bị file hồ sơ cấu hình để triển khai shortcut cho toàn hệ thống IVS.

---

## Yêu cầu chuẩn bị

- Tên miền HTTPS hoạt động https://eng.ivsacademy.edu.vn  
- Quyền truy cập repository Git và hosting hoặc CI/CD (Firebase Hosting, Vercel, Netlify)  
- Node.js và npm đã cài trên máy phát triển  
- Tài khoản Firebase với quyền tạo project  
- Visual Studio Code hoặc editor tương tự

---

## Kiến trúc tổng quan

- Frontend SPA React hoặc tương tự phục vụ giao diện học và gọi API AI  
- Firebase Authentication dùng Google và Microsoft làm provider chính  
- Firestore lưu người dùng, tiến độ, và tương tác AI  
- PWA manifest và Service Worker để hỗ trợ Add to Home Screen và offline cache  
- Tùy chọn: .mobileconfig để push shortcut PWA cho iOS qua MDM hoặc gửi trực tiếp

---

## Cấu trúc file mẫu và vị trí trong repo

- public/manifest.json  
- public/sw.js  
- public/offline.html  
- public/icons/icon-192.png  
- public/icons/icon-512.png  
- src/firebaseConfig.js  
- src/auth.js  
- src/aiService.js  
- src/index.js (hoặc main entry)  
- firebase.rules (Firestore security rules)  
- mobileconfig/ivs-shortcut.mobileconfig

---

## Firebase Project thiết lập

1. Tạo project Firebase mới đặt tên ivs-academy-prod.  
2. Bật Firestore và chọn chế độ Production.  
3. Bật Firebase Authentication.  
4. Kích hoạt Sign-in Providers: Google, Microsoft, Email/Password nếu cần.  
5. Tạo Web App trong Firebase để lấy config và lưu các biến môi trường: FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID.  
6. Bật App Check nếu muốn hạn chế request đến backend giả mạo.

---

## File manifest.json mẫu

Lưu file này vào public/manifest.json

```json
{
  "name": "IVS English",
  "short_name": "IVS",
  "start_url": "/?source=homescreen",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4a90e2",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## Service Worker mẫu

Lưu file này vào public/sw.js

```js
const CACHE_NAME = 'ivs-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/main.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => caches.match('/offline.html'))
  );
});
```

---

## Offline fallback trang mẫu

Lưu file này vào public/offline.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Offline</title>
  </head>
  <body>
    <h1>Offline</h1>
    <p>Ứng dụng hiện đang ngoại tuyến. Vui lòng kiểm tra kết nối mạng.</p>
  </body>
</html>
```

---

## Đăng ký Service Worker trên client

Thêm đoạn sau vào src/index.js hoặc file khởi tạo app

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.error('SW register failed', err));
  });
}
```

---

## Firebase modular SDK cấu hình

Tạo src/firebaseConfig.js

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
```

---

## Module auth.js mẫu

Tạo src/auth.js

```js
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, microsoftProvider, db } from "./firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  await upsertUser(result.user);
  return result.user;
}

export async function signInWithMicrosoft() {
  const result = await signInWithPopup(auth, microsoftProvider);
  await upsertUser(result.user);
  return result.user;
}

export async function upsertUser(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    displayName: user.displayName || "",
    email: user.email || "",
    avatarUrl: user.photoURL || "",
    role: "student",
    lastLogin: serverTimestamp(),
    createdAt: serverTimestamp()
  }, { merge: true });
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
```

---

## Module aiService.js mẫu

Tạo src/aiService.js

```js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function logAiInteraction(userId, question, response, tokensUsed = 0) {
  const col = collection(db, "aiInteractions");
  await addDoc(col, {
    userId,
    question,
    response,
    tokensUsed,
    timestamp: serverTimestamp()
  });
}
```

---

## Firestore security rules mẫu

Lưu file firebase.rules và deploy bằng CLI

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, update: if request.auth != null && request.auth.uid == uid;
      allow create: if request.auth != null && request.auth.uid == uid;
      allow delete: if false;
    }
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    match /progress/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    match /aiInteractions/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## Backend verify ID token mẫu Node

Tạo đoạn verify token backend nếu cần

```js
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

export async function verifyIdToken(idToken) {
  const decoded = await admin.auth().verifyIdToken(idToken);
  return decoded;
}
```

---

## Tạo .mobileconfig để push shortcut PWA

Lưu file mobileconfig/ivs-shortcut.mobileconfig

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadDisplayName</key>
      <string>IVS English Shortcut</string>
      <key>PayloadIdentifier</key>
      <string>com.ivs.shortcut.bookmark</string>
      <key>PayloadType</key>
      <string>com.apple.webClip.managed</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>Label</key>
      <string>IVS English</string>
      <key>Precomposed</key>
      <false/>
      <key>URL</key>
      <string>https://eng.ivsacademy.edu.vn</string>
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>IVS Mobile Profile</string>
  <key>PayloadIdentifier</key>
  <string>com.ivs.mobileprofile</string>
  <key>PayloadRemovalDisallowed</key>
  <false/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>PUT-UUID-HERE</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```

Hướng dẫn sử dụng mobileconfig  
- Host file trên HTTPS, gửi link cho người dùng.  
- Người dùng mở Safari trên iOS, tải file, vào Cài đặt > Đã tải về hồ sơ để cài.

---

## CI CD và deploy nhanh

1. Build project

```bash
npm run build
```

2. Deploy lên Firebase Hosting

```bash
firebase deploy --only hosting
```

3. Lưu biến môi trường trong hosting provider hoặc CI cho cấu hình Firebase.

---

## Test checklist trước rollout

- [ ] HTTPS hoạt động trên domain chính  
- [ ] Firebase Auth đăng nhập Google và Microsoft thành công  
- [ ] Sau đăng nhập Firestore có document users/{uid}  
- [ ] Service Worker đăng ký và cache hoạt động cơ bản  
- [ ] Manifest hiển thị Add to Home Screen trên Safari và Chrome  
- [ ] .mobileconfig tải và cài vào iOS thử nghiệm nếu cần  
- [ ] Security rules kiểm tra bằng Rules Simulator  
- [ ] Sao lưu Firestore định kỳ đã thiết lập

---

## Ghi chú vận hành

- Lưu trữ khóa service account và API keys trong secret manager, không commit vào Git.  
- Giới hạn quyền ghi Firestore qua security rules và custom claims.  
- Theo dõi chi phí Firestore, Storage, và OpenAI nếu tích hợp AI.

---

## Các bước tiếp theo mình sẽ chuẩn bị nếu bạn yêu cầu

- Mã nguồn mẫu manifest, sw.js, firebaseConfig.js, auth.js, aiService.js để copy vào repo  
- Script deploy và ví dụ cấu hình CI/CD cho Vercel hoặc Firebase Hosting  
- Hướng dẫn cấu hình Microsoft OAuth step by step  
- Tệp .mobileconfig với UUID sẵn sàng để host

---