import { CurriculumLevel, CurriculumLesson, VocabularyItem, GrammarPoint, Activity } from '../types';

// Automated Curriculum Enhancement Script
// This script generates detailed lessons for curriculum units based on established templates

interface LessonTemplate {
    title: { en: string; vi: string };
    aims: { en: string[]; vi: string[] };
    vocabulary: VocabularyItem[];
    grammar: GrammarPoint[];
    activities: Activity[];
}

interface UnitContent {
    title: { en: string; vi: string };
    themes: string[];
    vocabulary: VocabularyItem[];
    grammar: GrammarPoint[];
    activities: Activity[];
}

// Template generators for different lesson types
const createGettingStartedLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Getting Started: ${unitContent.themes[0]}`, vi: `Bắt đầu: ${unitContent.themes[0]}` },
    aims: {
        en: [
            `Introduce vocabulary related to ${unitContent.themes.join(', ').toLowerCase()}`,
            'Discuss key concepts and activate prior knowledge',
            'Practice expressing opinions and sharing experiences',
            'Raise awareness about the importance of the topic in modern society'
        ],
        vi: [
            `Giới thiệu từ vựng liên quan đến ${unitContent.themes.join(', ').toLowerCase()}`,
            'Thảo luận các khái niệm chính và kích hoạt kiến thức nền',
            'Thực hành bày tỏ ý kiến và chia sẻ kinh nghiệm',
            'Nâng cao nhận thức về tầm quan trọng của chủ đề trong xã hội hiện đại'
        ]
    },
    vocabulary: unitContent.vocabulary.slice(0, 12),
    grammar: [],
    activities: [
        {
            type: 'Warm-up Discussion',
            description: {
                en: [
                    `Look at images/photos related to ${unitContent.themes[0].toLowerCase()}`,
                    'Discuss: What do you know about this topic? What experiences have you had?',
                    'Share: Why is this topic important in today\'s world?',
                    'Group activity: Create a mind map of key concepts and ideas'
                ],
                vi: [
                    `Nhìn vào hình ảnh liên quan đến ${unitContent.themes[0].toLowerCase()}`,
                    'Thảo luận: Bạn biết gì về chủ đề này? Bạn đã có những trải nghiệm gì?',
                    'Chia sẻ: Tại sao chủ đề này quan trọng trong thế giới ngày nay?',
                    'Hoạt động nhóm: Tạo bản đồ tư duy về các khái niệm và ý tưởng chính'
                ]
            }
        },
        {
            type: 'Vocabulary Introduction',
            description: {
                en: [
                    'Learn key vocabulary through matching and pronunciation practice',
                    'Complete sentences using new vocabulary in context',
                    'Categorize words by themes and create word families',
                    'Create a personal connection: Share how these terms relate to your life'
                ],
                vi: [
                    'Học từ vựng chính thông qua việc nối từ và luyện phát âm',
                    'Hoàn thành câu sử dụng từ vựng mới trong ngữ cảnh',
                    'Phân loại từ theo chủ đề và tạo họ từ',
                    'Tạo sự liên kết cá nhân: Chia sẻ cách các thuật ngữ này liên quan đến cuộc sống của bạn'
                ]
            }
        }
    ]
});

const createLanguageFocusLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
    aims: {
        en: [
            'Master pronunciation of key sounds and stress patterns',
            'Expand vocabulary related to the unit themes',
            'Understand and practice target grammar structures',
            'Apply language skills in meaningful contexts'
        ],
        vi: [
            'Nắm vững cách phát âm âm chính và quy tắc trọng âm',
            'Mở rộng vốn từ vựng liên quan đến chủ đề bài học',
            'Hiểu và thực hành các cấu trúc ngữ pháp mục tiêu',
            'Áp dụng kỹ năng ngôn ngữ trong các ngữ cảnh có ý nghĩa'
        ]
    },
    vocabulary: unitContent.vocabulary.slice(8, 20),
    grammar: unitContent.grammar.slice(0, 2),
    activities: [
        {
            type: 'Pronunciation Practice',
            description: {
                en: [
                    'Listen and practice target sounds in isolation and in words',
                    'Practice word stress and sentence intonation',
                    'Record and compare: Read sentences with correct pronunciation',
                    'Peer correction: Listen to partners and provide feedback'
                ],
                vi: [
                    'Nghe và luyện tập âm mục tiêu riêng lẻ và trong từ',
                    'Luyện tập trọng âm từ và ngữ điệu câu',
                    'Ghi âm và so sánh: Đọc câu với cách phát âm chính xác',
                    'Sửa lỗi cho nhau: Nghe bạn cùng lớp và đưa ra phản hồi'
                ]
            }
        },
        {
            type: 'Vocabulary Exercises',
            description: {
                en: [
                    'Complete gap-fill exercises with new vocabulary',
                    'Match definitions with terms and create example sentences',
                    'Word formation: Create adjectives, nouns, and verbs from base words',
                    'Discussion: Use vocabulary to describe personal experiences'
                ],
                vi: [
                    'Hoàn thành bài tập điền từ với từ vựng mới',
                    'Nối định nghĩa với thuật ngữ và tạo câu ví dụ',
                    'Tạo từ: Tạo tính từ, danh từ và động từ từ từ gốc',
                    'Thảo luận: Sử dụng từ vựng để mô tả kinh nghiệm cá nhân'
                ]
            }
        },
        {
            type: 'Grammar Practice',
            description: {
                en: [
                    'Exercise 1: Identify and correct grammar errors in sentences',
                    'Exercise 2: Complete sentences using target grammar structures',
                    'Exercise 3: Transform sentences using different grammar forms',
                    'Exercise 4: Write a short paragraph using all target grammar points'
                ],
                vi: [
                    'Bài tập 1: Xác định và sửa lỗi ngữ pháp trong câu',
                    'Bài tập 2: Hoàn thành câu sử dụng cấu trúc ngữ pháp mục tiêu',
                    'Bài tập 3: Biến đổi câu sử dụng các dạng ngữ pháp khác nhau',
                    'Bài tập 4: Viết một đoạn văn ngắn sử dụng tất cả điểm ngữ pháp mục tiêu'
                ]
            }
        }
    ]
});

const createReadingLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Reading: ${unitContent.themes[1] || 'Understanding Key Concepts'}`, vi: `Đọc: ${unitContent.themes[1] || 'Hiểu các khái niệm chính'}` },
    aims: {
        en: [
            'Develop reading comprehension skills for complex texts',
            'Practice reading strategies: skimming, scanning, and detailed reading',
            'Extract main ideas and supporting details from authentic texts',
            'Connect reading content with personal experiences and opinions'
        ],
        vi: [
            'Phát triển kỹ năng đọc hiểu cho các bài viết phức tạp',
            'Thực hành chiến lược đọc: đọc lướt, quét và đọc chi tiết',
            'Trích xuất ý chính và chi tiết hỗ trợ từ các bài viết chân thực',
            'Kết nối nội dung đọc với kinh nghiệm và ý kiến cá nhân'
        ]
    },
    vocabulary: unitContent.vocabulary.slice(16, 24),
    grammar: [],
    activities: [
        {
            type: 'Pre-Reading',
            description: {
                en: [
                    'Look at the title, headings, and images: What do you think the text is about?',
                    'Brainstorm: What do you already know about this topic?',
                    'Predict: What information do you expect to find in the reading?',
                    'Vocabulary preview: Learn key terms that will appear in the text'
                ],
                vi: [
                    'Nhìn vào tiêu đề, tiêu đề phụ và hình ảnh: Bạn nghĩ bài viết nói về điều gì?',
                    'Động não: Bạn đã biết gì về chủ đề này?',
                    'Dự đoán: Bạn mong đợi tìm thấy thông tin gì trong bài đọc?',
                    'Xem trước từ vựng: Học các thuật ngữ chính sẽ xuất hiện trong bài viết'
                ]
            }
        },
        {
            type: 'While-Reading',
            description: {
                en: [
                    'Skim for main ideas: Read quickly to identify the main topic and key points',
                    'Scan for specific information: Find answers to specific questions',
                    'Read for comprehension: Answer detailed questions about the content',
                    'Vocabulary in context: Find and understand how new words are used',
                    'Text analysis: Identify the text structure and organization'
                ],
                vi: [
                    'Đọc lướt để tìm ý chính: Đọc nhanh để xác định chủ đề chính và điểm chính',
                    'Quét tìm thông tin cụ thể: Tìm câu trả lời cho các câu hỏi cụ thể',
                    'Đọc để hiểu: Trả lời câu hỏi chi tiết về nội dung',
                    'Từ vựng trong ngữ cảnh: Tìm và hiểu cách sử dụng từ mới',
                    'Phân tích bài viết: Xác định cấu trúc và cách tổ chức của bài viết'
                ]
            }
        },
        {
            type: 'Post-Reading',
            description: {
                en: [
                    'Discussion: What is the main message of the reading?',
                    'Critical thinking: Do you agree with the author\'s views? Why or why not?',
                    'Application: How does this information relate to your life or community?',
                    'Extension: Research more about this topic and share your findings'
                ],
                vi: [
                    'Thảo luận: Thông điệp chính của bài đọc là gì?',
                    'Tư duy phê phán: Bạn có đồng ý với quan điểm của tác giả không? Tại sao hoặc tại sao không?',
                    'Ứng dụng: Thông tin này liên quan như thế nào đến cuộc sống hoặc cộng đồng của bạn?',
                    'Mở rộng: Nghiên cứu thêm về chủ đề này và chia sẻ kết quả của bạn'
                ]
            }
        }
    ]
});

const createSpeakingLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Speaking: ${unitContent.themes[2] || 'Expressing Opinions'}`, vi: `Nói: ${unitContent.themes[2] || 'Bày tỏ ý kiến'}` },
    aims: {
        en: [
            'Develop fluency in discussing unit themes and related topics',
            'Practice using functional language for opinions and discussions',
            'Improve pronunciation and intonation in extended speaking',
            'Build confidence in expressing ideas and responding to others'
        ],
        vi: [
            'Phát triển sự trôi chảy khi thảo luận chủ đề bài học và các chủ đề liên quan',
            'Thực hành sử dụng ngôn ngữ chức năng để bày tỏ ý kiến và thảo luận',
            'Cải thiện phát âm và ngữ điệu trong việc nói kéo dài',
            'Xây dựng sự tự tin trong việc bày tỏ ý tưởng và đáp lại người khác'
        ]
    },
    vocabulary: [
        { term: 'In my opinion,...', pronunciation: '', vietnamese: 'Theo ý kiến của tôi,...' },
        { term: 'I strongly believe that...', pronunciation: '', vietnamese: 'Tôi tin chắc rằng...' },
        { term: 'On the one hand... On the other hand...', pronunciation: '', vietnamese: 'Một mặt... Mặt khác...' },
        { term: 'What do you think about...', pronunciation: '', vietnamese: 'Bạn nghĩ gì về...' },
        { term: 'That\'s an interesting point, but...', pronunciation: '', vietnamese: 'Đó là một điểm thú vị, nhưng...' },
        { term: 'I agree with you because...', pronunciation: '', vietnamese: 'Tôi đồng ý với bạn vì...' },
        { term: 'I see your point, however...', pronunciation: '', vietnamese: 'Tôi hiểu ý bạn, tuy nhiên...' },
        { term: 'Let me give you an example...', pronunciation: '', vietnamese: 'Hãy để tôi đưa ra một ví dụ...' }
    ],
    grammar: [],
    activities: [
        {
            type: 'Useful Expressions',
            description: {
                en: [
                    'Learn expressions for giving opinions: I think, In my view, From my perspective',
                    'Learn phrases for agreeing: I agree, You\'re right, That\'s true',
                    'Learn language for disagreeing politely: I see your point, but..., I\'m not sure',
                    'Learn phrases for asking for opinions: What do you think? How do you feel about...?'
                ],
                vi: [
                    'Học biểu thức để đưa ra ý kiến: I think, In my view, From my perspective',
                    'Học cụm từ để đồng ý: I agree, You\'re right, That\'s true',
                    'Học ngôn ngữ để không đồng ý lịch sự: I see your point, but..., I\'m not sure',
                    'Học cụm từ để hỏi ý kiến: What do you think? How do you feel about...?'
                ]
            }
        },
        {
            type: 'Controlled Practice',
            description: {
                en: [
                    'Task 1: Complete dialogues using opinion expressions',
                    'Task 2: Role-play discussions about unit topics using target phrases',
                    'Task 3: Match opinions with appropriate responses',
                    'Task 4: Create a conversation script about a controversial topic'
                ],
                vi: [
                    'Bài tập 1: Hoàn thành đoạn hội thoại sử dụng biểu thức ý kiến',
                    'Bài tập 2: Đóng vai thảo luận về chủ đề bài học sử dụng cụm từ mục tiêu',
                    'Bài tập 3: Nối ý kiến với câu trả lời phù hợp',
                    'Bài tập 4: Tạo kịch bản cuộc trò chuyện về một chủ đề gây tranh cãi'
                ]
            }
        },
        {
            type: 'Freer Practice',
            description: {
                en: [
                    'Pair work: Discuss unit topics and share personal opinions',
                    'Group discussion: Debate different viewpoints on key issues',
                    'Presentation: Prepare and deliver a 2-minute talk on your chosen topic',
                    'Class debate: Take sides on a controversial issue related to the unit'
                ],
                vi: [
                    'Làm việc theo cặp: Thảo luận chủ đề bài học và chia sẻ ý kiến cá nhân',
                    'Thảo luận nhóm: Tranh luận các quan điểm khác nhau về các vấn đề chính',
                    'Trình bày: Chuẩn bị và trình bày một bài nói 2 phút về chủ đề bạn chọn',
                    'Tranh luận lớp: Chọn bên cho một vấn đề gây tranh cãi liên quan đến bài học'
                ]
            }
        }
    ]
});

const createListeningLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Listening: ${unitContent.themes[3] || 'Understanding Spoken Information'}`, vi: `Nghe: ${unitContent.themes[3] || 'Hiểu thông tin nói'}` },
    aims: {
        en: [
            'Develop listening skills for different types of spoken texts',
            'Practice note-taking while listening to complex information',
            'Understand main ideas and supporting details in audio materials',
            'Improve ability to follow lectures, interviews, and discussions'
        ],
        vi: [
            'Phát triển kỹ năng nghe cho các loại bài nói khác nhau',
            'Thực hành ghi chú khi nghe thông tin phức tạp',
            'Hiểu ý chính và chi tiết hỗ trợ trong tài liệu âm thanh',
            'Cải thiện khả năng theo dõi bài giảng, phỏng vấn và thảo luận'
        ]
    },
    vocabulary: unitContent.vocabulary.slice(20, 28),
    grammar: [],
    activities: [
        {
            type: 'Pre-Listening',
            description: {
                en: [
                    'Discuss: What type of listening text do you think you will hear?',
                    'Predict: What information will the speaker talk about?',
                    'Vocabulary preview: Learn key terms that may appear in the listening',
                    'Set a listening goal: "I want to identify the main points and 3 key details."'
                ],
                vi: [
                    'Thảo luận: Bạn nghĩ bạn sẽ nghe loại bài nghe nào?',
                    'Dự đoán: Người nói sẽ nói về thông tin gì?',
                    'Xem trước từ vựng: Học các thuật ngữ chính có thể xuất hiện trong bài nghe',
                    'Đặt mục tiêu nghe: "Tôi muốn xác định các điểm chính và 3 chi tiết chính."'
                ]
            }
        },
        {
            type: 'While-Listening',
            description: {
                en: [
                    'First listening: Focus on main ideas and general understanding',
                    'Second listening: Note specific details and key information',
                    'Third listening: Listen for opinions, attitudes, and speaker\'s purpose',
                    'Gap-fill: Complete notes or charts with missing information',
                    'Multiple choice: Answer detailed questions about the content'
                ],
                vi: [
                    'Nghe lần 1: Tập trung vào ý chính và hiểu chung',
                    'Nghe lần 2: Ghi chú chi tiết cụ thể và thông tin chính',
                    'Nghe lần 3: Nghe để tìm ý kiến, thái độ và mục đích của người nói',
                    'Điền từ: Hoàn thành ghi chú hoặc biểu đồ với thông tin còn thiếu',
                    'Trắc nghiệm: Trả lời câu hỏi chi tiết về nội dung'
                ]
            }
        },
        {
            type: 'Post-Listening',
            description: {
                en: [
                    'Compare notes with a partner and discuss any difficult parts',
                    'Discussion: What was the most interesting/surprising information?',
                    'Critical thinking: Do you agree with the speaker\'s views?',
                    'Application: How can you apply this information in your life?'
                ],
                vi: [
                    'So sánh ghi chú với bạn cùng lớp và thảo luận về bất kỳ phần khó nào',
                    'Thảo luận: Thông tin nào thú vị/ngạc nhiên nhất?',
                    'Tư duy phê phán: Bạn có đồng ý với quan điểm của người nói không?',
                    'Ứng dụng: Bạn có thể áp dụng thông tin này như thế nào trong cuộc sống?'
                ]
            }
        }
    ]
});

const createWritingLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Writing: ${unitContent.themes[4] || 'Expressing Ideas in Writing'}`, vi: `Viết: ${unitContent.themes[4] || 'Bày tỏ ý tưởng trong văn viết'}` },
    aims: {
        en: [
            'Learn the structure and features of target writing genres',
            'Practice planning, drafting, and revising written work',
            'Use appropriate language and style for different writing purposes',
            'Develop skills in paragraph organization and coherence'
        ],
        vi: [
            'Học cấu trúc và đặc điểm của các thể loại viết mục tiêu',
            'Thực hành lập kế hoạch, viết nháp và sửa đổi tác phẩm viết',
            'Sử dụng ngôn ngữ và phong cách phù hợp cho các mục đích viết khác nhau',
            'Phát triển kỹ năng tổ chức đoạn văn và tính mạch lạc'
        ]
    },
    vocabulary: [
        { term: 'Firstly, ...', pronunciation: '', vietnamese: 'Trước tiên, ...' },
        { term: 'In addition, ...', pronunciation: '', vietnamese: 'Ngoài ra, ...' },
        { term: 'However, ...', pronunciation: '', vietnamese: 'Tuy nhiên, ...' },
        { term: 'Therefore, ...', pronunciation: '', vietnamese: 'Do đó, ...' },
        { term: 'In conclusion, ...', pronunciation: '', vietnamese: 'Kết luận, ...' },
        { term: 'On the other hand, ...', pronunciation: '', vietnamese: 'Mặt khác, ...' },
        { term: 'Furthermore, ...', pronunciation: '', vietnamese: 'Hơn nữa, ...' },
        { term: 'As a result, ...', pronunciation: '', vietnamese: 'Kết quả là, ...' }
    ],
    grammar: unitContent.grammar.slice(1, 3),
    activities: [
        {
            type: 'Model Analysis',
            description: {
                en: [
                    'Read a model text and identify its structure and key features',
                    'Analyze: How does the writer introduce the topic and main ideas?',
                    'Notice: What language features make the writing effective?',
                    'Compare: How is this different from other types of writing you know?'
                ],
                vi: [
                    'Đọc một bài viết mẫu và xác định cấu trúc và đặc điểm chính của nó',
                    'Phân tích: Người viết giới thiệu chủ đề và ý chính như thế nào?',
                    'Chú ý: Những đặc điểm ngôn ngữ nào làm cho bài viết hiệu quả?',
                    'So sánh: Điều này khác với các loại văn viết khác mà bạn biết như thế nào?'
                ]
            }
        },
        {
            type: 'Pre-Writing',
            description: {
                en: [
                    'Choose a topic and brainstorm ideas and supporting details',
                    'Organize your ideas: Create an outline with introduction, body, conclusion',
                    'Language check: List key vocabulary and grammar structures to use',
                    'Plan your writing: Decide on word count, style, and target audience'
                ],
                vi: [
                    'Chọn chủ đề và động não ý tưởng và chi tiết hỗ trợ',
                    'Tổ chức ý tưởng: Tạo dàn ý với phần mở đầu, thân bài, kết luận',
                    'Kiểm tra ngôn ngữ: Liệt kê từ vựng chính và cấu trúc ngữ pháp để sử dụng',
                    'Lập kế hoạch viết: Quyết định số từ, phong cách và đối tượng mục tiêu'
                ]
            }
        },
        {
            type: 'While-Writing',
            description: {
                en: [
                    'Write your first draft following your outline and plan',
                    'Include: Clear introduction, well-developed body paragraphs, strong conclusion',
                    'Use target grammar and vocabulary appropriately throughout',
                    'Check: Ensure your writing has unity, coherence, and progression of ideas'
                ],
                vi: [
                    'Viết bản nháp đầu tiên theo dàn ý và kế hoạch của bạn',
                    'Bao gồm: Phần mở đầu rõ ràng, các đoạn thân bài phát triển tốt, kết luận mạnh',
                    'Sử dụng ngữ pháp và từ vựng mục tiêu phù hợp trong toàn bộ bài viết',
                    'Kiểm tra: Đảm bảo bài viết có tính thống nhất, mạch lạc và sự tiến triển của ý tưởng'
                ]
            }
        },
        {
            type: 'Post-Writing & Peer Editing',
            description: {
                en: [
                    'Exchange drafts with a partner for feedback and suggestions',
                    'Check: Content, organization, language use, and mechanics',
                    'Give constructive feedback: What works well? What needs improvement?',
                    'Revise your writing based on feedback and teacher comments',
                    'Final version: Proofread carefully and submit your polished work'
                ],
                vi: [
                    'Trao đổi bản nháp với bạn cùng lớp để nhận phản hồi và gợi ý',
                    'Kiểm tra: Nội dung, tổ chức, sử dụng ngôn ngữ và cơ học',
                    'Đưa ra phản hồi mang tính xây dựng: Điều gì hoạt động tốt? Điều gì cần cải thiện?',
                    'Sửa đổi bài viết của bạn dựa trên phản hồi và nhận xét của giáo viên',
                    'Phiên bản cuối: Đọc kỹ và nộp tác phẩm đã được chỉnh sửa của bạn'
                ]
            }
        }
    ]
});

const createCultureLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Culture/CLIL: ${unitContent.themes[5] || 'Cross-Cultural Perspectives'}`, vi: `Văn hóa/CLIL: ${unitContent.themes[5] || 'Góc nhìn đa văn hóa'}` },
    aims: {
        en: [
            'Explore cultural differences and similarities in unit themes',
            'Develop cross-cultural awareness and understanding',
            'Connect classroom learning with real-world cultural contexts',
            'Apply interdisciplinary knowledge to cultural analysis'
        ],
        vi: [
            'Khám phá sự khác biệt và tương đồng văn hóa trong chủ đề bài học',
            'Phát triển nhận thức và hiểu biết đa văn hóa',
            'Kết nối việc học trong lớp với ngữ cảnh văn hóa thực tế',
            'Áp dụng kiến thức liên ngành vào phân tích văn hóa'
        ]
    },
    vocabulary: unitContent.vocabulary.slice(24, 32),
    grammar: [],
    activities: [
        {
            type: 'Cultural Exploration',
            description: {
                en: [
                    'Research cultural practices related to the unit theme',
                    'Compare how different cultures approach the same topic',
                    'Identify cultural values and beliefs that influence behaviors',
                    'Present findings: Share interesting cultural facts with the class'
                ],
                vi: [
                    'Nghiên cứu các thực hành văn hóa liên quan đến chủ đề bài học',
                    'So sánh cách các nền văn hóa khác nhau tiếp cận cùng một chủ đề',
                    'Xác định giá trị và niềm tin văn hóa ảnh hưởng đến hành vi',
                    'Trình bày kết quả: Chia sẻ các sự thật văn hóa thú vị với lớp'
                ]
            }
        },
        {
            type: 'Cross-Cultural Comparison',
            description: {
                en: [
                    'Compare Vietnamese cultural practices with those from other countries',
                    'Discuss: How do cultural differences affect communication and understanding?',
                    'Analyze: What can we learn from different cultural approaches?',
                    'Debate: Should cultures adapt to global influences or preserve traditions?'
                ],
                vi: [
                    'So sánh các thực hành văn hóa Việt Nam với các nước khác',
                    'Thảo luận: Sự khác biệt văn hóa ảnh hưởng như thế nào đến giao tiếp và hiểu biết?',
                    'Phân tích: Chúng ta có thể học được gì từ các cách tiếp cận văn hóa khác nhau?',
                    'Tranh luận: Các nền văn hóa có nên thích ứng với ảnh hưởng toàn cầu hay bảo tồn truyền thống?'
                ]
            }
        },
        {
            type: 'Interdisciplinary Connection',
            description: {
                en: [
                    'Connect unit themes with other subjects (history, geography, science)',
                    'Explore real-world applications of classroom learning',
                    'Investigate current issues related to the unit theme globally',
                    'Project: Create a presentation linking culture, society, and the environment'
                ],
                vi: [
                    'Kết nối chủ đề bài học với các môn học khác (lịch sử, địa lý, khoa học)',
                    'Khám phá ứng dụng thực tế của việc học trong lớp',
                    'Điều tra các vấn đề hiện tại liên quan đến chủ đề bài học trên toàn cầu',
                    'Dự án: Tạo bài thuyết trình liên kết văn hóa, xã hội và môi trường'
                ]
            }
        }
    ]
});

