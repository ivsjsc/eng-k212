// FIX: Refactored API key management to comply with guidelines.
// The API key must be sourced from environment variables, not user input/localStorage.
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { 
  WritingFeedback, 
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

let aiInstance: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI instance using the key from environment variables.
 * Throws an error if the API key is not available when an AI feature is used.
 */
function getAiInstance(): GoogleGenAI {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("AI features are not available. Please contact the administrator to configure the API key.");
  }
  
  // Initialize only once.
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  }

  return aiInstance;
}

export const isAiConfigured = (): boolean => {
  // Check for API key in environment variables
  return !!import.meta.env.VITE_GEMINI_API_KEY;
};

export const gradeWriting = async (topic: string, text: string): Promise<WritingFeedback> => {
  const ai = getAiInstance();
  const prompt = `Topic: "${topic}"\n\nEssay: "${text}"\n\nPlease grade this essay for a K-12 English learner. Provide feedback on grammar, vocabulary, and coherence. Give an overall score out of 100.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overall: { type: Type.STRING, description: 'Overall feedback on the essay.' },
          grammar: { type: Type.STRING, description: 'Specific feedback on grammar.' },
          vocabulary: { type: Type.STRING, description: 'Specific feedback on vocabulary usage.' },
          coherence: { type: Type.STRING, description: 'Specific feedback on the structure and flow.' },
          score: { type: Type.INTEGER, description: 'A score from 0 to 100.' },
        },
      },
      temperature: 0.2
    },
  });

  try {
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as WritingFeedback;
  } catch (e) {
    logger.error("Failed to parse Gemini JSON response:", e);
    throw new Error("Could not get feedback from AI. Please try again.");
  }
};


export const createChat = (): Chat => {
    const ai = getAiInstance();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are a friendly and encouraging English tutor for K-12 students. Your name is Sparky. Keep your answers concise and helpful. Use simple language and emojis to make learning fun. Your goal is to help students practice their English conversation skills.",
            temperature: 0.8
        },
    });
};

export const translateToVietnamese = async (text: string): Promise<string> => {
  const ai = getAiInstance();
  const prompt = `Translate the following English text to Vietnamese for a K-12 student. Return only the translated text.\n\nEnglish: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
      },
    });
    return response.text.trim();
  } catch (error) {
    logger.error("Error translating text:", error);
    throw new Error("Failed to translate text.");
  }
};

export const generateQuiz = async (
  lesson: CurriculumLesson, 
  language: 'en' | 'vi',
  options: {
    numQuestions?: number;
    difficulty?: DifficultyLevel;
    questionTypes?: QuestionType[];
  } = {}
): Promise<QuizQuestion[]> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).join(', ');
    const grammarList = lesson.grammar.map(g => g.title[language]).join('; ');
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    const numQuestions = options.numQuestions || 5;
    const difficulty = options.difficulty || 'Intermediate';
    const questionTypes = options.questionTypes || ['multiple-choice'];

    const typeInstructions = questionTypes.map(type => {
      if (type === 'true-false') return 'True/False questions with 2 options: "True" and "False"';
      if (type === 'fill-blank') return 'Fill in the blank questions with 4 possible answers';
      return 'Multiple choice questions with 4 options';
    }).join(', ');

    const prompt = `Based on the following K-12 English lesson content, generate ${numQuestions} quiz questions in ${langName}. 
      The quiz should test understanding of the vocabulary and grammar at a ${difficulty} level.
      
      Lesson Title: "${lesson.title[language]}"
      Vocabulary: ${vocabList}
      Grammar: ${grammarList}
      
      Question types to include: ${typeInstructions}
      
      For each question, provide:
      - 'question': the question text
      - 'options': array of answer choices (2 for true-false, 4 for others)
      - 'answer': the correct answer (must exactly match one option)
      - 'type': one of 'multiple-choice', 'true-false', or 'fill-blank'
      - 'difficulty': '${difficulty}'`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quiz: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    answer: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    difficulty: { type: Type.STRING }
                                }
                            }
                        }
                    }
                },
                temperature: 0.4
            },
        });
        const data = JSON.parse(response.text.trim());
        return data.quiz || [];
    } catch (e) {
        logger.error("Failed to parse Gemini JSON for quiz:", e);
        throw new Error("Could not generate a quiz from the AI. Please try again.");
    }
};

