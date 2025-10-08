#!/usr/bin/env node

/**
 * ENGLISH LEARNERS - Microsoft OAuth2 Setup & Test Script
 *
 * This script helps you set up and test Microsoft OAuth2 integration
 * for the ENGLISH LEARNERS application.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 ENGLISH LEARNERS - Microsoft OAuth2 Setup\n');

// Check if .env.oauth exists
const envPath = path.join(__dirname, '.env.oauth');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.oauth file not found!');
  console.log('Please create .env.oauth file with your OAuth configuration.\n');
  process.exit(1);
}

// Check if required dependencies are installed
const packagePath = path.join(__dirname, 'package-oauth.json');
if (!fs.existsSync(packagePath)) {
  console.log('❌ package-oauth.json not found!');
  process.exit(1);
}

console.log('✅ Configuration files found');

// Read and validate .env.oauth
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

const envVars = {};
envLines.forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

// Check required environment variables
const requiredVars = [
  'OAUTH_CLIENT_ID',
  'OAUTH_CLIENT_SECRET',
  'OAUTH_TENANT_ID',
  'OAUTH_REDIRECT_URI'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!envVars[varName] || envVars[varName] === `your-${varName.toLowerCase()}-here`) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('\n❌ Missing or placeholder environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nPlease update .env.oauth with your actual values.\n');

  if (missingVars.includes('OAUTH_CLIENT_SECRET')) {
    console.log('💡 To get CLIENT_SECRET:');
    console.log('   1. Go to Azure Portal');
    console.log('   2. Navigate to your App Registration');
    console.log('   3. Go to Certificates & Secrets');
    console.log('   4. Create a new client secret');
    console.log('   5. Copy the secret value to OAUTH_CLIENT_SECRET\n');
  }

  process.exit(1);
}

console.log('✅ Environment variables configured');

// Validate OAuth configuration
const clientId = envVars.OAUTH_CLIENT_ID;
const tenantId = envVars.OAUTH_TENANT_ID;
const redirectUri = envVars.OAUTH_REDIRECT_URI;

console.log('\n🔧 OAuth Configuration:');
console.log(`   Client ID: ${clientId}`);
console.log(`   Tenant ID: ${tenantId}`);
console.log(`   Redirect URI: ${redirectUri}`);

// Generate test URLs
const testUrls = {
  localServer: 'http://localhost:3000',
  loginUrl: 'http://localhost:3000/auth/microsoft',
  callbackUrl: 'http://localhost:3000/auth/callback',
  healthCheck: 'http://localhost:3000/health',
  frontendTest: 'http://localhost:3000/oauth-test.html'
};

console.log('\n🌐 Test URLs:');
Object.entries(testUrls).forEach(([name, url]) => {
  console.log(`   ${name}: ${url}`);
});

console.log('\n📋 Next Steps:');
console.log('1. Install dependencies: npm install --package-lock-only package-oauth.json');
console.log('2. Start OAuth server: npm run oauth-server');
console.log('3. Open browser and go to: http://localhost:3000');
console.log('4. Click "Sign in with Microsoft" to test OAuth flow');
console.log('5. Check server logs for detailed information');

console.log('\n🔍 Test Commands:');
console.log('   curl http://localhost:3000/health                    # Health check');
console.log('   curl http://localhost:3000/auth/microsoft           # Start OAuth flow');
console.log('   open http://localhost:3000/oauth-test.html          # Frontend test page');

console.log('\n📚 Documentation:');
console.log('   Azure Portal: https://portal.azure.com');
console.log('   Microsoft OAuth2: https://docs.microsoft.com/en-us/azure/active-directory/develop/');
console.log('   MSAL.js: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview');

console.log('\n✨ Setup complete! Ready to test Microsoft OAuth2 integration.\n');

process.exit(0);