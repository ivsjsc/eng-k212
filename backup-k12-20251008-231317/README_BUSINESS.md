# 📱 English for Business - Mobile-First Learning Platform

> **Master Business English on the go** - Professional workplace communication made easy

[![Mobile First](https://img.shields.io/badge/Mobile-First-blue.svg)](https://www.mobile-first.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)

---

## 🎯 What is English for Business?

**English for Business** is a mobile-first learning platform designed for business professionals who need to master workplace English communication. Whether you're preparing for meetings, writing emails, or giving presentations, our app helps you practice and improve on the go.

### ✨ Key Features

- 📧 **Email Writing** - Master professional email communication
- 👥 **Meeting Skills** - Practice meeting language and etiquette
- 📊 **Presentations** - Deliver confident business presentations
- 🤝 **Negotiation** - Learn persuasive communication techniques
- 📞 **Phone Calls** - Handle professional phone conversations
- 🌐 **Networking** - Build business relationships with confidence

---

## 📱 Mobile-First Design

### Why Mobile First?

- ✅ **Learn Anywhere** - Study during commute, breaks, or downtime
- ✅ **Touch-Optimized** - Designed for finger-friendly interactions
- ✅ **Quick Sessions** - 5-10 minute lessons fit into busy schedules
- ✅ **Offline Ready** - PWA technology works without internet
- ✅ **Native Feel** - Install as app on iOS/Android

### Mobile Features

- 📱 Portrait-optimized layout
- 👆 Touch-friendly buttons (min 44x44px)
- 🔄 Pull-to-refresh functionality
- 💾 Offline content caching
- 🔔 Push notifications for practice reminders
- 📍 Bottom navigation for easy thumb access

---

## 🏗️ Tech Stack

```
Frontend:
├── React 19 - Modern UI library
├── TypeScript - Type-safe development
├── Tailwind CSS - Mobile-first styling
├── Vite - Fast build tool
└── PWA - Progressive Web App

Backend:
├── Firebase Authentication
├── Firestore Database
├── Firebase Hosting
└── Cloud Functions

AI Integration:
├── Google Gemini AI
├── OpenAI (optional)
└── Speech Recognition API
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- AI API keys (Gemini/OpenAI)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/english-business.git
cd english-business

# Install dependencies
npm install

# Copy environment file
cp .env.business.example .env

# Configure Firebase & AI keys in .env
# Edit .env file with your credentials

# Start development server
npm run dev

# Open on mobile device
# Navigate to http://YOUR_LOCAL_IP:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Deploy to Firebase
firebase deploy
```

---

## 📚 Learning Modules

### 1️⃣ Email Writing (6 Lessons)
- Email structure and formatting
- Request and response emails
- Complaint handling
- Meeting invitations
- Follow-up emails
- Newsletter writing

### 2️⃣ Meeting Communication (5 Lessons)
- Meeting preparation
- Active participation
- Expressing opinions
- Handling disagreements
- Meeting minutes

### 3️⃣ Presentation Skills (5 Lessons)
- Presentation structure
- Visual aids usage
- Body language
- Handling questions
- Delivery techniques

### 4️⃣ Negotiation & Persuasion (4 Lessons)
- Negotiation basics
- Persuasive language
- Handling objections
- Win-win solutions

### 5️⃣ Phone Communication (3 Lessons)
- Professional greetings
- Taking messages
- Transferring calls

### 6️⃣ Networking & Small Talk (3 Lessons)
- Conversation starters
- Business card exchange
- Follow-up strategies

---

## 🤖 AI Features

### Email Grader (40 tokens)
- Grammar and spelling check
- Tone analysis
- Professional suggestions
- Templates and examples

### Meeting Simulator (80 tokens)
- AI role-play scenarios
- Real-time feedback
- Cultural tips
- Pronunciation help

### Presentation Coach (100 tokens)
- Slide structure review
- Language refinement
- Delivery timing
- Q&A preparation

### Negotiation Practice (120 tokens)
- Simulated negotiations
- Counter-offer strategies
- Cultural considerations
- Win-win techniques

---

## 🎮 Gamification System

### S-Score Points
- ✅ Complete lesson: 10 points
- ✅ Pass test: 20 points
- ✅ Perfect quiz: 30 points
- ✅ Daily streak: 5 points/day
- ✅ Email practice: 15 points
- ✅ Meeting simulation: 25 points
- ✅ Presentation practice: 30 points

### Reward Tiers
| Tier | Points | Benefits |
|------|--------|----------|
| 🥉 Bronze | 0-500 | 100 AI tokens/month |
| 🥈 Silver | 501-1500 | 250 AI tokens/month + Custom themes |
| 🥇 Gold | 1501-3000 | 500 AI tokens/month + Premium features |
| 💎 Platinum | 3001+ | Unlimited AI access + VIP support |

---

## 📱 Mobile Optimization Guidelines

### Performance Targets
- ⚡ First Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 3.5s
- ⚡ Lighthouse Score: > 90/100
- ⚡ Bundle Size: < 500KB (gzipped)

### Design Principles
1. **Thumb-Friendly Navigation** - Bottom bar for primary actions
2. **Large Touch Targets** - Minimum 44x44px clickable areas
3. **Readable Typography** - 16px+ for body text
4. **High Contrast** - WCAG AA compliant colors
5. **Minimal Scrolling** - One-screen content chunks
6. **Instant Feedback** - Visual response to all interactions

### Browser Support
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+
- ✅ Samsung Internet
- ✅ Edge Mobile
- ✅ Firefox Mobile

---

## 🔧 Configuration

### Environment Variables

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase configs

# AI Services
VITE_GEMINI_API_KEY=your_gemini_key
VITE_OPENAI_API_KEY=your_openai_key

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_VOICE_RECOGNITION=true
VITE_ENABLE_EMAIL_GRADER=true
```

### PWA Configuration

Edit `public/manifest.webmanifest`:
- App name and short name
- Theme colors
- Icons (192x192, 512x512)
- Start URL
- Display mode

---

## 📊 Analytics & Tracking

### User Metrics
- Daily active users (DAU)
- Session duration
- Module completion rates
- AI feature usage
- Retention rates

### Learning Analytics
- Lesson progress
- Quiz scores
- AI interaction quality
- Time spent per module
- Most practiced skills

---

## 🔒 Security & Privacy

### Data Protection
- ✅ Firebase Authentication
- ✅ Firestore security rules
- ✅ HTTPS only
- ✅ No sensitive data in localStorage
- ✅ API key protection

### Privacy Features
- ✅ Anonymous usage analytics
- ✅ No tracking without consent
- ✅ Data export available
- ✅ Account deletion option
- ✅ GDPR compliant

---

## 🚀 Deployment

### Firebase Hosting

```bash
# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### Custom Domain Setup

```bash
# Add custom domain in Firebase Console
firebase hosting:channel:deploy production
```

### CI/CD with GitHub Actions

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
```

---

## 📖 Documentation

- [User Guide](./docs/USER_GUIDE.md)
- [API Documentation](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)
- [Mobile Best Practices](./docs/MOBILE_BEST_PRACTICES.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/english-business.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create pull request
git push origin feature/amazing-feature
```

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👥 Team

**IVS Education Technology**
- Website: [https://ivs.edu.vn](https://ivs.edu.vn)
- Email: support@ivs.edu.vn
- GitHub: [@ivsjsc](https://github.com/ivsjsc)

---

## 🙏 Acknowledgments

- React Team for React 19
- Firebase Team for backend services
- Google for Gemini AI
- Tailwind Labs for Tailwind CSS
- Vite Team for blazing fast builds

---

## 📱 Download the App

<div align="center">

### Available on Web, iOS & Android

[📱 Launch Web App](https://english-business.web.app) | 
[🍎 App Store](#) | 
[🤖 Google Play](#)

</div>

---

<div align="center">

**Made with ❤️ for Business Professionals**

[⭐ Star this repo](https://github.com/your-org/english-business) | 
[🐛 Report Bug](https://github.com/your-org/english-business/issues) | 
[💡 Request Feature](https://github.com/your-org/english-business/issues)

</div>
