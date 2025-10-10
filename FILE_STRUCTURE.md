# 📂 English for Business - File Structure

## 🗂️ Directory Overview

```
EnglishBusiness/
├── 📱 Mobile-First Source Code
│   ├── components/          # React components
│   ├── data/                # Business content modules
│   ├── services/            # Firebase & API services
│   ├── utils/               # Helper functions
│   └── types.ts             # TypeScript definitions
│
├── 🎨 Configuration Files
│   ├── vite.config.ts       # Build configuration
│   ├── tailwind.config.cjs  # Mobile-first styling
│   ├── tsconfig.json        # TypeScript config
│   └── firebase.json        # Firebase hosting
│
├── 📱 PWA Assets
│   ├── public/
│   │   ├── manifest.webmanifest  # PWA manifest
│   │   ├── sw.js                 # Service worker
│   │   └── images/               # Icons & assets
│   └── index.html           # App entry point
│
├── 📚 Documentation (START HERE!)
│   ├── START_HERE.md        # 👈 Begin with this
│   ├── QUICK_REFERENCE.md   # Quick commands & tips
│   ├── TRANSFORMATION_COMPLETE.md  # What was done
│   ├── QUICK_START.md       # Detailed setup guide
│   ├── MOBILE_BEST_PRACTICES.md    # Mobile dev guide
│   ├── README_BUSINESS.md   # Full documentation
│   └── SETUP_CHECKLIST.md   # Implementation steps
│
└── 🔧 Setup & Deployment
    ├── .env.business.example    # Environment template
    ├── setup-business-app.ps1   # Cleanup script (used)
    └── deploy.ps1               # Deployment script
```

---

## 📱 Core Application Files

### Entry Points
```
index.html              # HTML template (Mobile-optimized)
index.tsx               # React app initialization
App.tsx                 # Main app component
```

### Configuration
```
constants.ts            # App constants (EDIT THIS for branding)
types.ts                # TypeScript types
firebase.ts             # Firebase initialization
vite.config.ts          # Build & dev server config
tailwind.config.cjs     # Mobile-first CSS config
```

### Components (Key Files)
```
components/
├── BusinessDashboard.tsx      # 📱 Main mobile dashboard
├── AuthPage.tsx               # Login/signup
├── Settings.tsx               # User settings
├── Sidebar.tsx                # Desktop navigation
├── BottomNavigation.tsx       # 📱 Mobile navigation
├── MobileComponents.tsx       # Mobile UI library
└── [Keep 30+ other components as-is]
```

### Business Content
```
data/
└── business-modules.ts        # 📝 6 BUSINESS MODULES
    ├── Email Writing
    ├── Meeting Communication
    ├── Business Presentations
    ├── Negotiation & Persuasion
    ├── Phone Communication
    └── Networking & Small Talk
```

### Services
```
services/
├── firebase.ts          # Auth, Firestore, Analytics
├── cacheService.ts      # Offline caching
└── sscoreService.ts     # Gamification logic
```

---

## 📚 Documentation Guide

### 🚀 Getting Started (Read in Order)

#### 1. START_HERE.md
**Read this first!** (15 minutes)
- Step-by-step setup
- Firebase configuration
- Mobile testing
- First user creation

#### 2. QUICK_REFERENCE.md
**Quick commands & tips** (5 minutes)
- Common commands
- Quick customization
- Module overview
- Troubleshooting

#### 3. TRANSFORMATION_COMPLETE.md
**What was accomplished** (10 minutes)
- Changes made
- Features added
- Mobile-first updates
- Next steps

### 📖 Detailed Documentation

#### 4. QUICK_START.md
**Comprehensive setup guide** (20 minutes)
- Prerequisites
- Installation steps
- Testing procedures
- Common issues

#### 5. MOBILE_BEST_PRACTICES.md
**Mobile development guide** (30 minutes)
- Touch optimization
- Performance tips
- Accessibility
- Testing strategies

#### 6. README_BUSINESS.md
**Complete app documentation** (45 minutes)
- Full feature list
- Tech stack details
- API documentation
- Deployment guide

#### 7. SETUP_CHECKLIST.md
**Implementation checklist**
- Manual tasks
- Configuration steps
- Testing requirements
- Launch checklist

---

## 🎯 Files You Should Edit

### 🔴 MUST EDIT (Required)

#### 1. `.env` (Create from template)
```bash
copy .env.business.example .env
# Add your Firebase credentials
```

#### 2. `constants.ts` (App branding)
```typescript
// Line 1-30: Update app name, defaults
export const MOCK_USER = {
  name: 'Your User',
  title: 'Your Title',
  // ...
};

export const APP_CONFIG = {
  name: 'Your Business English',
  shortName: 'YourBiz',
};
```

