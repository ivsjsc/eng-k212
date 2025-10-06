import { CurriculumLevel, CurriculumLesson, VocabularyItem, GrammarPoint, Activity } from '../types';

// Enhanced lesson creation function for detailed curriculum
const createDetailedLessonsForUnit = (unitId: number, lessonsData: any[]): CurriculumLesson[] => {
    return lessonsData.map((lesson, index) => {
        const vocabularyItems: VocabularyItem[] = (lesson.vocabulary || []).map((item: any) => ({
            term: item.term,
            pronunciation: item.pronunciation,
            vietnamese: item.vietnamese
        }));

        const grammarPoints: GrammarPoint[] = (lesson.grammar || []).map((point: any) => ({
            title: point.title,
            explanation: point.explanation
        }));

        const activityItems: Activity[] = (lesson.activities || []).map((activity: any) => ({
            type: activity.type,
            description: activity.description
        }));

        return {
            id: unitId * 100 + index + 1,
            day: index + 1,
            title: lesson.title,
            aims: lesson.aims,
            vocabulary: vocabularyItems,
            grammar: grammarPoints,
            activities: activityItems
        };
    });
};

// Original lesson creation function for basic curriculum
const createLessonForUnit = (unitId: number, baseTitle: { en: string; vi: string; }, summary: any) => {
    return {
        id: unitId * 100 + 1,
        day: 1,
        title: { en: 'Unit Overview', vi: 'Tổng quan bài học' },
        aims: {
            en: [
                `Learn vocabulary about ${summary.vocabulary.en.toLowerCase()}.`,
                `Understand and use grammar: ${summary.grammar.en}.`,
                `Practice pronunciation: ${summary.pronunciation.en}.`,
            ],
            vi: [
                `Học từ vựng về ${summary.vocabulary.vi.toLowerCase()}.`,
                `Hiểu và sử dụng ngữ pháp: ${summary.grammar.vi}.`,
                `Luyện phát âm: ${summary.pronunciation.vi}.`,
            ]
        },
        vocabulary: [],
        grammar: [],
        activities: [
            { type: 'Reading', description: { en: [summary.reading.en], vi: [summary.reading.vi] } },
            { type: 'Speaking', description: { en: [summary.speaking.en], vi: [summary.speaking.vi] } },
            { type: 'Listening', description: { en: [summary.listening.en], vi: [summary.listening.vi] } },
            { type: 'Writing', description: { en: [summary.writing.en], vi: [summary.writing.vi] } },
            { type: 'Everyday English', description: { en: [summary.everydayEnglish.en], vi: [summary.everydayEnglish.vi] } },
            { type: 'Culture/CLIL', description: { en: [summary.cultureClil.en], vi: [summary.cultureClil.vi] } },
            { type: 'Project', description: { en: [summary.project.en], vi: [summary.project.vi] } },
        ]
    };
};

