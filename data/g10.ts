import { CurriculumLevel, CurriculumLesson, VocabularyItem, GrammarPoint, Activity } from '../types';

// A helper type for the raw lesson data structure used in this file
interface RawLessonData {
    title: { en: string; vi: string; };
    aims: { en: string[]; vi: string[]; };
    vocabulary?: string[];
    grammar?: string[];
    activities?: string[];
}

// This function converts the simplified raw data into the full CurriculumLesson structure.
const createLessonsForUnit = (unitId: number, lessonsData: RawLessonData[]): CurriculumLesson[] => {
    return lessonsData.map((lesson, index) => {
        const vocabularyItems: VocabularyItem[] = (lesson.vocabulary || []).map(term => ({
            term: term,
            pronunciation: '', // Pronunciation can be added later
            vietnamese: '' // Vietnamese translation can be added later
        }));

        const grammarPoints: GrammarPoint[] = (lesson.grammar || []).map(title => ({
            title: { en: title, vi: title },
            explanation: { en: [], vi: [] }
        }));

        const activityItems: Activity[] = (lesson.activities || []).map(desc => ({
            type: 'Practice',
            description: { en: [desc], vi: [desc] }
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

export const g10Data: CurriculumLevel = {
    level: 10,
    title: { en: 'Grade 10', vi: 'Lớp 10' },
    subtitle: { en: 'Global Success', vi: 'Tiếng Anh 10 - Global Success' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1uEKt91RasMcOCybqfc6KpoDKve9X8cV2/view?usp=drive_link',
    units: [
        {
            id: 1001,
            title: { en: 'Unit 1: Family Life', vi: 'Bài 1: Cuộc sống gia đình' },
            lessons: [
                {
                    id: 100101,
                    day: 1,
                    title: { en: 'Getting Started: Household Chores', vi: 'Bắt đầu: Công việc nhà' },
                    aims: { 
                        en: [
                            'Introduce and practice vocabulary related to household chores and family responsibilities',
                            'Develop listening and reading skills through a conversation about sharing housework',
                            'Express opinions about family roles and household task distribution'
                        ], 
                        vi: [
                            'Giới thiệu và thực hành từ vựng liên quan đến công việc nhà và trách nhiệm gia đình',
                            'Phát triển kỹ năng nghe và đọc thông qua một cuộc hội thoại về chia sẻ việc nhà',
                            'Bày tỏ ý kiến về vai trò gia đình và phân chia công việc nhà'
                        ] 
                    },
                    vocabulary: [
                        { term: 'household chores', pronunciation: '/ˈhaʊshəʊld tʃɔːz/', vietnamese: 'công việc nhà' },
                        { term: 'split', pronunciation: '/splɪt/', vietnamese: 'chia, phân chia' },
                        { term: 'responsibility', pronunciation: '/rɪˌspɒnsəˈbɪləti/', vietnamese: 'trách nhiệm' },
                        { term: 'contribute', pronunciation: '/kənˈtrɪbjuːt/', vietnamese: 'đóng góp' },
                        { term: 'divide', pronunciation: '/dɪˈvaɪd/', vietnamese: 'phân chia, chia' },
                        { term: 'share', pronunciation: '/ʃeə(r)/', vietnamese: 'chia sẻ' },
                        { term: 'equally', pronunciation: '/ˈiːkwəli/', vietnamese: 'một cách công bằng, đều nhau' },
                        { term: 'take turns', pronunciation: '/teɪk tɜːnz/', vietnamese: 'thay phiên nhau, luân phiên' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Warm-up Discussion', 
                            description: { 
                                en: ['Look at pictures of different household chores (cooking, cleaning, washing dishes, doing laundry)', 'Discuss: What chores do you do at home? Who does the most housework in your family?'], 
                                vi: ['Nhìn vào các hình ảnh về các công việc nhà khác nhau (nấu ăn, dọn dẹp, rửa bát, giặt giũ)', 'Thảo luận: Bạn làm công việc nhà gì? Ai làm nhiều việc nhà nhất trong gia đình bạn?'] 
                            } 
                        },
                        { 
                            type: 'Listen and Read', 
                            description: { 
                                en: ['Listen to a conversation between Nam and his mother about household chores', 'Read along and identify who does which chores in Nam\'s family', 'Answer comprehension questions about the division of household tasks'], 
                                vi: ['Nghe một cuộc hội thoại giữa Nam và mẹ của cậu ấy về công việc nhà', 'Đọc theo và xác định ai làm công việc gì trong gia đình Nam', 'Trả lời các câu hỏi hiểu về việc phân chia công việc nhà'] 
                            } 
                        },
                        { 
                            type: 'Vocabulary Practice', 
                            description: { 
                                en: ['Match household chores with appropriate verbs (do, make, wash, clean, take out)', 'Complete sentences using new vocabulary about family responsibilities'], 
                                vi: ['Nối các công việc nhà với các động từ thích hợp (do, make, wash, clean, take out)', 'Hoàn thành các câu sử dụng từ vựng mới về trách nhiệm gia đình'] 
                            } 
                        },
                        { 
                            type: 'Speaking Practice', 
                            description: { 
                                en: ['Work in pairs: Interview your partner about their family\'s household chores distribution', 'Share interesting findings with the class', 'Discuss: Do you think housework should be shared equally? Why or why not?'], 
                                vi: ['Làm việc theo cặp: Phỏng vấn bạn cùng lớp về việc phân chia công việc nhà trong gia đình họ', 'Chia sẻ những phát hiện thú vị với lớp', 'Thảo luận: Bạn có nghĩ công việc nhà nên được chia đều không? Tại sao có hoặc tại sao không?'] 
                            } 
                        }
                    ]
                },
                {
                    id: 100102,
                    day: 2,
                    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
                    aims: { 
                        en: [
                            'Master the pronunciation of consonant blends /br/, /kr/, and /tr/ in context',
                            'Expand vocabulary related to family life, household responsibilities, and gender roles',
                            'Understand and correctly use present simple tense to express habits and routines',
                            'Distinguish between present simple and present continuous tenses in family contexts'
                        ], 
                        vi: [
                            'Nắm vững cách phát âm các cụm phụ âm /br/, /kr/, và /tr/ trong ngữ cảnh',
                            'Mở rộng vốn từ vựng liên quan đến cuộc sống gia đình, trách nhiệm gia đình và vai trò giới',
                            'Hiểu và sử dụng đúng thì hiện tại đơn để diễn tả thói quen và hoạt động thường xuyên',
                            'Phân biệt giữa thì hiện tại đơn và hiện tại tiếp diễn trong các tình huống gia đình'
                        ] 
                    },
                    vocabulary: [
                        { term: 'breadwinner', pronunciation: '/ˈbredwɪnə(r)/', vietnamese: 'trụ cột gia đình (người trụ trì về kinh tế)' },
                        { term: 'homemaker', pronunciation: '/ˈhəʊmmeɪkə(r)/', vietnamese: 'người nội trợ' },
                        { term: 'housework', pronunciation: '/ˈhaʊswɜːk/', vietnamese: 'công việc nội trợ, việc nhà' },
                        { term: 'groceries', pronunciation: '/ˈɡrəʊsəriz/', vietnamese: 'thực phẩm, đồ tạp hóa' },
                        { term: 'heavy lifting', pronunciation: '/ˌhevi ˈlɪftɪŋ/', vietnamese: 'công việc nặng nhọc (nhấc vác đồ nặng)' },
                        { term: 'laundry', pronunciation: '/ˈlɔːndri/', vietnamese: 'quần áo cần giặt, việc giặt giũ' },
                        { term: 'washing-up', pronunciation: '/ˌwɒʃɪŋ ˈʌp/', vietnamese: 'rửa bát đĩa' },
                        { term: 'iron (v)', pronunciation: '/ˈaɪən/', vietnamese: 'là, ủi (quần áo)' },
                        { term: 'fold (v)', pronunciation: '/fəʊld/', vietnamese: 'gấp (quần áo)' },
                        { term: 'sweep', pronunciation: '/swiːp/', vietnamese: 'quét nhà' },
                        { term: 'mop', pronunciation: '/mɒp/', vietnamese: 'lau nhà' },
                        { term: 'vacuum', pronunciation: '/ˈvækjuːm/', vietnamese: 'hút bụi' },
                        { term: 'tidy up', pronunciation: '/ˈtaɪdi ʌp/', vietnamese: 'dọn dẹp, sắp xếp gọn gàng' },
                        { term: 'take out the rubbish/trash', pronunciation: '/teɪk aʊt ðə ˈrʌbɪʃ/', vietnamese: 'đổ rác' },
                        { term: 'be responsible for', pronunciation: '/bi rɪˈspɒnsəbl fɔː(r)/', vietnamese: 'chịu trách nhiệm về' },
                        { term: 'be in charge of', pronunciation: '/bi ɪn tʃɑːdʒ ɒv/', vietnamese: 'phụ trách, quản lý' }
                    ],
                    grammar: [
                        {
                            title: { en: 'Present Simple for Habits and Routines', vi: 'Thì hiện tại đơn cho thói quen và hoạt động thường xuyên' },
                            explanation: { 
                                en: [
                                    'Use: We use present simple to talk about regular habits, daily routines, and general truths.',
                                    'Form: Subject + V(base form/s/es) + Object',
                                    'Examples: - My father does the cooking every evening. - She washes the dishes after dinner. - We share the housework equally.',
                                    'Time expressions: every day, usually, often, always, sometimes, never, on Mondays, at weekends'
                                ], 
                                vi: [
                                    'Cách dùng: Chúng ta dùng thì hiện tại đơn để nói về thói quen đều đặn, hoạt động hàng ngày, và sự thật chung.',
                                    'Cấu trúc: Chủ ngữ + Động từ (nguyên mẫu/thêm s/es) + Tân ngữ',
                                    'Ví dụ: - Bố tôi nấu ăn mỗi tối. - Cô ấy rửa bát sau bữa tối. - Chúng tôi chia sẻ việc nhà một cách công bằng.',
                                    'Trạng từ thời gian: every day (mỗi ngày), usually (thường), often (thường xuyên), always (luôn luôn), sometimes (đôi khi), never (không bao giờ), on Mondays (vào thứ Hai), at weekends (vào cuối tuần)'
                                ] 
                            }
                        },
                        {
                            title: { en: 'Present Continuous for Temporary Actions', vi: 'Thì hiện tại tiếp diễn cho hành động tạm thời' },
                            explanation: { 
                                en: [
                                    'Use: We use present continuous to talk about actions happening now or around now (temporary situations).',
                                    'Form: Subject + am/is/are + V-ing + Object',
                                    'Examples: - Look! Dad is cooking dinner. - Mom is doing the laundry right now. - This week, I am helping my sister with her homework.',
                                    'Time expressions: now, right now, at the moment, currently, this week, these days, today',
                                    'Note: Some verbs are NOT usually used in continuous form (stative verbs): know, like, love, hate, want, need, believe, understand, etc.'
                                ], 
                                vi: [
                                    'Cách dùng: Chúng ta dùng thì hiện tại tiếp diễn để nói về hành động đang xảy ra bây giờ hoặc xung quanh thời điểm hiện tại (tình huống tạm thời).',
                                    'Cấu trúc: Chủ ngữ + am/is/are + Động từ-ing + Tân ngữ',
                                    'Ví dụ: - Nhìn kìa! Bố đang nấu bữa tối. - Mẹ đang giặt quần áo ngay bây giờ. - Tuần này, tôi đang giúp em gái làm bài tập.',
                                    'Trạng từ thời gian: now (bây giờ), right now (ngay lúc này), at the moment (lúc này), currently (hiện tại), this week (tuần này), these days (dạo này), today (hôm nay)',
                                    'Lưu ý: Một số động từ KHÔNG thường được dùng ở dạng tiếp diễn (động từ trạng thái): know, like, love, hate, want, need, believe, understand, v.v.'
                                ] 
                            }
                        },
                        {
                            title: { en: 'Present Simple vs. Present Continuous', vi: 'So sánh Hiện tại đơn và Hiện tại tiếp diễn' },
                            explanation: { 
                                en: [
                                    'Present Simple: For regular, repeated actions and habits',
                                    '  Example: My mom usually cooks dinner. (habit)',
                                    'Present Continuous: For actions happening now or temporary situations',
                                    '  Example: My mom is cooking dinner now. (happening now)',
                                    'Compare: - I go to school by bus. (regular) vs. I am going to school by bus today. (today only, temporary)',
                                    '         - She works at home. (permanent job) vs. She is working at home this week. (temporary)'
                                ], 
                                vi: [
                                    'Hiện tại đơn: Dành cho hành động lặp đi lặp lại và thói quen',
                                    '  Ví dụ: Mẹ tôi thường nấu bữa tối. (thói quen)',
                                    'Hiện tại tiếp diễn: Dành cho hành động đang xảy ra hoặc tình huống tạm thời',
                                    '  Ví dụ: Mẹ tôi đang nấu bữa tối bây giờ. (đang xảy ra)',
                                    'So sánh: - Tôi đi học bằng xe buýt. (thường xuyên) vs. Hôm nay tôi đang đi học bằng xe buýt. (chỉ hôm nay, tạm thời)',
                                    '        - Cô ấy làm việc ở nhà. (công việc cố định) vs. Tuần này cô ấy đang làm việc ở nhà. (tạm thời)'
                                ] 
                            }
                        }
                    ],
                    activities: [
                        { 
                            type: 'Pronunciation Practice', 
                            description: { 
                                en: [
                                    'Listen and repeat words with /br/: bread, breakfast, breadwinner, bring, brush',
                                    'Listen and repeat words with /kr/: cream, crack, crowd, crane, crazy',
                                    'Listen and repeat words with /tr/: tree, train, traffic, trash, trouble, try',
                                    'Practice sentences: "My brother brings bread for breakfast." / "The crane lifts heavy trash from the train track."'
                                ], 
                                vi: [
                                    'Nghe và lặp lại các từ có /br/: bread, breakfast, breadwinner, bring, brush',
                                    'Nghe và lặp lại các từ có /kr/: cream, crack, crowd, crane, crazy',
                                    'Nghe và lặp lại các từ có /tr/: tree, train, traffic, trash, trouble, try',
                                    'Luyện các câu: "Anh trai tôi mang bánh mì cho bữa sáng." / "Cần cẩu nâng rác nặng từ đường tàu."'
                                ] 
                            } 
                        },
                        { 
                            type: 'Vocabulary Exercises', 
                            description: { 
                                en: [
                                    'Gap-fill: Complete sentences with appropriate household vocabulary (breadwinner, homemaker, laundry, groceries, etc.)',
                                    'Matching: Match household chores with who typically does them (traditional vs. modern families)',
                                    'Word formation: Create sentences using "be responsible for" and "be in charge of"',
                                    'Discussion: Is the concept of "breadwinner" still relevant today? Why or why not?'
                                ], 
                                vi: [
                                    'Điền từ: Hoàn thành các câu với từ vựng về gia đình phù hợp (breadwinner, homemaker, laundry, groceries, v.v.)',
                                    'Nối: Ghép công việc nhà với người thường làm chúng (gia đình truyền thống vs. hiện đại)',
                                    'Tạo từ: Tạo câu sử dụng "be responsible for" và "be in charge of"',
                                    'Thảo luận: Khái niệm "trụ cột gia đình" còn phù hợp ngày nay không? Tại sao?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Grammar Practice', 
                            description: { 
                                en: [
                                    'Exercise 1: Choose present simple or present continuous to complete sentences about family routines',
                                    'Exercise 2: Correct the mistakes in sentences mixing up the two tenses',
                                    'Exercise 3: Write 5 sentences about your family using present simple (habits) and 5 using present continuous (happening now)',
                                    'Exercise 4: Interview a partner about their family\'s daily routine and report back using the correct tenses'
                                ], 
                                vi: [
                                    'Bài tập 1: Chọn thì hiện tại đơn hoặc hiện tại tiếp diễn để hoàn thành các câu về hoạt động gia đình',
                                    'Bài tập 2: Sửa lỗi trong các câu dùng nhầm hai thì',
                                    'Bài tập 3: Viết 5 câu về gia đình bạn dùng thì hiện tại đơn (thói quen) và 5 câu dùng thì hiện tại tiếp diễn (đang xảy ra)',
                                    'Bài tập 4: Phỏng vấn bạn cùng lớp về hoạt động hàng ngày của gia đình họ và báo cáo lại dùng đúng thì'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100103,
                    day: 3,
                    title: { en: 'Reading: The Benefits of Sharing Housework', vi: 'Đọc: Lợi ích của việc chia sẻ công việc nhà' },
                    aims: { 
                        en: [
                            'Read and understand an article about the benefits of children doing housework',
                            'Practice reading skills: skimming for main ideas and scanning for specific information',
                            'Identify topic sentences and supporting details in paragraphs',
                            'Discuss and evaluate the positive impacts of housework on children\'s development'
                        ], 
                        vi: [
                            'Đọc và hiểu bài viết về lợi ích của việc trẻ em làm việc nhà',
                            'Thực hành kỹ năng đọc: đọc lướt để tìm ý chính và đọc quét để tìm thông tin cụ thể',
                            'Xác định câu chủ đề và các chi tiết hỗ trợ trong đoạn văn',
                            'Thảo luận và đánh giá tác động tích cực của việc nhà đối với sự phát triển của trẻ'
                        ] 
                    },
                    vocabulary: [
                        { term: 'benefit', pronunciation: '/ˈbenɪfɪt/', vietnamese: 'lợi ích' },
                        { term: 'responsibility', pronunciation: '/rɪˌspɒnsəˈbɪləti/', vietnamese: 'trách nhiệm' },
                        { term: 'develop', pronunciation: '/dɪˈveləp/', vietnamese: 'phát triển' },
                        { term: 'life skills', pronunciation: '/laɪf skɪlz/', vietnamese: 'kỹ năng sống' },
                        { term: 'independence', pronunciation: '/ˌɪndɪˈpendəns/', vietnamese: 'sự độc lập' },
                        { term: 'confident', pronunciation: '/ˈkɒnfɪdənt/', vietnamese: 'tự tin' },
                        { term: 'appreciate', pronunciation: '/əˈpriːʃieɪt/', vietnamese: 'đánh giá cao, trân trọng' },
                        { term: 'bond', pronunciation: '/bɒnd/', vietnamese: 'mối liên kết, sự gắn bó' },
                        { term: 'self-esteem', pronunciation: '/ˌself ɪˈstiːm/', vietnamese: 'lòng tự trọng' },
                        { term: 'cooperation', pronunciation: '/kəʊˌɒpəˈreɪʃn/', vietnamese: 'sự hợp tác' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Pre-Reading Discussion', 
                            description: { 
                                en: [
                                    'Look at the title and pictures: What do you think the article is about?',
                                    'Quick poll: Do children in your family do housework? What are the advantages?',
                                    'Brainstorm: What life skills can children learn from doing housework?'
                                ], 
                                vi: [
                                    'Nhìn vào tiêu đề và hình ảnh: Bạn nghĩ bài viết nói về điều gì?',
                                    'Khảo sát nhanh: Trẻ em trong gia đình bạn có làm việc nhà không? Lợi ích là gì?',
                                    'Suy nghĩ: Trẻ em có thể học được những kỹ năng sống nào từ việc làm việc nhà?'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Reading Tasks', 
                            description: { 
                                en: [
                                    'Skim the article: Match each paragraph with its main idea',
                                    'Scan for details: Answer True/False questions about specific information',
                                    'Vocabulary in context: Find words in the text that mean (definitions given)',
                                    'Identify topic sentences in each paragraph and underline supporting details',
                                    'Complete a summary of the article using words from the text'
                                ], 
                                vi: [
                                    'Đọc lướt bài viết: Nối mỗi đoạn văn với ý chính của nó',
                                    'Quét tìm chi tiết: Trả lời câu hỏi Đúng/Sai về thông tin cụ thể',
                                    'Từ vựng trong ngữ cảnh: Tìm từ trong bài có nghĩa là (đưa ra định nghĩa)',
                                    'Xác định câu chủ đề trong mỗi đoạn và gạch chân các chi tiết hỗ trợ',
                                    'Hoàn thành bản tóm tắt bài viết sử dụng từ trong bài'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Reading Discussion', 
                            description: { 
                                en: [
                                    'Group discussion: Do you agree with all the benefits mentioned? Why or why not?',
                                    'Critical thinking: What age should children start doing housework? What tasks are appropriate for different ages?',
                                    'Personal reflection: Which benefit do you think is the most important? Share your experience.',
                                    'Extension: In your opinion, should parents pay children for doing housework? Discuss the pros and cons.'
                                ], 
                                vi: [
                                    'Thảo luận nhóm: Bạn có đồng ý với tất cả các lợi ích được đề cập không? Tại sao có hoặc không?',
                                    'Tư duy phê phán: Trẻ em nên bắt đầu làm việc nhà từ độ tuổi nào? Công việc nào phù hợp với từng độ tuổi?',
                                    'Suy ngẫm cá nhân: Bạn nghĩ lợi ích nào là quan trọng nhất? Chia sẻ kinh nghiệm của bạn.',
                                    'Mở rộng: Theo bạn, cha mẹ có nên trả tiền cho con khi làm việc nhà không? Thảo luận ưu và nhược điểm.'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100104,
                    day: 4,
                    title: { en: 'Speaking: Discussing Household Responsibilities', vi: 'Nói: Thảo luận về trách nhiệm gia đình' },
                    aims: { 
                        en: [
                            'Express and justify opinions about children doing housework',
                            'Practice agreeing and disagreeing politely in discussions',
                            'Use appropriate language to talk about advantages and disadvantages',
                            'Develop fluency and confidence in discussing family-related topics'
                        ], 
                        vi: [
                            'Bày tỏ và biện minh ý kiến về việc trẻ em làm việc nhà',
                            'Thực hành đồng ý và không đồng ý một cách lịch sự trong thảo luận',
                            'Sử dụng ngôn ngữ phù hợp để nói về ưu điểm và nhược điểm',
                            'Phát triển sự trôi chảy và tự tin khi thảo luận các chủ đề liên quan đến gia đình'
                        ] 
                    },
                    vocabulary: [
                        { term: 'I think/believe that...', pronunciation: '/aɪ θɪŋk bɪˈliːv ðæt/', vietnamese: 'Tôi nghĩ/tin rằng...' },
                        { term: 'In my opinion...', pronunciation: '/ɪn maɪ əˈpɪnjən/', vietnamese: 'Theo ý kiến của tôi...' },
                        { term: 'I agree/disagree because...', pronunciation: '/aɪ əˈɡriː dɪsəˈɡriː bɪˈkɒz/', vietnamese: 'Tôi đồng ý/không đồng ý vì...' },
                        { term: 'That\'s a good point, but...', pronunciation: '/ðæts ə ɡʊd pɔɪnt bʌt/', vietnamese: 'Đó là một ý hay, nhưng...' },
                        { term: 'On the one hand... On the other hand...', pronunciation: '', vietnamese: 'Một mặt... Mặt khác...' },
                        { term: 'The advantage/disadvantage of... is...', pronunciation: '', vietnamese: 'Ưu điểm/nhược điểm của... là...' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Useful Expressions', 
                            description: { 
                                en: [
                                    'Learn and practice phrases for expressing opinions: I think/believe..., In my opinion..., From my point of view...',
                                    'Learn phrases for agreeing: I agree with you., Exactly!, That\'s true., You have a point.',
                                    'Learn phrases for disagreeing politely: I\'m not sure I agree., I see your point, but..., Actually, I think...',
                                    'Practice using "On the one hand... On the other hand..." to present balanced arguments'
                                ], 
                                vi: [
                                    'Học và thực hành các cụm từ để bày tỏ ý kiến: Tôi nghĩ/tin..., Theo ý kiến của tôi..., Theo quan điểm của tôi...',
                                    'Học các cụm từ để đồng ý: Tôi đồng ý với bạn., Chính xác!, Đúng vậy., Bạn có lý.',
                                    'Học các cụm từ để không đồng ý một cách lịch sự: Tôi không chắc là tôi đồng ý., Tôi hiểu ý bạn, nhưng..., Thực ra, tôi nghĩ...',
                                    'Thực hành sử dụng "Một mặt... Mặt khác..." để trình bày các luận điểm cân bằng'
                                ] 
                            } 
                        },
                        { 
                            type: 'Controlled Practice', 
                            description: { 
                                en: [
                                    'Task 1: Look at statements about housework. Tick (✓) if you agree or cross (✗) if you disagree. Give reasons.',
                                    'Task 2: Complete dialogues expressing agreement or disagreement about household chores',
                                    'Task 3: Arrange phrases to make a logical discussion about the pros and cons of children doing housework'
                                ], 
                                vi: [
                                    'Bài tập 1: Xem các nhận định về công việc nhà. Đánh dấu (✓) nếu bạn đồng ý hoặc gạch chéo (✗) nếu bạn không đồng ý. Đưa ra lý do.',
                                    'Bài tập 2: Hoàn thành các đoạn hội thoại thể hiện sự đồng ý hoặc không đồng ý về công việc nhà',
                                    'Bài tập 3: Sắp xếp các cụm từ để tạo thành một cuộc thảo luận logic về ưu và nhược điểm của trẻ em làm việc nhà'
                                ] 
                            } 
                        },
                        { 
                            type: 'Freer Practice', 
                            description: { 
                                en: [
                                    'Pair work: Discuss the question "Should children do housework?" Present at least 3 arguments for each side.',
                                    'Group discussion: What household chores are appropriate for teenagers? Make a list and justify your choices.',
                                    'Role-play: Student A thinks children should do lots of housework. Student B thinks children should focus only on studying. Discuss and try to find a compromise.',
                                    'Class debate: Divide into two teams - "Children should do housework" vs. "Children should not do housework". Prepare arguments and debate.'
                                ], 
                                vi: [
                                    'Làm việc theo cặp: Thảo luận câu hỏi "Trẻ em có nên làm việc nhà không?" Trình bày ít nhất 3 lập luận cho mỗi phía.',
                                    'Thảo luận nhóm: Những công việc nhà nào phù hợp với thanh thiếu niên? Lập danh sách và biện minh cho lựa chọn của bạn.',
                                    'Đóng vai: Học sinh A nghĩ trẻ em nên làm nhiều việc nhà. Học sinh B nghĩ trẻ em chỉ nên tập trung học tập. Thảo luận và cố gắng tìm sự thỏa hiệp.',
                                    'Tranh luận lớp: Chia thành hai đội - "Trẻ em nên làm việc nhà" vs. "Trẻ em không nên làm việc nhà". Chuẩn bị luận điểm và tranh luận.'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100105,
                    day: 5,
                    title: { en: 'Listening: Family Life in Modern Society', vi: 'Nghe: Cuộc sống gia đình trong xã hội hiện đại' },
                    aims: { 
                        en: [
                            'Practice listening for main ideas and specific information in a talk show about modern family life',
                            'Develop note-taking skills while listening',
                            'Understand different perspectives on work-life balance and family roles',
                            'Recognize discourse markers and transition phrases in spoken English'
                        ], 
                        vi: [
                            'Thực hành nghe để tìm ý chính và thông tin cụ thể trong một talk show về cuộc sống gia đình hiện đại',
                            'Phát triển kỹ năng ghi chú khi nghe',
                            'Hiểu các quan điểm khác nhau về cân bằng công việc-cuộc sống và vai trò gia đình',
                            'Nhận biết các từ đánh dấu diễn ngôn và cụm từ chuyển tiếp trong tiếng Anh nói'
                        ] 
                    },
                    vocabulary: [
                        { term: 'work-life balance', pronunciation: '/wɜːk laɪf ˈbæləns/', vietnamese: 'sự cân bằng giữa công việc và cuộc sống' },
                        { term: 'flexible working hours', pronunciation: '/ˈfleksəbl ˈwɜːkɪŋ ˈaʊəz/', vietnamese: 'giờ làm việc linh hoạt' },
                        { term: 'quality time', pronunciation: '/ˈkwɒləti taɪm/', vietnamese: 'thời gian chất lượng (dành cho gia đình)' },
                        { term: 'dual-income family', pronunciation: '/ˈdjuːəl ˈɪnkʌm ˈfæməli/', vietnamese: 'gia đình có hai nguồn thu nhập' },
                        { term: 'gender equality', pronunciation: '/ˈdʒendə(r) iˈkwɒləti/', vietnamese: 'bình đẳng giới' },
                        { term: 'traditional roles', pronunciation: '/trəˈdɪʃənl rəʊlz/', vietnamese: 'vai trò truyền thống' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Pre-Listening Preparation', 
                            description: { 
                                en: [
                                    'Warm-up discussion: How has family life changed in the past 20 years in Vietnam?',
                                    'Vocabulary prediction: Look at key words (work-life balance, flexible hours, gender equality). What do you think the listening will be about?',
                                    'Preview questions: Read the questions you will answer while listening to prepare your mind'
                                ], 
                                vi: [
                                    'Thảo luận khởi động: Cuộc sống gia đình đã thay đổi như thế nào trong 20 năm qua ở Việt Nam?',
                                    'Dự đoán từ vựng: Nhìn vào các từ khóa (cân bằng công việc-cuộc sống, giờ làm linh hoạt, bình đẳng giới). Bạn nghĩ bài nghe sẽ nói về điều gì?',
                                    'Xem trước câu hỏi: Đọc các câu hỏi bạn sẽ trả lời trong khi nghe để chuẩn bị tâm lý'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Listening Tasks', 
                            description: { 
                                en: [
                                    'First listening: Listen for gist. What is the main topic of the talk show? Who are the speakers?',
                                    'Second listening: Listen and complete notes about each speaker\'s views on family responsibilities',
                                    'Third listening: Listen for specific information. Answer True/False/Not Given questions',
                                    'Gap-fill exercise: Listen and complete the summary with missing words',
                                    'Multiple choice: Choose the best answer for questions about detailed information'
                                ], 
                                vi: [
                                    'Nghe lần 1: Nghe để nắm ý chính. Chủ đề chính của talk show là gì? Người nói là ai?',
                                    'Nghe lần 2: Nghe và hoàn thành ghi chú về quan điểm của từng người nói về trách nhiệm gia đình',
                                    'Nghe lần 3: Nghe để tìm thông tin cụ thể. Trả lời câu hỏi Đúng/Sai/Không đề cập',
                                    'Điền từ: Nghe và hoàn thành bản tóm tắt với các từ còn thiếu',
                                    'Trắc nghiệm: Chọn đáp án đúng nhất cho các câu hỏi về thông tin chi tiết'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Listening Discussion', 
                            description: { 
                                en: [
                                    'Compare answers in pairs and discuss any differences',
                                    'Discussion: Whose opinion in the listening do you agree with most? Why?',
                                    'Critical thinking: What are the challenges for families trying to achieve work-life balance in Vietnam?',
                                    'Extension: Role-play a similar talk show in groups of 3-4, discussing modern family issues'
                                ], 
                                vi: [
                                    'So sánh câu trả lời theo cặp và thảo luận về bất kỳ sự khác biệt nào',
                                    'Thảo luận: Bạn đồng ý nhất với ý kiến của ai trong bài nghe? Tại sao?',
                                    'Tư duy phê phán: Những thách thức nào mà các gia đình gặp phải khi cố gắng đạt được sự cân bằng công việc-cuộc sống ở Việt Nam?',
                                    'Mở rộng: Đóng vai một talk show tương tự theo nhóm 3-4 người, thảo luận về các vấn đề gia đình hiện đại'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100106,
                    day: 6,
                    title: { en: 'Writing: Describing Family Routines', vi: 'Viết: Mô tả thói quen gia đình' },
                    aims: { 
                        en: [
                            'Learn how to write a well-organized paragraph about family routines',
                            'Practice using topic sentences, supporting sentences, and concluding sentences',
                            'Use time sequencers and linking words effectively',
                            'Apply present simple tense correctly when describing routines and habits'
                        ], 
                        vi: [
                            'Học cách viết một đoạn văn có tổ chức tốt về thói quen gia đình',
                            'Thực hành sử dụng câu chủ đề, câu hỗ trợ và câu kết luận',
                            'Sử dụng các từ nối thời gian và từ nối một cách hiệu quả',
                            'Áp dụng thì hiện tại đơn một cách chính xác khi mô tả hoạt động thường xuyên và thói quen'
                        ] 
                    },
                    vocabulary: [
                        { term: 'routine', pronunciation: '/ruːˈtiːn/', vietnamese: 'thói quen, hoạt động thường nhật' },
                        { term: 'first/firstly', pronunciation: '/fɜːst ˈfɜːstli/', vietnamese: 'đầu tiên, thứ nhất' },
                        { term: 'then/next/after that', pronunciation: '/ðen nekst ˈɑːftə(r) ðæt/', vietnamese: 'sau đó, tiếp theo' },
                        { term: 'finally/lastly', pronunciation: '/ˈfaɪnəli ˈlɑːstli/', vietnamese: 'cuối cùng' },
                        { term: 'in addition/moreover/furthermore', pronunciation: '', vietnamese: 'thêm vào đó, hơn nữa' },
                        { term: 'as a result', pronunciation: '/æz ə rɪˈzʌlt/', vietnamese: 'kết quả là' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Model Analysis', 
                            description: { 
                                en: [
                                    'Read a model paragraph about a family\'s daily routine',
                                    'Identify the three parts: Topic sentence (introduces the main idea), Supporting sentences (give details and examples), Concluding sentence (summarizes or gives final thought)',
                                    'Underline time sequencers and linking words in the model',
                                    'Analyze: How does the writer organize information (chronologically/by person/by activity)?'
                                ], 
                                vi: [
                                    'Đọc một đoạn văn mẫu về hoạt động hàng ngày của một gia đình',
                                    'Xác định ba phần: Câu chủ đề (giới thiệu ý chính), Câu hỗ trợ (đưa ra chi tiết và ví dụ), Câu kết luận (tóm tắt hoặc đưa ra suy nghĩ cuối cùng)',
                                    'Gạch chân các từ nối thời gian và từ nối trong mẫu',
                                    'Phân tích: Người viết tổ chức thông tin như thế nào (theo thời gian/theo người/theo hoạt động)?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Pre-Writing', 
                            description: { 
                                en: [
                                    'Brainstorming: Make notes about your family\'s daily/weekly routines',
                                    'Organizing: Complete a mind map or outline with: Morning routines, Afternoon routines, Evening routines, Weekend routines',
                                    'Language preparation: Write down useful phrases and time expressions you will need',
                                    'Peer discussion: Share your ideas with a partner and get feedback'
                                ], 
                                vi: [
                                    'Động não: Ghi chú về thói quen hàng ngày/hàng tuần của gia đình bạn',
                                    'Tổ chức: Hoàn thành sơ đồ tư duy hoặc dàn ý với: Thói quen buổi sáng, Thói quen buổi chiều, Thói quen buổi tối, Thói quen cuối tuần',
                                    'Chuẩn bị ngôn ngữ: Viết ra các cụm từ hữu ích và cách diễn đạt thời gian bạn sẽ cần',
                                    'Thảo luận với bạn: Chia sẻ ý tưởng của bạn với một bạn cùng lớp và nhận phản hồi'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Writing', 
                            description: { 
                                en: [
                                    'Write your first draft (120-150 words) about your family\'s routines',
                                    'Remember to include: - A clear topic sentence - At least 5-6 supporting sentences with specific details - A concluding sentence',
                                    'Use present simple tense throughout',
                                    'Include time sequencers (first, then, after that, finally) and other linking words'
                                ], 
                                vi: [
                                    'Viết bản nháp đầu tiên (120-150 từ) về thói quen của gia đình bạn',
                                    'Nhớ bao gồm: - Một câu chủ đề rõ ràng - Ít nhất 5-6 câu hỗ trợ với các chi tiết cụ thể - Một câu kết luận',
                                    'Sử dụng thì hiện tại đơn xuyên suốt',
                                    'Bao gồm các từ nối thời gian (đầu tiên, sau đó, rồi, cuối cùng) và các từ nối khác'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Writing (Peer Editing)', 
                            description: { 
                                en: [
                                    'Exchange paragraphs with a partner and check: 1) Is there a clear topic sentence? 2) Are there enough supporting details? 3) Is the concluding sentence effective? 4) Are grammar and spelling correct? 5) Are linking words used appropriately?',
                                    'Give constructive feedback to your partner',
                                    'Revise your paragraph based on feedback',
                                    'Write a final draft and submit to teacher'
                                ], 
                                vi: [
                                    'Trao đổi đoạn văn với một bạn và kiểm tra: 1) Có câu chủ đề rõ ràng không? 2) Có đủ chi tiết hỗ trợ không? 3) Câu kết luận có hiệu quả không? 4) Ngữ pháp và chính tả có đúng không? 5) Từ nối có được sử dụng phù hợp không?',
                                    'Đưa ra phản hồi xây dựng cho bạn của bạn',
                                    'Sửa lại đoạn văn của bạn dựa trên phản hồi',
                                    'Viết bản hoàn chỉnh và nộp cho giáo viên'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100107,
                    day: 7,
                    title: { en: 'Culture Focus: Family Values Around the World', vi: 'Văn hóa: Giá trị gia đình trên thế giới' },
                    aims: { 
                        en: [
                            'Learn about family values and traditions in different cultures, especially in the UK',
                            'Compare and contrast family life in Vietnamese and British cultures',
                            'Develop cross-cultural awareness and respect for diversity',
                            'Discuss how globalization affects traditional family values'
                        ], 
                        vi: [
                            'Tìm hiểu về giá trị và truyền thống gia đình trong các nền văn hóa khác nhau, đặc biệt là ở Vương quốc Anh',
                            'So sánh và đối chiếu cuộc sống gia đình trong văn hóa Việt Nam và Anh',
                            'Phát triển nhận thức đa văn hóa và tôn trọng sự đa dạng',
                            'Thảo luận về cách toàn cầu hóa ảnh hưởng đến giá trị gia đình truyền thống'
                        ] 
                    },
                    vocabulary: [
                        { term: 'nuclear family', pronunciation: '/ˌnjuːkliə(r) ˈfæməli/', vietnamese: 'gia đình hạt nhân (cha mẹ và con)' },
                        { term: 'extended family', pronunciation: '/ɪkˌstendɪd ˈfæməli/', vietnamese: 'đại gia đình (bao gồm ông bà, cô dì chú bác)' },
                        { term: 'single-parent family', pronunciation: '/ˌsɪŋɡl ˈpeərənt ˈfæməli/', vietnamese: 'gia đình đơn thân' },
                        { term: 'value', pronunciation: '/ˈvæljuː/', vietnamese: 'giá trị' },
                        { term: 'tradition', pronunciation: '/trəˈdɪʃn/', vietnamese: 'truyền thống' },
                        { term: 'generation gap', pronunciation: '/ˌdʒenəˈreɪʃn ɡæp/', vietnamese: 'khoảng cách thế hệ' },
                        { term: 'cultural difference', pronunciation: '/ˈkʌltʃərəl ˈdɪfrəns/', vietnamese: 'sự khác biệt văn hóa' },
                        { term: 'respect for elders', pronunciation: '/rɪˈspekt fɔːr ˈeldəz/', vietnamese: 'tôn trọng người lớn tuổi' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Reading & Discussion', 
                            description: { 
                                en: [
                                    'Read a short text about family values in the UK (emphasis on independence, privacy, nuclear families)',
                                    'Answer comprehension questions about British family characteristics',
                                    'Complete a Venn diagram comparing Vietnamese and British family values (similarities and differences)',
                                    'Discussion: What surprised you most about British family life? What would be difficult for you to adapt to?'
                                ], 
                                vi: [
                                    'Đọc một bài ngắn về giá trị gia đình ở Vương quốc Anh (nhấn mạnh về sự độc lập, riêng tư, gia đình hạt nhân)',
                                    'Trả lời câu hỏi hiểu về đặc điểm gia đình Anh',
                                    'Hoàn thành biểu đồ Venn so sánh giá trị gia đình Việt Nam và Anh (điểm giống và khác)',
                                    'Thảo luận: Điều gì làm bạn ngạc nhiên nhất về cuộc sống gia đình Anh? Điều gì sẽ khó để bạn thích nghi?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Group Project', 
                            description: { 
                                en: [
                                    'Work in groups of 4: Research family values in another country (USA, Japan, India, or a country of your choice)',
                                    'Create a poster or presentation covering: - Family structure - Roles of family members - Important values - Typical routines - Special traditions',
                                    'Present your findings to the class',
                                    'Class discussion: What can we learn from other cultures about family life?'
                                ], 
                                vi: [
                                    'Làm việc theo nhóm 4 người: Nghiên cứu giá trị gia đình ở một quốc gia khác (Mỹ, Nhật Bản, Ấn Độ, hoặc một quốc gia bạn chọn)',
                                    'Tạo một áp phích hoặc bài thuyết trình bao gồm: - Cấu trúc gia đình - Vai trò của các thành viên gia đình - Các giá trị quan trọng - Thói quen điển hình - Truyền thống đặc biệt',
                                    'Trình bày kết quả của bạn trước lớp',
                                    'Thảo luận lớp: Chúng ta có thể học gì từ các nền văn hóa khác về cuộc sống gia đình?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Critical Thinking', 
                            description: { 
                                en: [
                                    'Discuss: How is Vietnamese family life changing due to globalization and modernization?',
                                    'Debate: Should Vietnamese families maintain traditional values or adopt more modern, Western approaches?',
                                    'Reflection: Write a short paragraph (80 words) about what family values are most important to you and why'
                                ], 
                                vi: [
                                    'Thảo luận: Cuộc sống gia đình Việt Nam đang thay đổi như thế nào do toàn cầu hóa và hiện đại hóa?',
                                    'Tranh luận: Các gia đình Việt Nam nên duy trì giá trị truyền thống hay áp dụng các cách tiếp cận hiện đại, phương Tây hơn?',
                                    'Suy ngẫm: Viết một đoạn ngắn (80 từ) về giá trị gia đình nào quan trọng nhất với bạn và tại sao'
                                ] 
                            } 
                        }
                    ]
                }
            ]
        },
        {
            id: 1002,
            title: { en: 'Unit 2: Humans and the Environment', vi: 'Bài 2: Con người và Môi trường' },
            lessons: [
                {
                    id: 100201,
                    day: 1,
                    title: { en: 'Getting Started: Our Impact on Earth', vi: 'Bắt đầu: Tác động của chúng ta lên Trái đất' },
                    aims: { 
                        en: [
                            'Introduce vocabulary related to environmental issues and human impact',
                            'Discuss different ways humans affect the environment',
                            'Raise awareness about personal responsibility for environmental protection',
                            'Practice expressing concerns and making suggestions about environmental problems'
                        ], 
                        vi: [
                            'Giới thiệu từ vựng liên quan đến các vấn đề môi trường và tác động của con người',
                            'Thảo luận các cách con người ảnh hưởng đến môi trường',
                            'Nâng cao nhận thức về trách nhiệm cá nhân trong việc bảo vệ môi trường',
                            'Thực hành bày tỏ mối quan ngại và đưa ra đề xuất về các vấn đề môi trường'
                        ] 
                    },
                    vocabulary: [
                        { term: 'environment', pronunciation: '/ɪnˈvaɪrənmənt/', vietnamese: 'môi trường' },
                        { term: 'pollution', pronunciation: '/pəˈluːʃn/', vietnamese: 'ô nhiễm' },
                        { term: 'waste', pronunciation: '/weɪst/', vietnamese: 'rác thải, chất thải' },
                        { term: 'damage', pronunciation: '/ˈdæmɪdʒ/', vietnamese: 'hư hại, thiệt hại' },
                        { term: 'protect', pronunciation: '/prəˈtekt/', vietnamese: 'bảo vệ' },
                        { term: 'destroy', pronunciation: '/dɪˈstrɔɪ/', vietnamese: 'phá hủy' },
                        { term: 'affect', pronunciation: '/əˈfekt/', vietnamese: 'ảnh hưởng' },
                        { term: 'harm', pronunciation: '/hɑːm/', vietnamese: 'gây hại' },
                        { term: 'wildlife', pronunciation: '/ˈwaɪldlaɪf/', vietnamese: 'động vật hoang dã' },
                        { term: 'deforestation', pronunciation: '/diːˌfɒrɪˈsteɪʃn/', vietnamese: 'nạn phá rừng' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Picture Description', 
                            description: { 
                                en: [
                                    'Look at pictures showing environmental problems (air pollution, plastic waste, deforestation, polluted rivers)',
                                    'Describe what you see in each picture using new vocabulary',
                                    'Discuss: Which problem is the most serious in your area? Why?'
                                ], 
                                vi: [
                                    'Nhìn vào các hình ảnh cho thấy các vấn đề môi trường (ô nhiễm không khí, rác thải nhựa, phá rừng, sông ô nhiễm)',
                                    'Mô tả những gì bạn thấy trong mỗi hình ảnh sử dụng từ vựng mới',
                                    'Thảo luận: Vấn đề nào nghiêm trọng nhất trong khu vực của bạn? Tại sao?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Listen and Read', 
                            description: { 
                                en: [
                                    'Listen to a conversation between two students discussing an environmental project',
                                    'Read along and identify environmental problems mentioned',
                                    'Answer questions: What actions do the students plan to take? Do you think their ideas will be effective?'
                                ], 
                                vi: [
                                    'Nghe một cuộc hội thoại giữa hai học sinh thảo luận về một dự án môi trường',
                                    'Đọc theo và xác định các vấn đề môi trường được đề cập',
                                    'Trả lời câu hỏi: Học sinh dự định thực hiện hành động gì? Bạn có nghĩ ý tưởng của họ sẽ hiệu quả không?'
                                ] 
                            } 
                        },
                        { 
                            type: 'Group Discussion', 
                            description: { 
                                en: [
                                    'In groups of 4: Brainstorm environmental problems you know about',
                                    'Choose the top 3 most urgent problems',
                                    'For each problem, suggest at least 2 solutions',
                                    'Present your group\'s ideas to the class'
                                ], 
                                vi: [
                                    'Theo nhóm 4 người: Động não các vấn đề môi trường mà bạn biết',
                                    'Chọn ra 3 vấn đề cấp bách nhất',
                                    'Với mỗi vấn đề, đề xuất ít nhất 2 giải pháp',
                                    'Trình bày ý tưởng của nhóm bạn trước lớp'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100202,
                    day: 2,
                    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
                    aims: { 
                        en: [
                            'Master pronunciation of consonant blends /kl/, /pl/, /gr/, and /pr/',
                            'Expand vocabulary related to environmental protection and green living',
                            'Learn to use "will" and "be going to" to talk about future plans and predictions',
                            'Understand and use passive voice to describe environmental processes'
                        ], 
                        vi: [
                            'Nắm vững cách phát âm các cụm phụ âm /kl/, /pl/, /gr/, và /pr/',
                            'Mở rộng vốn từ vựng liên quan đến bảo vệ môi trường và lối sống xanh',
                            'Học cách sử dụng "will" và "be going to" để nói về kế hoạch và dự đoán tương lai',
                            'Hiểu và sử dụng thể bị động để mô tả các quá trình môi trường'
                        ] 
                    },
                    vocabulary: [
                        { term: 'carbon footprint', pronunciation: '/ˈkɑːbən ˈfʊtprɪnt/', vietnamese: 'dấu chân carbon, lượng khí thải carbon' },
                        { term: 'eco-friendly', pronunciation: '/ˌiːkəʊ ˈfrendli/', vietnamese: 'thân thiện với môi trường' },
                        { term: 'recycle', pronunciation: '/ˌriːˈsaɪkl/', vietnamese: 'tái chế' },
                        { term: 'reuse', pronunciation: '/ˌriːˈjuːz/', vietnamese: 'tái sử dụng' },
                        { term: 'reduce', pronunciation: '/rɪˈdjuːs/', vietnamese: 'giảm thiểu' },
                        { term: 'conserve', pronunciation: '/kənˈsɜːv/', vietnamese: 'bảo tồn' },
                        { term: 'renewable energy', pronunciation: '/rɪˌnjuːəbl ˈenədʒi/', vietnamese: 'năng lượng tái tạo' },
                        { term: 'solar power', pronunciation: '/ˈsəʊlə(r) ˈpaʊə(r)/', vietnamese: 'năng lượng mặt trời' },
                        { term: 'global warming', pronunciation: '/ˌɡləʊbl ˈwɔːmɪŋ/', vietnamese: 'sự nóng lên toàn cầu' },
                        { term: 'greenhouse gas', pronunciation: '/ˈɡriːnhaʊs ɡæs/', vietnamese: 'khí nhà kính' },
                        { term: 'climate change', pronunciation: '/ˈklaɪmət tʃeɪndʒ/', vietnamese: 'biến đổi khí hậu' },
                        { term: 'sustainable', pronunciation: '/səˈsteɪnəbl/', vietnamese: 'bền vững' },
                        { term: 'biodegradable', pronunciation: '/ˌbaɪəʊdɪˈɡreɪdəbl/', vietnamese: 'có thể phân hủy sinh học' },
                        { term: 'disposable', pronunciation: '/dɪˈspəʊzəbl/', vietnamese: 'dùng một lần' }
                    ],
                    grammar: [
                        {
                            title: { en: 'Future with "will" for Predictions and Spontaneous Decisions', vi: 'Tương lai với "will" cho dự đoán và quyết định tức thời' },
                            explanation: { 
                                en: [
                                    'Use: We use "will" for predictions about the future and decisions made at the moment of speaking.',
                                    'Form: Subject + will + V(base form)',
                                    'Predictions: - Global warming will affect millions of people. - Polar ice caps will melt if temperatures continue to rise.',
                                    'Spontaneous decisions: - I\'ll turn off the lights. - Don\'t worry, I\'ll help you recycle those bottles.',
                                    'Negative: will not = won\'t'
                                ], 
                                vi: [
                                    'Cách dùng: Chúng ta dùng "will" cho dự đoán về tương lai và quyết định được đưa ra ngay tại thời điểm nói.',
                                    'Cấu trúc: Chủ ngữ + will + Động từ (nguyên mẫu)',
                                    'Dự đoán: - Sự nóng lên toàn cầu sẽ ảnh hưởng đến hàng triệu người. - Băng vùng cực sẽ tan chảy nếu nhiệt độ tiếp tục tăng.',
                                    'Quyết định tức thời: - Tôi sẽ tắt đèn. - Đừng lo, tôi sẽ giúp bạn tái chế những chai này.',
                                    'Phủ định: will not = won\'t'
                                ] 
                            }
                        },
                        {
                            title: { en: 'Future with "be going to" for Plans and Intentions', vi: 'Tương lai với "be going to" cho kế hoạch và dự định' },
                            explanation: { 
                                en: [
                                    'Use: We use "be going to" for plans, intentions, and predictions based on present evidence.',
                                    'Form: Subject + am/is/are + going to + V(base form)',
                                    'Plans/Intentions: - We are going to organize a clean-up campaign next month. - I\'m going to reduce my carbon footprint.',
                                    'Predictions based on evidence: - Look at those dark clouds! It\'s going to rain. - The river is so polluted. Many fish are going to die.',
                                    'Negative: am/is/are + not + going to'
                                ], 
                                vi: [
                                    'Cách dùng: Chúng ta dùng "be going to" cho kế hoạch, dự định, và dự đoán dựa trên bằng chứng hiện tại.',
                                    'Cấu trúc: Chủ ngữ + am/is/are + going to + Động từ (nguyên mẫu)',
                                    'Kế hoạch/Dự định: - Chúng tôi sẽ tổ chức một chiến dịch dọn dẹp vào tháng tới. - Tôi sẽ giảm lượng khí thải carbon của mình.',
                                    'Dự đoán dựa trên bằng chứng: - Nhìn những đám mây đen kìa! Trời sắp mưa. - Con sông ô nhiễm quá. Nhiều cá sẽ chết.',
                                    'Phủ định: am/is/are + not + going to'
                                ] 
                            }
                        },
                        {
                            title: { en: 'The Passive Voice', vi: 'Thể bị động' },
                            explanation: { 
                                en: [
                                    'Use: We use the passive when we focus on the action or the person/thing affected, not who does it.',
                                    'Form: Subject + be + past participle (+ by + agent)',
                                    'Examples: - Forests are destroyed every day. (Present simple passive) - Plastic bottles can be recycled. (Modal passive) - The air is polluted by car emissions. (Agent mentioned)',
                                    'When to use: - When the doer is unknown, unimportant, or obvious - In formal or scientific writing - To emphasize the action or the receiver',
                                    'Note: Only transitive verbs (verbs that take an object) can be made passive.'
                                ], 
                                vi: [
                                    'Cách dùng: Chúng ta dùng thể bị động khi tập trung vào hành động hoặc người/vật bị tác động, không phải ai thực hiện nó.',
                                    'Cấu trúc: Chủ ngữ + be + quá khứ phân từ (+ by + người thực hiện)',
                                    'Ví dụ: - Rừng bị phá hủy mỗi ngày. (Bị động thì hiện tại đơn) - Chai nhựa có thể được tái chế. (Bị động với động từ khuyết thiếu) - Không khí bị ô nhiễm bởi khí thải xe hơi. (Đề cập người thực hiện)',
                                    'Khi nào dùng: - Khi người thực hiện không rõ, không quan trọng, hoặc hiển nhiên - Trong văn viết trang trọng hoặc khoa học - Để nhấn mạnh hành động hoặc người/vật nhận tác động',
                                    'Lưu ý: Chỉ động từ ngoại động (động từ có tân ngữ) mới có thể chuyển sang bị động.'
                                ] 
                            }
                        }
                    ],
                    activities: [
                        { 
                            type: 'Pronunciation Practice', 
                            description: { 
                                en: [
                                    'Listen and repeat words with /kl/: clean, climate, class, clear, clap',
                                    'Listen and repeat words with /pl/: plant, plastic, planet, please, play',
                                    'Listen and repeat words with /gr/: green, grow, grass, great, group',
                                    'Listen and repeat words with /pr/: protect, problem, project, produce, prevent',
                                    'Practice sentences: "Please plant green trees to protect our planet." / "We need to prevent climate problems and produce clean energy."'
                                ], 
                                vi: [
                                    'Nghe và lặp lại các từ có /kl/: clean, climate, class, clear, clap',
                                    'Nghe và lặp lại các từ có /pl/: plant, plastic, planet, please, play',
                                    'Nghe và lặp lại các từ có /gr/: green, grow, grass, great, group',
                                    'Nghe và lặp lại các từ có /pr/: protect, problem, project, produce, prevent',
                                    'Luyện các câu: "Hãy trồng cây xanh để bảo vệ hành tinh của chúng ta." / "Chúng ta cần ngăn chặn các vấn đề khí hậu và sản xuất năng lượng sạch."'
                                ] 
                            } 
                        },
                        { 
                            type: 'Vocabulary Exercises', 
                            description: { 
                                en: [
                                    'Match environmental terms with their definitions',
                                    'Complete sentences using words from the vocabulary list',
                                    'Word association: Group words into categories (Problems / Solutions / Energy types)',
                                    'Create your own sentences using 5 new words'
                                ], 
                                vi: [
                                    'Nối các thuật ngữ môi trường với định nghĩa của chúng',
                                    'Hoàn thành các câu sử dụng từ trong danh sách từ vựng',
                                    'Liên kết từ: Nhóm các từ thành các danh mục (Vấn đề / Giải pháp / Loại năng lượng)',
                                    'Tạo câu của riêng bạn sử dụng 5 từ mới'
                                ] 
                            } 
                        },
                        { 
                            type: 'Grammar Practice', 
                            description: { 
                                en: [
                                    'Exercise 1: Complete sentences with "will" or "be going to"',
                                    'Exercise 2: Make predictions about the environment in 50 years using "will"',
                                    'Exercise 3: Change active sentences to passive voice',
                                    'Exercise 4: Write 5 sentences about environmental problems using passive voice',
                                    'Exercise 5: Describe your plans to help the environment using "be going to"'
                                ], 
                                vi: [
                                    'Bài tập 1: Hoàn thành các câu với "will" hoặc "be going to"',
                                    'Bài tập 2: Đưa ra dự đoán về môi trường sau 50 năm sử dụng "will"',
                                    'Bài tập 3: Chuyển các câu chủ động sang thể bị động',
                                    'Bài tập 4: Viết 5 câu về các vấn đề môi trường sử dụng thể bị động',
                                    'Bài tập 5: Mô tả kế hoạch của bạn để giúp môi trường sử dụng "be going to"'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100203,
                    day: 3,
                    title: { en: 'Reading: Going Green - A Sustainable Lifestyle', vi: 'Đọc: Sống xanh - Lối sống bền vững' },
                    aims: { 
                        en: [
                            'Read and comprehend an article about green living and sustainable practices',
                            'Identify main ideas and supporting details in a text about environmental protection',
                            'Learn about practical ways to reduce environmental impact in daily life',
                            'Develop critical reading skills: making inferences and evaluating information'
                        ], 
                        vi: [
                            'Đọc và hiểu bài viết về lối sống xanh và các thực hành bền vững',
                            'Xác định ý chính và chi tiết hỗ trợ trong văn bản về bảo vệ môi trường',
                            'Tìm hiểu về các cách thực tế để giảm tác động môi trường trong đời sống hàng ngày',
                            'Phát triển kỹ năng đọc phê phán: suy luận và đánh giá thông tin'
                        ] 
                    },
                    vocabulary: [
                        { term: 'sustainable', pronunciation: '/səˈsteɪnəbl/', vietnamese: 'bền vững' },
                        { term: 'lifestyle', pronunciation: '/ˈlaɪfstaɪl/', vietnamese: 'lối sống' },
                        { term: 'consume', pronunciation: '/kənˈsjuːm/', vietnamese: 'tiêu thụ' },
                        { term: 'minimize', pronunciation: '/ˈmɪnɪmaɪz/', vietnamese: 'giảm thiểu' },
                        { term: 'alternative', pronunciation: '/ɔːlˈtɜːnətɪv/', vietnamese: 'thay thế, lựa chọn khác' },
                        { term: 'impact', pronunciation: '/ˈɪmpækt/', vietnamese: 'tác động' },
                        { term: 'awareness', pronunciation: '/əˈweənəs/', vietnamese: 'nhận thức' },
                        { term: 'adopt', pronunciation: '/əˈdɒpt/', vietnamese: 'áp dụng, chấp nhận' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Pre-Reading', 
                            description: { 
                                en: [
                                    'Quick survey: How "green" are you? Rate yourself on a scale of 1-10',
                                    'Look at the title and subheadings: What aspects of green living do you think will be covered?',
                                    'Predict: What are 3 ways people can live more sustainably?'
                                ], 
                                vi: [
                                    'Khảo sát nhanh: Bạn "xanh" đến mức nào? Đánh giá bản thân trên thang 1-10',
                                    'Nhìn vào tiêu đề và tiêu đề phụ: Bạn nghĩ những khía cạnh nào của lối sống xanh sẽ được đề cập?',
                                    'Dự đoán: 3 cách mà mọi người có thể sống bền vững hơn là gì?'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Reading', 
                            description: { 
                                en: [
                                    'Skim the article: How many main suggestions for green living does the author make?',
                                    'Scan for specific information: Complete a table with "Action", "Benefit", and "How to do it"',
                                    'Read for detail: Answer comprehension questions (multiple choice, True/False, short answer)',
                                    'Vocabulary in context: Guess the meaning of highlighted words from context',
                                    'Text organization: Number the paragraphs and identify the purpose of each (introduction, suggestion 1, suggestion 2, etc.)'
                                ], 
                                vi: [
                                    'Đọc lướt bài viết: Tác giả đưa ra bao nhiêu đề xuất chính cho lối sống xanh?',
                                    'Quét tìm thông tin cụ thể: Hoàn thành bảng với "Hành động", "Lợi ích", và "Cách thực hiện"',
                                    'Đọc kỹ: Trả lời câu hỏi hiểu (trắc nghiệm, Đúng/Sai, trả lời ngắn)',
                                    'Từ vựng trong ngữ cảnh: Đoán nghĩa của các từ được đánh dấu từ ngữ cảnh',
                                    'Cấu trúc bài viết: Đánh số các đoạn văn và xác định mục đích của mỗi đoạn (giới thiệu, đề xuất 1, đề xuất 2, v.v.)'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Reading', 
                            description: { 
                                en: [
                                    'Discussion: Which suggestions from the article do you already follow? Which ones would be easy/difficult for you to adopt?',
                                    'Critical thinking: The article mentions several benefits of green living. Do you think there are any disadvantages? What are they?',
                                    'Personal reflection: Choose 3 green actions you will commit to doing from now on. Share with the class.',
                                    'Extension activity: Research one green living tip not mentioned in the article and present it to your group'
                                ], 
                                vi: [
                                    'Thảo luận: Đề xuất nào từ bài viết mà bạn đã làm theo? Đề xuất nào sẽ dễ/khó để bạn áp dụng?',
                                    'Tư duy phê phán: Bài viết đề cập đến một số lợi ích của lối sống xanh. Bạn có nghĩ có bất kỳ nhược điểm nào không? Là gì?',
                                    'Suy ngẫm cá nhân: Chọn 3 hành động xanh mà bạn sẽ cam kết thực hiện từ giờ. Chia sẻ với lớp.',
                                    'Hoạt động mở rộng: Nghiên cứu một mẹo sống xanh không được đề cập trong bài viết và trình bày với nhóm của bạn'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100204,
                    day: 4,
                    title: { en: 'Speaking: Promoting a Greener Lifestyle', vi: 'Nói: Thúc đẩy lối sống xanh hơn' },
                    aims: { 
                        en: [
                            'Discuss practical ways to protect the environment in daily life',
                            'Practice making suggestions and recommendations using appropriate language',
                            'Develop persuasive speaking skills to encourage others to live sustainably',
                            'Collaborate in groups to create an environmental action plan'
                        ], 
                        vi: [
                            'Thảo luận các cách thực tế để bảo vệ môi trường trong đời sống hàng ngày',
                            'Thực hành đưa ra đề xuất và khuyến nghị sử dụng ngôn ngữ phù hợp',
                            'Phát triển kỹ năng nói thuyết phục để khuyến khích người khác sống bền vững',
                            'Hợp tác trong nhóm để tạo ra một kế hoạch hành động môi trường'
                        ] 
                    },
                    vocabulary: [
                        { term: 'We should/ought to...', pronunciation: '/wi ʃʊd ɔːt tuː/', vietnamese: 'Chúng ta nên...' },
                        { term: 'How about...? / What about...?', pronunciation: '/haʊ əˈbaʊt wɒt əˈbaʊt/', vietnamese: 'Còn về... thì sao? / ...thì sao?' },
                        { term: 'Why don\'t we...?', pronunciation: '/waɪ dəʊnt wiː/', vietnamese: 'Tại sao chúng ta không...?' },
                        { term: 'It would be a good idea to...', pronunciation: '', vietnamese: 'Sẽ là một ý tưởng tốt để...' },
                        { term: 'I suggest/recommend...', pronunciation: '/aɪ səˈdʒest rekəˈmend/', vietnamese: 'Tôi đề xuất/khuyến nghị...' },
                        { term: 'One way to... is to...', pronunciation: '', vietnamese: 'Một cách để... là...' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Useful Language', 
                            description: { 
                                en: [
                                    'Learn phrases for making suggestions: We should..., Why don\'t we...?, How about...?, Let\'s...',
                                    'Learn phrases for giving advice: I think you/we ought to..., It would be better if..., My suggestion is...',
                                    'Learn phrases for persuading: This is important because..., Think about..., We can\'t ignore...',
                                    'Practice intonation for making suggestions (rising tone for questions, falling tone for statements)'
                                ], 
                                vi: [
                                    'Học các cụm từ để đưa ra đề xuất: Chúng ta nên..., Tại sao chúng ta không...?, Còn...?, Hãy...',
                                    'Học các cụm từ để đưa ra lời khuyên: Tôi nghĩ bạn/chúng ta nên..., Sẽ tốt hơn nếu..., Đề xuất của tôi là...',
                                    'Học các cụm từ để thuyết phục: Điều này quan trọng vì..., Hãy nghĩ về..., Chúng ta không thể phớt lờ...',
                                    'Thực hành ngữ điệu khi đưa ra đề xuất (giọng lên cho câu hỏi, giọng xuống cho câu trần thuật)'
                                ] 
                            } 
                        },
                        { 
                            type: 'Controlled Practice', 
                            description: { 
                                en: [
                                    'Task 1: Look at environmental problems. Make suggestions using different structures (should, why don\'t we, how about, etc.)',
                                    'Task 2: Complete dialogues where people discuss eco-friendly actions',
                                    'Task 3: Match problems with appropriate solutions and practice suggesting them'
                                ], 
                                vi: [
                                    'Bài tập 1: Nhìn vào các vấn đề môi trường. Đưa ra đề xuất sử dụng các cấu trúc khác nhau (should, why don\'t we, how about, v.v.)',
                                    'Bài tập 2: Hoàn thành các đoạn hội thoại nơi mọi người thảo luận về các hành động thân thiện với môi trường',
                                    'Bài tập 3: Nối các vấn đề với giải pháp phù hợp và thực hành đề xuất chúng'
                                ] 
                            } 
                        },
                        { 
                            type: 'Freer Practice', 
                            description: { 
                                en: [
                                    'Pair work: Student A is concerned about plastic waste. Student B suggests ways to reduce plastic use. Then switch roles with another problem.',
                                    'Group discussion: "Green School Initiative" - In groups of 4, brainstorm ways to make your school more environmentally friendly. Consider: waste management, energy saving, transportation, green spaces.',
                                    'Presentation: Each group presents their top 3 suggestions to the class. Use persuasive language and explain why each idea is important.',
                                    'Class vote: Choose the best ideas to present to the school principal'
                                ], 
                                vi: [
                                    'Làm việc theo cặp: Học sinh A lo ngại về rác thải nhựa. Học sinh B đề xuất các cách giảm sử dụng nhựa. Sau đó đổi vai với một vấn đề khác.',
                                    'Thảo luận nhóm: "Sáng kiến Trường học Xanh" - Theo nhóm 4 người, động não các cách để làm cho trường học của bạn thân thiện với môi trường hơn. Xem xét: quản lý rác thải, tiết kiệm năng lượng, giao thông, không gian xanh.',
                                    'Thuyết trình: Mỗi nhóm trình bày 3 đề xuất hàng đầu của họ trước lớp. Sử dụng ngôn ngữ thuyết phục và giải thích tại sao mỗi ý tưởng quan trọng.',
                                    'Bỏ phiếu lớp: Chọn những ý tưởng tốt nhất để trình bày với hiệu trưởng'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100205,
                    day: 5,
                    title: { en: 'Listening: Understanding Your Carbon Footprint', vi: 'Nghe: Hiểu về dấu chân carbon của bạn' },
                    aims: { 
                        en: [
                            'Listen to an informative talk about carbon footprints and climate change',
                            'Practice listening for main ideas, specific details, and numerical information',
                            'Understand explanations and descriptions of environmental concepts',
                            'Take effective notes while listening to complex information'
                        ], 
                        vi: [
                            'Nghe một bài nói chuyện thông tin về dấu chân carbon và biến đổi khí hậu',
                            'Thực hành nghe để tìm ý chính, chi tiết cụ thể và thông tin số liệu',
                            'Hiểu các giải thích và mô tả về các khái niệm môi trường',
                            'Ghi chú hiệu quả khi nghe thông tin phức tạp'
                        ] 
                    },
                    vocabulary: [
                        { term: 'carbon footprint', pronunciation: '/ˈkɑːbən ˈfʊtprɪnt/', vietnamese: 'dấu chân carbon' },
                        { term: 'calculate', pronunciation: '/ˈkælkjuleɪt/', vietnamese: 'tính toán' },
                        { term: 'emission', pronunciation: '/ɪˈmɪʃn/', vietnamese: 'khí thải, phát thải' },
                        { term: 'transportation', pronunciation: '/ˌtrænspɔːˈteɪʃn/', vietnamese: 'giao thông vận tải' },
                        { term: 'consumption', pronunciation: '/kənˈsʌmpʃn/', vietnamese: 'tiêu thụ' },
                        { term: 'offset', pronunciation: '/ˈɒfset/', vietnamese: 'bù đắp, bù trừ' },
                        { term: 'household', pronunciation: '/ˈhaʊshəʊld/', vietnamese: 'hộ gia đình' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Pre-Listening', 
                            description: { 
                                en: [
                                    'Brainstorm: What do you know about "carbon footprint"? What activities do you think contribute to it?',
                                    'Vocabulary pre-teach: Learn key terms that will appear in the listening',
                                    'Prediction: Look at a diagram of carbon footprint categories (transport, food, energy, etc.). Guess which one contributes most.'
                                ], 
                                vi: [
                                    'Động não: Bạn biết gì về "dấu chân carbon"? Bạn nghĩ những hoạt động nào góp phần vào nó?',
                                    'Dạy trước từ vựng: Học các thuật ngữ chính sẽ xuất hiện trong bài nghe',
                                    'Dự đoán: Nhìn vào một biểu đồ về các danh mục dấu chân carbon (giao thông, thức ăn, năng lượng, v.v.). Đoán danh mục nào đóng góp nhiều nhất.'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Listening', 
                            description: { 
                                en: [
                                    'First listening: Listen for gist. What is the main message of the talk? What tone does the speaker use (serious, optimistic, alarming)?',
                                    'Second listening: Listen and complete notes on "What is a carbon footprint?" and "Main sources of carbon emissions"',
                                    'Third listening: Listen for specific numbers. Complete a fact sheet with statistics mentioned',
                                    'Gap-fill: Listen and complete a summary of how to calculate and reduce your carbon footprint',
                                    'True/False/Not Given: Answer questions about detailed information from the talk'
                                ], 
                                vi: [
                                    'Nghe lần 1: Nghe để nắm ý chính. Thông điệp chính của bài nói là gì? Người nói sử dụng giọng điệu gì (nghiêm túc, lạc quan, đáng lo ngại)?',
                                    'Nghe lần 2: Nghe và hoàn thành ghi chú về "Dấu chân carbon là gì?" và "Nguồn phát thải carbon chính"',
                                    'Nghe lần 3: Nghe để tìm các con số cụ thể. Hoàn thành bảng thông tin với các số liệu thống kê được đề cập',
                                    'Điền từ: Nghe và hoàn thành bản tóm tắt về cách tính toán và giảm dấu chân carbon của bạn',
                                    'Đúng/Sai/Không đề cập: Trả lời câu hỏi về thông tin chi tiết từ bài nói'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Listening', 
                            description: { 
                                en: [
                                    'Check answers in pairs and discuss any difficulties',
                                    'Discussion: Were you surprised by any information in the talk? What surprised you most?',
                                    'Application: Use an online carbon footprint calculator (teacher provides link) to estimate your personal carbon footprint. Share results in groups.',
                                    'Action plan: Based on what you learned, write down 3 specific actions you can take to reduce your carbon footprint. Commit to trying them for one month.'
                                ], 
                                vi: [
                                    'Kiểm tra đáp án theo cặp và thảo luận về bất kỳ khó khăn nào',
                                    'Thảo luận: Bạn có ngạc nhiên bởi bất kỳ thông tin nào trong bài nói không? Điều gì làm bạn ngạc nhiên nhất?',
                                    'Ứng dụng: Sử dụng máy tính dấu chân carbon trực tuyến (giáo viên cung cấp liên kết) để ước tính dấu chân carbon cá nhân của bạn. Chia sẻ kết quả trong nhóm.',
                                    'Kế hoạch hành động: Dựa trên những gì bạn học được, viết ra 3 hành động cụ thể bạn có thể thực hiện để giảm dấu chân carbon của mình. Cam kết thử chúng trong một tháng.'
                                ] 
                            } 
                        }
                    ]
                },
                {
                    id: 100206,
                    day: 6,
                    title: { en: 'Writing: A Problem-Solution Paragraph on Environmental Issues', vi: 'Viết: Đoạn văn vấn đề-giải pháp về các vấn đề môi trường' },
                    aims: { 
                        en: [
                            'Learn the structure of a problem-solution paragraph',
                            'Practice describing an environmental problem and proposing practical solutions',
                            'Use appropriate linking words to show cause-effect and solutions',
                            'Write a clear, coherent paragraph about reducing one\'s carbon footprint'
                        ], 
                        vi: [
                            'Học cấu trúc của đoạn văn vấn đề-giải pháp',
                            'Thực hành mô tả một vấn đề môi trường và đề xuất các giải pháp thực tế',
                            'Sử dụng các từ nối phù hợp để thể hiện nhân quả và giải pháp',
                            'Viết một đoạn văn rõ ràng, mạch lạc về việc giảm dấu chân carbon của một người'
                        ] 
                    },
                    vocabulary: [
                        { term: 'problem', pronunciation: '/ˈprɒbləm/', vietnamese: 'vấn đề' },
                        { term: 'solution', pronunciation: '/səˈluːʃn/', vietnamese: 'giải pháp' },
                        { term: 'because of / due to', pronunciation: '/bɪˈkɒz əv djuː tuː/', vietnamese: 'bởi vì, do' },
                        { term: 'as a result / therefore / consequently', pronunciation: '', vietnamese: 'kết quả là, do đó, do vậy' },
                        { term: 'to solve this problem', pronunciation: '', vietnamese: 'để giải quyết vấn đề này' },
                        { term: 'one solution is...', pronunciation: '', vietnamese: 'một giải pháp là...' },
                        { term: 'another way to... is...', pronunciation: '', vietnamese: 'cách khác để... là...' }
                    ],
                    grammar: [],
                    activities: [
                        { 
                            type: 'Model Analysis', 
                            description: { 
                                en: [
                                    'Read a model problem-solution paragraph about plastic pollution',
                                    'Identify the structure: 1) Topic sentence (introduces problem), 2) Problem description (causes & effects), 3) Solutions (2-3 solutions), 4) Concluding sentence',
                                    'Underline linking words showing: cause (because, due to), effect (as a result, therefore), and solutions (one solution, another way)',
                                    'Notice the use of passive voice and future tenses'
                                ], 
                                vi: [
                                    'Đọc một đoạn văn mẫu vấn đề-giải pháp về ô nhiễm nhựa',
                                    'Xác định cấu trúc: 1) Câu chủ đề (giới thiệu vấn đề), 2) Mô tả vấn đề (nguyên nhân & hậu quả), 3) Giải pháp (2-3 giải pháp), 4) Câu kết luận',
                                    'Gạch chân các từ nối thể hiện: nguyên nhân (because, due to), kết quả (as a result, therefore), và giải pháp (one solution, another way)',
                                    'Chú ý việc sử dụng thể bị động và các thì tương lai'
                                ] 
                            } 
                        },
                        { 
                            type: 'Pre-Writing', 
                            description: { 
                                en: [
                                    'Choose an environmental problem to write about (e.g., reducing carbon footprint, saving water, reducing food waste)',
                                    'Brainstorm using a problem-solution chart: Problem | Causes | Effects | Solutions (at least 3)',
                                    'Organize your ideas: Which solutions are most practical? Which should you mention first?',
                                    'Language preparation: List linking words and phrases you will use'
                                ], 
                                vi: [
                                    'Chọn một vấn đề môi trường để viết (ví dụ: giảm dấu chân carbon, tiết kiệm nước, giảm lãng phí thực phẩm)',
                                    'Động não sử dụng biểu đồ vấn đề-giải pháp: Vấn đề | Nguyên nhân | Hậu quả | Giải pháp (ít nhất 3)',
                                    'Tổ chức ý tưởng: Giải pháp nào thực tế nhất? Bạn nên đề cập đến giải pháp nào trước?',
                                    'Chuẩn bị ngôn ngữ: Liệt kê các từ và cụm từ nối bạn sẽ sử dụng'
                                ] 
                            } 
                        },
                        { 
                            type: 'While-Writing', 
                            description: { 
                                en: [
                                    'Write your first draft (150-180 words) following the structure: Topic sentence → Problem description (causes & effects) → Solutions (2-3) → Conclusion',
                                    'Use appropriate tenses: present simple for facts, present continuous/passive for current situations, future for predictions and suggestions',
                                    'Include linking words for: cause-effect (because, since, as a result), solutions (one way, another solution, finally), and adding information (moreover, in addition)',
                                    'Make sure each solution is clearly explained with enough detail'
                                ], 
                                vi: [
                                    'Viết bản nháp đầu tiên (150-180 từ) theo cấu trúc: Câu chủ đề → Mô tả vấn đề (nguyên nhân & hậu quả) → Giải pháp (2-3) → Kết luận',
                                    'Sử dụng các thì phù hợp: hiện tại đơn cho sự thật, hiện tại tiếp diễn/bị động cho các tình huống hiện tại, tương lai cho dự đoán và đề xuất',
                                    'Bao gồm các từ nối cho: nhân quả (because, since, as a result), giải pháp (one way, another solution, finally), và thêm thông tin (moreover, in addition)',
                                    'Đảm bảo mỗi giải pháp được giải thích rõ ràng với đủ chi tiết'
                                ] 
                            } 
                        },
                        { 
                            type: 'Post-Writing & Peer Editing', 
                            description: { 
                                en: [
                                    'Exchange paragraphs with a partner. Check: 1) Is the structure clear (problem → solutions)? 2) Are there at least 2-3 practical solutions? 3) Are linking words used correctly? 4) Are grammar and spelling correct?',
                                    'Use a checklist to evaluate each other\'s work',
                                    'Discuss improvements with your partner',
                                    'Revise your paragraph based on feedback and write a final draft'
                                ], 
                                vi: [
                                    'Trao đổi đoạn văn với một bạn. Kiểm tra: 1) Cấu trúc có rõ ràng không (vấn đề → giải pháp)? 2) Có ít nhất 2-3 giải pháp thực tế không? 3) Từ nối có được sử dụng đúng không? 4) Ngữ pháp và chính tả có đúng không?',
                                    'Sử dụng danh sách kiểm tra để đánh giá công việc của nhau',
                                    'Thảo luận về các cải tiến với bạn của bạn',
                                    'Sửa lại đoạn văn của bạn dựa trên phản hồi và viết bản hoàn chỉnh'
                                ] 
                            } 
                        }
                    ]
                }
            ]
        },
        {
            id: 1003,
            title: { en: 'Unit 3: Music', vi: 'Bài 3: Âm nhạc' },
            lessons: createLessonsForUnit(1003, [
                {
                    title: { en: 'Getting Started', vi: 'Bắt đầu' },
                    aims: { 
                        en: ['Discuss different types of music and their effects'], 
                        vi: ['Thảo luận về các thể loại âm nhạc khác nhau và tác dụng của chúng'] 
                    },
                    activities: ['Listen to different music clips and describe them']
                },
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice stress in two-syllable words', 'Learn music-related vocabulary', 'Use compound sentences, to-infinitives, and bare infinitives'], 
                        vi: ['Luyện tập trọng âm trong từ hai âm tiết', 'Học từ vựng liên quan đến âm nhạc', 'Sử dụng câu ghép, động từ nguyên mẫu có "to" và động từ nguyên mẫu không "to"'] 
                    },
                    vocabulary: ['genre', 'lyrics', 'melody', 'rhythm', 'performance', 'audience'],
                    grammar: ['Compound sentences', 'to-infinitives and bare infinitives'],
                    activities: ['Pronunciation practice: Stress in two-syllable words']
                },
                {
                    title: { en: 'Reading', vi: 'Đọc' },
                    aims: { 
                        en: ['Read about a famous TV music show'], 
                        vi: ['Đọc về một chương trình âm nhạc nổi tiếng trên TV'] 
                    },
                    activities: ['Read an article and identify key information']
                },
                {
                    title: { en: 'Speaking', vi: 'Nói' },
                    aims: { 
                        en: ['Talk about your favorite music show or artist'], 
                        vi: ['Nói về chương trình âm nhạc hoặc nghệ sĩ yêu thích của bạn'] 
                    },
                    activities: ['Prepare and give a short talk about a favorite artist']
                },
                {
                    title: { en: 'Listening', vi: 'Nghe' },
                    aims: { 
                        en: ['Listen to a conversation about planning to go to a concert'], 
                        vi: ['Nghe một cuộc hội thoại về việc lên kế hoạch đi xem hòa nhạc'] 
                    },
                     activities: ['Listen and fill in a schedule']
                },
                {
                    title: { en: 'Writing', vi: 'Viết' },
                    aims: { 
                        en: ['Write a review of a song or an album'], 
                        vi: ['Viết một bài đánh giá về một bài hát hoặc một album'] 
                    },
                    activities: ['Write a short music review']
                },
                {
                    title: { en: 'Culture/CLIL', vi: 'Văn hóa/CLIL' },
                    aims: { 
                        en: ['Learn about Chau van singing, a traditional Vietnamese music genre'], 
                        vi: ['Tìm hiểu về hát Chầu văn, một thể loại âm nhạc truyền thống của Việt Nam'] 
                    },
                    activities: ['Read a text and discuss the cultural significance of Chau van singing']
                }
            ])
        },
        {
            id: 1004,
            title: { en: 'Unit 4: For a Better Community', vi: 'Bài 4: Vì một cộng đồng tốt đẹp hơn' },
            lessons: createLessonsForUnit(1004, [
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Learn adjective suffixes', 'Practice sentence stress in two-syllable words with the same spelling', 'Use past simple vs. past continuous'], 
                        vi: ['Học các hậu tố tính từ', 'Luyện tập trọng âm câu trong các từ hai âm tiết cùng cách viết', 'Sử dụng thì quá khứ đơn và quá khứ tiếp diễn'] 
                    },
                    vocabulary: ['volunteer', 'community service', 'donate', 'charity', 'meaningful'],
                    grammar: ['Past simple vs. Past continuous with "when" and "while"'],
                    activities: ['Pronunciation: Sentence stress']
                },
                {
                    title: { en: 'Skills', vi: 'Kỹ năng' },
                    aims: { 
                        en: ['Read about community development projects', 'Practice expressing feelings', 'Listen to stories about volunteering', 'Write an application letter for a volunteer position'], 
                        vi: ['Đọc về các dự án phát triển cộng đồng', 'Luyện tập bày tỏ cảm xúc', 'Nghe những câu chuyện về tình nguyện', 'Viết thư xin việc cho một vị trí tình nguyện'] 
                    },
                     activities: ['Role-play a conversation expressing feelings about community work', 'Write a formal application letter']
                }
            ])
        },
        {
            id: 1005,
            title: { en: 'Unit 5: Inventions', vi: 'Bài 5: Các phát minh' },
            lessons: createLessonsForUnit(1005, [
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice stress in three-syllable nouns', 'Learn vocabulary about inventions', 'Use the present perfect, gerunds, and to-infinitives'], 
                        vi: ['Luyện tập trọng âm trong danh từ ba âm tiết', 'Học từ vựng về các phát minh', 'Sử dụng thì hiện tại hoàn thành, danh động từ và động từ nguyên mẫu có "to"'] 
                    },
                    vocabulary: ['invention', 'artificial intelligence (AI)', 'device', 'gadget', 'innovation'],
                    grammar: ['The present perfect', 'Gerunds and to-infinitives'],
                    activities: ['Pronunciation: Stress in three-syllable nouns']
                },
                {
                    title: { en: 'Skills & CLIL', vi: 'Kỹ năng & CLIL' },
                    aims: { 
                        en: ['Read about the uses of AI', 'Discuss a useful invention', 'Listen to a description of a new gadget', 'Write about the pros and cons of an invention', 'Learn about computer hardware'], 
                        vi: ['Đọc về các ứng dụng của AI', 'Thảo luận về một phát minh hữu ích', 'Nghe mô tả về một thiết bị mới', 'Viết về ưu và nhược điểm của một phát minh', 'Tìm hiểu về phần cứng máy tính'] 
                    },
                    activities: ['Group discussion on the most important invention', 'CLIL: Label parts of a computer']
                }
            ])
        },
        {
            id: 1006,
            title: { en: 'Unit 6: Gender Equality', vi: 'Bài 6: Bình đẳng giới' },
            lessons: createLessonsForUnit(1006, [
                 {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice stress in three-syllable adjectives and verbs', 'Learn vocabulary about gender equality', 'Use the passive voice with modals'], 
                        vi: ['Luyện tập trọng âm trong tính từ và động từ ba âm tiết', 'Học từ vựng về bình đẳng giới', 'Sử dụng thể bị động với động từ khiếm khuyết'] 
                    },
                    vocabulary: ['gender equality', 'empowerment', 'stereotype', 'opportunity', 'discrimination'],
                    grammar: ['The passive voice with modals'],
                    activities: ['Pronunciation: Stress in three-syllable adjectives and verbs']
                },
                {
                    title: { en: 'Skills', vi: 'Kỹ năng' },
                    aims: { 
                        en: ['Read about challenges in gender equality', 'Talk about career choices without gender stereotypes', 'Listen to a discussion on gender roles', 'Write an opinion essay on gender equality'], 
                        vi: ['Đọc về những thách thức trong bình đẳng giới', 'Nói về lựa chọn nghề nghiệp không có định kiến giới', 'Nghe một cuộc thảo luận về vai trò giới', 'Viết một bài luận bày tỏ quan điểm về bình đẳng giới'] 
                    },
                    activities: ['Debate on whether certain jobs are more suitable for men or women']
                }
            ])
        },
        {
            id: 1007,
            title: { en: 'Unit 7: Viet Nam and International Organisations', vi: 'Bài 7: Việt Nam và các tổ chức quốc tế' },
            lessons: createLessonsForUnit(1007, [
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice stress in words with more than three syllables', 'Learn vocabulary for international organizations', 'Use comparative and superlative adjectives'], 
                        vi: ['Luyện tập trọng âm trong từ có nhiều hơn ba âm tiết', 'Học từ vựng về các tổ chức quốc tế', 'Sử dụng tính từ so sánh hơn và so sánh nhất'] 
                    },
                    vocabulary: ['UNICEF', 'FAO', 'WHO', 'organisation', 'mission', 'support'],
                    grammar: ['Comparative and superlative adjectives'],
                    activities: ['Pronunciation: Stress in long words']
                },
                {
                    title: { en: 'Skills & CLIL', vi: 'Kỹ năng & CLIL' },
                    aims: { 
                        en: ['Read about UNICEF\'s work in Vietnam', 'Discuss the role of an international organization', 'Learn about the activities of the FAO'], 
                        vi: ['Đọc về công việc của UNICEF tại Việt Nam', 'Thảo luận về vai trò của một tổ chức quốc tế', 'Tìm hiểu về các hoạt động của FAO'] 
                    },
                    activities: ['Group project: Research and present about an international organisation']
                }
            ])
        },
        {
            id: 1008,
            title: { en: 'Unit 8: New Ways to Learn', vi: 'Bài 8: Những cách học mới' },
            lessons: createLessonsForUnit(1008, [
                 {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice sentence stress', 'Learn vocabulary about learning methods', 'Use defining and non-defining relative clauses'], 
                        vi: ['Luyện tập trọng âm câu', 'Học từ vựng về các phương pháp học tập', 'Sử dụng mệnh đề quan hệ xác định và không xác định'] 
                    },
                    vocabulary: ['online learning', 'blended learning', 'lifelong learning', 'digital tools', 'skill'],
                    grammar: ['Defining and non-defining relative clauses with who, that, which, whose'],
                    activities: ['Pronunciation: Sentence stress']
                },
                {
                    title: { en: 'Skills & CLIL', vi: 'Kỹ năng & CLIL' },
                    aims: { 
                        en: ['Discuss the pros and cons of online learning', 'Listen to a student talking about their learning experience', 'Write a paragraph about your preferred way of learning', 'Learn about modern schools'], 
                        vi: ['Thảo luận về ưu và nhược điểm của học trực tuyến', 'Nghe một học sinh nói về kinh nghiệm học tập của họ', 'Viết một đoạn văn về cách học ưa thích của bạn', 'Tìm hiểu về các trường học hiện đại'] 
                    },
                    activities: ['Debate: Online learning vs. Traditional learning']
                }
            ])
        },
        {
            id: 1009,
            title: { en: 'Unit 9: Protecting the Environment', vi: 'Bài 9: Bảo vệ môi trường' },
            lessons: createLessonsForUnit(1009, [
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice rhythm in sentences', 'Learn vocabulary for environmental problems and solutions', 'Use reported speech'], 
                        vi: ['Luyện tập nhịp điệu trong câu', 'Học từ vựng về các vấn đề và giải pháp môi trường', 'Sử dụng câu tường thuật'] 
                    },
                    vocabulary: ['deforestation', 'global warming', 'waste disposal', 'conservation', 'sustainable'],
                    grammar: ['Reported speech (statements, questions, commands)'],
                    activities: ['Pronunciation: Rhythm in sentences']
                },
                {
                    title: { en: 'Skills & CLIL', vi: 'Kỹ năng & CLIL' },
                    aims: { 
                        en: ['Read about an environmental campaign', 'Practice making and responding to apologies', 'Listen to a report on an environmental issue', 'Write a report suggesting solutions', 'Learn about Earth Hour'], 
                        vi: ['Đọc về một chiến dịch môi trường', 'Luyện tập đưa ra và đáp lại lời xin lỗi', 'Nghe một báo cáo về một vấn đề môi trường', 'Viết một báo cáo đề xuất giải pháp', 'Tìm hiểu về Giờ Trái đất'] 
                    },
                    activities: ['Role-play apologizing for an environmental mistake', 'CLIL: Plan an Earth Hour event for your school']
                }
            ])
        },
        {
            id: 1010,
            title: { en: 'Unit 10: Ecotourism', vi: 'Bài 10: Du lịch sinh thái' },
            lessons: createLessonsForUnit(1010, [
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice intonation', 'Learn vocabulary on ecotourism', 'Use conditional sentences (Type 1 and 2)'], 
                        vi: ['Luyện tập ngữ điệu', 'Học từ vựng về du lịch sinh thái', 'Sử dụng câu điều kiện (Loại 1 và 2)'] 
                    },
                    vocabulary: ['ecotourism', 'sustainable', 'conservation', 'biodiversity', 'eco-friendly', 'impact'],
                    grammar: ['Conditional sentences: Type 1 and 2'],
                    activities: ['Pronunciation: Intonation in conditional sentences']
                },
                {
                    title: { en: 'Skills & CLIL', vi: 'Kỹ năng & CLIL' },
                    aims: { 
                        en: ['Read about different ecotours', 'Discuss the impact of tourism on the environment', 'Listen to a tour guide explaining ecotourism principles', 'Write a leaflet promoting an ecotour'], 
                        vi: ['Đọc về các tour du lịch sinh thái khác nhau', 'Thảo luận về tác động của du lịch đối với môi trường', 'Nghe hướng dẫn viên du lịch giải thích các nguyên tắc du lịch sinh thái', 'Viết một tờ rơi quảng bá một tour du lịch sinh thái'] 
                    },
                    activities: ['Design an itinerary for a local ecotour']
                }
            ])
        }
    ]
};
