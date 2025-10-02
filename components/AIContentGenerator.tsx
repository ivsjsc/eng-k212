import React, { useState } from 'react';
import type { CurriculumLesson, DifficultyLevel, QuestionType } from '../types';
import { 
  generateQuizCached as generateQuiz, 
  generateConversationCached as generateConversation, 
  generateLessonPlanCached as generateLessonPlan,
  generateReadingPassageCached as generateReadingPassage,
  generateGrammarExerciseCached as generateGrammarExercise,
  isAiConfigured 
} from '../services/aiContentService';
import {
  exportQuizToJSON,
  exportQuizToExcel,
  exportQuizToPDF,
  exportConversationToText,
  exportConversationToJSON,
  exportLessonPlanToText,
  exportReadingPassageToText,
  exportGrammarExerciseToText
} from '../utils/contentExport';

interface AIContentGeneratorProps {
  lesson?: CurriculumLesson;
  language: 'en' | 'vi';
}

type ContentType = 'quiz' | 'conversation' | 'lesson-plan' | 'reading' | 'grammar';

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ lesson, language }) => {
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz options
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(['multiple-choice']);
  
  // Conversation options
  const [scenario, setScenario] = useState('general conversation');
  const [conversationLevel, setConversationLevel] = useState('Intermediate');
  
  // Reading passage options
  const [readingTopic, setReadingTopic] = useState('');
  const [readingLength, setReadingLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  // Grammar exercise options
  const [grammarPoint, setGrammarPoint] = useState('');
  const [numGrammarQuestions, setNumGrammarQuestions] = useState(10);

  const aiConfigured = isAiConfigured();

  const t = {
    en: {
      title: 'AI Content Generator',
      subtitle: 'Generate teaching materials automatically',
      selectType: 'Select Content Type',
      quiz: 'Quiz Generator',
      conversation: 'Conversation Creator',
      lessonPlan: 'Lesson Plan',
      reading: 'Reading Passage',
      grammar: 'Grammar Exercise',
      generate: 'Generate',
      regenerate: 'Regenerate',
      export: 'Export',
      options: 'Options',
      numQuestions: 'Number of Questions',
      difficulty: 'Difficulty Level',
      questionTypes: 'Question Types',
      multipleChoice: 'Multiple Choice',
      trueFalse: 'True/False',
      fillBlank: 'Fill in the Blank',
      scenario: 'Scenario',
      level: 'Level',
      topic: 'Topic',
      length: 'Length',
      short: 'Short',
      medium: 'Medium',
      long: 'Long',
      grammarPoint: 'Grammar Point',
      exportJSON: 'Export JSON',
      exportExcel: 'Export Excel',
      exportText: 'Export Text',
      loading: 'Generating content...',
      aiWarning: 'AI features are not available. Please contact your administrator.',
      noLesson: 'Please select a lesson first.',
      back: 'Back',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      scenarioRestaurant: 'Restaurant',
      scenarioShopping: 'Shopping',
      scenarioTravel: 'Travel',
      scenarioSchool: 'School',
      scenarioGeneral: 'General Conversation'
    },
    vi: {
      title: 'Trình tạo nội dung AI',
      subtitle: 'Tự động tạo tài liệu giảng dạy',
      selectType: 'Chọn loại nội dung',
      quiz: 'Tạo câu hỏi trắc nghiệm',
      conversation: 'Tạo hội thoại',
      lessonPlan: 'Kế hoạch bài học',
      reading: 'Đoạn văn đọc',
      grammar: 'Bài tập ngữ pháp',
      generate: 'Tạo',
      regenerate: 'Tạo lại',
      export: 'Xuất',
      options: 'Tùy chọn',
      numQuestions: 'Số câu hỏi',
      difficulty: 'Độ khó',
      questionTypes: 'Loại câu hỏi',
      multipleChoice: 'Trắc nghiệm',
      trueFalse: 'Đúng/Sai',
      fillBlank: 'Điền vào chỗ trống',
      scenario: 'Tình huống',
      level: 'Cấp độ',
      topic: 'Chủ đề',
      length: 'Độ dài',
      short: 'Ngắn',
      medium: 'Trung bình',
      long: 'Dài',
      grammarPoint: 'Điểm ngữ pháp',
      exportJSON: 'Xuất JSON',
      exportExcel: 'Xuất Excel',
      exportText: 'Xuất văn bản',
      loading: 'Đang tạo nội dung...',
      aiWarning: 'Tính năng AI không khả dụng. Vui lòng liên hệ quản trị viên.',
      noLesson: 'Vui lòng chọn bài học trước.',
      back: 'Quay lại',
      beginner: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao',
      scenarioRestaurant: 'Nhà hàng',
      scenarioShopping: 'Mua sắm',
      scenarioTravel: 'Du lịch',
      scenarioSchool: 'Trường học',
      scenarioGeneral: 'Hội thoại chung'
    }
  }[language];

  const handleGenerate = async () => {
    if (!aiConfigured) {
      setError(t.aiWarning);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      switch (contentType) {
        case 'quiz':
          if (!lesson) {
            setError(t.noLesson);
            return;
          }
          const quiz = await generateQuiz(lesson, language, {
            numQuestions,
            difficulty,
            questionTypes
          });
          setGeneratedContent(quiz);
          break;

        case 'conversation':
          if (!lesson) {
            setError(t.noLesson);
            return;
          }
          const conversation = await generateConversation(lesson, language, {
            scenario,
            level: conversationLevel
          });
          setGeneratedContent(conversation);
          break;

        case 'lesson-plan':
          if (!lesson) {
            setError(t.noLesson);
            return;
          }
          const lessonPlan = await generateLessonPlan(lesson, language);
          setGeneratedContent(lessonPlan);
          break;

        case 'reading':
          const passage = await generateReadingPassage(
            readingTopic || (lesson?.title[language] || 'General Topic'),
            language,
            { length: readingLength }
          );
          setGeneratedContent(passage);
          break;

        case 'grammar':
          const exercise = await generateGrammarExercise(
            grammarPoint || (lesson?.grammar[0]?.title[language] || 'General Grammar'),
            language,
            { numQuestions: numGrammarQuestions }
          );
          setGeneratedContent(exercise);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: 'json' | 'excel' | 'text') => {
    if (!generatedContent || !lesson) return;

    try {
      switch (contentType) {
        case 'quiz':
          if (format === 'json') exportQuizToJSON(generatedContent, lesson.title[language]);
          else if (format === 'excel') exportQuizToExcel(generatedContent, lesson.title[language]);
          else exportQuizToPDF(generatedContent, lesson.title[language]);
          break;

        case 'conversation':
          if (format === 'json') exportConversationToJSON(generatedContent, lesson.title[language]);
          else exportConversationToText(generatedContent, lesson.title[language]);
          break;

        case 'lesson-plan':
          exportLessonPlanToText(generatedContent);
          break;

        case 'reading':
          exportReadingPassageToText(generatedContent);
          break;

        case 'grammar':
          exportGrammarExerciseToText(generatedContent);
          break;
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const toggleQuestionType = (type: QuestionType) => {
    setQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  if (!aiConfigured) {
    return (
      <div className="p-8 text-center bg-amber-50 dark:bg-amber-900/30 rounded-lg">
        <i className="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4"></i>
        <h3 className="text-xl font-bold mb-2">{t.aiWarning}</h3>
      </div>
    );
  }

  if (!contentType) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{t.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setContentType('quiz')}
            className="card-glass p-6 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <i className="fa-solid fa-file-circle-question text-4xl text-blue-500 mb-3"></i>
            <h3 className="font-bold text-lg">{t.quiz}</h3>
          </button>

          <button
            onClick={() => setContentType('conversation')}
            className="card-glass p-6 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <i className="fa-solid fa-comments text-4xl text-green-500 mb-3"></i>
            <h3 className="font-bold text-lg">{t.conversation}</h3>
          </button>

          <button
            onClick={() => setContentType('lesson-plan')}
            className="card-glass p-6 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <i className="fa-solid fa-clipboard-list text-4xl text-purple-500 mb-3"></i>
            <h3 className="font-bold text-lg">{t.lessonPlan}</h3>
          </button>

          <button
            onClick={() => setContentType('reading')}
            className="card-glass p-6 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <i className="fa-solid fa-book-open text-4xl text-orange-500 mb-3"></i>
            <h3 className="font-bold text-lg">{t.reading}</h3>
          </button>

          <button
            onClick={() => setContentType('grammar')}
            className="card-glass p-6 hover:bg-red-50 dark:hover:bg-red-900/30 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <i className="fa-solid fa-spell-check text-4xl text-red-500 mb-3"></i>
            <h3 className="font-bold text-lg">{t.grammar}</h3>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400">
            {contentType === 'quiz' && t.quiz}
            {contentType === 'conversation' && t.conversation}
            {contentType === 'lesson-plan' && t.lessonPlan}
            {contentType === 'reading' && t.reading}
            {contentType === 'grammar' && t.grammar}
          </p>
        </div>
        <button onClick={() => { setContentType(null); setGeneratedContent(null); }} className="btn btn-secondary">
          <i className="fa-solid fa-arrow-left mr-2"></i> {t.back}
        </button>
      </div>

      {!generatedContent && (
        <div className="card-glass p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">{t.options}</h3>
          
          {contentType === 'quiz' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">{t.numQuestions}</label>
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 5)))}
                  className="form-input w-full"
                  min="1"
                  max="20"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t.difficulty}</label>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="form-input w-full"
                >
                  <option value="Beginner">{t.beginner}</option>
                  <option value="Intermediate">{t.intermediate}</option>
                  <option value="Advanced">{t.advanced}</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t.questionTypes}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={questionTypes.includes('multiple-choice')}
                      onChange={() => toggleQuestionType('multiple-choice')}
                      className="form-checkbox"
                    />
                    {t.multipleChoice}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={questionTypes.includes('true-false')}
                      onChange={() => toggleQuestionType('true-false')}
                      className="form-checkbox"
                    />
                    {t.trueFalse}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={questionTypes.includes('fill-blank')}
                      onChange={() => toggleQuestionType('fill-blank')}
                      className="form-checkbox"
                    />
                    {t.fillBlank}
                  </label>
                </div>
              </div>
            </div>
          )}

          {contentType === 'conversation' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">{t.scenario}</label>
                <select 
                  value={scenario} 
                  onChange={(e) => setScenario(e.target.value)}
                  className="form-input w-full"
                >
                  <option value="general conversation">{t.scenarioGeneral}</option>
                  <option value="restaurant">{t.scenarioRestaurant}</option>
                  <option value="shopping">{t.scenarioShopping}</option>
                  <option value="travel">{t.scenarioTravel}</option>
                  <option value="school">{t.scenarioSchool}</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t.level}</label>
                <select 
                  value={conversationLevel} 
                  onChange={(e) => setConversationLevel(e.target.value)}
                  className="form-input w-full"
                >
                  <option value="Beginner">{t.beginner}</option>
                  <option value="Intermediate">{t.intermediate}</option>
                  <option value="Advanced">{t.advanced}</option>
                </select>
              </div>
            </div>
          )}

          {contentType === 'reading' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">{t.topic}</label>
                <input
                  type="text"
                  value={readingTopic}
                  onChange={(e) => setReadingTopic(e.target.value)}
                  className="form-input w-full"
                  placeholder={lesson?.title[language] || ''}
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t.length}</label>
                <select 
                  value={readingLength} 
                  onChange={(e) => setReadingLength(e.target.value as any)}
                  className="form-input w-full"
                >
                  <option value="short">{t.short}</option>
                  <option value="medium">{t.medium}</option>
                  <option value="long">{t.long}</option>
                </select>
              </div>
            </div>
          )}

          {contentType === 'grammar' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">{t.grammarPoint}</label>
                <input
                  type="text"
                  value={grammarPoint}
                  onChange={(e) => setGrammarPoint(e.target.value)}
                  className="form-input w-full"
                  placeholder={lesson?.grammar[0]?.title[language] || ''}
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t.numQuestions}</label>
                <input
                  type="number"
                  value={numGrammarQuestions}
                  onChange={(e) => setNumGrammarQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 10)))}
                  className="form-input w-full"
                  min="1"
                  max="20"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <i className="fa-solid fa-exclamation-circle text-red-500 mr-2"></i>
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-lg">{t.loading}</p>
        </div>
      )}

      {generatedContent && (
        <div className="card-glass p-6 mb-6">
          {contentType === 'quiz' && (
            <div className="space-y-4">
              {generatedContent.map((q: any, index: number) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">Question {index + 1}</h4>
                    <span className="badge badge-sm bg-slate-200 dark:bg-slate-700">
                      {q.difficulty} | {q.type}
                    </span>
                  </div>
                  <p className="mb-2">{q.question}</p>
                  <div className="space-y-1 ml-4">
                    {q.options.map((opt: string, i: number) => (
                      <div key={i} className={opt === q.answer ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                        {String.fromCharCode(65 + i)}) {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {contentType === 'conversation' && (
            <div className="space-y-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded">
                <p className="font-bold">{generatedContent.scenario}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{generatedContent.level}</p>
              </div>
              {generatedContent.dialogues.map((d: any, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className="font-bold min-w-[100px]">{d.speaker}:</div>
                  <div className="flex-1">{d.text}</div>
                </div>
              ))}
            </div>
          )}

          {contentType === 'lesson-plan' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{generatedContent.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Duration: {generatedContent.duration}</p>
              
              <div>
                <h4 className="font-bold mb-2">Objectives:</h4>
                <ul className="list-disc ml-6">
                  {generatedContent.objectives.map((obj: string, i: number) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold">Warm-up:</h4>
                <p>{generatedContent.warmUp}</p>
              </div>
              
              <div>
                <h4 className="font-bold">Presentation:</h4>
                <p>{generatedContent.presentation}</p>
              </div>
              
              <div>
                <h4 className="font-bold">Practice:</h4>
                <p>{generatedContent.practice}</p>
              </div>
              
              <div>
                <h4 className="font-bold">Production:</h4>
                <p>{generatedContent.production}</p>
              </div>
              
              <div>
                <h4 className="font-bold">Cool-down:</h4>
                <p>{generatedContent.coolDown}</p>
              </div>
            </div>
          )}

          {contentType === 'reading' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{generatedContent.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Level: {generatedContent.level}</p>
              <div className="prose dark:prose-invert max-w-none">
                <p>{generatedContent.text}</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-bold mb-4">Comprehension Questions:</h4>
                {generatedContent.comprehensionQuestions.map((q: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                    <div className="space-y-1 ml-4">
                      {q.options.map((opt: string, i: number) => (
                        <div key={i} className={opt === q.answer ? 'text-green-600 dark:text-green-400' : ''}>
                          {String.fromCharCode(65 + i)}) {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contentType === 'grammar' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{generatedContent.title}</h3>
              <p className="italic">{generatedContent.instructions}</p>
              <div className="space-y-3">
                {generatedContent.questions.map((q: any, index: number) => (
                  <div key={index} className="border-b pb-3">
                    <p className="font-medium mb-1">{index + 1}. {q.prompt}</p>
                    <p className="text-green-600 dark:text-green-400 ml-4">Answer: {q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        {!generatedContent ? (
          <button
            onClick={handleGenerate}
            disabled={isLoading || !questionTypes.length}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-magic mr-2"></i>
            {t.generate}
          </button>
        ) : (
          <>
            <button onClick={handleGenerate} className="btn btn-primary">
              <i className="fa-solid fa-rotate mr-2"></i>
              {t.regenerate}
            </button>
            
            <button onClick={() => handleExport('text')} className="btn btn-secondary">
              <i className="fa-solid fa-file-lines mr-2"></i>
              {t.exportText}
            </button>
            
            {(contentType === 'quiz' || contentType === 'conversation') && (
              <button onClick={() => handleExport('json')} className="btn btn-secondary">
                <i className="fa-solid fa-file-code mr-2"></i>
                {t.exportJSON}
              </button>
            )}
            
            {contentType === 'quiz' && (
              <button onClick={() => handleExport('excel')} className="btn btn-secondary">
                <i className="fa-solid fa-file-excel mr-2"></i>
                {t.exportExcel}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIContentGenerator;