export const g11Data: CurriculumLevel = {
    level: 11,
    title: { en: 'Grade 11', vi: 'Lớp 11' },
    subtitle: { en: 'Global Success', vi: 'Tiếng Anh 11 - Global Success' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1-v-PIbluLEMH5hXqU_lvCd3TWSYoTGnV/view?usp=drive_link',
    units: [
        {
            id: 1101,
            title: { en: 'Unit 1: A Long and Healthy Life', vi: 'Bài 1: Cuộc sống khỏe mạnh và trường thọ' },
            lessons: createDetailedLessonsForUnit(1101, [
                {
                    title: { en: 'Getting Started: Healthy Living Choices', vi: 'Bắt đầu: Lựa chọn sống khỏe mạnh' },
                    aims: {
                        en: [
                            'Introduce vocabulary related to health, fitness, and healthy lifestyle choices',
                            'Discuss personal health habits and their impact on longevity',
                            'Practice expressing opinions about healthy living and giving advice',
                            'Raise awareness about the importance of maintaining good health throughout life'
                        ],
                        vi: [
                            'Giới thiệu từ vựng liên quan đến sức khỏe, thể dục và lựa chọn lối sống lành mạnh',
                            'Thảo luận về thói quen sức khỏe cá nhân và tác động của chúng đến tuổi thọ',
                            'Thực hành bày tỏ ý kiến về lối sống khỏe mạnh và đưa ra lời khuyên',
                            'Nâng cao nhận thức về tầm quan trọng của việc duy trì sức khỏe tốt suốt đời'
                        ]
                    },
                    vocabulary: [
                        { term: 'longevity', pronunciation: '/lɒnˈdʒevəti/', vietnamese: 'tuổi thọ, sự trường thọ' },
                        { term: 'wellness', pronunciation: '/ˈwelnes/', vietnamese: 'sức khỏe toàn diện, sự khỏe mạnh' },
                        { term: 'fitness', pronunciation: '/ˈfɪtnes/', vietnamese: 'sức khỏe thể chất, thể dục' },
                        { term: 'nutrition', pronunciation: '/njuːˈtrɪʃn/', vietnamese: 'dinh dưỡng' },
                        { term: 'lifestyle', pronunciation: '/ˈlaɪfstaɪl/', vietnamese: 'lối sống' },
                        { term: 'habit', pronunciation: '/ˈhæbɪt/', vietnamese: 'thói quen' },
                        { term: 'routine', pronunciation: '/ruːˈtiːn/', vietnamese: 'thói quen hàng ngày' },
                        { term: 'balanced diet', pronunciation: '/ˈbælənst ˈdaɪət/', vietnamese: 'chế độ ăn uống cân bằng' },
                        { term: 'regular exercise', pronunciation: '/ˈreɡjələ(r) ˈeksəsaɪz/', vietnamese: 'tập thể dục đều đặn' },
                        { term: 'stress management', pronunciation: '/stres ˈmænɪdʒmənt/', vietnamese: 'quản lý căng thẳng' },
                        { term: 'preventive care', pronunciation: '/prɪˈventɪv keə(r)/', vietnamese: 'chăm sóc phòng ngừa' },
                        { term: 'chronic disease', pronunciation: '/ˈkrɒnɪk dɪˈziːz/', vietnamese: 'bệnh mãn tính' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Warm-up Discussion',
                            description: {
                                en: [
                                    'Look at pictures of people doing different healthy activities (exercising, eating healthy food, sleeping well, meditating)',
                                    'Discuss: What does "a long and healthy life" mean to you?',
                                    'Share: What healthy habits do you have? What unhealthy habits do you want to change?',
                                    'Group poll: Rank these factors for longevity: diet (30%), exercise (25%), sleep (20%), stress management (15%), genetics (10%)'
                                ],
                                vi: [
                                    'Nhìn vào các hình ảnh về mọi người làm các hoạt động khỏe mạnh khác nhau (tập thể dục, ăn thực phẩm lành mạnh, ngủ tốt, thiền)',
                                    'Thảo luận: "Cuộc sống khỏe mạnh và trường thọ" có nghĩa gì với bạn?',
                                    'Chia sẻ: Bạn có những thói quen khỏe mạnh nào? Bạn muốn thay đổi thói quen không lành mạnh nào?',
                                    'Thăm dò nhóm: Xếp hạng các yếu tố cho tuổi thọ: chế độ ăn (30%), tập thể dục (25%), giấc ngủ (20%), quản lý căng thẳng (15%), di truyền (10%)'
                                ]
                            }
                        },
                        {
                            type: 'Listen and Read',
                            description: {
                                en: [
                                    'Listen to a conversation between two friends discussing their health goals',
                                    'Read along and identify the healthy habits they mention',
                                    'Answer: What challenges do they face in maintaining healthy lifestyles?',
                                    'Discuss: Which of their habits could you adopt? Which ones are difficult for you?'
                                ],
                                vi: [
                                    'Nghe một cuộc trò chuyện giữa hai người bạn thảo luận về mục tiêu sức khỏe của họ',
                                    'Đọc theo và xác định các thói quen lành mạnh họ đề cập',
                                    'Trả lời: Họ gặp những thách thức nào trong việc duy trì lối sống lành mạnh?',
                                    'Thảo luận: Bạn có thể áp dụng thói quen nào của họ? Thói quen nào khó khăn với bạn?'
                                ]
                            }
                        },
                        {
                            type: 'Vocabulary Practice',
                            description: {
                                en: [
                                    'Match health terms with their definitions',
                                    'Complete sentences about healthy living using new vocabulary',
                                    'Categorize words: Health problems / Healthy habits / Nutrition terms',
                                    'Create a mind map: "My Path to a Long and Healthy Life" using 8-10 vocabulary words'
                                ],
                                vi: [
                                    'Nối các thuật ngữ sức khỏe với định nghĩa của chúng',
                                    'Hoàn thành các câu về lối sống lành mạnh sử dụng từ vựng mới',
                                    'Phân loại từ: Vấn đề sức khỏe / Thói quen lành mạnh / Thuật ngữ dinh dưỡng',
                                    'Tạo sơ đồ tư duy: "Con đường của tôi đến cuộc sống khỏe mạnh và trường thọ" sử dụng 8-10 từ vựng'
                                ]
                            }
                        },
                        {
                            type: 'Group Project',
                            description: {
                                en: [
                                    'In groups of 4: Create a "Healthy Living Action Plan" poster',
                                    'Include: Daily routines, weekly goals, monthly challenges, long-term objectives',
                                    'Present your plan to the class and explain why each element contributes to longevity',
                                    'Vote for the most realistic and comprehensive plan'
                                ],
                                vi: [
                                    'Theo nhóm 4 người: Tạo áp phích "Kế hoạch hành động sống khỏe mạnh"',
                                    'Bao gồm: Thói quen hàng ngày, mục tiêu hàng tuần, thử thách hàng tháng, mục tiêu dài hạn',
                                    'Trình bày kế hoạch của nhóm cho lớp và giải thích tại sao mỗi yếu tố góp phần vào tuổi thọ',
                                    'Bỏ phiếu cho kế hoạch thực tế và toàn diện nhất'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
                    aims: {
                        en: [
                            'Master the pronunciation of strong and weak forms of auxiliary verbs',
                            'Expand vocabulary related to health, fitness, and medical conditions',
                            'Distinguish between past simple and present perfect tenses in health contexts',
                            'Use both tenses correctly to talk about health history and current health status'
                        ],
                        vi: [
                            'Nắm vững cách phát âm hình thức mạnh và yếu của động từ hỗ trợ',
                            'Mở rộng vốn từ vựng liên quan đến sức khỏe, thể dục và tình trạng bệnh lý',
                            'Phân biệt giữa thì quá khứ đơn và hiện tại hoàn thành trong ngữ cảnh sức khỏe',
                            'Sử dụng cả hai thì một cách chính xác để nói về lịch sử sức khỏe và tình trạng sức khỏe hiện tại'
                        ]
                    },
                    vocabulary: [
                        { term: 'cardiovascular', pronunciation: '/ˌkɑːdiəʊˈvæskjələ(r)/', vietnamese: 'liên quan đến tim mạch' },
                        { term: 'hypertension', pronunciation: '/ˌhaɪpə(r)ˈtenʃn/', vietnamese: 'huyết áp cao' },
                        { term: 'diabetes', pronunciation: '/ˌdaɪəˈbiːtiːz/', vietnamese: 'tiểu đường' },
                        { term: 'obesity', pronunciation: '/əʊˈbiːsəti/', vietnamese: 'béo phì' },
                        { term: 'osteoporosis', pronunciation: '/ˌɒstiəʊpəˈrəʊsɪs/', vietnamese: 'loãng xương' },
                        { term: 'arthritis', pronunciation: '/ɑːˈθraɪtɪs/', vietnamese: 'viêm khớp' },
                        { term: 'cholesterol', pronunciation: '/kəˈlestərɒl/', vietnamese: 'cholesterol' },
                        { term: 'blood pressure', pronunciation: '/blʌd ˈpreʃə(r)/', vietnamese: 'huyết áp' },
                        { term: 'immune system', pronunciation: '/ɪˈmjuːn ˈsɪstəm/', vietnamese: 'hệ miễn dịch' },
                        { term: 'mental health', pronunciation: '/ˈmentl helθ/', vietnamese: 'sức khỏe tinh thần' },
                        { term: 'well-being', pronunciation: '/ˌwel ˈbiːɪŋ/', vietnamese: 'sự khỏe mạnh, hạnh phúc' },
                        { term: 'vitality', pronunciation: '/vaɪˈtæləti/', vietnamese: 'sức sống, sinh lực' },
                        { term: 'resilience', pronunciation: '/rɪˈzɪliəns/', vietnamese: 'khả năng phục hồi, sức chịu đựng' },
                        { term: 'endurance', pronunciation: '/ɪnˈdjʊərəns/', vietnamese: 'sức bền, khả năng chịu đựng' }
                    ],
                    grammar: [
                        {
                            title: { en: 'Strong and Weak Forms of Auxiliary Verbs', vi: 'Hình thức mạnh và yếu của động từ hỗ trợ' },
                            explanation: {
                                en: [
                                    'Strong forms (stressed): Used when auxiliary verbs are emphasized or at the end of sentences',
                                    'Examples: "I DO want to exercise." / "Have you SEEN this doctor?" / "She CAN run 5km."',
                                    'Weak forms (unstressed): Used in normal speech when auxiliaries are not emphasized',
                                    'Examples: "I /də/ want to exercise." / "Have you /əv/ seen this doctor?" / "She /kən/ run 5km."',
                                    'Note: Weak forms are common in connected speech and help natural pronunciation'
                                ],
                                vi: [
                                    'Hình thức mạnh (nhấn mạnh): Được dùng khi động từ hỗ trợ được nhấn mạnh hoặc ở cuối câu',
                                    'Ví dụ: "I DO want to exercise." / "Have you SEEN this doctor?" / "She CAN run 5km."',
                                    'Hình thức yếu (không nhấn mạnh): Được dùng trong lời nói bình thường khi trợ từ không được nhấn mạnh',
                                    'Ví dụ: "I /də/ want to exercise." / "Have you /əv/ seen this doctor?" / "She /kən/ run 5km."',
                                    'Lưu ý: Hình thức yếu phổ biến trong lời nói liên tục và giúp phát âm tự nhiên'
                                ]
                            }
                        },
                        {
                            title: { en: 'Past Simple vs. Present Perfect for Health Experiences', vi: 'Quá khứ đơn vs. Hiện tại hoàn thành cho trải nghiệm sức khỏe' },
                            explanation: {
                                en: [
                                    'Past Simple: Used for completed actions at a specific time in the past',
                                    'Examples: "I broke my arm last year." / "She had the flu in January." / "They visited the doctor yesterday."',
                                    'Present Perfect: Used for experiences that happened at an unspecified time, or have relevance to the present',
                                    'Examples: "I\'ve broken my arm twice." / "She\'s had the flu several times." / "They\'ve visited many doctors."',
                                    'Time expressions: Past Simple (yesterday, last week, in 2020) vs. Present Perfect (ever, never, since, for, just, already, yet)'
                                ],
                                vi: [
                                    'Quá khứ đơn: Dùng cho hành động hoàn thành tại thời điểm cụ thể trong quá khứ',
                                    'Ví dụ: "I broke my arm last year." / "She had the flu in January." / "They visited the doctor yesterday."',
                                    'Hiện tại hoàn thành: Dùng cho trải nghiệm xảy ra tại thời điểm không xác định, hoặc có liên quan đến hiện tại',
                                    'Ví dụ: "I\'ve broken my arm twice." / "She\'s had the flu several times." / "They\'ve visited many doctors."',
                                    'Trạng từ thời gian: Quá khứ đơn (yesterday, last week, in 2020) vs. Hiện tại hoàn thành (ever, never, since, for, just, already, yet)'
                                ]
                            }
                        }
                    ],
                    activities: [
                        {
                            type: 'Pronunciation Practice',
                            description: {
                                en: [
                                    'Listen and practice strong forms: "I DO exercise regularly." / "She CAN eat healthy food." / "They HAVE improved their fitness."',
                                    'Listen and practice weak forms: "I /də/ exercise regularly." / "She /kən/ eat healthy food." / "They /əv/ improved their fitness."',
                                    'Practice in sentences: "I /də/ want to live a long life, so I /əv/ started exercising."',
                                    'Record and compare: Say the same sentence with strong and weak forms'
                                ],
                                vi: [
                                    'Nghe và thực hành hình thức mạnh: "I DO exercise regularly." / "She CAN eat healthy food." / "They HAVE improved their fitness."',
                                    'Nghe và thực hành hình thức yếu: "I /də/ exercise regularly." / "She /kən/ eat healthy food." / "They /əv/ improved their fitness."',
                                    'Thực hành trong câu: "I /də/ want to live a long life, so I /əv/ started exercising."',
                                    'Ghi âm và so sánh: Nói cùng một câu với hình thức mạnh và yếu'
                                ]
                            }
                        },
                        {
                            type: 'Vocabulary Exercises',
                            description: {
                                en: [
                                    'Match medical conditions with their descriptions',
                                    'Complete a health questionnaire using new vocabulary',
                                    'Word formation: Create adjectives from nouns (health → healthy, vitality → vital)',
                                    'Discussion: Which health conditions are most common in your family? Use present perfect to describe experiences.'
                                ],
                                vi: [
                                    'Nối các tình trạng bệnh lý với mô tả của chúng',
                                    'Hoàn thành bảng câu hỏi sức khỏe sử dụng từ vựng mới',
                                    'Tạo từ: Tạo tính từ từ danh từ (health → healthy, vitality → vital)',
                                    'Thảo luận: Tình trạng sức khỏe nào phổ biến nhất trong gia đình bạn? Sử dụng hiện tại hoàn thành để mô tả trải nghiệm.'
                                ]
                            }
                        },
                        {
                            type: 'Grammar Practice',
                            description: {
                                en: [
                                    'Exercise 1: Choose past simple or present perfect for health sentences',
                                    'Exercise 2: Complete conversations about health history using correct tenses',
                                    'Exercise 3: Write about your health experiences: "I\'ve had... but I\'ve never..."',
                                    'Exercise 4: Interview a partner about their health habits and experiences'
                                ],
                                vi: [
                                    'Bài tập 1: Chọn quá khứ đơn hoặc hiện tại hoàn thành cho các câu về sức khỏe',
                                    'Bài tập 2: Hoàn thành các cuộc trò chuyện về lịch sử sức khỏe sử dụng thì đúng',
                                    'Bài tập 3: Viết về trải nghiệm sức khỏe của bạn: "I\'ve had... but I\'ve never..."',
                                    'Bài tập 4: Phỏng vấn bạn cùng lớp về thói quen và trải nghiệm sức khỏe của họ'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Reading: Secrets of Longevity', vi: 'Đọc: Bí quyết trường thọ' },
                    aims: {
                        en: [
                            'Read and comprehend an article about factors contributing to a long life',
                            'Practice reading strategies: skimming for main ideas and scanning for specific information',
                            'Identify supporting evidence and examples in health-related texts',
                            'Evaluate the credibility and practicality of health advice from different sources'
                        ],
                        vi: [
                            'Đọc và hiểu bài viết về các yếu tố góp phần vào cuộc sống lâu dài',
                            'Thực hành chiến lược đọc: đọc lướt để tìm ý chính và đọc quét để tìm thông tin cụ thể',
                            'Xác định bằng chứng hỗ trợ và ví dụ trong văn bản liên quan đến sức khỏe',
                            'Đánh giá tính thuyết phục và tính thực tế của lời khuyên sức khỏe từ các nguồn khác nhau'
                        ]
                    },
                    vocabulary: [
                        { term: 'centenarian', pronunciation: '/ˌsentɪˈneəriən/', vietnamese: 'người sống trên 100 tuổi' },
                        { term: 'lifespan', pronunciation: '/ˈlaɪfspæn/', vietnamese: 'tuổi thọ, thời gian sống' },
                        { term: 'heredity', pronunciation: '/hɪˈredəti/', vietnamese: 'di truyền' },
                        { term: 'caloric restriction', pronunciation: '/kəˈlɒrɪk rɪˈstrɪkʃn/', vietnamese: 'hạn chế calo' },
                        { term: 'antioxidant', pronunciation: '/ˌæntiˈɒksɪdənt/', vietnamese: 'chất chống oxy hóa' },
                        { term: 'inflammation', pronunciation: '/ˌɪnfləˈmeɪʃn/', vietnamese: 'viêm' },
                        { term: 'cognitive function', pronunciation: '/ˈkɒɡnətɪv ˈfʌŋkʃn/', vietnamese: 'chức năng nhận thức' },
                        { term: 'social connection', pronunciation: '/ˈsəʊʃl kəˈnekʃn/', vietnamese: 'mối quan hệ xã hội' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Pre-Reading',
                            description: {
                                en: [
                                    'Look at the title and photos: What do you think the article will discuss?',
                                    'Brainstorm: What factors do you think contribute to living a long, healthy life?',
                                    'Predict: Which factor do you think is most important: diet, exercise, genetics, or lifestyle?',
                                    'Vocabulary preview: Match words with their definitions before reading'
                                ],
                                vi: [
                                    'Nhìn vào tiêu đề và hình ảnh: Bạn nghĩ bài viết sẽ thảo luận điều gì?',
                                    'Động não: Bạn nghĩ những yếu tố nào góp phần vào cuộc sống lâu dài, khỏe mạnh?',
                                    'Dự đoán: Bạn nghĩ yếu tố nào quan trọng nhất: chế độ ăn, tập thể dục, di truyền, hay lối sống?',
                                    'Xem trước từ vựng: Nối các từ với định nghĩa của chúng trước khi đọc'
                                ]
                            }
                        },
                        {
                            type: 'While-Reading',
                            description: {
                                en: [
                                    'Skim the article: Identify the main factors for longevity mentioned',
                                    'Scan for details: Find specific examples of centenarians and their habits',
                                    'Read for comprehension: Answer multiple-choice and True/False questions',
                                    'Vocabulary in context: Find words in the text that mean the same as given definitions',
                                    'Text structure: Identify how the article is organized (introduction, main factors, conclusion)'
                                ],
                                vi: [
                                    'Đọc lướt bài viết: Xác định các yếu tố chính cho tuổi thọ được đề cập',
                                    'Quét tìm chi tiết: Tìm các ví dụ cụ thể về người sống trên 100 tuổi và thói quen của họ',
                                    'Đọc để hiểu: Trả lời câu hỏi trắc nghiệm và Đúng/Sai',
                                    'Từ vựng trong ngữ cảnh: Tìm từ trong bài có nghĩa giống với định nghĩa đã cho',
                                    'Cấu trúc bài viết: Xác định cách bài viết được tổ chức (giới thiệu, yếu tố chính, kết luận)'
                                ]
                            }
                        },
                        {
                            type: 'Post-Reading',
                            description: {
                                en: [
                                    'Discussion: Which longevity factor surprised you most? Why?',
                                    'Critical thinking: Do you agree with all the advice in the article? What would you add?',
                                    'Application: Choose one piece of advice from the article and explain how you could apply it to your life',
                                    'Extension: Research one additional factor for longevity not mentioned in the article'
                                ],
                                vi: [
                                    'Thảo luận: Yếu tố tuổi thọ nào làm bạn ngạc nhiên nhất? Tại sao?',
                                    'Tư duy phê phán: Bạn có đồng ý với tất cả lời khuyên trong bài viết không? Bạn sẽ thêm gì?',
                                    'Ứng dụng: Chọn một lời khuyên từ bài viết và giải thích cách bạn có thể áp dụng nó vào cuộc sống của mình',
                                    'Mở rộng: Nghiên cứu một yếu tố bổ sung cho tuổi thọ không được đề cập trong bài viết'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Speaking: Giving Health Advice and Instructions', vi: 'Nói: Đưa ra lời khuyên sức khỏe và hướng dẫn' },
                    aims: {
                        en: [
                            'Practice giving clear instructions for exercise routines and healthy habits',
                            'Use appropriate language for offering help and responding to health concerns',
                            'Express concern and provide supportive advice in health-related conversations',
                            'Develop fluency in discussing personal health goals and challenges'
                        ],
                        vi: [
                            'Thực hành đưa ra hướng dẫn rõ ràng cho thói quen tập luyện và thói quen lành mạnh',
                            'Sử dụng ngôn ngữ phù hợp để đề nghị giúp đỡ và đáp lại mối quan tâm về sức khỏe',
                            'Bày tỏ sự quan tâm và cung cấp lời khuyên hỗ trợ trong các cuộc trò chuyện liên quan đến sức khỏe',
                            'Phát triển sự trôi chảy khi thảo luận về mục tiêu và thách thức sức khỏe cá nhân'
                        ]
                    },
                    vocabulary: [
                        { term: 'First, ... Then, ... Next, ... Finally, ...', pronunciation: '', vietnamese: 'Đầu tiên, ... Sau đó, ... Tiếp theo, ... Cuối cùng, ...' },
                        { term: 'Would you like some advice?', pronunciation: '', vietnamese: 'Bạn có muốn một số lời khuyên không?' },
                        { term: 'I recommend that you...', pronunciation: '', vietnamese: 'Tôi khuyên bạn nên...' },
                        { term: 'You should try...', pronunciation: '', vietnamese: 'Bạn nên thử...' },
                        { term: 'Have you considered...?', pronunciation: '', vietnamese: 'Bạn đã cân nhắc... chưa?' },
                        { term: 'That\'s a good idea, but...', pronunciation: '', vietnamese: 'Đó là ý hay, nhưng...' },
                        { term: 'I\'m concerned about...', pronunciation: '', vietnamese: 'Tôi lo lắng về...' },
                        { term: 'How can I help you?', pronunciation: '', vietnamese: 'Tôi có thể giúp bạn như thế nào?' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Useful Expressions',
                            description: {
                                en: [
                                    'Learn sequencing words: First, then, next, after that, finally',
                                    'Learn phrases for giving advice: I suggest..., You should..., Why don\'t you..., Have you tried...',
                                    'Learn phrases for offering help: Can I help you with..., Would you like me to..., Let me assist you with...',
                                    'Learn phrases for showing concern: I\'m worried about..., Are you feeling okay?, Is everything alright?'
                                ],
                                vi: [
                                    'Học từ nối trình tự: First, then, next, after that, finally',
                                    'Học cụm từ đưa ra lời khuyên: I suggest..., You should..., Why don\'t you..., Have you tried...',
                                    'Học cụm từ đề nghị giúp đỡ: Can I help you with..., Would you like me to..., Let me assist you with...',
                                    'Học cụm từ thể hiện sự quan tâm: I\'m worried about..., Are you feeling okay?, Is everything alright?'
                                ]
                            }
                        },
                        {
                            type: 'Controlled Practice',
                            description: {
                                en: [
                                    'Task 1: Put instructions for a simple exercise routine in the correct order',
                                    'Task 2: Complete dialogues where friends give health advice to each other',
                                    'Task 3: Match health problems with appropriate advice and instructions',
                                    'Task 4: Role-play short conversations offering help with health issues'
                                ],
                                vi: [
                                    'Bài tập 1: Sắp xếp hướng dẫn cho một thói quen tập luyện đơn giản theo thứ tự đúng',
                                    'Bài tập 2: Hoàn thành các đoạn hội thoại nơi bạn bè đưa ra lời khuyên sức khỏe cho nhau',
                                    'Bài tập 3: Nối vấn đề sức khỏe với lời khuyên và hướng dẫn phù hợp',
                                    'Bài tập 4: Đóng vai các cuộc trò chuyện ngắn đề nghị giúp đỡ với vấn đề sức khỏe'
                                ]
                            }
                        },
                        {
                            type: 'Freer Practice',
                            description: {
                                en: [
                                    'Pair work: Student A has a health concern (stress, poor diet, lack of exercise). Student B gives advice and detailed instructions.',
                                    'Group activity: Create a "Health Advice Clinic" - each person presents a health issue, group members give advice and instructions.',
                                    'Role-play: You are a fitness trainer giving instructions for a workout routine. Your partner is a beginner who needs clear, step-by-step guidance.',
                                    'Debate: "Should people follow strict health regimens to live longer, or is moderate healthy living enough?"'
                                ],
                                vi: [
                                    'Làm việc theo cặp: Học sinh A có mối quan tâm về sức khỏe (căng thẳng, chế độ ăn kém, thiếu tập thể dục). Học sinh B đưa ra lời khuyên và hướng dẫn chi tiết.',
                                    'Hoạt động nhóm: Tạo "Phòng khám lời khuyên sức khỏe" - mỗi người trình bày vấn đề sức khỏe, các thành viên nhóm đưa ra lời khuyên và hướng dẫn.',
                                    'Đóng vai: Bạn là huấn luyện viên thể dục đưa ra hướng dẫn cho thói quen tập luyện. Bạn cùng lớp là người mới bắt đầu cần hướng dẫn rõ ràng từng bước.',
                                    'Tranh luận: "Mọi người có nên tuân theo chế độ sức khỏe nghiêm ngặt để sống lâu hơn không, hay lối sống lành mạnh vừa phải là đủ?"'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Listening: Health Talk Show Discussion', vi: 'Nghe: Thảo luận chương trình nói chuyện về sức khỏe' },
                    aims: {
                        en: [
                            'Listen for main ideas and specific information in a health talk show discussion',
                            'Practice note-taking skills while listening to complex health information',
                            'Understand different perspectives on health and longevity from experts and guests',
                            'Recognize discourse markers and transitions in spoken academic/health discussions'
                        ],
                        vi: [
                            'Nghe để tìm ý chính và thông tin cụ thể trong cuộc thảo luận chương trình nói chuyện về sức khỏe',
                            'Thực hành kỹ năng ghi chú khi nghe thông tin sức khỏe phức tạp',
                            'Hiểu các quan điểm khác nhau về sức khỏe và tuổi thọ từ chuyên gia và khách mời',
                            'Nhận biết các từ đánh dấu diễn ngôn và chuyển tiếp trong các cuộc thảo luận nói về học thuật/sức khỏe'
                        ]
                    },
                    vocabulary: [
                        { term: 'gerontology', pronunciation: '/ˌdʒerɒnˈtɒlədʒi/', vietnamese: 'nghiên cứu về lão hóa' },
                        { term: 'epidemiology', pronunciation: '/ˌepɪˌdiːmiˈɒlədʒi/', vietnamese: 'dịch tễ học' },
                        { term: 'metabolism', pronunciation: '/məˈtæbəlɪzəm/', vietnamese: 'chuyển hóa' },
                        { term: 'hormone', pronunciation: '/ˈhɔːməʊn/', vietnamese: 'hormone' },
                        { term: 'enzyme', pronunciation: '/ˈenzaɪm/', vietnamese: 'enzyme' },
                        { term: 'cellular level', pronunciation: '/ˈseljələ(r) ˈlevl/', vietnamese: 'cấp độ tế bào' },
                        { term: 'biological clock', pronunciation: '/baɪəˈlɒdʒɪkl klɒk/', vietnamese: 'đồng hồ sinh học' },
                        { term: 'telomere', pronunciation: '/ˈteləʊmɪə(r)/', vietnamese: 'telomere' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Pre-Listening',
                            description: {
                                en: [
                                    'Discuss: What topics do you expect to hear in a health talk show?',
                                    'Vocabulary preview: Learn key scientific terms that might appear',
                                    'Prediction: Look at the guest list (doctor, nutritionist, fitness expert). What will each person talk about?',
                                    'Set a listening goal: "I want to learn 3 new facts about healthy aging."'
                                ],
                                vi: [
                                    'Thảo luận: Bạn mong đợi nghe những chủ đề gì trong chương trình nói chuyện về sức khỏe?',
                                    'Xem trước từ vựng: Học các thuật ngữ khoa học chính có thể xuất hiện',
                                    'Dự đoán: Nhìn vào danh sách khách mời (bác sĩ, chuyên gia dinh dưỡng, chuyên gia thể dục). Mỗi người sẽ nói về điều gì?',
                                    'Đặt mục tiêu nghe: "Tôi muốn học 3 sự thật mới về việc lão hóa khỏe mạnh."'
                                ]
                            }
                        },
                        {
                            type: 'While-Listening',
                            description: {
                                en: [
                                    'First listening: Identify the main topic and who the speakers are',
                                    'Second listening: Complete notes on each expert\'s main points about longevity',
                                    'Third listening: Listen for specific scientific terms and their explanations',
                                    'Gap-fill: Complete a summary of the discussion with missing information',
                                    'Multiple choice: Answer questions about detailed information and opinions expressed'
                                ],
                                vi: [
                                    'Nghe lần 1: Xác định chủ đề chính và người nói là ai',
                                    'Nghe lần 2: Hoàn thành ghi chú về điểm chính của từng chuyên gia về tuổi thọ',
                                    'Nghe lần 3: Nghe để tìm các thuật ngữ khoa học cụ thể và giải thích của chúng',
                                    'Điền từ: Hoàn thành bản tóm tắt cuộc thảo luận với thông tin còn thiếu',
                                    'Trắc nghiệm: Trả lời câu hỏi về thông tin chi tiết và ý kiến được bày tỏ'
                                ]
                            }
                        },
                        {
                            type: 'Post-Listening',
                            description: {
                                en: [
                                    'Compare answers and discuss any difficult parts',
                                    'Discussion: Which expert\'s advice did you find most convincing? Why?',
                                    'Critical thinking: Did all experts agree on the factors for longevity? What were the differences?',
                                    'Application: Choose one piece of scientific information from the talk and explain how it affects your health habits'
                                ],
                                vi: [
                                    'So sánh câu trả lời và thảo luận về bất kỳ phần khó nào',
                                    'Thảo luận: Lời khuyên của chuyên gia nào bạn thấy thuyết phục nhất? Tại sao?',
                                    'Tư duy phê phán: Tất cả chuyên gia có đồng ý về các yếu tố cho tuổi thọ không? Sự khác biệt là gì?',
                                    'Ứng dụng: Chọn một thông tin khoa học từ bài nói và giải thích cách nó ảnh hưởng đến thói quen sức khỏe của bạn'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Writing: A Short Health Message', vi: 'Viết: Tin nhắn sức khỏe ngắn' },
                    aims: {
                        en: [
                            'Learn the structure and features of a short, informal health message',
                            'Practice writing clear instructions and advice in a concise format',
                            'Use appropriate tone and language for health-related communication',
                            'Apply present perfect and other relevant tenses in health contexts'
                        ],
                        vi: [
                            'Học cấu trúc và đặc điểm của tin nhắn sức khỏe ngắn, không trang trọng',
                            'Thực hành viết hướng dẫn và lời khuyên rõ ràng theo định dạng ngắn gọn',
                            'Sử dụng giọng điệu và ngôn ngữ phù hợp cho giao tiếp liên quan đến sức khỏe',
                            'Áp dụng thì hiện tại hoàn thành và các thì liên quan khác trong ngữ cảnh sức khỏe'
                        ]
                    },
                    vocabulary: [
                        { term: 'Hi/Hey/Dear [Name]', pronunciation: '', vietnamese: 'Xin chào/Kính gửi [Tên]' },
                        { term: 'I hope you\'re feeling better.', pronunciation: '', vietnamese: 'Tôi hy vọng bạn cảm thấy khá hơn.' },
                        { term: 'Take care of yourself.', pronunciation: '', vietnamese: 'Hãy chăm sóc bản thân.' },
                        { term: 'Get well soon!', pronunciation: '', vietnamese: 'Chúc chóng khỏe!' },
                        { term: 'Let me know if you need anything.', pronunciation: '', vietnamese: 'Hãy cho tôi biết nếu bạn cần gì.' },
                        { term: 'I\'m concerned about...', pronunciation: '', vietnamese: 'Tôi lo lắng về...' },
                        { term: 'You should...', pronunciation: '', vietnamese: 'Bạn nên...' },
                        { term: 'Have you tried...?', pronunciation: '', vietnamese: 'Bạn đã thử... chưa?' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Model Analysis',
                            description: {
                                en: [
                                    'Read a model health message between friends',
                                    'Identify the structure: Greeting → Concern/Question → Advice/Information → Closing',
                                    'Notice the informal, friendly tone and use of contractions',
                                    'Analyze: How does the writer show care while giving practical health advice?',
                                    'Compare: How is this different from a formal health letter or email?'
                                ],
                                vi: [
                                    'Đọc một mẫu tin nhắn sức khỏe giữa bạn bè',
                                    'Xác định cấu trúc: Lời chào → Sự quan tâm/Câu hỏi → Lời khuyên/Thông tin → Lời kết',
                                    'Chú ý giọng điệu thân mật, thân thiện và việc sử dụng dạng rút gọn',
                                    'Phân tích: Người viết thể hiện sự quan tâm như thế nào trong khi đưa ra lời khuyên sức khỏe thực tế?',
                                    'So sánh: Điều này khác với thư hoặc email sức khỏe trang trọng như thế nào?'
                                ]
                            }
                        },
                        {
                            type: 'Pre-Writing',
                            description: {
                                en: [
                                    'Choose a scenario: Write to a friend who is stressed/overweight/feeling tired',
                                    'Brainstorm content: What concern will you express? What advice will you give?',
                                    'Organize your message: Greeting (Hi...), Body (concern + advice), Closing (Take care...)',
                                    'Language check: List useful phrases and make sure you use the right tone'
                                ],
                                vi: [
                                    'Chọn tình huống: Viết cho một người bạn đang căng thẳng/thừa cân/cảm thấy mệt mỏi',
                                    'Động não nội dung: Bạn sẽ bày tỏ mối quan tâm gì? Bạn sẽ đưa ra lời khuyên gì?',
                                    'Tổ chức tin nhắn: Lời chào (Hi...), Thân bài (quan tâm + lời khuyên), Lời kết (Take care...)',
                                    'Kiểm tra ngôn ngữ: Liệt kê các cụm từ hữu ích và đảm bảo sử dụng giọng điệu đúng'
                                ]
                            }
                        },
                        {
                            type: 'While-Writing',
                            description: {
                                en: [
                                    'Write your first draft (80-100 words) following the structure',
                                    'Include: A greeting, expression of concern, 2-3 pieces of practical advice, a closing',
                                    'Use present perfect for experiences: "Have you tried yoga?" "I\'ve found that..."',
                                    'Make it personal and caring, but not bossy or judgmental'
                                ],
                                vi: [
                                    'Viết bản nháp đầu tiên (80-100 từ) theo cấu trúc',
                                    'Bao gồm: Lời chào, bày tỏ sự quan tâm, 2-3 lời khuyên thực tế, lời kết',
                                    'Sử dụng hiện tại hoàn thành cho trải nghiệm: "Have you tried yoga?" "I\'ve found that..."',
                                    'Làm cho nó cá nhân và quan tâm, nhưng không ra lệnh hoặc phán xét'
                                ]
                            }
                        },
                        {
                            type: 'Post-Writing & Peer Editing',
                            description: {
                                en: [
                                    'Exchange messages with a partner',
                                    'Check: Is the tone friendly and concerned? Is the advice practical? Is the structure clear?',
                                    'Give feedback: What works well? What could be improved?',
                                    'Revise your message based on feedback',
                                    'Final version: Write neatly and check for grammar/spelling'
                                ],
                                vi: [
                                    'Trao đổi tin nhắn với bạn cùng lớp',
                                    'Kiểm tra: Giọng điệu có thân thiện và quan tâm không? Lời khuyên có thực tế không? Cấu trúc có rõ ràng không?',
                                    'Đưa ra phản hồi: Điều gì hoạt động tốt? Điều gì có thể cải thiện?',
                                    'Sửa lại tin nhắn của bạn dựa trên phản hồi',
                                    'Phiên bản cuối: Viết sạch sẽ và kiểm tra ngữ pháp/chính tả'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Culture/CLIL: Bacteria and Viruses', vi: 'Văn hóa/CLIL: Vi khuẩn và virus' },
                    aims: {
                        en: [
                            'Learn about bacteria and viruses and their role in health and disease',
                            'Understand basic microbiology concepts related to immunity and infection',
                            'Explore how cultural practices affect health outcomes',
                            'Connect scientific knowledge with real-world health applications'
                        ],
                        vi: [
                            'Tìm hiểu về vi khuẩn và virus và vai trò của chúng trong sức khỏe và bệnh tật',
                            'Hiểu các khái niệm vi sinh cơ bản liên quan đến miễn dịch và nhiễm trùng',
                            'Khám phá cách các thực hành văn hóa ảnh hưởng đến kết quả sức khỏe',
                            'Kết nối kiến thức khoa học với ứng dụng sức khỏe thực tế'
                        ]
                    },
                    vocabulary: [
                        { term: 'bacteria', pronunciation: '/bækˈtɪəriə/', vietnamese: 'vi khuẩn' },
                        { term: 'virus', pronunciation: '/ˈvaɪərəs/', vietnamese: 'virus' },
                        { term: 'pathogen', pronunciation: '/ˈpæθədʒən/', vietnamese: 'tác nhân gây bệnh' },
                        { term: 'infection', pronunciation: '/ɪnˈfekʃn/', vietnamese: 'nhiễm trùng' },
                        { term: 'immunity', pronunciation: '/ɪˈmjuːnəti/', vietnamese: 'miễn dịch' },
                        { term: 'vaccine', pronunciation: '/vækˈsiːn/', vietnamese: 'vắc xin' },
                        { term: 'antibiotic', pronunciation: '/ˌæntibaɪˈɒtɪk/', vietnamese: 'kháng sinh' },
                        { term: 'hygiene', pronunciation: '/ˈhaɪdʒiːn/', vietnamese: 'vệ sinh' },
                        { term: 'sanitation', pronunciation: '/ˌsænɪˈteɪʃn/', vietnamese: 'vệ sinh môi trường' },
                        { term: 'microorganism', pronunciation: '/ˌmaɪkrəʊˈɔːɡənɪzəm/', vietnamese: 'vi sinh vật' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Scientific Reading',
                            description: {
                                en: [
                                    'Read a simplified explanation of bacteria vs. viruses',
                                    'Complete a comparison chart: Bacteria (cell structure, reproduction, treatment) vs. Viruses (cell structure, reproduction, treatment)',
                                    'Answer: How do vaccines work? What is the difference between bacteria and viruses?',
                                    'Discussion: Why is hand washing important for preventing infections?'
                                ],
                                vi: [
                                    'Đọc giải thích đơn giản về vi khuẩn vs. virus',
                                    'Hoàn thành biểu đồ so sánh: Vi khuẩn (cấu trúc tế bào, sinh sản, điều trị) vs. Virus (cấu trúc tế bào, sinh sản, điều trị)',
                                    'Trả lời: Vắc xin hoạt động như thế nào? Sự khác biệt giữa vi khuẩn và virus là gì?',
                                    'Thảo luận: Tại sao rửa tay quan trọng để ngăn ngừa nhiễm trùng?'
                                ]
                            }
                        },
                        {
                            type: 'Cultural Connections',
                            description: {
                                en: [
                                    'Research: How do different cultures approach health and illness?',
                                    'Compare: Traditional Vietnamese remedies vs. modern medical approaches',
                                    'Discuss: How do cultural beliefs affect health-seeking behavior?',
                                    'Present: Create a poster showing "Health Beliefs Around the World"'
                                ],
                                vi: [
                                    'Nghiên cứu: Các nền văn hóa khác nhau tiếp cận sức khỏe và bệnh tật như thế nào?',
                                    'So sánh: Bài thuốc truyền thống Việt Nam vs. cách tiếp cận y học hiện đại',
                                    'Thảo luận: Niềm tin văn hóa ảnh hưởng đến hành vi tìm kiếm sức khỏe như thế nào?',
                                    'Trình bày: Tạo áp phích cho thấy "Niềm tin về sức khỏe trên thế giới"'
                                ]
                            }
                        },
                        {
                            type: 'Practical Application',
                            description: {
                                en: [
                                    'Design a public health campaign about hygiene in your school',
                                    'Create an infographic about "Building Strong Immunity"',
                                    'Role-play: You are a health educator explaining vaccination to parents',
                                    'Debate: "Should antibiotics be available without prescription?"'
                                ],
                                vi: [
                                    'Thiết kế chiến dịch sức khỏe cộng đồng về vệ sinh trong trường học của bạn',
                                    'Tạo biểu đồ thông tin về "Xây dựng hệ miễn dịch mạnh mẽ"',
                                    'Đóng vai: Bạn là nhà giáo dục sức khỏe giải thích việc tiêm chủng cho phụ huynh',
                                    'Tranh luận: "Kháng sinh có nên có sẵn mà không cần đơn không?"'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Project: Healthy Living Poster', vi: 'Dự án: Áp phích sống khỏe mạnh' },
                    aims: {
                        en: [
                            'Apply knowledge of health and longevity to create an informative poster',
                            'Practice research, design, and presentation skills',
                            'Communicate health information effectively to peers',
                            'Reflect on personal health habits and goal-setting'
                        ],
                        vi: [
                            'Áp dụng kiến thức về sức khỏe và tuổi thọ để tạo áp phích thông tin',
                            'Thực hành kỹ năng nghiên cứu, thiết kế và trình bày',
                            'Truyền đạt thông tin sức khỏe hiệu quả đến bạn bè',
                            'Suy ngẫm về thói quen sức khỏe cá nhân và đặt mục tiêu'
                        ]
                    },
                    vocabulary: [],
                    grammar: [],
                    activities: [
                        {
                            type: 'Planning Phase',
                            description: {
                                en: [
                                    'Choose a health topic: nutrition, exercise, stress management, sleep, or preventive care',
                                    'Research: Find 5-7 reliable facts or tips about your chosen topic',
                                    'Design: Sketch your poster layout (title, images, key points, contact info)',
                                    'Content: Write clear, concise bullet points with practical advice'
                                ],
                                vi: [
                                    'Chọn chủ đề sức khỏe: dinh dưỡng, tập thể dục, quản lý căng thẳng, giấc ngủ, hoặc chăm sóc phòng ngừa',
                                    'Nghiên cứu: Tìm 5-7 sự thật hoặc mẹo đáng tin cậy về chủ đề bạn chọn',
                                    'Thiết kế: Phác thảo bố cục áp phích (tiêu đề, hình ảnh, điểm chính, thông tin liên hệ)',
                                    'Nội dung: Viết các điểm rõ ràng, ngắn gọn với lời khuyên thực tế'
                                ]
                            }
                        },
                        {
                            type: 'Creation Phase',
                            description: {
                                en: [
                                    'Gather materials: Poster board, markers, printed images, magazines for cutouts',
                                    'Create your poster: Use color, images, and clear fonts to make it attractive',
                                    'Include: Title, 3-5 key health tips, images or diagrams, your name and class',
                                    'Proofread: Check for spelling, grammar, and clarity of information'
                                ],
                                vi: [
                                    'Thu thập vật liệu: Bảng áp phích, bút dạ, hình ảnh in, tạp chí để cắt dán',
                                    'Tạo áp phích của bạn: Sử dụng màu sắc, hình ảnh và phông chữ rõ ràng để làm cho nó hấp dẫn',
                                    'Bao gồm: Tiêu đề, 3-5 mẹo sức khỏe chính, hình ảnh hoặc sơ đồ, tên và lớp của bạn',
                                    'Đọc kỹ: Kiểm tra chính tả, ngữ pháp và tính rõ ràng của thông tin'
                                ]
                            }
                        },
                        {
                            type: 'Presentation Phase',
                            description: {
                                en: [
                                    'Present your poster to the class (1-2 minutes per student)',
                                    'Explain: What you learned, why this health topic is important, how others can apply the advice',
                                    'Answer questions from classmates about your poster content',
                                    'Vote for the most informative and creative posters'
                                ],
                                vi: [
                                    'Trình bày áp phích của bạn trước lớp (1-2 phút mỗi học sinh)',
                                    'Giải thích: Điều bạn học được, tại sao chủ đề sức khỏe này quan trọng, người khác có thể áp dụng lời khuyên như thế nào',
                                    'Trả lời câu hỏi từ bạn cùng lớp về nội dung áp phích của bạn',
                                    'Bỏ phiếu cho các áp phích thông tin nhất và sáng tạo nhất'
                                ]
                            }
                        },
                        {
                            type: 'Reflection Phase',
                            description: {
                                en: [
                                    'Self-assessment: What did you learn about your health topic? What skills did you practice?',
                                    'Personal application: Which tip from your poster will you try to implement?',
                                    'Peer feedback: What did you like about other posters? What could be improved?',
                                    'Goal setting: Write one health goal for the next month based on your project'
                                ],
                                vi: [
                                    'Tự đánh giá: Bạn học được gì về chủ đề sức khỏe của mình? Bạn thực hành kỹ năng gì?',
                                    'Ứng dụng cá nhân: Mẹo nào từ áp phích của bạn mà bạn sẽ cố gắng thực hiện?',
                                    'Phản hồi từ bạn: Điều gì bạn thích ở áp phích của người khác? Điều gì có thể cải thiện?',
                                    'Đặt mục tiêu: Viết một mục tiêu sức khỏe cho tháng tới dựa trên dự án của bạn'
                                ]
                            }
                        }
                    ]
                }
            ]
        )
        },
        {
            id: 1102,
            title: { en: 'The Generation Gap', vi: 'Khoảng cách thế hệ' },
            lessons: [createLessonForUnit(1102,
                { en: 'The Generation Gap', vi: 'Khoảng cách thế hệ' },
                {
                    pronunciation: { en: 'Contracted forms', vi: 'Hình thức rút gọn' },
                    vocabulary: { en: 'Words and phrases related to generational differences', vi: 'Từ và cụm từ liên quan đến sự khác biệt thế hệ' },
                    grammar: { en: 'Modal verbs: must, have to and should', vi: 'Động từ khuyết thiếu: must, have to và should' },
                    reading: { en: 'Reading for main ideas and specific information in an article about different generations', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về các thế hệ khác nhau' },
                    speaking: { en: 'Talking about the differences of a family', vi: 'Nói về sự khác biệt trong một gia đình' },
                    listening: { en: 'Listening for specific information in a conversation about family conflicts', vi: 'Nghe để tìm thông tin cụ thể trong cuộc trò chuyện về mâu thuẫn gia đình' },
                    writing: { en: 'Writing an opinion essay about limiting screen time', vi: 'Viết một bài luận ý kiến về việc giới hạn thời gian sử dụng màn hình' },
                    everydayEnglish: { en: 'Asking for and giving permission', vi: 'Đề nghị và cho phép' },
                    cultureClil: { en: 'The generation gap in Asian American families', vi: 'Khoảng cách thế hệ trong các gia đình người Mỹ gốc Á' },
                    project: { en: 'Carrying out a survey to find out generational differences', vi: 'Thực hiện một cuộc khảo sát để tìm hiểu sự khác biệt thế hệ' }
                }
            )],
        },
        {
            id: 1103,
            title: { en: 'Cities of the Future', vi: 'Thành phố của tương lai' },
            lessons: [createLessonForUnit(1103,
                { en: 'Cities of the Future', vi: 'Thành phố của tương lai' },
                {
                    pronunciation: { en: 'Linking final consonants to initial vowels', vi: 'Kết nối phụ âm cuối với nguyên âm đầu' },
                    vocabulary: { en: 'Words and phrases related to smart cities and smart living', vi: 'Từ và cụm từ liên quan đến thành phố thông minh và cuộc sống thông minh' },
                    grammar: { en: 'Stative verbs in the continuous form', vi: 'Động từ trạng thái ở dạng tiếp diễn' },
                    reading: { en: 'Reading for specific information in an article about the characteristics of future cities', vi: 'Đọc để tìm thông tin cụ thể trong bài viết về đặc điểm của thành phố tương lai' },
                    speaking: { en: 'Discussing cities; keeping a conversation going by asking Wh-questions', vi: 'Thảo luận về thành phố; duy trì cuộc trò chuyện bằng cách đặt câu hỏi Wh' },
                    listening: { en: 'Listening for main ideas and specific information in an interview about the disadvantages of living in a smart city', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong một cuộc phỏng vấn về nhược điểm của việc sống trong thành phố thông minh' },
                    writing: { en: 'Writing an article about the advantages and disadvantages of living in a smart city', vi: 'Viết một bài báo về ưu và nhược điểm của việc sống trong thành phố thông minh' },
                    everydayEnglish: { en: 'Expressing uncertainty', vi: 'Thể hiện sự không chắc chắn' },
                    cultureClil: { en: 'Cities around the world', vi: 'Các thành phố trên thế giới' },
                    project: { en: 'Designing a poster of the ideal city of the future', vi: 'Thiết kế một áp phích về thành phố lý tưởng trong tương lai' }
                }
            )],
        },
        {
            id: 1104,
            title: { en: 'ASEAN and Viet Nam', vi: 'ASEAN và Việt Nam' },
            lessons: [createLessonForUnit(1104,
                { en: 'ASEAN and Viet Nam', vi: 'ASEAN và Việt Nam' },
                {
                    pronunciation: { en: 'Elision of vowels', vi: 'Sự lược bỏ nguyên âm' },
                    vocabulary: { en: 'Words and phrases related to ASEAN', vi: 'Từ và cụm từ liên quan đến ASEAN' },
                    grammar: { en: 'Gerunds as subjects and objects', vi: 'Gerund làm chủ ngữ và tân ngữ' },
                    reading: { en: 'Reading for main ideas and specific information in news items about ASEAN countries', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong các tin tức về các nước ASEAN' },
                    speaking: { en: 'Discussing and giving opinions about the ASEAN Youth Programme', vi: 'Thảo luận và đưa ra ý kiến về Chương trình Thanh niên ASEAN' },
                    listening: { en: 'Listening for main ideas and specific information in a conversation about an ASEAN school tour', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong cuộc trò chuyện về một chuyến tham quan trường học ASEAN' },
                    writing: { en: 'Writing a proposal for a welcome event', vi: 'Viết một đề xuất cho sự kiện chào mừng' },
                    everydayEnglish: { en: 'Giving and responding to compliments', vi: 'Đưa ra và phản hồi lời khen ngợi' },
                    cultureClil: { 'en': 'Year Festivals in ASEAN', vi: 'Lễ hội Năm Mới ở ASEAN' },
                    project: { en: 'Doing research about an ASEAN member', vi: 'Thực hiện nghiên cứu về một thành viên ASEAN' }
                }
            )],
        },
        {
            id: 1105,
            title: { en: 'Global Warming', vi: 'Sự nóng lên toàn cầu' },
            lessons: [createLessonForUnit(1105,
                { en: 'Global Warming', vi: 'Sự nóng lên toàn cầu' },
                {
                    pronunciation: { en: 'Sentence stress and rhythm', vi: 'Trọng âm câu và nhịp điệu' },
                    vocabulary: { en: 'Words and phrases related to global warming', vi: 'Từ và cụm từ liên quan đến sự nóng lên toàn cầu' },
                    grammar: { en: 'Present participle clauses', vi: 'Mệnh đề hiện tại phân từ' },
                    reading: { en: 'Reading for main ideas and specific information in an article about the UN Climate Change Conference', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về Hội nghị Biến đổi Khí hậu của Liên Hợp Quốc' },
                    speaking: { en: 'Talking about human activities warming the planet; presenting ideas clearly in a discussion', vi: 'Nói về các hoạt động của con người làm nóng hành tinh; trình bày ý kiến rõ ràng trong một cuộc thảo luận' },
                    listening: { en: 'Listening for main ideas and specific information in a talk about the impact of global warming on ecosystems', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong bài nói về tác động của sự nóng lên toàn cầu lên các hệ sinh thái' },
                    writing: { en: 'Writing a leaflet to persuade people to reduce carbon emissions', vi: 'Viết một tờ rơi để thuyết phục mọi người giảm phát thải carbon' },
                    everydayEnglish: { en: 'Giving and responding to warnings', vi: 'Đưa ra và phản hồi lời cảnh báo' },
                    cultureClil: { en: 'Reducing the impact of global warming', vi: 'Giảm tác động của sự nóng lên toàn cầu' },
                    project: { en: 'Carrying out a survey to find out how local people try to limit global warming', vi: 'Thực hiện một cuộc khảo sát để tìm hiểu cách người dân địa phương cố gắng hạn chế sự nóng lên toàn cầu' }
                }
            )],
        },
        {
            id: 1106,
            title: { en: 'Preserving Our Heritage', vi: 'Bảo tồn di sản của chúng ta' },
            lessons: [createLessonForUnit(1106,
                { en: 'Preserving Our Heritage', vi: 'Bảo tồn di sản của chúng ta' },
                {
                    pronunciation: { en: 'Intonation in statements, commands, and lists', vi: 'Trợ âm trong câu trần thuật, mệnh lệnh và danh sách' },
                    vocabulary: { en: 'Words and phrases related to preserving heritage', vi: 'Từ và cụm từ liên quan đến việc bảo tồn di sản' },
                    grammar: { en: 'To-infinitive clauses', vi: 'Mệnh đề to-infinitive' },
                    reading: { en: 'Reading for main ideas and specific information in an article about competition', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về cạnh tranh' },
                    speaking: { en: 'Discussing ways to preserve cultural heritage; keeping a conversation going by showing interest and encouragement', vi: 'Thảo luận về cách bảo tồn di sản văn hóa; duy trì cuộc trò chuyện bằng cách thể hiện sự quan tâm và khuyến khích' },
                    listening: { en: 'Listening for main ideas and specific information in a talk about a local landscape', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong bài nói về một cảnh quan địa phương' },
                    writing: { en: 'Writing a leaflet to inform people about ways to preserve heritage', vi: 'Viết một tờ rơi để thông tin cho mọi người về cách bảo tồn di sản' },
                    everydayEnglish: { en: 'Giving directions', vi: 'Hướng dẫn' },
                    cultureClil: { en: 'Landscape types around the world', vi: 'Các loại cảnh quan trên thế giới' },
                    project: { en: 'Proposing ways to preserve a type of heritage', vi: 'Đề xuất cách bảo tồn một loại di sản' }
                }
            )],
        },
        {
            id: 1107,
            title: { en: 'Education Options for School-Leavers', vi: 'Lựa chọn giáo dục cho học sinh tốt nghiệp' },
            lessons: [createLessonForUnit(1107,
                { en: 'Education Options for School-Leavers', vi: 'Lựa chọn giáo dục cho học sinh tốt nghiệp' },
                {
                    pronunciation: { en: 'Intonation in Wh- and Yes/No questions', vi: 'Trợ âm trong câu hỏi Wh- và Yes/No' },
                    vocabulary: { en: 'Words and phrases related to education after leaving school', vi: 'Từ và cụm từ liên quan đến giáo dục sau khi tốt nghiệp' },
                    grammar: { en: 'Perfect gerunds and participle clauses', vi: 'Gerund hoàn thành và mệnh đề phân từ hoàn thành' },
                    reading: { en: 'Reading for main ideas and specific information in an article about different study options after leaving school', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về các lựa chọn học tập khác nhau sau khi tốt nghiệp' },
                    speaking: { en: 'Discussing the benefits of vocational training and academic study; keeping a conversation or discussion going', vi: 'Thảo luận về lợi ích của đào tạo nghề và học thuật; duy trì cuộc trò chuyện hoặc thảo luận' },
                    listening: { en: 'Listening for main ideas and specific information in a talk about courses available at a vocational school', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong bài nói về các khóa học có sẵn tại một trường dạy nghề' },
                    writing: { en: 'Writing a request letter to ask for information about vocational courses', vi: 'Viết một thư yêu cầu thông tin về các khóa học dạy nghề' },
                    everydayEnglish: { en: 'Making an appointment', vi: 'Đặt lịch hẹn' },
                    cultureClil: { en: 'UK education after secondary school', vi: 'Giáo dục Anh sau trung học' },
                    project: { en: 'Doing research on an educational institution', vi: 'Thực hiện nghiên cứu về một cơ sở giáo dục' }
                }
            )],
        },
        {
            id: 1108,
            title: { en: 'Becoming Independent', vi: 'Trở nên độc lập' },
            lessons: [createLessonForUnit(1108,
                { en: 'Becoming Independent', vi: 'Trở nên độc lập' },
                {
                    pronunciation: { en: 'Intonation in invitations, suggestions, and polite requests', vi: 'Trợ âm trong lời mời, gợi ý và yêu cầu lịch sự' },
                    vocabulary: { en: 'Words and phrases related to teen independence', vi: 'Từ và cụm từ liên quan đến sự độc lập của thanh thiếu niên' },
                    grammar: { en: 'Cleft sentences with it/What/..., that/who...', vi: 'Câu chẻ với it/What/..., that/who...' },
                    reading: { en: 'Reading for main ideas and specific information in an article about how teens can become independent', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về cách thanh thiếu niên có thể trở nên độc lập' },
                    speaking: { en: 'Giving detailed instructions on learning basic life skills; using sequencing words when giving instructions', vi: 'Hướng dẫn chi tiết về cách học các kỹ năng sống cơ bản; sử dụng từ nối khi đưa ra hướng dẫn' },
                    listening: { en: 'Listening for main ideas and specific information in a conversation about becoming independent learners', vi: 'Nghe để tìm ý chính và thông tin cụ thể trong cuộc trò chuyện về việc trở thành người học độc lập' },
                    writing: { en: 'Writing an article about the pros and cons of self-study', vi: 'Viết một bài báo về ưu và nhược điểm của việc tự học' },
                    everydayEnglish: { en: 'Expressing best wishes and responding', vi: 'Thể hiện lời chúc tốt đẹp và phản hồi' },
                    cultureClil: { en: 'Teen independence in the US', vi: 'Sự độc lập của thanh thiếu niên ở Mỹ' },
                    project: { en: 'Creating a detailed plan to develop a life skill', vi: 'Tạo một kế hoạch chi tiết để phát triển một kỹ năng sống' }
                }
            )],
        },
        {
            id: 1109,
            title: { en: 'Social Issues', vi: 'Các vấn đề xã hội' },
            lessons: [createLessonForUnit(1109,
                { en: 'Social Issues', vi: 'Các vấn đề xã hội' },
                {
                    pronunciation: { en: 'Intonation in choice questions', vi: 'Trợ âm trong câu hỏi lựa chọn' },
                    vocabulary: { en: 'Words and phrases related to social issues', vi: 'Từ và cụm từ liên quan đến các vấn đề xã hội' },
                    grammar: { en: 'Linking words and phrases', vi: 'Từ và cụm từ nối' },
                    reading: { en: 'Reading for main ideas and specific information in an article about peer pressure', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về áp lực đồng trang lứa' },
                    speaking: { en: 'Talking about experiences of peer pressure and responding to situations', vi: 'Nói về trải nghiệm áp lực đồng trang lứa và phản hồi các tình huống' },
                    listening: { en: 'Listening for specific information in a conversation about types of bullying', vi: 'Nghe để tìm thông tin cụ thể trong cuộc trò chuyện về các loại bắt nạt' },
                    writing: { en: 'Writing a proposal for a school campaign against cyberbullying', vi: 'Viết một đề xuất cho chiến dịch trường học chống bắt nạt qua mạng' },
                    everydayEnglish: { en: 'Expressing disappointment and sympathy', vi: 'Thể hiện sự thất vọng và đồng cảm' },
                    cultureClil: { en: 'Facing teens in the US today', vi: 'Đối mặt với thanh thiếu niên ở Mỹ ngày nay' },
                    project: { en: 'Planning an awareness campaign about a social issue', vi: 'Lập kế hoạch cho chiến dịch nâng cao nhận thức về một vấn đề xã hội' }
                }
            )],
        },
        {
            id: 1110,
            title: { en: 'The Ecosystem', vi: 'Hệ sinh thái' },
            lessons: [createLessonForUnit(1110,
                { en: 'The Ecosystem', vi: 'Hệ sinh thái' },
                {
                    pronunciation: { en: 'Intonation in question tags', vi: 'Trợ âm trong câu hỏi đuôi' },
                    vocabulary: { en: 'Words and phrases related to ecosystems', vi: 'Từ và cụm từ liên quan đến hệ sinh thái' },
                    grammar: { en: 'Compound nouns', vi: 'Danh từ ghép' },
                    reading: { en: 'Reading for main ideas and specific information in an article about a national park', vi: 'Đọc để tìm ý chính và thông tin cụ thể trong bài viết về một công viên quốc gia' },
                    speaking: { en: 'Talking about ways to protect local biodiversity and situations that may harm the environment', vi: 'Nói về cách bảo vệ đa dạng sinh học địa phương và các tình huống có thể gây hại cho môi trường' },
                    listening: { en: 'Listening for specific information in a talk about the impact of global warming on ecosystems', vi: 'Nghe để tìm thông tin cụ thể trong bài nói về tác động của sự nóng lên toàn cầu lên các hệ sinh thái' },
                    writing: { en: 'Writing an essay about spending money on restoring local ecosystems', vi: 'Viết một bài luận về việc chi tiêu tiền để phục hồi các hệ sinh thái địa phương' },
                    everydayEnglish: { en: 'Expressing likes and dislikes', vi: 'Thể hiện sở thích và không thích' },
                    cultureClil: { en: 'Protecting the ecosystem around the world', vi: 'Bảo vệ hệ sinh thái trên thế giới' },
                    project: { en: 'Making a poster about a local ecosystem and how to restore/protect it', vi: 'Làm một áp phích về hệ sinh thái địa phương và cách khôi phục/bảo vệ nó' }
                }
            )],
        }
    ],
    reviews: [
        {
            id: 1101,
            title: { en: 'Review 1 (Units 1-2)', vi: 'Ôn tập 1 (Bài 1-2)' },
            lessons: [],
            pageRange: { en: '38-41', vi: '38-41' }
        },
        {
            id: 1102,
            title: { en: 'Review 2 (Units 3-5)', vi: 'Ôn tập 2 (Bài 3-5)' },
            lessons: [],
            pageRange: { en: '62-65', vi: '62-65' }
        },
        {
            id: 1103,
            title: { en: 'Review 3 (Units 6-7)', vi: 'Ôn tập 3 (Bài 6-7)' },
            lessons: [],
            pageRange: { en: '96-99', vi: '96-99' }
        },
        {
            id: 1104,
            title: { en: 'Review 4 (Units 8-10)', vi: 'Ôn tập 4 (Bài 8-10)' },
            lessons: [],
            pageRange: { en: '120-123', vi: '120-123' }
        }
    ],
    glossary: {
        title: { en: 'Glossary', vi: 'Từ điển' },
        pageRange: { en: '124', vi: '124' }
    }
};