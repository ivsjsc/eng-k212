// Firebase Test Script - Frontend SDK
// Chạy script này trong browser console để test Firestore connection

import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase config - sẽ được load từ env
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

// Test function để đọc một class document
async function readClass(docId: string) {
  try {
    console.log(`📖 Reading class document: ${docId}`);
    const ref = doc(db, "classes", docId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      console.log('✅ Class data:', data);
      return data;
    } else {
      console.log('❌ Class document not found');
      return null;
    }
  } catch (error) {
    console.error('❌ Error reading class:', error);
    return null;
  }
}

// Test function để list tất cả classes
async function listAllClasses() {
  try {
    console.log('📚 Listing all classes...');
    const classesRef = collection(db, 'classes');
    const snapshot = await getDocs(classesRef);

    console.log(`✅ Found ${snapshot.size} classes:`);
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${doc.id}: ${data.name} (${data.students?.length || 0} students)`);
    });

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('❌ Error listing classes:', error);
    return [];
  }
}

// Test function để kiểm tra connection
async function testConnection() {
  try {
    console.log('🔗 Testing Firestore connection...');
    const testRef = collection(db, 'classes');
    const testQuery = await getDocs(testRef);

    console.log('✅ Firestore connection successful!');
    console.log(`📊 Found ${testQuery.size} documents in classes collection`);

    return true;
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    return false;
  }
}

// Export functions for global use
if (typeof window !== 'undefined') {
  (window as any).readClass = readClass;
  (window as any).listAllClasses = listAllClasses;
  (window as any).testConnection = testConnection;

  console.log('🔧 Firebase test functions loaded!');
  console.log('📋 Available commands:');
  console.log('  - testConnection()          // Test Firestore connection');
  console.log('  - listAllClasses()          // List all classes');
  console.log('  - readClass("classId")      // Read specific class');
  console.log('');
  console.log('💡 Example: readClass("10gr3pL3hNL...")');
}

// Auto-run connection test when loaded
if (typeof window !== 'undefined') {
  setTimeout(() => {
    testConnection();
  }, 1000);
}
