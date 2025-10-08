# Deploy Fix Script - Remove Netlify NextJS Plugin and Deploy
param(
    [Parameter(Mandatory=$true)]
    [string]$NetlifyToken,
    [string]$SiteId = "4e3ed67e-0d5f-4168-8a3d-34c755868180"
)

Write-Host "🚀 Starting deployment fix for IVS English Learning App..." -ForegroundColor Green

# Step 1: Try to remove NextJS plugin via Netlify API
Write-Host "`n📦 Attempting to remove @netlify/plugin-nextjs..."
$headers = @{
    "Authorization" = "Bearer $NetlifyToken"
    "Content-Type" = "application/json"
}

try {
    # List current plugins
    $pluginsUrl = "https://api.netlify.com/api/v1/sites/$SiteId/plugins"
    $plugins = Invoke-RestMethod -Uri $pluginsUrl -Headers $headers -Method Get
    
    if ($plugins) {
        Write-Host "Current plugins:" -ForegroundColor Yellow
        $plugins | ForEach-Object { Write-Host "  - $($_.package)" }
        
        # Find and remove NextJS plugin
        $nextjsPlugin = $plugins | Where-Object { $_.package -eq "@netlify/plugin-nextjs" }
        if ($nextjsPlugin) {
            Write-Host "`n🗑️  Removing @netlify/plugin-nextjs..." -ForegroundColor Yellow
            $removeUrl = "https://api.netlify.com/api/v1/sites/$SiteId/plugins/$($nextjsPlugin.id)"
            Invoke-RestMethod -Uri $removeUrl -Headers $headers -Method Delete
            Write-Host "✅ Plugin removed successfully!" -ForegroundColor Green
        } else {
            Write-Host "ℹ️  @netlify/plugin-nextjs not found - may already be removed." -ForegroundColor Cyan
        }
    }
} catch {
    Write-Host "⚠️  API plugin removal failed: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "ℹ️  Manual removal required: Netlify UI > Site Settings > Build & Deploy > Plugins" -ForegroundColor Cyan
}

# Step 2: Trigger clear cache deploy
Write-Host "`n🔄 Triggering clear cache deploy..."
try {
    $deployUrl = "https://api.netlify.com/api/v1/sites/$SiteId/builds"
    $deployBody = @{
        clear_cache = $true
    } | ConvertTo-Json
    
    $deploy = Invoke-RestMethod -Uri $deployUrl -Headers $headers -Method Post -Body $deployBody
    Write-Host "✅ Deploy triggered! ID: $($deploy.id)" -ForegroundColor Green
    Write-Host "🌐 Monitor at: https://app.netlify.com/sites/$SiteId/deploys" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Deploy trigger failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 Next steps:"
Write-Host "1. Monitor deploy at Netlify dashboard" -ForegroundColor White
Write-Host "2. If plugin removal failed, remove manually in Netlify UI" -ForegroundColor White  
Write-Host "3. App should load with Firebase config from public/env.js" -ForegroundColor White
Write-Host "`n✨ IVS English Learning App deployment fix complete!" -ForegroundColor Green