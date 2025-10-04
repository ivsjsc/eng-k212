# Quick Deploy Script for IVS English App
# Usage: .\deploy.ps1

Write-Host "`n🚀 IVS English - Quick Deploy to Firebase Hosting`n" -ForegroundColor Cyan

# Step 1: Build
Write-Host "📦 Building app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!`n" -ForegroundColor Green
    
    # Step 2: Deploy
    Write-Host "🔥 Deploying to Firebase Hosting..." -ForegroundColor Yellow
    firebase deploy --only hosting:app
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Deployment successful!`n" -ForegroundColor Green
        Write-Host "🌐 Your app is live at:" -ForegroundColor Cyan
        Write-Host "   → https://english-c0f9d.web.app`n" -ForegroundColor White
        
        # Optional: Open in browser
        $response = Read-Host "Open in browser? (y/n)"
        if ($response -eq "y" -or $response -eq "Y") {
            Start-Process "https://english-c0f9d.web.app"
        }
    } else {
        Write-Host "`n❌ Deployment failed!`n" -ForegroundColor Red
        Write-Host "Check the error messages above and try again.`n" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n❌ Build failed!`n" -ForegroundColor Red
    Write-Host "Fix the build errors and try again.`n" -ForegroundColor Yellow
}
