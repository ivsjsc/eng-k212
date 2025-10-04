import { FREE_TIER_LIMITS } from '../data/demo-ai-responses';

const STORAGE_KEY = 'ai_usage_tracker';

interface UsageData {
  date: string;
  totalAIRequests: number;
  writingGraderCount: number;
  aiTutorCount: number;
  speakingPartnerMinutes: number;
}

// Get today's date in YYYY-MM-DD format
const getTodayKey = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Get usage data for today
const getTodayUsage = (): UsageData => {
  const today = getTodayKey();
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    const data: UsageData = JSON.parse(stored);
    // Reset if it's a new day
    if (data.date !== today) {
      return {
        date: today,
        totalAIRequests: 0,
        writingGraderCount: 0,
        aiTutorCount: 0,
        speakingPartnerMinutes: 0,
      };
    }
    return data;
  }
  
  return {
    date: today,
    totalAIRequests: 0,
    writingGraderCount: 0,
    aiTutorCount: 0,
    speakingPartnerMinutes: 0,
  };
};

// Save usage data
const saveUsage = (data: UsageData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Check if user has reached daily limit
export const checkDailyLimit = (): boolean => {
  const usage = getTodayUsage();
  return usage.totalAIRequests < FREE_TIER_LIMITS.dailyAIRequests;
};

// Check if user can use writing grader
export const checkWritingGraderLimit = (): boolean => {
  const usage = getTodayUsage();
  return usage.writingGraderCount < FREE_TIER_LIMITS.writingGraderPerDay;
};

// Check if user can use AI tutor
export const checkAITutorLimit = (): boolean => {
  const usage = getTodayUsage();
  return usage.aiTutorCount < FREE_TIER_LIMITS.aiTutorQuestionsPerDay;
};

// Check if user can use speaking partner
export const checkSpeakingPartnerLimit = (): boolean => {
  const usage = getTodayUsage();
  return usage.speakingPartnerMinutes < FREE_TIER_LIMITS.speakingPartnerMinutesPerDay;
};

// Track writing grader usage
export const trackWritingGraderUsage = (): void => {
  const usage = getTodayUsage();
  usage.totalAIRequests += 1;
  usage.writingGraderCount += 1;
  saveUsage(usage);
};

// Track AI tutor usage
export const trackAITutorUsage = (): void => {
  const usage = getTodayUsage();
  usage.totalAIRequests += 1;
  usage.aiTutorCount += 1;
  saveUsage(usage);
};

// Track speaking partner usage (in minutes)
export const trackSpeakingPartnerUsage = (minutes: number = 1): void => {
  const usage = getTodayUsage();
  usage.totalAIRequests += 1;
  usage.speakingPartnerMinutes += minutes;
  saveUsage(usage);
};

// Get remaining requests for display
export const getRemainingRequests = () => {
  const usage = getTodayUsage();
  return {
    total: FREE_TIER_LIMITS.dailyAIRequests - usage.totalAIRequests,
    writingGrader: FREE_TIER_LIMITS.writingGraderPerDay - usage.writingGraderCount,
    aiTutor: FREE_TIER_LIMITS.aiTutorQuestionsPerDay - usage.aiTutorCount,
    speakingPartnerMinutes: FREE_TIER_LIMITS.speakingPartnerMinutesPerDay - usage.speakingPartnerMinutes,
  };
};

// Get usage stats for display
export const getUsageStats = () => {
  const usage = getTodayUsage();
  return {
    used: {
      total: usage.totalAIRequests,
      writingGrader: usage.writingGraderCount,
      aiTutor: usage.aiTutorCount,
      speakingPartnerMinutes: usage.speakingPartnerMinutes,
    },
    limits: FREE_TIER_LIMITS,
    remaining: getRemainingRequests(),
  };
};

// Reset usage (for testing purposes)
export const resetUsage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
