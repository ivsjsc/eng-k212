# 🌐 Custom Domain Setup - english.ivsacademy.edu.vn

## ✅ Current Status

**Code Configuration:** ✅ COMPLETE  
**DNS Setup:** ⏳ PENDING  
**SSL Certificate:** ⏳ AUTO (after DNS)  

---

## 📋 Completed Steps

### 1. Updated Firebase Configuration ✅
File: `env.js`
```javascript
authDomain: "english.ivsacademy.edu.vn"  // Changed from english-c0f9d.firebaseapp.com
```

### 2. Deployed to Firebase ✅
```
Build: 23.88s
Files: 25 files deployed
Status: LIVE at https://english-c0f9d.web.app
```

### 3. Simplified firebase.json ✅
Removed multi-target configuration for easier management.

---

## 🔧 Next Steps (Manual Configuration Required)

### Step 1: Add Custom Domain in Firebase Console

1. **Open Firebase Console:**
   ```
   https://console.firebase.google.com/project/english-c0f9d/hosting
   ```

2. **Navigate to Hosting:**
   - Click on "Hosting" in left sidebar
   - Click on "Add custom domain" button

3. **Enter Domain:**
   ```
   english.ivsacademy.edu.vn
   ```

4. **Verify Ownership:**
   Firebase will provide a TXT record to verify domain ownership.
   
   Example:
   ```
   Type: TXT
   Name: @
   Value: [Firebase will provide this]
   ```

5. **Add TXT Record to DNS:**
   - Go to your domain DNS provider (e.g., Cloudflare, GoDaddy, etc.)
   - Add the TXT record provided by Firebase
   - Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)

6. **Verify in Firebase:**
   - Click "Verify" button in Firebase Console
   - Firebase will check the TXT record

---

### Step 2: Configure DNS Records

After verification, Firebase will provide DNS records to point your domain to Firebase Hosting.

#### Option A: A Records (Recommended)
```
Type: A
Name: english
Value: [IP Address 1 from Firebase]

Type: A
Name: english
Value: [IP Address 2 from Firebase]
```

#### Option B: CNAME Record
```
Type: CNAME
Name: english
Value: [subdomain].web.app
```

**Add these records in your DNS provider:**
1. Log into your DNS management panel
2. Add the A records or CNAME as instructed by Firebase
3. Save changes
4. Wait for DNS propagation

---

### Step 3: Wait for SSL Certificate

Firebase will automatically provision an SSL certificate for your custom domain.

**Timeline:**
- DNS propagation: 5 minutes - 48 hours
- SSL certificate issuance: 5 minutes - 24 hours

**Status Check:**
- Firebase Console will show "Connected" when ready
- You'll see a green checkmark and "Live" status

---

### Step 4: Add to Firebase Authentication Authorized Domains

1. **Open Firebase Console:**
   ```
   https://console.firebase.google.com/project/english-c0f9d/authentication/settings
   ```

2. **Navigate to Authentication > Settings:**
   - Click on "Authentication" in left sidebar
   - Click on "Settings" tab
   - Scroll to "Authorized domains"

3. **Add Custom Domain:**
   - Click "Add domain"
   - Enter: `english.ivsacademy.edu.vn`
   - Click "Add"

**This is CRITICAL for OAuth to work!**

Without this step, Google Sign-In will fail with:
```
Error: Unauthorized domain
```

---

### Step 5: Test Custom Domain

Once DNS has propagated and SSL is provisioned:

1. **Visit Custom Domain:**
   ```
   https://english.ivsacademy.edu.vn
   ```

2. **Test Authentication:**
   - Try logging in with Google
   - Try email/password login
   - Verify redirect works correctly

3. **Test All Features:**
   - Navigation
   - AI features
   - CRUD operations
   - Mobile responsive

---

## 📊 DNS Configuration Reference

### Current Setup
```
Domain: ivsacademy.edu.vn
Subdomain: english
Full Domain: english.ivsacademy.edu.vn
```

### Required DNS Records (Firebase will provide exact values)

**For Verification:**
```
Type: TXT
Name: @  (or ivsacademy.edu.vn)
Value: [Firebase TXT record]
TTL: 3600
```

**For Hosting (A Records - Preferred):**
```
Type: A
Name: english
Value: [Firebase IP 1]
TTL: 3600

Type: A
Name: english
Value: [Firebase IP 2]
TTL: 3600
```

**OR (CNAME - Alternative):**
```
Type: CNAME
Name: english
Value: english-c0f9d.web.app
TTL: 3600
```

---

## 🔍 Troubleshooting

### Domain not connecting?
1. **Check DNS propagation:**
   ```
   nslookup english.ivsacademy.edu.vn
   ```
   or use online tool: https://dnschecker.org

2. **Verify DNS records:**
   - Ensure A records or CNAME is correctly added
   - Check for typos in domain name
   - Confirm TTL is not too high

3. **Wait longer:**
   - DNS can take up to 48 hours
   - SSL certificate can take up to 24 hours

