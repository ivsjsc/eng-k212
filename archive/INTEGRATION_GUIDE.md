# 🔌 Integration Guide - New Components

## Hướng dẫn Tích hợp các Components Mới vào App

---

## 📦 Components Cần Tích hợp

1. **GuestWelcome** - Welcome screen cho khách
2. **AIFeatureBanner** - Banner cho AI features
3. **Updated demo data** - Lộ trình học tập cải tiến

---

## 1️⃣ GuestWelcome Component

### A. Import Component

**File**: `src/App.tsx` hoặc `components/Home.tsx`

```tsx
import GuestWelcome from './components/GuestWelcome';
import PricingModal from './components/PricingModal';
```

### B. Add State

```tsx
const [showGuestWelcome, setShowGuestWelcome] = useState(false);
const [showPricingModal, setShowPricingModal] = useState(false);

// Check if first visit
useEffect(() => {
  if (user.role === 'guest') {
    const hasSeenWelcome = localStorage.getItem('hasSeenGuestWelcome');
    if (!hasSeenWelcome) {
      setShowGuestWelcome(true);
      localStorage.setItem('hasSeenGuestWelcome', 'true');
    }
  }
}, [user.role]);
```

### C. Render Component

**Option 1: Modal/Overlay**
```tsx
{showGuestWelcome && user.role === 'guest' && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Welcome to IVS English</h2>
        <button 
          onClick={() => setShowGuestWelcome(false)}
          className="btn btn-sm"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
      <GuestWelcome 
        language={language}
        onUpgrade={() => {
          setShowGuestWelcome(false);
          setShowPricingModal(true);
        }}
      />
    </div>
  </div>
)}

<PricingModal
  isOpen={showPricingModal}
  onClose={() => setShowPricingModal(false)}
  language={language}
  userRole={user.role}
/>
```

**Option 2: Inline (First Section of Home)**
```tsx
{user.role === 'guest' && (
  <GuestWelcome 
    language={language}
    onUpgrade={() => setShowPricingModal(true)}
  />
)}
```

### D. Add Help Button in Header

**File**: `components/Header.tsx`

```tsx
{user.role === 'guest' && (
  <button
    onClick={() => setShowGuestWelcome(true)}
    className="btn btn-sm btn-secondary"
    title={language === 'en' ? 'Guest Info' : 'Thông tin Khách'}
  >
    <i className="fa-solid fa-circle-info"></i>
  </button>
)}
```

---

## 2️⃣ AIFeatureBanner Component

### A. Import Component

**Files**:
- `components/IVSAssistant.tsx`
- `components/AIContentGenerator.tsx`
- `components/LessonAIAssistant.tsx`

```tsx
import AIFeatureBanner from './AIFeatureBanner';
import PricingModal from './PricingModal';
```

### B. Add State for Usage Tracking

```tsx
const [dailyAIUsage, setDailyAIUsage] = useState(0);
const [showPricingModal, setShowPricingModal] = useState(false);

const FREE_TIER_LIMIT = 3;
const isFreeTier = !user.subscription || user.subscription.tier === 'free';

// Load usage from localStorage
useEffect(() => {
  const today = new Date().toDateString();
  const savedData = localStorage.getItem('aiUsage');
  
  if (savedData) {
    const { date, count } = JSON.parse(savedData);
    if (date === today) {
      setDailyAIUsage(count);
    } else {
      // New day, reset
      localStorage.setItem('aiUsage', JSON.stringify({ date: today, count: 0 }));
      setDailyAIUsage(0);
    }
  } else {
    localStorage.setItem('aiUsage', JSON.stringify({ date: today, count: 0 }));
  }
}, []);

// Increment usage
const incrementUsage = () => {
  const newCount = dailyAIUsage + 1;
  setDailyAIUsage(newCount);
  
  const today = new Date().toDateString();
  localStorage.setItem('aiUsage', JSON.stringify({ date: today, count: newCount }));
};
```

### C. Add Banner Before Chat/Content Area

**Example for IVSAssistant.tsx**:

