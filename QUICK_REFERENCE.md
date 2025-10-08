# 📱 English for Business - Quick Reference Card

## 🎯 What You Have

**Mobile-First Business English Learning Platform**

### ✅ Completed
- Mobile-optimized UI (Portrait-first, Touch-friendly)
- 6 Business Modules (Email, Meetings, Presentations, etc.)
- PWA Ready (Install as app on iOS/Android)
- AI Features (Email grader, Meeting simulator, etc.)
- Gamification (S-Score, Streaks, Achievements)
- Complete Documentation

### ⏳ Required Setup (15 mins)
1. Firebase configuration
2. .env file setup
3. Test on mobile

---

## 🚀 Quick Commands

```bash
# Development
npm run dev                    # Start local server
npm run dev -- --host          # Start with mobile access

# Building
npm run build                  # Production build
npm run preview                # Preview production

# Firebase
firebase deploy                # Deploy to hosting
```

---

## 📱 Mobile Testing

```bash
# 1. Get your IP
ipconfig                       # Windows
ifconfig                       # Mac/Linux

# 2. Start with network access
npm run dev -- --host

# 3. Open on phone
http://YOUR_IP:5173
```

---

## 🎨 Quick Customization

### Change App Name
**File**: `constants.ts`
```typescript
export const APP_CONFIG = {
  name: 'Your Business English',
  shortName: 'YourBiz',
};
```

### Change Colors
**File**: `tailwind.config.cjs`
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
  }
}
```

### Change Logo
**Files**: 
- `public/images/logo/logo.png` (192x192)
- `public/images/logo/logo-lighting.png` (512x512)

---

## 📚 6 Business Modules

| Module | Icon | Lessons | Focus |
|--------|------|---------|-------|
| Email Writing | 📧 | 2 | Professional email communication |
| Meeting Communication | 👥 | 2 | Meeting participation & etiquette |
| Business Presentations | 📊 | 1 | Public speaking & slide design |
| Negotiation | 🤝 | 1 | Persuasion & deal-making |
| Phone Communication | 📞 | 1 | Professional phone calls |
| Networking | 🌐 | 1 | Small talk & relationship building |

---

## 🤖 AI Features

| Feature | Cost | Function |
|---------|------|----------|
| Email Grader | 40 tokens | Grammar, tone, suggestions |
| Meeting Simulator | 80 tokens | Role-play scenarios |
| Presentation Coach | 100 tokens | Slide review, delivery tips |
| Negotiation Practice | 120 tokens | Deal simulation |

**Starting Tokens**: 100/month

---

## 📱 Mobile-First Features

✅ **44x44px** minimum touch targets  
✅ **Bottom navigation** for thumb access  
✅ **Safe area support** for iOS notch  
✅ **Touch feedback** on all interactions  
✅ **Portrait orientation** optimized  
✅ **PWA installable** on iOS/Android  
✅ **Offline support** with service worker  
✅ **Pull-to-refresh** ready  

---

## 🎮 Gamification System

### S-Score Points
- Complete lesson: **10 points**
- Pass test: **20 points**
- Perfect quiz: **30 points**
- Daily streak: **5 points**
- Email practice: **15 points**
- Meeting simulation: **25 points**
- Presentation practice: **30 points**

### Reward Tiers
- 🥉 **Bronze** (0-500): 100 AI tokens/month
- 🥈 **Silver** (501-1500): 250 tokens + themes
- 🥇 **Gold** (1501-3000): 500 tokens + premium
- 💎 **Platinum** (3001+): Unlimited access

---

## 🔧 Firebase Setup (5 mins)

1. **Create project**: https://console.firebase.google.com
2. **Enable Auth**: Email/Password + Google
3. **Create Firestore**: Production mode
4. **Get config**: Project Settings > Your apps > Web
5. **Create .env**: Copy `.env.business.example` to `.env`
6. **Fill values**: Paste Firebase config

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| **START_HERE.md** | 👈 Start with this |
| **TRANSFORMATION_COMPLETE.md** | What was done |
| **QUICK_START.md** | Detailed setup guide |
| **MOBILE_BEST_PRACTICES.md** | Mobile dev guide |
| **README_BUSINESS.md** | Full documentation |

---

## 🎯 Performance Targets

- ⚡ First Paint: **< 1.5s**
- ⚡ Interactive: **< 3.5s**
- ⚡ Lighthouse: **> 90/100**
- ⚡ Bundle Size: **< 500KB**

---

## ✅ Pre-Launch Checklist

### Development
- [ ] Firebase configured
- [ ] .env file created
- [ ] App runs locally
- [ ] Tested on mobile

### Customization
- [ ] Branding updated
- [ ] Colors customized
- [ ] Logo replaced
- [ ] Content reviewed

### Testing
- [ ] iOS Safari tested
- [ ] Android Chrome tested
- [ ] PWA installation works
- [ ] Offline mode works

### Deployment
- [ ] Production build successful
- [ ] Deployed to Firebase
- [ ] Custom domain (optional)
- [ ] Analytics configured

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Firebase error | Check .env file, restart server |
| Can't access mobile | Use `--host` flag, same WiFi |
| PWA won't install | Check manifest, use HTTPS |
| Build fails | Clear cache: `rm -rf node_modules && npm i` |

---

## 📞 Support

- 📖 **Docs**: See files above
- 🐛 **Issues**: GitHub Issues
- 📧 **Email**: support@ivs.edu.vn
- 🌐 **Website**: https://ivs.edu.vn

---

## 🎉 Next Steps

1. ✅ Read **START_HERE.md** (15 mins)
2. 🔧 Configure Firebase (5 mins)
3. 📱 Test on mobile (5 mins)
4. 🎨 Customize branding (30 mins)
5. 🚀 Deploy to production (15 mins)

**Total Time**: ~1 hour to launch! 🚀

---

<div align="center">

**Made with ❤️ for Business Professionals**

**IVS Education Technology**

</div>
