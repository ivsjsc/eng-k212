/**
 * Content export utilities for AI-generated content
 * Supports PDF, JSON, and Excel export formats
 */

import { exportToExcel, type ExcelData } from './excelHelper';
import type { 
  QuizQuestion, 
  GeneratedConversation, 
  LessonPlan, 
  ReadingPassage,
  GrammarExercise 
} from '../types';

/**
 * Export quiz to JSON format
 */
export function exportQuizToJSON(
  quiz: QuizQuestion[],
  lessonTitle: string
): void {
  const data = {
    lessonTitle,
    generatedAt: new Date().toISOString(),
    questions: quiz
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `quiz-${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export quiz to Excel format
 */
export async function exportQuizToExcel(
  quiz: QuizQuestion[],
  lessonTitle: string
): Promise<void> {
  const headers = ['#', 'Question', 'Type', 'Difficulty', 'Options', 'Answer'];
  const rows = quiz.map((q, index) => [
    index + 1,
    q.question,
    q.type || 'multiple-choice',
    q.difficulty || 'Intermediate',
    q.options.join(' | '),
    q.answer
  ]);

  const data: ExcelData = { headers, rows };
  
  await exportToExcel(data, {
    filename: `quiz-${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.xlsx`,
    sheetName: 'Quiz',
    title: `Quiz: ${lessonTitle}`
  });
}

/**
 * Export quiz to printable text format (for PDF generation)
 */
export function exportQuizToPDF(
  quiz: QuizQuestion[],
  lessonTitle: string
): void {
  let content = `Quiz: ${lessonTitle}\n`;
  content += `Generated on: ${new Date().toLocaleDateString()}\n`;
  content += `${'='.repeat(60)}\n\n`;

  quiz.forEach((q, index) => {
    content += `Question ${index + 1} [${q.difficulty || 'Intermediate'}] (${q.type || 'multiple-choice'})\n`;
    content += `${q.question}\n\n`;
    q.options.forEach((opt, i) => {
      content += `  ${String.fromCharCode(65 + i)}) ${opt}\n`;
    });
    content += `\nCorrect Answer: ${q.answer}\n`;
    content += `${'-'.repeat(60)}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `quiz-${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export conversation to text file
 */
export function exportConversationToText(
  conversation: GeneratedConversation,
  lessonTitle: string
): void {
  let content = `Conversation: ${conversation.scenario}\n`;
  content += `Lesson: ${lessonTitle}\n`;
  content += `Level: ${conversation.level}\n`;
  content += `Generated on: ${new Date().toLocaleDateString()}\n`;
  content += `${'='.repeat(60)}\n\n`;

  conversation.dialogues.forEach((dialogue, index) => {
    content += `${dialogue.speaker}: ${dialogue.text}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `conversation-${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export conversation to JSON
 */
export function exportConversationToJSON(
  conversation: GeneratedConversation,
  lessonTitle: string
): void {
  const data = {
    lessonTitle,
    generatedAt: new Date().toISOString(),
    ...conversation
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `conversation-${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export lesson plan to text file
 */
export function exportLessonPlanToText(
  lessonPlan: LessonPlan
): void {
  let content = `Lesson Plan: ${lessonPlan.title}\n`;
  content += `Duration: ${lessonPlan.duration}\n`;
  content += `Generated on: ${new Date().toLocaleDateString()}\n`;
  content += `${'='.repeat(60)}\n\n`;

  content += `OBJECTIVES:\n`;
  lessonPlan.objectives.forEach((obj, i) => {
    content += `${i + 1}. ${obj}\n`;
  });
  content += `\n`;

  content += `WARM-UP (5 minutes):\n${lessonPlan.warmUp}\n\n`;
  content += `PRESENTATION (10-15 minutes):\n${lessonPlan.presentation}\n\n`;
  content += `PRACTICE (15 minutes):\n${lessonPlan.practice}\n\n`;
  content += `PRODUCTION (10 minutes):\n${lessonPlan.production}\n\n`;
  content += `COOL-DOWN (5 minutes):\n${lessonPlan.coolDown}\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lesson-plan-${lessonPlan.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export reading passage to text file
 */
export function exportReadingPassageToText(
  passage: ReadingPassage
): void {
  let content = `Reading Passage: ${passage.title}\n`;
  content += `Level: ${passage.level}\n`;
  content += `Generated on: ${new Date().toLocaleDateString()}\n`;
  content += `${'='.repeat(60)}\n\n`;

  content += `${passage.text}\n\n`;
  content += `${'='.repeat(60)}\n`;
  content += `COMPREHENSION QUESTIONS:\n\n`;

  passage.comprehensionQuestions.forEach((q, index) => {
    content += `${index + 1}. ${q.question}\n`;
    q.options.forEach((opt, i) => {
      content += `   ${String.fromCharCode(65 + i)}) ${opt}\n`;
    });
    content += `   Answer: ${q.answer}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reading-${passage.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Export grammar exercise to text file
 */
export function exportGrammarExerciseToText(
  exercise: GrammarExercise
): void {
  let content = `Grammar Exercise: ${exercise.title}\n`;
  content += `Generated on: ${new Date().toLocaleDateString()}\n`;
  content += `${'='.repeat(60)}\n\n`;

  content += `Instructions: ${exercise.instructions}\n\n`;
  content += `${'='.repeat(60)}\n\n`;

  exercise.questions.forEach((q, index) => {
    content += `${index + 1}. ${q.prompt}\n`;
    content += `   Answer: ${q.answer}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `grammar-${exercise.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
