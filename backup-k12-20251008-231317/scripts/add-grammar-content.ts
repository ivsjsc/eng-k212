#!/usr/bin/env tsx

/**
 * Script to add missing grammar content to curriculum lessons
 */

import { CurriculumLevel, GrammarPoint } from '../types';

// Import existing curriculum data
import { g10Data } from '../data/g10';
import { g11Data } from '../data/g11';
import { g12Data } from '../data/g12';
import * as fs from 'fs';
import * as path from 'path';

// Grammar content database by unit themes
const grammarDatabase: { [key: string]: GrammarPoint[] } = {
    // Health and wellness
    'health': [
        {
            title: { en: 'Present Perfect for Life Experiences', vi: 'Thì hiện tại hoàn thành cho trải nghiệm cuộc sống' },
            explanation: {
                en: [
                    'Use: We use present perfect to talk about experiences that happened at an unspecified time in the past.',
                    'Form: Subject + have/has + past participle',
                    'Examples: - I have tried yoga for stress relief. - She has visited many doctors.',
                    'Time expressions: ever, never, since, for, just, already, yet'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại hoàn thành để nói về những trải nghiệm xảy ra tại thời điểm không xác định trong quá khứ.',
                    'Cấu trúc: Chủ ngữ + have/has + past participle',
                    'Ví dụ: - Tôi đã thử yoga để giảm căng thẳng. - Cô ấy đã thăm nhiều bác sĩ.',
                    'Trạng từ thời gian: ever (đã từng), never (chưa từng), since (từ khi), for (trong), just (vừa), already (đã), yet (chưa)'
                ]
            }
        },
        {
            title: { en: 'Modal Verbs for Health Advice', vi: 'Động từ khuyết thiếu cho lời khuyên sức khỏe' },
            explanation: {
                en: [
                    'Use: We use modals (should, must, have to) to give advice and talk about obligations.',
                    'Should: For recommendations - "You should exercise regularly."',
                    'Must/Have to: For strong obligations - "You must see a doctor immediately."',
                    'Examples: - You should eat more vegetables. - You have to quit smoking.'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng động từ khuyết thiếu (should, must, have to) để đưa ra lời khuyên và nói về nghĩa vụ.',
                    'Should: Cho khuyến nghị - "You should exercise regularly."',
                    'Must/Have to: Cho nghĩa vụ mạnh - "You must see a doctor immediately."',
                    'Ví dụ: - Bạn nên ăn nhiều rau hơn. - Bạn phải bỏ hút thuốc.'
                ]
            }
        }
    ],

    // Family and relationships
    'family': [
        {
            title: { en: 'Present Simple for Family Routines', vi: 'Thì hiện tại đơn cho thói quen gia đình' },
            explanation: {
                en: [
                    'Use: We use present simple to talk about regular family activities and habits.',
                    'Form: Subject + V(base form/s/es) + Object',
                    'Examples: - My family eats dinner together every evening. - She helps with household chores.',
                    'Time expressions: every day, usually, often, always, never'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại đơn để nói về các hoạt động và thói quen gia đình đều đặn.',
                    'Cấu trúc: Chủ ngữ + Động từ (nguyên mẫu/thêm s/es) + Tân ngữ',
                    'Ví dụ: - Gia đình tôi ăn tối cùng nhau mỗi tối. - Cô ấy giúp việc nhà.',
                    'Trạng từ thời gian: every day (mỗi ngày), usually (thường), often (thường), always (luôn), never (không bao giờ)'
                ]
            }
        },
        {
            title: { en: 'Past Simple vs Present Perfect for Family Stories', vi: 'Quá khứ đơn vs Hiện tại hoàn thành cho câu chuyện gia đình' },
            explanation: {
                en: [
                    'Past Simple: For completed actions at specific times - "I visited my grandparents last weekend."',
                    'Present Perfect: For experiences with present relevance - "I have visited my grandparents many times."',
                    'Examples: - We moved house in 2010. (Past Simple) - We have lived here for 5 years. (Present Perfect)',
                    'Time expressions: Past Simple (yesterday, last week), Present Perfect (since, for, ever)'
                ],
                vi: [
                    'Quá khứ đơn: Cho hành động hoàn thành tại thời điểm cụ thể - "I visited my grandparents last weekend."',
                    'Hiện tại hoàn thành: Cho trải nghiệm có liên quan đến hiện tại - "I have visited my grandparents many times."',
                    'Ví dụ: - Chúng tôi chuyển nhà năm 2010. (Quá khứ đơn) - Chúng tôi đã sống ở đây 5 năm. (Hiện tại hoàn thành)',
                    'Trạng từ thời gian: Quá khứ đơn (yesterday, last week), Hiện tại hoàn thành (since, for, ever)'
                ]
            }
        }
    ],

    // Environment and sustainability
    'environment': [
        {
            title: { en: 'Present Continuous for Current Changes', vi: 'Thì hiện tại tiếp diễn cho những thay đổi hiện tại' },
            explanation: {
                en: [
                    'Use: We use present continuous to talk about changes happening now.',
                    'Form: Subject + am/is/are + V-ing + Object',
                    'Examples: - The Earth is warming rapidly. - Sea levels are rising every year.',
                    'Time expressions: now, at the moment, currently, these days'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại tiếp diễn để nói về những thay đổi đang xảy ra.',
                    'Cấu trúc: Chủ ngữ + am/is/are + V-ing + Tân ngữ',
                    'Ví dụ: - Trái Đất đang nóng lên nhanh chóng. - Mực nước biển đang dâng cao mỗi năm.',
                    'Trạng từ thời gian: now (bây giờ), at the moment (hiện tại), currently (hiện nay), these days (những ngày này)'
                ]
            }
        },
        {
            title: { en: 'Passive Voice in Environmental Contexts', vi: 'Thể bị động trong ngữ cảnh môi trường' },
            explanation: {
                en: [
                    'Use: We use passive when the action is more important than who performs it.',
                    'Form: Subject + be + past participle + by + agent (optional)',
                    'Examples: - The forest is being destroyed. - Many species have been endangered.',
                    'Common in reports about environmental issues'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thể bị động khi hành động quan trọng hơn người thực hiện.',
                    'Cấu trúc: Chủ ngữ + be + past participle + by + tác nhân (tùy chọn)',
                    'Ví dụ: - Rừng đang bị phá hủy. - Nhiều loài đã bị đe dọa.',
                    'Thường dùng trong báo cáo về vấn đề môi trường'
                ]
            }
        }
    ],

    // Technology and communication
    'technology': [
        {
            title: { en: 'Present Perfect for Technological Developments', vi: 'Thì hiện tại hoàn thành cho sự phát triển công nghệ' },
            explanation: {
                en: [
                    'Use: We use present perfect to talk about inventions and developments that affect the present.',
                    'Form: Subject + have/has + past participle',
                    'Examples: - Scientists have developed new communication tools. - Technology has changed our lives.',
                    'Time expressions: since, for, recently, in recent years'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại hoàn thành để nói về các phát minh và sự phát triển ảnh hưởng đến hiện tại.',
                    'Cấu trúc: Chủ ngữ + have/has + past participle',
                    'Ví dụ: - Các nhà khoa học đã phát triển công cụ giao tiếp mới. - Công nghệ đã thay đổi cuộc sống chúng ta.',
                    'Trạng từ thời gian: since (từ khi), for (trong), recently (gần đây), in recent years (trong những năm gần đây)'
                ]
            }
        },
        {
            title: { en: 'Gerunds and Infinitives in Technology Contexts', vi: 'Gerund và Infinitive trong ngữ cảnh công nghệ' },
            explanation: {
                en: [
                    'Gerunds after prepositions: interested in learning, good at using, afraid of losing',
                    'Infinitives after adjectives: important to know, easy to use, difficult to understand',
                    'Examples: - People are interested in learning new technology. - It\'s important to protect personal data.',
                    'Common patterns in discussions about technology adoption'
                ],
                vi: [
                    'Gerund sau giới từ: interested in learning (thích học), good at using (giỏi sử dụng), afraid of losing (sợ mất)',
                    'Infinitive sau tính từ: important to know (quan trọng để biết), easy to use (dễ sử dụng), difficult to understand (khó hiểu)',
                    'Ví dụ: - Mọi người quan tâm đến việc học công nghệ mới. - Việc bảo vệ dữ liệu cá nhân rất quan trọng.',
                    'Các cấu trúc phổ biến trong thảo luận về việc áp dụng công nghệ'
                ]
            }
        }
    ],

    // Education and learning
    'education': [
        {
            title: { en: 'Future Forms for Educational Planning', vi: 'Các dạng thì tương lai cho kế hoạch giáo dục' },
            explanation: {
                en: [
                    'Will + infinitive: For spontaneous decisions - "I will study abroad next year."',
                    'Be going to: For planned intentions - "I\'m going to take the TOEFL test."',
                    'Present continuous: For fixed arrangements - "I\'m starting university in September."',
                    'Examples: - She will graduate next month. - They are going to learn a new language.'
                ],
                vi: [
                    'Will + infinitive: Cho quyết định tức thời - "I will study abroad next year."',
                    'Be going to: Cho ý định đã lên kế hoạch - "I\'m going to take the TOEFL test."',
                    'Hiện tại tiếp diễn: Cho sắp xếp cố định - "I\'m starting university in September."',
                    'Ví dụ: - Cô ấy sẽ tốt nghiệp tháng tới. - Họ sẽ học ngoại ngữ mới.'
                ]
            }
        },
        {
            title: { en: 'Conditionals for Educational Scenarios', vi: 'Câu điều kiện cho tình huống giáo dục' },
            explanation: {
                en: [
                    'First conditional: Real possibilities - "If I study hard, I will pass the exam."',
                    'Second conditional: Hypothetical situations - "If I had more time, I would learn another language."',
                    'Third conditional: Past regrets - "If I had studied harder, I would have got a better grade."',
                    'Examples: - If you practice regularly, you will improve. - If I were you, I would choose science.'
                ],
                vi: [
                    'Câu điều kiện loại 1: Khả năng thực tế - "If I study hard, I will pass the exam."',
                    'Câu điều kiện loại 2: Tình huống giả định - "If I had more time, I would learn another language."',
                    'Câu điều kiện loại 3: Hối hận quá khứ - "If I had studied harder, I would have got a better grade."',
                    'Ví dụ: - Nếu bạn luyện tập đều đặn, bạn sẽ tiến bộ. - Nếu tôi là bạn, tôi sẽ chọn khoa học.'
                ]
            }
        }
    ],

    // Social issues and community
    'social': [
        {
            title: { en: 'Reported Speech for Social Discussions', vi: 'Câu tường thuật cho thảo luận xã hội' },
            explanation: {
                en: [
                    'Use: We use reported speech to share what others have said in discussions.',
                    'Changes: Pronouns, tense, time expressions',
                    'Examples: Direct: "We must help others." → Reported: "He said we must help others."',
                    'Common in community meetings and social issue discussions'
                ],
                vi: [
                    'Cách dùng: Chúng ta dùng câu tường thuật để chia sẻ những gì người khác đã nói trong thảo luận.',
                    'Thay đổi: Đại từ, thì, trạng từ thời gian',
                    'Ví dụ: Trực tiếp: "We must help others." → Tường thuật: "He said we must help others."',
                    'Thường dùng trong các cuộc họp cộng đồng và thảo luận vấn đề xã hội'
                ]
            }
        },
        {
            title: { en: 'Modals of Obligation and Prohibition', vi: 'Động từ khuyết thiếu chỉ nghĩa vụ và cấm đoán' },
            explanation: {
                en: [
                    'Must/Have to: Strong obligation - "You must follow the rules."',
                    'Should/Ought to: Recommendation - "You should volunteer in your community."',
                    'Must not/Cannot: Prohibition - "You must not discriminate against others."',
                    'Examples: - Citizens have to pay taxes. - People should help those in need.'
                ],
                vi: [
                    'Must/Have to: Nghĩa vụ mạnh - "You must follow the rules."',
                    'Should/Ought to: Khuyến nghị - "You should volunteer in your community."',
                    'Must not/Cannot: Cấm đoán - "You must not discriminate against others."',
                    'Ví dụ: - Công dân phải nộp thuế. - Mọi người nên giúp đỡ những người cần giúp đỡ.'
                ]
            }
        }
    ],

    // Default grammar for any unit
    'default': [
        {
            title: { en: 'Present Perfect vs Past Simple', vi: 'Hiện tại hoàn thành vs Quá khứ đơn' },
            explanation: {
                en: [
                    'Past Simple: For completed actions at specific times - "I visited Paris last year."',
                    'Present Perfect: For experiences with present relevance - "I have visited Paris."',
                    'Examples: - She finished her homework yesterday. (Past Simple) - She has finished her homework. (Present Perfect)',
                    'Time expressions: Past Simple (yesterday, last week), Present Perfect (ever, never, since, for)'
                ],
                vi: [
                    'Quá khứ đơn: Cho hành động hoàn thành tại thời điểm cụ thể - "I visited Paris last year."',
                    'Hiện tại hoàn thành: Cho trải nghiệm có liên quan đến hiện tại - "I have visited Paris."',
                    'Ví dụ: - Cô ấy hoàn thành bài tập về nhà hôm qua. (Quá khứ đơn) - Cô ấy đã hoàn thành bài tập về nhà. (Hiện tại hoàn thành)',
                    'Trạng từ thời gian: Quá khứ đơn (yesterday, last week), Hiện tại hoàn thành (ever, never, since, for)'
                ]
            }
        },
        {
            title: { en: 'Modal Verbs for Advice and Suggestions', vi: 'Động từ khuyết thiếu cho lời khuyên và gợi ý' },
            explanation: {
                en: [
                    'Should: For general advice - "You should read more books."',
                    'Could: For possibilities - "You could join a club."',
                    'Might: For tentative suggestions - "You might try a new hobby."',
                    'Examples: - You should exercise regularly. - You could volunteer at a local charity.'
                ],
                vi: [
                    'Should: Cho lời khuyên chung - "You should read more books."',
                    'Could: Cho khả năng - "You could join a club."',
                    'Might: Cho gợi ý do dự - "You might try a new hobby."',
                    'Ví dụ: - Bạn nên tập thể dục đều đặn. - Bạn có thể tình nguyện tại tổ chức từ thiện địa phương.'
                ]
            }
        }
    ]
};