export const generateSampleSentences = async (lesson: CurriculumLesson, language: 'en' | 'vi'): Promise<GeneratedSentence[]> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).join(', ');
    const grammarList = lesson.grammar.map(g => g.title[language]).join('; ');
    const langName = language === 'en' ? 'English' : 'Vietnamese';

    const prompt = `Based on the following K-12 English lesson, generate 5 sample sentences in ${langName}. Each sentence should clearly use one of the key vocabulary terms or grammar points.
      Lesson Title: "${lesson.title[language]}"
      Vocabulary: ${vocabList}
      Grammar: ${grammarList}
      For each generated item, provide the 'sentence' and a 'focus' string indicating the vocabulary or grammar point used.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sentences: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    sentence: { type: Type.STRING },
                                    focus: { type: Type.STRING }
                                }
                            }
                        }
                    }
                },
                temperature: 0.7
            },
        });
        const data = JSON.parse(response.text.trim());
        return data.sentences || [];
    } catch (e) {
        logger.error("Failed to parse Gemini JSON for sentences:", e);
        throw new Error("Could not generate sample sentences from the AI. Please try again.");
    }
};

export const generateStoryStarter = async (lesson: CurriculumLesson, language: 'en' | 'vi'): Promise<string> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).slice(0, 5).join(', '); // Use first 5 for brevity
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    
    const prompt = `Create a short, fun, and creative story starter (1-3 sentences) for a K-12 student in ${langName}. The story starter should be inspired by the lesson topic "${lesson.title[language]}" and should include at least two words from this list: ${vocabList}. Return only the story starter text, with no extra formatting or labels.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.9 }
        });
        return response.text.trim();
    } catch (error) {
        logger.error("Error generating story starter:", error);
        throw new Error("Failed to generate a story starter.");
    }
};

export const generateConversation = async (
  lesson: CurriculumLesson, 
  language: 'en' | 'vi',
  options: {
    scenario?: string;
    level?: string;
    numTurns?: number;
  } = {}
): Promise<GeneratedConversation> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).join(', ');
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    const scenario = options.scenario || 'general conversation';
    const level = options.level || 'Intermediate';
    const numTurns = options.numTurns || 6;

    const prompt = `Create a realistic ${scenario} conversation in ${langName} for K-12 students at ${level} level.
      The conversation should be ${numTurns}-${numTurns + 4} turns (exchanges) and naturally incorporate vocabulary from this lesson: ${vocabList}
      Lesson Topic: "${lesson.title[language]}"
      
      The conversation should be engaging, age-appropriate, and demonstrate practical use of the vocabulary.
      
      Return a JSON object with:
      - 'scenario': description of the scenario
      - 'level': '${level}'
      - 'dialogues': array of {speaker: string, text: string} objects`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        scenario: { type: Type.STRING },
                        level: { type: Type.STRING },
                        dialogues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    speaker: { type: Type.STRING },
                                    text: { type: Type.STRING }
                                }
                            }
                        }
                    }
                },
                temperature: 0.7
            },
        });
        const data = JSON.parse(response.text.trim());
        return data as GeneratedConversation;
    } catch (error) {
        logger.error("Error generating conversation:", error);
        throw new Error("Failed to generate conversation.");
    }
};

