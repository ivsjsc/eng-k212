# Firebase Data Integrity & Security Testing Guide

## 📋 Tổng quan

Repository này bao gồm các công cụ để test và kiểm tra tính toàn vẹn dữ liệu Firebase Firestore, cũng như test security rules trước khi deploy production.

## 🗂️ Files trong `/utils/`

### `firebaseTest.ts`
Script cơ bản để test kết nối và đọc dữ liệu Firestore từ frontend.

**Cách sử dụng trong browser console:**
```javascript
// Test kết nối
testConnection()

// List tất cả classes
listAllClasses()

// Đọc một class cụ thể
readClass("10gr3pL3hNL...")
```

### `dataIntegrityChecker.ts`
Script nâng cao để kiểm tra toàn vẹn dữ liệu classes và related collections.

**Functions:**
- `checkDataIntegrity()` - Kiểm tra toàn bộ dữ liệu
- `readClass(docId)` - Đọc một class cụ thể

**Kiểm tra:**
- ✅ Required fields tồn tại
- ✅ Data types đúng
- ✅ Teachers tồn tại trong users collection
- ✅ Students tồn tại trong users collection
- ✅ Schema consistency

### `securityRulesTester.ts`
Script để test Firebase Security Rules.

**Functions:**
- `runSecurityTests()` - Chạy full test suite
- `testSpecificOperation(operation, collection, docId?)` - Test operation cụ thể

## 🌐 Web Interface

Truy cập `firebase-tester.html` trong browser để sử dụng giao diện web:

```
http://localhost:3000/firebase-tester.html
```

## 🚀 Cách chạy

### 1. Development Server
```bash
npm run dev
```

### 2. Truy cập Test Interface
```
http://localhost:3000/firebase-tester.html
```

### 3. Hoặc sử dụng Browser Console
Mở DevTools Console và import scripts:

```javascript
// Import test functions
import('./utils/firebaseTest.ts')
import('./utils/dataIntegrityChecker.ts')
import('./utils/securityRulesTester.ts')
```

## 📊 Test Results

### Connection Test
- ✅ Firestore connection successful
- ❌ Connection failed (check Firebase config)

### Data Integrity Report
```
📊 Data Integrity Report
========================

Total Classes: 25
Valid Classes: 23
Invalid Classes: 2
Execution Time: 1250ms

🚨 Orphaned Classes (teacher doesn't exist):
  - class-123
  - class-456

⚠️  Empty Classes (no students):
  - empty-class-789
```

### Security Test Results
```
📊 Security Test Results: 2/3 passed

✅ Test 1: Anonymous read classes
✅ Test 2: Authenticated user read own profile
❌ Test 3: Classes collection structure
   Error: Missing required fields
   Expected: All classes have required fields
   Actual: Invalid
```

## 🔧 Firebase Security Rules

### Current Rules Structure
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Classes security
    match /classes/{classId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }

    // Add more rules as needed...
  }
}
```

## 📈 Performance & Best Practices

### Indexes
Tạo composite indexes cho queries phức tạp:
```javascript
// Index cho query: where('grade', '==', '10').where('subject', '==', 'math')
{
  "collectionGroup": "classes",
  "queryScope": "COLLECTION",
  "fields": [
    {"fieldPath": "grade", "order": "ASCENDING"},
    {"fieldPath": "subject", "order": "ASCENDING"}
  ]
}
```

### Backups
Thiết lập scheduled export:
```bash
# Cloud Storage bucket cho backups
gs://ivs-academy-backups

# Schedule: Daily at 2 AM
gcloud scheduler jobs create pubsub daily-firestore-export \
  --schedule "0 2 * * *" \
  --topic firestore-export \
  --message-body '{"collection":"classes"}'
```

## 🎯 Next Steps

### Immediate Actions
1. **Deploy Security Rules**: Test và deploy rules production-ready
2. **Create Indexes**: Thiết lập composite indexes cần thiết
3. **Setup Backups**: Cấu hình automated backups
4. **Monitor Usage**: Theo dõi Firestore costs và performance

### Advanced Features
1. **Real-time Sync**: Implement real-time listeners
2. **Offline Support**: Add offline persistence
3. **Data Validation**: Server-side validation với Cloud Functions
4. **Audit Logging**: Log tất cả data changes

## 📞 Support

- **Email**: info@ivsacademy.edu.vn
- **Docs**: https://firebase.google.com/docs/firestore
- **Console**: https://console.firebase.google.com

## ⚠️ Important Notes

- Luôn test security rules với anonymous users
- Backup data trước khi thay đổi schema
- Monitor Firestore usage để tránh costs tăng
- Validate data consistency định kỳ

---

**Status**: ✅ Ready for production testing
**Last Updated**: 2025-10-07
