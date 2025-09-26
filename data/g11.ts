import { CurriculumLevel } from '../types';

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
            title: { en: 'A Long and Healthy Life', vi: 'Cuộc sống khỏe mạnh và trường thọ' },
            lessons: [createLessonForUnit(1101,
                { en: 'A Long and Healthy Life', vi: 'Cuộc sống khỏe mạnh và trường thọ' },
                {
                    pronunciation: { en: 'Strong and weak forms of auxiliary verbs', vi: 'Hình thức mạnh và yếu của động từ hỗ trợ' },
                    vocabulary: { en: 'Words and phrases related to health and fitness', vi: 'Từ và cụm từ liên quan đến sức khỏe và thể dục' },
                    grammar: { en: 'Past simple vs. Present perfect', vi: 'Quá khứ đơn vs. Hiện tại hoàn thành' },
                    reading: { en: 'Reading for main ideas and specific information about living a long and healthy life', vi: 'Đọc để tìm ý chính và thông tin cụ thể về cuộc sống khỏe mạnh và trường thọ' },
                    speaking: { en: 'Giving instructions for an exercise routine', vi: 'Hướng dẫn thực hiện một thói quen tập luyện' },
                    listening: { en: 'Listening for main ideas and specific information about a TV chat show and health', vi: 'Nghe để tìm ý chính và thông tin cụ thể về chương trình trò chuyện trên TV và sức khỏe' },
                    writing: { en: 'Writing a short message', vi: 'Viết một tin nhắn ngắn' },
                    everydayEnglish: { en: 'Offering help and responding', vi: 'Đề nghị giúp đỡ và phản hồi' },
                    cultureClil: { en: 'Bacteria and viruses', vi: 'Vi khuẩn và virus' },
                    project: { en: 'Designing a poster about a healthy habit', vi: 'Thiết kế một áp phích về thói quen lành mạnh' }
                }
            )],
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