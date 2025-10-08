# 📱 Visual Reference - Mobile Improvements

## Layout Changes

### Before (Desktop Sidebar)
```
┌─────────────────────────────────────┐
│ [Sidebar]  │  Content Area          │
│  288px     │                         │
│            │                         │
│  • Home    │  Main content...        │
│  • Curr.   │                         │
│  • Dash    │                         │
│  • AI      │                         │
│  • Path    │                         │
│  • Set.    │                         │
│  • Guide   │                         │
│            │                         │
└────────────┴─────────────────────────┘
```

### After Mobile (< 768px)
```
┌─────────────────────────────────────┐
│ [≡] IVS English           [Avatar]  │ Header
├─────────────────────────────────────┤
│                                     │
│                                     │
│        Full Width Content           │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ [🏠]  [📚]  [🗺️]  [⋯]              │ Bottom Nav
└─────────────────────────────────────┘
```

**Screen Space Gained**: 288px → 64px = **+224px vertical space**

---

## Bottom Navigation States

### Inactive Item
```
┌─────┐
│  📚 │  Icon (slate-400)
│ Học │  Label (slate-400)
└─────┘
```

### Active Item
```
▔▔▔▔▔   ← Active indicator (gradient)
┌─────┐
│  📚 │  Icon (sky-500, scale-110)
│ Học │  Label (sky-500, font-semibold)
└─────┘
Background: sky-500/20
```

### With Badge
```
┌─────┐
│ 💎📚│  Premium badge
│ Path│
└─────┘
```

---

## Onboarding Tour UI

### Step Indicator
```
━━━━━━ ━━━━━━ ━━━━━━ ━━━━━━ ━━━━━━
Active  Next   Next   Next   Next
```

### Card Layout
```
┌───────────────────────────────────┐
│  ━━ ━━━ ━━━ ━━━ ━━━ ━━━  Progress│
│                                   │
│        ┌─────────────┐            │
│        │   🎓 Icon   │  Large     │
│        └─────────────┘            │
│                                   │
│  Welcome to IVS English!  Title   │
│                                   │
│  Let's explore the main    Desc   │
│  features...                      │
│                                   │
│  ┌─────────────────────────────┐ │
│  │   Explore Curriculum  →     │ │  Primary CTA
│  └─────────────────────────────┘ │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ ← Previous│    Next →       │ │  Navigation
│  └───────────┴─────────────────┘ │
│                                   │
│         Skip tour                 │
│         1 / 5                     │
└───────────────────────────────────┘
```

---

## Mobile Components

### Accordion (Closed)
```
┌─────────────────────────────────┐
│ Unit 1: Present Tenses      ▼  │
└─────────────────────────────────┘
```

### Accordion (Open)
```
┌─────────────────────────────────┐
│ Unit 1: Present Tenses      ▲  │
├─────────────────────────────────┤
│                                 │
│  ▶ Lesson 1: Introduction       │
│  ▶ Lesson 2: Practice           │
│                                 │
└─────────────────────────────────┘
```

### Tabs
```
┌───────┬───────┬───────┬───────┐
│📖 Gram│✓ Vocab│💪 Prac│  ...  │
└───────┴───────┴───────┴───────┘
 Active  Inactive

┌─────────────────────────────────┐
│                                 │
│   Tab content here...           │
│                                 │
└─────────────────────────────────┘
```

### Mobile Card
```
┌─────────────────────────────────┐
│ Course Progress          Title  │
├─────────────────────────────────┤
│                                 │
│  Completed: 15/30 lessons       │
│  ████████░░░░░░░░░░░░  50%     │
│                                 │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │120 │ │ 7  │ │ A2 │          │
│  │Pts │ │Day │ │Lvl │          │
│  └────┘ └────┘ └────┘          │
│                                 │
└─────────────────────────────────┘
```

### List Item (Clickable)
```
┌─────────────────────────────────┐
│ ⚙️  Settings              ›    │
│     Manage preferences          │
└─────────────────────────────────┘
```