const createProjectLesson = (unitId: number, unitContent: UnitContent): LessonTemplate => ({
    title: { en: `Project: ${unitContent.themes[6] || 'Applying Knowledge'}`, vi: `Dự án: ${unitContent.themes[6] || 'Áp dụng kiến thức'}` },
    aims: {
        en: [
            'Apply unit knowledge to create a comprehensive project',
            'Develop research, planning, and presentation skills',
            'Work collaboratively on real-world tasks',
            'Reflect on learning process and outcomes'
        ],
        vi: [
            'Áp dụng kiến thức bài học để tạo một dự án toàn diện',
            'Phát triển kỹ năng nghiên cứu, lập kế hoạch và trình bày',
            'Làm việc hợp tác trên các nhiệm vụ thực tế',
            'Suy ngẫm về quá trình và kết quả học tập'
        ]
    },
    vocabulary: [],
    grammar: [],
    activities: [
        {
            type: 'Planning Phase',
            description: {
                en: [
                    'Choose a project topic related to unit themes',
                    'Research: Gather information from multiple sources',
                    'Plan: Create a detailed project timeline and task division',
                    'Outline: Design your project structure and objectives'
                ],
                vi: [
                    'Chọn chủ đề dự án liên quan đến chủ đề bài học',
                    'Nghiên cứu: Thu thập thông tin từ nhiều nguồn',
                    'Lập kế hoạch: Tạo dòng thời gian dự án chi tiết và phân chia nhiệm vụ',
                    'Dàn ý: Thiết kế cấu trúc và mục tiêu dự án của bạn'
                ]
            }
        },
        {
            type: 'Creation Phase',
            description: {
                en: [
                    'Develop your project using appropriate tools and materials',
                    'Apply unit concepts and skills in your project work',
                    'Collaborate: Work effectively with team members',
                    'Review: Ensure project meets requirements and quality standards'
                ],
                vi: [
                    'Phát triển dự án của bạn sử dụng công cụ và vật liệu phù hợp',
                    'Áp dụng các khái niệm và kỹ năng bài học trong công việc dự án',
                    'Hợp tác: Làm việc hiệu quả với các thành viên trong nhóm',
                    'Xem lại: Đảm bảo dự án đáp ứng yêu cầu và tiêu chuẩn chất lượng'
                ]
            }
        },
        {
            type: 'Presentation Phase',
            description: {
                en: [
                    'Present your project to the class (5-7 minutes per group)',
                    'Include: Clear explanation, visual aids, and key findings',
                    'Answer questions from classmates and teacher',
                    'Receive feedback: What worked well? What could be improved?'
                ],
                vi: [
                    'Trình bày dự án của bạn trước lớp (5-7 phút mỗi nhóm)',
                    'Bao gồm: Giải thích rõ ràng, phương tiện trực quan và kết quả chính',
                    'Trả lời câu hỏi từ bạn cùng lớp và giáo viên',
                    'Nhận phản hồi: Điều gì hoạt động tốt? Điều gì có thể cải thiện?'
                ]
            }
        },
        {
            type: 'Reflection Phase',
            description: {
                en: [
                    'Self-assessment: What skills did you develop? What challenges did you face?',
                    'Content reflection: How has this project deepened your understanding?',
                    'Process reflection: What would you do differently next time?',
                    'Future application: How can you use these skills in other subjects?'
                ],
                vi: [
                    'Tự đánh giá: Bạn đã phát triển kỹ năng gì? Bạn đã đối mặt với thách thức nào?',
                    'Suy ngẫm nội dung: Dự án này đã làm sâu sắc thêm sự hiểu biết của bạn như thế nào?',
                    'Suy ngẫm quá trình: Lần tới bạn sẽ làm gì khác đi?',
                    'Ứng dụng tương lai: Bạn có thể sử dụng các kỹ năng này trong các môn học khác như thế nào?'
                ]
            }
        }
    ]
});

