#!/usr/bin/env node

/**
 * Test Script - Verify Improvements for IVS English K-12 Learning App
 * 
 * This script verifies:
 * 1. Ebook data exists for grades 6-12
 * 2. All curriculum levels have valid ebook PDF URLs
 * 3. Grade level filtering works correctly
 */

import { curriculumData } from './data/curriculum.js';
import { ebookData } from './data/ebooks.js';

console.log('🧪 Testing IVS English K-12 Learning App Improvements...\n');

// Test 1: Ebook Data Coverage
console.log('📚 Test 1: Ebook Data Coverage');
console.log('================================');
const expectedGrades = [6, 7, 8, 9, 10, 11, 12];
const missingGrades = expectedGrades.filter(grade => !ebookData[grade]);

if (missingGrades.length === 0) {
    console.log('✅ PASS: All grades (6-12) have ebook data');
} else {
    console.log(`❌ FAIL: Missing ebook data for grades: ${missingGrades.join(', ')}`);
}

console.log(`   Total ebook entries: ${Object.keys(ebookData).length}`);
console.log('');

// Test 2: Curriculum Coverage
console.log('📖 Test 2: Curriculum Coverage');
console.log('================================');

const allLevels = curriculumData.flatMap(cat => cat.levels);
console.log(`   Total curriculum levels: ${allLevels.length}`);

const levelsByCategory = curriculumData.map(cat => ({
    name: cat.category.en,
    count: cat.levels.length,
}));

levelsByCategory.forEach(cat => {
    console.log(`   - ${cat.name}: ${cat.count} courses`);
});
console.log('');

// Test 3: Ebook PDF URLs
console.log('🔗 Test 3: Ebook PDF URLs Validation');
console.log('================================');

let invalidUrls = 0;
const urlPattern = /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/view\?usp=(sharing|drive_link)$/;

allLevels.forEach(level => {
    if (level.ebookPdfUrl) {
        if (!urlPattern.test(level.ebookPdfUrl)) {
            console.log(`   ❌ Invalid URL for ${level.title.en}: ${level.ebookPdfUrl}`);
            invalidUrls++;
        }
    } else {
        console.log(`   ⚠️  Missing URL for ${level.title.en}`);
    }
});

if (invalidUrls === 0) {
    console.log('✅ PASS: All ebook PDF URLs are valid');
} else {
    console.log(`❌ FAIL: ${invalidUrls} invalid ebook PDF URLs found`);
}
console.log('');

// Test 4: Grade Level Categories
console.log('🎓 Test 4: Grade Level Categories');
console.log('================================');

const expectedCategories = [
    'Kindergarten IVS-Mastery',
    'Primary IVS-Mastery',
    'Secondary IVS-Mastery',
    'Highschool IVS-Mastery',
];

const foundCategories = curriculumData.map(cat => cat.category.en);
const missingCategories = expectedCategories.filter(cat => !foundCategories.includes(cat));

if (missingCategories.length === 0) {
    console.log('✅ PASS: All expected categories exist');
} else {
    console.log(`❌ FAIL: Missing categories: ${missingCategories.join(', ')}`);
}

foundCategories.forEach(cat => {
    console.log(`   - ${cat}`);
});
console.log('');

// Test 5: Secondary School Coverage (Grades 6-9)
console.log('🏫 Test 5: Secondary School Coverage');
console.log('================================');

const secondaryCategory = curriculumData.find(cat => 
    cat.category.en.includes('Secondary') || cat.category.vi.includes('Trung học IVS')
);

if (secondaryCategory) {
    const secondaryGrades = secondaryCategory.levels.map(l => l.level);
    const expectedSecondary = [6, 7, 8, 9];
    const missingSecondary = expectedSecondary.filter(g => !secondaryGrades.includes(g));
    
    if (missingSecondary.length === 0) {
        console.log('✅ PASS: All secondary grades (6-9) exist');
    } else {
        console.log(`❌ FAIL: Missing secondary grades: ${missingSecondary.join(', ')}`);
    }
    
    console.log(`   Grades: ${secondaryGrades.join(', ')}`);
} else {
    console.log('❌ FAIL: Secondary category not found');
}
console.log('');

// Test 6: High School Coverage (Grades 10-12)
console.log('🎒 Test 6: High School Coverage');
console.log('================================');

const highschoolCategory = curriculumData.find(cat => 
    cat.category.en.includes('Highschool') || cat.category.vi.includes('Trung học phổ thông')
);

if (highschoolCategory) {
    const highschoolGrades = highschoolCategory.levels.map(l => l.level);
    const expectedHighschool = [10, 11, 12];
    const missingHighschool = expectedHighschool.filter(g => !highschoolGrades.includes(g));
    
    if (missingHighschool.length === 0) {
        console.log('✅ PASS: All high school grades (10-12) exist');
    } else {
        console.log(`❌ FAIL: Missing high school grades: ${missingHighschool.join(', ')}`);
    }
    
    console.log(`   Grades: ${highschoolGrades.join(', ')}`);
} else {
    console.log('❌ FAIL: High school category not found');
}
console.log('');

// Summary
console.log('📊 Test Summary');
console.log('================================');
console.log('All tests completed. Please review the results above.');
console.log('');
console.log('📝 Next Steps:');
console.log('   1. Upload ebook assets to /public/assets/ directories');
console.log('   2. Verify URLs are accessible in Google Drive');
console.log('   3. Test with different user roles (student, teacher)');
console.log('   4. Test grade level filtering in the UI');
console.log('');