// Function to determine unit theme from title
function getUnitTheme(unitTitle: string): string {
    const title = unitTitle.toLowerCase();

    if (title.includes('health') || title.includes('long and healthy') || title.includes('wellness')) {
        return 'health';
    } else if (title.includes('family') || title.includes('relationships') || title.includes('generation')) {
        return 'family';
    } else if (title.includes('environment') || title.includes('climate') || title.includes('sustainable') || title.includes('green')) {
        return 'environment';
    } else if (title.includes('technology') || title.includes('communication') || title.includes('digital') || title.includes('smart')) {
        return 'technology';
    } else if (title.includes('education') || title.includes('learning') || title.includes('school') || title.includes('study')) {
        return 'education';
    } else if (title.includes('social') || title.includes('community') || title.includes('society') || title.includes('issues')) {
        return 'social';
    } else {
        return 'default';
    }
}

// Function to add grammar to lessons that don't have it
function addGrammarToLessons(gradeData: CurriculumLevel): void {
    gradeData.units.forEach(unit => {
        const theme = getUnitTheme(unit.title.en);
        const availableGrammar = grammarDatabase[theme] || grammarDatabase['default'];

        unit.lessons.forEach((lesson, index) => {
            // Only add grammar if the lesson has empty grammar array
            if (lesson.grammar.length === 0) {
                // Add 1-2 grammar points based on lesson type
                if (lesson.title.en.includes('Language Focus') || lesson.title.en.includes('Grammar')) {
                    // Language focus lessons get 2 grammar points
                    lesson.grammar = availableGrammar.slice(0, 2);
                } else if (lesson.title.en.includes('Writing') || lesson.title.en.includes('Speaking')) {
                    // Writing/Speaking lessons get 1 grammar point
                    lesson.grammar = availableGrammar.slice(0, 1);
                } else if (lesson.title.en.includes('Culture') || lesson.title.en.includes('Project')) {
                    // Culture/Project lessons get 1 grammar point
                    lesson.grammar = availableGrammar.slice(1, 2);
                }
                // Other lessons keep empty grammar (Getting Started, Reading, Listening)
            }
        });
    });
}

// Main execution
function main() {
    console.log('🚀 Adding missing grammar content to curriculum lessons...');

    // Process each grade
    addGrammarToLessons(g10Data);
    addGrammarToLessons(g11Data);
    addGrammarToLessons(g12Data);

    // Save updated data
    const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
    const dataDir = path.join(currentDir, '../data');

    // Save g10 data
    const g10Content = `import { CurriculumLevel } from '../types';

export const g10Data: CurriculumLevel = ${JSON.stringify(g10Data, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g10.ts'), g10Content);
    console.log('✅ Saved g10.ts with grammar content');

    // Save g11 data
    const g11Content = `import { CurriculumLevel } from '../types';

export const g11Data: CurriculumLevel = ${JSON.stringify(g11Data, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g11.ts'), g11Content);
    console.log('✅ Saved g11.ts with grammar content');

    // Save g12 data
    const g12Content = `import { CurriculumLevel } from '../types';

export const g12Data: CurriculumLevel = ${JSON.stringify(g12Data, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g12.ts'), g12Content);
    console.log('✅ Saved g12.ts with grammar content');

    console.log('🎉 Grammar content added successfully!');
}

// Run the script
main();