// Main function to generate detailed lessons for a unit
export const generateDetailedLessonsForUnit = (
    unitId: number,
    unitTitle: { en: string; vi: string },
    basicContent: any
): CurriculumLesson[] => {
    // Extract themes from unit title and basic content
    const themes = extractThemesFromUnit(unitTitle, basicContent);

    // Generate vocabulary based on unit themes
    const vocabulary = generateVocabularyForUnit(unitId, themes);

    // Generate grammar points based on unit themes
    const grammar = generateGrammarForUnit(unitId, themes);

    // Generate activities based on unit themes
    const activities = generateActivitiesForUnit(unitId, themes);

    const unitContent: UnitContent = {
        title: unitTitle,
        themes,
        vocabulary,
        grammar,
        activities
    };

    // Create 7 detailed lessons
    const lessons: LessonTemplate[] = [
        createGettingStartedLesson(unitId, unitContent),
        createLanguageFocusLesson(unitId, unitContent),
        createReadingLesson(unitId, unitContent),
        createSpeakingLesson(unitId, unitContent),
        createListeningLesson(unitId, unitContent),
        createWritingLesson(unitId, unitContent),
        createCultureLesson(unitId, unitContent)
    ];

    // Convert to CurriculumLesson format
    return lessons.map((lesson, index) => ({
        id: unitId * 100 + index + 1,
        day: index + 1,
        title: lesson.title,
        aims: lesson.aims,
        vocabulary: lesson.vocabulary,
        grammar: lesson.grammar,
        activities: lesson.activities
    }));
};

