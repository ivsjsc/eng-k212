# Quick Firebase Domain Fix Script
# Run this PowerShell script to open the required Firebase/Google Cloud pages

Write-Host "🔥 Firebase Domain Authorization Fix" -ForegroundColor Red
Write-Host "Opening Firebase and Google Cloud Console pages..." -ForegroundColor Yellow

# Firebase Authentication Settings
$firebaseAuthUrl = "https://console.firebase.google.com/project/english-c0f9d/authentication/settings"
Write-Host "`n1️⃣  Opening Firebase Auth Settings..." -ForegroundColor Green
Start-Process $firebaseAuthUrl

Start-Sleep -Seconds 2

# Google Cloud OAuth Credentials
$googleOAuthUrl = "https://console.cloud.google.com/apis/credentials?project=english-c0f9d"
Write-Host "2️⃣  Opening Google Cloud OAuth Settings..." -ForegroundColor Green  
Start-Process $googleOAuthUrl

Write-Host "`n📋 TODO List:" -ForegroundColor Cyan
Write-Host "Firebase Console:" -ForegroundColor White
Write-Host "  ✅ Add 'khahome.cloud' to Authorized domains" -ForegroundColor Gray

Write-Host "`nGoogle Cloud Console:" -ForegroundColor White
Write-Host "  ✅ Add 'https://khahome.cloud' to JavaScript origins" -ForegroundColor Gray
Write-Host "  ✅ Add 'https://khahome.cloud/__/auth/handler' to Redirect URIs" -ForegroundColor Gray

Write-Host "`n⏱️  Wait 5-10 minutes after changes, then test the app!" -ForegroundColor Yellow
Write-Host "🌐 App URL: https://english-c0f9d.web.app" -ForegroundColor Green