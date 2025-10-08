# ===================================================================
# ENGLISH FOR BUSINESS - APP CLEANUP & SETUP SCRIPT
# ===================================================================
# This script prepares the IVS English K-12 app to become
# English for Business - A Mobile-First Learning Platform
#
# Usage: .\setup-business-app.ps1
# ===================================================================

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "English for Business Setup" -ForegroundColor Cyan
Write-Host "Mobile-First Learning Platform" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup current app
Write-Host "[1/8] Creating backup..." -ForegroundColor Yellow
$backupDir = "backup-k12-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item -Path ".\*" -Destination ".\$backupDir\" -Recurse -Exclude @("node_modules", ".git", "backup-*")
Write-Host "✓ Backup created: $backupDir" -ForegroundColor Green
Write-Host ""

# Step 2: Remove K-12 specific data
Write-Host "[2/8] Removing K-12 curriculum data..." -ForegroundColor Yellow
$filesToRemove = @(
    "data\curriculum.ts",
    "data\g10.ts",
    "data\g11.ts", 
    "data\g12.ts",
    "data\adv1.ts",
    "data\adv2.ts",
    "data\adv3.ts",
    "data\adv4.ts",
    "data\demo-*.ts"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed: $file" -ForegroundColor Gray
    }
}
Write-Host "✓ Old curriculum data removed" -ForegroundColor Green
Write-Host ""

# Step 3: Remove K-12 specific components
Write-Host "[3/8] Removing K-12 specific components..." -ForegroundColor Yellow
$componentsToRemove = @(
    "components\Curriculum.tsx",
    "components\CourseDetail.tsx",
    "components\TeacherDashboard.tsx",
    "components\TestCreator.tsx",
    "components\TestTaker.tsx",
    "components\LessonView.tsx",
    "components\AIContentGenerator.tsx"
)

foreach ($component in $componentsToRemove) {
    if (Test-Path $component) {
        Remove-Item $component -Force
        Write-Host "  ✓ Removed: $component" -ForegroundColor Gray
    }
}
Write-Host "✓ Old components removed" -ForegroundColor Green
Write-Host ""

# Step 4: Archive documentation
Write-Host "[4/8] Archiving old documentation..." -ForegroundColor Yellow
$docsToArchive = @(
    "CURRICULUM_*.md",
    "THCS_*.md",
    "THPT_*.md",
    "IMPROVEMENTS_*.md",
    "SETTINGS_*.md"
)

New-Item -ItemType Directory -Path "archive\k12-docs" -Force | Out-Null

foreach ($pattern in $docsToArchive) {
    Get-ChildItem -Path "." -Filter $pattern | ForEach-Object {
        Move-Item $_.FullName -Destination "archive\k12-docs\" -Force
        Write-Host "  ✓ Archived: $($_.Name)" -ForegroundColor Gray
    }
}
Write-Host "✓ Documentation archived" -ForegroundColor Green
Write-Host ""

# Step 5: Create necessary directories
Write-Host "[5/8] Creating business app structure..." -ForegroundColor Yellow
$dirsToCreate = @(
    "data\business",
    "components\business",
    "docs\business",
    "public\images\business"
)

foreach ($dir in $dirsToCreate) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  ✓ Created: $dir" -ForegroundColor Gray
}
Write-Host "✓ Directory structure created" -ForegroundColor Green
Write-Host ""

# Step 6: Update package.json
Write-Host "[6/8] Updating package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    $packageJson.name = "english-for-business-ivs"
    $packageJson.version = "1.0.0"
    $packageJson.description = "Mobile-first English learning platform for business professionals"
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "✓ package.json updated" -ForegroundColor Green
} else {
    Write-Host "✗ package.json not found" -ForegroundColor Red
}
Write-Host ""

# Step 7: Clean node_modules and reinstall
Write-Host "[7/8] Cleaning dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  Removing node_modules..." -ForegroundColor Gray
    Remove-Item -Path "node_modules" -Recurse -Force
}
if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force
}
Write-Host "  Installing fresh dependencies..." -ForegroundColor Gray
npm install
Write-Host "✓ Dependencies cleaned and reinstalled" -ForegroundColor Green
Write-Host ""

# Step 8: Generate setup checklist
Write-Host "[8/8] Creating setup checklist..." -ForegroundColor Yellow

