#!/usr/bin/env tsx

/**
 * THCS Curriculum Audit Script
 * Kiểm tra hiện trạng chương trình THCS (Grades 6-9)
 */

import { CurriculumLevel } from '../types';
import { sw6Data } from '../data/sw6';
import { sw7Data } from '../data/sw7';
import { sw8Data } from '../data/sw8';
import { sw9Data } from '../data/sw9';
import * as fs from 'fs';
import * as path from 'path';

interface AuditResult {
    grade: number;
    totalUnits: number;
    totalLessons: number;
    totalVocabulary: number;
    totalGrammarPoints: number;
    totalActivities: number;
    averageVocabPerLesson: number;
    averageGrammarPerLesson: number;
    averageActivitiesPerLesson: number;
    lessonsWithoutGrammar: number;
    lessonsWithoutVocabulary: number;
    lessonsWithoutActivities: number;
    unitDetails: UnitSummary[];
}

interface UnitSummary {
    unitId: number;
    unitTitle: string;
    lessonCount: number;
    vocabCount: number;
    grammarCount: number;
    activityCount: number;
}

function auditCurriculum(gradeData: CurriculumLevel): AuditResult {
    let totalLessons = 0;
    let totalVocabulary = 0;
    let totalGrammarPoints = 0;
    let totalActivities = 0;
    let lessonsWithoutGrammar = 0;
    let lessonsWithoutVocabulary = 0;
    let lessonsWithoutActivities = 0;

    const unitDetails: UnitSummary[] = [];

    gradeData.units.forEach(unit => {
        let unitVocab = 0;
        let unitGrammar = 0;
        let unitActivity = 0;

        unit.lessons.forEach(lesson => {
            totalLessons++;
            
            // Count vocabulary
            const vocabCount = lesson.vocabulary?.length || 0;
            totalVocabulary += vocabCount;
            unitVocab += vocabCount;
            if (vocabCount === 0) lessonsWithoutVocabulary++;

            // Count grammar
            const grammarCount = lesson.grammar?.length || 0;
            totalGrammarPoints += grammarCount;
            unitGrammar += grammarCount;
            if (grammarCount === 0) lessonsWithoutGrammar++;

            // Count activities
            const activityCount = lesson.activities?.length || 0;
            totalActivities += activityCount;
            unitActivity += activityCount;
            if (activityCount === 0) lessonsWithoutActivities++;
        });

        unitDetails.push({
            unitId: unit.id,
            unitTitle: unit.title.en,
            lessonCount: unit.lessons.length,
            vocabCount: unitVocab,
            grammarCount: unitGrammar,
            activityCount: unitActivity
        });
    });

    return {
        grade: gradeData.level,
        totalUnits: gradeData.units.length,
        totalLessons,
        totalVocabulary,
        totalGrammarPoints,
        totalActivities,
        averageVocabPerLesson: totalLessons > 0 ? totalVocabulary / totalLessons : 0,
        averageGrammarPerLesson: totalLessons > 0 ? totalGrammarPoints / totalLessons : 0,
        averageActivitiesPerLesson: totalLessons > 0 ? totalActivities / totalLessons : 0,
        lessonsWithoutGrammar,
        lessonsWithoutVocabulary,
        lessonsWithoutActivities,
        unitDetails
    };
}

