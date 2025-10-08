import { CurriculumLevel } from '../types';

// Fix: Renamed sw7Data to sw8Data and updated content to reflect Grade 8.
export const sw8Data: CurriculumLevel = {
    level: 8,
    title: { en: 'i-Learn Smart World 8', vi: 'i-Learn Smart World 8' },
    subtitle: { en: 'Secondary School - Grade 8', vi: 'Trung học cơ sở - Lớp 8' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1gbl9bh_HnkYwHZeRkP6gGJ0dJ5wn0PUf/view?usp=drive_link', // Note: Placeholder URL for SW8
    units: [
        {
            id: 801,
            title: { en: 'Unit 1: Free Time', vi: 'Bài 1: Thời gian rảnh' },
            lessons: [
                {
                    id: 80101,
                    title: { en: 'Lesson 1: Leisure Activities', vi: 'Bài học 1: Hoạt động giải trí' },
                    aims: {
                        en: ['Talk about leisure activities, likes, and dislikes', 'Use verbs of preference + gerund'],
                        vi: ['Nói về các hoạt động giải trí, sở thích và không thích', 'Sử dụng động từ chỉ sở thích + danh động từ'],
                    },
                    vocabulary: [
                        { term: 'chat', pronunciation: '/tʃæt/', vietnamese: 'trò chuyện' },
                        { term: 'fishing', pronunciation: '/ˈfɪʃɪŋ/', vietnamese: 'câu cá' },
                        { term: 'hang out', pronunciation: '/hæŋ aʊt/', vietnamese: 'đi chơi' },
                        { term: 'jogging', pronunciation: '/ˈdʒɑːɡɪŋ/', vietnamese: 'chạy bộ' },
                        { term: 'jewelry', pronunciation: '/ˈdʒuːəlri/', vietnamese: 'trang sức' },
                        { term: 'handball', pronunciation: '/ˈhændbɔːl/', vietnamese: 'bóng ném' },
                        { term: 'rock climbing', pronunciation: '/rɑːk ˈklaɪmɪŋ/', vietnamese: 'leo núi đá' },
                        { term: 'board games', pronunciation: '/bɔːrd ɡeɪmz/', vietnamese: 'trò chơi cờ bàn' },
                    ],
                    grammar: [
                        { title: { en: 'Verbs (to express preference) + gerund', vi: 'Động từ chỉ sở thích + danh động từ' }, explanation: { en: ['We use verbs of preference (love, like, enjoy, prefer, don\'t like, hate) followed by a gerund (-ing form) to express what we like or dislike doing.', 'I **love playing** sports. He **hates reading** comics.'], vi: ['Chúng ta sử dụng động từ chỉ sở thích (yêu, thích, ghét, v.v.) theo sau là danh động từ (dạng V-ing) để bày tỏ điều chúng ta thích hoặc không thích làm.', 'Tôi **thích chơi** thể thao. Anh ấy **ghét đọc** truyện tranh.'] } },
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read about the hobbies of Will, Jess, and Peter, then compare yourself to them.'], vi: ['Đọc về sở thích của Will, Jess và Peter, sau đó so sánh bản thân với các nhân vật.'] } },
                        { type: 'Speaking', description: { en: ['Conduct a survey in groups to find the most suitable activity for a youth center.'], vi: ['Thực hiện khảo sát trong nhóm để tìm ra hoạt động giải trí ưa thích cho trung tâm thanh thiếu niên.'] } }
                    ],
                },
                {
                    id: 80102,
                    title: { en: 'Lesson 2: Making Plans', vi: 'Bài học 2: Lên kế hoạch' },
                    aims: {
                        en: ['Make plans for leisure activities with friends', 'Use the Present Simple for future meaning and prepositions of time'],
                        vi: ['Lập kế hoạch hoạt động giải trí với bạn bè', 'Sử dụng thì Hiện tại đơn với ý nghĩa tương lai và giới từ chỉ thời gian'],
                    },
                    vocabulary: [
                        { term: 'knitting', pronunciation: '/ˈnɪtɪŋ/', vietnamese: 'đan len' },
                        { term: 'karate', pronunciation: '/kəˈrɑːti/', vietnamese: 'võ karate' },
                        { term: 'roller skating', pronunciation: '/ˈroʊlər ˈskeɪtɪŋ/', vietnamese: 'trượt patin' },
                        { term: 'sewing', pronunciation: '/ˈsoʊɪŋ/', vietnamese: 'may vá' },
                        { term: 'practice', pronunciation: '/ˈpræktɪs/', vietnamese: 'luyện tập' },
                        { term: 'shuttlecock', pronunciation: '/ˈʃʌtəlˌkɑːk/', vietnamese: 'quả cầu lông' },
                        { term: 'cycling', pronunciation: '/ˈsaɪklɪŋ/', vietnamese: 'đạp xe' },
                        { term: 'table tennis', pronunciation: '/ˈteɪbl ˈtɛnɪs/', vietnamese: 'bóng bàn' },
                    ],
                    grammar: [
                        { title: { en: 'Present Simple for future meaning', vi: 'Hiện tại đơn với ý nghĩa tương lai' }, explanation: { en: ['We use the Present Simple to talk about fixed future timetables or schedules.', 'I **have** soccer practice at 7 tonight. The concert **starts** at 8 p.m.'], vi: ['Chúng ta dùng thì Hiện tại đơn để nói về lịch trình cố định trong tương lai.', 'Tôi **có** buổi luyện tập bóng đá lúc 7 giờ tối nay. Buổi hòa nhạc **bắt đầu** lúc 8 giờ tối.'] } },
                        { title: { en: 'Prepositions of time: from...to..., until', vi: 'Giới từ chỉ thời gian: từ...đến..., cho đến khi' }, explanation: { en: ['We use **from...to...** to show the start and end time of an event. We use **until** to show the ending point.', 'The class runs **from 9 a.m. to 11 a.m.** We will stay **until** midnight.'], vi: ['Chúng ta dùng **from...to...** để chỉ thời gian bắt đầu và kết thúc. Chúng ta dùng **until** để chỉ điểm kết thúc.', 'Lớp học diễn ra **từ 9 giờ sáng đến 11 giờ sáng**. Chúng ta sẽ ở lại **cho đến** nửa đêm.'] } },
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to two friends making plans and complete their schedule.'], vi: ['Nghe hai người bạn lên kế hoạch và hoàn thành lịch trình của họ.'] } },
                        { type: 'Role-play', description: { en: ['Role-play phone calls inviting friends to weekend activities based on a given schedule.'], vi: ['Đóng vai các cuộc gọi điện thoại mời bạn bè tham gia các hoạt động cuối tuần dựa trên lịch trình.'] } }
                    ],
                },
                {
                    id: 80103,
                    title: { en: 'Lesson 3: Hobbies', vi: 'Bài học 3: Sở thích' },
                    aims: {
                        en: ['Talk about your favorite hobby', 'Write a descriptive paragraph about a hobby'],
                        vi: ['Nói về sở thích yêu thích của mình', 'Viết một đoạn văn mô tả về sở thích'],
                    },
                    vocabulary: [
                        { term: 'skateboarding', pronunciation: '/ˈskeɪtbɔːrdɪŋ/', vietnamese: 'trượt ván' },
                        { term: 'surfing', pronunciation: '/ˈsɜːrfɪŋ/', vietnamese: 'lướt sóng' },
                        { term: 'rock climbing', pronunciation: '/rɑːk ˈklaɪmɪŋ/', vietnamese: 'leo núi đá' },
                        { term: 'zorbing', pronunciation: '/ˈzɔːrbɪŋ/', vietnamese: 'trượt bóng zorbing' },
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a descriptive paragraph about a hobby (e.g., baking) and analyze its structure (topic sentence, supporting details/Wh-questions, concluding sentence).'], vi: ['Đọc đoạn văn mô tả về một sở thích (ví dụ: làm bánh) và phân tích cấu trúc của nó (câu chủ đề, các câu hỗ trợ/câu hỏi Wh-, và câu kết luận).'] } },
                        { type: 'Writing', description: { en: ['Write a descriptive paragraph (80-100 words) about your favorite hobby.'], vi: ['Viết một đoạn văn mô tả (80-100 từ) về sở thích yêu thích của bạn.'] } }
                    ],
                }
            ]
        },
        {
            id: 802,
            title: { en: 'Unit 2: Life in the Country', vi: 'Bài 2: Cuộc sống ở Nông thôn' },
            lessons: [
                 {
                    id: 80201,
                    title: { en: 'Lesson 1: Country vs. City', vi: 'Bài học 1: Nông thôn và Thành thị' },
                    aims: {
                        en: ['Discuss life in the country vs. the city', 'Use quantifiers with countable and uncountable nouns'],
                        vi: ['Thảo luận về cuộc sống ở nông thôn và thành thị', 'Sử dụng danh từ đếm được và không đếm được với các lượng từ bất định']
                    },
                    vocabulary: [
                        { term: 'entertainment', pronunciation: '/ˌɛntərˈteɪnmənt/', vietnamese: 'giải trí' },
                        { term: 'nature', pronunciation: '/ˈneɪtʃər/', vietnamese: 'thiên nhiên' },
                        { term: 'noise', pronunciation: '/nɔɪz/', vietnamese: 'tiếng ồn' },
                        { term: 'peace', pronunciation: '/piːs/', vietnamese: 'sự yên bình' },
                        { term: 'fresh', pronunciation: '/frɛʃ/', vietnamese: 'tươi (không khí, thực phẩm)' },
                        { term: 'vehicle', pronunciation: '/ˈviːəkl/', vietnamese: 'phương tiện giao thông' },
                        { term: 'room', pronunciation: '/ruːm/', vietnamese: 'không gian' },
                        { term: 'facility', pronunciation: '/fəˈsɪləti/', vietnamese: 'cơ sở vật chất' },
                    ],
                    grammar: [{
                        title: { en: 'Quantifiers with countable/uncountable nouns', vi: 'Lượng từ với danh từ đếm được/không đếm được' },
                        explanation: { en: ['We use **too much** and **not enough** with uncountable nouns (e.g., noise, pollution). We use **too many** and **not enough** with plural countable nouns (e.g., vehicles, people). **Lots of** is used with both.', 'There is **too much** noise. There are **not enough** facilities.'], vi: ['Chúng ta dùng **too much** và **not enough** với danh từ không đếm được. Chúng ta dùng **too many** và **not enough** với danh từ đếm được số nhiều. **Lots of** dùng với cả hai.', 'Có **quá nhiều** tiếng ồn. Có **không đủ** cơ sở vật chất.'] }
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss the pros and cons of city and country life using the quantifiers learned.'], vi: ['Thảo luận nhóm về những ưu và nhược điểm của cuộc sống ở thành thị và nông thôn, sử dụng các lượng từ đã học.'] } }
                    ]
                },
                {
                    id: 80202,
                    title: { en: 'Lesson 2: Folk Games', vi: 'Bài học 2: Trò chơi dân gian' },
                    aims: {
                        en: ['Talk about folk games and country activities', 'Use verbs of preference + to-infinitive and adverbs of frequency'],
                        vi: ['Nói về các trò chơi dân gian và hoạt động ở nông thôn', 'Sử dụng động từ chỉ sở thích + động từ nguyên mẫu có to và các trạng từ chỉ tần suất']
                    },
                    vocabulary: [
                        { term: 'hometown', pronunciation: '/ˈhoʊmtaʊn/', vietnamese: 'quê hương' },
                        { term: 'folk', pronunciation: '/foʊk/', vietnamese: 'dân gian' },
                        { term: 'tug of war', pronunciation: '/tʌɡ əv wɔːr/', vietnamese: 'kéo co' },
                        { term: 'jump rope', pronunciation: '/dʒʌmp roʊp/', vietnamese: 'nhảy dây' },
                        { term: 'pick (flowers)', pronunciation: '/pɪk/', vietnamese: 'hái (hoa)' },
                        { term: 'spinning tops', pronunciation: '/ˈspɪnɪŋ tɑːps/', vietnamese: 'chơi quay' },
                        { term: 'herd (buffalo)', pronunciation: '/hɜːrd/', vietnamese: 'chăn (trâu)' },
                    ],
                    grammar: [
                        { title: { en: 'Verbs (to express preference) + to-infinitive', vi: 'Động từ chỉ sở thích + động từ nguyên mẫu có to' }, explanation: { en: ['Some verbs of preference (e.g., **prefer**) can also be followed by a to-infinitive.', 'They **prefer to play** outdoors. I **prefer to read** books.'], vi: ['Một số động từ chỉ sở thích (ví dụ: **prefer**) cũng có thể theo sau là động từ nguyên mẫu có to.', 'Họ **thích chơi** ngoài trời hơn. Tôi **thích đọc** sách hơn.'] } },
                        { title: { en: 'Adverbs of frequency', vi: 'Trạng từ chỉ tần suất' }, explanation: { en: ['Reviewing the use and position of adverbs of frequency (**never, rarely, sometimes, often, usually, always**).', 'She **always** goes to the park. They **rarely** play folk games.'], vi: ['Ôn tập cách dùng và vị trí của các trạng từ chỉ tần suất (**never, rarely, sometimes, often, usually, always**).', 'Cô ấy **luôn luôn** đi đến công viên. Họ **hiếm khi** chơi trò chơi dân gian.'] } }
                    ],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a blog about a visit to the country and the folk games/activities there.'], vi: ['Đọc blog của Vy về chuyến thăm quê và các hoạt động của trẻ em ở đó.'] } },
                        { type: 'Speaking', description: { en: ['Ask and answer about activities young people like to do in different places.'], vi: ['Hỏi và trả lời về các hoạt động mà giới trẻ thích làm ở các địa điểm khác nhau.'] } }
                    ]
                },
                {
                    id: 80203,
                    title: { en: 'Lesson 3: Festivals in the Country', vi: 'Bài học 3: Lễ hội ở Nông thôn' },
                    aims: {
                        en: ['Talk about festivals in the country', 'Write an announcement for a festival'],
                        vi: ['Nói về các lễ hội ở vùng quê', 'Viết một thông báo cho một lễ hội']
                    },
                    vocabulary: [
                        { term: 'fireworks', pronunciation: '/ˈfaɪərwɜːrks/', vietnamese: 'pháo hoa' },
                        { term: 'float', pronunciation: '/floʊt/', vietnamese: 'xe hoa/kiệu' },
                        { term: 'parade', pronunciation: '/pəˈreɪd/', vietnamese: 'diễu hành' },
                        { term: 'wrestling', pronunciation: '/ˈreslɪŋ/', vietnamese: 'đấu vật' },
                        { term: 'announcement', pronunciation: '/əˈnaʊnsmənt/', vietnamese: 'thông báo' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing & Planning', description: { en: ['Plan a traditional festival (name, location, time, cost, activities, food) and write an official announcement (80-100 words) for the event.'], vi: ['Lên kế hoạch cho một lễ hội truyền thống (tên, địa điểm, thời gian, chi phí, hoạt động, ẩm thực) và viết một thông báo (80-100 từ) cho lễ hội đó.'] } }
                    ]
                }
            ]
        },
        {
            id: 803,
            title: { en: 'Unit 3: Protecting the Environment', vi: 'Bài 3: Bảo vệ Môi trường' },
            lessons: [
                {
                    id: 80301,
                    title: {en: 'Lesson 1: Effects of Pollution', vi: 'Bài học 1: Tác động của Ô nhiễm'},
                    aims: {
                        en: ['Talk about the effects of pollution', 'Use the First Conditional with "if" or "unless"'],
                        vi: ['Nói về các tác động của ô nhiễm', 'Sử dụng câu điều kiện loại 1 với "if" hoặc "unless"']
                    },
                    vocabulary: [
                        {term: 'affect', pronunciation: '/əˈfɛkt/', vietnamese: 'ảnh hưởng'},
                        {term: 'cause', pronunciation: '/kɔːz/', vietnamese: 'gây ra'},
                        {term: 'pollute', pronunciation: '/pəˈluːt/', vietnamese: 'gây ô nhiễm'},
                        {term: 'disease', pronunciation: '/dɪˈziːz/', vietnamese: 'bệnh tật'},
                        {term: 'wildlife', pronunciation: '/ˈwaɪldlaɪf/', vietnamese: 'động vật hoang dã'},
                        {term: 'tourism', pronunciation: '/ˈtʊrɪzəm/', vietnamese: 'du lịch'},
                        {term: 'environment', pronunciation: '/ɪnˈvaɪrənmənt/', vietnamese: 'môi trường'},
                        {term: 'damage', pronunciation: '/ˈdæmɪdʒ/', vietnamese: 'thiệt hại'}
                    ],
                    grammar: [{
                        title: {en: 'First Conditional with if or unless', vi: 'Câu điều kiện loại 1 với if hoặc unless'},
                        explanation: {en: ['We use the First Conditional to talk about possible future situations and their results. **If + Present Simple, will + V** or **Unless + Present Simple, will + V** (unless means if not).', 'If we **pollute** the air, we **will get** sick. Unless we **stop**, wildlife **will disappear**.'], vi: ['Chúng ta dùng Câu điều kiện loại 1 để nói về các tình huống có thể xảy ra trong tương lai và kết quả của chúng. **If + Hiện tại đơn, will + V** hoặc **Unless + Hiện tại đơn, will + V** (unless có nghĩa là nếu không).', 'Nếu chúng ta **gây ô nhiễm** không khí, chúng ta **sẽ bị** bệnh. Trừ khi chúng ta **ngừng lại**, động vật hoang dã **sẽ biến mất**.' ]}
                    }],
                    activities: [
                        { type: 'Speaking & Mind Map', description: { en: ['Create a mind map about the effects of different types of pollution (air, land, water) and present it using the First Conditional.'], vi: ['Lập sơ đồ tư duy về các tác động của ô nhiễm không khí, đất, sông ngòi và biển, sau đó trình bày bằng Câu điều kiện loại 1.'] } }
                    ]
                },
                {
                    id: 80302,
                    title: {en: 'Lesson 2: Reducing Pollution', vi: 'Bài học 2: Giảm thiểu Ô nhiễm'},
                    aims: {
                        en: ['Give advice on how to reduce pollution', 'Use conjunctions to make compound and complex sentences'],
                        vi: ['Đưa ra lời khuyên về cách giảm thiểu ô nhiễm', 'Sử dụng các liên từ để tạo câu ghép và câu phức']
                    },
                    vocabulary: [
                        {term: 'recycle', pronunciation: '/ˌriːˈsaɪkl/', vietnamese: 'tái chế'},
                        {term: 'reuse', pronunciation: '/ˌriːˈjuːz/', vietnamese: 'tái sử dụng'},
                        {term: 'reduce', pronunciation: '/rɪˈduːs/', vietnamese: 'giảm bớt'},
                        {term: 'save', pronunciation: '/seɪv/', vietnamese: 'tiết kiệm'},
                        {term: 'waste', pronunciation: '/weɪst/', vietnamese: 'lãng phí'},
                        {term: 'clean up', pronunciation: '/kliːn ʌp/', vietnamese: 'dọn dẹp'},
                        {term: 'electricity', pronunciation: '/ɪˌlɛkˈtrɪsəti/', vietnamese: 'điện'},
                        {term: 'air conditioner', pronunciation: '/ˈɛr kənˌdɪʃənər/', vietnamese: 'máy điều hòa'}
                    ],
                    grammar: [{
                        title: {en: 'Conjunctions: and, so (that)', vi: 'Liên từ: and, so (that)'},
                        explanation: {en: ['We use **and** to join similar ideas. We use **so (that)** to express purpose or result.', 'We clean up the park **and** we plant trees. We turn off the lights **so that** we can save energy.'], vi: ['Chúng ta dùng **and** để nối các ý tương đồng. Chúng ta dùng **so (that)** để chỉ mục đích hoặc kết quả.', 'Chúng ta dọn dẹp công viên **và** trồng cây. Chúng ta tắt đèn **để** tiết kiệm năng lượng.']}
                    }],
                    activities: [
                        { type: 'Speaking & Design', description: { en: ['Design a poster giving solutions to reduce pollution and present it to the class.'], vi: ['Thiết kế một poster đưa ra các giải pháp giảm thiểu ô nhiễm và trình bày trước lớp.'] } }
                    ]
                },
                {
                    id: 80303,
                    title: {en: 'Lesson 3: A Greener School', vi: 'Bài học 3: Trường học Xanh hơn'},
                    aims: {
                        en: ['Discuss ways to protect the environment', 'Write a short guide on making the school greener'],
                        vi: ['Thảo luận các cách để bảo vệ môi trường', 'Viết một bản hướng dẫn ngắn để làm cho trường học xanh hơn']
                    },
                    vocabulary: [
                        { term: 'bin', pronunciation: '/bɪn/', vietnamese: 'thùng rác' },
                        { term: 'sign', pronunciation: '/saɪn/', vietnamese: 'biển báo' },
                        { term: 'campaign', pronunciation: '/kæmˈpeɪn/', vietnamese: 'chiến dịch' },
                        { term: 'switch off', pronunciation: '/swɪtʃ ɔːf/', vietnamese: 'tắt' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Discuss solutions and write a guide (80-100 words) on how to make your school more eco-friendly.'], vi: ['Thảo luận các giải pháp và viết một bản hướng dẫn (80-100 từ) về cách làm cho trường học của bạn trở nên thân thiện hơn với môi trường.'] } }
                    ]
                }
            ]
        },
        {
            id: 804,
            title: { en: 'Unit 4: Disasters', vi: 'Bài 4: Thảm họa' },
            lessons: [
                {
                    id: 80401,
                    title: {en: 'Lesson 1: Types of Disasters', vi: 'Bài học 1: Các loại Thảm họa'},
                    aims: {
                        en: ['Talk about natural disasters', 'Use Wh-questions in the Past Simple'],
                        vi: ['Nói về các thảm họa', 'Sử dụng câu hỏi Wh- trong thì Quá khứ đơn']
                    },
                    vocabulary: [
                        {term: 'typhoon', pronunciation: '/taɪˈfuːn/', vietnamese: 'bão nhiệt đới'},
                        {term: 'earthquake', pronunciation: '/ˈɜːrθkweɪk/', vietnamese: 'động đất'},
                        {term: 'tsunami', pronunciation: '/tsuːˈnɑːmi/', vietnamese: 'sóng thần'},
                        {term: 'flood', pronunciation: '/flʌd/', vietnamese: 'lũ lụt'},
                        {term: 'wildfire', pronunciation: '/ˈwaɪldfaɪər/', vietnamese: 'cháy rừng'},
                        {term: 'blizzard', pronunciation: '/ˈblɪzərd/', vietnamese: 'bão tuyết'},
                        {term: 'heat wave', pronunciation: '/hiːt weɪv/', vietnamese: 'sóng nhiệt'},
                        {term: 'drought', pronunciation: '/draʊt/', vietnamese: 'hạn hán'},
                        {term: 'landslide', pronunciation: '/ˈlændslaɪd/', vietnamese: 'sạt lở đất'},
                        {term: 'avalanche', pronunciation: '/ˈævəlæntʃ/', vietnamese: 'tuyết lở'}
                    ],
                    grammar: [{
                        title: {en: 'Wh-questions in the Past Simple', vi: 'Câu hỏi Wh- trong thì Quá khứ đơn'},
                        explanation: {en: ['We use Wh-questions (What, When, Where, Who) in the Past Simple to ask for specific information about past events.', 'What **was** the biggest typhoon? When **did** it **happen**?'], vi: ['Chúng ta dùng câu hỏi Wh- (Cái gì, Khi nào, Ở đâu, Ai) trong thì Quá khứ đơn để hỏi thông tin cụ thể về các sự kiện trong quá khứ.', 'Cơn bão lớn nhất **là gì**? Nó **xảy ra khi nào**?']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read information about a major disaster (e.g., Typhoon Tip) and answer comprehension questions.'], vi: ['Đọc thông tin về một thảm họa lớn (ví dụ: Typhoon Tip) và trả lời câu hỏi.'] } },
                        { type: 'Speaking', description: { en: ['Play "Disasters Quiz Show," asking and answering Wh-questions about historical disasters.'], vi: ['Chơi trò "Disasters Quiz Show," đặt và trả lời câu hỏi Wh- về các thảm họa trong lịch sử.'] } }
                    ]
                },
                {
                    id: 80402,
                    title: {en: 'Lesson 2: Disaster Safety', vi: 'Bài học 2: An toàn Thảm họa'},
                    aims: {
                        en: ['Give advice on what to do during a disaster', 'Use prepositions of place and movement'],
                        vi: ['Đưa ra lời khuyên về những việc cần làm khi có thảm họa', 'Sử dụng giới từ chỉ nơi chốn và sự di chuyển']
                    },
                    vocabulary: [
                        {term: 'escape plan', pronunciation: '/ɪˈskeɪp plæn/', vietnamese: 'kế hoạch thoát hiểm'},
                        {term: 'board up', pronunciation: '/bɔːrd ʌp/', vietnamese: 'che chắn (cửa sổ)'},
                        {term: 'emergency services', pronunciation: '/ɪˈmɜːrdʒənsi ˈsɜːrvɪsɪz/', vietnamese: 'dịch vụ khẩn cấp'},
                        {term: 'fire extinguisher', pronunciation: '/ˈfaɪər ɪkˈstɪŋɡwɪʃər/', vietnamese: 'bình chữa cháy'},
                        {term: 'first aid kit', pronunciation: '/ˌfɜːrst ˈeɪd kɪt/', vietnamese: 'hộp sơ cứu'},
                        {term: 'supplies', pronunciation: '/səˈplaɪz/', vietnamese: 'đồ tiếp tế'},
                        {term: 'flashlight', pronunciation: '/ˈflæʃlaɪt/', vietnamese: 'đèn pin'},
                        {term: 'batteries', pronunciation: '/ˈbætəriz/', vietnamese: 'pin'}
                    ],
                    grammar: [{
                        title: {en: 'Prepositions of place (inside, under, near) and movement (to, into, outside)', vi: 'Giới từ chỉ nơi chốn (bên trong, dưới, gần) và sự di chuyển (đến, vào trong, bên ngoài)'},
                        explanation: {en: ['We use prepositions of place to describe location (e.g., **inside**, **under** the table) and prepositions of movement to describe direction (e.g., run **to** the exit, move **into** the safe room).'], vi: ['Chúng ta dùng giới từ chỉ nơi chốn để mô tả vị trí (ví dụ: **bên trong**, **dưới** bàn) và giới từ chỉ sự di chuyển để mô tả hướng (ví dụ: chạy **đến** lối thoát, di chuyển **vào trong** phòng an toàn).'] }
                    }],
                    activities: [
                        { type: 'Speaking & Design', description: { en: ['Discuss and create a safety poster for a specific type of disaster (fire, flood, storm, etc.).'], vi: ['Thảo luận và tạo một poster về các mẹo an toàn cho một loại thảm họa cụ thể.'] } }
                    ]
                },
                {
                    id: 80403,
                    title: {en: 'Lesson 3: Emergency Announcements', vi: 'Bài học 3: Thông báo Khẩn cấp'},
                    aims: {
                        en: ['Talk about the dangers of disasters and necessary actions', 'Write an emergency announcement'],
                        vi: ['Nói về sự nguy hiểm của thảm họa và những việc nên làm', 'Viết một thông báo khẩn cấp']
                    },
                    vocabulary: [
                        { term: 'danger', pronunciation: '/ˈdeɪndʒər/', vietnamese: 'nguy hiểm' },
                        { term: 'shelter', pronunciation: '/ˈʃɛltər/', vietnamese: 'nơi trú ẩn' },
                        { term: 'warning', pronunciation: '/ˈwɔːrnɪŋ/', vietnamese: 'cảnh báo' },
                        { term: 'evacuation', pronunciation: '/ɪˌvækjuˈeɪʃn/', vietnamese: 'sự sơ tán' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Choose a disaster and write an emergency announcement (80-100 words) to warn your town, including essential information and safety instructions.'], vi: ['Chọn một thảm họa và viết một thông báo khẩn cấp (80-100 từ) để cảnh báo thị trấn của bạn, bao gồm các thông tin cần thiết và hướng dẫn an toàn.'] } }
                    ]
                }
            ]
        },
        {
            id: 805,
            title: { en: 'Unit 5: Science and Technology', vi: 'Bài 5: Khoa học và Công nghệ' },
            lessons: [
                {
                    id: 80501,
                    title: {en: 'Lesson 1: Devices', vi: 'Bài học 1: Thiết bị'},
                    aims: {
                        en: ['Ask and answer about devices', 'Use Wh- and Yes/No questions'],
                        vi: ['Hỏi và trả lời về các thiết bị', 'Sử dụng câu hỏi Wh- và Yes/No']
                    },
                    vocabulary: [
                        {term: 'storage', pronunciation: '/ˈstɔːrɪdʒ/', vietnamese: 'dung lượng lưu trữ'},
                        {term: 'weight', pronunciation: '/weɪt/', vietnamese: 'trọng lượng'},
                        {term: 'screen', pronunciation: '/skriːn/', vietnamese: 'màn hình'},
                        {term: 'inch', pronunciation: '/ɪntʃ/', vietnamese: 'inch'},
                        {term: 'gigabyte (GB)', pronunciation: '/ˈɡɪɡəbaɪt/', vietnamese: 'gigabyte (GB)'},
                        {term: 'tablet', pronunciation: '/ˈtæblət/', vietnamese: 'máy tính bảng'}
                    ],
                    grammar: [{
                        title: {en: 'Wh-questions and Yes/No questions', vi: 'Câu hỏi Wh- và Yes/No'},
                        explanation: {en: ['Reviewing how to ask and answer questions about facts (Present Simple) and features/details (Wh-questions).', 'How much does it **weigh**? Does it **have** a large screen?'], vi: ['Ôn tập cách hỏi và trả lời câu hỏi về sự thật (Hiện tại đơn) và tính năng/chi tiết (câu hỏi Wh-).', 'Nó **nặng bao nhiêu**? Nó **có** màn hình lớn không?']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read and compare the features of two fictional tablets (e.g., Portal 6 and Portal 7).'], vi: ['Đọc và so sánh các tính năng của hai máy tính bảng giả định.'] } },
                        { type: 'Role-play', description: { en: ['Role-play a conversation between a salesperson and a customer, asking about device features.'], vi: ['Đóng vai nhân viên bán hàng và khách hàng, hỏi và trả lời về các tính năng của thiết bị.'] } }
                    ]
                },
                {
                    id: 80502,
                    title: {en: 'Lesson 2: Robots', vi: 'Bài học 2: Robot'},
                    aims: {
                        en: ['Compare robots and their actions', 'Use comparative adverbs'],
                        vi: ['So sánh các robot và hành động của chúng', 'Sử dụng trạng từ so sánh']
                    },
                    vocabulary: [
                        {term: 'rescue', pronunciation: '/ˈreskjuː/', vietnamese: 'giải cứu'},
                        {term: 'lift', pronunciation: '/lɪft/', vietnamese: 'nâng'},
                        {term: 'complete', pronunciation: '/kəmˈpliːt/', vietnamese: 'hoàn thành'},
                        {term: 'navigate', pronunciation: '/ˈnævɪɡeɪt/', vietnamese: 'điều hướng'},
                        {term: 'carefully', pronunciation: '/ˈkerfəli/', vietnamese: 'cẩn thận'},
                        {term: 'quietly', pronunciation: '/ˈkwaɪətli/', vietnamese: 'yên lặng'},
                        {term: 'recognize', pronunciation: '/ˈrekəɡnaɪz/', vietnamese: 'nhận dạng'},
                        {term: 'safely', pronunciation: '/ˈseɪfli/', vietnamese: 'an toàn'}
                    ],
                    grammar: [{
                        title: {en: 'Comparative adverbs (more slowly than, faster than, better than)', vi: 'Trạng từ so sánh hơn (chậm hơn, nhanh hơn, tốt hơn)'},
                        explanation: {en: ['We use comparative adverbs to compare two actions. For short adverbs, add -er (e.g., faster). For long adverbs, use **more/less + adverb + than** (e.g., more carefully than).', 'Robot A works **more slowly than** Robot B.'], vi: ['Chúng ta dùng trạng từ so sánh hơn để so sánh hai hành động. Với trạng từ ngắn, thêm -er (ví dụ: faster). Với trạng từ dài, dùng **more/less + trạng từ + than** (ví dụ: more carefully than).', 'Robot A hoạt động **chậm hơn** Robot B.'] }
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss and select the most suitable robot for different tasks (cleaning, building, rescue, etc.) based on their abilities.'], vi: ['Thảo luận và chọn robot phù hợp nhất cho các công việc khác nhau dựa trên khả năng của chúng.'] } }
                    ]
                },
                {
                    id: 80503,
                    title: {en: 'Lesson 3: Smartphones', vi: 'Bài học 3: Điện thoại thông minh'},
                    aims: {
                        en: ['Talk about smartphones', 'Write an email about a new smartphone'],
                        vi: ['Nói về điện thoại thông minh', 'Viết email về một chiếc điện thoại thông minh mới']
                    },
                    vocabulary: [
                        { term: 'camera', pronunciation: '/ˈkæmrə/', vietnamese: 'máy ảnh' },
                        { term: 'battery life', pronunciation: '/ˈbætəri laɪf/', vietnamese: 'thời lượng pin' },
                        { term: 'screen resolution', pronunciation: '/skriːn ˌrezəˈluːʃn/', vietnamese: 'độ phân giải màn hình' },
                        { term: 'processor', pronunciation: '/ˈprɑːsesər/', vietnamese: 'bộ vi xử lý' },
                    ],
                    grammar: [
                        { title: {en: 'Conjunctions (and, also, but, however, so)', vi: 'Liên từ (and, also, but, however, so)'}, explanation: {en: ['Reviewing the use of conjunctions and connecters to make longer, more complex sentences in writing.'], vi: ['Ôn tập cách sử dụng liên từ và từ nối để tạo ra các câu dài hơn, phức tạp hơn trong bài viết.']} }
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Discuss the pros and cons of a chosen smartphone and write an email (80-100 words) to a friend about it.'], vi: ['Thảo luận về ưu và nhược điểm của một chiếc điện thoại thông minh đã chọn và viết một email (80-100 từ) cho bạn bè về nó.'] } }
                    ]
                }
            ]
        },
        {
            id: 806,
            title: { en: 'Unit 6: Life on Other Planets', vi: 'Bài 6: Cuộc sống trên các Hành tinh khác' },
            lessons: [
                {
                    id: 80601,
                    title: {en: 'Lesson 1: Future Homes', vi: 'Bài học 1: Ngôi nhà Tương lai'},
                    aims: {
                        en: ['Make predictions about where humans will live in the future', 'Use the Future Simple'],
                        vi: ['Đưa ra dự đoán về nơi con người sẽ sống trong tương lai', 'Sử dụng thì Tương lai đơn']
                    },
                    vocabulary: [
                        {term: 'Earth', pronunciation: '/ɜːrθ/', vietnamese: 'Trái Đất'},
                        {term: 'Mars', pronunciation: '/mɑːrz/', vietnamese: 'Sao Hỏa'},
                        {term: 'Venus', pronunciation: '/ˈviːnəs/', vietnamese: 'Sao Kim'},
                        {term: 'space station', pronunciation: '/speɪs ˈsteɪʃn/', vietnamese: 'trạm không gian'},
                        {term: 'oxygen', pronunciation: '/ˈɑːksɪdʒən/', vietnamese: 'oxy'},
                        {term: 'gravity', pronunciation: '/ˈɡrævəti/', vietnamese: 'trọng lực'},
                        {term: 'temperature', pronunciation: '/ˈtemprətʃər/', vietnamese: 'nhiệt độ'}
                    ],
                    grammar: [{
                        title: {en: 'Future Simple (will/won\'t)', vi: 'Thì Tương lai đơn (will/won\'t)'},
                        explanation: {en: ['We use the Future Simple with **will/won\'t** to make predictions about the future.', 'I think people **will live** on Mars. We **won\'t need** cars.'], vi: ['Chúng ta sử dụng thì Tương lai đơn với **will/won\'t** để đưa ra dự đoán về tương lai.', 'Tôi nghĩ con người **sẽ sống** trên Sao Hỏa. Chúng ta **sẽ không cần** ô tô.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss and predict where humans will live in the year 2100 (Mars, Venus, space stations, etc.) and explain the reasons.'], vi: ['Thảo luận và dự đoán nơi con người sẽ sống vào năm 2100 (Sao Hỏa, Sao Kim, trạm vũ trụ, v.v.) và giải thích lý do.'] } }
                    ]
                },
                {
                    id: 80602,
                    title: {en: 'Lesson 2: UFO Sightings', vi: 'Bài học 2: Nhìn thấy UFO'},
                    aims: {
                        en: ['Talk about possible past sightings of UFOs and aliens', 'Use the Past Continuous and Past Simple'],
                        vi: ['Nói về các trường hợp có thể nhìn thấy UFO và người ngoài hành tinh trong quá khứ', 'Sử dụng thì Quá khứ tiếp diễn và Quá khứ đơn']
                    },
                    vocabulary: [
                        {term: 'UFO', pronunciation: '/ˌjuː ɛf ˈoʊ/', vietnamese: 'vật thể bay không xác định (UFO)'},
                        {term: 'flying saucer', pronunciation: '/ˌflaɪɪŋ ˈsɔːsər/', vietnamese: 'đĩa bay'},
                        {term: 'disk-shaped', pronunciation: '/dɪsk ʃeɪpt/', vietnamese: 'hình đĩa'},
                        {term: 'appeared', pronunciation: '/əˈpɪrd/', vietnamese: 'xuất hiện'},
                        {term: 'strange', pronunciation: '/streɪndʒ/', vietnamese: 'kỳ lạ'},
                        {term: 'disappeared', pronunciation: '/ˌdɪsəˈpɪrd/', vietnamese: 'biến mất'},
                        {term: 'aliens', pronunciation: '/ˈeɪliənz/', vietnamese: 'người ngoài hành tinh'},
                        {term: 'huge', pronunciation: '/hjuːdʒ/', vietnamese: 'khổng lồ'},
                        {term: 'tiny', pronunciation: '/ˈtaɪni/', vietnamese: 'bé tí'},
                        {term: 'terrified', pronunciation: '/ˈterɪfaɪd/', vietnamese: 'khiếp sợ'}
                    ],
                    grammar: [{
                        title: {en: 'Past Continuous and Past Simple', vi: 'Thì Quá khứ tiếp diễn và Quá khứ đơn'},
                        explanation: {en: ['We use the **Past Continuous** to describe an ongoing action in the past (background action) and the **Past Simple** to describe an action that interrupts it (sudden action).', 'I **was walking** home when I suddenly **saw** a UFO.'], vi: ['Chúng ta dùng **Quá khứ tiếp diễn** để mô tả hành động đang diễn ra trong quá khứ (hành động nền) và **Quá khứ đơn** để mô tả hành động xen vào (hành động đột ngột).', 'Tôi **đang đi bộ** về nhà thì đột nhiên **thấy** một UFO.'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Role-play a breaking news interview about an alien or UFO sighting.'], vi: ['Đóng vai một cuộc phỏng vấn tin tức nóng hổi về việc nhìn thấy người ngoài hành tinh hoặc UFO.'] } }
                    ]
                },
                {
                    id: 80603,
                    title: {en: 'Lesson 3: A Strange Event', vi: 'Bài học 3: Một sự kiện Kỳ lạ'},
                    aims: {
                        en: ['Narrate a sighting of a UFO or alien', 'Write a narrative passage about seeing a visitor from another planet'],
                        vi: ['Kể về việc nhìn thấy UFO và người ngoài hành tinh', 'Viết một câu chuyện về việc nhìn thấy du khách từ hành tinh khác']
                    },
                    vocabulary: [
                        { term: 'visitor', pronunciation: '/ˈvɪzɪtər/', vietnamese: 'vị khách' },
                        { term: 'narrative', pronunciation: '/ˈnærətɪv/', vietnamese: 'bài tự sự' },
                        { term: 'climax', pronunciation: '/ˈklaɪmæks/', vietnamese: 'cao trào' },
                        { term: 'resolution', pronunciation: '/ˌrezəˈluːʃn/', vietnamese: 'cách giải quyết' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Plan a short story (characters, setting, plot, ending) about meeting a strange visitor and write a narrative paragraph (80-100 words).'], vi: ['Lên kế hoạch cho một câu chuyện (nhân vật, bối cảnh, diễn biến, kết thúc) về việc gặp một vị khách lạ và viết thành một đoạn văn tự sự (80-100 từ).'] } }
                    ]
                }
            ]
        },
        {
            id: 807,
            title: { en: 'Unit 7: Teens', vi: 'Bài 7: Thanh thiếu niên' },
            lessons: [
                {
                    id: 80701,
                    title: {en: 'Lesson 1: Dreams and Dream Jobs', vi: 'Bài học 1: Ước mơ và Công việc mơ ước'},
                    aims: {
                        en: ['Talk about dreams and dream jobs', 'Use possessive pronouns'],
                        vi: ['Nói về ước mơ và công việc mơ ước', 'Sử dụng đại từ sở hữu']
                    },
                    vocabulary: [
                        {term: 'dream', pronunciation: '/driːm/', vietnamese: 'ước mơ'},
                        {term: 'director', pronunciation: '/dəˈrektər/', vietnamese: 'đạo diễn'},
                        {term: 'vlogger', pronunciation: '/ˈvlɔːɡər/', vietnamese: 'người làm vlog'},
                        {term: 'musician', pronunciation: '/mjuːˈzɪʃn/', vietnamese: 'nhạc sĩ'},
                        {term: 'game designer', pronunciation: '/ɡeɪm dɪˈzaɪnər/', vietnamese: 'nhà thiết kế trò chơi'},
                        {term: 'veterinarian', pronunciation: '/ˌvetərɪˈnɛriən/', vietnamese: 'bác sĩ thú y'},
                        {term: 'dentist', pronunciation: '/ˈdentɪst/', vietnamese: 'nha sĩ'},
                        {term: 'engineer', pronunciation: '/ˌendʒɪˈnɪr/', vietnamese: 'kỹ sư'},
                        {term: 'journalist', pronunciation: '/ˈdʒɜːrnəlɪst/', vietnamese: 'nhà báo'},
                        {term: 'flight attendant', pronunciation: '/ˈflaɪt əˌtendənt/', vietnamese: 'tiếp viên hàng không'}
                    ],
                    grammar: [{
                        title: {en: 'Possessive Pronouns', vi: 'Đại từ sở hữu'},
                        explanation: {en: ['We use possessive pronouns (**mine**, **yours**, **his**, **hers**, **ours**, **theirs**) to talk about what we own/possess, replacing the noun phrase to avoid repetition.', 'My dream job is a doctor. What\'s **yours**?'], vi: ['Chúng ta dùng đại từ sở hữu (**của tôi**, **của bạn**, **của anh ấy**, **của cô ấy**, **của chúng tôi**, **của họ**) để nói về sự sở hữu, thay thế cụm danh từ để tránh lặp lại.', 'Công việc mơ ước của tôi là bác sĩ. **Của bạn** là gì?']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Conduct a survey on dream jobs and reasons, then discuss the most common dreams among young people.'], vi: ['Thực hiện khảo sát về công việc mơ ước và lý do, sau đó thảo luận về ước mơ phổ biến nhất của giới trẻ.'] } }
                    ]
                },
                {
                    id: 80702,
                    title: {en: 'Lesson 2: Teen Celebrities', vi: 'Bài học 2: Người nổi tiếng tuổi teen'},
                    aims: {
                        en: ['Report on the life of teen celebrities', 'Use reported speech for statements'],
                        vi: ['Tường thuật lại cuộc sống của những người nổi tiếng tuổi teen', 'Sử dụng câu tường thuật cho câu trần thuật']
                    },
                    vocabulary: [
                        {term: 'celebrity', pronunciation: '/səˈlebrəti/', vietnamese: 'người nổi tiếng'},
                        {term: 'millionaire', pronunciation: '/ˌmɪljəˈnɛr/', vietnamese: 'triệu phú'},
                        {term: 'mansion', pronunciation: '/ˈmænʃn/', vietnamese: 'biệt thự'},
                        {term: 'home theater', pronunciation: '/hoʊm ˈθiːətər/', vietnamese: 'phòng chiếu phim tại gia'},
                        {term: 'sports car', pronunciation: '/spɔːrts kɑːr/', vietnamese: 'xe thể thao'},
                        {term: 'jet', pronunciation: '/dʒet/', vietnamese: 'máy bay phản lực cá nhân'},
                        {term: 'yacht', pronunciation: '/jɑːt/', vietnamese: 'du thuyền'},
                        {term: 'fans', pronunciation: '/fæn/', vietnamese: 'người hâm mộ'}
                    ],
                    grammar: [{
                        title: {en: 'Reported speech for statements', vi: 'Câu tường thuật cho câu trần thuật'},
                        explanation: {en: ['We use reported speech to report what someone said, usually with a tense shift (Present Simple -> Past Simple).', 'He **said that** he **loved** his new yacht. She **told me that** she **was** a millionaire.'], vi: ['Chúng ta dùng câu tường thuật để kể lại lời ai đó đã nói, thường có sự thay đổi thì (Hiện tại đơn -> Quá khứ đơn).', 'Anh ấy **nói rằng** anh ấy **yêu** chiếc du thuyền mới của mình. Cô ấy **nói với tôi rằng** cô ấy **là** triệu phú.'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Role-play a journalist interviewing a famous teen musician, then report the interview using reported speech.'], vi: ['Đóng vai một nhà báo phỏng vấn một nhạc sĩ tuổi teen nổi tiếng, sau đó tường thuật lại cuộc phỏng vấn.'] } }
                    ]
                },
                {
                    id: 80703,
                    title: {en: 'Lesson 3: Teen Problems', vi: 'Bài học 3: Vấn đề của Thanh thiếu niên'},
                    aims: {
                        en: ['Talk about problems teens face in your area', 'Write a problem and solution paragraph'],
                        vi: ['Nói về các vấn đề mà thanh thiếu niên gặp phải ở nơi bạn sống', 'Viết một đoạn văn về vấn đề và giải pháp']
                    },
                    vocabulary: [
                        { term: 'bullying', pronunciation: '/ˈbʊliɪŋ/', vietnamese: 'bắt nạt' },
                        { term: 'peer pressure', pronunciation: '/pɪr ˈpreʃər/', vietnamese: 'áp lực từ bạn bè' },
                        { term: 'mental health', pronunciation: '/ˈmentl hɛlθ/', vietnamese: 'sức khỏe tinh thần' },
                        { term: 'solution', pronunciation: '/səˈluːʃn/', vietnamese: 'giải pháp' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Discuss the biggest problem teens face, suggest solutions, and write a problem and solution paragraph (80-100 words).'], vi: ['Thảo luận về vấn đề lớn nhất của thanh thiếu niên, đề xuất giải pháp và viết thành một đoạn văn (80-100 từ).'] } }
                    ]
                }
            ]
        },
        {
            id: 808,
            title: { en: 'Unit 8: Traditions of Ethnic Groups in Vietnam', vi: 'Bài 8: Truyền thống các Dân tộc ở Việt Nam' },
            lessons: [
                {
                    id: 80801,
                    title: {en: 'Lesson 1: Culture', vi: 'Bài học 1: Văn hóa'},
                    aims: {
                        en: ['Talk about the culture of ethnic groups in Vietnam', 'Use articles'],
                        vi: ['Nói về văn hóa của các dân tộc ở Việt Nam', 'Sử dụng mạo từ']
                    },
                    vocabulary: [
                        {term: 'headscarf', pronunciation: '/ˈhedskɑːrf/', vietnamese: 'khăn quàng đầu'},
                        {term: 'pottery', pronunciation: '/ˈpɑːtəri/', vietnamese: 'đồ gốm'},
                        {term: 'embroidery', pronunciation: '/ɪmˈbrɔɪdəri/', vietnamese: 'nghệ thuật thêu'},
                        {term: 'cloth', pronunciation: '/klɔːθ/', vietnamese: 'vải'},
                        {term: 'basket', pronunciation: '/ˈbæskɪt/', vietnamese: 'cái rổ/gùi'},
                        {term: 'ethnic', pronunciation: '/ˈeθnɪk/', vietnamese: 'dân tộc'},
                        {term: 'silver', pronunciation: '/ˈsɪlvər/', vietnamese: 'bạc'},
                        {term: 'pattern', pronunciation: '/ˈpætərn/', vietnamese: 'hoa văn'},
                        {term: 'product', pronunciation: '/ˈprɑːdʌkt/', vietnamese: 'sản phẩm'}
                    ],
                    grammar: [{
                        title: {en: 'Articles (a, an, the, zero article)', vi: 'Mạo từ (a, an, the, mạo từ rỗng)'},
                        explanation: {en: ['Reviewing the use of **a/an** with singular countable nouns, **the** for specific items, and the **zero article (Ø)** for plural/uncountable nouns in general or abstract concepts.'], vi: ['Ôn tập cách dùng **a/an** với danh từ đếm được số ít, **the** cho các đối tượng xác định, và **mạo từ rỗng (Ø)** cho danh từ số nhiều/không đếm được ở nghĩa chung hoặc trừu tượng.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read about the culture, crafts, and clothing of the Cham people.'], vi: ['Đọc về văn hóa, nghề thủ công và trang phục của người Chăm.'] } },
                        { type: 'Speaking', description: { en: ['Discuss and compare different ethnic groups in Vietnam (e.g., Pu Peo, Red Dao, Chu Ru).'], vi: ['Thảo luận và so sánh về các dân tộc khác nhau ở Việt Nam.'] } }
                    ]
                },
                {
                    id: 80802,
                    title: {en: 'Lesson 2: Reporting a Conversation', vi: 'Bài học 2: Tường thuật một Cuộc trò chuyện'},
                    aims: {
                        en: ['Report a conversation about crafts, food, and culture with an ethnic person', 'Use reported speech for questions'],
                        vi: ['Tường thuật một cuộc trò chuyện với người dân tộc thiểu số về nghề thủ công, ẩm thực và văn hóa', 'Sử dụng câu tường thuật cho câu hỏi']
                    },
                    vocabulary: [
                        {term: 'blouse', pronunciation: '/blaʊs/', vietnamese: 'áo cánh'},
                        {term: 'apron', pronunciation: '/ˈeɪprən/', vietnamese: 'tạp dề'},
                        {term: 'sticky rice', pronunciation: '/ˈstɪki raɪs/', vietnamese: 'xôi/gạo nếp'},
                        {term: 'steamed', pronunciation: '/stiːmd/', vietnamese: 'hấp'},
                        {term: 'utensils', pronunciation: '/juːˈtenslz/', vietnamese: 'dụng cụ'},
                        {term: 'corn', pronunciation: '/kɔːrn/', vietnamese: 'ngô/bắp'}
                    ],
                    grammar: [{
                        title: {en: 'Reported speech for questions', vi: 'Câu tường thuật cho câu hỏi'},
                        explanation: {en: ['We use reported speech for questions, using **if/whether** for Yes/No questions and the **Wh-word** for Wh-questions, and shifting the word order and tense.', 'She **asked him what** his favorite food **was**. He **asked her if** she **had been** to Sapa.'], vi: ['Chúng ta dùng câu tường thuật cho câu hỏi, sử dụng **if/whether** cho câu hỏi Yes/No và **từ Wh-** cho câu hỏi Wh-, đồng thời thay đổi thứ tự từ và thì.', 'Cô ấy **hỏi anh ấy món ăn yêu thích của anh ấy là gì**. Anh ấy **hỏi cô ấy liệu** cô ấy **đã từng đến** Sa Pa chưa.'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Role-play meeting an ethnic person, then report the conversation to a friend using reported speech for questions and statements.'], vi: ['Đóng vai kề lại cho bạn bè về cuộc gặp gỡ với một người dân tộc, sử dụng câu tường thuật.'] } }
                    ]
                },
                {
                    id: 80803,
                    title: {en: 'Lesson 3: Fun Things to Do', vi: 'Bài học 3: Những điều Thú vị để làm'},
                    aims: {
                        en: ['Talk about fun activities in ethnic villages in Vietnam', 'Write a paragraph about a trip to an ethnic village'],
                        vi: ['Nói về những điều thú vị để làm tại các làng dân tộc ở Việt Nam', 'Viết một đoạn văn về chuyến đi đến một làng dân tộc']
                    },
                    vocabulary: [
                        { term: 'convincing', pronunciation: '/kənˈvɪnsɪŋ/', vietnamese: 'thuyết phục' },
                        { term: 'support', pronunciation: '/səˈpɔːrt/', vietnamese: 'ủng hộ' },
                        { term: 'traditionally', pronunciation: '/trəˈdɪʃənəli/', vietnamese: 'theo truyền thống' },
                        { term: 'handicraft', pronunciation: '/ˈhændikræft/', vietnamese: 'đồ thủ công mỹ nghệ' }
                    ],
                    grammar: [
                        { title: {en: 'Giving supporting information (facts, examples, opinions)', vi: 'Cung cấp thông tin hỗ trợ (sự thật, ví dụ, ý kiến)'}, explanation: {en: ['Reviewing ways to make writing more convincing by including different types of supporting details (facts, examples, and opinions).'], vi: ['Ôn tập cách làm cho bài viết thuyết phục hơn bằng cách bao gồm các loại chi tiết hỗ trợ khác nhau (sự thật, ví dụ và ý kiến).']} }
                    ],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a paragraph (80-100 words) about a trip to an ethnic village (e.g., Kon K\'Tu or Phia Thap), using supporting details to make the text convincing.'], vi: ['Viết một đoạn văn (80-100 từ) kể về chuyến đi đến một làng dân tộc, sử dụng các thông tin hỗ trợ để làm cho bài viết thuyết phục hơn.'] } }
                    ]
                }
            ]
        },
        {
            id: 809,
            title: { en: 'Unit 9: Career Day', vi: 'Bài 9: Ngày hội Nghề nghiệp' },
            lessons: [
                {
                    id: 80901,
                    title: {en: 'Lesson 1: Jobs', vi: 'Bài học 1: Các Công việc'},
                    aims: {
                        en: ['Talk about different jobs', 'Use relative clauses with "who" and "that"'],
                        vi: ['Nói về các công việc khác nhau', 'Sử dụng mệnh đề quan hệ với "who" và "that"']
                    },
                    vocabulary: [
                        {term: 'cook', pronunciation: '/kʊk/', vietnamese: 'đầu bếp'},
                        {term: 'mechanic', pronunciation: '/mɪˈkænɪk/', vietnamese: 'thợ máy'},
                        {term: 'firefighter', pronunciation: '/ˈfaɪərˌfaɪtər/', vietnamese: 'lính cứu hỏa'},
                        {term: 'accountant', pronunciation: '/əˈkaʊntənt/', vietnamese: 'kế toán'},
                        {term: 'architect', pronunciation: '/ˈɑːrkɪtekt/', vietnamese: 'kiến trúc sư'},
                        {term: 'engineer', pronunciation: '/ˌendʒɪˈnɪr/', vietnamese: 'kỹ sư'},
                        {term: 'nurse', pronunciation: '/nɜːrs/', vietnamese: 'y tá'},
                        {term: 'sales assistant', pronunciation: '/seɪlz əˈsɪstənt/', vietnamese: 'trợ lý bán hàng'}
                    ],
                    grammar: [{
                        title: {en: 'Relative clauses with "who" and "that"', vi: 'Mệnh đề quan hệ với "who" và "that"'},
                        explanation: {en: ['We use relative clauses with **who** (for people) or **that** (for people and things) to define or describe the noun before it.', 'A cook is someone **who** prepares food. An architect is a person **that** designs buildings.'], vi: ['Chúng ta dùng mệnh đề quan hệ với **who** (cho người) hoặc **that** (cho người và vật) để xác định hoặc mô tả danh từ đứng trước nó.', 'Đầu bếp là người **mà** chuẩn bị thức ăn. Kiến trúc sư là người **mà** thiết kế các tòa nhà.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Define different jobs using relative clauses with "who" and "that".'], vi: ['Định nghĩa các công việc khác nhau bằng cách sử dụng mệnh đề quan hệ với "who" và "that".'] } }
                    ]
                },
                {
                    id: 80902,
                    title: {en: 'Lesson 2: Skills and Qualifications', vi: 'Bài học 2: Kỹ năng và Bằng cấp'},
                    aims: {
                        en: ['Talk about skills and qualifications needed for jobs', 'Use "going to" for future plans'],
                        vi: ['Nói về các kỹ năng và bằng cấp cần thiết cho công việc', 'Sử dụng "going to" cho các kế hoạch tương lai']
                    },
                    vocabulary: [
                        {term: 'qualification', pronunciation: '/ˌkwɑːlɪfɪˈkeɪʃn/', vietnamese: 'bằng cấp/trình độ'},
                        {term: 'skill', pronunciation: '/skɪl/', vietnamese: 'kỹ năng'},
                        {term: 'teamwork', pronunciation: '/ˈtiːmwɜːrk/', vietnamese: 'làm việc nhóm'},
                        {term: 'problem-solving', pronunciation: '/ˈprɑːbləm ˈsɑːlvɪŋ/', vietnamese: 'giải quyết vấn đề'},
                        {term: 'degree', pronunciation: '/dɪˈɡriː/', vietnamese: 'bằng đại học'},
                        {term: 'certificate', pronunciation: '/sərˈtɪfɪkət/', vietnamese: 'chứng chỉ'},
                        {term: 'salary', pronunciation: '/ˈsæləri/', vietnamese: 'lương'}
                    ],
                    grammar: [{
                        title: {en: 'Future with "going to"', vi: 'Tương lai với "going to"'},
                        explanation: {en: ['We use **going to** + infinitive to talk about future plans we have already decided or intentions.', 'I **am going to** become a teacher. They **are going to** study accounting.'], vi: ['Chúng ta dùng **going to** + động từ nguyên mẫu để nói về các kế hoạch hoặc dự định đã được quyết định trong tương lai.', 'Tôi **sẽ trở thành** một giáo viên. Họ **sẽ học** kế toán.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss future plans related to education and career using "going to".'], vi: ['Thảo luận về các kế hoạch tương lai liên quan đến giáo dục và nghề nghiệp bằng cách sử dụng "going to".'] } }
                    ]
                },
                {
                    id: 80903,
                    title: {en: 'Lesson 3: Career Day', vi: 'Bài học 3: Ngày hội Nghề nghiệp'},
                    aims: {
                        en: ['Talk about your future job', 'Write an email asking for information about a job'],
                        vi: ['Nói về công việc tương lai của bạn', 'Viết email hỏi thông tin về một công việc']
                    },
                    vocabulary: [
                        { term: 'career day', pronunciation: '/kəˈrɪr deɪ/', vietnamese: 'ngày hội nghề nghiệp' },
                        { term: 'internship', pronunciation: '/ˈɪntɜːrnʃɪp/', vietnamese: 'thực tập' },
                        { term: 'application', pronunciation: '/ˌæplɪˈkeɪʃn/', vietnamese: 'đơn xin việc' },
                        { term: 'interview', pronunciation: '/ˈɪntərvjuː/', vietnamese: 'phỏng vấn' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an email (80-100 words) to a company asking for more information about a job position you are interested in.'], vi: ['Viết một email (80-100 từ) cho một công ty để hỏi thêm thông tin về vị trí công việc mà bạn quan tâm.'] } }
                    ]
                }
            ]
        },
        {
            id: 810,
            title: { en: 'Unit 10: Travel', vi: 'Bài 10: Du lịch' },
            lessons: [
                {
                    id: 81001,
                    title: {en: 'Lesson 1: Travel Destinations', vi: 'Bài học 1: Địa điểm Du lịch'},
                    aims: {
                        en: ['Talk about travel destinations', 'Use the Past Simple and Past Continuous for narrative'],
                        vi: ['Nói về các địa điểm du lịch', 'Sử dụng thì Quá khứ đơn và Quá khứ tiếp diễn để kể chuyện']
                    },
                    vocabulary: [
                        {term: 'resort', pronunciation: '/rɪˈzɔːrt/', vietnamese: 'khu nghỉ dưỡng'},
                        {term: 'waterfall', pronunciation: '/ˈwɔːtərfɔːl/', vietnamese: 'thác nước'},
                        {term: 'temple', pronunciation: '/ˈtempl/', vietnamese: 'đền/chùa'},
                        {term: 'beach', pronunciation: '/biːtʃ/', vietnamese: 'bãi biển'},
                        {term: 'cave', pronunciation: '/keɪv/', vietnamese: 'hang động'},
                        {term: 'museum', pronunciation: '/mjuːˈziːəm/', vietnamese: 'bảo tàng'},
                        {term: 'hot springs', pronunciation: '/hɑːt sprɪŋz/', vietnamese: 'suối nước nóng'},
                        {term: 'market', pronunciation: '/ˈmɑːrkɪt/', vietnamese: 'chợ'}
                    ],
                    grammar: [{
                        title: {en: 'Past Simple and Past Continuous for narrative', vi: 'Thì Quá khứ đơn và Quá khứ tiếp diễn để kể chuyện'},
                        explanation: {en: ['Reviewing the combined use of the Past Continuous (for background) and the Past Simple (for main events in a story or trip).', 'We **were driving** to the hotel when we suddenly **saw** the temple.'], vi: ['Ôn tập cách kết hợp Quá khứ tiếp diễn (cho bối cảnh) và Quá khứ đơn (cho các sự kiện chính trong một câu chuyện hoặc chuyến đi).', 'Chúng tôi **đang lái xe** đến khách sạn thì đột nhiên **nhìn thấy** ngôi đền.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Work in pairs to discuss a past trip and use the Past Continuous and Past Simple to narrate the experience.'], vi: ['Làm việc theo cặp để thảo luận về một chuyến đi trong quá khứ và sử dụng Quá khứ tiếp diễn và Quá khứ đơn để kể lại trải nghiệm.'] } }
                    ]
                },
                {
                    id: 81002,
                    title: {en: 'Lesson 2: Travel Tips', vi: 'Bài học 2: Mẹo Du lịch'},
                    aims: {
                        en: ['Give advice and tips for travel', 'Use sequencing adverbs to organize ideas'],
                        vi: ['Đưa ra lời khuyên và mẹo du lịch', 'Sử dụng trạng từ trình tự để sắp xếp ý tưởng']
                    },
                    vocabulary: [
                        {term: 'tip', pronunciation: '/tɪp/', vietnamese: 'mẹo/lời khuyên'},
                        {term: 'luggage', pronunciation: '/ˈlʌɡɪdʒ/', vietnamese: 'hành lý'},
                        {term: 'pack', pronunciation: '/pæk/', vietnamese: 'đóng gói'},
                        {term: 'budget', pronunciation: '/ˈbʌdʒɪt/', vietnamese: 'ngân sách'},
                        {term: 'local currency', pronunciation: '/ˈloʊkl ˈkɜːrənsi/', vietnamese: 'tiền tệ địa phương'},
                        {term: 'transportation', pronunciation: '/ˌtrænspɔːrˈteɪʃn/', vietnamese: 'giao thông vận tải'}
                    ],
                    grammar: [{
                        title: {en: 'Sequencing adverbs (first, next, then, finally, after that)', vi: 'Trạng từ trình tự (đầu tiên, tiếp theo, sau đó, cuối cùng, sau đó)'},
                        explanation: {en: ['We use sequencing adverbs to clearly organize the steps or stages in a process or narrative.', '**First**, you should book your flight. **Next**, you should pack your bags.'], vi: ['Chúng ta dùng trạng từ trình tự để sắp xếp rõ ràng các bước hoặc giai đoạn trong một quy trình hoặc bài kể chuyện.', '**Đầu tiên**, bạn nên đặt chuyến bay. **Tiếp theo**, bạn nên đóng gói hành lý.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss and share your best travel tips for planning and packing, using sequencing adverbs.'], vi: ['Thảo luận và chia sẻ những mẹo du lịch tốt nhất của bạn để lên kế hoạch và đóng gói, sử dụng trạng từ trình tự.'] } }
                    ]
                },
                {
                    id: 81003,
                    title: {en: 'Lesson 3: A Travel Blog', vi: 'Bài học 3: Blog Du lịch'},
                    aims: {
                        en: ['Talk about a travel experience', 'Write a travel blog post'],
                        vi: ['Nói về một trải nghiệm du lịch', 'Viết một bài blog du lịch']
                    },
                    vocabulary: [
                        { term: 'memorable', pronunciation: '/ˈmemərəbl/', vietnamese: 'đáng nhớ' },
                        { term: 'exotic', pronunciation: '/ɪɡˈzɑːtɪk/', vietnamese: 'ngoại lai/độc đáo' },
                        { term: 'culture', pronunciation: '/ˈkʌltʃər/', vietnamese: 'văn hóa' },
                        { term: 'adventure', pronunciation: '/ədˈventʃər/', vietnamese: 'cuộc phiêu lưu' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a travel blog post (80-100 words) about a memorable trip, describing the place, activities, and what made it special.'], vi: ['Viết một bài blog du lịch (80-100 từ) về một chuyến đi đáng nhớ, mô tả địa điểm, hoạt động và điều gì làm nên sự đặc biệt của nó.'] } }
                    ]
                }
            ]
        }
    ]
};
