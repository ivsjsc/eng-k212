const fs = require('fs');
const path = require('path');

// Load the data files
const g10Data = require('../data/g10.ts');
const g11Data = require('../data/g11.ts');
const g12Data = require('../data/g12.ts');

function convertToMarkdown(data) {
    let markdown = `# ${data.title.en} - ${data.subtitle.en}\n`;
    markdown += `## ${data.title.vi} - ${data.subtitle.vi}\n\n`;
    markdown += `**Cấp độ**: ${data.level}\n`;
    markdown += `**Số units**: ${data.units.length}\n`;
    markdown += `**Tổng lessons**: ${data.units.reduce((sum, unit) => sum + unit.lessons.length, 0)}\n\n`;

    if (data.ebookPdfUrl) {
        markdown += `**Ebook**: [Download](${data.ebookPdfUrl})\n\n`;
    }

    markdown += `---\n\n`;

    data.units.forEach((unit, unitIndex) => {
        markdown += `## Unit ${unitIndex + 1}: ${unit.title.en}\n`;
        markdown += `### ${unit.title.vi}\n\n`;

        unit.lessons.forEach((lesson, lessonIndex) => {
            const lessonTitle = lesson.day ? `Lesson ${lesson.day}` : `Lesson ${lessonIndex + 1}`;
            markdown += `### ${lessonTitle}: ${lesson.title.en}\n`;
            markdown += `#### ${lesson.title.vi}\n\n`;

            // Aims
            markdown += `**🎯 Mục tiêu học tập:**\n`;
            lesson.aims.en.forEach((aim, i) => {
                markdown += `- ${aim}\n`;
                if (lesson.aims.vi[i]) {
                    markdown += `  *${lesson.aims.vi[i]}*\n`;
                }
            });
            markdown += `\n`;

            // Vocabulary
            if (lesson.vocabulary && lesson.vocabulary.length > 0) {
                markdown += `**📚 Từ vựng:**\n\n`;
                markdown += `| Term | IPA | Vietnamese |\n`;
                markdown += `|------|-----|-----------|\n`;
                lesson.vocabulary.forEach(vocab => {
                    markdown += `| ${vocab.term} | ${vocab.pronunciation} | ${vocab.vietnamese} |\n`;
                });
                markdown += `\n`;
            }

            // Grammar
            if (lesson.grammar && lesson.grammar.length > 0) {
                markdown += `**📖 Ngữ pháp:**\n\n`;
                lesson.grammar.forEach(grammar => {
                    markdown += `**${grammar.title.en}**\n`;
                    markdown += `*${grammar.title.vi}*\n\n`;

                    if (grammar.explanation && grammar.explanation.en && grammar.explanation.en.length > 0) {
                        grammar.explanation.en.forEach((exp, i) => {
                            markdown += `${exp}\n`;
                            if (grammar.explanation.vi && grammar.explanation.vi[i]) {
                                markdown += `*${grammar.explanation.vi[i]}*\n`;
                            }
                        });
                        markdown += `\n`;
                    }
                });
            }

            // Activities
            if (lesson.activities && lesson.activities.length > 0) {
                markdown += `**🎮 Hoạt động:**\n\n`;
                lesson.activities.forEach((activity, i) => {
                    markdown += `**${i + 1}. ${activity.type}**\n`;
                    if (activity.description && activity.description.en) {
                        activity.description.en.forEach((desc, j) => {
                            markdown += `- ${desc}\n`;
                            if (activity.description.vi && activity.description.vi[j]) {
                                markdown += `  *${activity.description.vi[j]}*\n`;
                            }
                        });
                    }
                    markdown += `\n`;
                });
            }

            markdown += `---\n\n`;
        });
    });

    return markdown;
}

function saveMarkdownFile(data, filename) {
    const markdown = convertToMarkdown(data);
    const outputDir = path.join(__dirname, '..', 'THPT . Nội dung');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, markdown, 'utf8');
    console.log(`✅ Đã tạo file: ${filename}`);
}

// Convert và lưu các file
saveMarkdownFile(g10Data, 'grade10.md');
saveMarkdownFile(g11Data, 'grade11.md');
saveMarkdownFile(g12Data, 'grade12.md');

console.log('🎉 Hoàn thành convert THPT curriculum sang Markdown!');