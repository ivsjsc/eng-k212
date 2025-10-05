import { CurriculumLevel } from '../types';

export const sw7Data: CurriculumLevel = {
    level: 7,
    title: { en: 'i-Learn Smart World 7', vi: 'i-Learn Smart World 7' },
    subtitle: { en: 'Secondary School - Grade 7', vi: 'Trung học cơ sở - Lớp 7' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1H9LEAJS2xZALd7CUryibtkjKtOXIpEBM/view?usp=drive_link',
    units: [
        {
            id: 701,
            title: { en: 'Unit 1: Free Time', vi: 'Bài 1: Thời gian rảnh' },
            lessons: [
                {
                    id: 70101,
                    title: { en: 'Lesson 1: Hobbies', vi: 'Bài học 1: Sở thích' },
                    aims: {
                        en: ['Ask and answer about hobbies', 'Use the Present Simple for habits'],
                        vi: ['Hỏi và trả lời về sở thích', 'Sử dụng thì Hiện tại đơn cho thói quen'],
                    },
                    vocabulary: [
                        { term: 'collect soccer stickers', pronunciation: '/kəˈlekt ˈsɑːkər ˈstɪkərz/', vietnamese: 'sưu tầm nhãn dán bóng đá' },
                        { term: 'build models', pronunciation: '/bɪld ˈmɑːdlz/', vietnamese: 'xây dựng mô hình' },
                        { term: 'bake cakes', pronunciation: '/beɪk keɪks/', vietnamese: 'nướng bánh' },
                        { term: 'make vlogs', pronunciation: '/meɪk vlɔːɡz/', vietnamese: 'làm vlog' },
                        { term: 'read comics', pronunciation: '/riːd ˈkɑːmɪks/', vietnamese: 'đọc truyện tranh' },
                        { term: 'play online games', pronunciation: '/pleɪ ˈɑːnlaɪn ɡeɪmz/', vietnamese: 'chơi game online' },
                    ],
                    grammar: [
                        { title: { en: 'Present Simple for habits', vi: 'Thì Hiện tại đơn cho thói quen' }, explanation: { en: ['We can use the Present Simple to talk about habits or things that happen regularly.', 'I/You/We/They play soccer.', 'He/She reads comics.', 'What do you do in your free time? - I play soccer on Tuesday evenings.'], vi: ['Chúng ta có thể sử dụng thì Hiện tại đơn để nói về thói quen hoặc những điều xảy ra thường xuyên.', 'Tôi/Bạn/Chúng tôi/Họ chơi bóng đá.', 'Anh ấy/Cô ấy đọc truyện tranh.', 'Bạn làm gì vào thời gian rảnh? - Tôi chơi bóng đá vào các buổi tối thứ Ba.'] } },
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Work in groups to survey popular hobbies and their frequency using "What do you do in your free time?"'], vi: ['Làm việc theo nhóm để khảo sát các sở thích phổ biến và tần suất thực hiện bằng câu hỏi "Bạn làm gì vào thời gian rảnh?"'] } },
                        { type: 'Reading', description: { en: ['Read a blog about a hobby (e.g., building models) and answer comprehension questions.'], vi: ['Đọc một bài blog về sở thích (ví dụ: xây dựng mô hình) và trả lời các câu hỏi đọc hiểu.'] } }
                    ],
                },
                {
                    id: 70102,
                    title: { en: 'Lesson 2: Making Plans', vi: 'Bài học 2: Lên kế hoạch' },
                    aims: {
                        en: ['Make future plans', 'Use the Present Continuous for future plans and prepositions of place', 'Start a friendly conversation'],
                        vi: ['Lên kế hoạch tương lai', 'Sử dụng thì Hiện tại tiếp diễn cho kế hoạch tương lai và giới từ chỉ nơi chốn', 'Bắt đầu một cuộc trò chuyện thân mật'],
                    },
                    vocabulary: [
                        { term: 'sports center', pronunciation: '/spɔːrts ˈsentər/', vietnamese: 'trung tâm thể thao' },
                        { term: 'bowling alley', pronunciation: '/ˈboʊlɪŋ ˈæli/', vietnamese: 'sân chơi bowling' },
                        { term: 'theater', pronunciation: '/ˈθiːətər/', vietnamese: 'nhà hát' },
                        { term: 'ice rink', pronunciation: '/aɪs rɪŋk/', vietnamese: 'sân băng' },
                        { term: 'water park', pronunciation: '/ˈwɔːtər pɑːrk/', vietnamese: 'công viên nước' },
                        { term: 'market', pronunciation: '/ˈmɑːrkɪt/', vietnamese: 'chợ' },
                        { term: 'fair', pronunciation: '/fer/', vietnamese: 'hội chợ' },
                    ],
                    grammar: [
                        { title: { en: 'Present Continuous for future plans', vi: 'Thì Hiện tại tiếp diễn cho kế hoạch tương lai' }, explanation: { en: ['We can use the Present Continuous to talk about future plans.', 'I\'m going to the sports center tonight.', 'He/She is going to the bowling alley this evening.'], vi: ['Chúng ta có thể sử dụng thì Hiện tại tiếp diễn để nói về các kế hoạch trong tương lai.', 'Tôi sẽ đến trung tâm thể thao tối nay.', 'Anh ấy/Cô ấy sẽ đến sân chơi bowling tối nay.'] } },
                        { title: { en: 'Prepositions of place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ['We use prepositions of place to talk about where something or someone is located.', 'in front of, behind, next to, opposite.'], vi: ['Chúng ta sử dụng giới từ chỉ nơi chốn để nói về vị trí của một cái gì đó hoặc ai đó.', 'ở phía trước, phía sau, bên cạnh, đối diện.'] } },
                    ],
                    activities: [
                        { type: 'Listening', description: { en: ['Listen to a conversation about making plans and answer comprehension questions.'], vi: ['Nghe một cuộc hội thoại về việc lên kế hoạch và trả lời các câu hỏi.'] } },
                        { type: 'Role-play', description: { en: ['Work in pairs (Student A and B) to invite a friend out, arranging the time and place using the learned grammar.'], vi: ['Làm việc theo cặp, mời bạn bè đi chơi, sắp xếp thời gian và địa điểm gặp mặt.'] } }
                    ],
                },
                {
                    id: 70103,
                    title: { en: 'Lesson 3: Extreme Sports', vi: 'Bài học 3: Thể thao mạo hiểm' },
                    aims: {
                        en: ['Talk about extreme sports', 'Write emails inviting people to join you in an activity'],
                        vi: ['Nói về các môn thể thao mạo hiểm', 'Viết email mời mọi người tham gia một hoạt động'],
                    },
                    vocabulary: [
                        { term: 'skateboarding', pronunciation: '/ˈskeɪtbɔːrdɪŋ/', vietnamese: 'trượt ván' },
                        { term: 'surfing', pronunciation: '/ˈsɜːrfɪŋ/', vietnamese: 'lướt sóng' },
                        { term: 'rock climbing', pronunciation: '/rɑːk ˈklaɪmɪŋ/', vietnamese: 'leo núi đá' },
                        { term: 'zorbing', pronunciation: '/ˈzɔːrbɪŋ/', vietnamese: 'trượt bóng zorbing' },
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss extreme sports using pictures and state whether you would try them and why.'], vi: ['Thảo luận về các môn thể thao mạo hiểm bằng hình ảnh và nói liệu bạn có muốn thử chúng không và tại sao.'] } },
                        { type: 'Reading & Analysis', description: { en: ['Read an invitation email and analyze its structure (greeting, invitation, details, request for reply, closing).'], vi: ['Đọc một email mời và phân tích cấu trúc của nó (lời chào, lời mời, chi tiết, yêu cầu phản hồi, kết thư).'] } },
                        { type: 'Writing', description: { en: ['Write an invitation email (60-80 words) to a friend to join an activity.'], vi: ['Viết một email mời (60-80 từ) cho một người bạn tham gia một hoạt động.'] } }
                    ],
                }
            ]
        },
        {
            id: 702,
            title: { en: 'Unit 2: Health', vi: 'Bài 2: Sức khỏe' },
            lessons: [
                 {
                    id: 70201,
                    title: { en: 'Lesson 1: Healthy Lifestyle', vi: 'Bài học 1: Lối sống lành mạnh' },
                    aims: {
                        en: ['Talk about what makes a healthy lifestyle', 'Use indefinite quantifiers'],
                        vi: ['Nói về điều gì tạo nên một lối sống lành mạnh', 'Sử dụng các lượng từ bất định']
                    },
                    vocabulary: [
                        { term: 'get (some) sleep', pronunciation: '/ɡet (sʌm) sliːp/', vietnamese: 'ngủ một chút' },
                        { term: 'eat fruit and vegetables', pronunciation: '/iːt fruːt ænd ˈvɛdʒtəbəlz/', vietnamese: 'ăn trái cây và rau củ' },
                        { term: 'eat fast food', pronunciation: '/iːt fæst fuːd/', vietnamese: 'ăn đồ ăn nhanh' },
                        { term: 'drink soda', pronunciation: '/drɪŋk ˈsoʊdə/', vietnamese: 'uống soda' },
                        { term: 'healthy', pronunciation: '/ˈhɛlθi/', vietnamese: 'khỏe mạnh' },
                        { term: 'unhealthy', pronunciation: '/ʌnˈhɛlθi/', vietnamese: 'không lành mạnh' },
                    ],
                    grammar: [{
                        title: { en: 'Indefinite quantifiers', vi: 'Lượng từ bất định' },
                        explanation: { en: ['We can use a little/not much (uncountable), some/a lot of/lots of (uncountable and plural countable), and not any/none (uncountable and plural countable) to say how much we do something.', 'Questions: How much...? (uncountable) / How many...? (countable).'], vi: ['Chúng ta có thể sử dụng a little/not much (không đếm được), some/a lot of/lots of (không đếm được và đếm được số nhiều), và not any/none (không đếm được và đếm được số nhiều) để nói về mức độ chúng ta làm điều gì đó.', 'Câu hỏi: How much...? (không đếm được) / How many...? (đếm được).'] }
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a class survey report on healthy lifestyles and answer comprehension questions.'], vi: ['Đọc báo cáo khảo sát của lớp về lối sống lành mạnh và trả lời câu hỏi đọc hiểu.'] } },
                        { type: 'Speaking', description: { en: ['Conduct a group survey using "How much...?" and "How many...?" to find out who has the healthiest lifestyle.'], vi: ['Thực hiện một cuộc khảo sát nhóm sử dụng "How much...?" và "How many...?" để tìm ra ai có lối sống lành mạnh nhất.'] } }
                    ]
                },
                {
                    id: 70202,
                    title: { en: 'Lesson 2: Advice', vi: 'Bài học 2: Lời khuyên' },
                    aims: {
                        en: ['Give advice and persuade someone to have a healthy lifestyle', 'Use "should" and "shouldn\'t"'],
                        vi: ['Đưa ra lời khuyên và thuyết phục ai đó có lối sống lành mạnh', 'Sử dụng "should" và "shouldn\'t"']
                    },
                    vocabulary: [
                        { term: 'feel weak', pronunciation: '/fiːl wiːk/', vietnamese: 'cảm thấy yếu' },
                        { term: 'have a sore throat', pronunciation: '/hæv ə sɔːr θroʊt/', vietnamese: 'bị đau họng' },
                        { term: 'get some rest', pronunciation: '/ɡet sʌm rest/', vietnamese: 'nghỉ ngơi' },
                        { term: 'take vitamins', pronunciation: '/teɪk ˈvaɪtəmɪnz/', vietnamese: 'uống vitamin' },
                        { term: 'have a fever', pronunciation: '/hæv ə ˈfiːvər/', vietnamese: 'bị sốt' },
                        { term: 'take medicine', pronunciation: '/teɪk ˈmɛdəsɪn/', vietnamese: 'uống thuốc' },
                        { term: 'stay up late', pronunciation: '/steɪ ʌp leɪt/', vietnamese: 'thức khuya' },
                        { term: 'keep warm', pronunciation: '/kiːp wɔːrm/', vietnamese: 'giữ ấm' },
                    ],
                    grammar: [{
                        title: { en: 'should / shouldn\'t', vi: 'should / shouldn\'t' },
                        explanation: { en: ['We can use should and shouldn\'t to give advice. We can use should to ask for advice.', 'You should eat fresh fruit. You shouldn\'t eat fast food.', 'What should I do? Should I take some medicine?'], vi: ['Chúng ta có thể dùng should và shouldn\'t để đưa ra lời khuyên. Chúng ta có thể dùng should để hỏi xin lời khuyên.', 'Bạn nên ăn trái cây tươi. Bạn không nên ăn đồ ăn nhanh.', 'Tôi nên làm gì? Tôi có nên uống thuốc không?'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Work in pairs: Student A is a doctor, Student B is a patient. The doctor asks about symptoms and habits and gives advice using "should/shouldn\'t".'], vi: ['Làm việc theo cặp: Học sinh A là bác sĩ, Học sinh B là bệnh nhân. Bác sĩ hỏi về triệu chứng và thói quen, sau đó đưa ra lời khuyên bằng "should/shouldn\'t".'] } }
                    ]
                },
                {
                    id: 70203,
                    title: { en: 'Lesson 3: Healthy Food', vi: 'Bài học 3: Thực phẩm lành mạnh' },
                    aims: {
                        en: ['Talk about healthy food', 'Write a request letter'],
                        vi: ['Nói về thực phẩm lành mạnh', 'Viết một lá thư yêu cầu']
                    },
                    vocabulary: [
                        { term: 'cafeteria', pronunciation: '/ˌkæfəˈtɪəriə/', vietnamese: 'căng-tin' },
                        { term: 'principal', pronunciation: '/ˈprɪnsəpl/', vietnamese: 'hiệu trưởng' },
                        { term: 'provide', pronunciation: '/prəˈvaɪd/', vietnamese: 'cung cấp' },
                        { term: 'brain food', pronunciation: '/breɪn fuːd/', vietnamese: 'thực phẩm tốt cho trí não' },
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a request letter to the principal and analyze its formal structure (address, greeting, problem, solution, closing).'], vi: ['Đọc lá thư yêu cầu gửi hiệu trưởng và phân tích cấu trúc trang trọng của nó (địa chỉ, lời chào, vấn đề, đề xuất giải pháp, kết thư).'] } },
                        { type: 'Writing', description: { en: ['Write a request letter (60-80 words) to the principal suggesting improvements for the school cafeteria menu.'], vi: ['Viết một lá thư yêu cầu (60-80 từ) gửi hiệu trưởng đề xuất cải thiện thực đơn căng-tin trường.'] } }
                    ]
                }
            ]
        },
        {
            id: 703,
            title: { en: 'Unit 3: Music and Arts', vi: 'Bài 3: Âm nhạc và Nghệ thuật' },
            lessons: [
                {
                    id: 70301,
                    title: {en: 'Lesson 1: Music Types', vi: 'Bài học 1: Các loại nhạc'},
                    aims: {
                        en: ['Talk about music that you like', 'Use the Present Simple for facts'],
                        vi: ['Nói về thể loại nhạc bạn thích', 'Sử dụng thì Hiện tại đơn cho các sự thật']
                    },
                    vocabulary: [
                        {term: 'jazz', pronunciation: '/dʒæz/', vietnamese: 'nhạc jazz'},
                        {term: 'pop', pronunciation: '/pɑːp/', vietnamese: 'nhạc pop'},
                        {term: 'hip hop', pronunciation: '/ˈhɪp hɑːp/', vietnamese: 'nhạc hip hop'},
                        {term: 'classical music', pronunciation: '/ˈklæsɪkl ˈmjuːzɪk/', vietnamese: 'nhạc cổ điển'},
                        {term: 'rock', pronunciation: '/rɑːk/', vietnamese: 'nhạc rock'},
                        {term: 'country (music)', pronunciation: '/ˈkʌntri ˈmjuːzɪk/', vietnamese: 'nhạc đồng quê'},
                        {term: 'boring', pronunciation: '/ˈbɔːrɪŋ/', vietnamese: 'nhàm chán'},
                        {term: 'interesting', pronunciation: '/ˈɪntrəstɪŋ/', vietnamese: 'thú vị'},
                        {term: 'exciting', pronunciation: '/ɪkˈsaɪtɪŋ/', vietnamese: 'hấp dẫn'}
                    ],
                    grammar: [{
                        title: {en: 'Present Simple for facts', vi: 'Thì Hiện tại đơn cho sự thật'},
                        explanation: {en: ['We can use the Present Simple to talk about things that we consider as facts (such as likes and dislikes).', 'I like jazz. Does he enjoy listening to rock?'], vi: ['Chúng ta có thể sử dụng thì Hiện tại đơn để nói về những điều chúng ta coi là sự thật (chẳng hạn như sở thích và không thích).', 'Tôi thích nhạc jazz. Anh ấy có thích nghe nhạc rock không?']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read blogs about two different people\'s music interests (e.g., Binh and Linh).'], vi: ['Đọc các bài blog về sở thích âm nhạc của hai người khác nhau (ví dụ: Bình và Linh).'] } },
                        { type: 'Speaking', description: { en: ['Conduct a music survey in groups using "What kind of music do you like?" and "Why?".'], vi: ['Thực hiện khảo sát âm nhạc trong nhóm bằng câu hỏi "Bạn thích loại nhạc nào?" và "Tại sao?".'] } }
                    ]
                },
                {
                    id: 70302,
                    title: {en: 'Lesson 2: Music Events', vi: 'Bài học 2: Sự kiện âm nhạc'},
                    aims: {
                        en: ['Plan to go to a music event', 'Use prepositions of time and possessive adjectives'],
                        vi: ['Lên kế hoạch đi xem một sự kiện âm nhạc', 'Sử dụng giới từ chỉ thời gian và tính từ sở hữu']
                    },
                    vocabulary: [
                        {term: 'electronic', pronunciation: '/ɪˌlɛkˈtrɑːnɪk/', vietnamese: 'nhạc điện tử'},
                        {term: 'heavy metal', pronunciation: '/ˈhɛvi ˈmɛtl/', vietnamese: 'nhạc heavy metal'},
                        {term: 'reggae', pronunciation: '/ˈrɛɡeɪ/', vietnamese: 'nhạc reggae'},
                        {term: 'blues', pronunciation: '/bluːz/', vietnamese: 'nhạc blues'},
                        {term: 'folk (music)', pronunciation: '/foʊk ˈmjuːzɪk/', vietnamese: 'nhạc dân gian'},
                        {term: 'RnB', pronunciation: '/ˌɑːr ən ˈbiː/', vietnamese: 'nhạc RnB'}
                    ],
                    grammar: [
                        {title: {en: 'Prepositions of time', vi: 'Giới từ chỉ thời gian'}, explanation: {en: ['We use **in** with parts of the day, months, seasons, and years. We use **on** with days and dates. We use **at** with times of the day and meals.'], vi: ['Chúng ta dùng **in** với các buổi trong ngày, tháng, mùa và năm. Chúng ta dùng **on** với các ngày và ngày tháng. Chúng ta dùng **at** với thời gian trong ngày và các bữa ăn.']}},
                        {title: {en: 'Possessive adjectives', vi: 'Tính từ sở hữu'}, explanation: {en: ['We use possessive adjectives to express possession.', '**my**, **your**, **his**, **her**, **its**, **our**, **their**.'], vi: ['Chúng ta dùng tính từ sở hữu để diễn tả sự sở hữu.', '**my**, **your**, **his**, **her**, **its**, **our**, **their**.']}}
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Work in pairs to plan a visit to a music festival, select 4 artists/performances from a schedule to watch.'], vi: ['Làm việc theo cặp để lên kế hoạch đi xem lễ hội âm nhạc, chọn 4 nghệ sĩ/buổi biểu diễn từ lịch biểu diễn để đi xem.'] } }
                    ]
                },
                {
                    id: 70303,
                    title: {en: 'Lesson 3: Movies', vi: 'Bài học 3: Phim ảnh'},
                    aims: {
                        en: ['Talk about a movie you like', 'Write a paragraph describing a movie'],
                        vi: ['Nói về một bộ phim bạn thích', 'Viết một đoạn văn mô tả một bộ phim']
                    },
                    vocabulary: [
                        {term: 'conclusion', pronunciation: '/kənˈkluːʒən/', vietnamese: 'kết luận'},
                        {term: 'plot', pronunciation: '/plɑːt/', vietnamese: 'cốt truyện'},
                        {term: 'star', pronunciation: '/stɑːr/', vietnamese: 'ngôi sao (diễn viên chính)'},
                        {term: 'setting', pronunciation: '/ˈsɛtɪŋ/', vietnamese: 'bối cảnh'}
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a movie description (e.g., "The Dark Knight") and analyze its structure (introduction, plot summary, details, conclusion).'], vi: ['Đọc bài mô tả phim (ví dụ: "The Dark Knight") và phân tích cấu trúc (giới thiệu, tóm tắt nội dung, chi tiết khác, kết luận).'] } },
                        { type: 'Writing', description: { en: ['Write a paragraph (60-80 words) describing your favorite movie.'], vi: ['Viết một đoạn văn (60-80 từ) mô tả bộ phim mình yêu thích.'] } }
                    ]
                }
            ]
        },
        {
            id: 704,
            title: { en: 'Unit 4: Community Services', vi: 'Bài 4: Dịch vụ Cộng đồng' },
            lessons: [
                {
                    id: 70401,
                    title: {en: 'Lesson 1: Charity Events', vi: 'Bài học 1: Sự kiện từ thiện'},
                    aims: {
                        en: ['Suggest and plan a charity event', 'Use "should," "Let\'s," and "How about" to make suggestions'],
                        vi: ['Đề xuất và lên kế hoạch cho một sự kiện từ thiện', 'Sử dụng "should," "Let\'s," và "How about" để đưa ra gợi ý']
                    },
                    vocabulary: [
                        {term: 'car wash', pronunciation: '/kɑːr wɑːʃ/', vietnamese: 'rửa xe'},
                        {term: 'bake sale', pronunciation: '/beɪk seɪl/', vietnamese: 'bán bánh gây quỹ'},
                        {term: 'craft fair', pronunciation: '/kræft fer/', vietnamese: 'hội chợ thủ công'},
                        {term: 'talent show', pronunciation: '/ˈtælənt ʃoʊ/', vietnamese: 'buổi biểu diễn tài năng'},
                        {term: 'fun run', pronunciation: '/fʌn rʌn/', vietnamese: 'cuộc chạy bộ vui vẻ'},
                        {term: 'volunteer', pronunciation: '/ˌvɑːlənˈtɪər/', vietnamese: 'tình nguyện viên'},
                        {term: 'organize', pronunciation: '/ˈɔːrɡənaɪz/', vietnamese: 'tổ chức'}
                    ],
                    grammar: [{
                        title: {en: 'Making suggestions', vi: 'Đưa ra gợi ý'},
                        explanation: {en: ['We can make suggestions to offer ideas or plans for someone to think about.', '**should** + bare infinitive', '**Let\'s** + bare infinitive', '**How about** + V-ing?'], vi: ['Chúng ta có thể đưa ra gợi ý để đề xuất ý tưởng hoặc kế hoạch cho ai đó suy nghĩ.', '**should** + động từ nguyên mẫu', '**Let\'s** + động từ nguyên mẫu', '**How about** + V-ing?']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Plan a class charity event, discussing the type of event, name, and volunteer jobs needed.'], vi: ['Lên kế hoạch cho một sự kiện từ thiện của lớp, thảo luận về loại sự kiện, tên gọi và các công việc cần tình nguyện viên.'] } }
                    ]
                },
                {
                    id: 70402,
                    title: {en: 'Lesson 2: Helping the Community', vi: 'Bài học 2: Giúp đỡ cộng đồng'},
                    aims: {
                        en: ['Talk about things we did to help our community', 'Use the Past Simple with regular verbs'],
                        vi: ['Nói về những việc chúng ta đã làm để giúp đỡ cộng đồng', 'Sử dụng thì Quá khứ đơn với động từ có quy tắc']
                    },
                    vocabulary: [
                        {term: 'recycle', pronunciation: '/ˌriːˈsaɪkl/', vietnamese: 'tái chế'},
                        {term: 'raise (money)', pronunciation: '/reɪz/', vietnamese: 'quyên góp (tiền)'},
                        {term: 'plant (trees)', pronunciation: '/plænt/', vietnamese: 'trồng (cây)'},
                        {term: 'donate (books)', pronunciation: '/ˈdoʊneɪt/', vietnamese: 'hiến tặng (sách)'},
                        {term: 'clean up (parks)', pronunciation: '/kliːn ʌp/', vietnamese: 'dọn dẹp (công viên)'}
                    ],
                    grammar: [{
                        title: {en: 'Past Simple with regular verbs', vi: 'Thì Quá khứ đơn với động từ có quy tắc'},
                        explanation: {en: ['We use the Past Simple to talk about an action that started and finished in the past. We add -ed to regular verbs.', 'Last month, we **raised** money to help the local charity.'], vi: ['Chúng ta sử dụng thì Quá khứ đơn để nói về một hành động đã bắt đầu và kết thúc trong quá khứ. Chúng ta thêm -ed vào động từ có quy tắc.', 'Tháng trước, chúng tôi đã **quyên góp** tiền để giúp đỡ tổ chức từ thiện địa phương.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Ask and answer questions about community activities done last month using the Past Simple.'], vi: ['Hỏi và trả lời về các hoạt động cộng đồng đã làm trong tháng trước.'] } }
                    ]
                },
                {
                    id: 70403,
                    title: {en: 'Lesson 3: Environmental Clean-up', vi: 'Bài học 3: Dọn dẹp môi trường'},
                    aims: {
                        en: ['Talk about how to help the environment', 'Write an email about an environmental clean-up'],
                        vi: ['Nói về cách giúp đỡ môi trường', 'Viết một email về một cuộc dọn dẹp môi trường']
                    },
                    vocabulary: [
                        {term: 'clean-up', pronunciation: '/ˈkliːn ʌp/', vietnamese: 'hoạt động dọn dẹp'},
                        {term: 'garbage', pronunciation: '/ˈɡɑːrbɪdʒ/', vietnamese: 'rác thải'}
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an email from a friend about their beach clean-up experience.'], vi: ['Đọc email của một người bạn kể về trải nghiệm dọn dẹp bãi biển của họ.'] } },
                        { type: 'Writing', description: { en: ['Write an email (60-80 words) to a friend describing your own past experience in an environmental clean-up activity.'], vi: ['Viết một email (60-80 từ) kể cho bạn bè về một hoạt động dọn dẹp môi trường mà bạn đã tham gia.'] } }
                    ]
                }
            ]
        },
        {
            id: 705,
            title: { en: 'Unit 5: Food and Drinks', vi: 'Bài 5: Đồ ăn và Thức uống' },
            lessons: [
                {
                    id: 70501,
                    title: {en: 'Lesson 1: Ingredients', vi: 'Bài học 1: Nguyên liệu'},
                    aims: {
                        en: ['Talk about what food you need to buy', 'Use quantifiers and amounts'],
                        vi: ['Nói về thực phẩm bạn cần mua', 'Sử dụng các từ chỉ số lượng và khối lượng']
                    },
                    vocabulary: [
                        {term: 'spaghetti', pronunciation: '/spəˈɡɛti/', vietnamese: 'mì Ý'},
                        {term: 'milliliters (ml)', pronunciation: '/ˈmɪlɪˌliːtərz/', vietnamese: 'mililit'},
                        {term: 'lemon', pronunciation: '/ˈlɛmən/', vietnamese: 'chanh vàng'},
                        {term: 'grams (g)', pronunciation: '/ɡræmz/', vietnamese: 'gam'},
                        {term: 'tablespoon (tbsp)', pronunciation: '/ˈteɪblspuːn/', vietnamese: 'thìa canh'},
                        {term: 'onion', pronunciation: '/ˈʌnjən/', vietnamese: 'hành tây'},
                        {term: 'teaspoon (tsp)', pronunciation: '/ˈtiːspuːn/', vietnamese: 'thìa cà phê'},
                        {term: 'tomato', pronunciation: '/təˈmeɪtoʊ/', vietnamese: 'cà chua'}
                    ],
                    grammar: [{
                        title: {en: 'Much and Many', vi: 'Much và Many'},
                        explanation: {en: ['We can use **much** for uncountable nouns and **many** for plural countable nouns.', '**How much** sugar do we need?', '**How many** eggs do we need?'], vi: ['Chúng ta có thể dùng **much** cho danh từ không đếm được và **many** cho danh từ đếm được số nhiều.', 'Chúng ta cần **bao nhiêu** đường?', 'Chúng ta cần **bao nhiêu** trứng?']}
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Work in pairs: one person asks about the necessary amount of ingredients from a recipe, the other answers.'], vi: ['Làm việc theo cặp: một người hỏi về số lượng nguyên liệu cần thiết từ công thức, người kia trả lời.'] } }
                    ]
                },
                {
                    id: 70502,
                    title: {en: 'Lesson 2: Containers', vi: 'Bài học 2: Đồ đựng'},
                    aims: {
                        en: ['Talk about containers and quantities of food and drinks', 'Use indefinite and definite articles'],
                        vi: ['Nói về đồ đựng và số lượng đồ ăn, thức uống', 'Sử dụng mạo từ không xác định và xác định']
                    },
                    vocabulary: [
                        {term: 'bag', pronunciation: '/bæɡ/', vietnamese: 'túi'},
                        {term: 'bunch', pronunciation: '/bʌntʃ/', vietnamese: 'nải, chùm'},
                        {term: 'can', pronunciation: '/kæn/', vietnamese: 'lon'},
                        {term: 'bottle', pronunciation: '/ˈbɑːtl/', vietnamese: 'chai'},
                        {term: 'stick', pronunciation: '/stɪk/', vietnamese: 'thỏi'},
                        {term: 'carton', pronunciation: '/ˈkɑːrtn/', vietnamese: 'hộp (giấy)'},
                        {term: 'box', pronunciation: '/bɑːks/', vietnamese: 'hộp'}
                    ],
                    grammar: [{
                        title: {en: 'Indefinite and definite articles', vi: 'Mạo từ không xác định và xác định'},
                        explanation: {en: ['We use **a/an** with singular nouns when we talk about something for the first time. After that, we use **the**.', 'I bought a can of beans. I put the can of beans in the cupboard.'], vi: ['Chúng ta dùng **a/an** với danh từ số ít khi nói về một cái gì đó lần đầu tiên. Sau đó, chúng ta dùng **the**.', 'Tôi đã mua một lon đậu. Tôi đã đặt lon đậu vào tủ.']}
                    }],
                    activities: [
                        { type: 'Speaking Game', description: { en: ['Play a game about identifying what containers of food/drink are in your kitchen.'], vi: ['Chơi trò chơi về việc xác định các vật đựng thực phẩm/đồ uống trong bếp của bạn.'] } }
                    ]
                },
                {
                    id: 70503,
                    title: {en: 'Lesson 3: Unusual Food', vi: 'Bài học 3: Món ăn lạ'},
                    aims: {
                        en: ['Talk about unusual food posts in Vietnam', 'Write a food blog post'],
                        vi: ['Nói về các bài đăng món ăn lạ ở Việt Nam', 'Viết một bài blog về ẩm thực']
                    },
                    vocabulary: [
                        {term: 'fried insects', pronunciation: '/fraɪd ˈɪnsɛkts/', vietnamese: 'côn trùng chiên'},
                        {term: 'spices', pronunciation: '/ˈspaɪsɪz/', vietnamese: 'gia vị'},
                        {term: 'garlic', pronunciation: '/ˈɡɑːrlɪk/', vietnamese: 'tỏi'},
                        {term: 'crunchy', pronunciation: '/ˈkrʌntʃi/', vietnamese: 'giòn'}
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading', description: { en: ['Read a blog post about an unusual food (e.g., fried insects) and answer comprehension questions.'], vi: ['Đọc một bài blog về một món ăn lạ (ví dụ: côn trùng chiên) và trả lời câu hỏi đọc hiểu.'] } },
                        { type: 'Writing', description: { en: ['Write a food blog post (60-80 words) about a specialty or unusual dish from your local area.'], vi: ['Viết một bài blog (60-80 từ) về một món đặc sản hoặc món ăn lạ từ địa phương của bạn.'] } }
                    ]
                }
            ]
        },
        {
            id: 706,
            title: { en: 'Unit 6: Education', vi: 'Bài 6: Giáo dục' },
            lessons: [
                {
                    id: 70601,
                    title: {en: 'Lesson 1: School Work', vi: 'Bài học 1: Việc học ở trường'},
                    aims: {
                        en: ['Decline invitations and express obligations', 'Use Present Simple and "have to"'],
                        vi: ['Từ chối lời mời và bày tỏ nghĩa vụ', 'Sử dụng thì Hiện tại đơn và "have to"']
                    },
                    vocabulary: [
                        {term: 'essay', pronunciation: '/ˈɛseɪ/', vietnamese: 'bài luận'},
                        {term: 'project', pronunciation: '/ˈprɑːdʒɛkt/', vietnamese: 'dự án'},
                        {term: 'homework', pronunciation: '/ˈhoʊmwɜːrk/', vietnamese: 'bài tập về nhà'},
                        {term: 'book report', pronunciation: '/bʊk rɪˈpɔːrt/', vietnamese: 'bài báo cáo sách'},
                        {term: 'test', pronunciation: '/tɛst/', vietnamese: 'bài kiểm tra'},
                        {term: 'presentation', pronunciation: '/ˌpriːzɛnˈteɪʃən/', vietnamese: 'bài thuyết trình'}
                    ],
                    grammar: [{
                        title: {en: 'have to', vi: 'have to'},
                        explanation: {en: ['We use **have to** + infinitive to talk about actions we are obligated to do (an external obligation).', 'I **have to** study for a test. He **has to** do homework.'], vi: ['Chúng ta dùng **have to** + động từ nguyên mẫu để nói về một hành động mà chúng ta bắt buộc phải làm (nghĩa vụ bên ngoài).', 'Tôi **phải** học cho bài kiểm tra. Anh ấy **phải** làm bài tập về nhà.'] }
                    }],
                    activities: [
                        { type: 'Role-play', description: { en: ['Work in pairs to invite a friend to an activity; the friend must decline, giving a reason using "have to".'], vi: ['Làm việc theo cặp, mời một người bạn đi chơi và người bạn đó từ chối, đưa ra lý do bằng cách dùng "have to".'] } }
                    ]
                },
                {
                    id: 70602,
                    title: {en: 'Lesson 2: Feelings about School', vi: 'Bài học 2: Cảm xúc về trường học'},
                    aims: {
                        en: ['Talk about how you feel about school', 'Use intensifiers and "because"'],
                        vi: ['Nói về cảm xúc của bạn về trường học', 'Sử dụng các từ nhấn mạnh và "because"']
                    },
                    vocabulary: [
                        {term: 'upset', pronunciation: '/ʌpˈsɛt/', vietnamese: 'buồn bã'},
                        {term: 'fail', pronunciation: '/feɪl/', vietnamese: 'trượt'},
                        {term: 'pleased', pronunciation: '/pliːzd/', vietnamese: 'hài lòng'},
                        {term: 'disappointed', pronunciation: '/ˌdɪsəˈpɔɪntɪd/', vietnamese: 'thất vọng'},
                        {term: 'surprised', pronunciation: '/sərˈpraɪzd/', vietnamese: 'ngạc nhiên'},
                        {term: 'delighted', pronunciation: '/dɪˈlaɪtɪd/', vietnamese: 'vui mừng'},
                        {term: 'annoyed', pronunciation: '/əˈnɔɪd/', vietnamese: 'bực mình'},
                        {term: 'pass', pronunciation: '/pæs/', vietnamese: 'đỗ'}
                    ],
                    grammar: [
                        {title: {en: 'because', vi: 'because'}, explanation: {en: ['We use the subordinating conjunction **because** to connect two clauses and introduce a reason.', 'I failed my math test **because** I didn\'t study.'], vi: ['Chúng ta dùng liên từ phụ thuộc **because** để nối hai mệnh đề trong một câu và đưa ra lý do.', 'Tôi đã trượt bài kiểm tra toán **vì** tôi không học.']}},
                        {title: {en: 'so and really', vi: 'so và really'}, explanation: {en: ['We use the intensifiers **so** and **really** to make adjectives stronger.', 'He is **so** happy because he passed his test.'], vi: ['Chúng ta dùng các từ nhấn mạnh **so** và **really** để làm cho tính từ mạnh hơn.', 'Anh ấy **rất** vui vì đã đỗ bài kiểm tra.']}}
                    ],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss feelings after an exam (e.g., "I\'m really pleased because I got an A on my math test.")'], vi: ['Thảo luận về cảm xúc sau một kỳ thi, sử dụng từ vựng và ngữ pháp đã học.'] } }
                    ]
                },
                {
                    id: 70603,
                    title: {en: 'Lesson 3: Studying Abroad', vi: 'Bài học 3: Du học'},
                    aims: {
                        en: ['Talk about studying abroad', 'Write a paragraph about studying abroad'],
                        vi: ['Nói về việc du học', 'Viết một đoạn văn về việc du học']
                    },
                    vocabulary: [
                        { term: 'study abroad', pronunciation: '/ˌstʌdi əˈbrɔːd/', vietnamese: 'du học' },
                        { term: 'experience', pronunciation: '/ɪkˈspɪəriəns/', vietnamese: 'trải nghiệm' },
                        { term: 'public transportation', pronunciation: '/ˌpʌblɪk ˌtrænspɔːrˈteɪʃn/', vietnamese: 'phương tiện giao thông công cộng' }
                    ],
                    grammar: [{
                        title: {en: 'Using conjunctions (however, although)', vi: 'Sử dụng liên từ (however, although)'},
                        explanation: {en: ['To show two contrasting ideas, you should use **however** (connector) and **although** (subordinating conjunction).', 'E.g., Although I woke up early, I missed the bus. I woke up early; however, I missed the bus.'], vi: ['Để thể hiện hai ý tưởng tương phản, bạn nên dùng **however** và **although**.', 'Mặc dù tôi thức dậy sớm, tôi đã lỡ chuyến xe buýt. Tôi thức dậy sớm; tuy nhiên, tôi đã lỡ chuyến xe buýt.']}
                    }],
                    activities: [
                        { type: 'Reading', description: { en: ['Read an article about a student\'s study abroad experience (e.g., in Spain).'], vi: ['Đọc bài viết của Anna về trải nghiệm du học ở Tây Ban Nha.'] } },
                        { type: 'Writing', description: { en: ['Write a paragraph (60-80 words) about the pros and cons of studying abroad, using "however" and "although".'], vi: ['Viết một đoạn văn (60-80 từ) về những mặt tích cực và tiêu cực của việc du học, sử dụng "however" và "although".'] } }
                    ]
                }
            ]
        },
        {
            id: 707,
            title: { en: 'Unit 7: Transportation', vi: 'Bài 7: Giao thông' },
            lessons: [
                {
                    id: 70701,
                    title: {en: 'Lesson 1: At the Airport', vi: 'Bài học 1: Ở sân bay'},
                    aims: {
                        en: ['Describe and identify personal belongings', 'Use possessive pronouns and adjectives in order'],
                        vi: ['Mô tả và nhận dạng đồ dùng cá nhân', 'Sử dụng đại từ sở hữu và tính từ theo thứ tự']
                    },
                    vocabulary: [
                        {term: 'boarding pass', pronunciation: '/ˈbɔːrdɪŋ pæs/', vietnamese: 'thẻ lên máy bay'},
                        {term: 'passport', pronunciation: '/ˈpæspɔːrt/', vietnamese: 'hộ chiếu'},
                        {term: 'customs', pronunciation: '/ˈkʌstəmz/', vietnamese: 'hải quan'},
                        {term: 'baggage claim', pronunciation: '/ˈbæɡɪdʒ kleɪm/', vietnamese: 'nơi nhận hành lý'},
                        {term: 'suitcase', pronunciation: '/ˈsuːtkeɪs/', vietnamese: 'va li'},
                        {term: 'backpack', pronunciation: '/ˈbækpæk/', vietnamese: 'ba lô'},
                        {term: 'luggage', pronunciation: '/ˈlʌɡɪdʒ/', vietnamese: 'hành lý'}
                    ],
                    grammar: [
                        {title: {en: 'Ordering adjectives', vi: 'Thứ tự tính từ'}, explanation: {en: ['We put adjectives in the order of size, age, color in our sentences.', 'Mine is a small new yellow backpack.'], vi: ['Chúng ta đặt tính từ theo thứ tự kích thước, tuổi, màu sắc trong câu.', 'Của tôi là một chiếc ba lô màu vàng, mới, nhỏ.']}},
                        {title: {en: 'Possessive Pronouns', vi: 'Đại từ sở hữu'}, explanation: {en: ['We use possessive pronouns (**mine**, **yours**, **his**, **hers**, **ours**, **theirs**) to talk about what we own and what belongs to us.', 'My backpack is red. -> **Mine** is red.'], vi: ['Chúng ta dùng đại từ sở hữu (**của tôi**, **của bạn**, **của anh ấy**, **của cô ấy**, **của chúng tôi**, **của họ**) để nói về những gì chúng ta sở hữu và những gì thuộc về chúng ta.', 'Ba lô của tôi màu đỏ. -> **Cái của tôi** màu đỏ.']}}
                    ],
                    activities: [
                        { type: 'Speaking Game', description: { en: ['Play "Guess Who\'s Bag?" where students describe and guess their friend\'s luggage using possessive pronouns and adjective order.'], vi: ['Chơi trò "Đây không phải túi của tôi" (mô tả và đoán hành lý của bạn bè).'] } }
                    ]
                },
                {
                    id: 70702,
                    title: {en: 'Lesson 2: Types of Transportation', vi: 'Bài học 2: Các loại phương tiện giao thông'},
                    aims: {
                        en: ['Compare different types of transportation', 'Use "(not) as...as..." to compare things'],
                        vi: ['So sánh các loại phương tiện giao thông khác nhau', 'Sử dụng "(not) as...as..." để so sánh mọi thứ']
                    },
                    vocabulary: [
                        {term: 'frequent', pronunciation: '/ˈfriːkwənt/', vietnamese: 'thường xuyên'},
                        {term: 'eco-friendly', pronunciation: '/ˈiːkoʊ ˈfrɛndli/', vietnamese: 'thân thiện với môi trường'},
                        {term: 'comfortable', pronunciation: '/ˈkʌmfərtəbl/', vietnamese: 'thoải mái'},
                        {term: 'convenient', pronunciation: '/kənˈviːniənt/', vietnamese: 'tiện lợi'},
                        {term: 'public', pronunciation: '/ˈpʌblɪk/', vietnamese: 'công cộng'},
                        {term: 'ticket', pronunciation: '/ˈtɪkɪt/', vietnamese: 'vé'},
                        {term: 'reliable', pronunciation: '/rɪˈlaɪəbl/', vietnamese: 'đáng tin cậy'}
                    ],
                    grammar: [{
                        title: {en: '(not) as...as...', vi: '(không) bằng...'},
                        explanation: {en: ['We can compare things using **not as...as...** if they are different or **as...as...** if they are the same.', 'The tickets are **as expensive as** a train ticket. Buses aren\'t **as fast as** trains.'], vi: ['Chúng ta có thể so sánh mọi thứ bằng cách sử dụng **not as...as...** nếu chúng khác nhau hoặc **as...as...** nếu chúng giống nhau.', 'Vé **cũng đắt như** vé tàu. Xe buýt **không nhanh bằng** tàu hỏa.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Discuss and decide the best transport method for a trip to the park based on comparative criteria.'], vi: ['Thảo luận để quyết định phương tiện di chuyển tốt nhất đến công viên dựa trên các tiêu chí so sánh.'] } }
                    ]
                },
                {
                    id: 70703,
                    title: {en: 'Lesson 3: Personal Transport', vi: 'Bài học 3: Phương tiện cá nhân'},
                    aims: {
                        en: ['Talk about transportation', 'Write an opinion paragraph about a type of transportation'],
                        vi: ['Nói về phương tiện giao thông', 'Viết một đoạn văn bày tỏ quan điểm về một loại phương tiện giao thông']
                    },
                    vocabulary: [
                        { term: 'fold', pronunciation: '/foʊld/', vietnamese: 'gấp lại' },
                        { term: 'electronic map', pronunciation: '/ɪˌlɛktrɑːnɪk mæp/', vietnamese: 'bản đồ điện tử' },
                        { term: 'get lost', pronunciation: '/ɡet lɔːst/', vietnamese: 'bị lạc' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Write an opinion paragraph (60-80 words) explaining why one type of transport is the best for children in the city.'], vi: ['Viết một đoạn văn quan điểm (60-80 từ) giải thích tại sao một loại phương tiện nào đó là tốt nhất cho trẻ em trong thành phố.'] } }
                    ]
                }
            ]
        },
        {
            id: 708,
            title: { en: 'Unit 8: Festivals around the World', vi: 'Bài 8: Các lễ hội trên thế giới' },
            lessons: [
                {
                    id: 70801,
                    title: {en: 'Lesson 1: Festivals', vi: 'Bài học 1: Lễ hội'},
                    aims: {
                        en: ['Talk about the festivals around the world', 'Use the Future Simple'],
                        vi: ['Nói về các lễ hội trên thế giới', 'Sử dụng thì Tương lai đơn']
                    },
                    vocabulary: [
                        {term: 'lantern', pronunciation: '/ˈlæntərn/', vietnamese: 'đèn lồng'},
                        {term: 'bonfire', pronunciation: '/ˈbɑːnfaɪər/', vietnamese: 'lửa trại'},
                        {term: 'race', pronunciation: '/reɪs/', vietnamese: 'cuộc đua'},
                        {term: '(eating) competition', pronunciation: '/kɑːmpəˈtɪʃn/', vietnamese: 'cuộc thi (ăn)'},
                        {term: 'sculpture', pronunciation: '/ˈskʌlptʃər/', vietnamese: 'tác phẩm điêu khắc'},
                        {term: '(water) fight', pronunciation: '/faɪt/', vietnamese: 'cuộc chiến (nước)'},
                        {term: 'hot-air balloon', pronunciation: '/hɑːt ɛər bəˈluːn/', vietnamese: 'khinh khí cầu'}
                    ],
                    grammar: [{
                        title: {en: 'Future Simple', vi: 'Thì Tương lai đơn'},
                        explanation: {en: ['We can use the Future Simple (**will/won\'t**) to give or ask for information about events in the future.', 'It **will take** place from May 12th to 15th.', 'Rob Curly **will not/won\'t** perform this year.'], vi: ['Chúng ta có thể sử dụng thì Tương lai đơn (**will/won\'t**) để đưa ra hoặc hỏi thông tin về các sự kiện trong tương lai.', 'Nó **sẽ diễn ra** từ ngày 12 đến ngày 15 tháng 5.', 'Rob Curly **sẽ không** biểu diễn trong năm nay.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Plan a new festival for your town, decide on the activities and date.'], vi: ['Lên kế hoạch cho một lễ hội mới trong thị trấn của bạn.'] } }
                    ]
                },
                {
                    id: 70802,
                    title: {en: 'Lesson 2: Traditions', vi: 'Bài học 2: Truyền thống'},
                    aims: {
                        en: ['Compare how different countries celebrate festivals', 'Use "like" and "different from" to compare'],
                        vi: ['So sánh cách các quốc gia khác nhau tổ chức lễ hội', 'Sử dụng "like" và "different from" để so sánh']
                    },
                    vocabulary: [
                        {term: 'exchange', pronunciation: '/ɪksˈtʃeɪndʒ/', vietnamese: 'trao đổi'},
                        {term: 'tradition', pronunciation: '/trəˈdɪʃn/', vietnamese: 'truyền thống'},
                        {term: 'midnight', pronunciation: '/ˈmɪdnaɪt/', vietnamese: 'nửa đêm'},
                        {term: 'wish', pronunciation: '/wɪʃ/', vietnamese: 'ước'},
                        {term: 'greeting', pronunciation: '/ˈɡriːtɪŋ/', vietnamese: 'lời chào'},
                        {term: 'celebrate', pronunciation: '/ˈsɛləbreɪt/', vietnamese: 'tổ chức lễ'}
                    ],
                    grammar: [{
                        title: {en: 'different from and like', vi: 'khác với và giống'},
                        explanation: {en: ['We use **be + different from** to say that one thing is not the same as another.', 'We use **like + noun** to say that two things are similar.', 'In Italy, they eat seafood at Christmas. That\'s **different from** Japan.'], vi: ['Chúng ta dùng **be + different from** để nói rằng một thứ không giống thứ khác.', 'Chúng ta dùng **like + danh từ** để nói rằng hai thứ giống nhau.', 'Ở Ý, họ ăn hải sản vào Giáng sinh. Điều đó **khác với** Nhật Bản.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Compare the traditions of Tet (Vietnam) with other festivals in South Korea and Mongolia.'], vi: ['So sánh truyền thống Tết Trung Thu và Tết Nguyên Đán của Việt Nam với Hàn Quốc và Mông Cổ.'] } }
                    ]
                },
                {
                    id: 70803,
                    title: {en: 'Lesson 3: Local Festivals', vi: 'Bài học 3: Lễ hội địa phương'},
                    aims: {
                        en: ['Talk about unusual festivals in Vietnam', 'Write a blog post about your favorite festivals'],
                        vi: ['Nói về các lễ hội lạ ở Việt Nam', 'Viết một bài blog về các lễ hội yêu thích của bạn']
                    },
                    vocabulary: [
                        { term: 'unique', pronunciation: '/juːˈniːk/', vietnamese: 'độc đáo' },
                        { term: 'costume', pronunciation: '/ˈkɑːstuːm/', vietnamese: 'trang phục' },
                        { term: 'parade', pronunciation: '/pəˈreɪd/', vietnamese: 'diễu hành' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a blog post (60-80 words) about your favorite festival, including when and how it is celebrated.'], vi: ['Viết một bài blog (60-80 từ) về lễ hội yêu thích của bạn, bao gồm thời gian và cách tổ chức.'] } }
                    ]
                }
            ]
        },
        {
            id: 709,
            title: { en: 'Unit 9: English in the World', vi: 'Bài 9: Tiếng Anh trên thế giới' },
            lessons: [
                {
                    id: 70901,
                    title: {en: 'Lesson 1: Tourist Attractions', vi: 'Bài học 1: Địa điểm du lịch'},
                    aims: {
                        en: ['Talk about tourist attractions and cultures of English-speaking countries', 'Use articles'],
                        vi: ['Nói về các điểm du lịch và văn hóa của các nước nói tiếng Anh', 'Sử dụng mạo từ']
                    },
                    vocabulary: [
                        {term: 'tour guide', pronunciation: '/tʊər ɡaɪd/', vietnamese: 'hướng dẫn viên du lịch'},
                        {term: 'stadium', pronunciation: '/ˈsteɪdiəm/', vietnamese: 'sân vận động'},
                        {term: 'flight', pronunciation: '/flaɪt/', vietnamese: 'chuyến bay'},
                        {term: 'historic', pronunciation: '/hɪˈstɔːrɪk/', vietnamese: 'có tính lịch sử'},
                        {term: 'jog', pronunciation: '/dʒɑːɡ/', vietnamese: 'chạy bộ'},
                        {term: 'ferry', pronunciation: '/ˈfɛri/', vietnamese: 'phà'}
                    ],
                    grammar: [{
                        title: {en: 'Articles', vi: 'Mạo từ'},
                        explanation: {en: ['We use the zero article (Ø) with names of streets, parks, lakes, rivers, beaches, towns, cities, islands, and most countries. We use **the** with some countries (the United States of America, the United Kingdom, the Netherlands, the Philippines) and famous buildings/museums (the Empire State Building).'], vi: ['Chúng ta dùng mạo từ zero (Ø) với tên đường, công viên, hồ, sông, bãi biển, thị trấn, thành phố, đảo, và hầu hết các quốc gia. Chúng ta dùng **the** với một số quốc gia (Hợp chủng quốc Hoa Kỳ, Vương quốc Anh, Hà Lan, Philippines) và các tòa nhà/bảo tàng nổi tiếng.']}
                    }],
                    activities: [
                        { type: 'Pronunciation', description: { en: ['Practice the pronunciation of /ð/ in "the" before different words.'], vi: ['Thực hành phát âm /ð/ trong "the" trước các từ khác nhau.'] } }
                    ]
                },
                {
                    id: 70902,
                    title: {en: 'Lesson 2: Holidays', vi: 'Bài học 2: Kỳ nghỉ'},
                    aims: {
                        en: ['Talk about holidays in English-speaking countries', 'Use the Past Simple with irregular verbs'],
                        vi: ['Nói về các kỳ nghỉ ở các nước nói tiếng Anh', 'Sử dụng thì Quá khứ đơn với động từ bất quy tắc']
                    },
                    vocabulary: [
                        {term: 'souvenirs', pronunciation: '/ˌsuːvəˈnɪrz/', vietnamese: 'đồ lưu niệm'},
                        {term: 'sightseeing', pronunciation: '/ˈsaɪtsiːɪŋ/', vietnamese: 'ngắm cảnh'},
                        {term: 'swimsuit', pronunciation: '/ˈswɪmsuːt/', vietnamese: 'đồ bơi'},
                        {term: 'postcards', pronunciation: '/ˈpoʊstkɑːrdz/', vietnamese: 'bưu thiếp'},
                        {term: 'photos', pronunciation: '/ˈfoʊtoʊz/', vietnamese: 'ảnh'},
                        {term: 'beach', pronunciation: '/biːtʃ/', vietnamese: 'bãi biển'},
                        {term: 'wallet', pronunciation: '/ˈwɑːlɪt/', vietnamese: 'ví'}
                    ],
                    grammar: [{
                        title: {en: 'Past Simple with irregular verbs', vi: 'Thì Quá khứ đơn với động từ bất quy tắc'},
                        explanation: {en: ['Some verbs are irregular. Their Past Simple forms do not end with -ed.', 'go - **went**, take - **took**, buy - **bought**, see - **saw**, etc.'], vi: ['Một số động từ là bất quy tắc. Dạng Quá khứ đơn của chúng không kết thúc bằng -ed.', 'go - **went**, take - **took**, buy - **bought**, see - **saw**, v.v.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Ask and answer questions about your last holiday using irregular verbs (e.g., "Where did you go?", "What did you buy?").'], vi: ['Hỏi và trả lời về kỳ nghỉ vừa qua bằng cách sử dụng động từ bất quy tắc.'] } }
                    ]
                },
                {
                    id: 70903,
                    title: {en: 'Lesson 3: Benefits of English', vi: 'Bài học 3: Lợi ích của tiếng Anh'},
                    aims: {
                        en: ['Talk about the benefits of speaking English', 'Write a postcard to a friend'],
                        vi: ['Nói về lợi ích của việc nói tiếng Anh', 'Viết bưu thiếp cho bạn bè']
                    },
                    vocabulary: [
                        { term: 'communicate', pronunciation: '/kəˈmjuːnɪkeɪt/', vietnamese: 'giao tiếp' },
                        { term: 'travel', pronunciation: '/ˈtrævəl/', vietnamese: 'du lịch' },
                        { term: 'job opportunities', pronunciation: '/dʒɑːb ˌɑːpərˈtuːnətiz/', vietnamese: 'cơ hội việc làm' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Writing', description: { en: ['Write a postcard (60-80 words) to a friend from an overseas holiday, mentioning how you used English.'], vi: ['Viết một tấm bưu thiếp (60-80 từ) từ một kỳ nghỉ ở nước ngoài, kể về việc bạn đã sử dụng tiếng Anh như thế nào.'] } }
                    ]
                }
            ]
        },
        {
            id: 710,
            title: { en: 'Unit 10: Energy Sources', vi: 'Bài 10: Nguồn năng lượng' },
            lessons: [
                {
                    id: 71001,
                    title: {en: 'Lesson 1: Types of Energy', vi: 'Bài học 1: Các loại năng lượng'},
                    aims: {
                        en: ['Talk about types and sources of energy', 'Use "more...than..." and "less...than..." to make comparisons'],
                        vi: ['Nói về các loại và nguồn năng lượng', 'Sử dụng "more...than..." và "less...than..." để so sánh']
                    },
                    vocabulary: [
                        {term: 'renewable energy', pronunciation: '/rɪˈnuːəbl ˈɛnərdʒi/', vietnamese: 'năng lượng tái tạo'},
                        {term: 'non-renewable energy', pronunciation: '/nɑːn rɪˈnuːəbl ˈɛnərdʒi/', vietnamese: 'năng lượng không tái tạo'},
                        {term: 'solar power', pronunciation: '/ˈsoʊlər ˈpaʊər/', vietnamese: 'năng lượng mặt trời'},
                        {term: 'wind power', pronunciation: '/wɪnd ˈpaʊər/', vietnamese: 'năng lượng gió'},
                        {term: 'oil', pronunciation: '/ɔɪl/', vietnamese: 'dầu'},
                        {term: 'coal', pronunciation: '/koʊl/', vietnamese: 'than đá'},
                        {term: 'natural gas', pronunciation: '/ˈnætʃərəl ɡæs/', vietnamese: 'khí tự nhiên'},
                        {term: 'hydropower', pronunciation: '/ˈhaɪdroʊˌpaʊər/', vietnamese: 'thủy điện'}
                    ],
                    grammar: [{
                        title: {en: 'more...than... / less...than...', vi: 'nhiều hơn... / ít hơn...'},
                        explanation: {en: ['We use **more...than...** and **less...than...** to compare quantities, especially with percentages or amounts.', 'Springfield uses 40% **more coal than** Twin Peaks.'], vi: ['Chúng ta dùng **more...than...** và **less...than...** để so sánh số lượng, đặc biệt với phần trăm hoặc khối lượng.', 'Springfield sử dụng nhiều hơn 40% than đá so với Twin Peaks.']}
                    }],
                    activities: [
                        { type: 'Speaking', description: { en: ['Compare the energy usage of two cities based on a chart using "more...than..." and "less...than...".'], vi: ['So sánh việc sử dụng năng lượng của hai thành phố dựa trên biểu đồ.'] } }
                    ]
                },
                {
                    id: 71002,
                    title: {en: 'Lesson 2: Advantages and Disadvantages', vi: 'Bài học 2: Ưu điểm và Nhược điểm'},
                    aims: {
                        en: ['Talk about advantages and disadvantages of energy sources', 'Use "and" and "but"'],
                        vi: ['Nói về ưu và nhược điểm của các nguồn năng lượng', 'Sử dụng "and" và "but"']
                    },
                    vocabulary: [
                        {term: 'power plant', pronunciation: '/ˈpaʊər plænt/', vietnamese: 'nhà máy điện'},
                        {term: 'wind turbine', pronunciation: '/wɪnd ˈtɜːrbaɪn/', vietnamese: 'tua-bin gió'},
                        {term: 'solar panel', pronunciation: '/ˈsoʊlər ˈpænl/', vietnamese: 'tấm pin mặt trời'},
                        {term: 'nuclear power', pronunciation: '/ˈnuːkliər ˈpaʊər/', vietnamese: 'năng lượng hạt nhân'}
                    ],
                    grammar: [{
                        title: {en: 'and and but', vi: 'and và but'},
                        explanation: {en: ['We use **and** to add similar ideas. It\'s cheap to run **and** it\'s renewable.', 'We use **but** to add different or unexpected information. It\'s cheap to build a power plant, **but** it causes pollution.'], vi: ['Chúng ta dùng **and** để thêm các ý tưởng tương tự. Nó rẻ để vận hành **và** có thể tái tạo.', 'Chúng ta dùng **but** để thêm thông tin khác biệt hoặc bất ngờ. Xây dựng một nhà máy điện thì rẻ, **nhưng** nó gây ô nhiễm.']}
                    }],
                    activities: [
                        { type: 'Discussion', description: { en: ['Discuss the pros and cons of different energy sources and select the best three for your local area.'], vi: ['Thảo luận nhóm về ưu/nhược điểm của các nguồn năng lượng và chọn ra 3 nguồn tốt nhất cho địa phương.'] } }
                    ]
                },
                {
                    id: 71003,
                    title: {en: 'Lesson 3: City Energy Problems', vi: 'Bài học 3: Vấn đề năng lượng đô thị'},
                    aims: {
                        en: ['Talk about different energy sources', 'Write a formal email'],
                        vi: ['Nói về các nguồn năng lượng khác nhau', 'Viết một email trang trọng']
                    },
                    vocabulary: [
                        { term: 'polluted', pronunciation: '/pəˈluːtɪd/', vietnamese: 'ô nhiễm' },
                        { term: 'eco-friendly', pronunciation: '/ˌiːkoʊ ˈfrɛndli/', vietnamese: 'thân thiện với môi trường' },
                        { term: 'reduce', pronunciation: '/rɪˈduːs/', vietnamese: 'giảm bớt' }
                    ],
                    grammar: [],
                    activities: [
                        { type: 'Reading & Analysis', description: { en: ['Read a formal email to a mayor/official about energy problems.'], vi: ['Đọc email trang trọng gửi thị trưởng/cán bộ về các vấn đề năng lượng.'] } },
                        { type: 'Writing', description: { en: ['Write a formal email (60-80 words) to a local official suggesting changes to the town\'s energy sources.'], vi: ['Viết một email trang trọng (60-80 từ) gửi cán bộ địa phương đề xuất thay đổi nguồn năng lượng cho thị trấn.'] } }
                    ]
                }
            ]
        }
    ]
};
