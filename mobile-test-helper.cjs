#!/usr/bin/env node

/**
 * Mobile Testing Helper Script
 * Generates QR codes and testing URLs for mobile device testing
 */

const fs = require('fs');
const path = require('path');

console.log('📱 English for Business - Mobile Testing Helper');
console.log('================================================\n');

// Network URLs for testing
const urls = {
  local: 'http://localhost:3000/',
  network: 'http://192.168.1.6:3000/'
};

console.log('🌐 Testing URLs:');
console.log(`   Local:   ${urls.local}`);
console.log(`   Network: ${urls.network}\n`);

console.log('📋 Testing Checklist:');
console.log('1. Open URLs on mobile devices');
console.log('2. Test all 4 views: Home, Roadmap, Accent, Videos');
console.log('3. Check touch interactions and responsiveness');
console.log('4. Verify video embeds work');
console.log('5. Test in both portrait and landscape\n');

console.log('🔧 Quick Commands:');
console.log('   npm run dev    # Start dev server');
console.log('   npm run build  # Production build');
console.log('   npm run test   # Run tests (if available)\n');

console.log('📱 Mobile Testing Tips:');
console.log('• Use Chrome DevTools Device Mode for initial testing');
console.log('• Test on actual devices for real touch feedback');
console.log('• Check different screen sizes (375px - 1536px)');
console.log('• Verify touch targets are at least 44px');
console.log('• Test video playback and YouTube embeds\n');

console.log('🎯 Focus Areas:');
console.log('• BusinessDashboard: Module navigation');
console.log('• LearningRoadmap: 30-day progress tracking');
console.log('• AccentTraining: Pronunciation exercises');
console.log('• ChannelShowcase: Video integration\n');

console.log('📊 Performance Targets:');
console.log('• Initial load: < 3 seconds');
console.log('• Navigation: < 1 second');
console.log('• Touch response: < 100ms');
console.log('• Memory usage: < 100MB\n');

console.log('✅ Ready for mobile testing!');

// Generate a simple HTML file for easy QR code generation
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Mobile Testing - English for Business</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
        .url { background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0; word-break: break-all; }
        .qr-placeholder { background: #eee; padding: 20px; text-align: center; border: 2px dashed #ccc; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>📱 English for Business - Mobile Testing</h1>
    <p>Scan QR codes or use these URLs on your mobile devices:</p>

    <h3>Network URL (for mobile devices):</h3>
    <div class="url">${urls.network}</div>

    <h3>Local URL (for same network):</h3>
    <div class="url">${urls.local}</div>

    <div class="qr-placeholder">
        <p>📷 QR Code would go here</p>
        <small>Use a QR code generator with the network URL above</small>
    </div>

    <h3>Testing Checklist:</h3>
    <ul>
        <li>Test all 4 views: Home, Roadmap, Accent, Videos</li>
        <li>Check touch interactions and responsiveness</li>
        <li>Verify video embeds work properly</li>
        <li>Test in both portrait and landscape orientations</li>
        <li>Check font sizes and readability</li>
    </ul>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'mobile-test.html'), htmlContent);
console.log('\n📄 Generated mobile-test.html for easy sharing');