// Helper functions to extract and generate content
function extractThemesFromUnit(unitTitle: { en: string; vi: string }, basicContent: any): string[] {
    // Extract themes from unit title and basic content
    const themes: string[] = [];

    // Add main theme from title
    themes.push(unitTitle.en.split(':')[1]?.trim() || unitTitle.en);

    // Add sub-themes based on common unit topics
    const unitName = unitTitle.en.toLowerCase();
    if (unitName.includes('family')) {
        themes.push('Family Relationships', 'Household Responsibilities', 'Family Communication', 'Family Traditions', 'Modern Family Life', 'Family Values', 'Family Challenges');
    } else if (unitName.includes('environment')) {
        themes.push('Environmental Issues', 'Climate Change', 'Sustainable Living', 'Environmental Protection', 'Green Solutions', 'Eco-friendly Practices', 'Global Warming');
    } else if (unitName.includes('multicultural')) {
        themes.push('Cultural Diversity', 'Global Citizenship', 'Cultural Exchange', 'International Understanding', 'World Cultures', 'Cultural Adaptation', 'Unity in Diversity');
    } else if (unitName.includes('green living')) {
        themes.push('Sustainable Practices', 'Environmental Awareness', 'Eco-friendly Habits', 'Green Technology', 'Conservation Efforts', 'Sustainable Development', 'Environmental Education');
    } else if (unitName.includes('urbanisation')) {
        themes.push('City Development', 'Urban Challenges', 'Modern Cities', 'Urban Planning', 'City Life', 'Urban Environment', 'Future Cities');
    } else if (unitName.includes('life stories')) {
        themes.push('Biography', 'Personal Achievement', 'Life Lessons', 'Inspirational Figures', 'Life Journey', 'Success Stories', 'Role Models');
    } else {
        // Generic themes for other units
        themes.push('Key Concepts', 'Important Issues', 'Modern Applications', 'Future Implications', 'Real-world Connections', 'Critical Thinking', 'Practical Solutions');
    }

    return themes;
}

