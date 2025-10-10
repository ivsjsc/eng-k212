# S-Score System - Quick Start Guide

## 🚀 What's New?

Bạn vừa triển khai hệ thống **S-Score Gamification** hoàn chỉnh với các tính năng:

### ✅ Đã Hoàn Thành

1. **Hệ thống Điểm S-Score**
   - Cơ chế tính điểm tự động
   - 7 loại sự kiện thưởng điểm
   - Theo dõi giao dịch đầy đủ

2. **AI Token Economy**
   - Đổi S-Score → AI Tokens
   - 4 tính năng AI với giá khác nhau
   - Theo dõi sử dụng token

3. **Hệ thống Hạng**
   - 4 hạng: Bronze, Silver, Gold, Platinum
   - Tiến trình tự động nâng hạng
   - Lợi ích riêng cho mỗi hạng

4. **Huy hiệu Thành tích**
   - 8 huy hiệu với 4 độ hiếm
   - Theo dõi tiến trình mở khóa
   - Thưởng S-Score khi đạt được

5. **Chuỗi đăng nhập hàng ngày**
   - Thưởng +5 điểm/ngày
   - Theo dõi chuỗi dài nhất
   - Reset nếu bỏ lỡ ngày

## 📱 Giao Diện Người Dùng

### Màn hình Home (Học sinh)
- **S-Score Display**: Widget lớn hiển thị tổng điểm, tokens, hạng
- **Nút "Rewards Store"**: Mở cửa hàng đổi token
- **Nút "Achievements"**: Xem tất cả huy hiệu

### Header (Mobile)
- **Compact S-Score**: Hiển thị nhanh S-Score, Tokens, Hạng
- Chỉ hiển thị cho học sinh

### Modal Rewards Store
- **Tab 1 - Token Packages**: 4 gói đổi điểm
- **Tab 2 - AI Features**: Sử dụng tokens cho tính năng AI

### Modal Achievements
- **Badge Gallery**: Xem tất cả huy hiệu
- **Progress Bars**: Tiến trình huy hiệu chưa mở
- **Stats Panel**: Tổng quan thành tích

## 🔧 Tích Hợp Vào Code

### 1. Award Points Khi Hoàn Thành Bài Học

```typescript
// Trong LessonView.tsx hoặc component bài học
import { completeLessonWithReward } from '../services/sscoreService';

const handleLessonFinish = async () => {
  // ... logic kết thúc bài học ...
  
  // Award S-Score
  const result = await completeLessonWithReward(
    user.id,              // User ID
    lesson.id,            // Lesson ID
    course.id,            // Course ID
    finalScore,           // Điểm (0-100)
    timeSpentMinutes,     // Thời gian (phút)
    isFirstAttempt        // Lần đầu làm?
  );
  
  if (result.success) {
    // Hiển thị thông báo
    showNotification(`🎉 +${result.pointsAwarded} S-Score earned!`);
    
    // Refresh user data
    await refreshUserData();
  }
};
```

### 2. Deduct Tokens Khi Dùng AI Feature

```typescript
// Trong IVSAssistant.tsx hoặc AI component
import { deductAITokens } from '../services/sscoreService';

const handleAIRequest = async () => {
  // Check balance trước
  if (user.aiTokens! < 50) {
    showError('Insufficient AI tokens. Visit Rewards Store to get more!');
    return;
  }
  
  // Deduct tokens
  const result = await deductAITokens(
    user.id,
    50,                   // Cost
    'ai_writing_grader'   // Feature name
  );
  
  if (result.success) {
    // Proceed with AI request
    const aiResponse = await callAIService(prompt);
    
    // Update UI
    setAITokenBalance(result.newBalance);
    displayAIResponse(aiResponse);
  } else {
    showError(result.error);
  }
};
```

### 3. Update Streak Khi Login