```tsx
return (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    {/* Title */}
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="text-slate-600 dark:text-slate-400">{t.subtitle}</p>
    </div>

    {/* AI Feature Banner */}
    {isFreeTier && (
      <AIFeatureBanner
        language={language}
        featureName={t.title || 'IVS Assistant'}
        currentUsage={dailyAIUsage}
        maxUsage={FREE_TIER_LIMIT}
        isDemo={!useRealAI}
        onUpgrade={() => setShowPricingModal(true)}
      />
    )}

    {/* Check if quota exceeded */}
    {isFreeTier && dailyAIUsage >= FREE_TIER_LIMIT && (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 mb-4">
        <p className="text-center text-red-800 dark:text-red-200">
          <i className="fa-solid fa-lock mr-2"></i>
          {language === 'en'
            ? 'Daily limit reached! Upgrade to Premium for unlimited access.'
            : 'Đã đạt giới hạn hàng ngày! Nâng cấp lên Premium để truy cập không giới hạn.'}
        </p>
        <button
          onClick={() => setShowPricingModal(true)}
          className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full mt-3"
        >
          <i className="fa-solid fa-crown mr-2"></i>
          {language === 'en' ? 'Upgrade Now' : 'Nâng cấp Ngay'}
        </button>
      </div>
    )}

    {/* Rest of component... */}
    <div className="card-glass p-6">
      {/* Chat interface */}
    </div>

    {/* Pricing Modal */}
    <PricingModal
      isOpen={showPricingModal}
      onClose={() => setShowPricingModal(false)}
      language={language}
      userRole={user.role}
    />
  </div>
);
```

### D. Update Submit Handler

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Check quota
  if (isFreeTier && dailyAIUsage >= FREE_TIER_LIMIT) {
    alert(language === 'en' 
      ? 'Daily limit reached! Please upgrade to Premium.' 
      : 'Đã đạt giới hạn hàng ngày! Vui lòng nâng cấp lên Premium.');
    setShowPricingModal(true);
    return;
  }

  // Increment usage
  if (isFreeTier) {
    incrementUsage();
  }

  // ... rest of submit logic
};
```

---

## 3️⃣ Updated Learning Path Data

### A. Verify Data File

**File**: `data/demo-ai-responses.ts`

Should already have updated structure:
```typescript
learningPath: {
  en: {
    title: "Your Suggested Learning Path (Demo)",
    description: "...",
    weeks: [ /* 4 weeks */ ],
    totalDuration: "4 weeks",
    totalHours: "26-31 hours",
    premiumFeatures: [ /* list */ ]
  },
  vi: { /* Vietnamese version */ }
}
```

### B. PersonalizedLearningPath Component

**File**: `components/PersonalizedLearningPath.tsx`

Should already handle the new structure (lines 157-210).

If not, update the render section:

```tsx
const demoPath = demoAIResponses.learningPath[language];