### 🟡 SHOULD EDIT (Customization)

#### 3. `tailwind.config.cjs` (Colors)
```javascript
// Line 15-25: Update brand colors
colors: {
  primary: {
    500: '#YOUR_COLOR',
  }
}
```

#### 4. `data/business-modules.ts` (Content)
```typescript
// Add your own lessons, vocabulary, activities
// Customize for your industry
```

#### 5. `public/manifest.webmanifest` (PWA)
```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "theme_color": "#YOUR_COLOR"
}
```

### 🟢 CAN EDIT (Optional)

#### 6. `components/BusinessDashboard.tsx`
- Add custom quick actions
- Modify module cards
- Change dashboard layout

#### 7. `index.html`
- Update meta tags
- Change app title
- Add custom scripts

---

## 🚫 Files NOT to Edit

### ❌ Keep As-Is (Core Framework)

```
✅ vite.config.ts         # Build system works perfectly
✅ tsconfig.json          # TypeScript config optimized
✅ firebase.ts            # Firebase integration stable
✅ postcss.config.cjs     # CSS processing configured
✅ firestore.rules        # Security rules tested
✅ services/*.ts          # Service layer stable
✅ utils/*.ts             # Utility functions work
```

### 🔒 Already Cleaned

These were removed by setup script:
```
❌ data/curriculum.ts     # Old K-12 data
❌ data/g10.ts, g11.ts   # Grade-specific content
❌ components/Curriculum.tsx        # Old component
❌ components/TeacherDashboard.tsx  # Old component
```

---

## 🗄️ Backup & Archive

### Created Automatically
```
backup-k12-20251008-231317/
└── [Complete backup of original K-12 app]

archive/
├── k12-docs/            # Old documentation
└── [Other archived files]
```

**Safe to delete after testing:** These are for reference only.

---

## 📦 Dependencies

### Production (package.json)
```json
{
  "react": "^19.1.1",           // UI framework
  "firebase": "^12.3.0",        // Backend services
  "@google/genai": "^1.19.0",   // Gemini AI
  "recharts": "^2.12.7",        // Charts
  "exceljs": "^4.4.0"           // Excel export
}
```

### Development
```json
{
  "vite": "^6.2.0",             // Build tool
  "typescript": "~5.8.2",       // Type system
  "tailwindcss": "^3.4.7",      // Styling
  "@vitejs/plugin-react": "^5.0.0"
}
```

---

## 🔧 Generated Files (Don't Edit)

```
node_modules/        # Dependencies (npm install creates this)
dist/                # Production build (npm run build creates this)
.firebase/           # Firebase deploy cache
package-lock.json    # Dependency lock file
```

---

## 🌐 Public Assets

```
public/
├── manifest.webmanifest      # PWA config
├── sw.js                     # Service worker
├── env.js                    # Runtime config fallback
├── images/
│   ├── logo/                 # App icons (REPLACE THESE)
│   │   ├── logo.png          # 192x192
│   │   └── logo-lighting.png # 512x512
│   └── business/             # Business content images
└── [Other static assets]
```

---

## 📝 Quick File Reference

### Need to...

**Change app name?**
→ Edit `constants.ts`, `package.json`, `manifest.webmanifest`

**Change colors?**
→ Edit `tailwind.config.cjs`

**Add content?**
→ Edit `data/business-modules.ts`

**Configure Firebase?**
→ Create `.env` file

**Deploy?**
→ Run `npm run build && firebase deploy`

**Fix bugs?**
→ Check `QUICK_START.md` troubleshooting

---

## 🎯 File Priority for New Developers

### Day 1 (Setup)
1. Read `START_HERE.md`
2. Create `.env` file
3. Edit `constants.ts`
4. Test locally

### Week 1 (Customization)
1. Update `tailwind.config.cjs`
2. Modify `data/business-modules.ts`
3. Customize `components/BusinessDashboard.tsx`
4. Replace logo images

### Week 2 (Content)
1. Add lessons to modules
2. Create custom components
3. Add business-specific features
4. Test on real devices

### Week 3 (Launch)
1. Production build
2. Firebase deployment
3. Custom domain setup
4. User testing

---

## 🆘 Lost? Start Here:

1. **Brand new?** → Read `START_HERE.md`
2. **Need quick command?** → See `QUICK_REFERENCE.md`
3. **Want full details?** → Read `README_BUSINESS.md`
4. **Having issues?** → Check `QUICK_START.md` troubleshooting
5. **Mobile questions?** → Read `MOBILE_BEST_PRACTICES.md`

---

<div align="center">

**📱 English for Business**

**Mobile-First Learning Platform**

Made with ❤️ by IVS Education Technology

</div>
