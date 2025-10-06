// Demo AI responses for free users
export const demoAIResponses = {
  writingGrader: {
    en: {
      overall: "This is a demo response. Upgrade to Premium for real AI-powered feedback!",
      feedback: [
        {
          category: "Grammar",
          score: 85,
          comments: "Good use of present perfect tense. Consider reviewing article usage (a, an, the).",
          examples: ["✓ I have been studying → Correct", "✗ I study English since 2020 → I have been studying English since 2020"]
        },
        {
          category: "Vocabulary",
          score: 78,
          comments: "Vocabulary is adequate but could be more varied. Try using synonyms to avoid repetition.",
          examples: ["Instead of 'good', try: excellent, outstanding, remarkable", "Instead of 'important', try: crucial, significant, vital"]
        },
        {
          category: "Structure",
          score: 82,
          comments: "Essay structure is clear with introduction, body, and conclusion. Add transition words for better flow.",
          examples: ["Use: Furthermore, Moreover, In addition, However, Nevertheless"]
        }
      ],
      suggestions: [
        "Use more advanced vocabulary (e.g., 'utilize' instead of 'use')",
        "Add topic sentences at the beginning of each paragraph",
        "Include specific examples to support your arguments",
        "Review subject-verb agreement in complex sentences"
      ],
      score: 82
    },
    vi: {
      overall: "Đây là phản hồi demo. Nâng cấp lên Premium để nhận feedback AI thực sự!",
      feedback: [
        {
          category: "Ngữ pháp",
          score: 85,
          comments: "Sử dụng tốt thì hiện tại hoàn thành. Cần xem lại cách dùng mạo từ (a, an, the).",
          examples: ["✓ I have been studying → Đúng", "✗ I study English since 2020 → I have been studying English since 2020"]
        },
        {
          category: "Từ vựng",
          score: 78,
          comments: "Từ vựng đầy đủ nhưng có thể đa dạng hơn. Thử dùng từ đồng nghĩa để tránh lặp.",
          examples: ["Thay vì 'good', dùng: excellent, outstanding, remarkable", "Thay vì 'important', dùng: crucial, significant, vital"]
        },
        {
          category: "Cấu trúc",
          score: 82,
          comments: "Cấu trúc bài rõ ràng với mở bài, thân bài và kết luận. Thêm từ nối để mạch lạc hơn.",
          examples: ["Dùng: Furthermore, Moreover, In addition, However, Nevertheless"]
        }
      ],
      suggestions: [
        "Sử dụng từ vựng cao cấp hơn (ví dụ: 'utilize' thay vì 'use')",
        "Thêm câu chủ đề ở đầu mỗi đoạn",
        "Đưa ra ví dụ cụ thể để hỗ trợ lập luận",
        "Xem lại sự hòa hợp chủ ngữ - động từ trong câu phức"
      ],
      score: 82
    }
  },

  aiTutor: {
    en: [
      {
        question: "What is present perfect tense?",
        answer: "The Present Perfect tense is used to describe actions that happened at an unspecified time before now or actions that started in the past and continue to the present.\n\n**Structure:** have/has + past participle\n\n**Examples:**\n- I have lived in Vietnam for 5 years.\n- She has finished her homework.\n- They have never been to Paris.\n\n**💎 Upgrade to Premium** for personalized explanations and unlimited questions!"
      },
      {
        question: "How do I improve my English speaking?",
        answer: "Here are 5 effective ways to improve your speaking:\n\n1. **Practice daily** - Even 15 minutes helps\n2. **Speak to yourself** - Describe your day in English\n3. **Record yourself** - Listen and identify mistakes\n4. **Join conversation groups** - Practice with others\n5. **Think in English** - Train your brain to use English naturally\n\n**💎 Upgrade to Premium** to practice with our AI Speaking Partner with real-time feedback!"
      },
      {
        question: "What's the difference between 'make' and 'do'?",
        answer: "**MAKE** - Creating or producing something:\n- make a cake, make money, make a decision\n- make noise, make a mistake, make progress\n\n**DO** - Performing an action or activity:\n- do homework, do exercise, do the dishes\n- do your best, do business, do research\n\n**Tip:** MAKE = create/produce, DO = perform/complete\n\n**💎 Upgrade to Premium** for instant answers to all your grammar questions!"
      }
    ],
    vi: [
      {
        question: "Thì hiện tại hoàn thành là gì?",
        answer: "Thì Hiện tại Hoàn thành (Present Perfect) dùng để mô tả hành động xảy ra ở thời điểm không xác định trước hiện tại hoặc bắt đầu trong quá khứ và tiếp tục đến hiện tại.\n\n**Cấu trúc:** have/has + quá khứ phân từ\n\n**Ví dụ:**\n- I have lived in Vietnam for 5 years. (Tôi đã sống ở Việt Nam 5 năm)\n- She has finished her homework. (Cô ấy đã hoàn thành bài tập)\n- They have never been to Paris. (Họ chưa bao giờ đến Paris)\n\n**💎 Nâng cấp Premium** để nhận giải thích cá nhân hóa và đặt câu hỏi không giới hạn!"
      },
      {
        question: "Làm thế nào để cải thiện khả năng nói tiếng Anh?",
        answer: "5 cách hiệu quả để cải thiện kỹ năng nói:\n\n1. **Luyện tập hàng ngày** - Chỉ 15 phút cũng có tác dụng\n2. **Nói với chính mình** - Mô tả ngày của bạn bằng tiếng Anh\n3. **Ghi âm lại** - Nghe và tìm lỗi sai\n4. **Tham gia nhóm giao tiếp** - Luyện tập với người khác\n5. **Suy nghĩ bằng tiếng Anh** - Rèn não bộ dùng tiếng Anh tự nhiên\n\n**💎 Nâng cấp Premium** để luyện tập với AI Speaking Partner có phản hồi thời gian thực!"
      },
      {
        question: "Sự khác biệt giữa 'make' và 'do'?",
        answer: "**MAKE** - Tạo ra hoặc sản xuất thứ gì đó:\n- make a cake (làm bánh), make money (kiếm tiền), make a decision (quyết định)\n- make noise (gây ồn), make a mistake (mắc lỗi), make progress (tiến bộ)\n\n**DO** - Thực hiện hành động hoặc hoạt động:\n- do homework (làm bài tập), do exercise (tập thể dục), do the dishes (rửa bát)\n- do your best (cố gắng hết sức), do business (kinh doanh), do research (nghiên cứu)\n\n**Mẹo:** MAKE = tạo ra/sản xuất, DO = thực hiện/hoàn thành\n\n**💎 Nâng cấp Premium** để nhận câu trả lời ngay cho mọi câu hỏi ngữ pháp!"
      }
    ]
  },

  speakingPartner: {
    scenarios: {
      en: [
        {
          title: "At a Restaurant",
          dialogues: [
            { speaker: "Waiter", text: "Good evening! Welcome to our restaurant. How many people?" },
            { speaker: "You", text: "[Your response: 'Table for two, please.']" },
            { speaker: "Waiter", text: "Right this way. Here's your menu. Can I start you off with some drinks?" },
            { speaker: "You", text: "[Your response: 'I'd like water, please.']" }
          ],
          tip: "💎 Upgrade to Premium for real-time AI conversation practice with pronunciation feedback!"
        },
        {
          title: "Job Interview",
          dialogues: [
            { speaker: "Interviewer", text: "Tell me about yourself." },
            { speaker: "You", text: "[Your response: 'I'm a software engineer with 3 years of experience...']" },
            { speaker: "Interviewer", text: "What are your strengths?" },
            { speaker: "You", text: "[Your response: 'I'm a fast learner and work well in teams.']" }
          ],
          tip: "💎 Upgrade to Premium for personalized interview practice with detailed feedback!"
        }
      ],
      vi: [
        {
          title: "Tại Nhà hàng",
          dialogues: [
            { speaker: "Phục vụ", text: "Chào buổi tối! Chào mừng đến nhà hàng. Mấy người ạ?" },
            { speaker: "Bạn", text: "[Câu trả lời của bạn: 'Table for two, please.']" },
            { speaker: "Phục vụ", text: "Mời đi theo tôi. Đây là thực đơn. Quý khách muốn uống gì không ạ?" },
            { speaker: "Bạn", text: "[Câu trả lời của bạn: 'I'd like water, please.']" }
          ],
          tip: "💎 Nâng cấp Premium để luyện hội thoại AI thời gian thực với phản hồi phát âm!"
        },
        {
          title: "Phỏng vấn Xin việc",
          dialogues: [
            { speaker: "Người phỏng vấn", text: "Hãy giới thiệu về bản thân bạn." },
            { speaker: "Bạn", text: "[Câu trả lời của bạn: 'I'm a software engineer with 3 years of experience...']" },
            { speaker: "Người phỏng vấn", text: "Điểm mạnh của bạn là gì?" },
            { speaker: "Bạn", text: "[Câu trả lời của bạn: 'I'm a fast learner and work well in teams.']" }
          ],
          tip: "💎 Nâng cấp Premium để luyện phỏng vấn cá nhân hóa với phản hồi chi tiết!"
        }
      ]
    }
  },

  learningPath: {
    en: {
      title: "Your Suggested Learning Path (Demo)",
      description: "This is a sample 4-week learning path. Upgrade to Premium for AI-personalized paths that adapt to your actual progress!",
      weeks: [
        {
          week: 1,
          topic: "Foundation Building - Grammar Basics",
          focus: "Master essential tenses and sentence structures",
          exercises: [
            "📖 Study Present Simple & Present Continuous",
            "📝 Complete 20 grammar exercises",
            "🎯 Learn 100 common verbs",
            "✍️ Write 5 sentences daily using new tenses",
            "🎧 Listen to 3 beginner podcasts"
          ],
          estimatedHours: "5-6 hours"
        },
        {
          week: 2,
          topic: "Vocabulary Expansion",
          focus: "Build a strong vocabulary foundation",
          exercises: [
            "📚 Learn 150 essential words (themed: daily life, food, travel)",
            "🃏 Use flashcards for daily practice",
            "📝 Create 10 example sentences per theme",
            "🎮 Play vocabulary games in the app",
            "🗣️ Practice pronunciation with audio"
          ],
          estimatedHours: "6-7 hours"
        },
        {
          week: 3,
          topic: "Speaking & Listening",
          focus: "Develop communication skills",
          exercises: [
            "🎧 Listen to 5 intermediate conversations",
            "🗣️ Practice speaking exercises (10 mins daily)",
            "📹 Record yourself speaking about 3 topics",
            "👥 Complete 3 role-play scenarios",
            "🎯 Learn 20 common phrases for conversation"
          ],
          estimatedHours: "7-8 hours"
        },
        {
          week: 4,
          topic: "Reading & Writing",
          focus: "Improve comprehension and expression",
          exercises: [
            "📖 Read 3 short articles (200-300 words each)",
            "✍️ Write a 150-word essay on a given topic",
            "📝 Practice paragraph writing (5 paragraphs)",
            "🎯 Learn linking words and transitions",
            "✅ Complete a comprehensive review test"
          ],
          estimatedHours: "8-10 hours"
        }
      ],
      totalDuration: "4 weeks",
      totalHours: "26-31 hours",
      premiumFeatures: [
        "✨ AI analyzes your actual performance",
        "🎯 Dynamic difficulty adjustment",
        "📊 Detailed progress tracking",
        "🔄 Personalized exercise recommendations",
        "💬 Unlimited AI tutor support"
      ]
    },
    vi: {
      title: "Lộ trình Học đề xuất (Demo)",
      description: "Đây là lộ trình mẫu 4 tuần. Nâng cấp Premium để nhận lộ trình AI cá nhân hóa thích ứng với tiến độ thực tế của bạn!",
      weeks: [
        {
          week: 1,
          topic: "Xây dựng Nền tảng - Ngữ pháp Cơ bản",
          focus: "Nắm vững các thì cơ bản và cấu trúc câu",
          exercises: [
            "📖 Học Thì Hiện tại Đơn & Hiện tại Tiếp diễn",
            "📝 Hoàn thành 20 bài tập ngữ pháp",
            "🎯 Học 100 động từ thông dụng",
            "✍️ Viết 5 câu mỗi ngày sử dụng thì mới học",
            "🎧 Nghe 3 podcast cho người mới bắt đầu"
          ],
          estimatedHours: "5-6 giờ"
        },
        {
          week: 2,
          topic: "Mở rộng Từ vựng",
          focus: "Xây dựng vốn từ vựng vững chắc",
          exercises: [
            "📚 Học 150 từ thiết yếu (chủ đề: cuộc sống, ẩm thực, du lịch)",
            "🃏 Sử dụng flashcard luyện tập hàng ngày",
            "📝 Tạo 10 câu ví dụ cho mỗi chủ đề",
            "🎮 Chơi trò chơi từ vựng trong ứng dụng",
            "🗣️ Luyện phát âm với audio"
          ],
          estimatedHours: "6-7 giờ"
        },
        {
          week: 3,
          topic: "Nói & Nghe",
          focus: "Phát triển kỹ năng giao tiếp",
          exercises: [
            "🎧 Nghe 5 đoạn hội thoại trung cấp",
            "🗣️ Luyện nói (10 phút mỗi ngày)",
            "📹 Ghi âm bản thân nói về 3 chủ đề",
            "👥 Hoàn thành 3 tình huống nhập vai",
            "🎯 Học 20 cụm từ thông dụng trong giao tiếp"
          ],
          estimatedHours: "7-8 giờ"
        },
        {
          week: 4,
          topic: "Đọc & Viết",
          focus: "Cải thiện khả năng đọc hiểu và diễn đạt",
          exercises: [
            "📖 Đọc 3 bài viết ngắn (200-300 từ mỗi bài)",
            "✍️ Viết một bài luận 150 từ về chủ đề cho trước",
            "📝 Luyện viết đoạn văn (5 đoạn)",
            "🎯 Học từ nối và liên kết ý",
            "✅ Hoàn thành bài kiểm tra tổng hợp"
          ],
          estimatedHours: "8-10 giờ"
        }
      ],
      totalDuration: "4 tuần",
      totalHours: "26-31 giờ",
      premiumFeatures: [
        "✨ AI phân tích hiệu suất thực tế của bạn",
        "🎯 Điều chỉnh độ khó động",
        "📊 Theo dõi tiến độ chi tiết",
        "🔄 Đề xuất bài tập cá nhân hóa",
        "💬 Hỗ trợ AI tutor không giới hạn"
      ]
    }
  }
};

