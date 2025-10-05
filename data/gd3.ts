import { CurriculumLevel } from '../types';

export const goaldigger3Data: CurriculumLevel = {
    level: 3,
    title: { en: 'Goaldigger 3', vi: 'Goaldigger 3' },
    subtitle: { en: 'Preschool - Ages 5', vi: 'Mầm non - 5 tuổi' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1O-0ZgQzV5Yb2X2V3Yf8bW5LkKj3e9U3P/view?usp=sharing',
    units: [
        {
            id: 301,
            title: { en: 'Unit 1: My Day', vi: 'Bài 1: Ngày của mình' },
            lessons: [
                {
                    id: 30101,
                    title: { en: 'Daily Routines', vi: 'Thói quen hàng ngày' },
                    aims: {
                        en: ['Talk about daily routines using simple sentences.', 'Understand time-related verbs like wake up, eat, play, sleep.'],
                        vi: ['Nói về thói quen hàng ngày bằng câu đơn giản.', 'Hiểu các động từ liên quan tới thời gian như thức dậy, ăn, chơi, ngủ.']
                    },
                    vocabulary: [
                        { term: 'wake up', pronunciation: '/weɪk ʌp/', vietnamese: 'thức dậy' },
                        { term: 'brush teeth', pronunciation: '/brʌʃ tiːθ/', vietnamese: 'đánh răng' },
                        { term: 'have breakfast', pronunciation: '/hæv ˈbrɛkfəst/', vietnamese: 'ăn sáng' },
                        { term: 'go to school', pronunciation: '/ɡoʊ tuː skuːl/', vietnamese: 'đi học' },
                        { term: 'play', pronunciation: '/pleɪ/', vietnamese: 'chơi' },
                        { term: 'go to bed', pronunciation: '/ɡoʊ tuː bɛd/', vietnamese: 'đi ngủ' }
                    ],
                    grammar: [{
                        title: { en: 'Present Simple for Routine', vi: 'Thì Hiện tại đơn cho thói quen' },
                        explanation: { en: ['Use the Present Simple to talk about routines: I wake up at 7am.'], vi: ['Dùng Hiện tại đơn để nói về thói quen: Tôi thức dậy lúc 7 giờ.'] }
                    }],
                    activities: [{ type: 'Practice', description: { en: ['Sequence pictures to tell a daily routine.'], vi: ['Sắp xếp hình ảnh để kể một ngày.'] } }]
                }
            ]
        }
    ]
};

export default goaldigger3Data;
