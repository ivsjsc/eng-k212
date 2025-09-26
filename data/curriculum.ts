import { Curriculum } from '../types';
import { sw6Data } from './sw6';
import { sw7Data } from './sw7';
import { sw8Data } from './sw8';
import { sw9Data } from './sw9';
import { sm1Data } from './sm1';
import { sm2Data } from './sm2';
import { sm3Data } from './sm3';
import { sm4Data } from './sm4';
import { g10Data } from './g10';
import { g11Data } from './g11';
import { g12Data } from './g12';

const IMG_BASE = 'https://storage.googleapis.com/maker-suite-project-files-prod/upload/flashcard_images/';
const GD_BASE = `${IMG_BASE}goaldigger_`;
const SM_BASE = `${IMG_BASE}superminds_`;

export const curriculumData: Curriculum = [
    {
        category: { en: 'Kindergarten IVS-Mastery', vi: 'Mầm non IVS-Mastery' },
        levels: [
            // Level 1: Goaldigger Book 1 (Ages 3)
            {
                level: 1,
                title: { en: 'Goaldigger 1', vi: 'Goaldigger 1' },
                subtitle: { en: 'Preschool - Ages 3', vi: 'Mầm non - 3 tuổi' },
                ebookPdfUrl: 'https://drive.google.com/file/d/15nr-AZWt8i5kMalcGs6boFTFxVoRvIzn/view?usp=sharing',
                units: [
                    {
                        id: 101,
                        title: { en: 'Unit 1: Getting Started', vi: 'Bài 1: Bắt đầu' },
                        lessons: [
                            {
                                id: 10101,
                                title: { en: 'Familiar Objects & Colors', vi: 'Đồ vật quen thuộc & Màu sắc' },
                                aims: {
                                    en: ['Speak about familiar objects and colors.', 'Listen and identify colors and objects.', 'Read and recognize words about objects and colors.', 'Write simple words to describe objects and colors.'],
                                    vi: ['Nói về các đồ vật quen thuộc và màu sắc.', 'Nghe và nhận diện màu sắc, đồ vật.', 'Đọc và nhận biết các từ về đồ vật, màu sắc.', 'Viết các từ đơn giản mô tả đồ vật, màu sắc.']
                                },
                                vocabulary: [
                                    { term: 'red', pronunciation: '/rɛd/', vietnamese: 'màu đỏ', imageUrl: `${GD_BASE}red.png` },
                                    { term: 'yellow', pronunciation: '/ˈjɛloʊ/', vietnamese: 'màu vàng', imageUrl: `${GD_BASE}yellow.png` },
                                    { term: 'orange', pronunciation: '/ˈɔrɪndʒ/', vietnamese: 'màu cam', imageUrl: `${GD_BASE}orange.png` },
                                    { term: 'green', pronunciation: '/ɡrin/', vietnamese: 'màu xanh lá', imageUrl: `${GD_BASE}green.png` },
                                    { term: 'blue', pronunciation: '/blu/', vietnamese: 'màu xanh dương', imageUrl: `${GD_BASE}blue.png` },
                                    { term: 'apple', pronunciation: '/ˈæpəl/', vietnamese: 'quả táo', imageUrl: `${GD_BASE}apple.png` },
                                    { term: 'flower', pronunciation: '/ˈflaʊər/', vietnamese: 'bông hoa', imageUrl: `${GD_BASE}flower.png` },
                                    { term: 'sun', pronunciation: '/sʌn/', vietnamese: 'mặt trời', imageUrl: `${GD_BASE}sun.png` },
                                    { term: 'bear', pronunciation: '/bɛər/', vietnamese: 'con gấu', imageUrl: `${GD_BASE}bear.png` },
                                    { term: 'fish', pronunciation: '/fɪʃ/', vietnamese: 'con cá', imageUrl: `${GD_BASE}fish.png` },
                                    { term: 'ball', pronunciation: '/bɔːl/', vietnamese: 'quả bóng' },
                                    { term: 'car', pronunciation: '/kɑːr/', vietnamese: 'xe ô tô' },
                                    { term: 'tree', pronunciation: '/triː/', vietnamese: 'cái cây' },
                                    { term: 'book', pronunciation: '/bʊk/', vietnamese: 'quyển sách' },
                                    { term: 'chair', pronunciation: '/tʃɛər/', vietnamese: 'cái ghế' },
                                ],
                                grammar: [{
                                    title: { en: 'Simple Sentences with "This is..."', vi: 'Câu đơn giản với "This is..."' },
                                    explanation: { en: ['Use "This is..." to introduce a singular object.', 'Example: This is a red apple.'], vi: ['Sử dụng "This is..." để giới thiệu một vật thể số ít.', 'Ví dụ: Đây là một quả táo màu đỏ.'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Match colors to the correct objects (Worksheet 9).', 'Color fruits and objects (Worksheet 10).'], vi: ['Nối màu với các đồ vật đúng (Bài tập 9).', 'Tô màu trái cây và đồ vật (Bài tập 10).'] }
                                }]
                            },
                            {
                                id: 10102,
                                title: { en: 'Counting & Animals', vi: 'Đếm số & Động vật' },
                                aims: {
                                    en: ['Count numbers from 1 to 5.', 'Recognize and name common animals.', 'Answer simple questions about numbers and animals.'],
                                    vi: ['Đếm các số từ 1 đến 5.', 'Nhận biết và gọi tên các loài động vật phổ biến.', 'Trả lời các câu hỏi đơn giản về số và động vật.']
                                },
                                vocabulary: [
                                    { term: 'one', pronunciation: '/wʌn/', vietnamese: 'một', imageUrl: `${GD_BASE}one.png` },
                                    { term: 'two', pronunciation: '/tu/', vietnamese: 'hai', imageUrl: `${GD_BASE}two.png` },
                                    { term: 'three', pronunciation: '/θri/', vietnamese: 'ba', imageUrl: `${GD_BASE}three.png` },
                                    { term: 'four', pronunciation: '/fɔr/', vietnamese: 'bốn', imageUrl: `${GD_BASE}four.png` },
                                    { term: 'five', pronunciation: '/faɪv/', vietnamese: 'năm', imageUrl: `${GD_BASE}five.png` },
                                    { term: 'lion', pronunciation: '/ˈlaɪən/', vietnamese: 'sư tử', imageUrl: `${GD_BASE}lion.png` },
                                    { term: 'rabbit', pronunciation: '/ˈræbɪt/', vietnamese: 'con thỏ', imageUrl: `${GD_BASE}rabbit.png` },
                                    { term: 'horse', pronunciation: '/hɔrs/', vietnamese: 'con ngựa', imageUrl: `${GD_BASE}horse.png` },
                                    { term: 'elephant', pronunciation: '/ˈɛləfənt/', vietnamese: 'con voi', imageUrl: `${GD_BASE}elephant.png` },
                                    { term: 'cat', pronunciation: '/kæt/', vietnamese: 'con mèo', imageUrl: `${SM_BASE}cat.png` },
                                    { term: 'dog', pronunciation: '/dɔɡ/', vietnamese: 'con chó', imageUrl: `${SM_BASE}dog.png` },
                                    { term: 'monkey', pronunciation: '/ˈmʌŋki/', vietnamese: 'con khỉ' },
                                    { term: 'duck', pronunciation: '/dʌk/', vietnamese: 'con vịt' },
                                    { term: 'pig', pronunciation: '/pɪɡ/', vietnamese: 'con lợn' },
                                    { term: 'bird', pronunciation: '/bɜːrd/', vietnamese: 'con chim' },
                                    { term: 'sheep', pronunciation: '/ʃiːp/', vietnamese: 'con cừu' },
                                ],
                                grammar: [{
                                    title: { en: 'Simple Sentences with "There are..."', vi: 'Câu đơn giản với "There are..."' },
                                    explanation: { en: ['Use "There are..." to talk about more than one object.', 'Example: There are two flowers.'], vi: ['Sử dụng "There are..." để nói về nhiều hơn một vật thể.', 'Ví dụ: Có hai bông hoa.'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Match numbers to the correct number of pictures (Worksheet 3).', 'Color the correct number of apples (Worksheet 4).', 'Match animals to their shadows (Worksheet 5).'], vi: ['Nối số với số lượng hình ảnh chính xác (Bài tập 3).', 'Tô màu đúng số lượng táo (Bài tập 4).', 'Nối động vật với bóng của chúng (Bài tập 5).'] }
                                }]
                            },
                            {
                                id: 10103,
                                title: { en: 'Emotions & Daily Activities', vi: 'Cảm xúc & Hoạt động hàng ngày' },
                                aims: {
                                    en: ['Describe simple emotions.', 'Describe daily activities like eating, sleeping, and playing.'],
                                    vi: ['Mô tả các cảm xúc đơn giản.', 'Mô tả các hoạt động hàng ngày như ăn, ngủ, và chơi.']
                                },
                                vocabulary: [
                                    { term: 'happy', pronunciation: '/ˈhæpi/', vietnamese: 'vui vẻ', imageUrl: `${GD_BASE}happy.png` },
                                    { term: 'great', pronunciation: '/ɡreɪt/', vietnamese: 'tuyệt vời', imageUrl: `${GD_BASE}great.png` },
                                    { term: 'sleepy', pronunciation: '/ˈslipi/', vietnamese: 'buồn ngủ', imageUrl: `${GD_BASE}sleepy.png` },
                                    { term: 'hungry', pronunciation: '/ˈhʌŋɡri/', vietnamese: 'đói bụng', imageUrl: `${GD_BASE}hungry.png` },
                                    { term: 'thirsty', pronunciation: '/ˈθɜrsti/', vietnamese: 'khát nước', imageUrl: `${GD_BASE}thirsty.png` },
                                    { term: 'tired', pronunciation: '/ˈtaɪərd/', vietnamese: 'mệt mỏi', imageUrl: `${GD_BASE}tired.png` },
                                    { term: 'eat', pronunciation: '/it/', vietnamese: 'ăn', imageUrl: `${GD_BASE}eat.png` },
                                    { term: 'drink', pronunciation: '/drɪŋk/', vietnamese: 'uống', imageUrl: `${GD_BASE}drink.png` },
                                    { term: 'sleep', pronunciation: '/slip/', vietnamese: 'ngủ', imageUrl: `${GD_BASE}sleep.png` },
                                    { term: 'play', pronunciation: '/pleɪ/', vietnamese: 'chơi', imageUrl: `${GD_BASE}play.png` },
                                    { term: 'sad', pronunciation: '/sæd/', vietnamese: 'buồn' },
                                    { term: 'angry', pronunciation: '/ˈæŋɡri/', vietnamese: 'tức giận' },
                                    { term: 'surprised', pronunciation: '/sərˈpraɪzd/', vietnamese: 'ngạc nhiên' },
                                    { term: 'scared', pronunciation: '/skɛərd/', vietnamese: 'sợ hãi' },
                                    { term: 'read', pronunciation: '/riːd/', vietnamese: 'đọc' },
                                ],
                                grammar: [{
                                    title: { en: 'Asking "How are you?"', vi: 'Hỏi "Bạn khỏe không?"' },
                                    explanation: { en: ['Use "How are you?" to ask about someone\'s feeling.', 'You can answer with "I am happy." or "I am hungry."'], vi: ['Sử dụng "How are you?" để hỏi về cảm giác của ai đó.', 'Bạn có thể trả lời bằng "Tôi vui." hoặc "Tôi đói."'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Identify your feelings from pictures (Worksheet 1, 2).', 'Match activities to their shadows (Worksheet 14).'], vi: ['Xác định cảm xúc của bạn từ hình ảnh (Bài tập 1, 2).', 'Nối các hoạt động với bóng của chúng (Bài tập 14).'] }
                                }]
                            }
                        ]
                    }
                ]
            },
            // Level 2: Goaldigger Book 2 (Ages 4)
            {
                level: 2,
                title: { en: 'Goaldigger 2', vi: 'Goaldigger 2' },
                subtitle: { en: 'Preschool - Ages 4', vi: 'Mầm non - 4 tuổi' },
                ebookPdfUrl: 'https://drive.google.com/file/d/1mJEanfKmMckBsJDmk-ZfbBWiYFQ7VjSv/view?usp=drive_link',
                units: [
                    {
                        id: 201,
                        title: { en: 'Unit 1: Exploring My World', vi: 'Bài 1: Khám phá thế giới của em' },
                        lessons: [
                            {
                                id: 20101,
                                title: { en: 'Transportation', vi: 'Phương tiện giao thông' },
                                aims: {
                                    en: ['Identify and name different vehicles.', 'Trace and color different types of transportation.'],
                                    vi: ['Nhận biết và gọi tên các loại xe khác nhau.', 'Viết theo và tô màu các loại phương tiện giao thông.']
                                },
                                vocabulary: [
                                    { term: 'taxi', pronunciation: '/ˈtæksi/', vietnamese: 'xe taxi', imageUrl: `${SM_BASE}taxi.png` },
                                    { term: 'bus', pronunciation: '/bʌs/', vietnamese: 'xe buýt', imageUrl: `${SM_BASE}bus.png` },
                                    { term: 'ambulance', pronunciation: '/ˈæmbjələns/', vietnamese: 'xe cứu thương', imageUrl: `${GD_BASE}ambulance.png` },
                                    { term: 'train', pronunciation: '/treɪn/', vietnamese: 'tàu hỏa', imageUrl: `${SM_BASE}train.png` },
                                    { term: 'airplane', pronunciation: '/ˈɛrˌpleɪn/', vietnamese: 'máy bay', imageUrl: `${SM_BASE}plane.png` },
                                    { term: 'fire engine', pronunciation: '/ˈfaɪər ˈɛndʒən/', vietnamese: 'xe cứu hỏa', imageUrl: `${GD_BASE}fire_engine.png` },
                                    { term: 'motorcycle', pronunciation: '/ˈmoʊtərˌsaɪkəl/', vietnamese: 'xe máy', imageUrl: `${GD_BASE}motorcycle.png` },
                                    { term: 'bicycle', pronunciation: '/ˈbaɪsɪkəl/', vietnamese: 'xe đạp', imageUrl: `${SM_BASE}bike.png` },
                                    { term: 'boat', pronunciation: '/boʊt/', vietnamese: 'thuyền' },
                                    { term: 'scooter', pronunciation: '/ˈskuːtər/', vietnamese: 'xe tay ga' },
                                    { term: 'truck', pronunciation: '/trʌk/', vietnamese: 'xe tải' },
                                    { term: 'helicopter', pronunciation: '/ˈhɛlɪˌkɑptər/', vietnamese: 'máy bay trực thăng' },
                                ],
                                grammar: [{
                                    title: { en: 'Asking "What is it?"', vi: 'Hỏi "Đây là cái gì?"' },
                                    explanation: { en: ['Use "What is it?" to ask about an object.', 'Example: What is it? It is a yellow bus.'], vi: ['Sử dụng "What is it?" để hỏi về một đồ vật.', 'Ví dụ: Đây là cái gì? Đó là một chiếc xe buýt màu vàng.'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Trace the line to connect the vehicles (Worksheet 1 & 2).', 'Color the vehicles (Worksheet 3).', 'Count the vehicles (Worksheet 6).'], vi: ['Nối đường để kết nối các phương tiện (Bài tập 1 & 2).', 'Tô màu các phương tiện (Bài tập 3).', 'Đếm số lượng phương tiện (Bài tập 6).'] }
                                }]
                            },
                            {
                                id: 20102,
                                title: { en: 'Family', vi: 'Gia đình' },
                                aims: {
                                    en: ['Identify members of the family.', 'Introduce your family members.'],
                                    vi: ['Nhận biết các thành viên trong gia đình.', 'Giới thiệu các thành viên trong gia đình của bạn.']
                                },
                                vocabulary: [
                                    { term: 'family', pronunciation: '/ˈfæməli/', vietnamese: 'gia đình', imageUrl: `${GD_BASE}family.png` },
                                    { term: 'father', pronunciation: '/ˈfɑðər/', vietnamese: 'bố', imageUrl: `${SM_BASE}dad.png` },
                                    { term: 'mother', pronunciation: '/ˈmʌðər/', vietnamese: 'mẹ', imageUrl: `${SM_BASE}mum.png` },
                                    { term: 'brother', pronunciation: '/ˈbrʌðər/', vietnamese: 'anh/em trai', imageUrl: `${SM_BASE}brother.png` },
                                    { term: 'sister', pronunciation: '/ˈsɪstər/', vietnamese: 'chị/em gái', imageUrl: `${SM_BASE}sister.png` },
                                    { term: 'grandfather', pronunciation: '/ˈɡrændˌfɑðər/', vietnamese: 'ông', imageUrl: `${SM_BASE}grandpa.png` },
                                    { term: 'grandmother', pronunciation: '/ˈɡrændˌmʌðər/', vietnamese: 'bà', imageUrl: `${SM_BASE}grandma.png` },
                                    { term: 'baby', pronunciation: '/ˈbeɪbi/', vietnamese: 'em bé' },
                                    { term: 'aunt', pronunciation: '/ænt/', vietnamese: 'cô/dì' },
                                    { term: 'uncle', pronunciation: '/ˈʌŋkəl/', vietnamese: 'chú/cậu' },
                                ],
                                grammar: [{
                                    title: { en: 'Introducing family with "This is my..."', vi: 'Giới thiệu gia đình với "Đây là..."' },
                                    explanation: { en: ['Use "This is my..." to introduce a family member.', 'Example: This is my mother.'], vi: ['Sử dụng "This is my..." để giới thiệu một thành viên trong gia đình.', 'Ví dụ: Đây là mẹ của tôi.'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Draw a picture of your family (Worksheet 8).', 'Create a family album and make a video introducing them (Worksheet 9).'], vi: ['Vẽ một bức tranh về gia đình bạn (Bài tập 8).', 'Tạo một album gia đình và quay video giới thiệu họ (Bài tập 9).'] }
                                }]
                            }
                        ]
                    }
                ]
            },
            // Level 3: Goaldigger Book 3 (Ages 5)
            {
                level: 3,
                title: { en: 'Goaldigger 3', vi: 'Goaldigger 3' },
                subtitle: { en: 'Preschool - Ages 5', vi: 'Mầm non - 5 tuổi' },
                ebookPdfUrl: 'https://drive.google.com/file/d/1kiQOoeC69I3ZMUZHiUNkA1mfQkdVhMz6/view?usp=drive_link',
                units: [
                    {
                        id: 301,
                        title: { en: 'Unit 1: The World Around Me', vi: 'Bài 1: Thế giới quanh em' },
                        lessons: [
                            {
                                id: 30101,
                                title: { en: 'Daily & Home Activities', vi: 'Hoạt động hàng ngày & ở nhà' },
                                aims: {
                                    en: ['Talk about daily routines.', 'Talk about chores at home.'],
                                    vi: ['Nói về các thói quen hàng ngày.', 'Nói về các công việc nhà.']
                                },
                                vocabulary: [
                                    { term: 'take a bath', pronunciation: '/teɪk ə bæθ/', vietnamese: 'tắm', imageUrl: `${SM_BASE}bath.png` },
                                    { term: 'eat breakfast', pronunciation: '/iːt ˈbrɛkfəst/', vietnamese: 'ăn sáng', imageUrl: `${SM_BASE}eat_breakfast.png` },
                                    { term: 'walk the dog', pronunciation: '/wɔk ðə dɔɡ/', vietnamese: 'dắt chó đi dạo', imageUrl: `${GD_BASE}walk_dog.png` },
                                    { term: 'do homework', pronunciation: '/du ˈhoʊmˌwɜrk/', vietnamese: 'làm bài tập về nhà', imageUrl: `${GD_BASE}homework.png` },
                                    { term: 'watch TV', pronunciation: '/wɑtʃ ˌtiˈvi/', vietnamese: 'xem TV', imageUrl: `${GD_BASE}watch_tv.png` },
                                    { term: 'sleep', pronunciation: '/slip/', vietnamese: 'ngủ', imageUrl: `${GD_BASE}sleep.png` },
                                    { term: 'clean', pronunciation: '/klin/', vietnamese: 'dọn dẹp', imageUrl: `${GD_BASE}clean.png` },
                                    { term: 'water flowers', pronunciation: '/ˈwɔtər ˈflaʊərz/', vietnamese: 'tưới hoa', imageUrl: `${GD_BASE}water_flowers.png` },
                                    { term: 'get dressed', pronunciation: '/ɡɛt drɛst/', vietnamese: 'mặc quần áo' },
                                    { term: 'brush teeth', pronunciation: '/brʌʃ tiːθ/', vietnamese: 'đánh răng' },
                                    { term: 'read a book', pronunciation: '/riːd ə bʊk/', vietnamese: 'đọc sách' },
                                    { term: 'go to school', pronunciation: '/ɡoʊ tuː skuːl/', vietnamese: 'đi học' },
                                ],
                                grammar: [{
                                    title: { en: 'Talking about routines', vi: 'Nói về thói quen' },
                                    explanation: { en: ["Use Present Simple to talk about what you do.", "Example: I eat breakfast in the morning."], vi: ["Sử dụng thì Hiện tại đơn để nói về những gì bạn làm.", "Ví dụ: Tôi ăn sáng vào buổi sáng."] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Connect and color pictures of activities (Worksheet 1, 3, 5, 7).', 'Tick the activities you do in the evening or at home (Worksheet 4, 8).'], vi: ['Nối và tô màu tranh các hoạt động (Bài tập 1, 3, 5, 7).', 'Đánh dấu các hoạt động bạn làm vào buổi tối hoặc ở nhà (Bài tập 4, 8).'] }
                                }]
                            },
                            {
                                id: 30102,
                                title: { en: 'Weather & Seasons', vi: 'Thời tiết & Các mùa' },
                                aims: {
                                    en: ['Describe the weather.', 'Talk about activities for different seasons.'],
                                    vi: ['Mô tả thời tiết.', 'Nói về các hoạt động cho các mùa khác nhau.']
                                },
                                vocabulary: [
                                    { term: 'sunny', pronunciation: '/ˈsʌni/', vietnamese: 'nắng', imageUrl: `${GD_BASE}sunny.png` },
                                    { term: 'cloudy', pronunciation: '/ˈklaʊdi/', vietnamese: 'nhiều mây', imageUrl: `${GD_BASE}cloudy.png` },
                                    { term: 'rainy', pronunciation: '/ˈreɪni/', vietnamese: 'mưa', imageUrl: `${GD_BASE}rainy.png` },
                                    { term: 'windy', pronunciation: '/ˈwɪndi/', vietnamese: 'gió', imageUrl: `${GD_BASE}windy.png` },
                                    { term: 'hot', pronunciation: '/hɑt/', vietnamese: 'nóng', imageUrl: `${GD_BASE}hot.png` },
                                    { term: 'cold', pronunciation: '/koʊld/', vietnamese: 'lạnh', imageUrl: `${GD_BASE}cold.png` },
                                    { term: 'summer', pronunciation: '/ˈsʌmər/', vietnamese: 'mùa hè', imageUrl: `${GD_BASE}summer.png` },
                                    { term: 'autumn', pronunciation: '/ˈɔtəm/', vietnamese: 'mùa thu', imageUrl: `${GD_BASE}autumn.png` },
                                    { term: 'winter', pronunciation: '/ˈwɪntər/', vietnamese: 'mùa đông', imageUrl: `${GD_BASE}winter.png` },
                                    { term: 'snowy', pronunciation: '/ˈsnoʊi/', vietnamese: 'có tuyết' },
                                    { term: 'stormy', pronunciation: '/ˈstɔːrmi/', vietnamese: 'bão' },
                                    { term: 'spring', pronunciation: '/sprɪŋ/', vietnamese: 'mùa xuân' },
                                    { term: 'foggy', pronunciation: '/ˈfɔːɡi/', vietnamese: 'có sương mù' },
                                ],
                                grammar: [{
                                    title: { en: "What's the weather like?", vi: "Thời tiết thế nào?" },
                                    explanation: { en: ["Ask about the weather using 'What's the weather like?'", "Answer with 'It's sunny.'"], vi: ["Hỏi về thời tiết bằng 'What's the weather like?'", "Trả lời bằng 'Trời nắng.'"] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Connect pictures related to seasons (Worksheet 13).', 'Connect weather to feelings and activities (Worksheet 14).', 'Color weather phenomena (Worksheet 15).'], vi: ['Nối các hình ảnh liên quan đến các mùa (Bài tập 13).', 'Nối thời tiết với cảm xúc và hoạt động (Bài tập 14).', 'Tô màu các hiện tượng thời tiết (Bài tập 15).'] }
                                }]
                            }
                        ]
                    }
                ]
            },
            // Level 4: Goaldigger Book 4 (Ages 5, Advanced)
            {
                level: 4,
                title: { en: 'Goaldigger 4', vi: 'Goaldigger 4' },
                subtitle: { en: 'Preschool - Ages 5 (Advanced)', vi: 'Mầm non - 5 tuổi (Nâng cao)' },
                ebookPdfUrl: 'https://drive.google.com/file/d/1OW1fdwKShAfVQI4ckhhBmaghjTCSI4kx/view?usp=drive_link',
                units: [
                    {
                        id: 401,
                        title: { en: 'Unit 1: Numbers & Letters', vi: 'Bài 1: Số đếm & Chữ cái' },
                        lessons: [
                            {
                                id: 40101,
                                title: { en: 'Numbers 1-25', vi: 'Số đếm 1-25' },
                                aims: {
                                    en: ['Count, trace, and write numbers 1-25.', 'Compare numbers using <, >, =.'],
                                    vi: ['Đếm, viết theo và viết các số từ 1-25.', 'So sánh các số bằng <, >, =.']
                                },
                                vocabulary: [
                                    { term: 'six', pronunciation: '/sɪks/', vietnamese: 'sáu' },
                                    { term: 'seven', pronunciation: '/ˈsɛvən/', vietnamese: 'bảy' },
                                    { term: 'eight', pronunciation: '/eɪt/', vietnamese: 'tám' },
                                    { term: 'nine', pronunciation: '/naɪn/', vietnamese: 'chín' },
                                    { term: 'ten', pronunciation: '/tɛn/', vietnamese: 'mười' },
                                    { term: 'eleven', pronunciation: '/ɪˈlɛvən/', vietnamese: 'mười một' },
                                    { term: 'twelve', pronunciation: '/twɛlv/', vietnamese: 'mười hai' },
                                ],
                                grammar: [{
                                    title: { en: 'Comparing Numbers', vi: 'So sánh số' },
                                    explanation: { en: ['Use > (is greater than), < (is less than), and = (is equal to) to compare numbers.', 'Example: 17 > 11, 14 < 23, 12 = 12.'], vi: ['Sử dụng > (lớn hơn), < (nhỏ hơn), và = (bằng) để so sánh các số.', 'Ví dụ: 17 > 11, 14 < 23, 12 = 12.'] }
                                }],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ["Look, count and trace numbers (Worksheet 'NUMBERS').", "Count shapes and write the number (Worksheet 'LET'S COUNT SHAPES!').", "Compare numbers (Worksheet 'Comparing Number').", "Fill in the missing numbers 1-25 (Worksheet 'Numbers 1 - 25')."], vi: ["Nhìn, đếm và viết theo số (Bài tập 'NUMBERS').", "Đếm hình và viết số (Bài tập 'LET'S COUNT SHAPES!').", "So sánh các số (Bài tập 'Comparing Number').", "Điền vào các số còn thiếu 1-25 (Bài tập 'Numbers 1 - 25')."] }
                                }]
                            },
                            {
                                id: 40102,
                                title: { en: 'Alphabet A-M', vi: 'Bảng chữ cái A-M' },
                                aims: {
                                    en: ['Learn letters A to M.', 'Trace and write uppercase and lowercase letters.', 'Learn words starting with these letters.'],
                                    vi: ['Học các chữ cái từ A đến M.', 'Viết theo và viết chữ hoa và chữ thường.', 'Học các từ bắt đầu bằng các chữ cái này.']
                                },
                                vocabulary: [
                                    { term: 'Apple', pronunciation: '/ˈæpəl/', vietnamese: 'Quả táo' },
                                    { term: 'Banana', pronunciation: '/bəˈnænə/', vietnamese: 'Quả chuối' },
                                    { term: 'Carrot', pronunciation: '/ˈkærət/', vietnamese: 'Củ cà rốt' },
                                    { term: 'Duck', pronunciation: '/dʌk/', vietnamese: 'Con vịt' },
                                    { term: 'Eggplant', pronunciation: '/ˈɛɡˌplænt/', vietnamese: 'Cà tím' },
                                    { term: 'Flower', pronunciation: '/ˈflaʊər/', vietnamese: 'Bông hoa' },
                                    { term: 'Gift', pronunciation: '/ɡɪft/', vietnamese: 'Món quà' },
                                    { term: 'House', pronunciation: '/haʊs/', vietnamese: 'Ngôi nhà' },
                                    { term: 'Ice Cream', pronunciation: '/aɪs krim/', vietnamese: 'Kem' },
                                    { term: 'Jelly', pronunciation: '/ˈdʒɛli/', vietnamese: 'Thạch' },
                                    { term: 'Key', pronunciation: '/ki/', vietnamese: 'Chìa khóa' },
                                    { term: 'Lion', pronunciation: '/ˈlaɪən/', vietnamese: 'Sư tử' },
                                    { term: 'Mango', pronunciation: '/ˈmæŋɡoʊ/', vietnamese: 'Quả xoài' },
                                ],
                                grammar: [],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Color the drawing and trace the word.', 'Trace the uppercase and lowercase letters for each letter from A to M.'], vi: ['Tô màu bức vẽ và viết theo từ.', 'Viết theo chữ hoa và chữ thường cho mỗi chữ cái từ A đến M.'] }
                                }]
                            },
                            {
                                id: 40103,
                                title: { en: 'Alphabet N-Z', vi: 'Bảng chữ cái N-Z' },
                                aims: {
                                    en: ['Learn letters N to Z.', 'Trace and write uppercase and lowercase letters.', 'Learn words starting with these letters.'],
                                    vi: ['Học các chữ cái từ N đến Z.', 'Viết theo và viết chữ hoa và chữ thường.', 'Học các từ bắt đầu bằng các chữ cái này.']
                                },
                                vocabulary: [
                                    { term: 'Nut', pronunciation: '/nʌt/', vietnamese: 'Hạt' },
                                    { term: 'Orange', pronunciation: '/ˈɔrɪndʒ/', vietnamese: 'Quả cam' },
                                    { term: 'Pen', pronunciation: '/pɛn/', vietnamese: 'Cái bút' },
                                    { term: 'Queen', pronunciation: '/kwin/', vietnamese: 'Nữ hoàng' },
                                    { term: 'Rose', pronunciation: '/roʊz/', vietnamese: 'Hoa hồng' },
                                    { term: 'Strawberry', pronunciation: '/ˈstrɔˌbɛri/', vietnamese: 'Quả dâu' },
                                    { term: 'Tiger', pronunciation: '/ˈtaɪɡər/', vietnamese: 'Con hổ' },
                                    { term: 'Umbrella', pronunciation: '/ʌmˈbrɛlə/', vietnamese: 'Cái ô' },
                                    { term: 'Vase', pronunciation: '/veɪs/', vietnamese: 'Lọ hoa' },
                                    { term: 'Watermelon', pronunciation: '/ˈwɔtərˌmɛlən/', vietnamese: 'Dưa hấu' },
                                    { term: 'Xylophone', pronunciation: '/ˈzaɪləˌfoʊn/', vietnamese: 'Đàn mộc cầm' },
                                    { term: 'Yoyo', pronunciation: '/ˈjoʊˌjoʊ/', vietnamese: 'Cái yoyo' },
                                    { term: 'Zebra', pronunciation: '/ˈzibrə/', vietnamese: 'Ngựa vằn' },
                                ],
                                grammar: [],
                                activities: [{
                                    type: 'Practice',
                                    description: { en: ['Color the drawing and trace the word.', 'Trace the uppercase and lowercase letters for each letter from N to Z.'], vi: ['Tô màu bức vẽ và viết theo từ.', 'Viết theo chữ hoa và chữ thường cho mỗi chữ cái từ N đến Z.'] }
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        category: { en: 'Primary IVS-Mastery', vi: 'Tiểu học IVS-Mastery' },
        levels: [
            // Super Minds Starter
            {
                level: 0, // Renamed from Level 7 for consistency with Super Minds series
                title: { en: 'Super Minds Starter', vi: 'Super Minds Starter' },
                subtitle: { en: 'Primary School - Grade 1', vi: 'Tiểu học - Lớp 1' },
                ebookPdfUrl: 'https://drive.google.com/file/d/1nFhT8dKSMvh_msQAmAC9PmQ_q4pVuYtC/view?usp=drive_link',
                units: [
                    {
                        id: 700,
                        title: { en: 'Hello', vi: 'Chào hỏi' },
                        lessons: [
                            {
                                id: 70001,
                                title: { en: 'Greetings and Colors', vi: 'Chào hỏi và Màu sắc' },
                                aims: { en: ['Introduce names and greet others.', 'Name simple objects.', 'Identify and name colors.'], vi: ['Giới thiệu tên và chào hỏi người khác.', 'Gọi tên các đồ vật đơn giản.', 'Nhận biết và gọi tên các màu sắc.'] },
                                vocabulary: [
                                    { term: 'red', pronunciation: '/rɛd/', vietnamese: 'màu đỏ', imageUrl: `${GD_BASE}red.png` },
                                    { term: 'blue', pronunciation: '/blu/', vietnamese: 'màu xanh dương', imageUrl: `${GD_BASE}blue.png` },
                                    { term: 'green', pronunciation: '/ɡrin/', vietnamese: 'màu xanh lá', imageUrl: `${GD_BASE}green.png` },
                                    { term: 'orange', pronunciation: '/ˈɔrɪndʒ/', vietnamese: 'màu cam', imageUrl: `${GD_BASE}orange.png` },
                                    { term: 'purple', pronunciation: '/ˈpɜrpəl/', vietnamese: 'màu tím', imageUrl: `${SM_BASE}purple.png` },
                                    { term: 'yellow', pronunciation: '/ˈjɛloʊ/', vietnamese: 'màu vàng', imageUrl: `${GD_BASE}yellow.png` }
                                ],
                                grammar: [{ title: { en: 'Greetings', vi: 'Chào hỏi' }, explanation: { en: ["Use 'Hello! What's your name?' to ask for a name.", "Answer with 'I'm [name].'"], vi: ['Sử dụng "Hello! What\'s your name?" để hỏi tên.', 'Trả lời bằng "I\'m [tên]".'] } }],
                                activities: [{ type: 'Practice', description: { en: ['Listen and sing the "What\'s your name?" song.', 'Act out introducing yourself.'], vi: ['Nghe và hát bài hát "Tên bạn là gì?".', 'Diễn lại cảnh giới thiệu bản thân.'] } }]
                            }
                        ]
                    },
                    {
                        id: 701,
                        title: { en: 'Unit 1: My classroom', vi: 'Bài 1: Lớp học của em' },
                        lessons: [{
                            id: 70101,
                            title: { en: 'Objects & Numbers 1-6', vi: 'Đồ vật & Số đếm 1-6' },
                            aims: { en: ['Identify classroom objects.', 'Count from 1 to 6.', 'Follow simple classroom commands.'], vi: ['Nhận biết đồ dùng học tập.', 'Đếm từ 1 đến 6.', 'Thực hiện các mệnh lệnh đơn giản trong lớp.'] },
                            vocabulary: [
                                { term: 'pencil', pronunciation: '/ˈpɛnsəl/', vietnamese: 'bút chì', imageUrl: `${SM_BASE}pencil.png` },
                                { term: 'chair', pronunciation: '/tʃɛər/', vietnamese: 'cái ghế', imageUrl: `${SM_BASE}chair.png` },
                                { term: 'bag', pronunciation: '/bæɡ/', vietnamese: 'cái cặp', imageUrl: `${SM_BASE}bag.png` },
                                { term: 'rubber', pronunciation: '/ˈrʌbər/', vietnamese: 'cục tẩy', imageUrl: `${SM_BASE}rubber.png` },
                                { term: 'book', pronunciation: '/bʊk/', vietnamese: 'quyển sách', imageUrl: `${SM_BASE}book.png` },
                                { term: 'desk', pronunciation: '/dɛsk/', vietnamese: 'bàn học', imageUrl: `${SM_BASE}desk.png` },
                                { term: 'one', pronunciation: '/wʌn/', vietnamese: 'một', imageUrl: `${SM_BASE}one.png` }, { term: 'two', pronunciation: '/tu/', vietnamese: 'hai', imageUrl: `${SM_BASE}two.png` }, { term: 'three', pronunciation: '/θri/', vietnamese: 'ba', imageUrl: `${SM_BASE}three.png` }, { term: 'four', pronunciation: '/fɔr/', vietnamese: 'bốn', imageUrl: `${SM_BASE}four.png` }, { term: 'five', pronunciation: '/faɪv/', vietnamese: 'năm', imageUrl: `${SM_BASE}five.png` }, { term: 'six', pronunciation: '/sɪks/', vietnamese: 'sáu', imageUrl: `${SM_BASE}six.png` },
                                { term: 'table', pronunciation: '/ˈteɪbəl/', vietnamese: 'cái bàn' },
                                { term: 'whiteboard', pronunciation: '/ˈwaɪtbɔːrd/', vietnamese: 'bảng trắng' },
                                { term: 'window', pronunciation: '/ˈwɪndoʊ/', vietnamese: 'cửa sổ' },
                                { term: 'door', pronunciation: '/dɔːr/', vietnamese: 'cửa ra vào' },
                                { term: 'crayon', pronunciation: '/ˈkreɪɑːn/', vietnamese: 'bút sáp màu' },
                            ],
                            grammar: [{ title: { en: 'Classroom Commands', vi: 'Mệnh lệnh trong lớp' }, explanation: { en: ["Use verbs for simple commands.", "Examples: Stand up. Sit down. Open your book. Close your book. Pick up... Put..."], vi: ['Sử dụng động từ cho các mệnh lệnh đơn giản.', 'Ví dụ: Đứng lên. Ngồi xuống. Mở sách ra. Gấp sách lại. Nhặt... Đặt...'] } }],
                            activities: [{ type: 'Practice', description: { en: ['Listen and point to classroom objects.', 'Look and count objects from 1-6.'], vi: ['Nghe và chỉ vào đồ dùng học tập.', 'Nhìn và đếm đồ vật từ 1-6.'] } }]
                        }]
                    },
                    {
                        id: 702,
                        title: { en: 'Unit 2: My family', vi: 'Bài 2: Gia đình em' },
                        lessons: [{
                            id: 70201,
                            title: { en: 'Family Members', vi: 'Thành viên gia đình' },
                            aims: { en: ['Identify family members.', 'Talk about possessions.'], vi: ['Nhận biết các thành viên trong gia đình.', 'Nói về sự sở hữu.'] },
                            vocabulary: [
                                { term: 'grandpa', pronunciation: '/ˈɡrænpɑ/', vietnamese: 'ông', imageUrl: `${SM_BASE}grandpa.png` },
                                { term: 'grandma', pronunciation: '/ˈɡrænmɑ/', vietnamese: 'bà', imageUrl: `${SM_BASE}grandma.png` },
                                { term: 'mum', pronunciation: '/mʌm/', vietnamese: 'mẹ', imageUrl: `${SM_BASE}mum.png` },
                                { term: 'dad', pronunciation: '/dæd/', vietnamese: 'bố', imageUrl: `${SM_BASE}dad.png` },
                                { term: 'sister', pronunciation: '/ˈsɪstər/', vietnamese: 'chị/em gái', imageUrl: `${SM_BASE}sister.png` },
                                { term: 'brother', pronunciation: '/ˈbrʌðər/', vietnamese: 'anh/em trai', imageUrl: `${SM_BASE}brother.png` },
                                { term: 'baby', pronunciation: '/ˈbeɪbi/', vietnamese: 'em bé' },
                                { term: 'aunt', pronunciation: '/ænt/', vietnamese: 'cô/dì' },
                                { term: 'uncle', pronunciation: '/ˈʌŋkəl/', vietnamese: 'chú/cậu' },
                                { term: 'cousin', pronunciation: '/ˈkʌzən/', vietnamese: 'anh/chị/em họ' },
                            ],
                            grammar: [{ title: { en: 'Possessives', vi: 'Sở hữu' }, explanation: { en: ["Use 'This is my...' to talk about family or things you have.", "Examples: This is my brother. This is my book."], vi: ['Sử dụng "Đây là của tôi..." để nói về gia đình hoặc những thứ bạn có.', 'Ví dụ: Đây là anh trai của tôi. Đây là cuốn sách của tôi.'] } }],
                            activities: [{ type: 'Practice', description: { en: ['Listen and point to family members.', 'Draw your family and say the names.'], vi: ['Nghe và chỉ vào các thành viên trong gia đình.', 'Vẽ gia đình bạn và nói tên.'] } }]
                        }]
                    },
                    {
                        id: 703,
                        title: { en: 'Unit 3: My face', vi: 'Bài 3: Gương mặt của em' },
                        lessons: [{
                            id: 70301,
                            title: { en: 'Parts of the Face & Feelings', vi: 'Các bộ phận trên mặt & Cảm xúc' },
                            aims: { en: ['Identify parts of the face.', 'Talk about feelings.'], vi: ['Nhận biết các bộ phận trên khuôn mặt.', 'Nói về cảm xúc.'] },
                            vocabulary: [
                                { term: 'eyes', pronunciation: '/aɪz/', vietnamese: 'mắt', imageUrl: `${SM_BASE}eyes.png` },
                                { term: 'ears', pronunciation: '/ɪərz/', vietnamese: 'tai', imageUrl: `${SM_BASE}ears.png` },
                                { term: 'nose', pronunciation: '/noʊz/', vietnamese: 'mũi', imageUrl: `${SM_BASE}nose.png` },
                                { term: 'face', pronunciation: '/feɪs/', vietnamese: 'khuôn mặt', imageUrl: `${SM_BASE}face.png` },
                                { term: 'teeth', pronunciation: '/tiθ/', vietnamese: 'răng', imageUrl: `${SM_BASE}teeth.png` },
                                { term: 'mouth', pronunciation: '/maʊθ/', vietnamese: 'miệng', imageUrl: `${SM_BASE}mouth.png` },
                                { term: 'angry', pronunciation: '/ˈæŋɡri/', vietnamese: 'tức giận', imageUrl: `${GD_BASE}angry.png` },
                                { term: 'happy', pronunciation: '/ˈhæpi/', vietnamese: 'vui vẻ', imageUrl: `${GD_BASE}happy.png` },
                                { term: 'sad', pronunciation: '/sæd/', vietnamese: 'buồn', imageUrl: `${GD_BASE}sad.png` },
                                { term: 'scared', pronunciation: '/skɛərd/', vietnamese: 'sợ hãi', imageUrl: `${GD_BASE}scared.png` },
                                { term: 'hair', pronunciation: '/hɛər/', vietnamese: 'tóc' },
                                { term: 'head', pronunciation: '/hɛd/', vietnamese: 'đầu' },
                                { term: 'cheeks', pronunciation: '/tʃiːks/', vietnamese: 'má' },
                                { term: 'chin', pronunciation: '/tʃɪn/', vietnamese: 'cằm' },
                            ],
                            grammar: [{ title: { en: 'Feelings', vi: 'Cảm xúc' }, explanation: { en: ["Use 'I'm/You're' to describe feelings.", "Ask with 'Are you (angry)?'", "Answer with 'Yes, I am.' or 'No, I'm not.'"], vi: ['Sử dụng "Tôi/Bạn đang..." để mô tả cảm xúc.', 'Hỏi với "Bạn có (tức giận) không?"', 'Trả lời bằng "Có." hoặc "Không."'] } }],
                            activities: [{ type: 'Practice', description: { en: ['Listen and point to parts of the face.', 'Play a game about feelings.'], vi: ['Nghe và chỉ vào các bộ phận trên khuôn mặt.', 'Chơi trò chơi về cảm xúc.'] } }]
                        }]
                    },
                    {
                        id: 704,
                        title: { en: 'Unit 4: Toys', vi: 'Bài 4: Đồ chơi' },
                        lessons: [{
                            id: 70401,
                            title: { en: 'Toys & Numbers 7-10', vi: 'Đồ chơi & Số đếm 7-10' },
                            aims: { en: ['Identify toys.', 'Count from 7 to 10.', 'Talk about what you have.'], vi: ['Nhận biết đồ chơi.', 'Đếm từ 7 đến 10.', 'Nói về những gì bạn có.'] },
                            vocabulary: [
                                { term: 'ball', pronunciation: '/bɔl/', vietnamese: 'quả bóng', imageUrl: `${SM_BASE}ball.png` },
                                { term: 'kite', pronunciation: '/kaɪt/', vietnamese: 'cái diều', imageUrl: `${SM_BASE}kite.png` },
                                { term: 'rope', pronunciation: '/roʊp/', vietnamese: 'dây', imageUrl: `${SM_BASE}rope.png` },
                                { term: 'teddy bear', pronunciation: '/ˈtɛdi bɛər/', vietnamese: 'gấu bông', imageUrl: `${SM_BASE}teddy_bear.png` },
                                { term: 'doll', pronunciation: '/dɑl/', vietnamese: 'búp bê', imageUrl: `${SM_BASE}doll.png` },
                                { term: 'plane', pronunciation: '/pleɪn/', vietnamese: 'máy bay', imageUrl: `${SM_BASE}plane.png` },
                                { term: 'seven', pronunciation: '/ˈsɛvən/', vietnamese: 'bảy' }, { term: 'eight', pronunciation: '/eɪt/', vietnamese: 'tám' }, { term: 'nine', pronunciation: '/naɪn/', vietnamese: 'chín' }, { term: 'ten', pronunciation: '/tɛn/', vietnamese: 'mười' },
                                { term: 'robot', pronunciation: '/ˈroʊbɑːt/', vietnamese: 'người máy' },
                                { term: 'puzzle', pronunciation: '/ˈpʌzəl/', vietnamese: 'trò chơi xếp hình' },
                                { term: 'train', pronunciation: '/treɪn/', vietnamese: 'tàu hỏa' },
                                { term: 'car', pronunciation: '/kɑːr/', vietnamese: 'xe ô tô' },
                                { term: 'blocks', pronunciation: '/blɑːks/', vietnamese: 'khối xếp hình' },
                            ],
                            grammar: [{ title: { en: "I've got...", vi: 'Tôi có...' }, explanation: { en: ["Use 'I've got a...' to talk about possessions.", "Example: I've got a ball."], vi: ['Sử dụng "Tôi có một..." để nói về sự sở hữu.', 'Ví dụ: Tôi có một quả bóng.'] } }],
                            activities: [{ type: 'Practice', description: { en: ['Listen and point to toys.', 'Look and count toys from 7-10.'], vi: ['Nghe và chỉ vào đồ chơi.', 'Nhìn và đếm đồ chơi từ 7-10.'] } }]
                        }]
                    },
                    {
                        id: 705,
                        title: { en: 'Unit 5: My house', vi: 'Bài 5: Nhà của em' },
                        lessons: [{
                            id: 70501,
                            title: { en: 'Furniture & Prepositions', vi: 'Nội thất & Giới từ' },
                            aims: { en: ['Identify furniture in a house.', 'Use prepositions of place.'], vi: ['Nhận biết đồ đạc trong nhà.', 'Sử dụng giới từ chỉ nơi chốn.'] },
                            vocabulary: [
                                { term: 'bath', pronunciation: '/bæθ/', vietnamese: 'bồn tắm', imageUrl: `${SM_BASE}bath.png` },
                                { term: 'cupboard', pronunciation: '/ˈkʌbərd/', vietnamese: 'tủ chén' },
                                { term: 'fridge', pronunciation: '/frɪdʒ/', vietnamese: 'tủ lạnh' },
                                { term: 'lamp', pronunciation: '/læmp/', vietnamese: 'đèn' },
                                { term: 'sofa', pronunciation: '/ˈsoʊfə/', vietnamese: 'ghế sofa', imageUrl: `${SM_BASE}sofa.png` },
                                { term: 'wardrobe', pronunciation: '/ˈwɔrdroʊb/', vietnamese: 'tủ quần áo' },
                                { term: 'bed', pronunciation: '/bɛd/', vietnamese: 'cái giường' },
                                { term: 'table', pronunciation: '/ˈteɪbəl/', vietnamese: 'cái bàn' },
                                { term: 'window', pronunciation: '/ˈwɪndoʊ/', vietnamese: 'cửa sổ' },
                                { term: 'door', pronunciation: '/dɔːr/', vietnamese: 'cửa ra vào' },
                                { term: 'kitchen', pronunciation: '/ˈkɪtʃɪn/', vietnamese: 'nhà bếp' },
                                { term: 'bedroom', pronunciation: '/ˈbɛdruːm/', vietnamese: 'phòng ngủ' },
                                { term: 'living room', pronunciation: '/ˈlɪvɪŋ ruːm/', vietnamese: 'phòng khách' },
                            ],
                            grammar: [{ title: { en: 'Prepositions of place', vi: 'Giới từ chỉ nơi chốn' }, explanation: { en: ["Use 'on', 'in', 'under', 'next to' to describe where things are.", "Example: The lamp is on the table."], vi: ['Sử dụng "on", "in", "under", "next to" để mô tả vị trí đồ vật.', 'Ví dụ: Cái đèn ở trên bàn.'] } }],
                            activities: [{ type: 'Practice', description: { en: ['Describe your bedroom using prepositions.', 'Play a memory game with furniture.'], vi: ['Mô tả phòng ngủ của bạn bằng giới từ.', 'Chơi trò chơi trí nhớ với đồ nội thất.'] } }]
                        }]
                    }
                ]
            },
            sm1Data,
            sm2Data,
            sm3Data,
            sm4Data,
        ]
    },
    {
        category: { en: 'Secondary IVS-Mastery', vi: 'Trung học IVS-Mastery' },
        levels: [
            sw6Data,
            sw7Data,
            sw8Data,
            sw9Data,
        ]
    },
    {
        category: { en: 'Highschool IVS-Mastery', vi: 'Trung học phổ thông IVS-Mastery' },
        levels: [
            g10Data,
            g11Data,
            g12Data,
        ]
    }
];