function generateReport(results: AuditResult[]): string {
    let report = '# 📊 THCS CURRICULUM AUDIT REPORT\n\n';
    report += `**Generated**: ${new Date().toLocaleString()}\n\n`;
    report += '---\n\n';

    // Executive Summary
    report += '## 📋 EXECUTIVE SUMMARY\n\n';
    const totalUnits = results.reduce((sum, r) => sum + r.totalUnits, 0);
    const totalLessons = results.reduce((sum, r) => sum + r.totalLessons, 0);
    const totalVocab = results.reduce((sum, r) => sum + r.totalVocabulary, 0);
    const totalGrammar = results.reduce((sum, r) => sum + r.totalGrammarPoints, 0);
    const totalActivities = results.reduce((sum, r) => sum + r.totalActivities, 0);

    report += `- **Total Grades**: ${results.length}\n`;
    report += `- **Total Units**: ${totalUnits}\n`;
    report += `- **Total Lessons**: ${totalLessons}\n`;
    report += `- **Total Vocabulary Items**: ${totalVocab}\n`;
    report += `- **Total Grammar Points**: ${totalGrammar}\n`;
    report += `- **Total Activities**: ${totalActivities}\n\n`;

    // Overall Averages
    report += '### 📈 Overall Averages\n\n';
    report += `- **Vocabulary per Lesson**: ${(totalVocab / totalLessons).toFixed(2)}\n`;
    report += `- **Grammar Points per Lesson**: ${(totalGrammar / totalLessons).toFixed(2)}\n`;
    report += `- **Activities per Lesson**: ${(totalActivities / totalLessons).toFixed(2)}\n\n`;

    report += '---\n\n';

    // Grade-by-Grade Analysis
    results.forEach(result => {
        report += `## 📚 GRADE ${result.grade} ANALYSIS\n\n`;
        
        report += '### Summary Statistics\n\n';
        report += `| Metric | Value |\n`;
        report += `|--------|-------|\n`;
        report += `| Total Units | ${result.totalUnits} |\n`;
        report += `| Total Lessons | ${result.totalLessons} |\n`;
        report += `| Total Vocabulary | ${result.totalVocabulary} |\n`;
        report += `| Total Grammar Points | ${result.totalGrammarPoints} |\n`;
        report += `| Total Activities | ${result.totalActivities} |\n`;
        report += `| Avg Vocab/Lesson | ${result.averageVocabPerLesson.toFixed(2)} |\n`;
        report += `| Avg Grammar/Lesson | ${result.averageGrammarPerLesson.toFixed(2)} |\n`;
        report += `| Avg Activities/Lesson | ${result.averageActivitiesPerLesson.toFixed(2)} |\n\n`;

        // Issues
        report += '### ⚠️ Issues Found\n\n';
        if (result.lessonsWithoutVocabulary > 0) {
            report += `- ❌ **${result.lessonsWithoutVocabulary} lessons** without vocabulary\n`;
        }
        if (result.lessonsWithoutGrammar > 0) {
            report += `- ⚠️ **${result.lessonsWithoutGrammar} lessons** without grammar (may be intentional)\n`;
        }
        if (result.lessonsWithoutActivities > 0) {
            report += `- ❌ **${result.lessonsWithoutActivities} lessons** without activities\n`;
        }
        if (result.lessonsWithoutVocabulary === 0 && result.lessonsWithoutActivities === 0) {
            report += `- ✅ No critical issues found\n`;
        }
        report += '\n';

        // Unit Details
        report += '### 📖 Unit Details\n\n';
        report += `| Unit ID | Title | Lessons | Vocab | Grammar | Activities |\n`;
        report += `|---------|-------|---------|-------|---------|------------|\n`;
        result.unitDetails.forEach(unit => {
            report += `| ${unit.unitId} | ${unit.unitTitle} | ${unit.lessonCount} | ${unit.vocabCount} | ${unit.grammarCount} | ${unit.activityCount} |\n`;
        });
        report += '\n';

        report += '---\n\n';
    });

    // Comparison Table
    report += '## 📊 CROSS-GRADE COMPARISON\n\n';
    report += `| Grade | Units | Lessons | Vocab | Grammar | Activities | V/L | G/L | A/L |\n`;
    report += `|-------|-------|---------|-------|---------|------------|-----|-----|-----|\n`;
    results.forEach(r => {
        report += `| ${r.grade} | ${r.totalUnits} | ${r.totalLessons} | ${r.totalVocabulary} | ${r.totalGrammarPoints} | ${r.totalActivities} | ${r.averageVocabPerLesson.toFixed(1)} | ${r.averageGrammarPerLesson.toFixed(1)} | ${r.averageActivitiesPerLesson.toFixed(1)} |\n`;
    });
    report += '\n';
    report += '*V/L = Vocab per Lesson, G/L = Grammar per Lesson, A/L = Activities per Lesson*\n\n';

    // Recommendations
    report += '---\n\n';
    report += '## 💡 RECOMMENDATIONS\n\n';

    // Compare with THPT standard
    const avgVocab = totalVocab / totalLessons;
    const avgGrammar = totalGrammar / totalLessons;
    const avgActivities = totalActivities / totalLessons;

    report += '### Based on THPT Standard (Target):\n\n';
    report += '- **Vocabulary**: 8-16 items per lesson\n';
    report += '- **Grammar**: 1-2 points per applicable lesson\n';
    report += '- **Activities**: 3-4 activities per lesson\n\n';

    report += '### Current THCS Status:\n\n';
    report += `- **Vocabulary**: ${avgVocab.toFixed(2)} items/lesson ${avgVocab < 8 ? '❌ Below target' : avgVocab > 16 ? '⚠️ Above target' : '✅ Within range'}\n`;
    report += `- **Grammar**: ${avgGrammar.toFixed(2)} points/lesson ${avgGrammar < 0.5 ? '❌ Below target' : avgGrammar > 2 ? '⚠️ Above target' : '✅ Within range'}\n`;
    report += `- **Activities**: ${avgActivities.toFixed(2)} activities/lesson ${avgActivities < 3 ? '❌ Below target' : avgActivities > 4 ? '⚠️ Above target' : '✅ Within range'}\n\n`;

    report += '### Action Items:\n\n';
    
    if (avgVocab < 8) {
        report += '1. 🔴 **HIGH PRIORITY**: Expand vocabulary to 8-12 items per lesson\n';
    } else if (avgVocab > 16) {
        report += '1. ⚠️ Consider reducing vocabulary to avoid overwhelming students\n';
    } else {
        report += '1. ✅ Vocabulary count is good, maintain current level\n';
    }

    if (avgActivities < 3) {
        report += '2. 🔴 **HIGH PRIORITY**: Add more structured activities (target 3-4 per lesson)\n';
    } else {
        report += '2. ✅ Activity count is good, focus on quality and variety\n';
    }

    const totalLessonsWithoutGrammar = results.reduce((sum, r) => sum + r.lessonsWithoutGrammar, 0);
    const percentWithoutGrammar = (totalLessonsWithoutGrammar / totalLessons) * 100;
    
    if (percentWithoutGrammar > 50) {
        report += '3. 🔴 **HIGH PRIORITY**: Many lessons lack grammar content - review and add where appropriate\n';
    } else if (percentWithoutGrammar > 30) {
        report += '3. ⚠️ Some lessons lack grammar - ensure this is intentional (e.g., Reading/Culture lessons)\n';
    } else {
        report += '3. ✅ Grammar distribution is reasonable\n';
    }

    report += '\n### Enhancement Priority:\n\n';
    results.forEach(r => {
        const vocabScore = r.averageVocabPerLesson < 8 ? 2 : r.averageVocabPerLesson > 16 ? 1 : 0;
        const activityScore = r.averageActivitiesPerLesson < 3 ? 2 : 0;
        const grammarScore = r.lessonsWithoutGrammar > (r.totalLessons * 0.5) ? 2 : 0;
        const totalScore = vocabScore + activityScore + grammarScore;
        
        let priority = '';
        if (totalScore >= 4) priority = '🔴 HIGH';
        else if (totalScore >= 2) priority = '🟡 MEDIUM';
        else priority = '🟢 LOW';
        
        report += `- **Grade ${r.grade}**: ${priority} priority (Score: ${totalScore}/6)\n`;
    });

    report += '\n---\n\n';
    report += '## 🎯 NEXT STEPS\n\n';
    report += '1. Review this audit report\n';
    report += '2. Create enhancement plan based on priorities\n';
    report += '3. Develop enhancement scripts\n';
    report += '4. Start with highest priority grade\n';
    report += '5. Validate and test enhanced content\n\n';

    report += '---\n\n';
    report += '*End of Report*\n';

    return report;
}

