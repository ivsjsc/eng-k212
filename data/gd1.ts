import { CurriculumLevel } from '../types';

const IMG_BASE = 'https://storage.googleapis.com/maker-suite-project-files-prod/upload/flashcard_images/';
const GD_BASE = `${IMG_BASE}goaldigger_`;

export const goaldigger1Data: CurriculumLevel = {
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
                        { term: 'cat', pronunciation: '/kæt/', vietnamese: 'con mèo', imageUrl: `${GD_BASE}cat.png` },
                        { term: 'dog', pronunciation: '/dɔɡ/', vietnamese: 'con chó', imageUrl: `${GD_BASE}dog.png` },
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
};

export default goaldigger1Data;