export const generateLessonPlan = async (
  lesson: CurriculumLesson,
  language: 'en' | 'vi',
  options: {
    duration?: string;
  } = {}
): Promise<LessonPlan> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).join(', ');
    const grammarList = lesson.grammar.map(g => g.title[language]).join('; ');
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    const duration = options.duration || '45 minutes';

    const prompt = `Create a detailed lesson plan in ${langName} for the following K-12 English lesson:
      
      Title: "${lesson.title[language]}"
      Vocabulary: ${vocabList}
      Grammar: ${grammarList}
      Duration: ${duration}
      
      The lesson plan should follow this structure and be practical for teachers:
      - title: lesson title
      - objectives: array of 3-4 learning objectives
      - warmUp: warm-up activity (5 minutes)
      - presentation: how to present new content (10-15 minutes)
      - practice: guided practice activities (15 minutes)
      - production: student production/application (10 minutes)
      - coolDown: wrap-up and homework (5 minutes)
      - duration: '${duration}'`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                        warmUp: { type: Type.STRING },
                        presentation: { type: Type.STRING },
                        practice: { type: Type.STRING },
                        production: { type: Type.STRING },
                        coolDown: { type: Type.STRING },
                        duration: { type: Type.STRING }
                    }
                },
                temperature: 0.5
            },
        });
        const data = JSON.parse(response.text.trim());
        return data as LessonPlan;
    } catch (error) {
        logger.error("Error generating lesson plan:", error);
        throw new Error("Failed to generate lesson plan.");
    }
};

export const generateReadingPassage = async (
  topic: string,
  language: 'en' | 'vi',
  options: {
    level?: string;
    length?: 'short' | 'medium' | 'long';
    numQuestions?: number;
  } = {}
): Promise<ReadingPassage> => {
    const ai = getAiInstance();
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    const level = options.level || 'Intermediate';
    const length = options.length || 'medium';
    const numQuestions = options.numQuestions || 5;
    
    const lengthGuide = {
      short: '100-150 words',
      medium: '200-250 words',
      long: '300-400 words'
    };

    const prompt = `Create a reading passage in ${langName} for K-12 students about "${topic}" at ${level} level.
      
      The passage should be:
      - ${lengthGuide[length]} in length
      - Age-appropriate and engaging
      - Educational and informative
      
      Also create ${numQuestions} comprehension questions with multiple choice answers (4 options each).
      
      Return JSON with:
      - title: engaging title for the passage
      - text: the reading passage
      - level: '${level}'
      - comprehensionQuestions: array of {question, options (array of 4), answer} objects`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        text: { type: Type.STRING },
                        level: { type: Type.STRING },
                        comprehensionQuestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    answer: { type: Type.STRING }
                                }
                            }
                        }
                    }
                },
                temperature: 0.6
            },
        });
        const data = JSON.parse(response.text.trim());
        return data as ReadingPassage;
    } catch (error) {
        logger.error("Error generating reading passage:", error);
        throw new Error("Failed to generate reading passage.");
    }
};

export const generateGrammarExercise = async (
  grammarPoint: string,
  language: 'en' | 'vi',
  options: {
    numQuestions?: number;
  } = {}
): Promise<GrammarExercise> => {
    const ai = getAiInstance();
    const langName = language === 'en' ? 'English' : 'Vietnamese';
    const numQuestions = options.numQuestions || 10;

    const prompt = `Create a grammar exercise in ${langName} focusing on: "${grammarPoint}"
      
      Generate ${numQuestions} practice questions that help K-12 students master this grammar point.
      
      Return JSON with:
      - title: clear title of the exercise
      - instructions: brief instructions for students
      - questions: array of {prompt: string, answer: string} objects
      
      Make the questions progressively challenging and include a mix of sentence completion, error correction, and transformation tasks.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        instructions: { type: Type.STRING },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    prompt: { type: Type.STRING },
                                    answer: { type: Type.STRING }
                                }
                            }
                        }
                    }
                },
                temperature: 0.5
            },
        });
        const data = JSON.parse(response.text.trim());
        return data as GrammarExercise;
    } catch (error) {
        logger.error("Error generating grammar exercise:", error);
        throw new Error("Failed to generate grammar exercise.");
    }
};