### List Item (With Badge)
```
┌─────────────────────────────────┐
│ 👤  Profile         [90%]  ›   │
│     View and edit               │
└─────────────────────────────────┘
```

### Bottom Sheet
```
Mobile Screen
├─────────────────────────────────┤
│     Main content here...        │
│                                 │
└─────────────────────────────────┘

    [Sheet slides up from bottom]
           ↓↓↓

┌─────────────────────────────────┐
│     Main content (dimmed)       │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ Backdrop
├─────────────────────────────────┤
│         ──── Handle             │
│                                 │
│ Filter Options           Title  │
├─────────────────────────────────┤
│                                 │
│  [Difficulty selector]          │
│  [Topic checkboxes]             │
│                                 │
│  ┌──────────────────────────┐  │
│  │   Apply Filters          │  │
│  └──────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

---

## Typography Hierarchy

### Before Mobile
```
Heading 1:    20px
Heading 2:    18px
Heading 3:    16px
Body:         14px
Small:        12px  ← Too small!
Tiny:         10px  ← Too small!
```

### After Mobile
```
Heading 1:    24px  ↑
Heading 2:    20px  ↑
Heading 3:    18px  ↑
Body:         16px  ↑
Small:        14px  ↑ (minimum)
```

**Line Heights:**
- Headings: 1.3-1.4
- Body: 1.6
- Small: 1.5

---

## Touch Target Sizes

### Before
```
Button:  [36px × 32px]  ✗ Too small
Link:    [auto × auto]  ✗ Variable
Input:   [auto × 36px]  ✗ Too small
```

### After (WCAG 2.1 Level AAA)
```
Button:  [≥44px × ≥44px]  ✓
Link:    [≥44px × ≥44px]  ✓
Input:   [100% × ≥44px]   ✓
```

**Padding:**
```
Before: padding: 8px 12px
After:  padding: 12px 20px
```

---

## Color System

### Bottom Navigation
```
Inactive:
- Icon: text-slate-400 (#94a3b8)
- Label: text-slate-400
- Background: transparent

Active:
- Bar: from-sky-500 to-indigo-600
- Icon: text-sky-500 (#0ea5e9)
- Label: text-sky-500
- Background: sky-500/20 to indigo-600/20
```

### Onboarding Tour
```
Card Background:
- from-slate-800 (#1e293b)
- to-slate-900 (#0f172a)

Icon Container:
- from-sky-500 to-indigo-600
- Shadow: sky-500/30

Progress Indicator:
- Active: from-sky-500 to-indigo-600
- Completed: sky-500/50
- Inactive: slate-700 (#334155)
```

### Mobile Components
```
Card/Accordion/Sheet:
- Border: border-white/10
- Background: bg-white/5
- Backdrop: backdrop-blur-sm

Active/Hover:
- Gradient: from-sky-500 to-indigo-600
- Shadow: shadow-sky-500/30

Text:
- Primary: text-white
- Secondary: text-slate-300
- Tertiary: text-slate-400
```

---

## Animation Timing

### Transitions
```css
/* Quick responses */
button, link: 200ms ease-out

/* Smooth reveals */
accordion: 300ms ease-in-out
bottom-sheet: 300ms ease-out

/* Backdrop */
overlay: 200ms ease-in-out

/* Transform */
scale, translate: 200ms ease-out
```

### Keyframes
```css
/* Loading skeleton */
shimmer: 2s infinite linear

/* Pulse effect */
pulse: 1.5s infinite ease-in-out

/* Fade in */
fade-in: 300ms ease-out
```

---

## Spacing System (Mobile)

### Container Padding
```
Before: padding: 12px
After:  padding: 16px  (+33%)
```

### Card Gaps
```
Before: gap: 8px
After:  gap: 12px  (+50%)
```

### Section Spacing
```
Between sections: space-y-8  (32px)
Between items:    space-y-3  (12px)
Between elements: space-y-2  (8px)
```

### Bottom Content Spacing
```
.mobile-content {
  padding-bottom: calc(
    64px (nav height) +
    16px (extra space) +
    env(safe-area-inset-bottom)
  );
}
```

---

## Responsive Breakpoints

```
Mobile:     0px - 767px
Tablet:     768px - 1023px
Desktop:    1024px+

Critical:   < 768px (show bottom nav)
```

### Media Queries
```css
/* Mobile-only styles */
@media (max-width: 768px) {
  /* Larger fonts, spacing */
}

/* Hide on mobile */
.md\:hidden {
  /* Bottom nav, etc */
}

/* Hide on desktop */
.lg\:block {
  /* Keyboard shortcuts hint */
}
```

---

## Safe Area Support

### Notch Devices
```
iPhone X+:     top/bottom notch
iPhone 14 Pro: Dynamic Island

Safe areas:
- top: 44px (status bar + notch)
- bottom: 34px (home indicator)
```

### CSS Implementation
```css
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Example: Bottom nav */
padding-bottom: calc(
  16px + env(safe-area-inset-bottom, 0)
);
```

---

## Focus States (A11y)

### Keyboard Navigation
```
:focus-visible {
  outline: 2px solid sky-500
  outline-offset: 2px
  border-radius: 4px
}

Visual:
┌─────────────────┐
│   Button Text   │
└─────────────────┘
   └─────────────┘  ← 2px sky-500 outline
                      2px offset
```

### Touch Feedback
```
active:scale-95    Subtle press effect
hover:bg-white/10  Background highlight

Tap color:
-webkit-tap-highlight-color: sky-500/20
```

---

## Accessibility Features

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Increase contrast */
  button { text-decoration: underline; }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader
```html
<!-- Semantic HTML -->
<nav aria-label="Main navigation">
<button aria-label="Open menu">
<div role="dialog" aria-modal="true">
```

---

## Component Hierarchy

```
App.tsx
├── Sidebar (desktop)
├── Header (mobile)
├── BottomNavigation (mobile)  ← NEW
├── OnboardingTour              ← NEW
├── Main Content
│   ├── MobileAccordion        ← NEW
│   ├── MobileTabs             ← NEW
│   ├── MobileCard             ← NEW
│   ├── MobileListItem         ← NEW
│   └── MobileBottomSheet      ← NEW
└── Modals/Overlays
```

---

## Z-Index Stack

```
z-[90]  Keyboard shortcuts hint (desktop)
z-50    Onboarding tour, bottom sheets
z-40    Bottom navigation, modals
z-30    Header, sidebar backdrop
z-20    Assistive touch
z-10    Main content
z-0     Background effects
```

---

## Development Workflow

### Adding New Mobile Component

1. **Create component in MobileComponents.tsx**
```tsx
export const MyNewComponent: React.FC<Props> = ({ ... }) => {
  return (
    <div className="mobile-optimized">
      {/* Component JSX */}
    </div>
  );
};
```

2. **Add to Demo**
```tsx
// MobileComponentsDemo.tsx
<section>
  <h2>My New Component</h2>
  <MyNewComponent {...props} />
</section>
```

3. **Document in MOBILE_UX_IMPROVEMENTS.md**

4. **Test on devices**

5. **Update this visual reference**

---

## Quick Reference

### Import Statement
```typescript
import {
  MobileAccordion,
  MobileTabs,
  MobileCard,
  MobileListItem,
  MobileBottomSheet,
  useIsMobile
} from './components/MobileComponents';
```

### CSS Classes
```css
.mobile-spacing          Bottom nav spacing
.scrollbar-hide         Clean scrolling
.skeleton               Loading state
.safe-area-inset-bottom Notch support
```

### LocalStorage Keys
```javascript
'ivs-onboarding-tour-completed'  Tour status
'ivs-first-use-shown'            First use overlay
'ivs-theme'                      Theme preference
'ivs-language'                   Language preference
```

---

**Visual Reference v1.0** | October 2025
