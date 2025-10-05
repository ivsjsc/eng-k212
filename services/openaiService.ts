/**
 * OpenAI API Service for IVS Assistant
 * Uses OpenAI Chat Completions API for intelligent responses
 */

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
  store?: boolean;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Get OpenAI API key from environment
 */
function getOpenAIKey(): string | null {
  // @ts-ignore - env.js loaded globally
  if (typeof window !== 'undefined' && window.ENV?.OPENAI_API_KEY) {
    // @ts-ignore
    return window.ENV.OPENAI_API_KEY;
  }
  return null;
}

/**
 * Check if OpenAI is configured
 */
export function isOpenAIConfigured(): boolean {
  return getOpenAIKey() !== null;
}

/**
 * Create system prompt for IVS Assistant with curriculum context
 */
function createSystemPrompt(language: 'en' | 'vi', userContext?: string): string {
  const systemPrompts = {
    en: `You are IVS Assistant, a friendly and helpful English learning AI tutor for Vietnamese students (K-12).

Your capabilities:
- Explain English grammar, vocabulary, pronunciation, and usage
- Provide study tips and learning strategies
- Answer questions about English culture and idioms
- Help with exam preparation (IELTS, TOEFL, TOEIC)
- Give writing and speaking practice advice
- Support app features and Premium membership questions

Guidelines:
- Be encouraging and supportive
- Use simple language and examples
- Provide practical, actionable advice
- Use emojis to make responses friendly
- Keep responses concise but complete (200-300 words)
- For Vietnamese students, you can reference Vietnamese when helpful
- If asked about Premium features, explain benefits clearly

${userContext ? `\n\nCurrent context:\n${userContext}` : ''}`,
    vi: `Bạn là Trợ lý IVS, một gia sư AI tiếng Anh thân thiện và hữu ích cho học sinh Việt Nam (K-12).

Khả năng của bạn:
- Giải thích ngữ pháp, từ vựng, phát âm và cách dùng tiếng Anh
- Cung cấp mẹo học tập và chiến lược học
- Trả lời câu hỏi về văn hóa và thành ngữ tiếng Anh
- Hỗ trợ chuẩn bị thi (IELTS, TOEFL, TOEIC)
- Tư vấn luyện viết và nói
- Hỗ trợ tính năng ứng dụng và gói Premium

Hướng dẫn:
- Khuyến khích và hỗ trợ tích cực
- Dùng ngôn ngữ đơn giản và ví dụ
- Đưa lời khuyên thực tế, có thể thực hiện
- Dùng emoji để phản hồi thân thiện
- Giữ câu trả lời ngắn gọn nhưng đầy đủ (200-300 từ)
- Đối với học sinh Việt Nam, bạn có thể tham khảo tiếng Việt khi hữu ích
- Nếu được hỏi về tính năng Premium, giải thích rõ quyền lợi

${userContext ? `\n\nNgữ cảnh hiện tại:\n${userContext}` : ''}`
  };

  return systemPrompts[language];
}

/**
 * Call OpenAI Chat Completions API
 */
export async function chatWithOpenAI(
  userMessage: string,
  language: 'en' | 'vi' = 'en',
  conversationHistory: OpenAIMessage[] = [],
  userContext?: string,
  modelOverride?: string
): Promise<string> {
  const apiKey = getOpenAIKey();
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please contact administrator.');
  }

  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: createSystemPrompt(language, userContext)
    },
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage
    }
  ];

  const requestBody: OpenAIRequest = {
    model: modelOverride || 'gpt-4o-mini', // allow override from caller
    messages: messages,
    temperature: 0.7,
    max_tokens: 500,
    store: true
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get response from AI assistant');
  }
}

/**
 * Build conversation history from messages for context
 */
export function buildConversationHistory(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  maxMessages: number = 6
): OpenAIMessage[] {
  // Keep last N messages for context (excluding system message)
  return messages
    .slice(-maxMessages)
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));
}
