/**
 * English for Business - Complete Module System
 * Mobile-First Learning Platform
 * 
 * Philosophy: "Train humans to serve like AI"
 * - Consistency: Emotion-free, bias-free, memory-rich
 * - Service-mindedness: Professional, prompt, tireless
 * - Continuous Learning: Daily updates, lifelong growth
 * 
 * 📱 Mobile-First Design
 * 🎯 7 Foundation Modules
 * 💼 7 Industry-Specific Modules
 * 📚 Microsoft Learn Integration
 * 📺 YouTube Channel Resources
 */

import type { Unit, CurriculumLesson } from '../types';

// ============================================
// FOUNDATION MODULES (7)
// ============================================

// ===== MODULE 1: Business Email Writing =====
export const emailWritingModule: Unit = {
  id: 1,
  title: {
    en: 'Business Email Writing',
    vi: 'Viết Email Kinh Doanh'
  },
  lessons: [
    {
      id: 101,
      title: { en: 'Email Structure & Tone', vi: 'Cấu Trúc & Giọng Điệu Email' },
      aims: {
        en: [
          'Master professional email structure',
          'Choose appropriate tone for different situations',
          'Write clear subject lines that get opened'
        ],
        vi: [
          'Thành thạo cấu trúc email chuyên nghiệp',
          'Chọn giọng điệu phù hợp cho từng tình huống',
          'Viết tiêu đề email rõ ràng được đọc nhiều'
        ]
      },
      vocabulary: [
        { term: 'Subject line', pronunciation: '/ˈsʌbdʒɪkt laɪn/', vietnamese: 'Tiêu đề email' },
        { term: 'Salutation', pronunciation: '/ˌsæljuˈteɪʃən/', vietnamese: 'Lời chào' },
        { term: 'Body', pronunciation: '/ˈbɒdi/', vietnamese: 'Nội dung chính' },
        { term: 'Closing', pronunciation: '/ˈkləʊzɪŋ/', vietnamese: 'Lời kết' },
        { term: 'Signature', pronunciation: '/ˈsɪɡnətʃər/', vietnamese: 'Chữ ký' },
        { term: 'CC/BCC', pronunciation: '/siː siː/ /biː siː siː/', vietnamese: 'Bản sao/Bản sao ẩn' },
        { term: 'Attachment', pronunciation: '/əˈtætʃmənt/', vietnamese: 'File đính kèm' },
        { term: 'Follow-up', pronunciation: '/ˈfɒləʊ ʌp/', vietnamese: 'Email nhắc nhở' }
      ],
      grammar: [
        {
          title: { en: 'Professional Email Phrases', vi: 'Cụm Từ Email Chuyên Nghiệp' },
          explanation: {
            en: [
              'Opening: "I hope this email finds you well."',
              'Purpose: "I am writing to inquire about..."',
              'Request: "Would you be able to...?"',
              'Apology: "I apologize for the inconvenience."',
              'Closing: "Thank you for your time and consideration."',
              'Follow-up: "I wanted to follow up on..."'
            ],
            vi: [
              'Mở đầu: "Tôi hy vọng bạn khỏe."',
              'Mục đích: "Tôi viết thư này để hỏi về..."',
              'Yêu cầu: "Bạn có thể...?"',
              'Xin lỗi: "Tôi xin lỗi về sự bất tiện."',
              'Kết thúc: "Cảm ơn bạn đã dành thời gian."',
              'Nhắc nhở: "Tôi muốn nhắc lại về..."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'microsoft-learn',
          description: {
            en: [
              'Microsoft Learn: Write professional emails using Outlook',
              'Link: https://learn.microsoft.com/training/modules/write-professional-emails-outlook/',
              'Duration: 5-7 minutes',
              'Practice writing formal vs. informal emails'
            ],
            vi: [
              'Microsoft Learn: Viết email chuyên nghiệp với Outlook',
              'Link: https://learn.microsoft.com/training/modules/write-professional-emails-outlook/',
              'Thời lượng: 5-7 phút',
              'Thực hành viết email trang trọng và thân mật'
            ]
          }
        },
        {
          type: 'video',
          description: {
            en: [
              'YouTube: Professional Email Writing (BBC Learning English)',
              'https://youtube.com/@bbclearningenglish',
              'Learn email etiquette and common mistakes to avoid'
            ],
            vi: [
              'YouTube: Viết Email Chuyên Nghiệp (BBC Learning English)',
              'https://youtube.com/@bbclearningenglish',
              'Học phép lịch sự email và tránh lỗi thường gặp'
            ]
          }
        }
      ]
    },
    {
      id: 102,
      title: { en: 'Email Templates for Business', vi: 'Mẫu Email Kinh Doanh' },
      aims: {
        en: [
          'Use ready-made templates for common situations',
          'Customize templates for your needs',
          'Respond promptly and professionally'
        ],
        vi: [
          'Sử dụng mẫu có sẵn cho tình huống phổ biến',
          'Tuỳ chỉnh mẫu theo nhu cầu',
          'Trả lời nhanh và chuyên nghiệp'
        ]
      },
      vocabulary: [
        { term: 'Template', pronunciation: '/ˈtempleɪt/', vietnamese: 'Mẫu' },
        { term: 'Confirmation', pronunciation: '/ˌkɒnfəˈmeɪʃən/', vietnamese: 'Xác nhận' },
        { term: 'Inquiry', pronunciation: '/ɪnˈkwaɪəri/', vietnamese: 'Yêu cầu thông tin' },
        { term: 'Proposal', pronunciation: '/prəˈpəʊzəl/', vietnamese: 'Đề xuất' },
        { term: 'Complaint', pronunciation: '/kəmˈpleɪnt/', vietnamese: 'Khiếu nại' }
      ],
      grammar: [],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice: Write a meeting confirmation email',
              'Practice: Respond to a customer inquiry',
              'Practice: Send a follow-up after a meeting'
            ],
            vi: [
              'Thực hành: Viết email xác nhận cuộc họp',
              'Thực hành: Trả lời yêu cầu của khách hàng',
              'Thực hành: Gửi email sau cuộc họp'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 2: Meetings & Discussions =====
export const meetingsModule: Unit = {
  id: 2,
  title: {
    en: 'Meetings & Discussions',
    vi: 'Cuộc Họp & Thảo Luận'
  },
  lessons: [
    {
      id: 201,
      title: { en: 'Meeting Preparation & Etiquette', vi: 'Chuẩn Bị & Phép Lịch Sự Cuộc Họp' },
      aims: {
        en: [
          'Prepare effectively for meetings',
          'Use professional meeting language',
          'Participate confidently'
        ],
        vi: [
          'Chuẩn bị hiệu quả cho cuộc họp',
          'Sử dụng ngôn ngữ họp chuyên nghiệp',
          'Tham gia tự tin'
        ]
      },
      vocabulary: [
        { term: 'Agenda', pronunciation: '/əˈdʒendə/', vietnamese: 'Chương trình họp' },
        { term: 'Minutes', pronunciation: '/ˈmɪnɪts/', vietnamese: 'Biên bản họp' },
        { term: 'Action items', pronunciation: '/ˈækʃən ˈaɪtəmz/', vietnamese: 'Nhiệm vụ cần làm' },
        { term: 'Attendee', pronunciation: '/əˌtenˈdiː/', vietnamese: 'Người tham dự' },
        { term: 'Chairperson', pronunciation: '/ˈtʃeəpɜːsən/', vietnamese: 'Chủ tọa' },
        { term: 'To adjourn', pronunciation: '/əˈdʒɜːn/', vietnamese: 'Hoãn lại' }
      ],
      grammar: [
        {
          title: { en: 'Meeting Phrases', vi: 'Cụm Từ Trong Họp' },
          explanation: {
            en: [
              'Opening: "Let\'s get started." / "Shall we begin?"',
              'Agreeing: "I completely agree." / "That\'s a good point."',
              'Disagreeing: "I see your point, but..." / "I\'m not sure I agree."',
              'Interrupting: "Sorry to interrupt, but..." / "If I may..."',
              'Clarifying: "Could you clarify that?" / "What do you mean by...?"',
              'Closing: "Let\'s wrap up." / "To summarize..."'
            ],
            vi: [
              'Mở đầu: "Chúng ta bắt đầu nào."',
              'Đồng ý: "Tôi hoàn toàn đồng ý." / "Đó là ý hay."',
              'Không đồng ý: "Tôi hiểu ý bạn, nhưng..." / "Tôi không chắc là đồng ý."',
              'Ngắt lời: "Xin lỗi vì ngắt lời, nhưng..."',
              'Làm rõ: "Bạn có thể làm rõ?" / "Ý bạn là...?"',
              'Kết thúc: "Chúng ta kết thúc nhé." / "Tóm lại..."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'microsoft-learn',
          description: {
            en: [
              'Microsoft Learn: Collaborate effectively with Microsoft Teams',
              'https://learn.microsoft.com/training/modules/collaborate-effectively-teams/',
              'Learn meeting best practices and virtual collaboration'
            ],
            vi: [
              'Microsoft Learn: Cộng tác hiệu quả với Microsoft Teams',
              'https://learn.microsoft.com/training/modules/collaborate-effectively-teams/',
              'Học cách họp tốt nhất và cộng tác trực tuyến'
            ]
          }
        },
        {
          type: 'video',
          description: {
            en: [
              'YouTube: Business Meeting English (English With Lucy)',
              'https://youtube.com/@EnglishwithLucy',
              'Watch real meeting scenarios and practice phrases'
            ],
            vi: [
              'YouTube: Tiếng Anh Cuộc Họp (English With Lucy)',
              'https://youtube.com/@EnglishwithLucy',
              'Xem tình huống họp thực tế và thực hành cụm từ'
            ]
          }
        }
      ]
    },
    {
      id: 202,
      title: { en: 'Active Participation in Meetings', vi: 'Tham Gia Tích Cực Trong Họp' },
      aims: {
        en: [
          'Express opinions clearly',
          'Ask effective questions',
          'Handle disagreements professionally'
        ],
        vi: [
          'Diễn đạt ý kiến rõ ràng',
          'Đặt câu hỏi hiệu quả',
          'Xử lý bất đồng chuyên nghiệp'
        ]
      },
      vocabulary: [
        { term: 'To contribute', pronunciation: '/kənˈtrɪbjuːt/', vietnamese: 'Đóng góp' },
        { term: 'Feedback', pronunciation: '/ˈfiːdbæk/', vietnamese: 'Phản hồi' },
        { term: 'Consensus', pronunciation: '/kənˈsensəs/', vietnamese: 'Sự đồng thuận' }
      ],
      grammar: [],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Role-play: Weekly team meeting',
              'Role-play: Project status update',
              'Role-play: Brainstorming session'
            ],
            vi: [
              'Đóng vai: Họp nhóm hàng tuần',
              'Đóng vai: Cập nhật tiến độ dự án',
              'Đóng vai: Buổi động não'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 3: Presentations & Pitching =====
export const presentationsModule: Unit = {
  id: 3,
  title: {
    en: 'Presentations & Pitching',
    vi: 'Thuyết Trình & Chào Hàng'
  },
  lessons: [
    {
      id: 301,
      title: { en: 'Presentation Structure', vi: 'Cấu Trúc Thuyết Trình' },
      aims: {
        en: [
          'Structure presentations effectively',
          'Create engaging openings',
          'Deliver strong conclusions'
        ],
        vi: [
          'Cấu trúc thuyết trình hiệu quả',
          'Tạo phần mở đầu hấp dẫn',
          'Kết luận mạnh mẽ'
        ]
      },
      vocabulary: [
        { term: 'Slide deck', pronunciation: '/slaɪd dek/', vietnamese: 'Bộ slides' },
        { term: 'Handout', pronunciation: '/ˈhændaʊt/', vietnamese: 'Tài liệu phát tay' },
        { term: 'Q&A', pronunciation: '/kjuː ænd eɪ/', vietnamese: 'Hỏi đáp' },
        { term: 'Visual aid', pronunciation: '/ˈvɪʒuəl eɪd/', vietnamese: 'Hỗ trợ hình ảnh' },
        { term: 'Key points', pronunciation: '/kiː pɔɪnts/', vietnamese: 'Điểm chính' }
      ],
      grammar: [
        {
          title: { en: 'Presentation Language', vi: 'Ngôn Ngữ Thuyết Trình' },
          explanation: {
            en: [
              'Opening: "Good morning, everyone. Today I\'ll be talking about..."',
              'Signposting: "First, I\'ll cover... Then, I\'ll move on to..."',
              'Transition: "Moving on to the next point..."',
              'Emphasis: "The key takeaway is..."',
              'Closing: "To sum up..." / "In conclusion..."',
              'Q&A: "Thank you for that question." / "That\'s a great point."'
            ],
            vi: [
              'Mở đầu: "Chào buổi sáng. Hôm nay tôi sẽ nói về..."',
              'Chỉ dẫn: "Đầu tiên, tôi sẽ đề cập... Sau đó..."',
              'Chuyển tiếp: "Chuyển sang điểm tiếp theo..."',
              'Nhấn mạnh: "Điểm chính là..."',
              'Kết thúc: "Tóm lại..." / "Kết luận..."',
              'Hỏi đáp: "Cảm ơn câu hỏi." / "Đó là điểm hay."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'microsoft-learn',
          description: {
            en: [
              'Microsoft Learn: Create impactful presentations with PowerPoint',
              'https://learn.microsoft.com/training/modules/create-impactful-presentations-powerpoint/',
              'Learn slide design and delivery techniques'
            ],
            vi: [
              'Microsoft Learn: Tạo thuyết trình ấn tượng với PowerPoint',
              'https://learn.microsoft.com/training/modules/create-impactful-presentations-powerpoint/',
              'Học thiết kế slide và kỹ thuật trình bày'
            ]
          }
        },
        {
          type: 'video',
          description: {
            en: [
              'YouTube: Public Speaking Tips (Speak English With Tiffani)',
              'https://youtube.com/@SpeakEnglishWithTiffani',
              'Master pronunciation and delivery'
            ],
            vi: [
              'YouTube: Kỹ Năng Nói Trước Đám Đông (Speak English With Tiffani)',
              'https://youtube.com/@SpeakEnglishWithTiffani',
              'Thành thạo phát âm và cách trình bày'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 4: Negotiation Skills =====
export const negotiationModule: Unit = {
  id: 4,
  title: {
    en: 'Negotiation Skills',
    vi: 'Kỹ Năng Đàm Phán'
  },
  lessons: [
    {
      id: 401,
      title: { en: 'Negotiation Basics', vi: 'Cơ Bản Đàm Phán' },
      aims: {
        en: [
          'Use persuasive language',
          'Handle objections',
          'Reach win-win solutions'
        ],
        vi: [
          'Sử dụng ngôn ngữ thuyết phục',
          'Xử lý phản đối',
          'Đạt giải pháp đôi bên cùng lợi'
        ]
      },
      vocabulary: [
        { term: 'Compromise', pronunciation: '/ˈkɒmprəmaɪz/', vietnamese: 'Thỏa hiệp' },
        { term: 'Leverage', pronunciation: '/ˈliːvərɪdʒ/', vietnamese: 'Đòn bẩy' },
        { term: 'Win-win', pronunciation: '/wɪn wɪn/', vietnamese: 'Đôi bên cùng thắng' },
        { term: 'Concession', pronunciation: '/kənˈseʃən/', vietnamese: 'Nhượng bộ' },
        { term: 'Bottom line', pronunciation: '/ˈbɒtəm laɪn/', vietnamese: 'Mức tối thiểu' }
      ],
      grammar: [
        {
          title: { en: 'Negotiation Language', vi: 'Ngôn Ngữ Đàm Phán' },
          explanation: {
            en: [
              'Proposing: "We could offer..." / "What if we...?"',
              'Accepting: "That sounds reasonable." / "We can agree to that."',
              'Rejecting: "I\'m afraid we can\'t accept that." / "That doesn\'t work for us."',
              'Counteroffering: "How about...?" / "Would you consider...?"',
              'Closing: "Do we have a deal?" / "Let\'s finalize the terms."'
            ],
            vi: [
              'Đề xuất: "Chúng tôi có thể đề nghị..." / "Nếu chúng ta...?"',
              'Chấp nhận: "Nghe hợp lý." / "Chúng tôi đồng ý."',
              'Từ chối: "Tôi e rằng chúng tôi không thể chấp nhận."',
              'Đề nghị ngược: "Thế còn...?" / "Bạn có xem xét...?"',
              'Kết thúc: "Chúng ta có thoả thuận chưa?" / "Hoàn tất điều khoản."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Role-play: Price negotiation',
              'Role-play: Contract terms discussion',
              'Role-play: Vendor selection'
            ],
            vi: [
              'Đóng vai: Đàm phán giá',
              'Đóng vai: Thảo luận điều khoản hợp đồng',
              'Đóng vai: Chọn nhà cung cấp'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 5: Customer Service English =====
export const customerServiceModule: Unit = {
  id: 5,
  title: {
    en: 'Customer Service English',
    vi: 'Tiếng Anh Dịch Vụ Khách Hàng'
  },
  lessons: [
    {
      id: 501,
      title: { en: 'Handling Customer Inquiries', vi: 'Xử Lý Yêu Cầu Khách Hàng' },
      aims: {
        en: [
          'Communicate with clients professionally',
          'Handle complaints effectively',
          'Build customer relationships'
        ],
        vi: [
          'Giao tiếp với khách hàng chuyên nghiệp',
          'Xử lý khiếu nại hiệu quả',
          'Xây dựng quan hệ khách hàng'
        ]
      },
      vocabulary: [
        { term: 'Query', pronunciation: '/ˈkwɪəri/', vietnamese: 'Câu hỏi' },
        { term: 'Resolution', pronunciation: '/ˌrezəˈluːʃən/', vietnamese: 'Giải quyết' },
        { term: 'Refund', pronunciation: '/ˈriːfʌnd/', vietnamese: 'Hoàn tiền' },
        { term: 'Escalate', pronunciation: '/ˈeskəleɪt/', vietnamese: 'Chuyển lên cấp cao hơn' },
        { term: 'Satisfaction', pronunciation: '/ˌsætɪsˈfækʃən/', vietnamese: 'Sự hài lòng' }
      ],
      grammar: [
        {
          title: { en: 'Customer Service Phrases', vi: 'Cụm Từ Dịch Vụ Khách Hàng' },
          explanation: {
            en: [
              'Greeting: "How may I help you today?"',
              'Empathy: "I understand your concern."',
              'Apology: "I sincerely apologize for the inconvenience."',
              'Solution: "Let me see what I can do for you."',
              'Follow-up: "Is there anything else I can help you with?"'
            ],
            vi: [
              'Chào: "Tôi có thể giúp gì cho bạn?"',
              'Đồng cảm: "Tôi hiểu quan ngại của bạn."',
              'Xin lỗi: "Tôi chân thành xin lỗi về sự bất tiện."',
              'Giải pháp: "Để tôi xem tôi có thể làm gì."',
              'Theo dõi: "Còn gì tôi có thể giúp không?"'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice: Handle a product complaint',
              'Practice: Process a return request',
              'Practice: Upsell a service'
            ],
            vi: [
              'Thực hành: Xử lý khiếu nại sản phẩm',
              'Thực hành: Xử lý yêu cầu trả hàng',
              'Thực hành: Bán thêm dịch vụ'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 6: Grammar for Professionals =====
export const grammarModule: Unit = {
  id: 6,
  title: {
    en: 'Grammar for Professionals',
    vi: 'Ngữ Pháp Cho Chuyên Gia'
  },
  lessons: [
    {
      id: 601,
      title: { en: 'Business Grammar Essentials', vi: 'Ngữ Pháp Kinh Doanh Cơ Bản' },
      aims: {
        en: [
          'Use grammar accurately in business contexts',
          'Avoid common errors',
          'Write with clarity and precision'
        ],
        vi: [
          'Sử dụng ngữ pháp chính xác trong kinh doanh',
          'Tránh lỗi thường gặp',
          'Viết rõ ràng và chính xác'
        ]
      },
      vocabulary: [
        { term: 'Subject-verb agreement', pronunciation: '/ˈsʌbdʒɪkt vɜːb əˈɡriːmənt/', vietnamese: 'Sự hòa hợp chủ ngữ động từ' },
        { term: 'Tense consistency', pronunciation: '/tens kənˈsɪstənsi/', vietnamese: 'Nhất quán thì' },
        { term: 'Passive voice', pronunciation: '/ˈpæsɪv vɔɪs/', vietnamese: 'Thể bị động' }
      ],
      grammar: [
        {
          title: { en: 'Common Business Grammar', vi: 'Ngữ Pháp Kinh Doanh Thường Gặp' },
          explanation: {
            en: [
              'Conditional sentences: "If we increase production, costs will decrease."',
              'Reported speech: "She said she would send the report by Friday."',
              'Modal verbs: "We should/could/must review the contract."',
              'Prepositions: "We are responsible for... / interested in... / focused on..."'
            ],
            vi: [
              'Câu điều kiện: "Nếu chúng ta tăng sản xuất, chi phí sẽ giảm."',
              'Câu tường thuật: "Cô ấy nói sẽ gửi báo cáo trước thứ Sáu."',
              'Động từ khuyết thiếu: "Chúng ta nên/có thể/phải xem lại hợp đồng."',
              'Giới từ: "Chúng tôi chịu trách nhiệm về... / quan tâm đến... / tập trung vào..."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Grammar drills: Fix errors in business documents',
              'Practice: Rewrite informal text into formal',
              'Quiz: Business grammar test'
            ],
            vi: [
              'Luyện tập: Sửa lỗi trong tài liệu kinh doanh',
              'Thực hành: Viết lại văn bản thân mật thành trang trọng',
              'Kiểm tra: Bài test ngữ pháp kinh doanh'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 7: Cross-cultural Communication =====
export const crossCulturalModule: Unit = {
  id: 7,
  title: {
    en: 'Cross-cultural Communication',
    vi: 'Giao Tiếp Đa Văn Hóa'
  },
  lessons: [
    {
      id: 701,
      title: { en: 'Working with Global Teams', vi: 'Làm Việc Với Nhóm Quốc Tế' },
      aims: {
        en: [
          'Understand cultural differences',
          'Adapt communication style',
          'Build international relationships'
        ],
        vi: [
          'Hiểu khác biệt văn hóa',
          'Điều chỉnh phong cách giao tiếp',
          'Xây dựng quan hệ quốc tế'
        ]
      },
      vocabulary: [
        { term: 'Cultural awareness', pronunciation: '/ˈkʌltʃərəl əˈweənəs/', vietnamese: 'Nhận thức văn hóa' },
        { term: 'Etiquette', pronunciation: '/ˈetɪket/', vietnamese: 'Phép lịch sự' },
        { term: 'Time zones', pronunciation: '/taɪm zəʊnz/', vietnamese: 'Múi giờ' },
        { term: 'Diversity', pronunciation: '/daɪˈvɜːsəti/', vietnamese: 'Đa dạng' }
      ],
      grammar: [
        {
          title: { en: 'Polite and Diplomatic Language', vi: 'Ngôn Ngữ Lịch Sự Và Ngoại Giao' },
          explanation: {
            en: [
              'Softening: "It might be better to..." / "Perhaps we could..."',
              'Avoiding direct "no": "That could be challenging." / "We may need to reconsider."',
              'Showing respect: "In your culture..." / "From your perspective..."',
              'Building rapport: "I appreciate your input." / "That\'s an interesting point."'
            ],
            vi: [
              'Làm mềm: "Có lẽ tốt hơn là..." / "Có lẽ chúng ta có thể..."',
              'Tránh "không" trực tiếp: "Điều đó có thể khó." / "Chúng ta có thể cần xem xét lại."',
              'Tôn trọng: "Trong văn hóa của bạn..." / "Từ góc nhìn của bạn..."',
              'Xây dựng quan hệ: "Tôi đánh giá cao ý kiến của bạn." / "Đó là điểm thú vị."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'video',
          description: {
            en: [
              'YouTube: Cross-cultural Communication (Accent\'s Way English with Hadar)',
              'https://youtube.com/@AccentsWayEnglish',
              'Learn accent neutrality and clarity over perfection'
            ],
            vi: [
              'YouTube: Giao Tiếp Đa Văn Hóa (Accent\'s Way English with Hadar)',
              'https://youtube.com/@AccentsWayEnglish',
              'Học cách rõ ràng hơn là giọng hoàn hảo'
            ]
          }
        }
      ]
    }
  ]
};

// ============================================
// INDUSTRY-SPECIFIC MODULES (7)
// ============================================

// ===== MODULE 8: English for Sales & Marketing =====
export const salesMarketingModule: Unit = {
  id: 8,
  title: {
    en: 'English for Sales & Marketing',
    vi: 'Tiếng Anh Cho Bán Hàng & Marketing'
  },
  lessons: [
    {
      id: 801,
      title: { en: 'Pitching and Closing Deals', vi: 'Chào Hàng & Chốt Deal' },
      aims: {
        en: [
          'Create compelling sales pitches',
          'Handle objections',
          'Close deals confidently'
        ],
        vi: [
          'Tạo bài chào hàng hấp dẫn',
          'Xử lý phản đối',
          'Chốt deal tự tin'
        ]
      },
      vocabulary: [
        { term: 'Pitch', pronunciation: '/pɪtʃ/', vietnamese: 'Bài chào hàng' },
        { term: 'Lead', pronunciation: '/liːd/', vietnamese: 'Khách hàng tiềm năng' },
        { term: 'ROI (Return on Investment)', pronunciation: '/ɑːr əʊ aɪ/', vietnamese: 'Lợi nhuận đầu tư' },
        { term: 'Value proposition', pronunciation: '/ˈvæljuː ˌprɒpəˈzɪʃən/', vietnamese: 'Giá trị đề xuất' },
        { term: 'Closing', pronunciation: '/ˈkləʊzɪŋ/', vietnamese: 'Chốt deal' }
      ],
      grammar: [
        {
          title: { en: 'Persuasive Language', vi: 'Ngôn Ngữ Thuyết Phục' },
          explanation: {
            en: [
              'Benefits: "This will help you..." / "You\'ll be able to..."',
              'Social proof: "Our clients have seen..." / "Industry leaders use..."',
              'Urgency: "Limited time offer" / "Act now to..."',
              'Closing: "Shall we move forward?" / "Are you ready to get started?"'
            ],
            vi: [
              'Lợi ích: "Điều này sẽ giúp bạn..." / "Bạn sẽ có thể..."',
              'Bằng chứng xã hội: "Khách hàng của chúng tôi đã thấy..."',
              'Cấp bách: "Ưu đãi có hạn" / "Hành động ngay để..."',
              'Chốt: "Chúng ta tiến hành nhé?" / "Bạn sẵn sàng bắt đầu chưa?"'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Role-play: Sales call',
              'Role-play: Product demo',
              'Role-play: Handling price objections'
            ],
            vi: [
              'Đóng vai: Cuộc gọi bán hàng',
              'Đóng vai: Demo sản phẩm',
              'Đóng vai: Xử lý phản đối về giá'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 9: English for Human Resources =====
export const hrModule: Unit = {
  id: 9,
  title: {
    en: 'English for Human Resources',
    vi: 'Tiếng Anh Cho Nhân Sự'
  },
  lessons: [
    {
      id: 901,
      title: { en: 'Conducting Interviews', vi: 'Tiến Hành Phỏng Vấn' },
      aims: {
        en: [
          'Conduct effective job interviews',
          'Ask behavioral questions',
          'Evaluate candidates professionally'
        ],
        vi: [
          'Tiến hành phỏng vấn hiệu quả',
          'Đặt câu hỏi hành vi',
          'Đánh giá ứng viên chuyên nghiệp'
        ]
      },
      vocabulary: [
        { term: 'Candidate', pronunciation: '/ˈkændɪdət/', vietnamese: 'Ứng viên' },
        { term: 'Job description', pronunciation: '/dʒɒb dɪˈskrɪpʃən/', vietnamese: 'Mô tả công việc' },
        { term: 'Onboarding', pronunciation: '/ˈɒnbɔːdɪŋ/', vietnamese: 'Đào tạo nhân viên mới' },
        { term: 'Performance review', pronunciation: '/pəˈfɔːməns rɪˈvjuː/', vietnamese: 'Đánh giá hiệu suất' }
      ],
      grammar: [
        {
          title: { en: 'Interview Questions', vi: 'Câu Hỏi Phỏng Vấn' },
          explanation: {
            en: [
              'Experience: "Tell me about a time when..."',
              'Skills: "How would you handle...?"',
              'Motivation: "Why are you interested in this role?"',
              'Closing: "Do you have any questions for us?"'
            ],
            vi: [
              'Kinh nghiệm: "Kể về lần..."',
              'Kỹ năng: "Bạn sẽ xử lý như thế nào...?"',
              'Động lực: "Tại sao bạn quan tâm đến vị trí này?"',
              'Kết thúc: "Bạn có câu hỏi nào không?"'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Role-play: Job interview (interviewer)',
              'Role-play: Performance feedback session',
              'Role-play: Conflict resolution'
            ],
            vi: [
              'Đóng vai: Phỏng vấn xin việc (người phỏng vấn)',
              'Đóng vai: Phản hồi hiệu suất',
              'Đóng vai: Giải quyết xung đột'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 10: English for Finance & Accounting =====
export const financeModule: Unit = {
  id: 10,
  title: {
    en: 'English for Finance & Accounting',
    vi: 'Tiếng Anh Cho Tài Chính & Kế Toán'
  },
  lessons: [
    {
      id: 1001,
      title: { en: 'Financial Reports & Analysis', vi: 'Báo Cáo & Phân Tích Tài Chính' },
      aims: {
        en: [
          'Read and create financial reports',
          'Present financial data',
          'Discuss budgets and forecasts'
        ],
        vi: [
          'Đọc và tạo báo cáo tài chính',
          'Trình bày dữ liệu tài chính',
          'Thảo luận ngân sách và dự báo'
        ]
      },
      vocabulary: [
        { term: 'Revenue', pronunciation: '/ˈrevənjuː/', vietnamese: 'Doanh thu' },
        { term: 'Profit margin', pronunciation: '/ˈprɒfɪt ˈmɑːdʒɪn/', vietnamese: 'Biên lợi nhuận' },
        { term: 'Cash flow', pronunciation: '/kæʃ fləʊ/', vietnamese: 'Dòng tiền' },
        { term: 'Balance sheet', pronunciation: '/ˈbæləns ʃiːt/', vietnamese: 'Bảng cân đối kế toán' },
        { term: 'Assets', pronunciation: '/ˈæsets/', vietnamese: 'Tài sản' },
        { term: 'Liabilities', pronunciation: '/ˌlaɪəˈbɪlətiz/', vietnamese: 'Nợ phải trả' }
      ],
      grammar: [
        {
          title: { en: 'Financial Language', vi: 'Ngôn Ngữ Tài Chính' },
          explanation: {
            en: [
              'Trends: "Revenue increased by..." / "Costs decreased by..."',
              'Comparisons: "Compared to last year..." / "In relation to..."',
              'Forecasts: "We project..." / "We anticipate..."',
              'Recommendations: "We recommend..." / "It would be advisable to..."'
            ],
            vi: [
              'Xu hướng: "Doanh thu tăng..." / "Chi phí giảm..."',
              'So sánh: "So với năm ngoái..." / "Liên quan đến..."',
              'Dự báo: "Chúng tôi dự báo..." / "Chúng tôi kỳ vọng..."',
              'Khuyến nghị: "Chúng tôi khuyến nghị..." / "Nên..."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'microsoft-learn',
          description: {
            en: [
              'Microsoft Learn: Write business reports with Word',
              'https://learn.microsoft.com/training/modules/write-business-reports-word/',
              'Create professional financial reports'
            ],
            vi: [
              'Microsoft Learn: Viết báo cáo kinh doanh với Word',
              'https://learn.microsoft.com/training/modules/write-business-reports-word/',
              'Tạo báo cáo tài chính chuyên nghiệp'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 11: English for Logistics =====
export const logisticsModule: Unit = {
  id: 11,
  title: {
    en: 'English for Logistics & Operations',
    vi: 'Tiếng Anh Cho Vận Tải & Vận Hành'
  },
  lessons: [
    {
      id: 1101,
      title: { en: 'Supply Chain Communication', vi: 'Giao Tiếp Chuỗi Cung Ứng' },
      aims: {
        en: [
          'Manage shipments and deliveries',
          'Communicate with suppliers',
          'Handle logistics issues'
        ],
        vi: [
          'Quản lý vận chuyển và giao hàng',
          'Giao tiếp với nhà cung cấp',
          'Xử lý vấn đề vận tải'
        ]
      },
      vocabulary: [
        { term: 'Shipment', pronunciation: '/ˈʃɪpmənt/', vietnamese: 'Lô hàng' },
        { term: 'Delivery', pronunciation: '/dɪˈlɪvəri/', vietnamese: 'Giao hàng' },
        { term: 'Warehouse', pronunciation: '/ˈweəhaʊs/', vietnamese: 'Kho' },
        { term: 'Freight', pronunciation: '/freɪt/', vietnamese: 'Hàng hóa vận chuyển' },
        { term: 'Lead time', pronunciation: '/liːd taɪm/', vietnamese: 'Thời gian giao hàng' }
      ],
      grammar: [],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice: Track a shipment',
              'Practice: Report delivery delays',
              'Practice: Negotiate shipping terms'
            ],
            vi: [
              'Thực hành: Theo dõi lô hàng',
              'Thực hành: Báo cáo chậm giao',
              'Thực hành: Đàm phán điều khoản vận chuyển'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 12: English for IT & Tech =====
export const itTechModule: Unit = {
  id: 12,
  title: {
    en: 'English for IT & Tech Teams',
    vi: 'Tiếng Anh Cho Nhóm IT & Công Nghệ'
  },
  lessons: [
    {
      id: 1201,
      title: { en: 'Technical Communication', vi: 'Giao Tiếp Kỹ Thuật' },
      aims: {
        en: [
          'Explain technical concepts clearly',
          'Write documentation',
          'Troubleshoot with users'
        ],
        vi: [
          'Giải thích khái niệm kỹ thuật rõ ràng',
          'Viết tài liệu',
          'Khắc phục sự cố với người dùng'
        ]
      },
      vocabulary: [
        { term: 'Bug', pronunciation: '/bʌɡ/', vietnamese: 'Lỗi' },
        { term: 'Deployment', pronunciation: '/dɪˈplɔɪmənt/', vietnamese: 'Triển khai' },
        { term: 'Debugging', pronunciation: '/diːˈbʌɡɪŋ/', vietnamese: 'Gỡ lỗi' },
        { term: 'API', pronunciation: '/eɪ piː aɪ/', vietnamese: 'Giao diện lập trình ứng dụng' },
        { term: 'Downtime', pronunciation: '/ˈdaʊntaɪm/', vietnamese: 'Thời gian ngừng hoạt động' }
      ],
      grammar: [],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice: Explain a technical issue to non-technical stakeholders',
              'Practice: Write technical documentation',
              'Practice: Conduct a code review'
            ],
            vi: [
              'Thực hành: Giải thích vấn đề kỹ thuật cho người không chuyên',
              'Thực hành: Viết tài liệu kỹ thuật',
              'Thực hành: Tiến hành đánh giá code'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 13: English for Legal Contexts =====
export const legalModule: Unit = {
  id: 13,
  title: {
    en: 'English for Legal Contexts',
    vi: 'Tiếng Anh Cho Pháp Lý'
  },
  lessons: [
    {
      id: 1301,
      title: { en: 'Legal Documents & Compliance', vi: 'Tài Liệu Pháp Lý & Tuân Thủ' },
      aims: {
        en: [
          'Understand legal terminology',
          'Draft contracts',
          'Ensure compliance'
        ],
        vi: [
          'Hiểu thuật ngữ pháp lý',
          'Soạn hợp đồng',
          'Đảm bảo tuân thủ'
        ]
      },
      vocabulary: [
        { term: 'Contract', pronunciation: '/ˈkɒntrækt/', vietnamese: 'Hợp đồng' },
        { term: 'Clause', pronunciation: '/klɔːz/', vietnamese: 'Điều khoản' },
        { term: 'Liability', pronunciation: '/ˌlaɪəˈbɪləti/', vietnamese: 'Trách nhiệm pháp lý' },
        { term: 'Compliance', pronunciation: '/kəmˈplaɪəns/', vietnamese: 'Tuân thủ' },
        { term: 'Breach', pronunciation: '/briːtʃ/', vietnamese: 'Vi phạm' }
      ],
      grammar: [],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice: Review a contract',
              'Practice: Draft a non-disclosure agreement',
              'Practice: Explain legal terms in simple language'
            ],
            vi: [
              'Thực hành: Xem xét hợp đồng',
              'Thực hành: Soạn thỏa thuận bảo mật',
              'Thực hành: Giải thích thuật ngữ pháp lý đơn giản'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 14: English for Hospitality =====
export const hospitalityModule: Unit = {
  id: 14,
  title: {
    en: 'English for Hospitality & Service Excellence',
    vi: 'Tiếng Anh Cho Dịch Vụ Khách Sạn & Xuất Sắc'
  },
  lessons: [
    {
      id: 1401,
      title: { en: 'Guest Service & Handling Requests', vi: 'Dịch Vụ Khách & Xử Lý Yêu Cầu' },
      aims: {
        en: [
          'Greet guests professionally',
          'Handle special requests',
          'Resolve complaints gracefully'
        ],
        vi: [
          'Chào đón khách chuyên nghiệp',
          'Xử lý yêu cầu đặc biệt',
          'Giải quyết khiếu nại khéo léo'
        ]
      },
      vocabulary: [
        { term: 'Reservation', pronunciation: '/ˌrezəˈveɪʃən/', vietnamese: 'Đặt chỗ' },
        { term: 'Check-in/Check-out', pronunciation: '/tʃek ɪn/ /tʃek aʊt/', vietnamese: 'Nhận phòng/Trả phòng' },
        { term: 'Amenities', pronunciation: '/əˈmenətiz/', vietnamese: 'Tiện nghi' },
        { term: 'Concierge', pronunciation: '/ˌkɒnsiˈeəʒ/', vietnamese: 'Nhân viên phục vụ' }
      ],
      grammar: [
        {
          title: { en: 'Service Language', vi: 'Ngôn Ngữ Dịch Vụ' },
          explanation: {
            en: [
              'Greeting: "Welcome to... How may I assist you?"',
              'Offering help: "Let me help you with that."',
              'Handling issues: "I apologize for the inconvenience. Let me resolve this right away."',
              'Farewell: "Thank you for staying with us. We hope to see you again."'
            ],
            vi: [
              'Chào: "Chào mừng đến... Tôi có thể giúp gì?"',
              'Đề nghị giúp: "Để tôi giúp bạn."',
              'Xử lý vấn đề: "Tôi xin lỗi về sự bất tiện. Tôi sẽ giải quyết ngay."',
              'Tạm biệt: "Cảm ơn bạn đã ở với chúng tôi. Hy vọng gặp lại."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Role-play: Check-in procedure',
              'Role-play: Handle a room complaint',
              'Role-play: Recommend local attractions'
            ],
            vi: [
              'Đóng vai: Thủ tục nhận phòng',
              'Đóng vai: Xử lý khiếu nại phòng',
              'Đóng vai: Giới thiệu địa điểm địa phương'
            ]
          }
        }
      ]
    }
  ]
};

// ============================================
// EXPORT ALL MODULES
// ============================================

export const foundationModules: Unit[] = [
  emailWritingModule,
  meetingsModule,
  presentationsModule,
  negotiationModule,
  customerServiceModule,
  grammarModule,
  crossCulturalModule
];

export const industryModules: Unit[] = [
  salesMarketingModule,
  hrModule,
  financeModule,
  logisticsModule,
  itTechModule,
  legalModule,
  hospitalityModule
];

export const allBusinessModules: Unit[] = [
  ...foundationModules,
  ...industryModules
];

export default allBusinessModules;
