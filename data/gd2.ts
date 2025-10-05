import { CurriculumLevel } from '../types';

export const goaldigger2Data: CurriculumLevel = {
    level: 2,
    title: { en: 'Goaldigger 2', vi: 'Goaldigger 2' },
    subtitle: { en: 'Preschool - Ages 4', vi: 'Mầm non - 4 tuổi' },
    ebookPdfUrl: 'https://drive.google.com/file/d/1c3r7gPqQY2YcC3o6T5eB2JXkKfQ9wQzK/view?usp=sharing',
    units: [
        {
            id: 201,
            title: { en: 'Unit 1: At Home', vi: 'Bài 1: Ở nhà' },
            lessons: [
                {
                    id: 20101,
                    title: { en: 'Rooms & Furniture', vi: 'Các phòng & Nội thất' },
                    aims: {
                        en: ['Name rooms of the house and common furniture.', 'Use simple phrases to describe room functions.'],
                        vi: ['Gọi tên các phòng trong nhà và đồ nội thất phổ biến.', 'Sử dụng cụm từ đơn giản để mô tả chức năng của phòng.']
                    },
                    vocabulary: [
                        { term: 'kitchen', pronunciation: '/ˈkɪtʃɪn/', vietnamese: 'nhà bếp' },
                        { term: 'bedroom', pronunciation: '/ˈbɛdruːm/', vietnamese: 'phòng ngủ' },
                        { term: 'bathroom', pronunciation: '/ˈbæθruːm/', vietnamese: 'phòng tắm' },
                        { term: 'sofa', pronunciation: '/ˈsoʊfə/', vietnamese: 'ghế sofa' },
                        { term: 'table', pronunciation: '/ˈteɪbəl/', vietnamese: 'bàn' },
                        { term: 'lamp', pronunciation: '/læmp/', vietnamese: 'đèn' },
                    ],
                    grammar: [{
                        title: { en: 'There is / There are', vi: 'Có ...' },
                        explanation: { en: ['Use "There is" for singular nouns and "There are" for plural nouns.'], vi: ['Dùng "There is" cho danh từ số ít và "There are" cho danh từ số nhiều.'] }
                    }],
                    activities: [{ type: 'Practice', description: { en: ['Label rooms in a house diagram.'], vi: ['Ghi nhãn các phòng trên sơ đồ nhà.'] } }]
                }
            ]
        }
    ]
};

export default goaldigger2Data;