### Authentication failing?
1. **Check authorized domains:**
   - Firebase Console > Authentication > Settings
   - Ensure `english.ivsacademy.edu.vn` is listed

2. **Check authDomain in env.js:**
   ```javascript
   authDomain: "english.ivsacademy.edu.vn"
   ```

3. **Redeploy if needed:**
   ```powershell
   npm run build
   Copy-Item "env.js" "dist/env.js" -Force
   firebase deploy --only hosting
   ```

### SSL certificate not provisioning?
1. **Ensure DNS is correctly configured**
2. **Wait 24 hours** (Firebase auto-provisions)
3. **Check Firebase Console** for error messages
4. **Contact Firebase Support** if issue persists

---

## 📞 Support Resources

### Firebase Documentation
- Custom Domain Setup: https://firebase.google.com/docs/hosting/custom-domain
- Troubleshooting: https://firebase.google.com/docs/hosting/troubleshooting

### DNS Providers
- **Cloudflare:** https://dash.cloudflare.com
- **GoDaddy:** https://dcc.godaddy.com/manage/dns
- **Google Domains:** https://domains.google.com
- **Namecheap:** https://www.namecheap.com/myaccount/login

### Firebase Support
- Console: https://console.firebase.google.com/project/english-c0f9d
- Support: https://firebase.google.com/support

---

## ✅ Verification Checklist

Once DNS is configured, verify:

- [ ] Domain resolves to Firebase Hosting
  ```
  curl -I https://english.ivsacademy.edu.vn
  ```

- [ ] SSL certificate is valid (HTTPS works)
  - Look for padlock icon in browser

- [ ] Application loads correctly
  - Homepage visible
  - Assets load (CSS, JS, images)

- [ ] Authentication works
  - Google Sign-In
  - Email/Password
  - Redirects correctly

- [ ] All features functional
  - Navigation
  - Student/Teacher flows
  - AI features
  - CRUD operations

- [ ] Mobile responsive
  - Test on actual mobile devices
  - Test on different screen sizes

- [ ] Performance
  - Fast load times
  - No console errors
  - No broken links

---

## 🎯 Expected Timeline

| Task | Duration | Status |
|------|----------|--------|
| Code configuration | 5 min | ✅ Complete |
| Build & deploy | 2 min | ✅ Complete |
| Add domain in Firebase | 5 min | ⏳ Pending |
| Verify domain ownership | 10 min - 48 hrs | ⏳ Pending |
| Configure DNS records | 10 min | ⏳ Pending |
| DNS propagation | 5 min - 48 hrs | ⏳ Pending |
| SSL certificate | 5 min - 24 hrs | ⏳ Pending |
| Add to authorized domains | 2 min | ⏳ Pending |
| Testing | 30 min | ⏳ Pending |

**Total Estimated Time:** 1-72 hours (mostly waiting for DNS/SSL)

---

## 📝 Quick Command Reference

### Rebuild and Deploy
```powershell
# Build application
npm run build

# Copy env.js to dist
Copy-Item "env.js" "dist/env.js" -Force

# Deploy to Firebase
firebase deploy --only hosting
```

### Check DNS
```powershell
# Check A records
nslookup english.ivsacademy.edu.vn

# Check with specific DNS server
nslookup english.ivsacademy.edu.vn 8.8.8.8
```

### Test HTTPS
```powershell
# Check if site is accessible
curl -I https://english.ivsacademy.edu.vn

# Test SSL certificate
curl -v https://english.ivsacademy.edu.vn 2>&1 | Select-String "SSL"
```

---

## 🚀 Post-Setup Actions

After custom domain is live:

1. **Update Documentation:**
   - Update README with custom URL
   - Update any marketing materials
   - Update email signatures

2. **Set up Monitoring:**
   - Firebase Analytics
   - Performance monitoring
   - Error tracking

3. **Configure Redirects (Optional):**
   - Redirect .firebaseapp.com to custom domain
   - Set up www redirect if needed

4. **Inform Users:**
   - Send announcement email
   - Update social media
   - Update app stores (if applicable)

5. **SEO Optimization:**
   - Submit sitemap to Google
   - Update Google Search Console
   - Update social media meta tags

---

## 🎉 Success Criteria

Custom domain is successfully set up when:

✅ `https://english.ivsacademy.edu.vn` loads the application  
✅ SSL certificate is valid and trusted  
✅ Authentication works (especially Google OAuth)  
✅ All features functional  
✅ Mobile responsive  
✅ Performance is good (< 3s load time)  
✅ No console errors  

---

**Status:** ⏳ **Awaiting DNS Configuration**  
**Next Action:** Add custom domain in Firebase Console  
**ETA:** 1-72 hours after DNS setup  

---

**For questions or issues, refer to:**
- `DEPLOYMENT_STATUS.md` - Full deployment report
- `USER_GUIDE_QUICK.md` - User guide
- `PRODUCTION_CHECKLIST.md` - Complete checklist