```typescript
// Trong App.tsx useEffect
import { updateStreak } from '../services/sscoreService';

useEffect(() => {
  if (user && user.role === 'student') {
    // Update streak on app load
    updateStreak(user.id).then(result => {
      if (result.bonusAwarded) {
        showNotification(`🔥 Day ${result.currentStreak} streak! +5 S-Score`);
      }
    });
  }
}, [user]);
```

### 4. Award Points Khi Pass Test

```typescript
// Trong Test component
import { awardSScore } from '../services/sscoreService';

const handleTestComplete = async (score: number) => {
  const passed = score >= test.passingScore;
  
  if (passed) {
    // Award test points
    await awardSScore(
      user.id,
      'test_passed',
      { testId: test.id, score, courseId: course.id }
    );
    
    // Update user stats
    await updateDoc(doc(db, 'users', user.id), {
      totalTestsPassed: (user.totalTestsPassed || 0) + 1,
    });
  }
};
```

## 🗄️ Firestore Setup

### Tạo Collections Mới

Không cần tạo collection trước, Firestore tự động tạo khi có data đầu tiên. Nhưng nên setup indexes:

#### 1. S-Score Transactions Index
```bash
firebase firestore:indexes:create \
  --collection-group sscoreTransactions \
  --query-scope COLLECTION \
  --field userId --order asc \
  --field timestamp --order desc
```

#### 2. Lesson Progress Index
```bash
firebase firestore:indexes:create \
  --collection-group lessonProgress \
  --query-scope COLLECTION \
  --field userId --order asc \
  --field status --order asc
```

### Security Rules

Thêm vào `firestore.rules`:

```javascript
// S-Score Transactions
match /sscoreTransactions/{transactionId} {
  allow read: if request.auth != null && 
    request.auth.uid == resource.data.userId;
  allow create: if request.auth != null && 
    request.auth.uid == request.resource.data.userId;
}

// Lesson Progress
match /lessonProgress/{progressId} {
  allow read, write: if request.auth != null && 
    request.auth.uid == resource.data.userId;
}

// Token Usage
match /tokenUsage/{usageId} {
  allow read: if request.auth != null && 
    request.auth.uid == resource.data.userId;
  allow create: if request.auth != null && 
    request.auth.uid == request.resource.data.userId;
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

## 📊 Migrate Existing Users

Chạy script này để thêm S-Score fields cho users hiện tại:

```typescript
// scripts/migrate-users-sscore.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  // ... your config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateUsers() {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  
  let count = 0;
  
  for (const userDoc of snapshot.docs) {
    const userData = userDoc.data();
    
    // Only update if sscore field doesn't exist
    if (typeof userData.sscore === 'undefined') {
      await updateDoc(doc(db, 'users', userDoc.id), {
        sscore: 0,
        aiTokens: 100,              // Starting bonus
        achievements: [],
        completedLessons: [],
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        tier: 'Bronze',
        totalTestsPassed: 0,
        perfectScores: 0,
      });
      
      count++;
      console.log(`✅ Migrated user: ${userDoc.id}`);
    }
  }
  
  console.log(`\n🎉 Migration complete! Updated ${count} users.`);
}

migrateUsers().catch(console.error);
```

Chạy:
```bash
npx ts-node scripts/migrate-users-sscore.ts
```

## 🧪 Testing Checklist

### Manual Testing

1. **Login → Check Streak**
   - [ ] Login lần đầu: streak = 0
   - [ ] Login ngày tiếp theo: streak +1, thưởng +5 điểm
   - [ ] Login cùng ngày: streak không đổi
   - [ ] Bỏ lỡ 1 ngày: streak reset về 1

2. **Complete Lesson**
   - [ ] Hoàn thành bài học: +10 điểm
   - [ ] Lần đầu làm: thưởng thêm +15 điểm
   - [ ] Điểm 100%: thưởng thêm +30 điểm
   - [ ] Lesson thêm vào completedLessons[]

3. **Rewards Store**
   - [ ] Mở modal Rewards Store
   - [ ] Đổi 50 điểm → 10 tokens
   - [ ] Balance cập nhật ngay lập tức
   - [ ] Không đủ điểm → hiển thị lỗi
   - [ ] Transaction ghi vào Firestore

4. **Achievement Badges**
   - [ ] Mở modal Achievements
   - [ ] Badge đã mở: hiển thị màu sắc đầy đủ
   - [ ] Badge chưa mở: opacity 60%, có progress bar
   - [ ] Stats panel hiển thị đúng số liệu

5. **Mobile Header**
   - [ ] S-Score hiển thị compact
   - [ ] 3 phần: S-Score, Tokens, Tier
   - [ ] Màu sắc tier đúng
   - [ ] Chỉ hiển thị cho học sinh

### Browser Console Testing

```javascript
// Test award S-Score
const { awardSScore } = await import('./services/sscoreService');
await awardSScore('user-id', 'lesson_complete', { lessonId: 'test' });

