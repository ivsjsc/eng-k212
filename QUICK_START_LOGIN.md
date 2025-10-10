# 🚀 Quick Start: Testing New Login Screen

## Chạy ứng dụng ngay (Development)

```powershell
# Mở terminal tại E:\IVS\Apps\eng-k212
cd E:\IVS\Apps\eng-k212

# Chạy dev server
npm run dev

# Mở trình duyệt tại: http://localhost:5173
```

## 🎨 Xem màn hình đăng nhập mới

### Màn hình chính (RoleSelectionPage)

Bạn sẽ thấy:
- **Logo IVS** ở trên cùng (tròn với viền sáng)
- **Tiêu đề**: "Welcome to ENGLISH LEARNERS" (by IVS nhỏ phía sau)
- **Mô tả chuẩn hoá (EN/VI)**:
   - English: "An English learning platform for every learner, harmonizing Vietnamese and international standards in a world shaped by accelerating technology."
   - Vietnamese: "Nền tảng học tiếng Anh dành cho mọi người, kết nối tinh thần Việt và chuẩn mực toàn cầu giữa thời đại công nghệ bùng nổ."
- **Slogan**: "From local roots to global routes." ("Từ gốc Việt đến đường quốc tế")
- **2 cột lớn**:

#### CỘT TRÁI: HỌC SINH (Xanh dương)
```
┌─────────────────────────┐
│     👨‍🎓                   │
│  Tôi là Học sinh        │
│  Bắt đầu hành trình...  │
│                         │
│  [Dùng thử với tài      │
│   khoản khách] (xám)    │
│                         │
│  [Đăng nhập /           │
│   Đăng ký] (xanh dương) │
└─────────────────────────┘
```

#### CỘT PHẢI: GIÁO VIÊN (Xanh lá)
```
┌──────────────────────────────┐
│     👨‍🏫                       │
│  Tôi là Giáo viên           │
│  Quản lý lớp học...         │
│                             │
│  [Sign in / Sign up] (TÍM) │ ← Foreigner Teacher
│  Foreigner Teacher          │
│                             │
│  [Dùng thử với tài khoản    │
│   khách] (xám)              │
│                             │
│  [Đăng nhập /               │
│   Đăng ký] (XANH LÁ)       │ ← Vietnamese Teacher
│  Vietnamese Teacher         │
└──────────────────────────────┘
```

### Nút "About IVS English" ở dưới cùng

## 🧪 Test các luồng

### Test 1: Học sinh
1. Click nút **xanh dương** "Đăng nhập / Đăng ký" ở card bên TRÁI
2. → Ngôn ngữ tự động chuyển sang **Tiếng Việt**
3. → Màn hình AuthPage hiển thị
4. → Thấy các tùy chọn:
   - Email/Password
   - Google OAuth
   - Microsoft OAuth
   - Phone OTP

### Test 2: Giáo viên nước ngoài
1. Click nút **TÍM** "Sign in / Sign up" ở card bên PHẢI (nút đầu tiên)
2. → Ngôn ngữ tự động chuyển sang **English**
3. → Màn hình AuthPage hiển thị
4. → Thấy các tùy chọn OAuth với tiêu đề English

### Test 3: Giáo viên Việt Nam
1. Click nút **XANH LÁ** "Đăng nhập / Đăng ký" ở card bên PHẢI (nút cuối cùng)
2. → Ngôn ngữ tự động chuyển sang **Tiếng Việt**
3. → Màn hình AuthPage hiển thị
4. → Thấy các tùy chọn đăng nhập

### Test 4: Guest mode
1. Click nút **XÁM** "Dùng thử với tài khoản khách" ở bất kỳ card nào
2. → Tự động đăng nhập với tài khoản demo
3. → Redirect vào dashboard tương ứng

### Test 5: Đổi ngôn ngữ
1. Click nút **Globe icon** ở góc trên bên phải
2. → Menu hiện ra với 2 options: English | Tiếng Việt
3. → Chọn ngôn ngữ
4. → Toàn bộ UI cập nhật ngay lập tức