// Free user usage limits
export const FREE_TIER_LIMITS = {
  dailyAIRequests: 3,
  writingGraderPerDay: 1,
  aiTutorQuestionsPerDay: 3,
  speakingPartnerMinutesPerDay: 5
};

// Pricing plans
export const PRICING_PLANS = {
  en: {
    student: {
      name: "Student Plan",
      price: "99,000₫",
      period: "per month",
      features: [
        "✓ Unlimited AI Tutor Chat",
        "✓ Writing Grader with detailed feedback",
        "✓ Speaking Partner practice",
        "✓ Personalized Learning Path",
        "✓ Progress tracking & reports",
        "✓ Access to all ebooks",
        "✓ Priority support"
      ],
      cta: "Upgrade to Student"
    },
    teacher: {
      name: "Teacher Plan",
      price: "299,000₫",
      period: "per month",
      features: [
        "✓ All Student Plan features",
        "✓ AI Content Generator",
        "✓ Class Analytics Dashboard",
        "✓ Bulk student management",
        "✓ Custom tests & assignments",
        "✓ Export reports (PDF, Excel)",
        "✓ Premium support"
      ],
      cta: "Upgrade to Teacher"
    },
    enterprise: {
      name: "School/Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "✓ Unlimited users",
        "✓ Custom branding",
        "✓ Dedicated account manager",
        "✓ API access",
        "✓ Custom integrations",
        "✓ On-premise deployment option",
        "✓ 24/7 premium support"
      ],
      cta: "Contact Sales"
    }
  },
  vi: {
    student: {
      name: "Gói Học sinh",
      price: "99,000₫",
      period: "mỗi tháng",
      features: [
        "✓ AI Tutor Chat không giới hạn",
        "✓ Chấm bài viết với phản hồi chi tiết",
        "✓ Luyện nói với Speaking Partner",
        "✓ Lộ trình Học cá nhân hóa",
        "✓ Theo dõi tiến độ & báo cáo",
        "✓ Truy cập tất cả ebook",
        "✓ Hỗ trợ ưu tiên"
      ],
      cta: "Nâng cấp Học sinh"
    },
    teacher: {
      name: "Gói Giáo viên",
      price: "299,000₫",
      period: "mỗi tháng",
      features: [
        "✓ Tất cả tính năng Gói Học sinh",
        "✓ Tạo nội dung bằng AI",
        "✓ Bảng phân tích Lớp học",
        "✓ Quản lý học sinh hàng loạt",
        "✓ Tạo bài kiểm tra & bài tập",
        "✓ Xuất báo cáo (PDF, Excel)",
        "✓ Hỗ trợ cao cấp"
      ],
      cta: "Nâng cấp Giáo viên"
    },
    enterprise: {
      name: "Trường học/Doanh nghiệp",
      price: "Tùy chỉnh",
      period: "liên hệ",
      features: [
        "✓ Không giới hạn người dùng",
        "✓ Thương hiệu tùy chỉnh",
        "✓ Quản lý tài khoản riêng",
        "✓ Truy cập API",
        "✓ Tích hợp tùy chỉnh",
        "✓ Tùy chọn triển khai nội bộ",
        "✓ Hỗ trợ cao cấp 24/7"
      ],
      cta: "Liên hệ Bán hàng"
    }
  }
};
