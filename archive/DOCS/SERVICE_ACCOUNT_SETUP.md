# Hướng dẫn tạo Service Account mới cho Firebase

## Lỗi hiện tại
Service account hiện tại (`arctic-outpost-472823-r2`) đã bị xóa.
Cần tạo service account mới cho project `english-c0f9d`.

## Các bước thực hiện

### Bước 1: Tạo Service Account từ Firebase Console

1. Mở Firebase Console:
   https://console.firebase.google.com/project/english-c0f9d/settings/serviceaccounts/adminsdk

2. Click **"Generate new private key"**

3. Trong dialog confirm, click **"Generate key"**

4. File JSON sẽ được download tự động (tên dạng `english-c0f9d-firebase-adminsdk-xxxxx.json`)

### Bước 2: Convert sang Base64 (PowerShell)

```powershell
# Di chuyển file JSON vừa download vào thư mục project
cd E:\IVS\Apps\eng-k212

# Encode sang Base64
$content = Get-Content "english-c0f9d-firebase-adminsdk-xxxxx.json" -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
$base64 = [Convert]::ToBase64String($bytes)
$base64 | Out-File -FilePath "service-account.b64" -Encoding utf8 -NoNewline

# Xóa file JSON gốc (bảo mật)
Remove-Item "english-c0f9d-firebase-adminsdk-xxxxx.json"

echo "✅ Service account đã được encode và lưu vào service-account.b64"
```

### Bước 3: Test Service Account

```powershell
# Chạy script test
node scripts/test-firebase-admin.mjs
```

Nếu thành công, bạn sẽ thấy:
```
Created user uid= ...
Firestore write/read OK
Auth custom claim set/read OK
Cleaned up test user and data
RESULTS: { auth: true, firestore: true, realtime: true }
```

### Bước 4: Add vào GitHub Secrets (nếu dùng CI/CD)

```powershell
# Copy nội dung service-account.b64
Get-Content service-account.b64 | Set-Clipboard
```

Sau đó:
1. Vào GitHub repo: https://github.com/ivsjsc/eng-k212/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `FIREBASE_SERVICE_ACCOUNT`
4. Value: paste nội dung từ clipboard
5. Click **"Add secret"**

## Lưu ý bảo mật

⚠️ **QUAN TRỌNG**:
- File `service-account.b64` chứa credentials nhạy cảm
- Đã thêm vào `.gitignore` để tránh commit lên GitHub
- **KHÔNG BAO GIỜ** commit file này lên public repo
- Nếu bị lộ, hãy revoke service account ngay lập tức tại:
  https://console.firebase.google.com/project/english-c0f9d/settings/serviceaccounts/adminsdk

## Troubleshooting

### Lỗi "Project has been deleted"
→ Service account đang dùng project cũ, làm theo hướng dẫn trên để tạo mới

### Lỗi "Permission denied"
→ Đảm bảo service account có role **Firebase Admin SDK Administrator**

### Lỗi "Cannot find module firebase-admin"
```powershell
npm install firebase-admin
```

---

**Ngày tạo**: October 4, 2025
