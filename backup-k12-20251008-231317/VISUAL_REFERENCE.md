# 🎨 Login Screen Visual Reference

## Màn hình đăng nhập mới - Design Breakdown

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         🌐 [GLOBE] Language: TIẾNG VIỆT ▼                  ║
║                                                                            ║
║                          ┌────────────────┐                               ║
║                          │   🎓 IVS Logo  │                               ║
║                          │   (lighting)   │                               ║
║                          └────────────────┘                               ║
║                                                                            ║
║                    Chào mừng đến với IVS English                          ║
║              Nền tảng học tiếng Anh dành cho người Việt Nam               ║
║                                                                            ║
║  ┌────────────────────────────────┐  ┌────────────────────────────────┐  ║
║  │      🔵 STUDENT CARD            │  │      🟢 TEACHER CARD            │  ║
║  ├────────────────────────────────┤  ├────────────────────────────────┤  ║
║  │                                │  │                                │  ║
║  │         ┌──────────┐           │  │         ┌──────────┐           │  ║
║  │         │    👨‍🎓    │           │  │         │    👨‍🏫    │           │  ║
║  │         └──────────┘           │  │         └──────────┘           │  ║
║  │      (blue gradient)           │  │      (green gradient)          │  ║
║  │                                │  │                                │  ║
║  │    Tôi là Học sinh             │  │    Tôi là Giáo viên            │  ║
║  │                                │  │                                │  ║
║  │  Bắt đầu hành trình học        │  │  Quản lý lớp học, giao bài     │  ║
║  │  tiếng Anh với lộ trình        │  │  và theo dõi tiến độ của       │  ║
║  │  cá nhân hóa và AI.            │  │  học sinh.                     │  ║
║  │                                │  │                                │  ║
║  │                                │  │  ╔══════════════════════════╗  │  ║
║  │                                │  │  ║ Sign in / Sign up   🟣   ║  │  ║
║  │                                │  │  ║ (purple gradient)        ║  │  ║
║  │                                │  │  ╚══════════════════════════╝  │  ║
║  │                                │  │     Foreigner Teacher          │  ║
║  │                                │  │                                │  ║
║  │  ┌──────────────────────────┐  │  │  ┌──────────────────────────┐  │  ║
║  │  │ Dùng thử với tài khoản   │  │  │  │ Dùng thử với tài khoản   │  │  ║
║  │  │ khách (gray)         ⚪  │  │  │  │ khách (gray)         ⚪  │  │  ║
║  │  └──────────────────────────┘  │  │  └──────────────────────────┘  │  ║
║  │                                │  │                                │  ║
║  │  ╔══════════════════════════╗  │  │  ╔══════════════════════════╗  │  ║
║  │  ║ Đăng nhập / Đăng ký  🔵  ║  │  │  ║ Đăng nhập / Đăng ký  🟢  ║  │  ║
║  │  ║ (blue gradient)          ║  │  │  ║ (green gradient)         ║  │  ║
║  │  ╚══════════════════════════╝  │  │  ╚══════════════════════════╝  │  ║
║  │                                │  │     Vietnamese Teacher         │  ║
║  │                                │  │                                │  ║
║  └────────────────────────────────┘  └────────────────────────────────┘  ║
║                                                                            ║
║                         ┌──────────────────────┐                          ║
║                         │ ℹ️ About IVS English │                          ║
║                         └──────────────────────┘                          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

## 🎨 Color Palette

### Student Card (Left)
```
Background: Linear gradient
  from-blue-900/70 → to-blue-800/60

Icon Circle:
  bg-gradient-to-br from-blue-500 to-blue-600

Guest Button:
  bg-slate-700/60 (gray translucent)

Login Button:
  bg-gradient-to-r from-blue-500 to-blue-600
```

### Teacher Card (Right)
```
Background: Linear gradient
  from-green-900/70 → to-green-800/60

Icon Circle:
  bg-gradient-to-br from-green-500 to-green-600

Foreigner Teacher Button:
  bg-gradient-to-r from-purple-500 to-fuchsia-600
  (Distinctive purple/magenta)

Guest Button:
  bg-slate-700/60 (gray translucent)

Vietnamese Teacher Button:
  bg-gradient-to-r from-green-500 to-emerald-600
```

## 📐 Dimensions

### Cards
```
Width: w-full max-w-md (28rem = 448px)
Padding: p-8 (2rem = 32px)
Border radius: rounded-3xl (1.5rem)
Shadow: shadow-2xl
Backdrop filter: blur(8px)
```

### Icons
```
Size: w-24 h-24 (6rem = 96px)
Icon size: text-5xl (3rem)
Margin bottom: mb-6 (1.5rem)
Shadow: shadow-lg
```

### Buttons
```
Width: w-full
Height: py-3.5 (0.875rem)
Border radius: rounded-xl (0.75rem)
Font size: text-base (1rem)
Font weight: font-semibold (login), font-medium (guest)
```

### Title
```
H1: text-5xl lg:text-6xl (3rem → 3.75rem)
Font weight: font-extrabold (900)
Color: text-white
Tracking: tracking-tight
```

### Subtitle
```
Size: text-xl (1.25rem)
Color: text-white/90 (90% opacity)
```

## 🔤 Typography