// Test exchange tokens
const { exchangePointsForTokens } = await import('./services/sscoreService');
await exchangePointsForTokens('user-id', 50, 10);

// Test streak update
const { updateStreak } = await import('./services/sscoreService');
await updateStreak('user-id');

// Check Firestore
// Go to Firebase Console → Firestore → sscoreTransactions
```

## 🚀 Deploy to Production

```powershell
# 1. Build
npm run build

# 2. Deploy Firestore rules
firebase deploy --only firestore:rules

# 3. Create indexes (if not done)
firebase deploy --only firestore:indexes

# 4. Deploy hosting
firebase deploy --only hosting

# 5. Verify
# Visit: https://english-c0f9d.web.app
```

## 📈 Monitor After Deployment

### Firebase Console
1. **Firestore → sscoreTransactions**
   - Check xem transactions có được ghi không
   - Verify userId, points, timestamp

2. **Firestore → users**
   - Check sscore fields có update không
   - Verify aiTokens tăng/giảm đúng

3. **Firestore → Usage**
   - Monitor reads/writes
   - Check cost (should be minimal)

### Google Analytics (if enabled)
Track custom events:
- `sscore_awarded` (category, points)
- `token_exchanged` (points, tokens)
- `badge_unlocked` (badge_id)
- `ai_feature_used` (feature, cost)

## 🐛 Troubleshooting

### Issue: "Insufficient S-Score" khi có đủ điểm
**Fix**: Cache stale. Refresh user data:
```typescript
const userRef = doc(db, 'users', userId);
const userSnap = await getDoc(userRef);
const freshData = userSnap.data();
```

### Issue: Streak không cập nhật
**Fix**: Check `lastActiveDate` format. Must be ISO string:
```typescript
new Date().toISOString() // ✅ Đúng
new Date().toString()     // ❌ Sai
```

### Issue: Transaction không hiển thị
**Fix**: Check Firestore index:
```bash
firebase firestore:indexes:list
# Nếu không có, create index (xem phần Firestore Setup)
```

### Issue: Modal không mở
**Fix**: Check console errors. Thường do:
- Import path sai
- User prop null/undefined
- onUpdateUser callback missing

## 💡 Tips & Best Practices

1. **Always validate on server**: Dùng Cloud Functions cho critical operations
2. **Cache user data**: Avoid excessive Firestore reads
3. **Show loading states**: Khi exchange tokens hoặc award points
4. **Optimistic UI updates**: Update UI trước, sync Firestore sau
5. **Error handling**: Always có try/catch và hiển thị lỗi cho user

## 📞 Need Help?

1. Check `SSCORE_IMPLEMENTATION.md` for full docs
2. Review service code: `services/sscoreService.ts`
3. Check component props: `SScoreDisplay`, `RewardsStore`, `AchievementBadgesModal`
4. Firebase Console → Firestore → Check data structure

---

**Status**: ✅ Production Ready  
**Build Time**: 20.57s  
**New Components**: 3  
**New Services**: 1  
**New Types**: 10+  

Happy coding! 🎉
