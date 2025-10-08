# 📱 Mobile-First Best Practices for English for Business

## 🎯 Core Principles

### 1. Mobile-First Design Philosophy
- Design for smallest screen first (320px)
- Progressive enhancement for larger screens
- Touch-first interaction patterns
- Thumb-friendly navigation zones

### 2. Performance Targets
```
✅ First Contentful Paint: < 1.5s
✅ Time to Interactive: < 3.5s
✅ Largest Contentful Paint: < 2.5s
✅ Cumulative Layout Shift: < 0.1
✅ First Input Delay: < 100ms
```

---

## 📐 Layout Guidelines

### Responsive Breakpoints
```css
/* Mobile First - Default */
.container { width: 100%; padding: 16px; }

/* Small phones */
@media (min-width: 375px) { }

/* Large phones */
@media (min-width: 428px) { }

/* Tablets */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Safe Areas (iOS Notch Support)
```css
.header {
  padding-top: env(safe-area-inset-top);
}

.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Thumb Zone Optimization
```
┌─────────────────┐
│   Hard to reach │ ← Avoid primary actions
│                 │
│   Easy reach    │ ← Secondary actions
│                 │
│   Natural zone  │ ← Primary actions (Bottom 1/3)
└─────────────────┘
```

---

## 👆 Touch Interaction

### Minimum Touch Target Sizes
```css
/* Apple HIG: 44x44pt */
/* Android: 48x48dp */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}

/* Spacing between targets */
.button + .button {
  margin-left: 8px; /* Min 8px gap */
}
```

### Touch Feedback
```tsx
// Immediate visual feedback
<button className="
  active:scale-95 
  active:bg-blue-700
  transition-transform duration-150
  touch-manipulation
">
  Click Me
</button>

// Disable system touch highlights
.touch-element {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

### Gesture Support
```tsx
// Swipe navigation
const handleSwipe = (direction: 'left' | 'right') => {
  if (direction === 'left') goToNext();
  if (direction === 'right') goToPrevious();
};

// Pull to refresh
const handlePullRefresh = () => {
  // Refresh content
};
```

---

## 🎨 Typography for Mobile

### Font Size Scale (Mobile-Optimized)
```css
/* Base: 16px for readability */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px - Headings */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### Line Height
```css
/* Taller line height for mobile */
body {
  font-size: 16px;
  line-height: 1.6; /* 25.6px */
}

h1, h2, h3 {
  line-height: 1.3;
}
```

### Readable Content Width
```css
.content {
  max-width: 65ch; /* ~65 characters */
  padding: 0 20px;
}
```

---

## 🎨 Color & Contrast

### WCAG AA Compliance
```css
/* Text contrast ratios */
--contrast-normal: 4.5:1;  /* Normal text */
--contrast-large: 3:1;     /* Large text (18px+) */

/* High contrast mode support */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}
```

### Dark Mode
```css
/* System preference detection */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f1f5f9;
  }
}

/* Manual toggle */
.dark {
  --bg: #0f172a;
  --text: #f1f5f9;
}
```

---

## ⚡ Performance Optimization

### Code Splitting
```tsx
// Lazy load heavy components
const BusinessDashboard = lazy(() => 
  import('./components/BusinessDashboard')
);

// Route-based splitting
const routes = [
  { path: '/dashboard', component: lazy(() => import('./Dashboard')) },
  { path: '/lessons', component: lazy(() => import('./Lessons')) },
];
```

### Image Optimization
```tsx
// Responsive images
<img 
  src="image-small.webp"
  srcSet="
    image-small.webp 400w,
    image-medium.webp 800w,
    image-large.webp 1200w
  "
  sizes="
    (max-width: 400px) 400px,
    (max-width: 800px) 800px,
    1200px
  "
  loading="lazy"
  alt="Description"
/>

// Native lazy loading
<img loading="lazy" />
```

### Font Loading
```html
<!-- Preload critical fonts -->
<link rel="preload" 
      href="/fonts/inter.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>

<!-- Font display strategy -->
<style>
  @font-face {
    font-family: 'Inter';
    font-display: swap; /* or optional */
  }
</style>
```

### Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze

# Target sizes
- JS bundle: < 300KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Total: < 500KB (gzipped)
```

---

## 📱 Progressive Web App (PWA)

### Manifest Configuration
```json
{
  "name": "English for Business",
  "short_name": "EngBiz",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "background_color": "#1e293b",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Service Worker Strategy
```javascript
// Cache-first for static assets
workbox.routing.registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst()
);

// Network-first for API calls
workbox.routing.registerRoute(
  /^https:\/\/api\./,
  new workbox.strategies.NetworkFirst()
);

// Offline fallback
workbox.precaching.precacheAndRoute([
  '/offline.html',
  '/assets/icons.svg'
]);
```

### Install Prompt
```tsx
const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  });
}, []);

const handleInstall = async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Install outcome:', outcome);
  setDeferredPrompt(null);
};
```

---

## 🔋 Battery & Data Efficiency

### Reduce Network Usage
```tsx
// Compress images
const optimizedImage = useImageCompression(image, {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1920,
});

// Use cache headers
fetch(url, {
  headers: {
    'Cache-Control': 'max-age=3600'
  }
});

// Implement pagination
const [page, setPage] = useState(1);
const ITEMS_PER_PAGE = 20;
```

### Battery-Conscious Features
```tsx
// Reduce animations on low battery
const [lowPowerMode, setLowPowerMode] = useState(false);

useEffect(() => {
  // Check battery status
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      setLowPowerMode(battery.level < 0.2);
    });
  }
}, []);

// Conditional animations
<div className={lowPowerMode ? '' : 'animate-bounce'}>
```

---

## ♿ Accessibility (A11y)

### Semantic HTML
```tsx
// Use proper HTML5 elements
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 IVS</p>
</footer>
```

### ARIA Labels
```tsx
// Descriptive labels
<button aria-label="Close modal">
  <i className="fas fa-times" aria-hidden="true"></i>
</button>

// Live regions
<div role="alert" aria-live="polite">
  Profile updated successfully!
</div>

// Skip links
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Keyboard Navigation
```tsx
// Focus management
const modalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);

// Trap focus in modals
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') trapFocus(e);
};
```

### Screen Reader Support
```tsx
// Hidden text for screen readers
<span className="sr-only">
  Loading, please wait...
</span>

// Announce changes
const [announcement, setAnnouncement] = useState('');

<div role="status" aria-live="polite" className="sr-only">
  {announcement}
</div>
```

---

## 📊 Analytics & Monitoring

### Performance Monitoring
```tsx
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking
```tsx
// Global error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to monitoring service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### User Analytics
```tsx
// Track user interactions
const trackEvent = (event: string, data: any) => {
  analytics.logEvent(event, data);
};

// Usage
trackEvent('lesson_completed', {
  lessonId: 'email-basics',
  duration: 300,
  score: 85
});
```

---

## 🧪 Testing Checklist

### Device Testing
- [ ] iPhone SE (smallest iOS screen)
- [ ] iPhone 14 Pro (notch)
- [ ] Samsung Galaxy S23
- [ ] iPad Mini
- [ ] iPad Pro
- [ ] Android tablet

### Browser Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet
- [ ] Firefox Mobile
- [ ] Edge Mobile

### Network Conditions
- [ ] 4G (fast)
- [ ] 3G (slow)
- [ ] 2G (very slow)
- [ ] Offline mode
- [ ] Flaky connection

### Orientation Testing
- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Orientation change handling
- [ ] Keyboard open/close

---

## 🔧 Development Tools

### Mobile Testing on Desktop
```bash
# Chrome DevTools
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select device or custom dimensions
- Test touch events
- Throttle network

# Remote Debugging
# Android
adb devices
chrome://inspect

# iOS (Safari)
Safari > Develop > [Your Device]
```

### Local Network Testing
```bash
# Get local IP
ipconfig (Windows)
ifconfig (Mac/Linux)

# Start dev server on network
npm run dev -- --host

# Access from mobile
http://192.168.1.XXX:5173
```

### Performance Profiling
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analyzer
npm run build -- --analyze
```

---

## 📚 Resources

### Documentation
- [Web.dev Mobile Guide](https://web.dev/mobile/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Can I Use](https://caniuse.com/)

### Communities
- [r/webdev](https://reddit.com/r/webdev)
- [Dev.to](https://dev.to)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/mobile-web)

---

**Last Updated**: October 8, 2025
**Version**: 1.0
**Maintained by**: IVS Education Technology
