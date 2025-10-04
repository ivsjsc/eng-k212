import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';
import { chatWithOpenAI, isOpenAIConfigured, buildConversationHistory } from '../services/openaiService';

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
  const [useRealAI, setUseRealAI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if OpenAI is configured on mount
  useEffect(() => {
    setUseRealAI(isOpenAIConfigured());
  }, []);

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
    ],
    listening: [
      language === 'en'
        ? '👂 **Improve Listening Skills:**\n\n1. **Active Listening**: Focus fully, don\'t multitask\n2. **Podcasts & Audiobooks**: Start with slow English podcasts\n3. **Subtitles Strategy**: English audio → English subs → No subs\n4. **Note-Taking**: Write key points while listening\n5. **Predict & Guess**: Try to anticipate what comes next\n6. **Repeat Content**: Listen to same material 2-3 times\n\n🎧 *Recommended: BBC Learning English, TED-Ed, VOA Learning English*'
        : '👂 **Cải thiện Kỹ năng Nghe:**\n\n1. **Nghe Chủ động**: Tập trung hoàn toàn, không làm nhiều việc cùng lúc\n2. **Podcast & Sách nói**: Bắt đầu với podcast tiếng Anh chậm\n3. **Chiến lược Phụ đề**: Âm Anh → Phụ đề Anh → Không phụ đề\n4. **Ghi Chép**: Viết điểm chính khi nghe\n5. **Dự đoán & Đoán**: Cố đoán điều gì sẽ đến tiếp theo\n6. **Nghe Lại**: Nghe cùng nội dung 2-3 lần\n\n🎧 *Gợi ý: BBC Learning English, TED-Ed, VOA Learning English*'
    ],
    reading: [
      language === 'en'
        ? '📖 **Reading Comprehension Tips:**\n\n1. **Choose Right Level**: Not too easy, not too hard (90% comprehension)\n2. **Skim First**: Get general idea before deep reading\n3. **Guess from Context**: Don\'t stop for every unknown word\n4. **Read Daily**: 20-30 minutes minimum\n5. **Variety**: Mix fiction, news, blogs, academic texts\n6. **Take Notes**: Summarize paragraphs in your own words\n\n📚 *Start with graded readers, move to authentic materials gradually*'
        : '📖 **Mẹo Đọc Hiểu:**\n\n1. **Chọn Đúng Trình độ**: Không quá dễ, không quá khó (hiểu 90%)\n2. **Đọc Lướt Trước**: Nắm ý chính trước khi đọc sâu\n3. **Đoán từ Ngữ cảnh**: Đừng dừng ở mỗi từ không biết\n4. **Đọc Hàng ngày**: Tối thiểu 20-30 phút\n5. **Đa dạng**: Kết hợp tiểu thuyết, tin tức, blog, văn bản học thuật\n6. **Ghi Chép**: Tóm tắt đoạn văn bằng từ của bạn\n\n📚 *Bắt đầu với sách phân cấp, dần chuyển sang tài liệu thật*'
    ],
    writing: [
      language === 'en'
        ? '✍️ **Writing Better Essays:**\n\n1. **Plan Before Writing**: Outline your ideas first\n2. **Clear Structure**: Intro → Body paragraphs → Conclusion\n3. **Topic Sentences**: Start each paragraph with main idea\n4. **Linking Words**: Use however, therefore, furthermore, etc.\n5. **Vary Sentences**: Mix short and long sentences\n6. **Proofread**: Check grammar, spelling, punctuation\n\n📝 *Practice writing 150-200 words daily on different topics*'
        : '✍️ **Viết Bài Luận Tốt Hơn:**\n\n1. **Lên Kế hoạch Trước**: Phác thảo ý tưởng trước\n2. **Cấu trúc Rõ ràng**: Mở bài → Thân bài → Kết luận\n3. **Câu Chủ đề**: Bắt đầu mỗi đoạn với ý chính\n4. **Từ Nối**: Dùng however, therefore, furthermore, v.v.\n5. **Đa dạng Câu**: Kết hợp câu ngắn và dài\n6. **Kiểm tra Lại**: Kiểm tra ngữ pháp, chính tả, dấu câu\n\n📝 *Luyện viết 150-200 từ mỗi ngày về các chủ đề khác nhau*'
    ],
    culture: [
      language === 'en'
        ? '🌍 **English-Speaking Culture Tips:**\n\n1. **Small Talk**: Weather, weekend plans are common openers\n2. **Personal Space**: Keep arm\'s length distance\n3. **Politeness**: Use "please", "thank you", "sorry" often\n4. **Directness**: English speakers tend to be more direct\n5. **Humor**: Self-deprecating humor is common\n6. **Punctuality**: Being on time shows respect\n\n🎭 *Watch sitcoms (Friends, The Office) to learn cultural nuances!*'
        : '🌍 **Văn hóa Nước Nói tiếng Anh:**\n\n1. **Trò chuyện Phào**: Thời tiết, kế hoạch cuối tuần là chủ đề mở đầu phổ biến\n2. **Khoảng cách Cá nhân**: Giữ khoảng cách một cánh tay\n3. **Lịch sự**: Dùng "please", "thank you", "sorry" thường xuyên\n4. **Trực tiếp**: Người nói tiếng Anh thường trực tiếp hơn\n5. **Hài hước**: Hài hước tự giễu phổ biến\n6. **Đúng giờ**: Đến đúng giờ thể hiện sự tôn trọng\n\n🎭 *Xem sitcom (Friends, The Office) để học sắc thái văn hóa!*'
    ],
    examTips: [
      language === 'en'
        ? '📝 **Exam Preparation Strategies:**\n\n1. **Start Early**: Don\'t cram, study consistently\n2. **Practice Tests**: Do past papers under timed conditions\n3. **Identify Weak Areas**: Focus on what you struggle with\n4. **Study Groups**: Teach others to reinforce learning\n5. **Break Time**: Take 10-min breaks every 50 minutes\n6. **Sleep Well**: 7-8 hours before exam day\n\n🎯 *IELTS/TOEFL tip: Practice all 4 skills equally!*'
        : '📝 **Chiến lược Chuẩn bị Thi:**\n\n1. **Bắt đầu Sớm**: Đừng nhồi nhét, học đều đặn\n2. **Làm Đề Thử**: Làm đề cũ trong điều kiện giới hạn thời gian\n3. **Xác định Điểm yếu**: Tập trung vào những gì bạn gặp khó khăn\n4. **Nhóm Học tập**: Dạy người khác để củng cố kiến thức\n5. **Thời gian Nghỉ**: Nghỉ 10 phút sau mỗi 50 phút\n6. **Ngủ Đủ**: 7-8 tiếng trước ngày thi\n\n🎯 *Mẹo IELTS/TOEFL: Luyện đều 4 kỹ năng!*'
    ],
    motivation: [
      language === 'en'
        ? '💪 **Stay Motivated Learning English:**\n\n1. **Set Clear Goals**: "I want to score 7.0 in IELTS by June"\n2. **Track Progress**: Keep a learning journal\n3. **Celebrate Small Wins**: Reward yourself for milestones\n4. **Find a Study Buddy**: Accountability partner helps\n5. **Make it Fun**: Games, songs, movies in English\n6. **Remember Your Why**: Career? Travel? Education?\n\n🌟 *Progress, not perfection! Every mistake is a lesson.*'
        : '💪 **Duy trì Động lực Học tiếng Anh:**\n\n1. **Đặt Mục tiêu Rõ ràng**: "Tôi muốn đạt 7.0 IELTS vào tháng 6"\n2. **Theo dõi Tiến độ**: Giữ nhật ký học tập\n3. **Kỷ niệm Chiến thắng Nhỏ**: Thưởng cho bản thân khi đạt cột mốc\n4. **Tìm Bạn Học**: Đối tác trách nhiệm giúp bạn\n5. **Làm cho Vui**: Trò chơi, bài hát, phim bằng tiếng Anh\n6. **Nhớ Lý do**: Nghề nghiệp? Du lịch? Giáo dục?\n\n🌟 *Tiến bộ, không phải hoàn hảo! Mỗi lỗi là một bài học.*'
    ],
    idioms: [
      language === 'en'
        ? '🎭 **Common English Idioms:**\n\n• **Piece of cake** = Very easy\n• **Break the ice** = Start a conversation\n• **Hit the books** = Study hard\n• **Under the weather** = Feeling sick\n• **Cost an arm and a leg** = Very expensive\n• **Spill the beans** = Reveal a secret\n• **Once in a blue moon** = Very rarely\n\n💡 *Don\'t translate idioms literally - learn their meanings!*'
        : '🎭 **Thành ngữ tiếng Anh Phổ biến:**\n\n• **Piece of cake** = Rất dễ\n• **Break the ice** = Bắt đầu cuộc trò chuyện\n• **Hit the books** = Học chăm chỉ\n• **Under the weather** = Cảm thấy ốm\n• **Cost an arm and a leg** = Rất đắt\n• **Spill the beans** = Tiết lộ bí mật\n• **Once in a blue moon** = Rất hiếm khi\n\n💡 *Đừng dịch thành ngữ theo nghĩa đen - học ý nghĩa của chúng!*'
    ],
    tenses: [
      language === 'en'
        ? '⏰ **English Tenses Quick Guide:**\n\n**Present Simple**: Habits, facts → *I study every day*\n**Present Continuous**: Now → *I am studying now*\n**Present Perfect**: Past action, present result → *I have studied*\n**Past Simple**: Finished past action → *I studied yesterday*\n**Future Simple**: Predictions → *I will study tomorrow*\n\n📌 *Master these 5 first, then learn the rest!*'
        : '⏰ **Hướng dẫn Nhanh Thì tiếng Anh:**\n\n**Hiện tại đơn**: Thói quen, sự thật → *I study every day*\n**Hiện tại tiếp diễn**: Bây giờ → *I am studying now*\n**Hiện tại hoàn thành**: Hành động quá khứ, kết quả hiện tại → *I have studied*\n**Quá khứ đơn**: Hành động quá khứ đã hoàn thành → *I studied yesterday*\n**Tương lai đơn**: Dự đoán → *I will study tomorrow*\n\n📌 *Thành thạo 5 thì này trước, rồi học phần còn lại!*'
    ],
    confusedWords: [
      language === 'en'
        ? '🔀 **Commonly Confused Words:**\n\n• **Their/There/They\'re**: Possession / Place / They are\n• **Your/You\'re**: Possession / You are\n• **Its/It\'s**: Possession / It is\n• **Affect/Effect**: Verb (influence) / Noun (result)\n• **Accept/Except**: Receive / Exclude\n• **Lose/Loose**: Misplace / Not tight\n\n🎯 *Write example sentences to remember the differences!*'
        : '🔀 **Từ Dễ Nhầm Lẫn:**\n\n• **Their/There/They\'re**: Sở hữu / Địa điểm / They are\n• **Your/You\'re**: Sở hữu / You are\n• **Its/It\'s**: Sở hữu / It is\n• **Affect/Effect**: Động từ (ảnh hưởng) / Danh từ (kết quả)\n• **Accept/Except**: Chấp nhận / Ngoại trừ\n• **Lose/Loose**: Mất / Lỏng\n\n🎯 *Viết câu ví dụ để nhớ sự khác biệt!*'
    ]
  };

  const getSmartResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Support & Billing
    if (q.includes('support') || q.includes('hỗ trợ') || q.includes('billing') || q.includes('thanh toán') || q.includes('refund') || q.includes('hoàn tiền') || q.includes('contact')) {
      return demoResponses.support[0];
    }
    
    // Upgrade & Membership
    if (q.includes('upgrade') || q.includes('nâng cấp') || q.includes('premium') || q.includes('membership') || q.includes('gói') || q.includes('plan') || q.includes('tier')) {
      return demoResponses.upgrade[Math.floor(Math.random() * demoResponses.upgrade.length)];
    }
    
    // App Usage
    if (q.includes('how to use') || q.includes('cách dùng') || q.includes('app') || q.includes('ứng dụng') || q.includes('feature') || q.includes('tính năng')) {
      return demoResponses.appUsage[0];
    }
    
    // Listening
    if (q.includes('listen') || q.includes('nghe') || q.includes('hearing') || q.includes('podcast') || q.includes('audio')) {
      return demoResponses.listening[0];
    }
    
    // Reading
    if (q.includes('read') || q.includes('đọc') || q.includes('comprehension') || q.includes('book') || q.includes('sách')) {
      return demoResponses.reading[0];
    }
    
    // Writing
    if (q.includes('writ') || q.includes('viết') || q.includes('essay') || q.includes('bài luận') || q.includes('composition')) {
      return demoResponses.writing[0];
    }
    
    // Culture
    if (q.includes('culture') || q.includes('văn hóa') || q.includes('custom') || q.includes('tradition') || q.includes('etiquette')) {
      return demoResponses.culture[0];
    }
    
    // Exam Tips
    if (q.includes('exam') || q.includes('thi') || q.includes('test') || q.includes('ielts') || q.includes('toefl') || q.includes('toeic')) {
      return demoResponses.examTips[0];
    }
    
    // Motivation
    if (q.includes('motivat') || q.includes('động lực') || q.includes('give up') || q.includes('tired') || q.includes('boring') || q.includes('chán')) {
      return demoResponses.motivation[0];
    }
    
    // Idioms
    if (q.includes('idiom') || q.includes('thành ngữ') || q.includes('phrase') || q.includes('expression') || q.includes('cụm từ')) {
      return demoResponses.idioms[0];
    }
    
    // Tenses
    if (q.includes('tense') || q.includes('thì') || q.includes('present perfect') || q.includes('past simple') || q.includes('future')) {
      return demoResponses.tenses[0];
    }
    
    // Confused Words
    if (q.includes('confused') || q.includes('nhầm lẫn') || q.includes('their') || q.includes('your') || q.includes('affect') || q.includes('its')) {
      return demoResponses.confusedWords[0];
    }
    
    // Pronunciation
    if (q.includes('pronunciation') || q.includes('phát âm') || q.includes('pronounce') || q.includes('accent')) {
      return demoResponses.pronunciation[0];
    }
    
    // Vocabulary
    if (q.includes('vocabulary') || q.includes('từ vựng') || q.includes('word') || q.includes('từ') || q.includes('memorize')) {
      return demoResponses.vocabulary[0];
    }
    
    // Speaking
    if (q.includes('speaking') || q.includes('nói') || q.includes('speak') || q.includes('practice alone') || q.includes('luyện nói') || q.includes('conversation')) {
      return demoResponses.speaking[0];
    }
    
    // Grammar
    if (q.includes('grammar') || q.includes('ngữ pháp') || q.includes('rule') || q.includes('quy tắc')) {
      return demoResponses.grammar[0];
    }
    
    // Make vs Do
    if ((q.includes('make') && q.includes('do')) || (q.includes('difference between') && (q.includes('make') || q.includes('do')))) {
      return demoResponses.makeVsDo[0];
    }
    
    // Default helpful response with all categories
    return language === 'en'
      ? '🤖 **I\'m here to help!**\n\nI can assist you with:\n• 📚 Grammar, vocabulary, tenses\n• 🗣️ Speaking, pronunciation\n• 👂 Listening & reading skills\n• ✍️ Writing tips & essay structure\n• 🌍 Culture & idioms\n• 📝 Exam preparation (IELTS, TOEFL)\n• 💪 Study motivation & techniques\n• 💎 App support & Premium upgrades\n\n💡 *Ask me anything specific, like:\n"How to improve listening?"\n"What are common idioms?"\n"IELTS exam tips?"\n"How to upgrade to Premium?"*'
      : '🤖 **Tôi sẵn sàng giúp bạn!**\n\nTôi có thể hỗ trợ bạn về:\n• 📚 Ngữ pháp, từ vựng, các thì\n• 🗣️ Nói, phát âm\n• 👂 Kỹ năng nghe & đọc\n• ✍️ Mẹo viết & cấu trúc bài luận\n• 🌍 Văn hóa & thành ngữ\n• 📝 Chuẩn bị thi (IELTS, TOEFL)\n• 💪 Động lực & kỹ thuật học tập\n• 💎 Hỗ trợ ứng dụng & nâng cấp Premium\n\n💡 *Hỏi tôi cụ thể, như:\n"Làm sao cải thiện nghe?"\n"Thành ngữ phổ biến là gì?"\n"Mẹo thi IELTS?"\n"Làm sao nâng cấp lên Premium?"*';
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
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let response: string;

      if (useRealAI) {
        // Use OpenAI for real intelligent responses
        const history = buildConversationHistory(
          messages.map(m => ({ role: m.role, content: m.content }))
        );
        response = await chatWithOpenAI(userInput, language, history);
      } else {
        // Fallback to demo responses
        await new Promise(resolve => setTimeout(resolve, 800));
        response = getSmartResponse(userInput);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en' 
          ? '❌ Sorry, I encountered an error. Please try again or contact support if the issue persists.'
          : '❌ Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t[language].subtitle}
                {useRealAI && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    ✨ AI Powered
                  </span>
                )}
              </p>
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