function generateVocabularyForUnit(unitId: number, themes: string[]): VocabularyItem[] {
    // Generate vocabulary based on unit themes
    const vocabularies: { [key: string]: VocabularyItem[] } = {
        family: [
            { term: 'nuclear family', pronunciation: '/ˈnjuːkliə(r) ˈfæməli/', vietnamese: 'gia đình hạt nhân' },
            { term: 'extended family', pronunciation: '/ɪkˈstendɪd ˈfæməli/', vietnamese: 'gia đình mở rộng' },
            { term: 'household chores', pronunciation: '/ˈhaʊshəʊld tʃɔː(r)z/', vietnamese: 'việc nhà' },
            { term: 'breadwinner', pronunciation: '/ˈbredwɪnə(r)/', vietnamese: 'người trụ cột kinh tế' },
            { term: 'homemaker', pronunciation: '/ˈhəʊmmeɪkə(r)/', vietnamese: 'người nội trợ' },
            { term: 'upbringing', pronunciation: '/ˈʌpbrɪŋɪŋ/', vietnamese: 'sự nuôi dưỡng, giáo dục' },
            { term: 'kinship', pronunciation: '/ˈkɪnʃɪp/', vietnamese: 'quan hệ họ hàng' },
            { term: 'domestic', pronunciation: '/dəˈmestɪk/', vietnamese: 'thuộc về gia đình, nội trợ' },
            { term: 'matriarch', pronunciation: '/ˈmeɪtriɑː(r)k/', vietnamese: 'người mẹ trong gia đình, tộc trưởng nữ' },
            { term: 'patriarch', pronunciation: '/ˈpeɪtriɑː(r)k/', vietnamese: 'người cha trong gia đình, tộc trưởng nam' },
            { term: 'filial piety', pronunciation: '/ˈfɪliəl ˈpaɪəti/', vietnamese: 'hiếu thảo' },
            { term: 'generational gap', pronunciation: '/ˌdʒenəˈreɪʃənl ɡæp/', vietnamese: 'khoảng cách thế hệ' },
            { term: 'family bonding', pronunciation: '/ˈfæməli ˈbɒndɪŋ/', vietnamese: 'sự gắn kết gia đình' },
            { term: 'work-life balance', pronunciation: '/wɜː(r)k laɪf ˈbæləns/', vietnamese: 'cân bằng công việc - cuộc sống' },
            { term: 'single-parent family', pronunciation: '/ˈsɪŋɡl peərənt ˈfæməli/', vietnamese: 'gia đình đơn thân' },
            { term: 'blended family', pronunciation: '/ˈblendɪd ˈfæməli/', vietnamese: 'gia đình ghép' },
            { term: 'foster care', pronunciation: '/ˈfɒstə(r) keə(r)/', vietnamese: 'nuôi dưỡng thay thế' },
            { term: 'adoption', pronunciation: '/əˈdɒpʃn/', vietnamese: 'nuôi con nuôi' },
            { term: 'divorce rate', pronunciation: '/dɪˈvɔː(r)s reɪt/', vietnamese: 'tỷ lệ ly hôn' },
            { term: 'child custody', pronunciation: '/tʃaɪld ˈkʌstədi/', vietnamese: 'quyền nuôi con' },
            { term: 'alimony', pronunciation: '/ˈælɪməni/', vietnamese: 'tiền cấp dưỡng' },
            { term: 'inheritance', pronunciation: '/ɪnˈherɪtəns/', vietnamese: 'tài sản thừa kế' },
            { term: 'family heirloom', pronunciation: '/ˈfæməli ˈeə(r)luːm/', vietnamese: 'đồ gia bảo' },
            { term: 'ancestor', pronunciation: '/ˈænsestə(r)/', vietnamese: 'tổ tiên' },
            { term: 'descendant', pronunciation: '/dɪˈsendənt/', vietnamese: 'con cháu' },
            { term: 'lineage', pronunciation: '/ˈlɪniɪdʒ/', vietnamese: 'dòng dõi' },
            { term: 'clan', pronunciation: '/klæn/', vietnamese: 'họ tộc' },
            { term: 'tribe', pronunciation: '/traɪb/', vietnamese: 'bộ tộc' },
            { term: 'ethnic group', pronunciation: '/ˈeθnɪk ɡruːp/', vietnamese: 'nhóm dân tộc' },
            { term: 'cultural heritage', pronunciation: '/ˈkʌltʃərəl ˈherɪtɪdʒ/', vietnamese: 'di sản văn hóa' },
            { term: 'tradition', pronunciation: '/trəˈdɪʃn/', vietnamese: 'truyền thống' },
            { term: 'custom', pronunciation: '/ˈkʌstəm/', vietnamese: 'phong tục' },
            { term: 'ritual', pronunciation: '/ˈrɪtʃuəl/', vietnamese: 'nghi lễ' },
            { term: 'ceremony', pronunciation: '/ˈserəməni/', vietnamese: 'lễ nghi' }
        ],
        environment: [
            { term: 'carbon footprint', pronunciation: '/ˈkɑː(r)bən ˈfʊtprɪnt/', vietnamese: 'dấu chân carbon' },
            { term: 'climate change', pronunciation: '/ˈklaɪmət tʃeɪndʒ/', vietnamese: 'biến đổi khí hậu' },
            { term: 'global warming', pronunciation: '/ˈɡləʊbl ˈwɔː(r)mɪŋ/', vietnamese: 'hiện tượng nóng lên toàn cầu' },
            { term: 'greenhouse effect', pronunciation: '/ˈɡriːnhaʊs ɪˈfekt/', vietnamese: 'hiệu ứng nhà kính' },
            { term: 'deforestation', pronunciation: '/diːˌfɒrɪˈsteɪʃn/', vietnamese: 'phá rừng' },
            { term: 'biodiversity', pronunciation: '/ˌbaɪəʊdaɪˈvɜː(r)səti/', vietnamese: 'đa dạng sinh học' },
            { term: 'ecosystem', pronunciation: '/ˈiːkəʊsɪstəm/', vietnamese: 'hệ sinh thái' },
            { term: 'sustainable', pronunciation: '/səˈsteɪnəbl/', vietnamese: 'bền vững' },
            { term: 'renewable energy', pronunciation: '/rɪˈnjuːəbl ˈenədʒi/', vietnamese: 'năng lượng tái tạo' },
            { term: 'fossil fuels', pronunciation: '/ˈfɒsl fjuːəlz/', vietnamese: 'nhiên liệu hóa thạch' },
            { term: 'pollution', pronunciation: '/pəˈluːʃn/', vietnamese: 'ô nhiễm' },
            { term: 'recycling', pronunciation: '/riːˈsaɪklɪŋ/', vietnamese: 'tái chế' },
            { term: 'conservation', pronunciation: '/ˌkɒnsə(r)ˈveɪʃn/', vietnamese: 'bảo tồn' },
            { term: 'endangered species', pronunciation: '/ɪnˈdeɪndʒə(r)d ˈspiːʃiːz/', vietnamese: 'loài có nguy cơ tuyệt chủng' },
            { term: 'natural habitat', pronunciation: '/ˈnætʃrəl ˈhæbɪtæt/', vietnamese: 'môi trường sống tự nhiên' },
            { term: 'ozone layer', pronunciation: '/ˈəʊzəʊn ˈleɪə(r)/', vietnamese: 'tầng ozone' },
            { term: 'acid rain', pronunciation: '/ˈæsɪd reɪn/', vietnamese: 'mưa axit' },
            { term: 'waste management', pronunciation: '/weɪst ˈmænɪdʒmənt/', vietnamese: 'quản lý chất thải' },
            { term: 'eco-friendly', pronunciation: '/ˌiːkəʊˈfrendli/', vietnamese: 'thân thiện với môi trường' },
            { term: 'carbon neutral', pronunciation: '/ˈkɑː(r)bən ˈnjuːtrəl/', vietnamese: 'trung hòa carbon' },
            { term: 'sustainable development', pronunciation: '/səˈsteɪnəbl dɪˈveləpmənt/', vietnamese: 'phát triển bền vững' },
            { term: 'environmental impact', pronunciation: '/ɪnˌvaɪərənˈmentl ˈɪmpækt/', vietnamese: 'tác động môi trường' },
            { term: 'green technology', pronunciation: '/ɡriːn tekˈnɒlədʒi/', vietnamese: 'công nghệ xanh' },
            { term: 'climate refugee', pronunciation: '/ˈklaɪmət ˌrefjuˈdʒiː/', vietnamese: 'người tị nạn khí hậu' },
            { term: 'extreme weather', pronunciation: '/ɪkˈstriːm ˈweðə(r)/', vietnamese: 'thời tiết cực đoan' },
            { term: 'sea level rise', pronunciation: '/siː ˈlevl raɪz/', vietnamese: 'mực nước biển dâng' },
            { term: 'melting ice caps', pronunciation: '/ˈmeltɪŋ aɪs kæps/', vietnamese: 'túi băng tan chảy' },
            { term: 'coral bleaching', pronunciation: '/ˈkɒrəl ˈbliːtʃɪŋ/', vietnamese: 'san hô trắng' },
            { term: 'soil erosion', pronunciation: '/sɔɪl ɪˈrəʊʒn/', vietnamese: 'xói mòn đất' },
            { term: 'water scarcity', pronunciation: '/ˈwɔːtə(r) ˈskeə(r)səti/', vietnamese: 'thiếu nước' },
            { term: 'air quality', pronunciation: '/eə(r) ˈkwɒləti/', vietnamese: 'chất lượng không khí' },
            { term: 'noise pollution', pronunciation: '/nɔɪz pəˈluːʃn/', vietnamese: 'ô nhiễm tiếng ồn' }
        ]
        // Add more vocabulary sets for other units...
    };

    // Return vocabulary based on unit themes
    const unitKey = themes[0].toLowerCase().includes('family') ? 'family' :
                   themes[0].toLowerCase().includes('environment') ? 'environment' : 'general';

    return vocabularies[unitKey] || [];
}