$checklist = @"
# ===================================================================
# ENGLISH FOR BUSINESS - SETUP CHECKLIST
# ===================================================================
# Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
# ===================================================================

## ✅ Completed Automatically

- [x] Backup created: $backupDir
- [x] K-12 curriculum data removed
- [x] Old components removed
- [x] Documentation archived
- [x] Directory structure created
- [x] package.json updated
- [x] Dependencies reinstalled

## 🔧 Manual Steps Required

### 1. Firebase Configuration
- [ ] Create new Firebase project: "english-for-business"
- [ ] Enable Authentication (Email, Google, Phone)
- [ ] Create Firestore database
- [ ] Update Firestore rules for business app
- [ ] Copy Firebase config to .env file

### 2. Environment Setup
- [ ] Copy .env.business.example to .env
- [ ] Add Firebase API keys
- [ ] Add Gemini AI API key (https://ai.google.dev)
- [ ] Add OpenAI API key (optional)
- [ ] Test environment variables

### 3. Content Migration
- [ ] Review data/business-modules.ts
- [ ] Customize module content
- [ ] Add industry-specific vocabulary
- [ ] Create sample emails/documents
- [ ] Add audio files for pronunciation

### 4. Branding
- [ ] Update app icons (192x192, 512x512)
- [ ] Update splash screen
- [ ] Customize color scheme in tailwind.config.cjs
- [ ] Update logo images in public/images/
- [ ] Update favicon

### 5. Components
- [ ] Review components/BusinessDashboard.tsx
- [ ] Update AuthPage.tsx for business context
- [ ] Modify Settings.tsx for business features
- [ ] Test mobile navigation
- [ ] Verify PWA installation

### 6. AI Features Setup
- [ ] Test AI Email Grader
- [ ] Test Meeting Simulator
- [ ] Test Presentation Coach
- [ ] Configure token costs
- [ ] Set up usage limits

### 7. Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test offline functionality
- [ ] Test PWA installation
- [ ] Test all learning modules
- [ ] Verify responsive design
- [ ] Check accessibility (WCAG AA)

### 8. Deployment
- [ ] Update firebase.json
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test production build
- [ ] Deploy to Firebase Hosting
- [ ] Set up analytics
- [ ] Configure monitoring

### 9. Documentation
- [ ] Review README_BUSINESS.md
- [ ] Create user guide
- [ ] Document API endpoints
- [ ] Create admin documentation
- [ ] Write contribution guidelines

### 10. Launch
- [ ] Beta testing with 10+ users
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Prepare marketing materials
- [ ] Submit to app stores (if native)
- [ ] Announce launch

## 🚀 Quick Start Commands

```bash
# Development
npm run dev

# Test mobile on local network
npm run dev -- --host

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## 📱 Mobile Testing URLs

- Local: http://localhost:5173
- Network: http://[YOUR_LOCAL_IP]:5173
- Production: https://english-business.web.app

## 🔗 Important Links

- Firebase Console: https://console.firebase.google.com
- Google AI Studio: https://ai.google.dev
- Tailwind Docs: https://tailwindcss.com/docs
- React 19 Docs: https://react.dev

## 📞 Support

- Issues: https://github.com/ivsjsc/english-business/issues
- Email: support@ivs.edu.vn
- Docs: https://docs.ivs.edu.vn

===================================================================
Next Step: Review this checklist and complete manual steps
===================================================================
"@

$checklist | Out-File -FilePath "SETUP_CHECKLIST.md" -Encoding UTF8
Write-Host "✓ Setup checklist created: SETUP_CHECKLIST.md" -ForegroundColor Green
Write-Host ""

# Final summary
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "✨ SETUP COMPLETED SUCCESSFULLY! ✨" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Review SETUP_CHECKLIST.md" -ForegroundColor White
Write-Host "  2. Configure Firebase (.env file)" -ForegroundColor White
Write-Host "  3. Customize business modules" -ForegroundColor White
Write-Host "  4. Test mobile interface" -ForegroundColor White
Write-Host "  5. Deploy to Firebase Hosting" -ForegroundColor White
Write-Host ""
Write-Host "📱 Start development:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "  README_BUSINESS.md" -ForegroundColor Cyan
Write-Host "  APP_CLONE_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Ready to build English for Business!" -ForegroundColor Green
Write-Host ""
