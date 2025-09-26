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
            lessons: createLessonsForUnit(1001, [
                {
                    title: { en: 'Getting Started', vi: 'Bắt đầu' },
                    aims: { 
                        en: ['Introduce the topic of family life and household chores'], 
                        vi: ['Giới thiệu chủ đề cuộc sống gia đình và công việc nhà'] 
                    },
                    activities: ['Listen and read a conversation about household chores', 'Practice talking about family life']
                },
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice consonant blends /br/, /kr/, /tr/', 'Learn vocabulary about family life', 'Use present simple vs. present continuous'], 
                        vi: ['Luyện tập các cụm phụ âm /br/, /kr/, /tr/', 'Học từ vựng về cuộc sống gia đình', 'Sử dụng thì hiện tại đơn và hiện tại tiếp diễn'] 
                    },
                    vocabulary: ['breadwinner', 'housework', 'homemaker', 'groceries', 'heavy lifting', 'laundry', 'washing-up'],
                    grammar: ['Present simple vs. Present continuous'],
                    activities: ['Pronunciation practice: /br/, /kr/, /tr/']
                },
                {
                    title: { en: 'Reading', vi: 'Đọc' },
                    aims: { 
                        en: ['Read for specific information about the benefits of doing housework'], 
                        vi: ['Đọc để lấy thông tin cụ thể về lợi ích của việc làm việc nhà'] 
                    },
                    activities: ['Read a text and answer comprehension questions']
                },
                {
                    title: { en: 'Speaking', vi: 'Nói' },
                    aims: { 
                        en: ['Discuss the pros and cons of children doing housework'], 
                        vi: ['Thảo luận về ưu và nhược điểm của việc trẻ em làm việc nhà'] 
                    },
                    activities: ['Work in pairs to discuss opinions on housework']
                },
                {
                    title: { en: 'Listening', vi: 'Nghe' },
                    aims: { 
                        en: ['Listen for specific information in a talk show about family life'], 
                        vi: ['Nghe để lấy thông tin cụ thể trong một talk show về cuộc sống gia đình'] 
                    },
                    activities: ['Listen to a recording and complete true/false or gap-fill exercises']
                },
                {
                    title: { en: 'Writing', vi: 'Viết' },
                    aims: { 
                        en: ['Write a paragraph about your family routines'], 
                        vi: ['Viết một đoạn văn về các thói quen của gia đình bạn'] 
                    },
                    activities: ['Plan and write a short paragraph on family routines']
                },
                 {
                    title: { en: 'Culture/CLIL', vi: 'Văn hóa/CLIL' },
                    aims: { 
                        en: ['Learn about family values in the UK'], 
                        vi: ['Tìm hiểu về các giá trị gia đình ở Vương quốc Anh'] 
                    },
                    activities: ['Read a short text about British family values and compare with Vietnamese culture']
                }
            ])
        },
        {
            id: 1002,
            title: { en: 'Unit 2: Humans and the Environment', vi: 'Bài 2: Con người và Môi trường' },
            lessons: createLessonsForUnit(1002, [
                {
                    title: { en: 'Getting Started', vi: 'Bắt đầu' },
                    aims: { 
                        en: ['Introduce the topic of human impact on the environment'], 
                        vi: ['Giới thiệu chủ đề về tác động của con người đến môi trường'] 
                    },
                     activities: ['Discuss pictures related to the environment']
                },
                {
                    title: { en: 'Language', vi: 'Ngôn ngữ' },
                    aims: { 
                        en: ['Practice consonant blends /kl/, /pl/, /gr/, /pr/', 'Learn vocabulary about the environment', 'Use "will", "be going to", and the passive voice'], 
                        vi: ['Luyện tập các cụm phụ âm /kl/, /pl/, /gr/, /pr/', 'Học từ vựng về môi trường', 'Sử dụng "will", "be going to" và thể bị động'] 
                    },
                    vocabulary: ['carbon footprint', 'eco-friendly', 'pollution', 'recycle', 'conserve'],
                    grammar: ['Future with will and be going to', 'The passive voice'],
                    activities: ['Pronunciation practice: /kl/, /pl/, /gr/, /pr/']
                },
                {
                    title: { en: 'Reading', vi: 'Đọc' },
                    aims: { 
                        en: ['Read an article about living a green lifestyle'], 
                        vi: ['Đọc một bài báo về lối sống xanh'] 
                    },
                    activities: ['Read for main ideas and specific details']
                },
                {
                    title: { en: 'Speaking', vi: 'Nói' },
                    aims: { 
                        en: ['Talk about ways to live a greener life'], 
                        vi: ['Nói về các cách để sống xanh hơn'] 
                    },
                     activities: ['Brainstorm and present ideas on how to be more eco-friendly']
                },
                {
                    title: { en: 'Listening', vi: 'Nghe' },
                    aims: { 
                        en: ['Listen to a talk about calculating and reducing one\'s carbon footprint'], 
                        vi: ['Nghe một bài nói chuyện về cách tính và giảm lượng khí thải carbon của một người'] 
                    },
                    activities: ['Listen and answer comprehension questions']
                },
                {
                    title: { en: 'Writing', vi: 'Viết' },
                    aims: { 
                        en: ['Write a paragraph about how to reduce your carbon footprint'], 
                        vi: ['Viết một đoạn văn về cách giảm lượng khí thải carbon của bạn'] 
                    },
                    activities: ['Write a paragraph suggesting green solutions']
                }
            ])
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