return (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
    {/* ... title ... */}

    <div className="card-glass p-6 mb-6">
      <div className="flex items-start gap-4 mb-4">
        <i className="fa-solid fa-info-circle text-3xl text-blue-500"></i>
        <div>
          <h2 className="text-2xl font-bold mb-2">{demoPath.title}</h2>
          <p className="text-slate-600 dark:text-slate-400">{demoPath.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {demoPath.weeks.map((week, index) => (
          <div key={index} className="stat-card stat-card-purple p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">
                {t.week} {week.week}: {week.topic}
              </h3>
              <span className="text-sm bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                {week.estimatedHours}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 italic">
              {week.focus}
            </p>

            <ul className="space-y-2">
              {week.exercises.map((exercise, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1">{exercise.split(' ')[0]}</span>
                  <span>{exercise.substring(exercise.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Premium Features */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <i className="fa-solid fa-crown text-yellow-500"></i>
          {language === 'en' ? 'Premium Features:' : 'Tính năng Premium:'}
        </h3>
        <ul className="space-y-2 mb-4">
          {demoPath.premiumFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span>{feature.split(' ')[0]}</span>
              <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => setShowPricingModal(true)}
          className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full"
        >
          <i className="fa-solid fa-crown mr-2"></i>
          {t.upgradeButton}
        </button>
      </div>
    </div>
  </div>
);
```

---

## 🧪 Testing Steps

### 1. Test GuestWelcome
```bash
# 1. Clear localStorage
localStorage.clear()

# 2. Load app as guest
# 3. Should see welcome modal/section
# 4. Click buttons and verify navigation

# 5. Reload page - should not show again (unless cleared)
```

### 2. Test AIFeatureBanner
```bash
# 1. Set user as free tier
# 2. Open IVS Assistant
# 3. Should see banner with 0/3 usage

# 4. Send 3 messages
# 5. Counter should increase to 3/3

# 6. Try to send 4th message
# 7. Should show quota exceeded message

# 8. Check localStorage
localStorage.getItem('aiUsage')
# Should show: {"date":"Sun Oct 06 2025","count":3}

# 9. Manually change date to yesterday
# 10. Reload - should reset to 0/3
```

### 3. Test Learning Path
```bash
# 1. Navigate to Learning Path
# 2. Should see 4 weeks (not 3)
# 3. Each week should have:
#    - Topic
#    - Focus
#    - 5 exercises
#    - Estimated hours

# 4. Click "Upgrade to Premium"
# 5. Should open pricing modal
```

---

## 📊 Monitoring & Analytics

### Events to Track

```typescript
// Add to analytics service

// Guest Welcome
trackEvent('guest_welcome_viewed', { user_role: 'guest' });
trackEvent('guest_welcome_signup_clicked', { user_role: 'guest' });
trackEvent('guest_welcome_login_clicked', { user_role: 'guest' });
trackEvent('guest_welcome_premium_clicked', { user_role: 'guest' });

// AI Feature Usage
trackEvent('ai_feature_usage', { 
  feature: 'ivs_assistant',
  usage_count: dailyAIUsage,
  tier: 'free'
});
trackEvent('ai_quota_reached', {
  feature: 'ivs_assistant',
  tier: 'free'
});
trackEvent('ai_upgrade_prompted', {
  feature: 'ivs_assistant',
  from_quota_exceeded: true
});

// Learning Path
trackEvent('learning_path_viewed', {
  tier: 'free',
  demo: true
});
trackEvent('learning_path_upgrade_clicked', {
  tier: 'free'
});
```

---

## 🐛 Troubleshooting

### Issue 1: GuestWelcome shows every time
**Solution**: Check localStorage implementation
```tsx
// Make sure this is in useEffect
localStorage.setItem('hasSeenGuestWelcome', 'true');
```

### Issue 2: AI usage not resetting daily
**Solution**: Check date comparison
```tsx
const today = new Date().toDateString(); // Format: "Sun Oct 06 2025"
```

### Issue 3: Banner not showing
**Solution**: Verify import and render condition
```tsx
import AIFeatureBanner from './AIFeatureBanner'; // ✓ Correct path?
{isFreeTier && ( // ✓ Condition met?
  <AIFeatureBanner ... />
)}
```

### Issue 4: Learning path still shows 3 weeks
**Solution**: Check import
```tsx
import { demoAIResponses } from '../data/demo-ai-responses';
// Make sure file is updated and build is fresh
```

---

## ✅ Final Checklist

Before marking as complete:

- [ ] GuestWelcome component imported and rendered
- [ ] First visit detection works
- [ ] "Don't show again" mechanism works
- [ ] AIFeatureBanner shows in AI features
- [ ] Usage tracking works (localStorage)
- [ ] Daily reset works (new day = 0/3)
- [ ] Quota exceeded message shows
- [ ] Learning path shows 4 weeks (not 3)
- [ ] All text translated (EN + VI)
- [ ] Upgrade buttons open pricing modal
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Analytics events firing

---

## 📚 Additional Resources

- **IMPROVEMENTS_PART2.md** - Detailed explanation
- **TESTING_GUIDE.md** - Full testing scenarios
- **components/GuestWelcome.tsx** - Component source
- **components/AIFeatureBanner.tsx** - Component source

---

**Ready to integrate!** 🚀

Follow this guide step by step, test thoroughly, and you're good to go!
