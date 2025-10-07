// Firebase Firestore Data Integrity Checker
// Script để kiểm tra toàn vẹn dữ liệu classes và related collections

import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
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

// Interface cho class document
interface ClassDocument {
  id: string;
  name: string;
  teacherId: string;
  students: string[];
  subject: string;
  grade: string;
  schedule: any;
  createdAt: any;
  updatedAt: any;
  status: 'active' | 'inactive';
}

// Interface cho student document
interface StudentDocument {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar?: string;
  role: string;
  createdAt: any;
}

// Report interface
interface IntegrityReport {
  totalClasses: number;
  validClasses: number;
  invalidClasses: number;
  missingFields: string[];
  orphanedClasses: string[]; // Classes with non-existent teachers
  emptyClasses: string[]; // Classes with no students
  invalidStudents: string[]; // Students referenced but don't exist
  schemaInconsistencies: any[];
  executionTime: number;
}

// Hàm kiểm tra một class document
async function validateClassDocument(classId: string, classData: any): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields check
  const requiredFields = ['name', 'teacherId', 'students', 'subject', 'grade', 'createdAt'];
  for (const field of requiredFields) {
    if (!classData[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Data type validation
  if (classData.name && typeof classData.name !== 'string') {
    errors.push('name must be string');
  }
  if (classData.teacherId && typeof classData.teacherId !== 'string') {
    errors.push('teacherId must be string');
  }
  if (classData.students && !Array.isArray(classData.students)) {
    errors.push('students must be array');
  }
  if (classData.subject && typeof classData.subject !== 'string') {
    errors.push('subject must be string');
  }
  if (classData.grade && typeof classData.grade !== 'string') {
    errors.push('grade must be string');
  }

  // Check if teacher exists
  if (classData.teacherId) {
    try {
      const teacherRef = doc(db, 'users', classData.teacherId);
      const teacherSnap = await getDoc(teacherRef);
      if (!teacherSnap.exists()) {
        errors.push(`Teacher ${classData.teacherId} does not exist`);
      } else {
        const teacherData = teacherSnap.data();
        if (teacherData?.role !== 'teacher') {
          warnings.push(`Teacher ${classData.teacherId} has role: ${teacherData?.role}`);
        }
      }
    } catch (err) {
      errors.push(`Error checking teacher ${classData.teacherId}: ${err}`);
    }
  }

  // Check students array
  if (classData.students && Array.isArray(classData.students)) {
    if (classData.students.length === 0) {
      warnings.push('Class has no students');
    }

    // Check if all students exist (sample check - first 5 students)
    const studentsToCheck = classData.students.slice(0, 5);
    for (const studentId of studentsToCheck) {
      try {
        const studentRef = doc(db, 'users', studentId);
        const studentSnap = await getDoc(studentRef);
        if (!studentSnap.exists()) {
          errors.push(`Student ${studentId} does not exist`);
        }
      } catch (err) {
        errors.push(`Error checking student ${studentId}: ${err}`);
      }
    }
  }

  // Status validation
  if (classData.status && !['active', 'inactive'].includes(classData.status)) {
    warnings.push(`Invalid status: ${classData.status}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Hàm chính để kiểm tra toàn bộ dữ liệu
export async function checkDataIntegrity(): Promise<IntegrityReport> {
  const startTime = Date.now();
  console.log('🔍 Starting data integrity check...');

  const report: IntegrityReport = {
    totalClasses: 0,
    validClasses: 0,
    invalidClasses: 0,
    missingFields: [],
    orphanedClasses: [],
    emptyClasses: [],
    invalidStudents: [],
    schemaInconsistencies: [],
    executionTime: 0
  };

  try {
    // Get all classes
    const classesRef = collection(db, 'classes');
    const classesSnapshot = await getDocs(classesRef);

    report.totalClasses = classesSnapshot.size;
    console.log(`📚 Found ${report.totalClasses} classes to check`);

    // Process each class
    for (const classDoc of classesSnapshot.docs) {
      const classId = classDoc.id;
      const classData = classDoc.data();

      console.log(`🔍 Checking class: ${classData.name || classId}`);

      const validation = await validateClassDocument(classId, classData);

      if (validation.isValid) {
        report.validClasses++;
      } else {
        report.invalidClasses++;
        console.log(`❌ Invalid class ${classId}:`, validation.errors);
      }

      // Collect warnings
      if (validation.warnings.length > 0) {
        console.log(`⚠️  Warnings for class ${classId}:`, validation.warnings);
      }

      // Track specific issues
      if (validation.errors.some(e => e.includes('teacher'))) {
        report.orphanedClasses.push(classId);
      }
      if (validation.warnings.some(w => w.includes('no students'))) {
        report.emptyClasses.push(classId);
      }
      if (validation.errors.some(e => e.includes('student'))) {
        report.invalidStudents.push(classId);
      }
    }

    report.executionTime = Date.now() - startTime;

    console.log('✅ Data integrity check completed!');
    console.log('📊 Report:', report);

  } catch (error) {
    console.error('❌ Error during integrity check:', error);
    report.executionTime = Date.now() - startTime;
  }

  return report;
}

// Hàm test đơn giản để đọc một class
export async function readClass(docId: string) {
  try {
    console.log(`📖 Reading class: ${docId}`);
    const ref = doc(db, "classes", docId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      console.log('✅ Class data:', data);
      return data;
    } else {
      console.log('❌ Class not found');
      return null;
    }
  } catch (error) {
    console.error('❌ Error reading class:', error);
    return null;
  }
}

// Export functions for use in browser console or other scripts
if (typeof window !== 'undefined') {
  (window as any).checkDataIntegrity = checkDataIntegrity;
  (window as any).readClass = readClass;
  console.log('🔧 Data integrity functions loaded. Use:');
  console.log('  - readClass("classId")');
  console.log('  - checkDataIntegrity()');
}
