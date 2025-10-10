# 🚀 Quick Start Guide - English for Business

## ⚡ 5-Minute Setup

### Prerequisites
```bash
✅ Node.js 18+ installed
✅ Git installed
✅ Firebase account created
✅ Code editor (VS Code recommended)
```

### Step 1: Clone & Install (2 mins)
```bash
# Navigate to project directory
cd e:\IVS\Apps\EnglishBusiness

# Install dependencies
npm install

# Should complete without errors
```

### Step 2: Firebase Setup (2 mins)
```bash
# 1. Go to https://console.firebase.google.com
# 2. Create new project: "english-for-business"
# 3. Enable Authentication (Email & Google)
# 4. Create Firestore database (Start in production mode)
# 5. Copy config from Project Settings > General

# 6. Create .env file
copy .env.business.example .env

# 7. Paste your Firebase config into .env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_PROJECT_ID=english-for-business
# ... etc
```

### Step 3: Start Development (1 min)
```bash
# Start dev server
npm run dev

# Open in browser
# http://localhost:5173

# Test on mobile (same WiFi network)
npm run dev -- --host
# http://YOUR_LOCAL_IP:5173
```

---

## 📱 Test on Your Phone

### Option 1: Local Network (Fastest)
```bash
# 1. Find your computer's IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# 2. Start dev server with --host flag
npm run dev -- --host

# 3. On your phone, open browser and go to:
http://192.168.1.XXX:5173
# Replace XXX with your IP
```

### Option 2: Deploy to Firebase (Public URL)
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize Firebase
firebase init hosting
# Select existing project
# Public directory: dist
# Configure as SPA: Yes

# 4. Build and deploy
npm run build
firebase deploy

# 5. Get URL
# https://english-for-business.web.app
```

---

## 🎨 Quick Customization

### Change App Name
```typescript
// constants.ts
export const APP_CONFIG = {
  name: 'Your Company English',
  shortName: 'YourCo',
  tagline: 'Master Business English',
};
```

### Change Colors
```javascript
// tailwind.config.cjs
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR', // Main brand color
      }
    }
  }
}
```

### Change Logo
```bash
# Replace these files:
public/images/logo/logo.png          # 192x192
public/images/logo/logo-lighting.png # 512x512
```

---

## 🧪 Quick Testing

### Test Email Module
```bash
# 1. Run app: npm run dev
# 2. Login with test account
# 3. Navigate to Email Writing module
# 4. Complete first lesson
# 5. Check if progress is saved
```

### Test Mobile Features
```bash
# 1. Open on mobile browser
# 2. Test bottom navigation
# 3. Test touch gestures
# 4. Add to home screen (PWA)
# 5. Test offline mode
```

### Test AI Features (If configured)
```bash
# 1. Get Gemini API key: https://ai.google.dev
# 2. Add to .env:
VITE_GEMINI_API_KEY=your_key

# 3. Restart dev server
# 4. Try AI Email Grader
# 5. Check token deduction
```

---

## 🐛 Common Issues & Fixes

### Issue: Firebase not connecting
```bash
# Check .env file exists and has correct values
# Restart dev server after changing .env
npm run dev

# Check browser console for errors
# Verify Firebase project is active
```

### Issue: App not loading on mobile
```bash
# Ensure phone and computer on same WiFi
# Check firewall isn't blocking port 5173
# Try different browser on phone
# Check computer IP hasn't changed
```

### Issue: PWA not installable
```bash
# Check manifest.webmanifest exists
# Verify HTTPS (or localhost)
# Check icons are correct sizes
# Look for service worker errors in DevTools
```

### Issue: Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build -- --verbose

# Check Node.js version
node --version  # Should be 18+
```

---

## 📚 Next Steps

### 1. Customize Content (1-2 hours)
- [ ] Edit `data/business-modules.ts`
- [ ] Add your company's vocabulary
- [ ] Customize lesson scenarios
- [ ] Add industry-specific examples

### 2. Configure AI Features (30 mins)
- [ ] Get Gemini API key
- [ ] Test AI Email Grader
- [ ] Adjust token costs
- [ ] Set usage limits

### 3. Design Customization (1 hour)
- [ ] Change color scheme
- [ ] Update logo and icons
- [ ] Customize fonts
- [ ] Add company branding

### 4. Deploy to Production (30 mins)
- [ ] Build production version
- [ ] Test production build
- [ ] Deploy to Firebase
- [ ] Set up custom domain

### 5. User Testing (1-2 days)
- [ ] Invite 5-10 beta testers
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Iterate on UX

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --host    # Start with network access

# Building
npm run build            # Production build
npm run preview          # Preview production build

# Firebase
firebase login           # Login to Firebase
firebase init            # Initialize Firebase
firebase deploy          # Deploy to hosting
firebase serve           # Test locally with Firebase

# Testing
npm test                 # Run tests
npm run lint             # Check code quality
npm run type-check       # TypeScript validation

# Maintenance
npm update               # Update dependencies
npm audit fix            # Fix security issues
npm run clean            # Clean build artifacts
```

---

## 💡 Pro Tips

### Tip 1: Use Mobile DevTools
```
Chrome DevTools > Toggle Device Toolbar (Ctrl+Shift+M)
- Test different devices
- Simulate touch events
- Throttle network speed
- Emulate sensors
```

### Tip 2: Hot Module Replacement
```
Vite provides instant updates without full page reload.
Just save your file and see changes immediately!
```

### Tip 3: Debug on Real Device
```
Chrome: chrome://inspect
Safari: Safari > Develop > [Your Phone]
Access full DevTools on real device!
```

### Tip 4: Use Lighthouse
```
Chrome DevTools > Lighthouse
Run audits for:
- Performance
- Accessibility
- Best Practices
- SEO
- PWA
```

---

## 🆘 Get Help

### Documentation
- 📖 [README_BUSINESS.md](./README_BUSINESS.md) - Full documentation
- 📱 [MOBILE_BEST_PRACTICES.md](./MOBILE_BEST_PRACTICES.md) - Mobile guide
- 🎨 [APP_CLONE_GUIDE.md](./APP_CLONE_GUIDE.md) - Architecture guide

### Community
- 💬 GitHub Issues: Report bugs
- 📧 Email: support@ivs.edu.vn
- 🌐 Website: https://ivs.edu.vn

### Resources
- [Vite Docs](https://vitejs.dev/)
- [React 19 Docs](https://react.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind Docs](https://tailwindcss.com/)

---

## ✅ Checklist

Before going live, make sure you have:

- [ ] ✅ App runs locally without errors
- [ ] ✅ Firebase connected and working
- [ ] ✅ Tested on iOS device
- [ ] ✅ Tested on Android device
- [ ] ✅ PWA installable
- [ ] ✅ Offline mode works
- [ ] ✅ AI features tested (if using)
- [ ] ✅ Custom branding applied
- [ ] ✅ Content customized
- [ ] ✅ Production build successful
- [ ] ✅ Deployed to Firebase
- [ ] ✅ Custom domain configured (optional)
- [ ] ✅ SSL certificate active
- [ ] ✅ Analytics configured
- [ ] ✅ Beta tested by users
- [ ] ✅ Documentation updated

---

## 🎉 You're Ready!

Your English for Business app is ready to help professionals improve their workplace communication skills!

**Good luck! 🚀**

---

**Need more help?** 
Open an issue on GitHub or email support@ivs.edu.vn
