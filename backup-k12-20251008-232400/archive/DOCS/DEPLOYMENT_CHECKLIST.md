# ✅ Deployment Checklist - Firebase Hosting

## Pre-Deployment

- [x] **Firebase config đã được cập nhật**
  - `.env.local` có đầy đủ Firebase credentials
  - `env.js` có runtime config cho production
  
- [x] **Build configuration đúng**
  - `firebase.json` trỏ đến folder `dist`
  - `index.html` load `env.js` trước khi load app
  
- [x] **Code đã được build thành công**
  ```bash
  npm run build
  ```

## Deployment Steps

### 1. Set hosting target (chỉ cần làm 1 lần)
```bash
firebase target:apply hosting app english-c0f9d
```

### 2. Build app
```bash
npm run build
```

### 3. Deploy to Firebase Hosting
```bash
firebase deploy --only hosting:app
```

### 4. Verify deployment
- Mở URL: https://english-c0f9d.web.app
- Check console không có lỗi Firebase
- Test đăng nhập

## Quick Deploy Script

Tạo file `deploy.ps1` để deploy nhanh:

```powershell
# deploy.ps1
Write-Host "🚀 Building app..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📦 Deploying to Firebase..." -ForegroundColor Cyan
    firebase deploy --only hosting:app
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deployment successful!" -ForegroundColor Green
        Write-Host "🌐 Live at: https://english-c0f9d.web.app" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
}
```

Chạy: `.\deploy.ps1`

## Post-Deployment Checks

### 1. Test Authentication
- [ ] Email/Password login
- [ ] Google OAuth login
- [ ] Phone number OTP login
- [ ] Password reset
- [ ] Email verification

### 2. Test Navigation
- [ ] Role selection page
- [ ] Login → Dashboard redirect
- [ ] Sidebar navigation
- [ ] Settings page
- [ ] Logout

### 3. Test Features
- [ ] Student dashboard
- [ ] Teacher dashboard
- [ ] Class management (teachers only)
- [ ] AI content generator
- [ ] Writing grader
- [ ] Speaking partner

### 4. Browser Console Check
```javascript
// Check Firebase initialized
console.log(window.__FIREBASE_CONFIG__);

// Check auth service
console.log(auth); // Should not be null

// Check user logged in
console.log(auth.currentUser);
```

## Rollback (nếu cần)

### Rollback to previous version
```bash
firebase hosting:rollback english-c0f9d
```

### Deploy specific version
```bash
firebase hosting:clone english-c0f9d:VERSION_ID english-c0f9d:live
```

## Troubleshooting

### Issue: "Authentication service not ready"
**Solution**: 
1. Check `env.js` được load trong `index.html`
2. Verify Firebase config trong `env.js`
3. Clear browser cache

### Issue: "Blank page after deployment"
**Solution**:
1. Check `firebase.json` trỏ đến `dist` folder
2. Check `dist/` có file `index.html`
3. Check rewrites config trong `firebase.json`

### Issue: "Login redirects to 404"
**Solution**:
1. Check rewrites trong `firebase.json`:
   ```json
   "rewrites": [
     {
       "source": "**",
       "destination": "/index.html"
     }
   ]
   ```

### Issue: "Firebase config undefined"
**Solution**:
1. Rebuild: `npm run build`
2. Check `dist/env.js` exists
3. Redeploy: `firebase deploy --only hosting:app`

## URLs

- **Production**: https://english-c0f9d.web.app
- **Alt URL**: https://english-c0f9d.firebaseapp.com
- **Console**: https://console.firebase.google.com/project/english-c0f9d/hosting
- **Local Preview**: http://localhost:4173 (run `npm run preview`)

## Environment Variables

### Build-time (.env.local)
```bash
VITE_FIREBASE_API_KEY=AIzaSyB-SwBnsXJ9n2pXqp-CTlQaPffnF01wE-I
VITE_FIREBASE_AUTH_DOMAIN=english-c0f9d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=english-c0f9d
VITE_FIREBASE_STORAGE_BUCKET=english-c0f9d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1007733924723
VITE_FIREBASE_APP_ID=1:1007733924723:web:d3ae42984480e6d326db06
VITE_FIREBASE_MEASUREMENT_ID=G-T1RSW11LGN
```

### Runtime (env.js)
Loaded dynamically in browser via `<script src="/env.js"></script>`

---

**Last Updated**: October 4, 2025  
**Status**: ✅ Deployed and working
