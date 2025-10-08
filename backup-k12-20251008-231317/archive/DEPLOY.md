# Deploy & Admin guide

## Prepare and deploy Cloud Function (setUserAi)

1. Ensure Firebase CLI is installed and you're logged in:

```pwsh
npm install -g firebase-tools
firebase login
```

2. Choose your Firebase project (one-time):

```pwsh
cd e:\IVS\Apps\eng-k212\eng-k212
firebase use --add
# follow interactive prompts and select `english-c0f9d` (your project)
```

3. Deploy functions:

```pwsh
cd functions
npm install
cd ..
firebase deploy --only functions:setUserAi
```

## Set an admin user locally (using service account)

1. In Firebase Console -> Project Settings -> Service accounts -> Generate new private key. Save `service-account.json` locally (DO NOT commit it).

2. Run the script to set admin & ai claim for a user:

```pwsh
node scripts/set-admin-claim.js .\service-account.json TARGET_UID --admin --ai
```

## Notes
- Ensure `functions/index.js` is the code you want to deploy. It expects to run in Firebase Functions environment.
- After setting custom claims, the user may need to sign out and sign in again (or call `getIdToken(true)`) to refresh the token and see updated claims.

## Cấu hình biến môi trường trên Netlify (RẤT QUAN TRỌNG)

- Khi thêm biến `SERVICE_ACCOUNT_JSON` vào Netlify, KHÔNG ĐƯỢC CHỌN "Same value for all deploy contexts".
- Hãy chọn "Different value for each deploy context" và dán giá trị cho Production. Lý do: bạn cần kiểm soát rõ ràng giá trị cho môi trường Production (runtime/functions) và tránh vô tình phơi bày hoặc áp dụng cùng một secret cho mọi ngữ cảnh deploy.

Hướng dẫn ngắn (Netlify UI):

1. Mở Site → Site settings → Build & deploy → Environment → Add variable.
2. Key: `SERVICE_ACCOUNT_JSON`.
3. Bật "Contains secret values" để Netlify giữ biến này là secret.
4. Ở phần "Values", CHỌN: "Different value for each deploy context" (KHÔNG CHỌN "Same value for all deploy contexts").
5. Dán giá trị cho Production: paste nguyên JSON của file `service-account.json` (hoặc base64 của nó). Thông thường file nằm ở máy local (ví dụ `C:\Users\nbi29\Downloads\service-account.json`).
6. Ở phần "Scopes", đảm bảo bật ít nhất `Functions` (và `Runtime`/`Builds` nếu cần cho build-time access). Lưu ý: một số tuỳ chọn scope có thể yêu cầu nâng cấp plan trên Netlify.
7. Lưu và kích hoạt một deploy mới để giá trị secret được áp dụng cho Functions runtime.

Ghi chú thêm:
- Nếu bạn muốn Deploy Previews hoặc Branch deploys có thể gọi API admin (thường không khuyến nghị), hãy thêm cùng giá trị cho Deploy Previews riêng lẻ, nhưng giữ Production là priority.
- Tuyệt đối không commit `service-account.json` vào git.
