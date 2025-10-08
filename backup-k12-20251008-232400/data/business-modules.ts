/**
 * English for Business - Core Modules
 * Mobile-First Learning Platform
 * 
 * 📱 Optimized for on-the-go learning
 * 🎯 Real workplace scenarios
 * 💼 Professional communication focus
 */

import type { Unit, CurriculumLesson, VocabularyItem, GrammarPoint, Activity } from '../types';

// ===== MODULE 1: Email Writing =====
export const emailWritingModule: Unit = {
  id: 1,
  title: {
    en: 'Professional Email Writing',
    vi: 'Viết Email Chuyên Nghiệp'
  },
  lessons: [
    {
      id: 101,
      title: {
        en: 'Email Basics & Structure',
        vi: 'Cơ Bản & Cấu Trúc Email'
      },
      aims: {
        en: [
          'Understand professional email structure',
          'Write clear subject lines',
          'Use appropriate greetings and closings'
        ],
        vi: [
          'Hiểu cấu trúc email chuyên nghiệp',
          'Viết tiêu đề rõ ràng',
          'Sử dụng lời chào và kết thúc phù hợp'
        ]
      },
      vocabulary: [
        {
          term: 'Subject line',
          pronunciation: '/ˈsʌbdʒɪkt laɪn/',
          vietnamese: 'Tiêu đề email',
          imageUrl: '/images/vocab/subject-line.png'
        },
        {
          term: 'Attachment',
          pronunciation: '/əˈtætʃmənt/',
          vietnamese: 'File đính kèm'
        },
        {
          term: 'Follow-up',
          pronunciation: '/ˈfɒləʊ ʌp/',
          vietnamese: 'Theo dõi, nhắc nhở'
        },
        {
          term: 'CC (Carbon Copy)',
          pronunciation: '/siː siː/',
          vietnamese: 'Gửi bản sao'
        },
        {
          term: 'BCC (Blind Carbon Copy)',
          pronunciation: '/biː siː siː/',
          vietnamese: 'Gửi bản sao ẩn'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Formal Email Phrases',
            vi: 'Cụm Từ Email Trang Trọng'
          },
          explanation: {
            en: [
              'Opening: "I am writing to inquire about..."',
              'Request: "I would appreciate it if you could..."',
              'Closing: "Thank you for your time and consideration."'
            ],
            vi: [
              'Mở đầu: "Tôi viết thư này để hỏi về..."',
              'Yêu cầu: "Tôi sẽ đánh giá cao nếu bạn có thể..."',
              'Kết thúc: "Cảm ơn bạn đã dành thời gian và xem xét."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Write an email to request information',
              'Identify errors in sample emails',
              'Match email phrases with scenarios'
            ],
            vi: [
              'Viết email yêu cầu thông tin',
              'Xác định lỗi trong email mẫu',
              'Ghép cụm từ email với tình huống'
            ]
          }
        }
      ]
    },
    {
      id: 102,
      title: {
        en: 'Request & Response Emails',
        vi: 'Email Yêu Cầu & Trả Lời'
      },
      aims: {
        en: [
          'Write clear request emails',
          'Respond professionally',
          'Handle difficult requests'
        ],
        vi: [
          'Viết email yêu cầu rõ ràng',
          'Trả lời chuyên nghiệp',
          'Xử lý yêu cầu khó'
        ]
      },
      vocabulary: [
        {
          term: 'ASAP (As Soon As Possible)',
          pronunciation: '/eɪ es eɪ piː/',
          vietnamese: 'Càng sớm càng tốt'
        },
        {
          term: 'Deadline',
          pronunciation: '/ˈdedlaɪn/',
          vietnamese: 'Hạn chót'
        },
        {
          term: 'Priority',
          pronunciation: '/praɪˈɒrəti/',
          vietnamese: 'Ưu tiên'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Making Polite Requests',
            vi: 'Đưa Ra Yêu Cầu Lịch Sự'
          },
          explanation: {
            en: [
              'Could you please...?',
              'Would it be possible to...?',
              'I was wondering if you could...'
            ],
            vi: [
              'Bạn có thể vui lòng...?',
              'Có thể...?',
              'Tôi tự hỏi liệu bạn có thể...'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Request a meeting time',
              'Ask for document updates',
              'Respond to urgent requests'
            ],
            vi: [
              'Yêu cầu thời gian họp',
              'Xin cập nhật tài liệu',
              'Trả lời yêu cầu khẩn'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 2: Meeting Communication =====
export const meetingModule: Unit = {
  id: 2,
  title: {
    en: 'Meeting Communication',
    vi: 'Giao Tiếp Trong Cuộc Họp'
  },
  lessons: [
    {
      id: 201,
      title: {
        en: 'Meeting Preparation & Scheduling',
        vi: 'Chuẩn Bị & Lên Lịch Họp'
      },
      aims: {
        en: [
          'Schedule meetings effectively',
          'Prepare meeting agendas',
          'Send meeting invitations'
        ],
        vi: [
          'Lên lịch họp hiệu quả',
          'Chuẩn bị chương trình họp',
          'Gửi lời mời họp'
        ]
      },
      vocabulary: [
        {
          term: 'Agenda',
          pronunciation: '/əˈdʒendə/',
          vietnamese: 'Chương trình họp'
        },
        {
          term: 'Minutes',
          pronunciation: '/ˈmɪnɪts/',
          vietnamese: 'Biên bản họp'
        },
        {
          term: 'Action items',
          pronunciation: '/ˈækʃən ˈaɪtəmz/',
          vietnamese: 'Nhiệm vụ cần làm'
        },
        {
          term: 'Attendee',
          pronunciation: '/əˌtenˈdiː/',
          vietnamese: 'Người tham dự'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Meeting Phrases',
            vi: 'Cụm Từ Trong Họp'
          },
          explanation: {
            en: [
              'Opening: "Let\'s get started."',
              'Expressing opinion: "In my opinion..."',
              'Agreeing: "I completely agree with..."',
              'Disagreeing: "I see your point, but..."'
            ],
            vi: [
              'Mở đầu: "Chúng ta bắt đầu nào."',
              'Đưa ý kiến: "Theo tôi..."',
              'Đồng ý: "Tôi hoàn toàn đồng ý với..."',
              'Không đồng ý: "Tôi hiểu quan điểm của bạn, nhưng..."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'simulation',
          description: {
            en: [
              'Schedule a team meeting',
              'Create a meeting agenda',
              'Practice meeting phrases'
            ],
            vi: [
              'Lên lịch họp nhóm',
              'Tạo chương trình họp',
              'Thực hành cụm từ họp'
            ]
          }
        }
      ]
    },
    {
      id: 202,
      title: {
        en: 'Participating in Meetings',
        vi: 'Tham Gia Cuộc Họp'
      },
      aims: {
        en: [
          'Express opinions clearly',
          'Ask questions effectively',
          'Handle disagreements professionally'
        ],
        vi: [
          'Diễn đạt ý kiến rõ ràng',
          'Đặt câu hỏi hiệu quả',
          'Xử lý bất đồng chuyên nghiệp'
        ]
      },
      vocabulary: [
        {
          term: 'To interrupt',
          pronunciation: '/ˌɪntəˈrʌpt/',
          vietnamese: 'Ngắt lời'
        },
        {
          term: 'To clarify',
          pronunciation: '/ˈklærɪfaɪ/',
          vietnamese: 'Làm rõ'
        },
        {
          term: 'Consensus',
          pronunciation: '/kənˈsensəs/',
          vietnamese: 'Sự đồng thuận'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Interrupting Politely',
            vi: 'Ngắt Lời Lịch Sự'
          },
          explanation: {
            en: [
              'Sorry to interrupt, but...',
              'If I may add something...',
              'Excuse me, could I just say...'
            ],
            vi: [
              'Xin lỗi vì ngắt lời, nhưng...',
              'Nếu tôi có thể thêm...',
              'Xin lỗi, tôi có thể nói...'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Participate in a team meeting',
              'Present your opinion',
              'Respond to questions'
            ],
            vi: [
              'Tham gia họp nhóm',
              'Trình bày ý kiến',
              'Trả lời câu hỏi'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 3: Presentation Skills =====
export const presentationModule: Unit = {
  id: 3,
  title: {
    en: 'Business Presentations',
    vi: 'Thuyết Trình Kinh Doanh'
  },
  lessons: [
    {
      id: 301,
      title: {
        en: 'Presentation Structure',
        vi: 'Cấu Trúc Thuyết Trình'
      },
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
        {
          term: 'Slide deck',
          pronunciation: '/slaɪd dek/',
          vietnamese: 'Bộ slides'
        },
        {
          term: 'Handout',
          pronunciation: '/ˈhændaʊt/',
          vietnamese: 'Tài liệu phát tay'
        },
        {
          term: 'Q&A (Questions and Answers)',
          pronunciation: '/kjuː ænd eɪ/',
          vietnamese: 'Hỏi đáp'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Presentation Openers',
            vi: 'Cách Mở Đầu Thuyết Trình'
          },
          explanation: {
            en: [
              'Good morning everyone. Today I\'ll be talking about...',
              'The purpose of this presentation is to...',
              'By the end of this session, you will...'
            ],
            vi: [
              'Chào buổi sáng mọi người. Hôm nay tôi sẽ nói về...',
              'Mục đích của bài thuyết trình là...',
              'Kết thúc buổi này, bạn sẽ...'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Create a presentation outline',
              'Practice opening statements',
              'Prepare for Q&A'
            ],
            vi: [
              'Tạo dàn ý thuyết trình',
              'Thực hành câu mở đầu',
              'Chuẩn bị cho hỏi đáp'
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
    en: 'Negotiation & Persuasion',
    vi: 'Đàm Phán & Thuyết Phục'
  },
  lessons: [
    {
      id: 401,
      title: {
        en: 'Basic Negotiation Techniques',
        vi: 'Kỹ Thuật Đàm Phán Cơ Bản'
      },
      aims: {
        en: [
          'Use persuasive language',
          'Handle objections',
          'Reach win-win solutions'
        ],
        vi: [
          'Sử dụng ngôn ngữ thuyết phục',
          'Xử lý phản đối',
          'Đạt giải pháp đôi bên cùng có lợi'
        ]
      },
      vocabulary: [
        {
          term: 'Compromise',
          pronunciation: '/ˈkɒmprəmaɪz/',
          vietnamese: 'Thỏa hiệp'
        },
        {
          term: 'Leverage',
          pronunciation: '/ˈliːvərɪdʒ/',
          vietnamese: 'Đòn bẩy, lợi thế'
        },
        {
          term: 'Win-win',
          pronunciation: '/wɪn wɪn/',
          vietnamese: 'Đôi bên cùng thắng'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Negotiation Language',
            vi: 'Ngôn Ngữ Đàm Phán'
          },
          explanation: {
            en: [
              'Making offers: "We could offer..."',
              'Accepting: "That sounds reasonable."',
              'Rejecting: "I\'m afraid we can\'t accept that."',
              'Counteroffering: "What if we...?"'
            ],
            vi: [
              'Đưa ra đề nghị: "Chúng tôi có thể đề nghị..."',
              'Chấp nhận: "Nghe có vẻ hợp lý."',
              'Từ chối: "Tôi e rằng chúng tôi không thể chấp nhận."',
              'Đề nghị ngược: "Nếu chúng ta...?"'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'role-play',
          description: {
            en: [
              'Negotiate a contract',
              'Handle pricing discussions',
              'Reach an agreement'
            ],
            vi: [
              'Đàm phán hợp đồng',
              'Thảo luận giá cả',
              'Đạt thỏa thuận'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 5: Phone Communication =====
export const phoneModule: Unit = {
  id: 5,
  title: {
    en: 'Telephone Communication',
    vi: 'Giao Tiếp Qua Điện Thoại'
  },
  lessons: [
    {
      id: 501,
      title: {
        en: 'Professional Phone Calls',
        vi: 'Cuộc Gọi Chuyên Nghiệp'
      },
      aims: {
        en: [
          'Answer calls professionally',
          'Take messages accurately',
          'Handle difficult callers'
        ],
        vi: [
          'Trả lời điện thoại chuyên nghiệp',
          'Ghi nhận tin nhắn chính xác',
          'Xử lý người gọi khó tính'
        ]
      },
      vocabulary: [
        {
          term: 'Hold the line',
          pronunciation: '/həʊld ðə laɪn/',
          vietnamese: 'Giữ máy'
        },
        {
          term: 'Transfer a call',
          pronunciation: '/trænsˈfɜː ə kɔːl/',
          vietnamese: 'Chuyển máy'
        },
        {
          term: 'Voice message',
          pronunciation: '/vɔɪs ˈmesɪdʒ/',
          vietnamese: 'Tin nhắn thoại'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Phone Etiquette',
            vi: 'Phép Lịch Sự Khi Gọi Điện'
          },
          explanation: {
            en: [
              'Answering: "Good morning, [Company], [Name] speaking."',
              'Taking messages: "May I take a message?"',
              'Ending: "Thank you for calling."'
            ],
            vi: [
              'Trả lời: "Chào buổi sáng, [Công ty], [Tên] nghe."',
              'Ghi nhận: "Tôi có thể ghi lại lời nhắn?"',
              'Kết thúc: "Cảm ơn bạn đã gọi."'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'listening',
          description: {
            en: [
              'Listen to sample calls',
              'Take accurate messages',
              'Practice phone role-plays'
            ],
            vi: [
              'Nghe mẫu cuộc gọi',
              'Ghi nhận lời nhắn chính xác',
              'Thực hành đóng vai gọi điện'
            ]
          }
        }
      ]
    }
  ]
};

// ===== MODULE 6: Networking & Small Talk =====
export const networkingModule: Unit = {
  id: 6,
  title: {
    en: 'Networking & Small Talk',
    vi: 'Mạng Lưới & Trò Chuyện Xã Giao'
  },
  lessons: [
    {
      id: 601,
      title: {
        en: 'Business Networking',
        vi: 'Xây Dựng Mạng Lưới Kinh Doanh'
      },
      aims: {
        en: [
          'Start conversations confidently',
          'Exchange business cards',
          'Follow up after events'
        ],
        vi: [
          'Bắt đầu cuộc trò chuyện tự tin',
          'Trao đổi danh thiếp',
          'Theo dõi sau sự kiện'
        ]
      },
      vocabulary: [
        {
          term: 'Business card',
          pronunciation: '/ˈbɪznəs kɑːd/',
          vietnamese: 'Danh thiếp'
        },
        {
          term: 'Icebreaker',
          pronunciation: '/ˈaɪsbreɪkər/',
          vietnamese: 'Câu phá băng'
        },
        {
          term: 'Rapport',
          pronunciation: '/ræˈpɔː/',
          vietnamese: 'Mối quan hệ tốt'
        }
      ],
      grammar: [
        {
          title: {
            en: 'Conversation Starters',
            vi: 'Cách Mở Đầu Cuộc Trò Chuyện'
          },
          explanation: {
            en: [
              'How long have you been in this industry?',
              'What brings you to this event?',
              'I noticed you work at... How do you like it?'
            ],
            vi: [
              'Bạn đã làm trong ngành này bao lâu rồi?',
              'Điều gì đưa bạn đến sự kiện này?',
              'Tôi để ý bạn làm ở... Bạn thấy thế nào?'
            ]
          }
        }
      ],
      activities: [
        {
          type: 'practice',
          description: {
            en: [
              'Practice introductions',
              'Small talk scenarios',
              'Follow-up emails'
            ],
            vi: [
              'Thực hành giới thiệu',
              'Tình huống trò chuyện',
              'Email theo dõi'
            ]
          }
        }
      ]
    }
  ]
};

// ===== EXPORT ALL MODULES =====
export const businessModules: Unit[] = [
  emailWritingModule,
  meetingModule,
  presentationModule,
  negotiationModule,
  phoneModule,
  networkingModule
];

export default businessModules;
