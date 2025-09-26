import { CurriculumLevel } from '../types';

export const sw6Data: CurriculumLevel = {
    level: 6,
    title: { en: 'i-Learn Smart World 6', vi: 'i-Learn Smart World 6' },
    subtitle: { en: 'Secondary School - Grade 6', vi: 'Trung học cơ sở - Lớp 6' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1d2FOa20bf6nNhl3cASbnlgwSWcWIqX_u/view?usp=drive_link',
    units: [
      {
        id: 601,
        title: { en: 'Unit 1: Home', vi: 'Bài 1: Nhà cửa' },
        lessons: [
          {
            id: 60101,
            title: { en: 'Lesson 1: My Home', vi: 'Bài học 1: Nhà của tôi' },
            aims: {
              en: ['Ask about people\'s homes', 'Use the Present Simple with Yes/No questions', 'Use the conversation skill of getting someone\'s attention'],
              vi: ['Hỏi về nhà của mọi người', 'Sử dụng thì Hiện tại đơn với câu hỏi Yes/No', 'Sử dụng kỹ năng hội thoại để thu hút sự chú ý'],
            },
            vocabulary: [
              { term: 'pool', pronunciation: '/puːl/', vietnamese: 'hồ bơi' },
              { term: 'balcony', pronunciation: '/ˈbælkəni/', vietnamese: 'ban công' },
              { term: 'garage', pronunciation: '/ɡəˈrɑːʒ/', vietnamese: 'nhà để xe' },
              { term: 'yard', pronunciation: '/jɑːrd/', vietnamese: 'sân' },
              { term: 'gym', pronunciation: '/dʒɪm/', vietnamese: 'phòng tập thể dục' },
              { term: 'apartment', pronunciation: '/əˈpɑːrtmənt/', vietnamese: 'căn hộ' },
            ],
            grammar: [
              { title: { en: 'Present Simple', vi: 'Thì Hiện tại đơn' }, explanation: { en: ['We use the Present Simple to talk about things that are facts or are true for a long time.', 'I/You/We/They live in an apartment.', 'He/She/It lives in a house.', 'Do you live in a house? (Yes, I do./No, I don\'t.)', 'Does she live in a house? (Yes, she does./No, she doesn\'t.)'], vi: ['Chúng ta dùng thì Hiện tại đơn để nói về những sự thật hoặc những điều đúng trong một thời gian dài.', 'Tôi/Bạn/Chúng tôi/Họ sống trong một căn hộ.', 'Anh ấy/Cô ấy/Nó sống trong một ngôi nhà.', 'Bạn có sống trong một ngôi nhà không? (Có./Không.)', 'Cô ấy có sống trong một ngôi nhà không? (Có./Không.)'] } },
            ],
            activities: [
              { type: 'Conversation Skill', description: { en: ["Getting someone's attention: 'Excuse me.'"], vi: ["Thu hút sự chú ý của ai đó: 'Xin lỗi.'"]}},
              { type: 'Practice', description: { en: ['Work in pairs. Ask your partner questions about their home using "Do you live in...?" and "Does your house have...?"'], vi: ['Làm việc theo cặp. Hỏi bạn của bạn về nhà của họ, sử dụng "Do you live in...?" và "Does your house have...?"']}}
            ],
          },
          {
            id: 60102,
            title: { en: 'Lesson 2: Housework', vi: 'Bài học 2: Việc nhà' },
            aims: {
                en: ['Talk about family members and housework', 'Use the Present Simple with Wh-questions'],
                vi: ['Nói về các thành viên trong gia đình và công việc nhà', 'Sử dụng thì Hiện tại đơn với câu hỏi Wh-'],
            },
            vocabulary: [
                { term: 'do the laundry', pronunciation: '/duː ðə ˈlɔːndri/', vietnamese: 'giặt giũ' },
                { term: 'make dinner', pronunciation: '/meɪk ˈdɪnər/', vietnamese: 'nấu bữa tối' },
                { term: 'make the bed', pronunciation: '/meɪk ðə bed/', vietnamese: 'dọn giường' },
                { term: 'do the shopping', pronunciation: '/duː ðə ˈʃɑːpɪŋ/', vietnamese: 'đi mua sắm' },
                { term: 'do the dishes', pronunciation: '/duː ðə ˈdɪʃɪz/', vietnamese: 'rửa chén' },
                { term: 'clean the kitchen', pronunciation: '/kliːn ðə ˈkɪtʃɪn/', vietnamese: 'dọn dẹp nhà bếp' },
            ],
            grammar: [
                { title: { en: 'Present Simple with Wh-questions', vi: 'Thì Hiện tại đơn với câu hỏi Wh-' }, explanation: { en: ['What housework do you do? - I make breakfast.', 'Who does the dishes? - My sister does.'], vi: ['Bạn làm công việc nhà gì? - Tôi làm bữa sáng.', 'Ai rửa chén? - Chị tôi rửa.'] } },
                { title: { en: "Possessive 's", vi: 'Sở hữu cách \'s' }, explanation: { en: ['You can add \'s onto a noun or proper noun to show possession.', 'E.g., Ken\'s father cleans the kitchen.'], vi: ['Bạn có thể thêm \'s vào sau một danh từ hoặc danh từ riêng để thể hiện sự sở hữu.', 'Ví dụ: Bố của Ken dọn dẹp nhà bếp.'] } },
            ],
            activities: [
              { type: 'Pronunciation', description: { en: ['Focus on the /ɪ/ sound in words like "dishes" and "live".'], vi: ['Tập trung vào âm /ɪ/ trong các từ như "dishes" và "live".']}},
              { type: 'Speaking', description: { en: ["Survey housework your family members do."], vi: ["Khảo sát công việc nhà các thành viên trong gia đình bạn làm."]}},
            ],
          },
          {
            id: 60103,
            title: { en: 'Lesson 3: Geography', vi: 'Bài học 3: Địa lý' },
            aims: {
                en: ['Ask about villages, towns, and cities', 'Read a paragraph about a city in Vietnam', 'Write a paragraph about your hometown'],
                vi: ['Hỏi về làng, thị trấn và thành phố', 'Đọc một đoạn văn về một thành phố ở Việt Nam', 'Viết một đoạn văn về quê hương của bạn'],
            },
            vocabulary: [
                { term: 'south', pronunciation: '/saʊθ/', vietnamese: 'phía nam' },
                { term: 'west', pronunciation: '/west/', vietnamese: 'phía tây' },
                { term: 'north', pronunciation: '/nɔːrθ/', vietnamese: 'phía bắc' },
                { term: 'east', pronunciation: '/iːst/', vietnamese: 'phía đông' },
                { term: 'center', pronunciation: '/ˈsentər/', vietnamese: 'trung tâm' },
                { term: 'village', pronunciation: '/ˈvɪlɪdʒ/', vietnamese: 'làng' },
                { term: 'town', pronunciation: '/taʊn/', vietnamese: 'thị trấn' },
                { term: 'city', pronunciation: '/ˈsɪti/', vietnamese: 'thành phố' },
            ],
            grammar: [],
            activities: [
              { type: 'Useful Language', description: { en: ["Where's Vancouver? It's in the west of Canada. What's it famous for? It's famous for its big buildings and beautiful parks."], vi: ["Vancouver ở đâu? Nó ở phía tây Canada. Nó nổi tiếng vì điều gì? Nó nổi tiếng với những tòa nhà lớn và công viên đẹp."]}},
              { type: 'Writing', description: { en: ['Fill in notes about your hometown and then write a 40-50 word paragraph.'], vi: ['Điền vào ghi chú về quê hương của bạn và sau đó viết một đoạn văn 40-50 từ.']}}
            ],
          }
        ],
      },
      {
        id: 602,
        title: { en: 'Unit 2: School', vi: 'Bài 2: Trường học' },
        lessons: [
            {
                id: 60201,
                title: { en: 'Lesson 1: Subjects', vi: 'Bài học 1: Môn học' },
                aims: {
                    en: ["Talk about school subjects you like or don't like", "Use 'and' and 'or' for positive and negative statements", 'Use Possessive Pronouns'],
                    vi: ['Nói về các môn học bạn thích hoặc không thích', 'Sử dụng "and" và "or" cho câu khẳng định và phủ định', 'Sử dụng Đại từ sở hữu'],
                },
                vocabulary: [
                    { term: 'history', pronunciation: '/ˈhɪstəri/', vietnamese: 'lịch sử' },
                    { term: 'P.E. (physical education)', pronunciation: '/ˌpiː ˈiː/', vietnamese: 'thể dục' },
                    { term: 'I.T. (information technology)', pronunciation: '/ˌaɪ ˈtiː/', vietnamese: 'tin học' },
                    { term: 'music', pronunciation: '/ˈmjuːzɪk/', vietnamese: 'âm nhạc' },
                    { term: 'geography', pronunciation: '/dʒiˈɑːɡrəfi/', vietnamese: 'địa lý' },
                    { term: 'literature', pronunciation: '/ˈlɪtərətʃər/', vietnamese: 'văn học' },
                    { term: 'physics', pronunciation: '/ˈfɪzɪks/', vietnamese: 'vật lý' },
                    { term: 'biology', pronunciation: '/baɪˈɑːlədʒi/', vietnamese: 'sinh học' },
                ],
                grammar: [
                    { title: { en: "Using 'and' / 'or'", vi: 'Sử dụng "and" / "or"' }, explanation: { en: ["Use 'and' to join two or more nouns in a positive sentence. (I like math and biology.)", "Use 'or' to join two or more nouns in a negative sentence. (I don't like math or biology.)"], vi: ['Sử dụng "and" để nối hai hoặc nhiều danh từ trong câu khẳng định. (Tôi thích toán và sinh học.)', 'Sử dụng "or" để nối hai hoặc nhiều danh từ trong câu phủ định. (Tôi không thích toán hay sinh học.)'] } },
                    { title: { en: "Possessive Pronouns", vi: 'Đại từ sở hữu' }, explanation: { en: ["Use possessive pronouns (mine/yours) so we don't say the same words again. (My favorite subject's physics. What's yours?)"], vi: ['Sử dụng đại từ sở hữu (của tôi/của bạn) để không phải lặp lại từ. (Môn học yêu thích của tôi là vật lý. Của bạn là gì?)'] } },
                ],
                activities: [
                  { type: 'Conversation Skill', description: { en: ["Passing your turn: 'How about you?', 'What do you think?'"], vi: ["Chuyển lượt của bạn: 'Còn bạn thì sao?', 'Bạn nghĩ gì?'"]}},
                  { type: 'Pronunciation', description: { en: ['Intonation for lists goes up, up, then down.'], vi: ['Ngữ điệu cho danh sách đi lên, lên, rồi xuống.']}}
                ],
            },
             {
                id: 60202,
                title: { en: 'Lesson 2: School Clubs', vi: 'Bài học 2: Câu lạc bộ ở trường' },
                aims: {
                    en: ['Talk about school activities', 'Use "like + verb-ing"'],
                    vi: ['Nói về các hoạt động ở trường', 'Sử dụng "like + động từ-ing"'],
                },
                vocabulary: [
                   { term: 'indoor activities', pronunciation: '/ˈɪndɔːr ækˈtɪvətiz/', vietnamese: 'hoạt động trong nhà' },
                   { term: 'outdoor activities', pronunciation: '/ˈaʊtdɔːr ækˈtɪvətiz/', vietnamese: 'hoạt động ngoài trời' },
                   { term: 'arts and crafts', pronunciation: '/ɑːrts ænd kræfts/', vietnamese: 'nghệ thuật và thủ công' },
                   { term: 'drama club', pronunciation: '/ˈdrɑːmə klʌb/', vietnamese: 'câu lạc bộ kịch' },
                   { term: 'sign up', pronunciation: '/saɪn ʌp/', vietnamese: 'đăng ký' },
                ],
                grammar: [
                    { title: { en: 'like + verb-ing', vi: 'like + động từ-ing' }, explanation: { en: ["We use like + verb-ing to talk about things we like to do often. (Do you like reading books?)", "Spelling rules: making, swimming, playing"], vi: ['Chúng ta sử dụng like + động từ-ing để nói về những việc chúng ta thích làm thường xuyên. (Bạn có thích đọc sách không?)', 'Quy tắc chính tả: making, swimming, playing'] } },
                ],
                activities: [
                  { type: 'Pronunciation', description: { en: ['Intonation for positive answers goes up. Intonation for negative answers goes down.'], vi: ['Ngữ điệu cho câu trả lời khẳng định đi lên. Ngữ điệu cho câu trả lời phủ định đi xuống.']}},
                  { type: 'Speaking', description: { en: ['Discuss which club to join for the next school year.'], vi: ['Thảo luận về việc tham gia câu lạc bộ nào cho năm học tới.']}}
                ],
            },
            {
                id: 60203,
                title: { en: 'Lesson 3: Literature', vi: 'Bài học 3: Văn học' },
                aims: {
                    en: ['Talk about different kinds of books', 'Read a book review about a Vietnamese book', 'Write a book review'],
                    vi: ['Nói về các loại sách khác nhau', 'Đọc bài bình luận về một cuốn sách Việt Nam', 'Viết một bài bình luận sách'],
                },
                vocabulary: [
                   { term: 'fantasy', pronunciation: '/ˈfæntəsi/', vietnamese: 'truyện giả tưởng' },
                   { term: 'novel', pronunciation: '/ˈnɑːvl/', vietnamese: 'tiểu thuyết' },
                   { term: 'adventure', pronunciation: '/ədˈventʃər/', vietnamese: 'phiêu lưu' },
                   { term: 'mystery', pronunciation: '/ˈmɪstəri/', vietnamese: 'bí ẩn' },
                   { term: 'author', pronunciation: '/ˈɔːθər/', vietnamese: 'tác giả' },
                ],
                grammar: [],
                activities: [
                   { type: 'Useful Language', description: { en: ["What's your favorite book? I like Harry Potter. What kind of book is it? It's a fantasy novel."], vi: ["Cuốn sách yêu thích của bạn là gì? Tôi thích Harry Potter. Đó là loại sách gì? Đó là một cuốn tiểu thuyết giả tưởng."]}},
                   { type: 'Writing Tip', description: { en: ['Punctuation: Use capital letters at the beginning of all sentences, for names of people, places, books, etc., for the subject pronoun "I", and for days and months.'], vi: ['Dấu câu: Sử dụng chữ in hoa ở đầu tất cả các câu, cho tên người, địa điểm, sách, v.v., cho đại từ chủ ngữ "I", và cho các ngày và tháng.']}}
                ],
            }
        ],
      },
      {
        id: 603,
        title: { en: 'Unit 3: Friends', vi: 'Bài 3: Bạn bè' },
        lessons: [
            {
                id: 60301,
                title: { en: 'Lesson 1: Appearance', vi: 'Bài học 1: Ngoại hình' },
                aims: {
                    en: ["Describe someone's personal appearance", "Use the Present Simple and the Present Continuous", "End a friendly conversation"],
                    vi: ['Miêu tả ngoại hình của một người', 'Sử dụng thì Hiện tại đơn và Hiện tại tiếp diễn', 'Kết thúc một cuộc trò chuyện thân mật'],
                },
                vocabulary: [
                   { term: 'tall', pronunciation: '/tɔːl/', vietnamese: 'cao' },
                   { term: 'blue', pronunciation: '/bluː/', vietnamese: 'màu xanh da trời' },
                   { term: 'long', pronunciation: '/lɔːŋ/', vietnamese: 'dài' },
                   { term: 'glasses', pronunciation: '/ˈɡlæsɪz/', vietnamese: 'kính' },
                   { term: 'red', pronunciation: '/red/', vietnamese: 'màu đỏ' },
                   { term: 'blond', pronunciation: '/blɑːnd/', vietnamese: 'vàng hoe (tóc)' },
                   { term: 'slim', pronunciation: '/slɪm/', vietnamese: 'mảnh khảnh' },
                   { term: 'short', pronunciation: '/ʃɔːrt/', vietnamese: 'ngắn, thấp' },
                ],
                grammar: [
                    { title: { en: 'Present Continuous', vi: 'Thì Hiện tại tiếp diễn' }, explanation: { en: ["We use the Present Continuous to talk about ongoing actions. We use the verb be + verb-ing.", "I am wearing a green dress.", "He/She is wearing a yellow shirt.", "What are you wearing? Is she wearing glasses? (Yes, she is./No, she isn't.)"], vi: ['Chúng ta dùng thì Hiện tại tiếp diễn để nói về các hành động đang diễn ra. Chúng ta dùng động từ be + động từ-ing.', 'Tôi đang mặc một chiếc váy màu xanh.', 'Anh ấy/Cô ấy đang mặc một chiếc áo sơ mi màu vàng.', 'Bạn đang mặc gì? Cô ấy có đang đeo kính không? (Có./Không.)'] } },
                ],
                activities: [
                   { type: 'Conversation Skill', description: { en: ["Ending a friendly conversation: 'See you soon.', 'Talk to you later.'"], vi: ["Kết thúc một cuộc trò chuyện thân mật: 'Hẹn gặp lại.', 'Nói chuyện sau nhé.'"]}},
                   { type: 'Pronunciation', description: { en: ['Focus on the /bl/ sound in words like "black", "blond", "blue".'], vi: ['Tập trung vào âm /bl/ trong các từ như "black", "blond", "blue".']}}
                ],
            },
            {
                id: 60302,
                title: { en: 'Lesson 2: Activities', vi: 'Bài học 2: Hoạt động' },
                aims: {
                    en: ['Invite someone to do an activity', 'Use the Present Continuous for future use'],
                    vi: ['Mời ai đó làm một hoạt động', 'Sử dụng thì Hiện tại tiếp diễn cho tương lai'],
                },
                vocabulary: [
                   { term: 'go shopping', pronunciation: '/ɡoʊ ˈʃɑːpɪŋ/', vietnamese: 'đi mua sắm' },
                   { term: 'have a movie', pronunciation: '/hæv ə ˈmuːvi/', vietnamese: 'xem phim' },
                   { term: 'have a party', pronunciation: '/hæv ə ˈpɑːrti/', vietnamese: 'tổ chức tiệc' },
                   { term: 'go swimming', pronunciation: '/ɡoʊ ˈswɪmɪŋ/', vietnamese: 'đi bơi' },
                   { term: 'play badminton', pronunciation: '/pleɪ ˈbædmɪntən/', vietnamese: 'chơi cầu lông' },
                   { term: 'make a cake', pronunciation: '/meɪk ə keɪk/', vietnamese: 'làm bánh' },
                ],
                grammar: [
                    { title: { en: 'Present Continuous for future', vi: 'Thì Hiện tại tiếp diễn cho tương lai' }, explanation: { en: ["We can use the Present Continuous tense for fixed future plans. We usually use future time expressions such as this weekend, on Saturday, tomorrow, tonight, etc.", "I'm having a movie tonight.", "What are you doing tomorrow night?"], vi: ['Chúng ta có thể dùng thì Hiện tại tiếp diễn cho các kế hoạch tương lai đã được ấn định. Chúng ta thường dùng các cụm từ chỉ thời gian tương lai như cuối tuần này, vào thứ Bảy, ngày mai, tối nay, v.v.', 'Tôi sẽ xem phim tối nay.', 'Bạn sẽ làm gì vào tối mai?'] } },
                ],
                activities: [
                   { type: 'Pronunciation', description: { en: ['"What are you doing...?" often sounds like /wɒdədʒəduːɪn/.'], vi: ['"What are you doing...?" thường nghe giống như /wɒdədʒəduːɪn/.']}},
                   { type: 'Speaking', description: { en: ['You want to invite your friend out. Stay on this page. Student B, choose an activity from your calendar and ask your partner to join you.'], vi: ['Bạn muốn mời bạn mình đi chơi. Ở lại trang này. Học sinh B, chọn một hoạt động từ lịch của bạn và rủ bạn cặp cùng tham gia.']}}
                ],
            },
            {
                id: 60303,
                title: { en: 'Lesson 3: Literature', vi: 'Bài học 3: Văn học' },
                aims: {
                    en: ["Describe someone's character", "Read an article about two sisters from Vietnamese folklore", "Write an email about your best friend"],
                    vi: ['Miêu tả tính cách của một người', 'Đọc một bài báo về hai chị em trong truyện cổ tích Việt Nam', 'Viết một email về người bạn thân nhất của bạn'],
                },
                vocabulary: [
                   { term: 'helpful', pronunciation: '/ˈhɛlpfəl/', vietnamese: 'hay giúp đỡ' },
                   { term: 'selfish', pronunciation: '/ˈsɛlfɪʃ/', vietnamese: 'ích kỷ' },
                   { term: 'kind', pronunciation: '/kaɪnd/', vietnamese: 'tốt bụng' },
                   { term: 'funny', pronunciation: '/ˈfʌni/', vietnamese: 'vui tính' },
                   { term: 'lazy', pronunciation: '/ˈleɪzi/', vietnamese: 'lười biếng' },
                ],
                grammar: [],
                activities: [
                   { type: 'Useful Language', description: { en: ["What's he like? He's very kind but a little lazy. What's she like? She's friendly and funny."], vi: ["Anh ấy như thế nào? Anh ấy rất tốt bụng nhưng hơi lười. Cô ấy như thế nào? Cô ấy thân thiện và vui tính."]}},
                   { type: 'Writing', description: { en: ['Write an email about your best friend (40-50 words).'], vi: ['Viết một email về người bạn thân nhất của bạn (40-50 từ).']}}
                ],
            }
        ],
      },
      {
        id: 604,
        title: { en: 'Unit 4: Festivals and Free Time', vi: 'Bài 4: Lễ hội và Thời gian rảnh' },
        lessons: [
          {
            id: 60401,
            title: { en: 'Lesson 1: Frequency', vi: 'Bài học 1: Tần suất' },
            aims: { en: ['Talk about how often you do activities in your free time', 'Use adverbs of frequency'], vi: ['Nói về tần suất bạn làm các hoạt động trong thời gian rảnh', 'Sử dụng trạng từ chỉ tần suất'] },
            vocabulary: [
              { term: 'often', pronunciation: '/ˈɔːfn/', vietnamese: 'thường' },
              { term: 'never', pronunciation: '/ˈnevər/', vietnamese: 'không bao giờ' },
              { term: 'sometimes', pronunciation: '/ˈsʌmtaɪmz/', vietnamese: 'thỉnh thoảng' },
              { term: 'always', pronunciation: '/ˈɔːlweɪz/', vietnamese: 'luôn luôn' },
              { term: 'rarely', pronunciation: '/ˈrerli/', vietnamese: 'hiếm khi' },
              { term: 'usually', pronunciation: '/ˈjuːʒuəli/', vietnamese: 'thường xuyên' },
            ],
            grammar: [{ title: { en: 'Adverbs of Frequency', vi: 'Trạng từ chỉ tần suất' }, explanation: { en: ['We use adverbs of frequency to talk about how often things happen.', 'I usually play soccer on the weekends.'], vi: ['Chúng ta sử dụng trạng từ chỉ tần suất để nói về mức độ thường xuyên của sự việc.', 'Tôi thường chơi bóng đá vào cuối tuần.'] } }],
            activities: [],
          },
          {
            id: 60402,
            title: { en: 'Lesson 2: Future Events', vi: 'Bài học 2: Sự kiện tương lai' },
            aims: { en: ['Talk about future events', 'Use the Present Simple for future use'], vi: ['Nói về các sự kiện trong tương lai', 'Sử dụng thì Hiện tại đơn cho tương lai'] },
            vocabulary: [
              { term: '(music) performance', pronunciation: '/(ˈmjuːzɪk) pərˈfɔːrməns/', vietnamese: 'buổi biểu diễn (âm nhạc)' },
              { term: '(food) stand', pronunciation: '/(fuːd) stænd/', vietnamese: 'quầy (thức ăn)' },
              { term: 'fashion show', pronunciation: '/ˈfæʃn ʃoʊ/', vietnamese: 'buổi trình diễn thời trang' },
              { term: 'puppet show', pronunciation: '/ˈpʌpɪt ʃoʊ/', vietnamese: 'múa rối' },
              { term: 'tug of war', pronunciation: '/tʌɡ əv wɔːr/', vietnamese: 'kéo co' },
              { term: 'talent show', pronunciation: '/ˈtælənt ʃoʊ/', vietnamese: 'buổi biểu diễn tài năng' },
            ],
            grammar: [{ title: { en: 'Present Simple for future use', vi: 'Hiện tại đơn cho tương lai' }, explanation: { en: ['We use the Present Simple to talk about things we know will definitely happen in the future, such as timetables or programs for shops, movie theaters, restaurants, or public transport, etc.', 'The festival starts at 6 p.m.'], vi: ['Chúng ta sử dụng thì Hiện tại đơn để nói về những điều chúng ta biết chắc chắn sẽ xảy ra trong tương lai, chẳng hạn như lịch trình hoặc chương trình của cửa hàng, rạp chiếu phim, nhà hàng, hoặc phương tiện công cộng, v.v.', 'Lễ hội bắt đầu lúc 6 giờ tối.'] } }],
            activities: [],
          },
          {
            id: 60403,
            title: { en: 'Lesson 3: Social Studies', vi: 'Bài học 3: Xã hội học' },
            aims: { en: ['Talk about a Vietnamese festival', 'Read an article about a festival in Vietnam', 'Write messages about a festival'], vi: ['Nói về một lễ hội của Việt Nam', 'Đọc một bài báo về một lễ hội ở Việt Nam', 'Viết tin nhắn về một lễ hội'] },
            vocabulary: [
              { term: 'watch fireworks', pronunciation: '/wɑːtʃ ˈfaɪərwɜːrks/', vietnamese: 'xem pháo hoa' },
              { term: 'decorate a house or tree', pronunciation: '/ˈdekəreɪt ə haʊs ɔːr triː/', vietnamese: 'trang trí nhà cửa hoặc cây cối' },
              { term: 'visit family and friends', pronunciation: '/ˈvɪzɪt ˈfæməli ænd frendz/', vietnamese: 'thăm gia đình và bạn bè' },
              { term: 'get lucky money, candy, or gifts', pronunciation: '/ɡet ˈlʌki ˈmʌni, ˈkændi, ɔːr ɡɪfts/', vietnamese: 'nhận tiền lì xì, kẹo, hoặc quà' },
              { term: 'play games or music', pronunciation: '/pleɪ ɡeɪmz ɔːr ˈmjuːzɪk/', vietnamese: 'chơi game hoặc nhạc' },
              { term: 'buy fruits or flowers', pronunciation: '/baɪ fruːts ɔːr ˈflaʊərz/', vietnamese: 'mua trái cây hoặc hoa' },
              { term: 'watch parades', pronunciation: '/wɑːtʃ pəˈreɪdz/', vietnamese: 'xem diễu hành' },
              { term: 'eat traditional food', pronunciation: '/iːt trəˈdɪʃənl fuːd/', vietnamese: 'ăn món ăn truyền thống' },
            ],
            grammar: [],
            activities: [],
          },
        ]
      },
      {
        id: 605,
        title: { en: 'Unit 5: Around Town', vi: 'Bài 5: Quanh thị trấn' },
        lessons: [
            {
                id: 60501,
                title: { en: 'Lesson 1: Shopping', vi: 'Bài học 1: Mua sắm' },
                aims: {
                    en: ['Buy clothes in a clothing store', 'Use demonstratives and object pronouns'],
                    vi: ['Mua quần áo trong cửa hàng', 'Sử dụng đại từ chỉ định và đại từ tân ngữ']
                },
                vocabulary: [
                    { term: 'large', pronunciation: '/lɑːrdʒ/', vietnamese: 'lớn' },
                    { term: 'extra large', pronunciation: '/ˈekstrə lɑːrdʒ/', vietnamese: 'cực lớn' },
                    { term: 'jeans', pronunciation: '/dʒiːnz/', vietnamese: 'quần jean' },
                    { term: 'changing room', pronunciation: '/ˈtʃeɪndʒɪŋ ruːm/', vietnamese: 'phòng thay đồ' },
                    { term: 'medium', pronunciation: '/ˈmiːdiəm/', vietnamese: 'cỡ vừa' },
                    { term: 'sweater', pronunciation: '/ˈswetər/', vietnamese: 'áo len' },
                    { term: 'customer', pronunciation: '/ˈkʌstəmər/', vietnamese: 'khách hàng' },
                    { term: 'sales assistant', pronunciation: '/seɪlz əˈsɪstənt/', vietnamese: 'nhân viên bán hàng' },
                ],
                grammar: [
                    { title: { en: 'Demonstratives', vi: 'Đại từ chỉ định' }, explanation: { en: ["Use this/that/these/those to show which things we are talking about.", 'How much is this T-shirt? How much are those shoes over there?'], vi: ['Sử dụng this/that/these/those để chỉ những thứ chúng ta đang nói đến.', 'Cái áo phông này giá bao nhiêu? Đôi giày kia giá bao nhiêu?'] } },
                    { title: { en: 'Object Pronouns', vi: 'Đại từ tân ngữ' }, explanation: { en: ["Use object pronouns (it/them) after a verb or a preposition.", 'I like this jacket. Do you have it in blue?'], vi: ['Sử dụng đại từ tân ngữ (it/them) sau một động từ hoặc một giới từ.', 'Tôi thích cái áo khoác này. Bạn có nó màu xanh không?'] } },
                ],
                activities: [],
            },
            {
                id: 60502,
                title: { en: 'Lesson 2: Ordering Food', vi: 'Bài học 2: Gọi món' },
                aims: {
                    en: ['Order food and drinks in a restaurant', 'Use quantifiers', 'Use countable and uncountable nouns'],
                    vi: ['Gọi đồ ăn và thức uống trong nhà hàng', 'Sử dụng các từ chỉ số lượng', 'Sử dụng danh từ đếm được và không đếm được']
                },
                vocabulary: [
                    { term: 'order', pronunciation: '/ˈɔːrdər/', vietnamese: 'gọi món' },
                    { term: 'dessert', pronunciation: '/dɪˈzɜːrt/', vietnamese: 'tráng miệng' },
                    { term: 'tip', pronunciation: '/tɪp/', vietnamese: 'tiền boa' },
                    { term: 'check', pronunciation: '/tʃek/', vietnamese: 'hóa đơn' },
                    { term: 'change', pronunciation: '/tʃeɪndʒ/', vietnamese: 'tiền thối' },
                    { term: 'menu', pronunciation: '/ˈmenjuː/', vietnamese: 'thực đơn' },
                ],
                grammar: [
                    { title: { en: 'Countable and uncountable nouns', vi: 'Danh từ đếm được và không đếm được' }, explanation: { en: ["Use 'a/an' before singular countable nouns. Use 'some' with uncountable nouns and plural countable nouns in positive sentences. Use 'any' in questions and negative sentences.", "I'd like a cookie. I'd like some milk. Do you have any chocolate cake?"], vi: ['Sử dụng "a/an" trước danh từ đếm được số ít. Sử dụng "some" với danh từ không đếm được và danh từ đếm được số nhiều trong câu khẳng định. Sử dụng "any" trong câu hỏi và câu phủ định.', 'Tôi muốn một cái bánh quy. Tôi muốn một ít sữa. Bạn có bánh sô cô la không?'] } },
                ],
                activities: [],
            },
            {
                id: 60503,
                title: { en: 'Lesson 3: Social Studies', vi: 'Bài học 3: Xã hội học' },
                aims: {
                    en: ['Talk about food from around the world', 'Read an article about Vietnamese food', 'Write a paragraph about two famous dishes'],
                    vi: ['Nói về ẩm thực từ khắp nơi trên thế giới', 'Đọc một bài báo về ẩm thực Việt Nam', 'Viết một đoạn văn về hai món ăn nổi tiếng']
                },
                vocabulary: [
                    { term: 'fish sauce', pronunciation: '/fɪʃ sɔːs/', vietnamese: 'nước mắm' },
                    { term: 'fry', pronunciation: '/fraɪ/', vietnamese: 'chiên' },
                    { term: 'noodles', pronunciation: '/ˈnuːdlz/', vietnamese: 'mì' },
                    { term: 'grill', pronunciation: '/ɡrɪl/', vietnamese: 'nướng' },
                    { term: 'beef', pronunciation: '/biːf/', vietnamese: 'thịt bò' },
                    { term: 'seafood', pronunciation: '/ˈsiːfuːd/', vietnamese: 'hải sản' },
                    { term: 'lamb', pronunciation: '/læm/', vietnamese: 'thịt cừu' },
                    { term: 'herbs', pronunciation: '/ɜːrbz/', vietnamese: 'rau thơm' },
                    { term: 'pork', pronunciation: '/pɔːrk/', vietnamese: 'thịt lợn' },
                ],
                grammar: [],
                activities: [],
            },
        ]
      },
      {
        id: 606,
        title: { en: 'Unit 6: Community Services', vi: 'Bài 6: Dịch vụ cộng đồng' },
        lessons: [
            {
                id: 60601,
                title: { en: 'Lesson 1: Public Services', vi: 'Bài học 1: Dịch vụ công cộng' },
                aims: {
                    en: ['Talk about public services in your town', 'Use definite and indefinite articles', 'Use prepositions of place'],
                    vi: ['Nói về các dịch vụ công cộng trong thị trấn của bạn', 'Sử dụng mạo từ xác định và không xác định', 'Sử dụng giới từ chỉ nơi chốn']
                },
                vocabulary: [
                    { term: 'police station', pronunciation: '/pəˈliːs ˈsteɪʃn/', vietnamese: 'đồn cảnh sát' },
                    { term: 'library', pronunciation: '/ˈlaɪbreri/', vietnamese: 'thư viện' },
                    { term: 'hospital', pronunciation: '/ˈhɑːspɪtl/', vietnamese: 'bệnh viện' },
                    { term: 'train station', pronunciation: '/treɪn ˈsteɪʃn/', vietnamese: 'ga tàu' },
                    { term: 'post office', pronunciation: '/poʊst ˈɔːfɪs/', vietnamese: 'bưu điện' },
                    { term: 'bus station', pronunciation: '/bʌs ˈsteɪʃn/', vietnamese: 'bến xe buýt' },
                ],
                grammar: [
                    { title: { en: 'Articles', vi: 'Mạo từ' }, explanation: { en: ['Use "a/an" for a singular noun when we talk about it for the first time. Use "the" when it\'s clear from the situation which one we\'re talking about.', 'Is there a train station near here? The train station is on Queen\'s Street.'], vi: ['Sử dụng "a/an" cho danh từ số ít khi chúng ta nói về nó lần đầu tiên. Sử dụng "the" khi rõ ràng từ tình huống chúng ta đang nói về cái nào.', 'Có ga tàu nào gần đây không? Ga tàu ở trên Phố Queen.'] } },
                    { title: { en: 'Prepositions of Place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ['We use prepositions of place to say where things are.', 'It\'s next to the park. It\'s between the police station and the hospital.'], vi: ['Chúng ta sử dụng giới từ chỉ nơi chốn để nói vị trí của sự vật.', 'Nó ở cạnh công viên. Nó ở giữa đồn cảnh sát và bệnh viện.'] } },
                ],
                activities: [],
            },
        ]
      },
      { id: 607, title: { en: 'Unit 7: Movies', vi: 'Bài 7: Phim ảnh' }, lessons: [] },
      { id: 608, title: { en: 'Unit 8: The World around Us', vi: 'Bài 8: Thế giới quanh ta' }, lessons: [] },
      { id: 609, title: { en: 'Unit 9: Houses in the Future', vi: 'Bài 9: Ngôi nhà trong tương lai' }, lessons: [] },
      { id: 610, title: { en: 'Unit 10: Cities around the World', vi: 'Bài 10: Các thành phố trên thế giới' }, lessons: [] }
    ]
};