// Main execution
async function main() {
    console.log('🔍 Starting THCS Curriculum Audit...\n');

    const grades = [
        { data: sw6Data, name: 'Grade 6' },
        { data: sw7Data, name: 'Grade 7' },
        { data: sw8Data, name: 'Grade 8' },
        { data: sw9Data, name: 'Grade 9' }
    ];

    const results: AuditResult[] = [];

    for (const grade of grades) {
        console.log(`📊 Auditing ${grade.name}...`);
        const result = auditCurriculum(grade.data);
        results.push(result);
        console.log(`   ✅ ${result.totalUnits} units, ${result.totalLessons} lessons analyzed`);
    }

    console.log('\n📝 Generating report...');
    const report = generateReport(results);

    // Save report
    const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
    const reportPath = path.join(currentDir, '../THCS_AUDIT_REPORT.md');
    
    fs.writeFileSync(reportPath, report);
    console.log(`\n✅ Report saved to: THCS_AUDIT_REPORT.md`);

    // Print summary to console
    console.log('\n' + '='.repeat(70));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(70));
    results.forEach(r => {
        console.log(`\nGrade ${r.grade}:`);
        console.log(`  Units: ${r.totalUnits}, Lessons: ${r.totalLessons}`);
        console.log(`  Vocab: ${r.totalVocabulary} (avg ${r.averageVocabPerLesson.toFixed(1)}/lesson)`);
        console.log(`  Grammar: ${r.totalGrammarPoints} (avg ${r.averageGrammarPerLesson.toFixed(1)}/lesson)`);
        console.log(`  Activities: ${r.totalActivities} (avg ${r.averageActivitiesPerLesson.toFixed(1)}/lesson)`);
    });
    console.log('\n' + '='.repeat(70));
    console.log('✅ Audit complete! Check THCS_AUDIT_REPORT.md for details.\n');
}

// Run the audit
main();