## 🔐 Test OAuth (Cần credentials)

### Microsoft OAuth (sau khi có credentials)
1. Cập nhật `.env`:
   ```bash
   VITE_OAUTH_MICROSOFT_CLIENT_ID=your-client-id
   VITE_OAUTH_LINKEDIN_CLIENT_ID=your-linkedin-id
   ```
2. Restart dev server: `npm run dev`
3. Click "Đăng nhập / Đăng ký"
4. Click nút "Continue with Microsoft" trong AuthPage
5. → Popup Microsoft login
6. → Đăng nhập với Microsoft account
7. → Tự động tạo profile và redirect vào app

## 📱 Test trên mobile

1. Mở Chrome DevTools (F12)
2. Click icon **Toggle device toolbar** (Ctrl+Shift+M)
3. Chọn device: iPhone 12 Pro / Samsung Galaxy S20
4. Reload page
5. Xem responsive design:
   - Cards xếp theo chiều dọc
   - Buttons full-width
   - Logo và text scale phù hợp

## 🎯 Những gì bạn sẽ thấy (Expected Results)

### ✅ Layout
- [x] 2 cột rõ ràng (desktop)
- [x] Cards to và đẹp với gradient background
- [x] Icons lớn và rõ nét
- [x] Text dễ đọc với contrast tốt
- [x] Spacing đồng đều

### ✅ Teacher Card có 3 nút riêng biệt
- [x] Nút 1 (Tím): "Sign in / Sign up" + label "Foreigner Teacher"
- [x] Nút 2 (Xám): "Try with guest account"
- [x] Nút 3 (Xanh lá): "Đăng nhập / Đăng ký" + label "Vietnamese Teacher"

### ✅ Interactions
- [x] Hover effects trên buttons
- [x] Click navigation hoạt động
- [x] Language switching instant
- [x] Guest login redirect ngay lập tức

### ✅ Responsive
- [x] Desktop (2 columns)
- [x] Tablet (2 columns stack closer)
- [x] Mobile (1 column, cards stack vertically)

## 🐛 Troubleshooting

### Issue: "Cannot find module firebase.ts"
**Solution**: 
```powershell
# Reinstall dependencies
npm install
```

### Issue: "Port 5173 already in use"
**Solution**:
```powershell
# Kill process
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue: Cards nhỏ hoặc không đúng layout
**Solution**: 
- Clear browser cache (Ctrl+F5)
- Check console for CSS errors
- Verify Tailwind CSS loaded

### Issue: OAuth buttons không xuất hiện
**Solution**:
- Check `firebase.ts` has `microsoftProvider` exported
- Check `.env` has OAuth variables
- Check browser console for errors

## 📸 Screenshots Checklist

### Desktop View
- [ ] Full page screenshot
- [ ] Hover state on buttons
- [ ] Language menu open

### Mobile View
- [ ] Portrait mode
- [ ] Cards stacked vertically
- [ ] All buttons visible

### Auth Page
- [ ] OAuth buttons visible
- [ ] Microsoft logo displayed
- [ ] Google logo displayed

## 📞 Need Help?

### Files to check
1. `components/RoleSelectionPage.tsx` - Main UI
2. `components/AuthPage.tsx` - OAuth integration
3. `.env` - Environment variables
4. `services/firebase.ts` - OAuth providers

### Documentation
- `LOGIN_REDESIGN_SUMMARY.md` - Full details
- `OAUTH_SETUP.md` - OAuth configuration guide
- `COMMIT_LOGIN_REDESIGN.md` - Change summary

### Contact
- Email: support@ivs.edu.vn
- Check browser console for errors
- Check terminal for build errors

---

## ✨ Enjoy the new login screen!

**Pro tip**: Để test nhanh, dùng Guest mode trước, sau đó test OAuth khi đã có credentials.

**Current Status**: 
- ✅ UI redesign complete
- ✅ OAuth code ready
- ⏳ Waiting for Azure credentials
- ⏳ Waiting for LinkedIn credentials

**Next**: Get credentials from `OAUTH_SETUP.md` and test with real Microsoft accounts!