function generateGrammarForUnit(unitId: number, themes: string[]): GrammarPoint[] {
    // Generate grammar points based on unit themes
    const grammarPoints: GrammarPoint[] = [];

    // Add common grammar points based on unit type
    if (themes[0].toLowerCase().includes('family')) {
        grammarPoints.push({
            title: { en: 'Present Simple for Habits and Routines', vi: 'Thì hiện tại đơn cho thói quen và hoạt động thường xuyên' },
            explanation: {
                en: [
                    'Use: We use present simple to talk about regular habits, daily routines, and general truths.',
                    'Form: Subject + V(base form/s/es) + Object',
                    'Examples: - My father cooks dinner every evening. - She works as a teacher.',
                    'Time expressions: every day, usually, often, always, never, sometimes'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại đơn để nói về thói quen đều đặn, hoạt động hàng ngày và sự thật chung.',
                    'Cấu trúc: Chủ ngữ + Động từ (nguyên mẫu/thêm s/es) + Tân ngữ',
                    'Ví dụ: - Bố tôi nấu bữa tối mỗi tối. - Cô ấy làm giáo viên.',
                    'Trạng từ thời gian: every day (mỗi ngày), usually (thường), often (thường xuyên), always (luôn luôn)'
                ]
            }
        });
    } else if (themes[0].toLowerCase().includes('environment')) {
        grammarPoints.push({
            title: { en: 'Present Continuous for Current Changes', vi: 'Thì hiện tại tiếp diễn cho những thay đổi hiện tại' },
            explanation: {
                en: [
                    'Use: We use present continuous to talk about changes happening now, especially environmental changes.',
                    'Form: Subject + am/is/are + V-ing + Object',
                    'Examples: - The climate is changing rapidly. - Sea levels are rising every year.',
                    'Time expressions: now, at the moment, currently, these days'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại tiếp diễn để nói về những thay đổi đang xảy ra, đặc biệt là thay đổi môi trường.',
                    'Cấu trúc: Chủ ngữ + am/is/are + V-ing + Tân ngữ',
                    'Ví dụ: - Khí hậu đang thay đổi nhanh chóng. - Mực nước biển đang dâng cao mỗi năm.',
                    'Trạng từ thời gian: now (bây giờ), at the moment (hiện tại), currently (hiện nay)'
                ]
            }
        });
    }

    // Add more grammar points...
    grammarPoints.push({
        title: { en: 'Passive Voice in Environmental Contexts', vi: 'Thể bị động trong ngữ cảnh môi trường' },
        explanation: {
            en: [
                'Use: We use passive when the action is more important than who performs it.',
                'Form: Subject + be + past participle + by + agent (optional)',
                'Examples: - The forest is being destroyed. - Many animals have been killed by pollution.',
                'Common in environmental reports and scientific writing'
            ],
            vi: [
                'Cách dùng: Chúng ta dùng thể bị động khi hành động quan trọng hơn người thực hiện.',
                'Cấu trúc: Chủ ngữ + be + past participle + by + tác nhân (tùy chọn)',
                'Ví dụ: - Rừng đang bị phá hủy. - Nhiều động vật đã bị giết bởi ô nhiễm.',
                'Thường dùng trong báo cáo môi trường và văn viết khoa học'
            ]
        }
    });

    return grammarPoints;
}

function generateActivitiesForUnit(unitId: number, themes: string[]): Activity[] {
    // Generate activities based on unit themes
    return [
        {
            type: 'Discussion',
            description: {
                en: ['Discuss key themes and share personal experiences'],
                vi: ['Thảo luận chủ đề chính và chia sẻ kinh nghiệm cá nhân']
            }
        },
        {
            type: 'Research Project',
            description: {
                en: ['Research and present on related topics'],
                vi: ['Nghiên cứu và trình bày về các chủ đề liên quan']
            }
        },
        {
            type: 'Role-play',
            description: {
                en: ['Practice real-life situations related to the unit'],
                vi: ['Luyện tập các tình huống thực tế liên quan đến bài học']
            }
        }
    ];
}