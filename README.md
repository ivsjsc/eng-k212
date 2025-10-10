
# IVS English K-12 Learning Platform

Immersive bilingual learning workspace for IVS students and teachers. The app now features a refreshed, glassmorphism-inspired interface and a production-ready Firebase Authentication flow with email, phone (OTP), and Google sign-in support.

## ✨ Highlights

- **Modern UI:** Responsive gradient shell, redesigned sidebar, and polished mobile auth screens with bilingual copy.
- **Verified auth flow:** Email/Password signup with verification enforcement, phone OTP login, Google redirect, password reset dialog, and guest trials.
- **Role-aware dashboards:** Student and teacher experiences, AI-powered utilities, analytics, and assistive navigation.
- **Complete Curriculum:** THCS (Grades 6-9) + THPT (Grades 10-12) with 330 comprehensive lessons
- **Runtime-friendly config:** Works with Vite `.env` variables or an optional `public/env.js` fallback for rapid deployments.

## 🧰 Prerequisites

- Node.js 20.x (or the version supported by Vite 6)
- npm 10+
- Firebase project with Authentication (Email/Password, Phone, Google) and Firestore enabled

## 🚀 Getting Started

1. **Install dependencies**
	```bash
	npm install
	```

2. **Configure Firebase**
	- Duplicate `env.example` to `.env.local` and fill in your Firebase credentials (`VITE_FIREBASE_*`).
	- (Optional) For hosting scenarios where environment variables are hard to inject, you can serve a `public/env.js` file and populate `window.__FIREBASE_CONFIG__` with the same values. At runtime these override missing `VITE_` variables.
	- In the Firebase console, enable the sign-in providers you plan to use (Email/Password, Phone, Google) and add your local/dev domains to **Authentication → Settings → Authorized domains**.

3. **Run locally**
	```bash
	npm run dev
	```
	The app is powered by Vite; hot module replacement is enabled out of the box.

4. **Build for production**
	```bash
	npm run build
	```

## � Curriculum Overview

The platform includes a comprehensive K-12 English curriculum:

### THCS (Grades 6-9) - Enhanced
- **120 lessons** across 4 grades (30 lessons/grade)
- **40 units** with 3 lessons each
- Features: IPA pronunciation, detailed grammar, 7 activities/lesson
- Seamless transition to THPT

### THPT (Grades 10-12) - Advanced
- **210 lessons** across 3 grades (70 lessons/grade)
- **30 units** with 7 lessons each (Getting Started, Language Focus, Reading, Speaking, Listening, Writing, Culture/CLIL)
- Features: Academic vocabulary, complex grammar, university preparation
- Textbook-quality content with bilingual support

**Total: 330 comprehensive lessons** ready for deployment.

## 🎨 UI Improvements

- Full-app aurora/glass background, updated Tailwind content scanning, and responsive layout constraints for consistent readability.
- Sidebar rebuilt with gradient pills, glowing user card, and hover states that adapt to dark/light preference.
- Mobile header transformed into a floating control bar to match the new aesthetic.
- Auth page marketing hero provides role-based messaging in Vietnamese and English.

## 📁 Project Structure

```
├── App.tsx                # Shell, routing, auth state orchestration
├── components/            # UI primitives and feature modules
├── services/firebase.ts   # Single client-side Firebase bootstrap
├── src/styles/            # Tailwind enhancements & custom CSS
├── env.example            # Template for local environment variables
└── env.js                 # Optional runtime Firebase overrides (placeholder values)
```

## ✅ Quality Checks

- `npm run build` – Ensures the Vite bundle and TypeScript compilation succeed.
- Consider running targeted component tests or Storybook snapshots (if available) after adding new UI flows.

## 🛠️ Deployment Notes

- Follow `DEPLOY.md` for Netlify/Firebase Hosting instructions already included in the repository.
- If you rely on `env.js`, remember to update the file during each deployment and avoid committing real project secrets.

## 🙌 Contributing

1. Fork, branch, and implement changes.
2. Run the build locally.
3. Open a pull request describing UI/feature updates; include screenshots for visual tweaks.

Enjoy the upgraded IVS English experience!

