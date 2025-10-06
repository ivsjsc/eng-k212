// services/testService.ts
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Test, TestResult, TestQuestion } from '../types';
import { awardSScore } from './sscoreService';

/**
 * Create a new test
 */
export async function createTest(
  test: Omit<Test, 'id' | 'createdAt'>
): Promise<{ success: boolean; testId?: string; error?: string }> {
  try {
    const testData = {
      ...test,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'tests'), testData);

    return { success: true, testId: docRef.id };
  } catch (error) {
    console.error('Error creating test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get test by ID
 */
export async function getTest(testId: string): Promise<Test | null> {
  try {
    const testRef = doc(db, 'tests', testId);
    const testSnap = await getDoc(testRef);

    if (!testSnap.exists()) {
      return null;
    }

    const data = testSnap.data();
    return {
      id: testSnap.id,
      courseId: data.courseId,
      unitId: data.unitId,
      title: data.title,
      description: data.description,
      questions: data.questions,
      passingScore: data.passingScore,
      timeLimit: data.timeLimit,
      sscoreReward: data.sscoreReward,
      createdBy: data.createdBy,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
      isPublished: data.isPublished,
    } as Test;
  } catch (error) {
    console.error('Error getting test:', error);
    return null;
  }
}

/**
 * Get tests for a course
 */
export async function getTestsForCourse(courseId: string): Promise<Test[]> {
  try {
    const testsQuery = query(
      collection(db, 'tests'),
      where('courseId', '==', courseId),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(testsQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        courseId: data.courseId,
        unitId: data.unitId,
        title: data.title,
        description: data.description,
        questions: data.questions,
        passingScore: data.passingScore,
        timeLimit: data.timeLimit,
        sscoreReward: data.sscoreReward,
        createdBy: data.createdBy,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
        isPublished: data.isPublished,
      } as Test;
    });
  } catch (error) {
    console.error('Error getting tests for course:', error);
    return [];
  }
}

/**
 * Submit test and calculate score
 */
export async function submitTest(
  testId: string,
  userId: string,
  answers: Record<string, string | string[]>,
  timeSpent: number
): Promise<{
  success: boolean;
  score?: number;
  passed?: boolean;
  sscoreAwarded?: number;
  resultId?: string;
  error?: string;
}> {
  try {
    // Get test
    const test = await getTest(testId);
    if (!test) {
      return { success: false, error: 'Test not found' };
    }

    // Calculate score
    const { score, correctAnswers } = calculateTestScore(test.questions, answers);

    // Determine if passed
    const passed = score >= test.passingScore;

    // Create result
    const resultData: Omit<TestResult, 'id'> = {
      testId,
      userId,
      answers,
      score,
      passed,
      timeSpent,
      completedAt: new Date().toISOString(),
      sscoreAwarded: passed ? test.sscoreReward : 0,
    };

    const resultRef = await addDoc(collection(db, 'testResults'), {
      ...resultData,
      completedAt: serverTimestamp(),
    });

    // Award S-Score if passed
    if (passed) {
      await awardSScore(userId, 'test_passed', {
        testId,
        score,
        courseId: test.courseId,
      });

      // Update user's totalTestsPassed
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        await updateDoc(userRef, {
          totalTestsPassed: (userData.totalTestsPassed || 0) + 1,
        });
      }
    }

    return {
      success: true,
      score,
      passed,
      sscoreAwarded: passed ? test.sscoreReward : 0,
      resultId: resultRef.id,
    };
  } catch (error) {
    console.error('Error submitting test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Calculate test score
 */
function calculateTestScore(
  questions: TestQuestion[],
  answers: Record<string, string | string[]>
): { score: number; correctAnswers: number } {
  let correctAnswers = 0;
  const totalQuestions = questions.length;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    
    if (!userAnswer) {
      return; // Skip unanswered questions
    }

    // Normalize answers for comparison
    const correctAnswer = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.sort().join('|')
      : String(question.correctAnswer).toLowerCase().trim();

    const givenAnswer = Array.isArray(userAnswer)
      ? userAnswer.sort().join('|')
      : String(userAnswer).toLowerCase().trim();

    if (correctAnswer === givenAnswer) {
      correctAnswers++;
    }
  });

  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return { score, correctAnswers };
}

/**
 * Get user's test results
 */
export async function getUserTestResults(
  userId: string,
  testId?: string
): Promise<TestResult[]> {
  try {
    let resultsQuery;

    if (testId) {
      resultsQuery = query(
        collection(db, 'testResults'),
        where('userId', '==', userId),
        where('testId', '==', testId),
        orderBy('completedAt', 'desc')
      );
    } else {
      resultsQuery = query(
        collection(db, 'testResults'),
        where('userId', '==', userId),
        orderBy('completedAt', 'desc')
      );
    }

    const snapshot = await getDocs(resultsQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        testId: data.testId,
        userId: data.userId,
        answers: data.answers,
        score: data.score,
        passed: data.passed,
        timeSpent: data.timeSpent,
        completedAt: data.completedAt instanceof Timestamp ? data.completedAt.toDate().toISOString() : data.completedAt,
        sscoreAwarded: data.sscoreAwarded,
      } as TestResult;
    });
  } catch (error) {
    console.error('Error getting user test results:', error);
    return [];
  }
}

/**
 * Update test
 */
export async function updateTest(
  testId: string,
  updates: Partial<Omit<Test, 'id' | 'createdAt' | 'createdBy'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const testRef = doc(db, 'tests', testId);
    await updateDoc(testRef, updates);

    return { success: true };
  } catch (error) {
    console.error('Error updating test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete test
 */
export async function deleteTest(testId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const testRef = doc(db, 'tests', testId);
    await deleteDoc(testRef);

    return { success: true };
  } catch (error) {
    console.error('Error deleting test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if user has taken test
 */
export async function hasUserTakenTest(
  userId: string,
  testId: string
): Promise<boolean> {
  try {
    const resultsQuery = query(
      collection(db, 'testResults'),
      where('userId', '==', userId),
      where('testId', '==', testId)
    );

    const snapshot = await getDocs(resultsQuery);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking if user took test:', error);
    return false;
  }
}

/**
 * Get test statistics
 */
export async function getTestStatistics(testId: string): Promise<{
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  averageTime: number;
}> {
  try {
    const resultsQuery = query(
      collection(db, 'testResults'),
      where('testId', '==', testId)
    );

    const snapshot = await getDocs(resultsQuery);
    const results = snapshot.docs.map((doc) => doc.data());

    const totalAttempts = results.length;
    
    if (totalAttempts === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        passRate: 0,
        averageTime: 0,
      };
    }

    const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
    const averageScore = Math.round(totalScore / totalAttempts);

    const passedCount = results.filter((r) => r.passed).length;
    const passRate = Math.round((passedCount / totalAttempts) * 100);

    const totalTime = results.reduce((sum, r) => sum + (r.timeSpent || 0), 0);
    const averageTime = Math.round(totalTime / totalAttempts);

    return {
      totalAttempts,
      averageScore,
      passRate,
      averageTime,
    };
  } catch (error) {
    console.error('Error getting test statistics:', error);
    return {
      totalAttempts: 0,
      averageScore: 0,
      passRate: 0,
      averageTime: 0,
    };
  }
}
