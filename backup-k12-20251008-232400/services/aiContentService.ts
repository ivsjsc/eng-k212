/**
 * AI Content Service with caching support
 * Wraps geminiService functions with intelligent caching to improve performance
 */

import { cache } from '../utils/cache';
// import * as geminiService from './geminiService'; // Dynamic import
import { isAiConfigured, gradeWriting, createChat, translateToVietnamese } from './geminiService';
import type { 
  CurriculumLesson, 
  QuizQuestion,
  GeneratedSentence,
  DifficultyLevel,
  QuestionType,
  GeneratedConversation,
  LessonPlan,
  ReadingPassage,
  GrammarExercise
} from '../types';
import { logger } from '../utils/logger';

// Cache TTL settings (in milliseconds)
const CACHE_TTL = {
  QUIZ: 30 * 60 * 1000,          // 30 minutes
  CONVERSATION: 30 * 60 * 1000,  // 30 minutes
  LESSON_PLAN: 60 * 60 * 1000,   // 1 hour
  READING: 60 * 60 * 1000,       // 1 hour
  GRAMMAR: 30 * 60 * 1000,       // 30 minutes
  SENTENCES: 30 * 60 * 1000,     // 30 minutes
  STORY: 15 * 60 * 1000,         // 15 minutes
};

/**
 * Generate a cache key for AI content
 */
function generateCacheKey(
  type: string,
  lessonId: string | number,
  language: string,
  options?: any
): string {
  const optionsStr = options ? JSON.stringify(options) : '';
  return `ai:${type}:${lessonId}:${language}:${btoa(optionsStr)}`;
}

/**
 * Generate quiz with caching
 */
export async function generateQuizCached(
  lesson: CurriculumLesson,
  language: 'en' | 'vi',
  options: {
    numQuestions?: number;
    difficulty?: DifficultyLevel;
    questionTypes?: QuestionType[];
  } = {}
): Promise<QuizQuestion[]> {
  const { generateQuiz } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('quiz', lesson.id, language, options);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateQuiz(lesson, language, options),
      CACHE_TTL.QUIZ
    );
  } catch (error) {
    logger.error('Error generating cached quiz:', error);
    throw error;
  }
}

/**
 * Generate conversation with caching
 */
export async function generateConversationCached(
  lesson: CurriculumLesson,
  language: 'en' | 'vi',
  options: {
    scenario?: string;
    level?: string;
    numTurns?: number;
  } = {}
): Promise<GeneratedConversation> {
  const { generateConversation } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('conversation', lesson.id, language, options);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateConversation(lesson, language, options),
      CACHE_TTL.CONVERSATION
    );
  } catch (error) {
    logger.error('Error generating cached conversation:', error);
    throw error;
  }
}

/**
 * Generate lesson plan with caching
 */
export async function generateLessonPlanCached(
  lesson: CurriculumLesson,
  language: 'en' | 'vi',
  options: {
    duration?: string;
  } = {}
): Promise<LessonPlan> {
  const { generateLessonPlan } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('lesson-plan', lesson.id, language, options);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateLessonPlan(lesson, language, options),
      CACHE_TTL.LESSON_PLAN
    );
  } catch (error) {
    logger.error('Error generating cached lesson plan:', error);
    throw error;
  }
}

/**
 * Generate reading passage with caching
 */
export async function generateReadingPassageCached(
  topic: string,
  language: 'en' | 'vi',
  options: {
    level?: string;
    length?: 'short' | 'medium' | 'long';
    numQuestions?: number;
  } = {}
): Promise<ReadingPassage> {
  const { generateReadingPassage } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('reading', topic, language, options);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateReadingPassage(topic, language, options),
      CACHE_TTL.READING
    );
  } catch (error) {
    logger.error('Error generating cached reading passage:', error);
    throw error;
  }
}

/**
 * Generate grammar exercise with caching
 */
export async function generateGrammarExerciseCached(
  grammarPoint: string,
  language: 'en' | 'vi',
  options: {
    numQuestions?: number;
  } = {}
): Promise<GrammarExercise> {
  const { generateGrammarExercise } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('grammar', grammarPoint, language, options);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateGrammarExercise(grammarPoint, language, options),
      CACHE_TTL.GRAMMAR
    );
  } catch (error) {
    logger.error('Error generating cached grammar exercise:', error);
    throw error;
  }
}

/**
 * Generate sample sentences with caching
 */
export async function generateSampleSentencesCached(
  lesson: CurriculumLesson,
  language: 'en' | 'vi'
): Promise<GeneratedSentence[]> {
  const { generateSampleSentences } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('sentences', lesson.id, language);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateSampleSentences(lesson, language),
      CACHE_TTL.SENTENCES
    );
  } catch (error) {
    logger.error('Error generating cached sentences:', error);
    throw error;
  }
}

/**
 * Generate story starter with caching
 */
export async function generateStoryStarterCached(
  lesson: CurriculumLesson,
  language: 'en' | 'vi'
): Promise<string> {
  const { generateStoryStarter } = await import('./geminiService');
  
  const cacheKey = generateCacheKey('story', lesson.id, language);
  
  try {
    return await cache.getOrSet(
      cacheKey,
      () => generateStoryStarter(lesson, language),
      CACHE_TTL.STORY
    );
  } catch (error) {
    logger.error('Error generating cached story starter:', error);
    throw error;
  }
}

/**
 * Clear all AI content cache
 */
export function clearAICache(): void {
  cache.clear();
  logger.info('AI content cache cleared');
}

/**
 * Get cache statistics
 */
export function getAICacheStats() {
  return cache.getStats();
}

// Re-export non-cached functions that don't benefit from caching
export { 
  isAiConfigured,
  gradeWriting,
  createChat,
  translateToVietnamese
} from './geminiService';
