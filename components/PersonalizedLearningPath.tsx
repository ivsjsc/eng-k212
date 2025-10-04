import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { User } from '../types';

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  resources: string[];
}

interface Props {
  user: User;
  language: 'en' | 'vi';
}

const PersonalizedLearningPath: React.FC<Props> = ({ user, language }) => {
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);

  const t = {
    en: {
      title: 'Your Personalized Learning Path',
      subtitle: 'AI-curated goals based on your level and progress',
      loading: 'Creating your personalized learning path...',
      error: 'Could not generate learning path. Please try again.',
      retry: 'Retry',
      goalProgress: 'Progress',
      estimatedTime: 'Estimated time',
      resources: 'Recommended resources',
      startGoal: 'Start learning',
      viewDetails: 'View details',
      backToGoals: 'Back to goals',
      noGoals: 'No goals available yet',
    },
    vi: {
      title: 'Lộ trình học tập cá nhân',
      subtitle: 'Mục tiêu được AI đề xuất dựa trên trình độ và tiến độ của bạn',
      loading: 'Đang tạo lộ trình học tập cá nhân...',
      error: 'Không thể tạo lộ trình học tập. Vui lòng thử lại.',
      retry: 'Thử lại',
      goalProgress: 'Tiến độ',
      estimatedTime: 'Thời gian ước tính',
      resources: 'Tài liệu đề xuất',
      startGoal: 'Bắt đầu học',
      viewDetails: 'Xem chi tiết',
      backToGoals: 'Quay lại mục tiêu',
      noGoals: 'Chưa có mục tiêu nào',
    }
  }[language];

  useEffect(() => {
    generateLearningPath();
  }, [user, language]);

  const generateLearningPath = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('AI service not configured');
      }

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const prompt = `Create a personalized English learning path for ${user.name}, a ${user.role === 'student' ? `${user.gradeLevel || 'student'}` : 'teacher'} with current level ${user.level || 'intermediate'}. Generate 4-5 learning goals with titles, descriptions, estimated completion time, and recommended resources. Respond in ${language === 'vi' ? 'Vietnamese' : 'English'}. Focus on practical skills like grammar, vocabulary, speaking, listening, and writing.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              goals: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    estimatedTime: { type: Type.STRING },
                    resources: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          },
          temperature: 0.7,
        }
      });

      const data = JSON.parse(response.text.trim());
      const generatedGoals: LearningGoal[] = data.goals.map((g: any, idx: number) => ({
        id: `goal-${idx}`,
        title: g.title,
        description: g.description,
        progress: Math.floor(Math.random() * 30), // Simulate some progress
        estimatedTime: g.estimatedTime,
        resources: g.resources,
      }));

      setGoals(generatedGoals);
    } catch (err) {
      console.error('Learning path generation error:', err);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="text-center">
          <i className="fa-solid fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <button onClick={generateLearningPath} className="btn btn-primary">
            <i className="fa-solid fa-rotate-right mr-2"></i>{t.retry}
          </button>
        </div>
      </div>
    );
  }

  if (selectedGoal) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <button onClick={() => setSelectedGoal(null)} className="btn btn-secondary mb-6">
          <i className="fa-solid fa-arrow-left mr-2"></i>{t.backToGoals}
        </button>

        <div className="card-glass p-6">
          <h2 className="text-3xl font-bold mb-4">{selectedGoal.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{selectedGoal.description}</p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{t.goalProgress}</span>
              <span className="text-sm">{selectedGoal.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${selectedGoal.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">
              <i className="fa-solid fa-clock mr-2"></i>{t.estimatedTime}
            </p>
            <p className="text-slate-600 dark:text-slate-400">{selectedGoal.estimatedTime}</p>
          </div>

          <div>
            <p className="font-semibold mb-3">
              <i className="fa-solid fa-book mr-2"></i>{t.resources}
            </p>
            <ul className="space-y-2">
              {selectedGoal.resources.map((resource, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary mt-6 w-full">
            <i className="fa-solid fa-play mr-2"></i>{t.startGoal}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <i className="fa-solid fa-map text-5xl text-blue-500 mb-4"></i>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      {goals.length === 0 ? (
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p>{t.noGoals}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="card-glass p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedGoal(goal)}>
              <h3 className="text-xl font-bold mb-3">{goal.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{goal.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold">{t.goalProgress}</span>
                  <span className="text-xs">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <i className="fa-solid fa-clock"></i>
                <span>{goal.estimatedTime}</span>
              </div>

              <button className="btn btn-primary w-full" onClick={() => setSelectedGoal(goal)}>
                <i className="fa-solid fa-eye mr-2"></i>{t.viewDetails}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedLearningPath;
