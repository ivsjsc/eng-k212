// Firebase Security Rules Tester
// Script để test security rules trước khi deploy

import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Test results interface
interface SecurityTestResult {
  testName: string;
  passed: boolean;
  error?: string;
  expected?: string;
  actual?: string;
}

// Security Rules Test Suite
export async function runSecurityTests(): Promise<SecurityTestResult[]> {
  const results: SecurityTestResult[] = [];

  console.log('🛡️  Running Firebase Security Rules Tests...');

  try {
    // Test 1: Anonymous user cannot read classes
    console.log('Test 1: Anonymous read access to classes');
    try {
      await signInAnonymously(auth);
      const testRef = doc(db, 'classes', 'test-class-id');
      await getDoc(testRef);
      results.push({
        testName: 'Anonymous read classes',
        passed: false,
        error: 'Anonymous user should not be able to read classes',
        expected: 'Permission denied',
        actual: 'Read successful'
      });
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        results.push({
          testName: 'Anonymous read classes',
          passed: true,
          expected: 'Permission denied'
        });
      } else {
        results.push({
          testName: 'Anonymous read classes',
          passed: false,
          error: error.message,
          expected: 'Permission denied',
          actual: error.code
        });
      }
    }

    // Test 2: Authenticated user can read their own profile
    console.log('Test 2: Authenticated user read own profile');
    // This would require a real authenticated user
    // For now, we'll skip this test in browser environment

    // Test 3: Check if classes collection structure is correct
    console.log('Test 3: Classes collection structure validation');
    try {
      const classesRef = collection(db, 'classes');
      const snapshot = await getDocs(classesRef);

      let validStructure = true;
      const issues: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        // Check required fields
        const requiredFields = ['name', 'teacherId', 'students', 'subject', 'grade'];
        for (const field of requiredFields) {
          if (!(field in data)) {
            validStructure = false;
            issues.push(`Class ${doc.id} missing field: ${field}`);
          }
        }

        // Check data types
        if (data.students && !Array.isArray(data.students)) {
          validStructure = false;
          issues.push(`Class ${doc.id} students field is not an array`);
        }
      });

      results.push({
        testName: 'Classes collection structure',
        passed: validStructure,
        error: validStructure ? undefined : issues.join('; '),
        expected: 'All classes have required fields with correct types',
        actual: validStructure ? 'Valid' : 'Invalid'
      });

    } catch (error: any) {
      results.push({
        testName: 'Classes collection structure',
        passed: false,
        error: error.message,
        expected: 'Read access to classes',
        actual: 'Error occurred'
      });
    }

  } catch (error) {
    console.error('❌ Error running security tests:', error);
  }

  // Print results
  console.log('\n📊 Security Test Results:');
  results.forEach((result, index) => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} Test ${index + 1}: ${result.testName}`);
    if (!result.passed) {
      console.log(`   Error: ${result.error}`);
      console.log(`   Expected: ${result.expected}`);
      console.log(`   Actual: ${result.actual}`);
    }
  });

  const passedCount = results.filter(r => r.passed).length;
  console.log(`\n🎯 Summary: ${passedCount}/${results.length} tests passed`);

  return results;
}

// Function to test specific operations
export async function testSpecificOperation(operation: string, collectionName: string, docId?: string) {
  console.log(`🔍 Testing ${operation} on ${collectionName}${docId ? `/${docId}` : ''}`);

  try {
    switch (operation) {
      case 'read':
        if (docId) {
          const ref = doc(db, collectionName, docId);
          await getDoc(ref);
          console.log('✅ Read operation successful');
        } else {
          const ref = collection(db, collectionName);
          await getDocs(ref);
          console.log('✅ List operation successful');
        }
        break;

      case 'write':
        if (docId) {
          const ref = doc(db, collectionName, docId);
          await setDoc(ref, { test: 'data' });
          console.log('✅ Write operation successful');
        }
        break;

      default:
        console.log('❓ Unknown operation');
    }
  } catch (error: any) {
    console.log(`❌ ${operation} operation failed:`, error.message);
    if (error.code) {
      console.log(`   Error code: ${error.code}`);
    }
  }
}

// Export for browser console use
if (typeof window !== 'undefined') {
  (window as any).runSecurityTests = runSecurityTests;
  (window as any).testSpecificOperation = testSpecificOperation;

  console.log('🛡️  Security test functions loaded!');
  console.log('📋 Available commands:');
  console.log('  - runSecurityTests()                    // Run full security test suite');
  console.log('  - testSpecificOperation("read", "classes", "docId")  // Test specific operation');
  console.log('');
  console.log('💡 Example: testSpecificOperation("read", "classes")');
}
