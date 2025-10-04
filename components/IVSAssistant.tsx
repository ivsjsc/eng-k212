import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Props {
  user: User;
  language: 'en' | 'vi';
}

const IVSAssistant: React.FC<Props> = ({ user, language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title: 'IVS Assistant',
      subtitle: 'Your AI learning companion',
      placeholder: 'Ask me anything about English learning or the app...',
      send: 'Send',
      // freeBadge removed - we will show a small icon badge instead
      welcomeMessage: 'Hi! I\'m your IVS Assistant. I can help you with:\n• English grammar questions\n• Vocabulary explanations\n• Study tips and techniques\n• App support, upgrades & membership questions\n\nWhat would you like to know?',
      sampleQuestions: 'Sample Questions:',
      samples: [
        'How can I improve my English pronunciation?',
        'What\'s the difference between "make" and "do"?',
        'How do I upgrade to Premium and what are the benefits?',
        'How do I contact support for billing issues?'
      ]
    },
    vi: {
      title: 'Trợ lý IVS',
      subtitle: 'Trợ lý AI học tập',
      placeholder: 'Hỏi tôi bất cứ điều gì về học tiếng Anh...',
      send: 'Gửi',
      // freeBadge removed
      welcomeMessage: 'Xin chào! Tôi là Trợ lý IVS. Tôi có thể giúp bạn:\n• Câu hỏi về ngữ pháp tiếng Anh\n• Giải thích từ vựng\n• Mẹo và kỹ thuật học tập\n• Hỗ trợ ứng dụng, nâng cấp & quyền lợi thành viên\n\nBạn muốn biết điều gì?',
      sampleQuestions: 'Câu hỏi mẫu:',
      samples: [
        'Làm thế nào để cải thiện phát âm tiếng Anh?',
        'Sự khác biệt giữa "make" và "do" là gì?',
        'Làm sao để nâng cấp lên Premium và quyền lợi như thế nào?',
        'Làm sao liên hệ bộ phận hỗ trợ về thanh toán?'
      ]
    }
  };

  // Demo responses database
  const demoResponses: { [key: string]: string[] } = {
    pronunciation: [
      language === 'en'
        ? '🎯 **Tips for Better Pronunciation:**\n\n1. **Listen & Repeat**: Watch English movies/shows with subtitles\n2. **Record Yourself**: Compare with native speakers\n3. **Focus on Sounds**: Practice difficult sounds like "th", "r", "v"\n4. **Use Phonetic Symbols**: Learn IPA for accurate pronunciation\n5. **Shadowing Technique**: Repeat immediately after native speakers\n\n💡 *Practice 15 minutes daily for best results!*'
        : '🎯 **Mẹo Phát Âm Tốt Hơn:**\n\n1. **Nghe & Lặp lại**: Xem phim/chương trình Anh với phụ đề\n2. **Ghi âm Bản thân**: So sánh với người bản ngữ\n3. **Tập trung Âm**: Luyện âm khó như "th", "r", "v"\n4. **Dùng Ký hiệu Phiên âm**: Học IPA để phát âm chính xác\n5. **Kỹ thuật Shadowing**: Lặp lại ngay sau người bản ngữ\n\n💡 *Luyện tập 15 phút mỗi ngày cho hiệu quả tốt nhất!*'
    ],
    vocabulary: [
      language === 'en'
        ? '📚 **Effective Vocabulary Learning:**\n\n1. **Context is Key**: Learn words in sentences, not isolation\n2. **Use Flashcards**: Spaced repetition (Anki, Quizlet)\n3. **Read Extensively**: Books, articles, news at your level\n4. **Active Usage**: Write sentences, speak them out loud\n5. **Word Families**: Learn related words together (happy, happiness, happily)\n6. **Visual Associations**: Link words with images\n\n🎯 *Target 10-15 new words per day!*'
        : '📚 **Học Từ Vựng Hiệu Quả:**\n\n1. **Ngữ cảnh Quan trọng**: Học từ trong câu, không riêng lẻ\n2. **Dùng Flashcard**: Lặp lại có khoảng cách (Anki, Quizlet)\n3. **Đọc Nhiều**: Sách, bài báo, tin tức ở trình độ của bạn\n4. **Sử dụng Tích cực**: Viết câu, nói to chúng\n5. **Nhóm Từ**: Học các từ liên quan cùng lúc (happy, happiness, happily)\n6. **Liên kết Hình ảnh**: Gắn từ với hình ảnh\n\n🎯 *Mục tiêu 10-15 từ mới mỗi ngày!*'
    ],
    speaking: [
      language === 'en'
        ? '🗣️ **Practice Speaking Alone:**\n\n1. **Talk to Yourself**: Describe daily activities in English\n2. **Think in English**: Form thoughts directly in English\n3. **Record & Review**: Listen to identify mistakes\n4. **Shadow Native Speakers**: Mimic their rhythm and intonation\n5. **Use Voice Chat Apps**: Practice with AI assistants\n6. **Read Aloud**: Practice pronunciation and fluency\n\n💪 *Consistency beats perfection - speak daily!*'
        : '🗣️ **Luyện Nói Một Mình:**\n\n1. **Nói với Bản thân**: Mô tả hoạt động hàng ngày bằng tiếng Anh\n2. **Suy nghĩ bằng Tiếng Anh**: Hình thành suy nghĩ trực tiếp bằng tiếng Anh\n3. **Ghi âm & Xem lại**: Nghe để xác định lỗi\n4. **Bắt chước Người bản ngữ**: Mô phỏng nhịp điệu và ngữ điệu\n5. **Dùng App Chat Giọng nói**: Luyện với trợ lý AI\n6. **Đọc To**: Luyện phát âm và sự trôi chảy\n\n💪 *Kiên trì quan trọng hơn hoàn hảo - nói hàng ngày!*'
    ],
    grammar: [
      language === 'en'
        ? '📝 **Master English Grammar:**\n\n1. **Understand Don\'t Memorize**: Learn WHY rules exist\n2. **Practice in Context**: Use grammar in real sentences\n3. **Common Mistakes**: Focus on your frequent errors\n4. **Grammar Apps**: Use interactive tools (Grammarly, etc.)\n5. **Write Regularly**: Journal, essays, social media posts\n6. **Get Feedback**: Have native speakers check your work\n\n✨ *Grammar is a tool, not a goal!*'
        : '📝 **Thành thạo Ngữ pháp Anh:**\n\n1. **Hiểu chứ không Thuộc**: Học TẠI SAO có quy tắc\n2. **Luyện trong Ngữ cảnh**: Dùng ngữ pháp trong câu thực\n3. **Lỗi Thường gặp**: Tập trung vào lỗi hay mắc\n4. **App Ngữ pháp**: Dùng công cụ tương tác (Grammarly, v.v.)\n5. **Viết Thường xuyên**: Nhật ký, bài luận, bài đăng mạng xã hội\n6. **Nhận Phản hồi**: Nhờ người bản ngữ kiểm tra\n\n✨ *Ngữ pháp là công cụ, không phải mục tiêu!*'
    ],
    makeVsDo: [
      language === 'en'
        ? '🔄 **Make vs Do - Key Differences:**\n\n**MAKE** = Creating/Producing something:\n• make a cake, make coffee\n• make a decision, make a mistake\n• make money, make friends\n• make noise, make an effort\n\n**DO** = Actions/Activities:\n• do homework, do exercise\n• do the dishes, do laundry\n• do your best, do a favor\n• do business, do research\n\n💡 **Easy Rule**: MAKE = producing a result, DO = performing an action!\n\n🎯 Common phrases:\n• make breakfast ✓ | do breakfast ✗\n• do housework ✓ | make housework ✗'
        : '🔄 **Make vs Do - Điểm Khác biệt:**\n\n**MAKE** = Tạo ra/Sản xuất cái gì đó:\n• make a cake, make coffee (làm bánh, pha cà phê)\n• make a decision, make a mistake (đưa ra quyết định, mắc lỗi)\n• make money, make friends (kiếm tiền, kết bạn)\n• make noise, make an effort (gây ồn, nỗ lực)\n\n**DO** = Hành động/Hoạt động:\n• do homework, do exercise (làm bài tập, tập thể dục)\n• do the dishes, do laundry (rửa bát, giặt giũ)\n• do your best, do a favor (cố gắng hết sức, giúp đỡ)\n• do business, do research (kinh doanh, nghiên cứu)\n\n💡 **Quy tắc Dễ**: MAKE = tạo ra kết quả, DO = thực hiện hành động!\n\n🎯 Cụm từ thông dụng:\n• make breakfast ✓ | do breakfast ✗\n• do housework ✓ | make housework ✗'
    ]
    ,
    support: [
      language === 'en'
        ? '📞 **App Support & Billing Help**:\n\n1. For account or billing questions, go to Settings → Billing to view your current plan and invoices.\n2. To contact support, email support@ivs.edu or use the in-app Contact form.\n3. Payment methods supported: bank transfer, Momo, ZaloPay (local), and card (coming soon).\n4. Provide your user ID and a screenshot for faster help.\n\nIf you have a refund or charge inquiry, include the transaction ID and date.'
        : '📞 **Hỗ trợ Ứng dụng & Thanh toán**:\n\n1. Vào Cài đặt → Thanh toán để xem gói và hoá đơn.\n2. Liên hệ hỗ trợ: support@ivs.edu hoặc dùng form Liên hệ trong app.\n3. Phương thức: chuyển khoản, Momo, ZaloPay (địa phương), thẻ (sắp có).\n4. Gửi ID người dùng và ảnh chụp màn hình để xử lý nhanh hơn.\n\nVới yêu cầu hoàn tiền, gửi kèm mã giao dịch và ngày.'
    ],
    upgrade: [
      language === 'en'
        ? '💎 **Upgrade to Premium - What you get**:\n\n• Unlimited AI requests for tutors and graders\n• Real-time voice conversation practice\n• Personalized learning paths updated weekly\n• Priority support and early access to new features\n\nTo upgrade, open the Pricing modal from the sidebar or Settings → Billing. We accept local payment methods and will add card payments soon.'
        : '💎 **Nâng cấp lên Premium - Quyền lợi**:\n\n• Hỏi AI không giới hạn cho gia sư và chấm bài\n• Luyện nói thời gian thực có phản hồi giọng nói\n• Lộ trình học cá nhân hoá cập nhật hàng tuần\n• Hỗ trợ ưu tiên và truy cập sớm tính năng mới\n\nĐể nâng cấp, mở modal Giá hoặc vào Cài đặt → Thanh toán. Chấp nhận phương thức thanh toán địa phương; thẻ sẽ sớm có.'
        ,
      language === 'en'
        ? 'ℹ️ **Membership Tiers**:\n\n- Free: Basic demo responses, limited daily uses.\n- Student (monthly): Most features, reasonable limits for classrooms.\n- Teacher / Enterprise: Classroom management, analytics, team seats and centralized billing.\n\nCheck Settings → Billing for plan details and promo codes.'
        : 'ℹ️ **Các gói thành viên**:\n\n- Miễn phí: Phản hồi mẫu, giới hạn lượt dùng hàng ngày.\n- Học sinh (tháng): Hầu hết tính năng, giới hạn phù hợp lớp học.\n- Giáo viên / Doanh nghiệp: Quản lý lớp, phân tích, nhiều tài khoản và hoá đơn tập trung.\n\nXem Cài đặt → Thanh toán để biết chi tiết gói và mã khuyến mãi.'
    ],
    appUsage: [
      language === 'en'
        ? '🛠️ **How to use the app & IVS Assistant**:\n\n• Access AI features from the sidebar (AI Tutor, Writing Grader, Speaking Partner).\n• Use IVS Assistant (bottom-right) for quick help, sample questions, or support.\n• If an AI feature shows "AI not configured", ask your admin to add the API key under Settings → AI Keys.\n• For classroom usage, teachers can invite students via Class settings.'
        : '🛠️ **Cách sử dụng app & Trợ lý IVS**:\n\n• Truy cập tính năng AI từ thanh bên (Chat AI, Chấm bài, Luyện nói).\n• Dùng Trợ lý IVS (góc dưới phải) để hỏi nhanh, xem câu hỏi mẫu hoặc yêu cầu hỗ trợ.\n• Nếu tính năng AI báo "AI chưa được cấu hình", yêu cầu quản trị viên thêm API key tại Cài đặt → AI Keys.\n• Giáo viên mời học sinh qua cài đặt Lớp.'
    ]
  };

  const getSmartResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Pronunciation related
    if (q.includes('pronunciation') || q.includes('phát âm') || q.includes('pronounce')) {
      return demoResponses.pronunciation[0];
    }
    
    // Vocabulary related
    if (q.includes('vocabulary') || q.includes('từ vựng') || q.includes('word') || q.includes('từ')) {
      return demoResponses.vocabulary[0];
    }
    
    // Speaking related
    if (q.includes('speaking') || q.includes('nói') || q.includes('speak') || q.includes('practice alone') || q.includes('luyện nói')) {
      return demoResponses.speaking[0];
    }
    
    // Grammar related
    if (q.includes('grammar') || q.includes('ngữ pháp')) {
      return demoResponses.grammar[0];
    }
    
    // Make vs Do
    if ((q.includes('make') && q.includes('do')) || q.includes('difference between')) {
      return demoResponses.makeVsDo[0];
    }
    
    // Default helpful response with shortcuts to support/upgrade
    return language === 'en'
      ? '🤖 **I\'m here to help!**\n\nI can assist you with:\n• Grammar explanations\n• Vocabulary tips\n• Pronunciation advice\n• Study techniques\n• App support, upgrades & membership questions\n\nYou can also ask:\n• "How do I upgrade to Premium?"\n• "How do I contact support for billing?"\n\n💡 *Try asking about pronunciation, vocabulary, speaking practice, grammar or app support.*'
      : '🤖 **Tôi sẵn sàng giúp bạn!**\n\nTôi có thể hỗ trợ bạn về:\n• Giải thích ngữ pháp\n• Mẹo từ vựng\n• Lời khuyên phát âm\n• Kỹ thuật học tập\n• Hỗ trợ ứng dụng, nâng cấp & quyền lợi thành viên\n\nBạn cũng có thể hỏi:\n• "Làm sao để nâng cấp lên Premium?"\n• "Làm sao liên hệ hỗ trợ về thanh toán?"\n\n💡 *Thử hỏi về phát âm, từ vựng, luyện nói, ngữ pháp hoặc hỗ trợ ứng dụng.*';
  };

  useEffect(() => {
    // Welcome message on first load
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: t[language].welcomeMessage,
        timestamp: new Date()
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getSmartResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSampleClick = (sample: string) => {
    setInput(sample);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="card-glass border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
              <i className="fa-solid fa-robot text-2xl"></i>
            </span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t[language].title}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t[language].subtitle}</p>
            </div>
          </div>
          <span className="badge-free px-4 py-2 text-sm font-bold">
            <i className="fa-solid fa-gift mr-2"></i>
            {t[language].freeBadge}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <i className="fa-solid fa-robot text-sm"></i>
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'card-glass'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
              <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white">
                <i className={`fa-solid ${user.avatar} text-sm`}></i>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-robot text-sm"></i>
            </div>
            <div className="card-glass rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sample Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t[language].sampleQuestions}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {t[language].samples.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleClick(sample)}
                className="text-left px-4 py-2 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-sm transition-all hover:border-blue-300 dark:hover:border-blue-600"
              >
                <i className="fa-solid fa-lightbulb mr-2 text-yellow-500"></i>
                {sample}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="card-glass border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t[language].placeholder}
            className="form-input flex-1"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            {t[language].send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IVSAssistant;
