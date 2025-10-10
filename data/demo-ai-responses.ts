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
      title: "🎯 Your AI-Powered Learning Journey (Sample Preview)",
      subtitle: "This is a SIMPLIFIED demo showing just 4 basic weeks. Premium users get a 12-week comprehensive, AI-adaptive curriculum!",
      description: "⚠️ FREE TIER LIMITATION: You're seeing a basic 4-week outline. Premium unlocks the COMPLETE 12-week program with daily tasks, video lessons, interactive exercises, real-time feedback, and AI coaching!",
      weeks: [
        {
          week: 1,
          topic: "🏗️ Foundation Building: Grammar Essentials",
          subtitle: "Master the building blocks of English",
          focus: "Essential tenses, sentence structures, and basic communication patterns",
          level: "Beginner → Elementary",
          dailyCommitment: "45-60 minutes/day",
          exercises: [
            "📖 **Grammar Mastery**: Present Simple & Continuous (with 50+ exercises)",
            "📝 **Daily Writing**: 10 sentences using target grammar (AI-graded)",
            "🎯 **Vocabulary Builder**: 100 high-frequency verbs with context",
            "� **Listening Practice**: 5 podcasts + comprehension quizzes",
            "🗣️ **Speaking Drills**: 15 mins/day pronunciation practice",
            "✅ **Progress Assessment**: Weekly diagnostic test"
          ],
          outcomes: [
            "✓ Confidently use 5 essential tenses",
            "✓ Build 500+ word vocabulary",
            "✓ Understand 70% of basic conversations",
            "✓ Write simple but correct sentences"
          ],
          estimatedHours: "6-8 hours",
          premiumExtras: "🔒 Premium: +150 exercises, video tutorials, AI pronunciation coach, instant feedback"
        },
        {
          week: 2,
          topic: "📚 Vocabulary Explosion & Context Usage",
          subtitle: "From knowing words to using them naturally",
          focus: "Thematic vocabulary, collocations, and real-world applications",
          level: "Elementary → Pre-Intermediate",
          dailyCommitment: "50-70 minutes/day",
          exercises: [
            "🏠 **Theme 1: Daily Life** - 200 words + idioms + practical dialogues",
            "🍽️ **Theme 2: Food & Dining** - Restaurant scenarios + cooking vocabulary",
            "✈️ **Theme 3: Travel & Tourism** - Airport, hotel, directions vocabulary",
            "🃏 **Smart Flashcards**: Spaced repetition system (SRS) with AI optimization",
            "📝 **Contextual Writing**: 5 mini-essays using themed vocabulary",
            "🎮 **Gamified Learning**: Vocabulary battles, word puzzles, memory games",
            "� **Speaking Practice**: Role-plays using new vocabulary"
          ],
          outcomes: [
            "✓ Master 500+ contextual words and phrases",
            "✓ Use collocations naturally",
            "✓ Handle common real-life situations",
            "✓ Score 80%+ on vocabulary tests"
          ],
          estimatedHours: "7-10 hours",
          premiumExtras: "🔒 Premium: 2,000+ words, native speaker audio, AI context analyzer, personalized word lists"
        },
        {
          week: 3,
          topic: "🗣️ Speaking & Listening Intensive",
          subtitle: "Break through the communication barrier",
          focus: "Fluency development, accent training, and active listening",
          level: "Pre-Intermediate → Intermediate",
          dailyCommitment: "60-80 minutes/day",
          exercises: [
            "🎧 **Active Listening**: 10 authentic conversations with transcripts",
            "🗣️ **Shadowing Practice**: Mimic native speakers (15 mins/day)",
            "📹 **Video Recording**: Daily 2-min speech on various topics",
            "👥 **Role-Play Scenarios**: Job interviews, meetings, social events",
            "🎯 **Pronunciation Clinic**: IPA training + difficult sounds practice",
            "� **Conversation Starters**: 50 ways to initiate and maintain dialogue",
            "🎭 **Drama Exercises**: Act out scenes to build confidence"
          ],
          outcomes: [
            "✓ Speak for 3+ minutes without hesitation",
            "✓ Understand 80% of native speech at normal speed",
            "✓ Correct 90% of pronunciation errors",
            "✓ Hold 15-minute conversations comfortably"
          ],
          estimatedHours: "8-12 hours",
          premiumExtras: "🔒 Premium: AI speech coach, live pronunciation feedback, unlimited recording analysis, accent reduction program"
        },
        {
          week: 4,
          topic: "✍️ Reading & Writing Workshop",
          subtitle: "Express yourself clearly and understand complex texts",
          focus: "Academic writing, reading strategies, and critical thinking",
          level: "Intermediate",
          dailyCommitment: "55-75 minutes/day",
          exercises: [
            "📖 **Reading Comprehension**: 10 articles (300-500 words) with analysis",
            "✍️ **Essay Writing**: 3 full essays (250+ words) with structure training",
            "📝 **Paragraph Development**: Topic sentences, supporting details, conclusions",
            "🎯 **Grammar Integration**: Apply advanced grammar in writing",
            "🔗 **Cohesion & Coherence**: Master linking words and text flow",
            "📊 **IELTS Prep**: Introduction to academic writing format",
            "✅ **Final Assessment**: Comprehensive 4-week review test"
          ],
          outcomes: [
            "✓ Write 300+ word essays with proper structure",
            "✓ Read and understand intermediate texts (80%+)",
            "✓ Use 50+ linking words correctly",
            "✓ Achieve B1 level proficiency"
          ],
          estimatedHours: "9-13 hours",
          premiumExtras: "🔒 Premium: AI writing assistant, instant grammar correction, style suggestions, plagiarism checker, unlimited rewrites"
        }
      ],
      demoLimitations: {
        title: "⚠️ What You're MISSING in Free Tier:",
        items: [
          "❌ Only 4 basic weeks (Premium: 12-week complete program)",
          "❌ No daily structured lessons (Premium: 84 daily lesson plans)",
          "❌ No video content (Premium: 150+ video lessons)",
          "❌ No AI real-time feedback (Premium: instant corrections)",
          "❌ No progress tracking (Premium: detailed analytics dashboard)",
          "❌ No adaptive difficulty (Premium: AI adjusts to YOUR level)",
          "❌ No certificate (Premium: completion certificate)",
          "❌ No mobile app (Premium: learn anywhere, anytime)"
        ]
      },
      totalDuration: "4 weeks (Basic Preview)",
      totalHours: "30-43 hours",
      actualPremiumProgram: {
        duration: "12 weeks (Full Program)",
        totalHours: "120-180 hours",
        structure: "3-month intensive curriculum with daily lessons",
        features: [
          "🎯 84 daily structured lessons",
          "📹 150+ educational video lessons",
          "🤖 AI-powered personal tutor (24/7 support)",
          "📊 Real-time progress analytics & insights",
          "🎤 Pronunciation AI with accent correction",
          "✍️ Writing assistant with instant feedback",
          "🏆 Gamification: Achievements, streaks, leaderboards",
          "📱 Mobile app for iOS & Android",
          "🎓 Official completion certificate",
          "👥 Access to study groups & live sessions",
          "📚 1,000+ practice exercises",
          "🎧 500+ audio lessons & podcasts"
        ]
      },
      premiumComparison: {
        title: "📊 Free vs Premium Learning Path:",
        comparison: [
          { feature: "Duration", free: "4 weeks preview", premium: "12 weeks complete" },
          { feature: "Daily Lessons", free: "General outline only", premium: "84 structured lessons" },
          { feature: "Video Content", free: "None", premium: "150+ tutorials" },
          { feature: "AI Feedback", free: "None", premium: "Real-time, unlimited" },
          { feature: "Progress Tracking", free: "Manual", premium: "Automatic + Analytics" },
          { feature: "Difficulty Level", free: "Fixed", premium: "Adaptive (AI-adjusted)" },
          { feature: "Practice Exercises", free: "Basic samples", premium: "1,000+ exercises" },
          { feature: "Speaking Practice", free: "Self-record only", premium: "AI coach + analysis" },
          { feature: "Writing Feedback", free: "None", premium: "Instant AI grading" },
          { feature: "Certificate", free: "None", premium: "Official certificate" }
        ]
      },
      successStories: {
        title: "🌟 Real Results from Premium Users:",
        testimonials: [
          {
            name: "Nguyen Minh A.",
            achievement: "IELTS 7.5 after 12 weeks",
            quote: "The AI adaptation was incredible. It knew exactly what I needed to work on each day!"
          },
          {
            name: "Tran Thu H.",
            achievement: "Got job at international company",
            quote: "The speaking practice with AI coach boosted my confidence. I can now handle interviews in English!"
          },
          {
            name: "Le Van T.",
            achievement: "B2 level in 3 months",
            quote: "From struggling with basic grammar to writing essays confidently. Best investment ever!"
          }
        ]
      },
      premiumFeatures: [
        "🎯 **Adaptive AI Learning**: Program adjusts daily based on YOUR performance",
        "📹 **Educational Video Library**: 150+ HD video lessons with native speakers",
        "🤖 **24/7 AI Tutor**: Get instant answers to unlimited questions",
        "✍️ **Smart Writing Assistant**: Real-time grammar, style, and content feedback",
        "� **Pronunciation Coach**: AI analyzes your speech and corrects accent",
        "📊 **Analytics Dashboard**: Track every metric - vocabulary, grammar, fluency",
        "🏆 **Gamification System**: Earn badges, compete on leaderboards, maintain streaks",
        "� **Community Access**: Join study groups, live Q&A sessions with teachers",
        "📱 **Mobile Apps**: Learn on-the-go with iOS/Android apps",
        "🎓 **Official Certificate**: Prove your achievement with verifiable credential",
        "🔄 **Lifetime Updates**: Access all new content and features forever",
        "💼 **Career Support**: Resume review, interview prep, job search assistance"
      ],
      upgradeReasons: {
        title: "🚀 Why 98% of Serious Learners Upgrade:",
        reasons: [
          {
            icon: "⚡",
            title: "10x Faster Progress",
            description: "Premium users complete in 3 months what takes others 2 years"
          },
          {
            icon: "🎯",
            title: "Personalized Learning",
            description: "AI adapts to YOUR weaknesses, not generic lessons"
          },
          {
            icon: "💰",
            title: "Best Value",
            description: "₫99k/month = ₫3.3k/day = Less than a coffee!"
          },
          {
            icon: "🏆",
            title: "Proven Results",
            description: "94% of users achieve their target level within 12 weeks"
          }
        ]
      }
    },
    vi: {
      title: "🎯 Lộ Trình Học Tập Được AI Tối Ưu (Bản Xem Trước Mẫu)",
      subtitle: "Đây chỉ là bản DEMO đơn giản 4 tuần cơ bản. Người dùng Premium nhận chương trình ĐẦY ĐỦ 12 tuần với AI thích ứng!",
      description: "⚠️ GIỚI HẠN GÓI MIỄN PHÍ: Bạn đang xem outline cơ bản 4 tuần. Premium mở khóa chương trình HOÀN CHỈNH 12 tuần với bài học hàng ngày, video bài giảng, bài tập tương tác, phản hồi thời gian thực và AI coaching!",
      weeks: [
        {
          week: 1,
          topic: "🏗️ Xây Dựng Nền Tảng: Ngữ Pháp Thiết Yếu",
          subtitle: "Làm chủ các khối xây dựng của tiếng Anh",
          focus: "Các thì cơ bản, cấu trúc câu và mẫu giao tiếp căn bản",
          level: "Beginner → Elementary",
          dailyCommitment: "45-60 phút/ngày",
          exercises: [
            "📖 **Thành Thạo Ngữ Pháp**: Thì Hiện tại Đơn & Tiếp diễn (với 50+ bài tập)",
            "📝 **Viết Hàng Ngày**: 10 câu sử dụng ngữ pháp mục tiêu (AI chấm điểm)",
            "🎯 **Xây Dựng Từ Vựng**: 100 động từ thường dùng với ngữ cảnh",
            "🎧 **Luyện Nghe**: 5 podcast + bài kiểm tra hiểu",
            "🗣️ **Luyện Phát Âm**: 15 phút/ngày luyện tập phát âm",
            "✅ **Đánh Giá Tiến Độ**: Kiểm tra chẩn đoán hàng tuần"
          ],
          outcomes: [
            "✓ Tự tin sử dụng 5 thì cơ bản",
            "✓ Xây dựng vốn từ vựng 500+ từ",
            "✓ Hiểu 70% các cuộc hội thoại cơ bản",
            "✓ Viết câu đơn giản nhưng chính xác"
          ],
          estimatedHours: "6-8 giờ",
          premiumExtras: "🔒 Premium: +150 bài tập, video hướng dẫn, AI coach phát âm, phản hồi tức thì"
        },
        {
          week: 2,
          topic: "📚 Bùng Nổ Từ Vựng & Sử Dụng Trong Ngữ Cảnh",
          subtitle: "Từ việc biết từ đến sử dụng tự nhiên",
          focus: "Từ vựng theo chủ đề, collocations và ứng dụng thực tế",
          level: "Elementary → Pre-Intermediate",
          dailyCommitment: "50-70 phút/ngày",
          exercises: [
            "🏠 **Chủ đề 1: Cuộc Sống Hàng Ngày** - 200 từ + thành ngữ + hội thoại thực tế",
            "🍽️ **Chủ đề 2: Ẩm Thực** - Tình huống nhà hàng + từ vựng nấu ăn",
            "✈️ **Chủ đề 3: Du Lịch** - Sân bay, khách sạn, chỉ đường",
            "🃏 **Flashcard Thông Minh**: Hệ thống lặp lại có khoảng cách (SRS) với AI tối ưu",
            "📝 **Viết Theo Ngữ Cảnh**: 5 bài tiểu luận ngắn sử dụng từ vựng chủ đề",
            "🎮 **Học Qua Game**: Đấu từ vựng, ô chữ, trò nhớ từ",
            "🎤 **Luyện Nói**: Nhập vai sử dụng từ vựng mới"
          ],
          outcomes: [
            "✓ Thành thạo 500+ từ và cụm từ theo ngữ cảnh",
            "✓ Sử dụng collocations tự nhiên",
            "✓ Xử lý các tình huống thực tế thông dụng",
            "✓ Đạt 80%+ trong bài kiểm tra từ vựng"
          ],
          estimatedHours: "7-10 giờ",
          premiumExtras: "🔒 Premium: 2,000+ từ, audio người bản ngữ, AI phân tích ngữ cảnh, danh sách từ cá nhân hóa"
        },
        {
          week: 3,
          topic: "🗣️ Tập Trung Nói & Nghe",
          subtitle: "Phá vỡ rào cản giao tiếp",
          focus: "Phát triển sự lưu loát, luyện giọng và nghe tích cực",
          level: "Pre-Intermediate → Intermediate",
          dailyCommitment: "60-80 phút/ngày",
          exercises: [
            "🎧 **Nghe Tích Cực**: 10 cuộc hội thoại thực tế có transcript",
            "🗣️ **Luyện Shadowing**: Bắt chước người bản ngữ (15 phút/ngày)",
            "📹 **Quay Video**: Nói 2 phút hàng ngày về các chủ đề khác nhau",
            "👥 **Tình Huống Nhập Vai**: Phỏng vấn, họp, sự kiện xã hội",
            "🎯 **Phòng Khám Phát Âm**: Luyện IPA + âm khó",
            "💬 **Mở Đầu Cuộc Trò Chuyện**: 50 cách bắt đầu và duy trì đối thoại",
            "� **Bài Tập Kịch**: Diễn cảnh để xây dựng tự tin"
          ],
          outcomes: [
            "✓ Nói liên tục 3+ phút không do dự",
            "✓ Hiểu 80% giọng nói bản ngữ ở tốc độ bình thường",
            "✓ Sửa 90% lỗi phát âm",
            "✓ Trò chuyện thoải mái 15 phút"
          ],
          estimatedHours: "8-12 giờ",
          premiumExtras: "🔒 Premium: AI coach phát âm, phản hồi trực tiếp, phân tích ghi âm không giới hạn, chương trình giảm giọng"
        },
        {
          week: 4,
          topic: "✍️ Workshop Đọc & Viết",
          subtitle: "Diễn đạt rõ ràng và hiểu văn bản phức tạp",
          focus: "Viết học thuật, chiến lược đọc và tư duy phản biện",
          level: "Intermediate",
          dailyCommitment: "55-75 phút/ngày",
          exercises: [
            "📖 **Đọc Hiểu**: 10 bài báo (300-500 từ) có phân tích",
            "✍️ **Viết Luận**: 3 bài luận đầy đủ (250+ từ) với hướng dẫn cấu trúc",
            "📝 **Phát Triển Đoạn Văn**: Câu chủ đề, chi tiết bổ trợ, kết luận",
            "🎯 **Tích Hợp Ngữ Pháp**: Áp dụng ngữ pháp nâng cao trong viết",
            "🔗 **Liên Kết & Mạch Lạc**: Thành thạo từ nối và luồng văn bản",
            "📊 **Chuẩn Bị IELTS**: Giới thiệu định dạng viết học thuật",
            "✅ **Đánh Giá Cuối**: Kiểm tra tổng hợp 4 tuần"
          ],
          outcomes: [
            "✓ Viết bài luận 300+ từ với cấu trúc đúng",
            "✓ Đọc và hiểu văn bản trung cấp (80%+)",
            "✓ Sử dụng 50+ từ nối chính xác",
            "✓ Đạt trình độ B1"
          ],
          estimatedHours: "9-13 giờ",
          premiumExtras: "🔒 Premium: AI trợ lý viết, sửa ngữ pháp tức thì, gợi ý phong cách, kiểm tra đạo văn, viết lại không giới hạn"
        }
      ],
      demoLimitations: {
        title: "⚠️ Những Gì Bạn ĐANG BỎ LỠ Ở Gói Miễn Phí:",
        items: [
          "❌ Chỉ 4 tuần cơ bản (Premium: chương trình hoàn chỉnh 12 tuần)",
          "❌ Không có bài học có cấu trúc hàng ngày (Premium: 84 kế hoạch bài học)",
          "❌ Không có nội dung video (Premium: 150+ video bài giảng)",
          "❌ Không có phản hồi AI thời gian thực (Premium: sửa lỗi tức thì)",
          "❌ Không theo dõi tiến độ (Premium: bảng phân tích chi tiết)",
          "❌ Không điều chỉnh độ khó (Premium: AI thích ứng với trình độ CỦA BẠN)",
          "❌ Không có chứng chỉ (Premium: chứng chỉ hoàn thành)",
          "❌ Không có app mobile (Premium: học mọi lúc, mọi nơi)"
        ]
      },
      totalDuration: "4 tuần (Bản Xem Trước Cơ Bản)",
      totalHours: "30-43 giờ",
      actualPremiumProgram: {
        duration: "12 tuần (Chương Trình Đầy Đủ)",
        totalHours: "120-180 giờ",
        structure: "Chương trình chuyên sâu 3 tháng với bài học hàng ngày",
        features: [
          "🎯 84 bài học có cấu trúc theo ngày",
          "📹 150+ video hướng dẫn chuyên nghiệp",
          "🤖 Gia sư AI cá nhân (hỗ trợ 24/7)",
          "📊 Phân tích tiến độ thời gian thực & thông tin chi tiết",
          "🎤 AI phát âm với sửa giọng",
          "✍️ Trợ lý viết với phản hồi tức thì",
          "🏆 Gamification: Thành tích, chuỗi, bảng xếp hạng",
          "📱 App mobile cho iOS & Android",
          "🎓 Chứng chỉ hoàn thành chính thức",
          "👥 Truy cập nhóm học & buổi live",
          "📚 1,000+ bài tập thực hành",
          "🎧 500+ bài giảng audio & podcast"
        ]
      },
      premiumComparison: {
        title: "📊 So Sánh Lộ Trình Miễn Phí vs Premium:",
        comparison: [
          { feature: "Thời lượng", free: "Xem trước 4 tuần", premium: "Hoàn chỉnh 12 tuần" },
          { feature: "Bài học hàng ngày", free: "Chỉ outline chung", premium: "84 bài có cấu trúc" },
          { feature: "Nội dung video", free: "Không có", premium: "150+ hướng dẫn" },
          { feature: "Phản hồi AI", free: "Không có", premium: "Thời gian thực, không giới hạn" },
          { feature: "Theo dõi tiến độ", free: "Thủ công", premium: "Tự động + Phân tích" },
          { feature: "Độ khó", free: "Cố định", premium: "Thích ứng (AI điều chỉnh)" },
          { feature: "Bài tập", free: "Mẫu cơ bản", premium: "1,000+ bài tập" },
          { feature: "Luyện nói", free: "Chỉ tự ghi âm", premium: "AI coach + phân tích" },
          { feature: "Phản hồi viết", free: "Không có", premium: "AI chấm điểm tức thì" },
          { feature: "Chứng chỉ", free: "Không có", premium: "Chứng chỉ chính thức" }
        ]
      },
      successStories: {
        title: "🌟 Kết Quả Thực Tế Từ Người Dùng Premium:",
        testimonials: [
          {
            name: "Nguyễn Minh A.",
            achievement: "IELTS 7.5 sau 12 tuần",
            quote: "Khả năng thích ứng của AI thật tuyệt vời. Nó biết chính xác những gì tôi cần luyện mỗi ngày!"
          },
          {
            name: "Trần Thu H.",
            achievement: "Nhận việc ở công ty quốc tế",
            quote: "Luyện nói với AI coach giúp tôi tự tin hơn nhiều. Giờ tôi có thể phỏng vấn bằng tiếng Anh!"
          },
          {
            name: "Lê Văn T.",
            achievement: "Trình độ B2 trong 3 tháng",
            quote: "Từ vật lộn với ngữ pháp cơ bản đến viết luận tự tin. Đầu tư tốt nhất từ trước đến nay!"
          }
        ]
      },
      premiumFeatures: [
        "🎯 **AI Học Tập Thích Ứng**: Chương trình điều chỉnh hàng ngày dựa trên hiệu suất CỦA BẠN",
        "📹 **Thư Viện Video Chuyên Nghiệp**: 150+ video HD với người bản ngữ",
        "🤖 **Gia Sư AI 24/7**: Nhận câu trả lời tức thì cho số câu hỏi không giới hạn",
        "✍️ **Trợ Lý Viết Thông Minh**: Phản hồi ngữ pháp, phong cách và nội dung thời gian thực",
        "🎤 **Coach Phát Âm**: AI phân tích giọng nói và sửa giọng của bạn",
        "📊 **Bảng Phân Tích**: Theo dõi mọi chỉ số - từ vựng, ngữ pháp, độ lưu loát",
        "🏆 **Hệ Thống Gamification**: Kiếm huy hiệu, thi đấu bảng xếp hạng, duy trì chuỗi",
        "👥 **Truy Cập Cộng Đồng**: Tham gia nhóm học, Q&A trực tiếp với giáo viên",
        "📱 **App Mobile**: Học mọi lúc với app iOS/Android",
        "🎓 **Chứng Chỉ Chính Thức**: Chứng minh thành tích với chứng chỉ có thể xác minh",
        "🔄 **Cập Nhật Trọn Đời**: Truy cập tất cả nội dung và tính năng mới mãi mãi",
        "💼 **Hỗ Trợ Nghề Nghiệp**: Xem CV, chuẩn bị phỏng vấn, hỗ trợ tìm việc"
      ],
      upgradeReasons: {
        title: "🚀 Tại Sao 98% Học Viên Nghiêm Túc Nâng Cấp:",
        reasons: [
          {
            icon: "⚡",
            title: "Tiến Bộ Nhanh Gấp 10 Lần",
            description: "Người dùng Premium hoàn thành trong 3 tháng những gì người khác mất 2 năm"
          },
          {
            icon: "🎯",
            title: "Học Cá Nhân Hóa",
            description: "AI thích ứng với điểm YẾU của BẠN, không phải bài học chung chung"
          },
          {
            icon: "💰",
            title: "Giá Trị Tốt Nhất",
            description: "99k/tháng = 3.3k/ngày = Rẻ hơn một ly cà phê!"
          },
          {
            icon: "🏆",
            title: "Kết Quả Đã Chứng Minh",
            description: "94% người dùng đạt trình độ mục tiêu trong vòng 12 tuần"
          }
        ]
      }
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
