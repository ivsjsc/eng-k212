// FIX: Refactored API key management to comply with guidelines.
// The API key must be sourced from environment variables, not user input/localStorage.
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { WritingFeedback, CurriculumLesson, QuizQuestion, GeneratedSentence } from '../types';

let aiInstance: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI instance using the key from environment variables.
 * Throws an error if the API key is not available when an AI feature is used.
 */
function getAiInstance(): GoogleGenAI {
  if (!process.env.API_KEY) {
    throw new Error("AI features are not available. Please contact the administrator to configure the API key.");
  }
  
  // Initialize only once.
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  return aiInstance;
}

export const isAiConfigured = (): boolean => {
  // FIX: Check for API key in environment variables, not localStorage.
  return !!process.env.API_KEY;
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
    console.error("Failed to parse Gemini JSON response:", e);
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
    console.error("Error translating text:", error);
    throw new Error("Failed to translate text.");
  }
};

export const generateQuiz = async (lesson: CurriculumLesson, language: 'en' | 'vi'): Promise<QuizQuestion[]> => {
    const ai = getAiInstance();
    const vocabList = lesson.vocabulary.map(v => v.term).join(', ');
    const grammarList = lesson.grammar.map(g => g.title[language]).join('; ');
    const langName = language === 'en' ? 'English' : 'Vietnamese';

    const prompt = `Based on the following K-12 English lesson content, generate a 5-question multiple-choice quiz in ${langName}. The quiz should test understanding of the vocabulary and grammar.
      Lesson Title: "${lesson.title[language]}"
      Vocabulary: ${vocabList}
      Grammar: ${grammarList}
      For each question, provide a 'question' text, an array of 4 string 'options', and the correct 'answer' string which must exactly match one of the options.`;
    
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
                                    answer: { type: Type.STRING }
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
        console.error("Failed to parse Gemini JSON for quiz:", e);
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
        console.error("Failed to parse Gemini JSON for sentences:", e);
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
        console.error("Error generating story starter:", error);
        throw new Error("Failed to generate a story starter.");
    }
};
