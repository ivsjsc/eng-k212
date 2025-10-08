// services/sscoreService.ts
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs,
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { 
  User, 
  SScoreTransaction, 
  SScoreEventType,
  LessonProgress,
  RewardTier
} from '../types';
import { SSCORE_POINT_VALUES, REWARD_TIERS } from '../constants';

/**
 * Award S-Score points to a user for an event
 */
export async function awardSScore(
  userId: string,
  eventType: SScoreEventType,
  metadata?: Record<string, any>
): Promise<{ success: boolean; points: number; newTotal: number; error?: string }> {
  try {
    const points = SSCORE_POINT_VALUES[eventType] || 0;
    
    if (points === 0) {
      return { success: false, points: 0, newTotal: 0, error: 'Invalid event type' };
    }

    // Get current user data
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { success: false, points: 0, newTotal: 0, error: 'User not found' };
    }

    const userData = userSnap.data() as User;
    const currentSScore = userData.sscore || 0;
    const newTotal = currentSScore + points;

    // Update user's S-Score
    await updateDoc(userRef, {
      sscore: newTotal,
      tier: calculateTier(newTotal),
      lastActiveDate: new Date().toISOString(),
    });

    // Record transaction
    await addDoc(collection(db, 'sscoreTransactions'), {
      userId,
      eventType,
      points,
      description: getEventDescription(eventType, metadata),
      metadata: metadata || {},
      timestamp: serverTimestamp(),
    });

    return { success: true, points, newTotal };
  } catch (error) {
    console.error('Error awarding S-Score:', error);
    return { 
      success: false, 
      points: 0, 
      newTotal: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Track lesson completion and award points
 */
export async function completeLessonWithReward(
  userId: string,
  lessonId: string,
  courseId: string,
  score: number,
  timeSpent: number,
  isFirstTry: boolean = false
): Promise<{ success: boolean; pointsAwarded: number; error?: string }> {
  try {
    // Check if lesson already completed
    const progressQuery = query(
      collection(db, 'lessonProgress'),
      where('userId', '==', userId),
      where('lessonId', '==', lessonId),
      where('status', '==', 'completed')
    );
    
    const existingProgress = await getDocs(progressQuery);
    
    if (!existingProgress.empty) {
      return { 
        success: false, 
        pointsAwarded: 0, 
        error: 'Lesson already completed' 
      };
    }

    // Create lesson progress record
    const progressData: Omit<LessonProgress, 'id'> = {
      lessonId,
      courseId,
      userId,
      status: 'completed',
      completedAt: new Date().toISOString(),
      score,
      timeSpent,
      attemptsCount: 1,
      sscoreAwarded: SSCORE_POINT_VALUES.lesson_complete,
    };

    await addDoc(collection(db, 'lessonProgress'), progressData);

    // Award base points for completion
    const baseResult = await awardSScore(userId, 'lesson_complete', {
      lessonId,
      courseId,
      score,
    });

    let totalPoints = baseResult.points;

    // Bonus for first try
    if (isFirstTry) {
      const bonusResult = await awardSScore(userId, 'first_try_bonus', {
        lessonId,
        courseId,
      });
      totalPoints += bonusResult.points;
    }

    // Bonus for perfect score
    if (score === 100) {
      const perfectResult = await awardSScore(userId, 'quiz_perfect', {
        lessonId,
        courseId,
      });
      totalPoints += perfectResult.points;
    }

    // Update user's completed lessons
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      const completedLessons = userData.completedLessons || [];
      
      await updateDoc(userRef, {
        completedLessons: [...completedLessons, lessonId],
      });
    }

    return { success: true, pointsAwarded: totalPoints };
  } catch (error) {
    console.error('Error completing lesson with reward:', error);
    return { 
      success: false, 
      pointsAwarded: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Exchange S-Score points for AI tokens
 */
export async function exchangePointsForTokens(
  userId: string,
  pointsToExchange: number,
  tokensToReceive: number
): Promise<{ success: boolean; newSScore: number; newTokens: number; error?: string }> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { 
        success: false, 
        newSScore: 0, 
        newTokens: 0, 
        error: 'User not found' 
      };
    }

    const userData = userSnap.data() as User;
    const currentSScore = userData.sscore || 0;
    const currentTokens = userData.aiTokens || 0;

    if (currentSScore < pointsToExchange) {
      return { 
        success: false, 
        newSScore: currentSScore, 
        newTokens: currentTokens, 
        error: 'Insufficient S-Score points' 
      };
    }

    const newSScore = currentSScore - pointsToExchange;
    const newTokens = currentTokens + tokensToReceive;

    // Update user
    await updateDoc(userRef, {
      sscore: newSScore,
      aiTokens: newTokens,
    });

    // Record transaction
    await addDoc(collection(db, 'sscoreTransactions'), {
      userId,
      eventType: 'token_exchange',
      points: -pointsToExchange,
      description: `Exchanged ${pointsToExchange} S-Score for ${tokensToReceive} AI tokens`,
      metadata: { tokensReceived: tokensToReceive },
      timestamp: serverTimestamp(),
    });

    return { success: true, newSScore, newTokens };
  } catch (error) {
    console.error('Error exchanging points for tokens:', error);
    return { 
      success: false, 
      newSScore: 0, 
      newTokens: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Update daily streak and award bonus
 */
export async function updateStreak(userId: string): Promise<{ 
  success: boolean; 
  currentStreak: number; 
  bonusAwarded: boolean; 
}> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { success: false, currentStreak: 0, bonusAwarded: false };
    }

    const userData = userSnap.data() as User;
    const lastActiveDate = userData.lastActiveDate 
      ? new Date(userData.lastActiveDate) 
      : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = userData.currentStreak || 0;
    let bonusAwarded = false;

    if (lastActiveDate) {
      const lastActive = new Date(lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Already logged in today, no change
        return { success: true, currentStreak, bonusAwarded: false };
      } else if (daysDiff === 1) {
        // Consecutive day
        currentStreak += 1;
        bonusAwarded = true;
      } else {
        // Streak broken
        currentStreak = 1;
      }
    } else {
      // First login
      currentStreak = 1;
    }

    const longestStreak = Math.max(userData.longestStreak || 0, currentStreak);

    // Update user
    await updateDoc(userRef, {
      currentStreak,
      longestStreak,
      lastActiveDate: new Date().toISOString(),
    });

    // Award streak bonus if consecutive day
    if (bonusAwarded) {
      await awardSScore(userId, 'daily_streak_bonus', {
        streakCount: currentStreak,
      });
    }

    return { success: true, currentStreak, bonusAwarded };
  } catch (error) {
    console.error('Error updating streak:', error);
    return { success: false, currentStreak: 0, bonusAwarded: false };
  }
}

/**
 * Get user's S-Score transaction history
 */
export async function getSScoreHistory(
  userId: string,
  limitCount: number = 50
): Promise<SScoreTransaction[]> {
  try {
    const transactionsQuery = query(
      collection(db, 'sscoreTransactions'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(transactionsQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        eventType: data.eventType,
        points: data.points,
        description: data.description,
        metadata: data.metadata || {},
        timestamp: data.timestamp instanceof Timestamp 
          ? data.timestamp.toDate().toISOString() 
          : data.timestamp,
      } as SScoreTransaction;
    });
  } catch (error) {
    console.error('Error fetching S-Score history:', error);
    return [];
  }
}

/**
 * Calculate reward tier based on S-Score
 */
export function calculateTier(sscore: number): RewardTier {
  for (const tier of REWARD_TIERS) {
    if (sscore >= tier.minPoints && (tier.maxPoints === null || sscore <= tier.maxPoints)) {
      return tier.tier;
    }
  }
  return 'Bronze';
}

/**
 * Get event description for transaction
 */
function getEventDescription(eventType: SScoreEventType, metadata?: Record<string, any>): string {
  const descriptions: Record<SScoreEventType, string> = {
    lesson_complete: 'Completed lesson',
    test_passed: 'Passed test',
    quiz_perfect: 'Perfect quiz score',
    daily_streak_bonus: `Daily login streak (${metadata?.streakCount || 1} days)`,
    first_try_bonus: 'First try bonus',
    help_peer: 'Helped a peer',
    weekly_challenge: 'Completed weekly challenge',
    token_exchange: 'Exchanged for AI tokens',
    achievement_unlocked: `Unlocked achievement: ${metadata?.achievementName || 'Unknown'}`,
  };

  return descriptions[eventType] || 'Unknown event';
}

/**
 * Check if user can afford AI token cost
 */
export async function canAffordTokenCost(userId: string, cost: number): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return false;
    }

    const userData = userSnap.data() as User;
    const currentTokens = userData.aiTokens || 0;
    
    return currentTokens >= cost;
  } catch (error) {
    console.error('Error checking token affordability:', error);
    return false;
  }
}

/**
 * Deduct AI tokens for feature use
 */
export async function deductAITokens(
  userId: string,
  cost: number,
  feature: string
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { success: false, newBalance: 0, error: 'User not found' };
    }

    const userData = userSnap.data() as User;
    const currentTokens = userData.aiTokens || 0;

    if (currentTokens < cost) {
      return { 
        success: false, 
        newBalance: currentTokens, 
        error: 'Insufficient AI tokens' 
      };
    }

    const newBalance = currentTokens - cost;

    await updateDoc(userRef, {
      aiTokens: newBalance,
    });

    // Optional: Record token usage in a separate collection
    await addDoc(collection(db, 'tokenUsage'), {
      userId,
      feature,
      cost,
      timestamp: serverTimestamp(),
    });

    return { success: true, newBalance };
  } catch (error) {
    console.error('Error deducting AI tokens:', error);
    return { 
      success: false, 
      newBalance: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
