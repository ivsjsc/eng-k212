import { CurriculumLevel } from '../types';

export const goaldigger4Data: CurriculumLevel = {
    level: 4,
    title: { en: 'Goaldigger 4', vi: 'Goaldigger 4' },
    subtitle: { en: 'Preschool - Ages 5 (Advanced)', vi: 'Mầm non - 5 tuổi (Nâng cao)' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1xyz-Gd4R9m3n5k6s7l8w9/view?usp=sharing',
    units: [
        {
            id: 401,
            title: { en: 'Unit 1: People Around Us', vi: 'Bài 1: Những người quanh ta' },
            lessons: [
                {
                    id: 40101,
                    title: { en: 'Family & Friends', vi: 'Gia đình & Bạn bè' },
                    aims: {
                        en: ['Identify family members and people in the community.', 'Use simple possessives: my, your.'],
                        vi: ['Nhận biết các thành viên trong gia đình và người trong cộng đồng.', 'Sử dụng sở hữu đơn giản: my, your.']
                    },
                    vocabulary: [
                        { term: 'mother', pronunciation: '/ˈmʌðər/', vietnamese: 'mẹ' },
                        { term: 'father', pronunciation: '/ˈfɑːðər/', vietnamese: 'bố' },
                        { term: 'sister', pronunciation: '/ˈsɪstər/', vietnamese: 'chị/em gái' },
                        { term: 'brother', pronunciation: '/ˈbrʌðər/', vietnamese: 'anh/em trai' },
                        { term: 'doctor', pronunciation: '/ˈdɑːktər/', vietnamese: 'bác sĩ' },
                        { term: 'teacher', pronunciation: '/ˈtiːtʃər/', vietnamese: 'giáo viên' }
                    ],
                    grammar: [{
                        title: { en: 'Possessive Adjectives', vi: 'Tính từ sở hữu' },
                        explanation: { en: ['Use my/your/his/her to show possession: This is my book.'], vi: ['Dùng my/your/his/her để thể hiện sở hữu: Đây là sách của tôi.'] }
                    }],
                    activities: [{ type: 'Practice', description: { en: ['Draw your family and label members.'], vi: ['Vẽ gia đình và ghi nhãn các thành viên.'] } }]
                }
            ]
        }
    ]
};

export default goaldigger4Data;
