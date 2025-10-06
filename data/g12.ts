
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
function createLesson(summary: any): CurriculumLesson {
    const { id, vocabulary = [], grammar = [], activities = [], ...rest } = summary;

    const formattedVocabulary: VocabularyItem[] = vocabulary.map((term: string) => ({
        term: term,
        pronunciation: '',
        vietnamese: '', // Placeholder, as this data is missing
    }));

    const formattedGrammar: GrammarPoint[] = grammar.map((title: string) => ({
        title: { en: title, vi: title },
        explanation: { en: [], vi: [] },
    }));

    const formattedActivities: Activity[] = activities.map((activity: { en: string, vi: string }) => {
        const [typeEn, ...descEnParts] = activity.en.split(': ');
        const [typeVi, ...descViParts] = activity.vi.split(': ');
        return {
            type: typeEn || 'Activity',
            description: {
                en: [descEnParts.join(': ')],
                vi: [descViParts.join(': ') || descEnParts.join(': ')],
            },
        };
    });

    return {
        ...rest,
        id,
        vocabulary: formattedVocabulary,
        grammar: formattedGrammar,
        activities: formattedActivities,
    };
}


export const g12Data: CurriculumLevel = {
    level: 12,
    title: { en: 'Grade 12', vi: 'Lớp 12' },
    subtitle: { en: 'Global Success', vi: 'Tiếng Anh 12 - Global Success' },
    ebookPdfUrl: 'https://drive.google.com/file/d/14ZDrFOzmaXGjgZXC-GI7ChzduQhkTdVn/view?usp=drive_link',
    units: [
        {
            id: 1201,
            title: { en: 'Life Stories We Admire', vi: 'Những câu chuyện cuộc đời đáng ngưỡng mộ' },
            lessons: createDetailedLessonsForUnit(1201, [
                {
                    title: { en: 'Getting Started: Inspirational Lives', vi: 'Bắt đầu: Những cuộc đời truyền cảm hứng' },
                    aims: {
                        en: [
                            'Introduce vocabulary related to biographies, achievements, and inspirational life stories',
                            'Discuss what makes a life story admirable and worthy of admiration',
                            'Practice expressing opinions about role models and life choices',
                            'Raise awareness about the impact of personal stories on society and individuals'
                        ],
                        vi: [
                            'Giới thiệu từ vựng liên quan đến tiểu sử, thành tựu và câu chuyện cuộc đời truyền cảm hứng',
                            'Thảo luận về điều gì làm cho câu chuyện cuộc đời đáng ngưỡng mộ và xứng đáng được ngưỡng mộ',
                            'Thực hành bày tỏ ý kiến về các tấm gương và lựa chọn cuộc sống',
                            'Nâng cao nhận thức về tác động của câu chuyện cá nhân đối với xã hội và cá nhân'
                        ]
                    },
                    vocabulary: [
                        { term: 'biography', pronunciation: '/baɪˈɒɡrəfi/', vietnamese: 'tiểu sử, tiểu sử' },
                        { term: 'achievement', pronunciation: '/əˈtʃiːvmənt/', vietnamese: 'thành tựu, thành tích' },
                        { term: 'inspiration', pronunciation: '/ˌɪnspəˈreɪʃn/', vietnamese: 'sự truyền cảm hứng' },
                        { term: 'role model', pronunciation: '/rəʊl ˈmɒdl/', vietnamese: 'tấm gương, hình mẫu' },
                        { term: 'legacy', pronunciation: '/ˈleɡəsi/', vietnamese: 'di sản, di sản' },
                        { term: 'overcome', pronunciation: '/ˌəʊvəˈkʌm/', vietnamese: 'vượt qua, chiến thắng' },
                        { term: 'perseverance', pronunciation: '/ˌpɜːsɪˈvɪərəns/', vietnamese: 'sự kiên trì, bền bỉ' },
                        { term: 'resilience', pronunciation: '/rɪˈzɪliəns/', vietnamese: 'sự phục hồi, kiên cường' },
                        { term: 'milestone', pronunciation: '/ˈmaɪlstəʊn/', vietnamese: 'cột mốc, dấu mốc quan trọng' },
                        { term: 'pioneer', pronunciation: '/ˌpaɪəˈnɪə(r)/', vietnamese: 'người tiên phong' },
                        { term: 'visionary', pronunciation: '/ˈvɪʒənri/', vietnamese: 'nhà tiên tri, có tầm nhìn' },
                        { term: 'humanitarian', pronunciation: '/hjuːˌmænɪˈteəriən/', vietnamese: 'nhân đạo, từ thiện' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Warm-up Discussion',
                            description: {
                                en: [
                                    'Look at photos of famous inspirational figures from different fields (science, arts, sports, humanitarian work)',
                                    'Discuss: What qualities do you admire most in people? Why do we admire certain life stories?',
                                    'Share: Who is your personal hero/role model? What about their life inspires you?',
                                    'Group activity: Create a "Qualities We Admire" word cloud and rank them by importance'
                                ],
                                vi: [
                                    'Nhìn vào ảnh của các nhân vật nổi tiếng truyền cảm hứng từ các lĩnh vực khác nhau (khoa học, nghệ thuật, thể thao, công tác nhân đạo)',
                                    'Thảo luận: Bạn ngưỡng mộ những phẩm chất nào nhất ở con người? Tại sao chúng ta ngưỡng mộ những câu chuyện cuộc đời nhất định?',
                                    'Chia sẻ: Ai là người anh hùng/tấm gương cá nhân của bạn? Điều gì trong cuộc đời họ truyền cảm hứng cho bạn?',
                                    'Hoạt động nhóm: Tạo đám mây từ "Những phẩm chất chúng ta ngưỡng mộ" và xếp hạng chúng theo mức độ quan trọng'
                                ]
                            }
                        },
                        {
                            type: 'Listen and Read',
                            description: {
                                en: [
                                    'Listen to a short biography of Nelson Mandela and identify key achievements',
                                    'Read along and note the challenges he overcame and his philosophy of life',
                                    'Answer: How did Mandela\'s early life shape his later achievements?',
                                    'Discuss: What lessons can we learn from Mandela\'s life story?'
                                ],
                                vi: [
                                    'Nghe tiểu sử ngắn về Nelson Mandela và xác định các thành tựu chính',
                                    'Đọc theo và ghi chú những thách thức ông vượt qua và triết lý cuộc sống của ông',
                                    'Trả lời: Cuộc sống ban đầu của Mandela đã định hình thành tựu sau này của ông như thế nào?',
                                    'Thảo luận: Chúng ta có thể học được bài học gì từ câu chuyện cuộc đời của Mandela?'
                                ]
                            }
                        },
                        {
                            type: 'Vocabulary Practice',
                            description: {
                                en: [
                                    'Match inspirational figures with their achievements and qualities',
                                    'Complete sentences about admirable life stories using new vocabulary',
                                    'Categorize words: Personal qualities / Achievements / Life challenges',
                                    'Create a timeline: "Key Milestones in an Inspirational Life" using 10 vocabulary words'
                                ],
                                vi: [
                                    'Nối các nhân vật truyền cảm hứng với thành tựu và phẩm chất của họ',
                                    'Hoàn thành câu về những câu chuyện cuộc đời đáng ngưỡng mộ sử dụng từ vựng mới',
                                    'Phân loại từ: Phẩm chất cá nhân / Thành tựu / Thách thức cuộc sống',
                                    'Tạo dòng thời gian: "Các dấu mốc chính trong cuộc đời truyền cảm hứng" sử dụng 10 từ vựng'
                                ]
                            }
                        },
                        {
                            type: 'Group Project',
                            description: {
                                en: [
                                    'In groups of 4: Research a Vietnamese inspirational figure (e.g., Uncle Ho, Marie Curie, local hero)',
                                    'Create an "Inspirational Life Story" infographic with key facts, achievements, and lessons learned',
                                    'Present your figure to the class and explain why their story is admirable',
                                    'Vote for the most inspiring presentation and discuss what makes it compelling'
                                ],
                                vi: [
                                    'Theo nhóm 4 người: Nghiên cứu một nhân vật Việt Nam truyền cảm hứng (ví dụ: Bác Hồ, Marie Curie, anh hùng địa phương)',
                                    'Tạo biểu đồ thông tin "Câu chuyện cuộc đời truyền cảm hứng" với các sự thật chính, thành tựu và bài học rút ra',
                                    'Trình bày nhân vật của nhóm trước lớp và giải thích tại sao câu chuyện của họ đáng ngưỡng mộ',
                                    'Bỏ phiếu cho bài trình bày truyền cảm hứng nhất và thảo luận điều gì làm cho nó thuyết phục'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
                    aims: {
                        en: [
                            'Master the pronunciation of past simple and past continuous tenses',
                            'Expand vocabulary related to biographies, achievements, and life stories',
                            'Distinguish between past simple and past continuous in narrative contexts',
                            'Use both tenses correctly to describe life events and achievements'
                        ],
                        vi: [
                            'Nắm vững cách phát âm thì quá khứ đơn và quá khứ tiếp diễn',
                            'Mở rộng vốn từ vựng liên quan đến tiểu sử, thành tựu và câu chuyện cuộc sống',
                            'Phân biệt giữa quá khứ đơn và quá khứ tiếp diễn trong ngữ cảnh kể chuyện',
                            'Sử dụng cả hai thì một cách chính xác để mô tả các sự kiện cuộc sống và thành tựu'
                        ]
                    },
                    vocabulary: [
                        { term: 'autobiography', pronunciation: '/ˌɔːtəbaɪˈɒɡrəfi/', vietnamese: 'tự truyện' },
                        { term: 'memoir', pronunciation: '/ˈmemwɑː(r)/', vietnamese: 'hồi ký' },
                        { term: 'tribute', pronunciation: '/ˈtrɪbjuːt/', vietnamese: 'lời tri ân, sự tôn kính' },
                        { term: 'commemorate', pronunciation: '/kəˈmeməreɪt/', vietnamese: 'tưởng niệm, kỷ niệm' },
                        { term: 'accomplish', pronunciation: '/əˈkʌmplɪʃ/', vietnamese: 'hoàn thành, đạt được' },
                        { term: 'endeavor', pronunciation: '/ɪnˈdevə(r)/', vietnamese: 'nỗ lực, cố gắng' },
                        { term: 'aspiration', pronunciation: '/ˌæspəˈreɪʃn/', vietnamese: 'khát vọng, nguyện vọng' },
                        { term: 'determination', pronunciation: '/dɪˌtɜːmɪˈneɪʃn/', vietnamese: 'sự quyết tâm' },
                        { term: 'adversity', pronunciation: '/ədˈvɜːsəti/', vietnamese: 'khó khăn, nghịch cảnh' },
                        { term: 'triumph', pronunciation: '/ˈtraɪʌmf/', vietnamese: 'chiến thắng, thành công' },
                        { term: 'breakthrough', pronunciation: '/ˈbreɪkθruː/', vietnamese: 'khám phá quan trọng, đột phá' },
                        { term: 'contribution', pronunciation: '/ˌkɒntrɪˈbjuːʃn/', vietnamese: 'đóng góp' },
                        { term: 'influence', pronunciation: '/ˈɪnfluəns/', vietnamese: 'ảnh hưởng' },
                        { term: 'inspire', pronunciation: '/ɪnˈspaɪə(r)/', vietnamese: 'truyền cảm hứng' }
                    ],
                    grammar: [
                        {
                            title: { en: 'Past Simple vs. Past Continuous for Life Stories', vi: 'Quá khứ đơn vs. Quá khứ tiếp diễn cho câu chuyện cuộc đời' },
                            explanation: {
                                en: [
                                    'Past Simple: Used for completed actions at specific times in the past',
                                    'Examples: "Martin Luther King Jr. was born in 1929." / "He graduated from college in 1948." / "He delivered his famous speech in 1963."',
                                    'Past Continuous: Used for ongoing actions that were interrupted or happening at a specific time',
                                    'Examples: "He was studying at Boston University when he met Coretta." / "The civil rights movement was growing when he became its leader."',
                                    'In biographies: Past Simple for facts and achievements, Past Continuous for background context'
                                ],
                                vi: [
                                    'Quá khứ đơn: Dùng cho hành động hoàn thành tại thời điểm cụ thể trong quá khứ',
                                    'Ví dụ: "Martin Luther King Jr. was born in 1929." / "He graduated from college in 1948." / "He delivered his famous speech in 1963."',
                                    'Quá khứ tiếp diễn: Dùng cho hành động đang diễn ra bị gián đoạn hoặc đang xảy ra tại thời điểm cụ thể',
                                    'Ví dụ: "He was studying at Boston University when he met Coretta." / "The civil rights movement was growing when he became its leader."',
                                    'Trong tiểu sử: Quá khứ đơn cho sự thật và thành tựu, Quá khứ tiếp diễn cho ngữ cảnh nền'
                                ]
                            }
                        }
                    ],
                    activities: [
                        {
                            type: 'Pronunciation Practice',
                            description: {
                                en: [
                                    'Listen and practice past simple endings: worked /t/, studied /ɪd/, achieved /t/',
                                    'Listen and practice past continuous: "was working" /wɒz ˈwɜːkɪŋ/, "were studying" /wɜː(r) ˈstʌdiɪŋ/',
                                    'Practice in sentences: "While she was pursuing her dreams, she faced many challenges."',
                                    'Record and compare: Tell a short life story using both tenses'
                                ],
                                vi: [
                                    'Nghe và thực hành kết thúc quá khứ đơn: worked /t/, studied /ɪd/, achieved /t/',
                                    'Nghe và thực hành quá khứ tiếp diễn: "was working" /wɒz ˈwɜːkɪŋ/, "were studying" /wɜː(r) ˈstʌdiɪŋ/',
                                    'Thực hành trong câu: "While she was pursuing her dreams, she faced many challenges."',
                                    'Ghi âm và so sánh: Kể một câu chuyện cuộc đời ngắn sử dụng cả hai thì'
                                ]
                            }
                        },
                        {
                            type: 'Vocabulary Exercises',
                            description: {
                                en: [
                                    'Match achievements with the people who accomplished them',
                                    'Complete a timeline of an inspirational figure\'s life using new vocabulary',
                                    'Word formation: Create adjectives from nouns (achieve → achievable, inspire → inspiring)',
                                    'Discussion: Share a personal story of overcoming adversity using vocabulary from the lesson'
                                ],
                                vi: [
                                    'Nối thành tựu với những người đã đạt được chúng',
                                    'Hoàn thành dòng thời gian cuộc đời của một nhân vật truyền cảm hứng sử dụng từ vựng mới',
                                    'Tạo từ: Tạo tính từ từ danh từ (achieve → achievable, inspire → inspiring)',
                                    'Thảo luận: Chia sẻ câu chuyện cá nhân về việc vượt qua nghịch cảnh sử dụng từ vựng từ bài học'
                                ]
                            }
                        },
                        {
                            type: 'Grammar Practice',
                            description: {
                                en: [
                                    'Exercise 1: Choose past simple or past continuous for biography sentences',
                                    'Exercise 2: Complete the life story of Marie Curie using correct tenses',
                                    'Exercise 3: Write about your "hero\'s journey" using both past tenses',
                                    'Exercise 4: Interview a partner about their most admired person\'s life story'
                                ],
                                vi: [
                                    'Bài tập 1: Chọn quá khứ đơn hoặc quá khứ tiếp diễn cho các câu tiểu sử',
                                    'Bài tập 2: Hoàn thành câu chuyện cuộc đời của Marie Curie sử dụng thì đúng',
                                    'Bài tập 3: Viết về "hành trình của người anh hùng" của bạn sử dụng cả hai thì quá khứ',
                                    'Bài tập 4: Phỏng vấn bạn cùng lớp về câu chuyện cuộc đời của người họ ngưỡng mộ nhất'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Reading: The Life of a Visionary Leader', vi: 'Đọc: Cuộc đời của một nhà lãnh đạo có tầm nhìn' },
                    aims: {
                        en: [
                            'Read and comprehend a biography of a visionary leader',
                            'Practice reading strategies: identifying main ideas and supporting details',
                            'Analyze how personal challenges shaped leadership qualities',
                            'Evaluate the lasting impact of visionary leadership on society'
                        ],
                        vi: [
                            'Đọc và hiểu tiểu sử của một nhà lãnh đạo có tầm nhìn',
                            'Thực hành chiến lược đọc: xác định ý chính và chi tiết hỗ trợ',
                            'Phân tích cách thách thức cá nhân định hình phẩm chất lãnh đạo',
                            'Đánh giá tác động lâu dài của lãnh đạo có tầm nhìn đối với xã hội'
                        ]
                    },
                    vocabulary: [
                        { term: 'visionary', pronunciation: '/ˈvɪʒənri/', vietnamese: 'có tầm nhìn, tiên tri' },
                        { term: 'transformative', pronunciation: '/trænsˈfɔːmətɪv/', vietnamese: 'biến đổi, chuyển đổi' },
                        { term: 'charismatic', pronunciation: '/ˌkærɪzˈmætɪk/', vietnamese: 'có sức hút, quyến rũ' },
                        { term: 'revolutionary', pronunciation: '/ˌrevəˈluːʃənri/', vietnamese: 'cách mạng,革新' },
                        { term: 'advocate', pronunciation: '/ˈædvəkeɪt/', vietnamese: 'người ủng hộ, đấu tranh cho' },
                        { term: 'catalyst', pronunciation: '/ˈkætəlɪst/', vietnamese: 'chất xúc tác, người khởi xướng' },
                        { term: 'paradigm shift', pronunciation: '/ˈpærədaɪm ʃɪft/', vietnamese: 'sự thay đổi mô hình' },
                        { term: 'empower', pronunciation: '/ɪmˈpaʊə(r)/', vietnamese: 'trao quyền, tăng cường năng lực' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Pre-Reading',
                            description: {
                                en: [
                                    'Look at the title and photos: What qualities do you think a visionary leader has?',
                                    'Brainstorm: What challenges might visionary leaders face in their lifetimes?',
                                    'Predict: How might a leader\'s early life experiences shape their vision?',
                                    'Vocabulary preview: Match leadership terms with their definitions'
                                ],
                                vi: [
                                    'Nhìn vào tiêu đề và hình ảnh: Bạn nghĩ một nhà lãnh đạo có tầm nhìn có những phẩm chất gì?',
                                    'Động não: Những thách thức nào mà các nhà lãnh đạo có tầm nhìn có thể gặp phải trong cuộc đời?',
                                    'Dự đoán: Kinh nghiệm cuộc sống ban đầu của một nhà lãnh đạo có thể định hình tầm nhìn của họ như thế nào?',
                                    'Xem trước từ vựng: Nối các thuật ngữ lãnh đạo với định nghĩa của chúng'
                                ]
                            }
                        },
                        {
                            type: 'While-Reading',
                            description: {
                                en: [
                                    'Skim for main achievements: Identify 5-7 key accomplishments mentioned',
                                    'Scan for challenges: Find examples of obstacles the leader overcame',
                                    'Read for comprehension: Answer questions about leadership qualities and decisions',
                                    'Vocabulary in context: Find examples of visionary leadership in the text',
                                    'Text analysis: How does the biography structure information (chronological, thematic)?'
                                ],
                                vi: [
                                    'Đọc lướt để tìm thành tựu chính: Xác định 5-7 thành tựu chính được đề cập',
                                    'Quét tìm thách thức: Tìm ví dụ về những trở ngại nhà lãnh đạo vượt qua',
                                    'Đọc để hiểu: Trả lời câu hỏi về phẩm chất lãnh đạo và quyết định',
                                    'Từ vựng trong ngữ cảnh: Tìm ví dụ về lãnh đạo có tầm nhìn trong bài viết',
                                    'Phân tích bài viết: Tiểu sử cấu trúc thông tin như thế nào (theo trình tự thời gian, theo chủ đề)?'
                                ]
                            }
                        },
                        {
                            type: 'Post-Reading',
                            description: {
                                en: [
                                    'Discussion: Which leadership qualities from the biography do you most admire?',
                                    'Critical thinking: How did the leader\'s personal challenges contribute to their success?',
                                    'Application: Choose one leadership lesson from the biography and explain how it applies to your life',
                                    'Extension: Compare this leader with another visionary figure from a different culture'
                                ],
                                vi: [
                                    'Thảo luận: Bạn ngưỡng mộ nhất những phẩm chất lãnh đạo nào từ tiểu sử?',
                                    'Tư duy phê phán: Thách thức cá nhân của nhà lãnh đạo góp phần vào thành công của họ như thế nào?',
                                    'Ứng dụng: Chọn một bài học lãnh đạo từ tiểu sử và giải thích cách nó áp dụng vào cuộc sống của bạn',
                                    'Mở rộng: So sánh nhà lãnh đạo này với một nhân vật có tầm nhìn khác từ nền văn hóa khác'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Speaking: Sharing Life Stories', vi: 'Nói: Chia sẻ câu chuyện cuộc đời' },
                    aims: {
                        en: [
                            'Practice narrating life stories using appropriate sequencing and tenses',
                            'Use descriptive language to convey admiration and inspiration',
                            'Develop fluency in discussing achievements, challenges, and life lessons',
                            'Express opinions about what makes life stories worthy of admiration'
                        ],
                        vi: [
                            'Thực hành kể câu chuyện cuộc đời sử dụng trình tự và thì phù hợp',
                            'Sử dụng ngôn ngữ mô tả để truyền tải sự ngưỡng mộ và truyền cảm hứng',
                            'Phát triển sự trôi chảy khi thảo luận về thành tựu, thách thức và bài học cuộc sống',
                            'Bày tỏ ý kiến về điều gì làm cho câu chuyện cuộc đời xứng đáng được ngưỡng mộ'
                        ]
                    },
                    vocabulary: [
                        { term: 'First and foremost, ...', pronunciation: '', vietnamese: 'Trước hết, ...' },
                        { term: 'What\'s remarkable is that...', pronunciation: '', vietnamese: 'Điều đáng chú ý là...' },
                        { term: 'Despite facing..., they...', pronunciation: '', vietnamese: 'Mặc dù đối mặt với..., họ...' },
                        { term: 'This inspired me because...', pronunciation: '', vietnamese: 'Điều này truyền cảm hứng cho tôi vì...' },
                        { term: 'The turning point was when...', pronunciation: '', vietnamese: 'Điểm chuyển biến là khi...' },
                        { term: 'Ultimately, ...', pronunciation: '', vietnamese: 'Cuối cùng, ...' },
                        { term: 'I admire how...', pronunciation: '', vietnamese: 'Tôi ngưỡng mộ cách...' },
                        { term: 'Their legacy lives on through...', pronunciation: '', vietnamese: 'Di sản của họ tiếp tục tồn tại qua...' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Useful Expressions',
                            description: {
                                en: [
                                    'Learn sequencing phrases: First, then, after that, meanwhile, finally',
                                    'Learn expressions for admiration: I\'m inspired by..., What impresses me is..., Their courage shows that...',
                                    'Learn phrases for describing challenges: Despite difficulties..., In spite of obstacles..., Even though they faced...',
                                    'Learn phrases for impact: This changed..., Their influence led to..., As a result...'
                                ],
                                vi: [
                                    'Học cụm từ trình tự: First, then, after that, meanwhile, finally',
                                    'Học biểu thức ngưỡng mộ: I\'m inspired by..., What impresses me is..., Their courage shows that...',
                                    'Học cụm từ mô tả thách thức: Despite difficulties..., In spite of obstacles..., Even though they faced...',
                                    'Học cụm từ tác động: This changed..., Their influence led to..., As a result...'
                                ]
                            }
                        },
                        {
                            type: 'Controlled Practice',
                            description: {
                                en: [
                                    'Task 1: Put events from a famous person\'s life in chronological order',
                                    'Task 2: Complete dialogues about inspirational figures using sequencing phrases',
                                    'Task 3: Match challenges with appropriate expressions of admiration',
                                    'Task 4: Role-play sharing a life story excerpt with a partner'
                                ],
                                vi: [
                                    'Bài tập 1: Sắp xếp các sự kiện từ cuộc đời của một người nổi tiếng theo trình tự thời gian',
                                    'Bài tập 2: Hoàn thành đoạn hội thoại về các nhân vật truyền cảm hứng sử dụng cụm từ trình tự',
                                    'Bài tập 3: Nối thách thức với biểu thức ngưỡng mộ phù hợp',
                                    'Bài tập 4: Đóng vai chia sẻ đoạn trích câu chuyện cuộc đời với bạn cùng lớp'
                                ]
                            }
                        },
                        {
                            type: 'Freer Practice',
                            description: {
                                en: [
                                    'Pair work: Student A shares the life story of their hero, Student B asks follow-up questions and expresses admiration',
                                    'Group activity: "Life Story Circle" - Each person shares one inspirational moment from someone they admire',
                                    'Role-play: You are a biographer interviewing a visionary leader about their life journey',
                                    'Debate: "Are modern inspirational figures as admirable as historical ones? Why or why not?"'
                                ],
                                vi: [
                                    'Làm việc theo cặp: Học sinh A chia sẻ câu chuyện cuộc đời của người anh hùng của mình, Học sinh B đặt câu hỏi theo dõi và bày tỏ sự ngưỡng mộ',
                                    'Hoạt động nhóm: "Vòng tròn câu chuyện cuộc đời" - Mỗi người chia sẻ một khoảnh khắc truyền cảm hứng từ người họ ngưỡng mộ',
                                    'Đóng vai: Bạn là nhà viết tiểu sử phỏng vấn một nhà lãnh đạo có tầm nhìn về hành trình cuộc đời của họ',
                                    'Tranh luận: "Các nhân vật truyền cảm hứng hiện đại có đáng ngưỡng mộ bằng các nhân vật lịch sử không? Tại sao hoặc tại sao không?"'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Listening: An Inspiring Autobiography', vi: 'Nghe: Một tự truyện truyền cảm hứng' },
                    aims: {
                        en: [
                            'Listen for main ideas and specific details in an autobiographical narrative',
                            'Practice note-taking skills while listening to complex life stories',
                            'Understand the structure and features of spoken autobiography',
                            'Identify emotional language and rhetorical devices in inspirational storytelling'
                        ],
                        vi: [
                            'Nghe để tìm ý chính và chi tiết cụ thể trong kể chuyện tự truyện',
                            'Thực hành kỹ năng ghi chú khi nghe câu chuyện cuộc đời phức tạp',
                            'Hiểu cấu trúc và đặc điểm của tự truyện nói',
                            'Xác định ngôn ngữ cảm xúc và phương tiện tu từ trong kể chuyện truyền cảm hứng'
                        ]
                    },
                    vocabulary: [
                        { term: 'narrative', pronunciation: '/ˈnærətɪv/', vietnamese: 'kể chuyện, tường thuật' },
                        { term: 'retrospective', pronunciation: '/ˌretrəˈspektɪv/', vietnamese: 'hồi tưởng, nhìn lại' },
                        { term: 'reflection', pronunciation: '/rɪˈflekʃn/', vietnamese: 'suy ngẫm, phản ánh' },
                        { term: 'anecdote', pronunciation: '/ˈænɪkdəʊt/', vietnamese: 'chuyện tiếu lâm, giai thoại' },
                        { term: 'testimony', pronunciation: '/ˈtestɪməni/', vietnamese: 'lời chứng thực, lời khai' },
                        { term: 'revelation', pronunciation: '/ˌrevəˈleɪʃn/', vietnamese: 'sự tiết lộ, khám phá' },
                        { term: 'epiphany', pronunciation: '/ɪˈpɪfəni/', vietnamese: 'sự giác ngộ' },
                        { term: 'catharsis', pronunciation: '/kəˈθɑːsɪs/', vietnamese: 'sự thanh tẩy, giải tỏa' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Pre-Listening',
                            description: {
                                en: [
                                    'Discuss: What makes an autobiography different from a biography?',
                                    'Predict: What elements would you expect to hear in an inspiring life story?',
                                    'Vocabulary preview: Learn key terms related to autobiographical storytelling',
                                    'Set a listening goal: "I want to identify 3 turning points in the speaker\'s life."'
                                ],
                                vi: [
                                    'Thảo luận: Điều gì làm cho tự truyện khác với tiểu sử?',
                                    'Dự đoán: Bạn mong đợi nghe những yếu tố gì trong câu chuyện cuộc đời truyền cảm hứng?',
                                    'Xem trước từ vựng: Học các thuật ngữ chính liên quan đến kể chuyện tự truyện',
                                    'Đặt mục tiêu nghe: "Tôi muốn xác định 3 điểm chuyển biến trong cuộc đời của người nói."'
                                ]
                            }
                        },
                        {
                            type: 'While-Listening',
                            description: {
                                en: [
                                    'First listening: Identify the main stages of the speaker\'s life journey',
                                    'Second listening: Note specific achievements and challenges mentioned',
                                    'Third listening: Listen for emotional language and inspirational messages',
                                    'Gap-fill: Complete a timeline of key life events with missing information',
                                    'Multiple choice: Answer questions about the speaker\'s philosophy and motivations'
                                ],
                                vi: [
                                    'Nghe lần 1: Xác định các giai đoạn chính trong hành trình cuộc đời của người nói',
                                    'Nghe lần 2: Ghi chú các thành tựu và thách thức cụ thể được đề cập',
                                    'Nghe lần 3: Nghe để tìm ngôn ngữ cảm xúc và thông điệp truyền cảm hứng',
                                    'Điền từ: Hoàn thành dòng thời gian các sự kiện cuộc đời chính với thông tin còn thiếu',
                                    'Trắc nghiệm: Trả lời câu hỏi về triết lý và động lực của người nói'
                                ]
                            }
                        },
                        {
                            type: 'Post-Listening',
                            description: {
                                en: [
                                    'Compare notes and discuss any difficult parts of the listening',
                                    'Discussion: Which part of the autobiography did you find most inspiring? Why?',
                                    'Critical thinking: How does the speaker\'s personal story reflect broader social issues?',
                                    'Application: Choose one lesson from the autobiography and explain how it changed your perspective'
                                ],
                                vi: [
                                    'So sánh ghi chú và thảo luận về bất kỳ phần khó nào của việc nghe',
                                    'Thảo luận: Phần nào của tự truyện bạn thấy truyền cảm hứng nhất? Tại sao?',
                                    'Tư duy phê phán: Câu chuyện cá nhân của người nói phản ánh các vấn đề xã hội rộng lớn hơn như thế nào?',
                                    'Ứng dụng: Chọn một bài học từ tự truyện và giải thích cách nó thay đổi góc nhìn của bạn'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Writing: A Tribute to an Admirable Person', vi: 'Viết: Lời tri ân dành cho một người đáng ngưỡng mộ' },
                    aims: {
                        en: [
                            'Learn the structure and features of a tribute writing piece',
                            'Practice writing biographical information with admiration and respect',
                            'Use varied sentence structures and descriptive language effectively',
                            'Apply past tenses appropriately in biographical writing'
                        ],
                        vi: [
                            'Học cấu trúc và đặc điểm của một bài viết tri ân',
                            'Thực hành viết thông tin tiểu sử với sự ngưỡng mộ và tôn trọng',
                            'Sử dụng cấu trúc câu đa dạng và ngôn ngữ mô tả hiệu quả',
                            'Áp dụng thì quá khứ phù hợp trong viết tiểu sử'
                        ]
                    },
                    vocabulary: [
                        { term: 'Dear reader, ...', pronunciation: '', vietnamese: 'Kính thưa độc giả, ...' },
                        { term: 'It is with great admiration that...', pronunciation: '', vietnamese: 'Với sự ngưỡng mộ lớn lao mà...' },
                        { term: 'One cannot help but admire...', pronunciation: '', vietnamese: 'Người ta không thể không ngưỡng mộ...' },
                        { term: 'Their unwavering commitment to...', pronunciation: '', vietnamese: 'Sự cam kết không lay chuyển của họ đối với...' },
                        { term: 'In recognition of...', pronunciation: '', vietnamese: 'Để ghi nhận...' },
                        { term: 'Their legacy continues to inspire...', pronunciation: '', vietnamese: 'Di sản của họ tiếp tục truyền cảm hứng...' },
                        { term: 'May we all strive to emulate...', pronunciation: '', vietnamese: 'Cầu mong tất cả chúng ta đều cố gắng noi gương...' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Model Analysis',
                            description: {
                                en: [
                                    'Read a model tribute to a historical figure',
                                    'Identify the structure: Introduction (who and why admirable) → Body (achievements and qualities) → Conclusion (lasting impact)',
                                    'Notice formal, respectful tone and use of admiring language',
                                    'Analyze: How does the writer balance facts with emotional expression?',
                                    'Compare: How is this different from a newspaper obituary or biography?'
                                ],
                                vi: [
                                    'Đọc một mẫu tri ân dành cho một nhân vật lịch sử',
                                    'Xác định cấu trúc: Giới thiệu (ai và tại sao đáng ngưỡng mộ) → Thân bài (thành tựu và phẩm chất) → Kết luận (tác động lâu dài)',
                                    'Chú ý giọng điệu trang trọng, tôn trọng và việc sử dụng ngôn ngữ ngưỡng mộ',
                                    'Phân tích: Người viết cân bằng sự thật với biểu đạt cảm xúc như thế nào?',
                                    'So sánh: Điều này khác với cáo phó trên báo hoặc tiểu sử như thế nào?'
                                ]
                            }
                        },
                        {
                            type: 'Pre-Writing',
                            description: {
                                en: [
                                    'Choose a person you truly admire (family member, teacher, public figure)',
                                    'Brainstorm content: Key achievements, admirable qualities, life lessons, personal impact',
                                    'Organize your tribute: Opening admiration → Main accomplishments → Personal qualities → Lasting influence',
                                    'Language check: List admiring phrases and ensure appropriate level of formality'
                                ],
                                vi: [
                                    'Chọn một người bạn thực sự ngưỡng mộ (thành viên gia đình, giáo viên, nhân vật công chúng)',
                                    'Động não nội dung: Thành tựu chính, phẩm chất đáng ngưỡng mộ, bài học cuộc sống, tác động cá nhân',
                                    'Tổ chức lời tri ân: Mở đầu sự ngưỡng mộ → Thành tựu chính → Phẩm chất cá nhân → Ảnh hưởng lâu dài',
                                    'Kiểm tra ngôn ngữ: Liệt kê các cụm từ ngưỡng mộ và đảm bảo mức độ trang trọng phù hợp'
                                ]
                            }
                        },
                        {
                            type: 'While-Writing',
                            description: {
                                en: [
                                    'Write your first draft (200-250 words) following the tribute structure',
                                    'Include: 3-4 specific achievements, 2-3 admirable qualities, 1-2 life lessons',
                                    'Use past tenses for biographical facts and present for lasting impact',
                                    'Make it personal: Explain why this person\'s life story inspires you'
                                ],
                                vi: [
                                    'Viết bản nháp đầu tiên (200-250 từ) theo cấu trúc lời tri ân',
                                    'Bao gồm: 3-4 thành tựu cụ thể, 2-3 phẩm chất đáng ngưỡng mộ, 1-2 bài học cuộc sống',
                                    'Sử dụng thì quá khứ cho sự thật tiểu sử và hiện tại cho tác động lâu dài',
                                    'Làm cho nó cá nhân: Giải thích tại sao câu chuyện cuộc đời của người này truyền cảm hứng cho bạn'
                                ]
                            }
                        },
                        {
                            type: 'Post-Writing & Peer Editing',
                            description: {
                                en: [
                                    'Exchange tributes with a partner for feedback',
                                    'Check: Is the tone respectful and admiring? Are facts accurate? Is the structure clear?',
                                    'Give constructive feedback: What works well? What could be improved?',
                                    'Revise your tribute based on feedback, focusing on emotional impact',
                                    'Final version: Proofread carefully and ensure smooth flow of ideas'
                                ],
                                vi: [
                                    'Trao đổi lời tri ân với bạn cùng lớp để nhận phản hồi',
                                    'Kiểm tra: Giọng điệu có tôn trọng và ngưỡng mộ không? Sự thật có chính xác không? Cấu trúc có rõ ràng không?',
                                    'Đưa ra phản hồi mang tính xây dựng: Điều gì hoạt động tốt? Điều gì có thể cải thiện?',
                                    'Sửa lại lời tri ân của bạn dựa trên phản hồi, tập trung vào tác động cảm xúc',
                                    'Phiên bản cuối: Đọc kỹ và đảm bảo luồng ý tưởng mượt mà'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Culture/CLIL: Heroes and Legends', vi: 'Văn hóa/CLIL: Anh hùng và truyền thuyết' },
                    aims: {
                        en: [
                            'Explore cultural differences in defining and celebrating heroes',
                            'Understand how cultural values shape concepts of admirable life stories',
                            'Compare historical figures across different cultures and time periods',
                            'Connect cultural understanding with personal development and inspiration'
                        ],
                        vi: [
                            'Khám phá sự khác biệt văn hóa trong việc định nghĩa và tôn vinh anh hùng',
                            'Hiểu cách giá trị văn hóa định hình khái niệm về câu chuyện cuộc đời đáng ngưỡng mộ',
                            'So sánh các nhân vật lịch sử qua các nền văn hóa và thời kỳ khác nhau',
                            'Kết nối sự hiểu biết văn hóa với sự phát triển cá nhân và truyền cảm hứng'
                        ]
                    },
                    vocabulary: [
                        { term: 'mythology', pronunciation: '/mɪˈθɒlədʒi/', vietnamese: 'thần thoại học' },
                        { term: 'folklore', pronunciation: '/ˈfəʊklɔː(r)/', vietnamese: 'dân gian học' },
                        { term: 'epic', pronunciation: '/ˈepɪk/', vietnamese: 'thi ca sử thi' },
                        { term: 'legend', pronunciation: '/ˈledʒənd/', vietnamese: 'truyền thuyết' },
                        { term: 'saga', pronunciation: '/ˈsɑːɡə/', vietnamese: 'truyện dài, sử thi' },
                        { term: 'archetype', pronunciation: '/ˈɑːkɪtaɪp/', vietnamese: 'nguyên mẫu' },
                        { term: 'cultural icon', pronunciation: '/ˈkʌltʃərəl ˈaɪkɒn/', vietnamese: 'biểu tượng văn hóa' },
                        { term: 'national hero', pronunciation: '/ˈnæʃənl ˈhɪərəʊ/', vietnamese: 'anh hùng dân tộc' }
                    ],
                    grammar: [],
                    activities: [
                        {
                            type: 'Cultural Exploration',
                            description: {
                                en: [
                                    'Research heroes from different cultures: King Arthur (British), Guan Yu (Chinese), Joan of Arc (French)',
                                    'Compare hero qualities: What traits are universal? What are culture-specific?',
                                    'Discuss: How do cultural values influence what society considers "heroic"?',
                                    'Present: Create a "Global Heroes Gallery" comparing figures from 3 different cultures'
                                ],
                                vi: [
                                    'Nghiên cứu anh hùng từ các nền văn hóa khác nhau: Vua Arthur (Anh), Quan Vũ (Trung Quốc), Joan of Arc (Pháp)',
                                    'So sánh phẩm chất anh hùng: Những đặc điểm nào là phổ quát? Những đặc điểm nào đặc trưng cho văn hóa?',
                                    'Thảo luận: Giá trị văn hóa ảnh hưởng đến việc xã hội coi điều gì là "hào hùng" như thế nào?',
                                    'Trình bày: Tạo "Phòng trưng bày anh hùng toàn cầu" so sánh các nhân vật từ 3 nền văn hóa khác nhau'
                                ]
                            }
                        },
                        {
                            type: 'Myth vs. Reality',
                            description: {
                                en: [
                                    'Compare legendary heroes with real historical figures',
                                    'Analyze: How do myths exaggerate real achievements? What lessons do they teach?',
                                    'Debate: Are modern celebrities "heroes" in the same way as historical figures?',
                                    'Create: Design a modern legend about a contemporary inspirational person'
                                ],
                                vi: [
                                    'So sánh anh hùng trong truyền thuyết với các nhân vật lịch sử thực',
                                    'Phân tích: Truyền thuyết phóng đại thành tựu thực như thế nào? Chúng dạy bài học gì?',
                                    'Tranh luận: Các ngôi sao hiện đại có phải là "anh hùng" giống như các nhân vật lịch sử không?',
                                    'Tạo: Thiết kế một truyền thuyết hiện đại về một người truyền cảm hứng đương đại'
                                ]
                            }
                        },
                        {
                            type: 'Personal Connection',
                            description: {
                                en: [
                                    'Identify cultural heroes from your own background and explain their significance',
                                    'Discuss: How do cultural stories of heroes influence personal aspirations?',
                                    'Reflect: Which cultural hero\'s story resonates most with your own life goals?',
                                    'Project: Create a personal "hero\'s journey" map inspired by cultural archetypes'
                                ],
                                vi: [
                                    'Xác định anh hùng văn hóa từ nền tảng của chính bạn và giải thích ý nghĩa của họ',
                                    'Thảo luận: Câu chuyện văn hóa về anh hùng ảnh hưởng đến nguyện vọng cá nhân như thế nào?',
                                    'Suy ngẫm: Câu chuyện anh hùng văn hóa nào cộng hưởng nhất với mục tiêu cuộc sống của bạn?',
                                    'Dự án: Tạo bản đồ "hành trình của người anh hùng" cá nhân lấy cảm hứng từ các nguyên mẫu văn hóa'
                                ]
                            }
                        }
                    ]
                },
                {
                    title: { en: 'Project: Life Story Documentary', vi: 'Dự án: Phim tài liệu câu chuyện cuộc đời' },
                    aims: {
                        en: [
                            'Apply knowledge of life stories to create a multimedia presentation',
                            'Practice research, scriptwriting, and presentation skills',
                            'Communicate inspirational content effectively through various media',
                            'Reflect on the process of storytelling and its impact on audiences'
                        ],
                        vi: [
                            'Áp dụng kiến thức về câu chuyện cuộc đời để tạo bài thuyết trình đa phương tiện',
                            'Thực hành kỹ năng nghiên cứu, viết kịch bản và trình bày',
                            'Truyền đạt nội dung truyền cảm hứng hiệu quả qua các phương tiện khác nhau',
                            'Suy ngẫm về quá trình kể chuyện và tác động của nó đối với khán giả'
                        ]
                    },
                    vocabulary: [],
                    grammar: [],
                    activities: [
                        {
                            type: 'Planning Phase',
                            description: {
                                en: [
                                    'Choose an inspirational figure: historical, contemporary, or personal hero',
                                    'Research: Gather 10-15 key facts, quotes, and images about their life',
                                    'Outline: Create a 5-7 minute documentary structure (introduction, main story, conclusion)',
                                    'Script: Write a narrative script that highlights admirable qualities and achievements'
                                ],
                                vi: [
                                    'Chọn một nhân vật truyền cảm hứng: lịch sử, đương đại, hoặc người anh hùng cá nhân',
                                    'Nghiên cứu: Thu thập 10-15 sự thật chính, trích dẫn và hình ảnh về cuộc đời họ',
                                    'Dàn ý: Tạo cấu trúc phim tài liệu 5-7 phút (giới thiệu, câu chuyện chính, kết luận)',
                                    'Kịch bản: Viết kịch bản tường thuật làm nổi bật phẩm chất và thành tựu đáng ngưỡng mộ'
                                ]
                            }
                        },
                        {
                            type: 'Creation Phase',
                            description: {
                                en: [
                                    'Gather materials: Photos, quotes, timeline graphics, background music',
                                    'Create content: Record voice-over narration, add images and transitions',
                                    'Incorporate multimedia: Use PowerPoint, video editing software, or presentation tools',
                                    'Review: Ensure the story flows logically and maintains audience engagement'
                                ],
                                vi: [
                                    'Thu thập vật liệu: Ảnh, trích dẫn, đồ họa dòng thời gian, nhạc nền',
                                    'Tạo nội dung: Ghi âm lời dẫn chuyện, thêm hình ảnh và chuyển tiếp',
                                    'Kết hợp đa phương tiện: Sử dụng PowerPoint, phần mềm chỉnh sửa video, hoặc công cụ trình bày',
                                    'Xem lại: Đảm bảo câu chuyện diễn ra hợp lý và duy trì sự tham gia của khán giả'
                                ]
                            }
                        },
                        {
                            type: 'Presentation Phase',
                            description: {
                                en: [
                                    'Present your documentary to the class (5-7 minutes per student)',
                                    'Include Q&A: Answer questions about your subject and research process',
                                    'Receive feedback: What was most inspiring? What storytelling techniques worked well?',
                                    'Reflect: How did creating this project change your view of life stories?'
                                ],
                                vi: [
                                    'Trình bày phim tài liệu của bạn trước lớp (5-7 phút mỗi học sinh)',
                                    'Bao gồm Hỏi & Đáp: Trả lời câu hỏi về chủ đề và quá trình nghiên cứu của bạn',
                                    'Nhận phản hồi: Điều gì truyền cảm hứng nhất? Kỹ thuật kể chuyện nào hoạt động tốt?',
                                    'Suy ngẫm: Việc tạo dự án này thay đổi góc nhìn của bạn về câu chuyện cuộc đời như thế nào?'
                                ]
                            }
                        },
                        {
                            type: 'Reflection Phase',
                            description: {
                                en: [
                                    'Self-assessment: What skills did you develop? What challenges did you overcome?',
                                    'Content reflection: How did researching your subject\'s life story inspire you?',
                                    'Technical reflection: What multimedia elements were most effective?',
                                    'Future application: How might you use life story telling in your future career?'
                                ],
                                vi: [
                                    'Tự đánh giá: Bạn phát triển kỹ năng gì? Bạn vượt qua thách thức nào?',
                                    'Suy ngẫm nội dung: Việc nghiên cứu câu chuyện cuộc đời của chủ đề làm bạn truyền cảm hứng như thế nào?',
                                    'Suy ngẫm kỹ thuật: Yếu tố đa phương tiện nào hiệu quả nhất?',
                                    'Ứng dụng tương lai: Bạn có thể sử dụng kể chuyện cuộc đời trong sự nghiệp tương lai như thế nào?'
                                ]
                            }
                        }
                    ]
                }
            ]
        )
        },
        {
            id: 1202,
            title: { en: 'A Multicultural World', vi: 'Thế giới đa văn hóa' },
            lessons: [
                 createLesson({
                    id: 120201,
                    day: 1,
                    title: { en: 'Unit 2 Overview', vi: 'Tổng quan Bài 2' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to a multicultural world.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến thế giới đa văn hóa.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words related to cultural diversity'],
                    grammar: ['Articles (review and extension)'],
                    activities: [
                        { en: 'Reading: An article about globalisation and cultural diversity', vi: 'Đọc: Bài viết về toàn cầu hóa và đa dạng văn hóa' },
                        { en: 'Speaking: Discussing and planning a Cultural Diversity Day', vi: 'Nói: Thảo luận và lên kế hoạch cho Ngày hội đa dạng văn hóa' },
                        { en: 'Listening: An interview about Halloween in Viet Nam', vi: 'Nghe: Cuộc phỏng vấn về Halloween ở Việt Nam' },
                        { en: 'Writing: An opinion essay on the impact of world festivals on young Vietnamese people', vi: 'Viết: Bài luận về quan điểm ảnh hưởng của các lễ hội quốc tế đối với giới trẻ Việt Nam' },
                        { en: 'Culture/CLIL: Culture shock', vi: 'Văn hóa/CLIL: Sốc văn hóa' },
                        { en: 'Project: Researching a country\'s culture', vi: 'Dự án: Nghiên cứu về văn hóa một quốc gia' }
                    ]
                })
            ]
        },
        {
            id: 1203,
            title: { en: 'Green Living', vi: 'Lối sống xanh' },
            lessons: [
                createLesson({
                    id: 120301,
                    day: 1,
                    title: { en: 'Unit 3 Overview', vi: 'Tổng quan Bài 3' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to green living.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến lối sống xanh.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words and phrases related to green living'],
                    grammar: ['Verbs with prepositions', 'Relative clauses referring to a whole sentence'],
                    activities: [
                        { en: 'Reading: Emails about going green with plastics', vi: 'Đọc: Các email về lối sống xanh với nhựa' },
                        { en: 'Speaking: Discussing ways to reduce, reuse, and recycle paper', vi: 'Nói: Thảo luận cách giảm thiểu, tái sử dụng, và tái chế giấy' },
                        { en: 'Listening: A conversation about creating a compost pile', vi: 'Nghe: Cuộc trò chuyện về cách tạo một đống ủ phân hữu cơ' },
                        { en: 'Writing: A problem-solving report on green solutions', vi: 'Viết: Báo cáo giải quyết vấn đề về các giải pháp xanh' },
                        { en: 'Culture/CLIL: How green are our festival traditions?', vi: 'Văn hóa/CLIL: Các truyền thống lễ hội của chúng ta xanh đến mức nào?' },
                        { en: 'Project: Designing a leaflet promoting an eco-friendly habit', vi: 'Dự án: Thiết kế tờ rơi quảng bá một thói quen thân thiện với môi trường' }
                    ]
                })
            ]
        },
        {
            id: 1204,
            title: { en: 'Urbanisation', vi: 'Đô thị hóa' },
            lessons: [
                createLesson({
                    id: 120401,
                    day: 1,
                    title: { en: 'Unit 4 Overview', vi: 'Tổng quan Bài 4' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to urbanisation.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến đô thị hóa.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words related to urbanisation'],
                    grammar: ['Present perfect (review and extension)', 'Double comparatives to show change'],
                    activities: [
                        { en: 'Reading: An article about the urbanisation of Ha Noi', vi: 'Đọc: Bài viết về quá trình đô thị hóa của Hà Nội' },
                        { en: 'Speaking: Talking about the changes in a living area', vi: 'Nói: Nói về những thay đổi ở một khu vực sinh sống' },
                        { en: 'Listening: A radio talk about urbanisation', vi: 'Nghe: Bài nói chuyện trên radio về đô thị hóa' },
                        { en: 'Writing: Describing a line graph about trends in urbanisation', vi: 'Viết: Mô tả biểu đồ đường về xu hướng đô thị hóa' },
                        { en: 'Culture/CLIL: Urbanisation in Malaysia and Australia', vi: 'Văn hóa/CLIL: Đô thị hóa ở Malaysia và Úc' },
                        { en: 'Project: Doing research on an urban area in Viet Nam', vi: 'Dự án: Nghiên cứu về một khu đô thị ở Việt Nam' }
                    ]
                })
            ]
        },
        {
            id: 1205,
            title: { en: 'The World of Work', vi: 'Thế giới công việc' },
            lessons: [
                createLesson({
                    id: 120501,
                    day: 1,
                    title: { en: 'Unit 5 Overview', vi: 'Tổng quan Bài 5' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to the world of work.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến thế giới công việc.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words related to work'],
                    grammar: ['Simple, compound, and complex sentences (review and extension)'],
                    activities: [
                        { en: 'Reading: Job advertisements', vi: 'Đọc: Các quảng cáo việc làm' },
                        { en: 'Speaking: Giving opinions about different jobs', vi: 'Nói: Đưa ra ý kiến về các công việc khác nhau' },
                        { en: 'Listening: A phone conversation about a job vacancy', vi: 'Nghe: Cuộc trò chuyện qua điện thoại về một vị trí trống' },
                        { en: 'Writing: A job application letter', vi: 'Viết: Thư xin việc' },
                        { en: 'Culture/CLIL: Unusual jobs around the world', vi: 'Văn hóa/CLIL: Các công việc độc đáo trên thế giới' },
                        { en: 'Project: Doing research on suitable part-time jobs for students', vi: 'Dự án: Nghiên cứu về các công việc bán thời gian phù hợp cho học sinh, sinh viên' }
                    ]
                })
            ]
        },
        {
            id: 1206,
            title: { en: 'Artificial Intelligence', vi: 'Trí tuệ nhân tạo' },
            lessons: [
                createLesson({
                    id: 120601,
                    day: 1,
                    title: { en: 'Unit 6 Overview', vi: 'Tổng quan Bài 6' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to artificial intelligence.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến trí tuệ nhân tạo.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words and phrases related to science and technology'],
                    grammar: ['Active and passive causatives'],
                    activities: [
                        { en: 'Reading: An article about AI applications in education', vi: 'Đọc: Bài viết về các ứng dụng AI trong giáo dục' },
                        { en: 'Speaking: Discussing applications of AI in education', vi: 'Nói: Thảo luận về các ứng dụng của AI trong giáo dục' },
                        { en: 'Listening: A conversation about operating a home robot', vi: 'Nghe: Cuộc trò chuyện về cách vận hành một robot gia đình' },
                        { en: 'Writing: An essay about the advantages and disadvantages of home robots', vi: 'Viết: Bài luận về ưu và nhược điểm của robot gia đình' },
                        { en: 'Culture/CLIL: The evolution of robots', vi: 'Văn hóa/CLIL: Sự tiến hóa của robot' },
                        { en: 'Project: Researching or designing a new AI application', vi: 'Dự án: Nghiên cứu hoặc thiết kế một ứng dụng AI mới' }
                    ]
                })
            ]
        },
        {
            id: 1207,
            title: { en: 'The World of Mass Media', vi: 'Thế giới truyền thông đại chúng' },
            lessons: [
                createLesson({
                    id: 120701,
                    day: 1,
                    title: { en: 'Unit 7 Overview', vi: 'Tổng quan Bài 7' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to the mass media.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến truyền thông đại chúng.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words and phrases related to the mass media'],
                    grammar: ['Adverbial clauses of manner and result'],
                    activities: [
                        { en: 'Reading: An article comparing digital media and traditional media', vi: 'Đọc: Bài viết so sánh truyền thông kỹ thuật số và truyền thông truyền thống' },
                        { en: 'Speaking: Comparing different types of mass media', vi: 'Nói: So sánh các loại hình truyền thông đại chúng khác nhau' },
                        { en: 'Listening: A talk about fake news on the Internet', vi: 'Nghe: Bài nói chuyện về tin giả trên Internet' },
                        { en: 'Writing: Describing pie charts', vi: 'Viết: Mô tả biểu đồ tròn' },
                        { en: 'Culture/CLIL: Mass media types around the world', vi: 'Văn hóa/CLIL: Các loại hình truyền thông đại chúng trên thế giới' },
                        { en: 'Project: Comparing two types of mass media', vi: 'Dự án: So sánh hai loại hình truyền thông đại chúng' }
                    ]
                })
            ]
        },
        {
            id: 1208,
            title: { en: 'Wildlife Conservation', vi: 'Bảo tồn động vật hoang dã' },
            lessons: [
                createLesson({
                    id: 120801,
                    day: 1,
                    title: { en: 'Unit 8 Overview', vi: 'Tổng quan Bài 8' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to wildlife conservation.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến bảo tồn động vật hoang dã.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Words related to conserving wildlife'],
                    grammar: ['Adverbial clauses of condition and comparison'],
                    activities: [
                        { en: 'Reading: News items about wildlife conservation', vi: 'Đọc: Các bản tin về bảo tồn động vật hoang dã' },
                        { en: 'Speaking: Suggesting activities for a wildlife conservation event', vi: 'Nói: Đề xuất các hoạt động cho một sự kiện bảo tồn động vật hoang dã' },
                        { en: 'Listening: A talk about the threats facing tigers', vi: 'Nghe: Bài nói chuyện về các mối đe dọa đối với loài hổ' },
                        { en: 'Writing: A problem-solving report on protecting tigers', vi: 'Viết: Báo cáo giải quyết vấn đề về việc bảo vệ hổ' },
                        { en: 'Culture/CLIL: The IUCN Red List', vi: 'Văn hóa/CLIL: Danh sách đỏ IUCN' },
                        { en: 'Project: Designing a poster about an endangered species', vi: 'Dự án: Thiết kế một áp phích về một loài có nguy cơ tuyệt chủng' }
                    ]
                })
            ]
        },
        {
            id: 1209,
            title: { en: 'Career Paths', vi: 'Con đường nghề nghiệp' },
            lessons: [
                createLesson({
                    id: 120901,
                    day: 1,
                    title: { en: 'Unit 9 Overview', vi: 'Tổng quan Bài 9' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to career paths.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến con đường nghề nghiệp.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Phrases related to choosing a career path'],
                    grammar: ['Three-word phrasal verbs'],
                    activities: [
                        { en: 'Reading: An article about things to consider when choosing a career path', vi: 'Đọc: Bài viết về những điều cần cân nhắc khi chọn con đường nghề nghiệp' },
                        { en: 'Speaking: Discussing things to consider when following different career paths', vi: 'Nói: Thảo luận những điều cần cân nhắc khi theo các con đường nghề nghiệp khác nhau' },
                        { en: 'Listening: A conversation about a career in teaching', vi: 'Nghe: Cuộc trò chuyện về một nghề nghiệp trong ngành giáo dục' },
                        { en: 'Writing: A curriculum vitae (CV)', vi: 'Viết: Một bản sơ yếu lí lịch (CV)' },
                        { en: 'Culture/CLIL: In-demand careers for the future', vi: 'Văn hóa/CLIL: Các nghề nghiệp có nhu cầu cao trong tương lai' },
                        { en: 'Project: Doing a survey on school-leavers\' career plans', vi: 'Dự án: Thực hiện khảo sát về kế hoạch nghề nghiệp của học sinh sắp tốt nghiệp' }
                    ]
                })
            ]
        },
        {
            id: 1210,
            title: { en: 'Lifelong Learning', vi: 'Học tập suốt đời' },
            lessons: [
                createLesson({
                    id: 121001,
                    day: 1,
                    title: { en: 'Unit 10 Overview', vi: 'Tổng quan Bài 10' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to lifelong learning.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến học tập suốt đời.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Phrases related to lifelong learning'],
                    grammar: ['Reported speech: reporting orders, requests, offers, and advice'],
                    activities: [
                        { en: 'Reading: A head teacher\'s message to school-leavers', vi: 'Đọc: Tin nhắn của hiệu trưởng gửi đến học sinh sắp tốt nghiệp' },
                        { en: 'Speaking: Talking about great role models for lifelong learning', vi: 'Nói: Nói về các tấm gương sáng trong việc học tập suốt đời' },
                        { en: 'Listening: A talk about the challenges and benefits of lifelong learning', vi: 'Nghe: Bài nói chuyện về những thách thức và lợi ích của việc học tập suốt đời' },
                        { en: 'Writing: An article about the benefits of lifelong learning', vi: 'Viết: Bài báo về lợi ích của việc học tập suốt đời' },
                        { en: 'Culture/CLIL: One of the oldest university graduates', vi: 'Văn hóa/CLIL: Một trong những người tốt nghiệp đại học lớn tuổi nhất' },
                        { en: 'Project: Designing a leaflet about a lifelong learning habit', vi: 'Dự án: Thiết kế một tờ rơi về một thói quen học tập suốt đời' }
                    ]
                })
            ]
        }
    ]
};
