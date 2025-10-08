/**
 * Optimized imports for better tree shaking
 * Re-export commonly used utilities to reduce bundle size
 */

// Firebase - only import what we need
export {
  auth,
  db,
  firebaseInitError,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from '../services/firebase';

// Gemini AI - only import what we need
export {
  gradeWriting,
  createChat,
  translateToVietnamese,
  generateQuiz,
  generateSampleSentences,
  generateStoryStarter,
  isAiConfigured
} from '../services/geminiService';

// Cache utilities
export {
  cache,
  CACHE_KEYS
} from './cache';

// Logger
export {
  logger,
  logDebug,
  logInfo,
  logWarn,
  logError,
  logCritical
} from './logger';

// Excel utilities
export {
  exportToExcel,
  readExcelFile,
  generateTemplate,
  type ExcelData,
  type ExcelExportOptions
} from './excelHelper';

// Cache service
export {
  getCachedUser,
  getCachedClasses,
  invalidateUserCache,
  invalidateClassCache,
  invalidateUserCaches,
  preloadUserData,
  getCachedAIResponse,
  getCacheStats,
  clearAllCaches
} from '../services/cacheService';
