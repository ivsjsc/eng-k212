
import { CurriculumLevel, CurriculumLesson, VocabularyItem, GrammarPoint, Activity } from '../types';

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
            lessons: [
                createLesson({
                    id: 120101,
                    day: 1,
                    title: { en: 'Unit 1 Overview', vi: 'Tổng quan Bài 1' },
                    aims: {
                        en: [
                            'Develop skills in pronunciation, vocabulary, and grammar related to admirable life stories.',
                            'Practice the four main language skills: Reading, Speaking, Listening, and Writing.'
                        ],
                        vi: [
                            'Phát triển các kỹ năng về phát âm, từ vựng và ngữ pháp liên quan đến những câu chuyện cuộc đời đáng ngưỡng mộ.',
                            'Thực hành bốn kỹ năng ngôn ngữ chính: Đọc, Nói, Nghe và Viết.'
                        ]
                    },
                    vocabulary: ['Phrases related to life stories'],
                    grammar: ['Past simple vs. Past continuous'],
                    activities: [
                        { en: 'Reading: An article about Steve Jobs\' life and achievements', vi: 'Đọc: Bài viết về cuộc đời và thành tựu của Steve Jobs' },
                        { en: 'Speaking: Talking about the lives of two Vietnamese national heroes', vi: 'Nói: Kể chuyện về cuộc đời hai anh hùng dân tộc của Việt Nam' },
                        { en: 'Listening: A talk about Walt Disney\'s life', vi: 'Nghe: Bài nói chuyện về cuộc đời của Walt Disney' },
                        { en: 'Writing: A biography of Walt Disney', vi: 'Viết: Bài tiểu sử về Walt Disney' },
                        { en: 'Culture/CLIL: Famous queens in world history', vi: 'Văn hóa/CLIL: Những nữ hoàng nổi tiếng trong lịch sử thế giới' },
                        { en: 'Project: Designing a visual story of a person\'s life', vi: 'Dự án: Thiết kế một câu chuyện bằng hình ảnh về cuộc đời của một người' }
                    ]
                })
            ]
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
