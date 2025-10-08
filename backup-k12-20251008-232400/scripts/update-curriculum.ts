#!/usr/bin/env tsx

/**
 * Script to update curriculum files with enhanced data
 */

import { generateDetailedLessonsForUnit } from './curriculum-enhancer';
import { CurriculumLevel } from '../types';

// Import existing curriculum data
import { g10Data } from '../data/g10';
import { g11Data } from '../data/g11';
import { g12Data } from '../data/g12';
import * as fs from 'fs';
import * as path from 'path';

// Enhanced curriculum data storage
const enhancedData = {
    g10: { ...g10Data },
    g11: { ...g11Data },
    g12: { ...g12Data }
};

// Function to enhance a specific unit
function enhanceUnit(grade: 'g10' | 'g11' | 'g12', unitIndex: number) {
    const gradeData = enhancedData[grade];
    const unit = gradeData.units[unitIndex];

    if (!unit) {
        console.log(`Unit ${unitIndex + 1} not found in ${grade}`);
        return;
    }

    // Check if unit already has detailed lessons (more than 1 lesson)
    if (unit.lessons.length > 1) {
        return;
    }

    // Extract basic content from existing lesson
    const basicLesson = unit.lessons[0];
    const basicContent = {
        vocabulary: basicLesson.vocabulary || [],
        grammar: basicLesson.grammar || [],
        activities: basicLesson.activities || []
    };

    try {
        // Generate detailed lessons
        const detailedLessons = generateDetailedLessonsForUnit(
            unit.id,
            unit.title,
            basicContent
        );

        // Replace the basic lesson with detailed lessons
        gradeData.units[unitIndex].lessons = detailedLessons;

    } catch (error) {
        console.error(`Error enhancing Unit ${unit.id}:`, error);
    }
}

// Enhance all units that need it
function enhanceAllUnits() {
    // G10 Units 3-10 (some may already be enhanced)
    for (let i = 2; i < enhancedData.g10.units.length; i++) {
        enhanceUnit('g10', i);
    }

    // G11 all units
    for (let i = 0; i < enhancedData.g11.units.length; i++) {
        enhanceUnit('g11', i);
    }

    // G12 Units 2-10
    for (let i = 1; i < enhancedData.g12.units.length; i++) {
        enhanceUnit('g12', i);
    }
}

// Save enhanced data
function saveEnhancedData() {
    // Use import.meta.url to get current directory
    const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
    const dataDir = path.join(currentDir, '../data');

    // Save g10 data
    const g10Content = `import { CurriculumLevel } from '../types';

export const g10Data: CurriculumLevel = ${JSON.stringify(enhancedData.g10, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g10.ts'), g10Content);
    console.log('✅ Saved g10.ts');

    // Save g11 data
    const g11Content = `import { CurriculumLevel } from '../types';

export const g11Data: CurriculumLevel = ${JSON.stringify(enhancedData.g11, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g11.ts'), g11Content);
    console.log('✅ Saved g11.ts');

    // Save g12 data
    const g12Content = `import { CurriculumLevel } from '../types';

export const g12Data: CurriculumLevel = ${JSON.stringify(enhancedData.g12, null, 4)};`;
    fs.writeFileSync(path.join(dataDir, 'g12.ts'), g12Content);
    console.log('✅ Saved g12.ts');
}

// Main execution
function main() {
    console.log('🚀 Updating curriculum files with enhanced data...');

    enhanceAllUnits();
    saveEnhancedData();

    console.log('🎉 Curriculum files updated successfully!');
}

// Run the update
main();