### Vietnamese (Default for student/teacher)
```
Font family: System UI (follows Tailwind default)
- Tiêu đề: "Chào mừng đến với IVS English"
- Phụ đề: "Nền tảng học tiếng Anh dành cho người Việt Nam"
- Student: "Tôi là Học sinh"
- Teacher: "Tôi là Giáo viên"
- Guest: "Dùng thử với tài khoản khách"
- Login: "Đăng nhập / Đăng ký"
```

### English (for foreigner teacher)
```
- Title: "Welcome to IVS English"
- Subtitle: "The English learning platform for Vietnamese people"
- Student: "I am a Student"
- Teacher: "I am a Teacher"
- Foreigner: "Foreigner Teacher"
- Vietnamese: "Vietnamese Teacher"
- Guest: "Try with a guest account"
- Login: "Sign in / Sign up"
```

## 📱 Responsive Breakpoints

### Desktop (lg: 1024px+)
```
Layout: flex-row (2 columns side by side)
Gap: gap-8 (2rem)
Logo: w-24 h-24
Title: text-6xl
Cards: max-w-md each
Total width: max-w-6xl (72rem)
```

### Tablet (md: 768px - 1023px)
```
Layout: flex-row (2 columns, closer)
Gap: gap-6 (1.5rem)
Logo: w-20 h-20
Title: text-5xl
Cards: max-w-sm each
```

### Mobile (< 768px)
```
Layout: flex-col (stacked vertically)
Gap: gap-8 (2rem)
Logo: w-20 h-20
Title: text-4xl
Cards: full width with max-w-md
Buttons: full width, larger touch targets
```

## 🎭 Animations & Interactions

### Hover Effects
```css
/* Guest buttons */
hover:bg-slate-700
transition-all duration-200

/* Login buttons */
hover:from-blue-600 hover:to-blue-700
hover:from-green-600 hover:to-emerald-700
hover:from-purple-600 hover:to-fuchsia-700
transition-all duration-200

/* Cards */
transition-all duration-300
/* (Can add hover:scale-105 for subtle lift) */
```

### Active States
```css
/* Buttons when clicked */
active:scale-95
shadow-lg → shadow-xl
```

## 🔍 Accessibility

### ARIA Labels
```html
<!-- Language button -->
<button aria-haspopup="true" aria-expanded="false">
  Language
</button>

<!-- Role cards -->
<div role="button" tabindex="0" aria-label="Student role selection">
  ...
</div>
```

### Keyboard Navigation
```
Tab order:
1. Language selector
2. Student guest button
3. Student login button
4. Teacher foreigner button
5. Teacher guest button
6. Teacher Vietnamese button
7. About app button
```

### Screen Reader
```
Each card announces:
- Role name (Student / Teacher)
- Description
- Available actions (Guest, Login)
- Special roles (Foreigner Teacher, Vietnamese Teacher)
```

## 🎯 User Flow Visualization

```
         START: Role Selection Page
                    |
        ┌───────────┴──────────┐
        │                      │
   [STUDENT]             [TEACHER]
        │                      │
        │           ┌──────────┼──────────┐
        │           │          │          │
        │      [FOREIGNER] [GUEST] [VIETNAMESE]
        │           │          │          │
        │           ↓          ↓          ↓
        │      EN Language  Skip Auth  VI Language
        │           │          │          │
        ├───────────┴──────────┴──────────┤
        │                                 │
        ↓                                 ↓
   Auth Page                         Dashboard
   - Email/Password                  - Role-based
   - Microsoft OAuth                 - Language set
   - Google OAuth                    - Welcome msg
   - LinkedIn OAuth                  - Features
   - Phone OTP                       
        │                                 
        ↓                                 
   Create/Login                          
        │                                 
        ↓                                 
   Dashboard                             
```

## 🔄 State Management

### Language State
```typescript
const [language, setLanguage] = useState<'en' | 'vi'>('vi');

// Auto-switch on role selection
onSelectRole('foreigner-teacher') → setLanguage('en')
onSelectRole('student') → setLanguage('vi')
onSelectRole('teacher') → setLanguage('vi')
```

### Navigation State
```typescript
// From RoleSelectionPage
onSelectRole(role) → navigate to AuthPage
onGuestLogin(role) → login and navigate to Dashboard

// From AuthPage
onBack() → return to RoleSelectionPage
onAuthSuccess() → navigate to Dashboard
```

## 🎬 Animation Timeline

```
0ms:   Page loads
100ms: Fade in background image
200ms: Slide in logo from top
300ms: Fade in title
400ms: Fade in subtitle
500ms: Cards slide in from sides (left: student, right: teacher)
600ms: Buttons fade in
700ms: About button appears
800ms: Ready for interaction
```

## 🖼️ Background

```css
Style:
  background-image: url('/banner/ivsenglish-banner.png')
  background-size: cover
  background-position: center

Overlay:
  .absolute.inset-0.bg-black/60 (dark mode: /70)
  backdrop-filter: blur (on cards)

Effect:
  Creates depth separation between background and cards
  Ensures text readability
  Maintains brand imagery
```

## 💡 Design Principles Applied

✅ **Clarity**: Clear visual separation between roles  
✅ **Hierarchy**: Size and color indicate importance  
✅ **Consistency**: Matching colors within role groups  
✅ **Accessibility**: High contrast, large touch targets  
✅ **Responsiveness**: Mobile-first, scales beautifully  
✅ **Branding**: IVS colors and logo prominent  
✅ **Localization**: Bilingual support built-in  
✅ **Affordance**: Buttons look clickable, clear actions  

---

**Use this as reference** when testing or making further adjustments!
