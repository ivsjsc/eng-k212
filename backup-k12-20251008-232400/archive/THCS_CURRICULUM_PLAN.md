# 📘 KẾ HOẠCH PHÁT TRIỂN CHƯƠNG TRÌNH HỌC THCS (Grades 6-9)

## 🎯 TỔNG QUAN DỰ ÁN

### **Mục tiêu chính:**
Phát triển chương trình học tiếng Anh cho học sinh THCS (Lớp 6-9) với chất lượng giáo trình chuyên nghiệp, tương tự như đã hoàn thành cho chương trình THPT.

### **Phạm vi:**
- **4 cấp lớp**: Lớp 6, 7, 8, 9
- **Giáo trình hiện có**: i-Learn Smart World (đang có cấu trúc cơ bản)
- **Thời gian dự kiến**: 4-6 tuần (tùy nguồn lực)

---

## 📊 HIỆN TRẠNG CHƯƠNG TRÌNH THCS

### **✅ Đã có sẵn:**
- **4 files curriculum**: sw6.ts, sw7.ts, sw8.ts, sw9.ts
- **Cấu trúc cơ bản**: Units, lessons, vocabulary với IPA
- **Grammar points**: Đã có giải thích song ngữ
- **Activities**: Có mô tả cơ bản

### **❌ Cần cải thiện:**
- Số lượng vocabulary còn ít (6-8 từ/lesson)
- Grammar explanations chưa đủ chi tiết
- Activities thiếu hướng dẫn từng bước
- Chưa có đầy đủ 7 lesson types như THPT
- Aims chưa đủ cụ thể và chi tiết
- Thiếu activities cho skills như THPT

---

## 🎓 SO SÁNH THPT VÀ THCS

### **Chương trình THPT (Đã hoàn thành):**
| Tiêu chí | Mô tả |
|----------|-------|
| **Structure** | 7 lessons/unit: Getting Started, Language Focus, Reading, Speaking, Listening, Writing, Culture/CLIL |
| **Vocabulary** | 8-16 từ/lesson với IPA pronunciation + Vietnamese meanings |
| **Grammar** | 0-2 points/lesson với explanations chi tiết, examples, time expressions |
| **Activities** | 3-4 activities/lesson với step-by-step instructions |
| **Aims** | 3-4 aims/lesson, specific và measurable |
| **Quality** | Textbook-quality, professional |

### **Chương trình THCS (Hiện tại):**
| Tiêu chí | Mô tả |
|----------|-------|
| **Structure** | 3-4 lessons/unit: Varied structure, không thống nhất |
| **Vocabulary** | 6-8 từ/lesson, có IPA pronunciation + Vietnamese |
| **Grammar** | 1-2 points/lesson, có explanations cơ bản |
| **Activities** | 2-3 activities/lesson, mô tả ngắn |
| **Aims** | 2-3 aims/lesson, cơ bản |
| **Quality** | Basic to intermediate |

---

## 🚀 KẾ HOẠCH NÂNG CẤP THCS

### **Phase 1: Phân tích và Lập kế hoạch (1 tuần)**

#### **1.1. Audit hiện trạng chi tiết**
- [ ] Đếm số units, lessons cho mỗi grade
- [ ] Phân tích cấu trúc lessons hiện tại
- [ ] Đánh giá chất lượng vocabulary, grammar, activities
- [ ] Xác định gaps so với standard THPT

#### **1.2. Định nghĩa Standard THCS**
Tạo document "THCS_ENHANCEMENT_STANDARD.md" với:
- Cấu trúc lesson chuẩn cho THCS
- Số lượng vocabulary/lesson (8-12 từ)
- Grammar complexity phù hợp với THCS
- Activity types cho THCS (age-appropriate)
- Aims template cho THCS

#### **1.3. Tạo Content Guidelines**
Hướng dẫn tạo nội dung cho từng grade:
- **Grade 6**: Beginner level, simple vocabulary, basic grammar
- **Grade 7**: Elementary level, expanding vocabulary, compound sentences
- **Grade 8**: Pre-intermediate level, complex vocabulary, complex grammar
- **Grade 9**: Intermediate level, academic vocabulary, advanced grammar

---

### **Phase 2: Phát triển Tools và Templates (1 tuần)**

#### **2.1. Tạo Enhancement Scripts**
Tương tự THPT, tạo các scripts:

**a) thcs-curriculum-enhancer.ts**
```typescript
// Tạo detailed lessons từ basic content
// Generate age-appropriate vocabulary
// Create engaging activities cho THCS students
```

**b) thcs-grammar-enhancer.ts**
```typescript
// Thêm grammar explanations chi tiết
// Examples phù hợp với THCS
// Practice exercises interactive
```

**c) thcs-activity-generator.ts**
```typescript
// Generate activities theo skill types
// Age-appropriate tasks
// Group work, pair work, individual tasks
```

#### **2.2. Tạo Content Templates**

**Template 1: THCS Lesson Structure**
```typescript
{
    id: number,              // VD: 60101 (Grade 6, Unit 1, Lesson 1)
    title: {en, vi},         // Engaging, age-appropriate
    aims: {en: [], vi: []},  // 3-4 specific, measurable aims
    vocabulary: [...],       // 8-12 từ với IPA + Vietnamese + example sentences
    grammar: [...],          // 1-2 points với detailed explanations
    activities: [...]        // 3-4 activities với clear instructions
}
```

**Template 2: Vocabulary Item (THCS)**
```typescript
{
    term: 'pool',
    pronunciation: '/puːl/',
    vietnamese: 'hồ bơi',
    example: {
        en: 'My house has a big swimming pool.',
        vi: 'Nhà tôi có một hồ bơi lớn.'
    },
    synonyms: ['swimming pool'],
    antonyms: []
}
```

**Template 3: Activity (THCS)**
```typescript
{
    type: 'Group Discussion',
    duration: '10 minutes',
    groupSize: '4 students',
    materials: ['pictures', 'vocabulary cards'],
    description: {
        en: [
            'Step 1: Form groups of 4 students',
            'Step 2: Each group receives picture cards',
            'Step 3: Discuss and match vocabulary with pictures',
            'Step 4: Present findings to class'
        ],
        vi: [
            'Bước 1: Tạo nhóm 4 học sinh',
            'Bước 2: Mỗi nhóm nhận thẻ hình ảnh',
            'Bước 3: Thảo luận và ghép từ vựng với hình ảnh',
            'Bước 4: Trình bày kết quả trước lớp'
        ]
    },
    objectives: {
        en: 'Practice vocabulary in context, develop teamwork skills',
        vi: 'Luyện tập từ vựng trong ngữ cảnh, phát triển kỹ năng làm việc nhóm'
    }
}
```

---

### **Phase 3: Enhancement Implementation (2-3 tuần)**

#### **3.1. Grade 6 Enhancement (Week 1)**
- [ ] Run audit script on sw6.ts
- [ ] Generate enhanced content for all units
- [ ] Add detailed vocabulary (8-12 items/lesson)
- [ ] Enhance grammar explanations
- [ ] Create structured activities (3-4/lesson)
- [ ] Review và validate
- [ ] Test build

#### **3.2. Grade 7 Enhancement (Week 1)**
- [ ] Run audit script on sw7.ts
- [ ] Generate enhanced content
- [ ] Adjust complexity level (slightly higher than Grade 6)
- [ ] Add vocabulary examples
- [ ] Enhance activities with more challenge
- [ ] Review và validate
- [ ] Test build

#### **3.3. Grade 8 Enhancement (Week 2)**
- [ ] Run audit script on sw8.ts
- [ ] Generate enhanced content
- [ ] Pre-intermediate level content
- [ ] More complex grammar explanations
- [ ] Advanced activities (debates, presentations)
- [ ] Review và validate
- [ ] Test build

#### **3.4. Grade 9 Enhancement (Week 2)**
- [ ] Run audit script on sw9.ts
- [ ] Generate enhanced content
- [ ] Intermediate level content
- [ ] Academic vocabulary introduction
- [ ] Prepare for THPT transition
- [ ] Review và validate
- [ ] Test build

---

### **Phase 4: Quality Assurance và Documentation (1 tuần)**

#### **4.1. Testing**
- [ ] TypeScript compilation test
- [ ] Content validation
- [ ] Cross-grade consistency check
- [ ] User acceptance testing (if possible)

#### **4.2. Documentation**
- [ ] Update THCS_CURRICULUM_PLAN.md
- [ ] Create THCS_ENHANCEMENT_GUIDE.md
- [ ] Document all scripts và tools
- [ ] Create user guide cho teachers

#### **4.3. Final Review**
- [ ] Content quality review
- [ ] Grammar accuracy check
- [ ] Vietnamese translation review
- [ ] Age-appropriateness review

---

## 📋 LESSON STRUCTURE CHUẨN CHO THCS

### **Standard 7-Lesson Structure:**

#### **Lesson 1: New Words & Speaking**
- **Focus**: Vocabulary introduction, pronunciation, speaking practice
- **Vocabulary**: 10-12 từ mới
- **Grammar**: 0-1 point (light introduction)
- **Activities**: Picture matching, pronunciation drills, pair work

#### **Lesson 2: Grammar & Listening**
- **Focus**: Grammar explanation, listening comprehension
- **Vocabulary**: 6-8 từ bổ sung
- **Grammar**: 2 points chi tiết
- **Activities**: Grammar exercises, listening tasks, comprehension questions

#### **Lesson 3: Reading & Vocabulary**
- **Focus**: Reading comprehension, vocabulary in context
- **Vocabulary**: 8-10 từ từ reading passage
- **Grammar**: 0 (focus on reading)
- **Activities**: Pre-reading, while-reading, post-reading discussions

#### **Lesson 4: Speaking & Functional Language**
- **Focus**: Conversational skills, functional expressions
- **Vocabulary**: 6-8 functional phrases
- **Grammar**: 1 point (grammar for speaking)
- **Activities**: Dialogues, role-plays, presentations

#### **Lesson 5: Writing & Grammar**
- **Focus**: Writing skills, text structure
- **Vocabulary**: 6-8 từ cho writing
- **Grammar**: 1 point (grammar for writing)
- **Activities**: Sentence building, paragraph writing, peer editing

#### **Lesson 6: Culture & CLIL**
- **Focus**: Cultural awareness, cross-curricular content
- **Vocabulary**: 8-10 từ văn hóa/liên môn
- **Grammar**: 0-1 point
- **Activities**: Cultural comparison, research, projects

#### **Lesson 7: Review & Project**
- **Focus**: Consolidation, project-based learning
- **Vocabulary**: Review all unit vocabulary
- **Grammar**: Review all unit grammar
- **Activities**: Games, projects, presentations, assessments

---

## 🎯 CONTENT GUIDELINES THEO GRADE

### **Grade 6 (Beginner to Elementary)**
- **Vocabulary**: Concrete, everyday words (family, school, home, food)
- **Grammar**: Present simple, present continuous, can/can't, there is/are
- **Topics**: Personal information, daily routines, hobbies, places
- **Activities**: Games, songs, simple role-plays, picture descriptions
- **Complexity**: Simple sentences, basic paragraph structure

### **Grade 7 (Elementary)**
- **Vocabulary**: Expanding to abstract concepts (emotions, opinions, reasons)
- **Grammar**: Past simple, future (will/be going to), comparatives/superlatives
- **Topics**: Past experiences, future plans, descriptions, simple opinions
- **Activities**: Interviews, surveys, short presentations, simple debates
- **Complexity**: Compound sentences, structured paragraphs

### **Grade 8 (Pre-Intermediate)**
- **Vocabulary**: Academic and abstract words (environment, technology, society)
- **Grammar**: Present perfect, passive voice, conditionals (1st, 2nd)
- **Topics**: Current events, social issues, technology, environment
- **Activities**: Debates, research projects, extended writing, presentations
- **Complexity**: Complex sentences, multi-paragraph essays

### **Grade 9 (Intermediate)**
- **Vocabulary**: Advanced academic vocabulary (analysis, evaluation, synthesis)
- **Grammar**: All tenses, reported speech, conditionals (3rd), relative clauses
- **Topics**: Global issues, literature, science, career planning, exam preparation
- **Activities**: Critical analysis, formal presentations, essays, mock exams
- **Complexity**: Academic writing, complex discourse, THPT preparation

---

## 💡 TÍNH NĂNG ĐẶC BIỆT CHO THCS

### **1. Age-Appropriate Content**
- Fun và engaging activities
- Real-life relevance
- Visual support (pictures, videos, games)
- Interactive elements

### **2. Skill Development**
- 4 skills integration: Listening, Speaking, Reading, Writing
- Critical thinking activities
- Collaboration và teamwork
- Digital literacy

### **3. Assessment Support**
- Formative assessment activities
- Self-assessment checklists
- Peer assessment rubrics
- Progress tracking

### **4. Teacher Support**
- Detailed lesson plans
- Extension activities
- Differentiation strategies
- Resource suggestions

---

## 📊 ĐỊNH LƯỢNG MỤC TIÊU

### **Target Numbers:**
- **4 grades** × **10 units/grade** × **7 lessons/unit** = **280 detailed lessons**
- **Vocabulary**: ~2,800 items (10 items/lesson average)
- **Grammar**: ~400 points (1.5 points/lesson average)
- **Activities**: ~1,120 activities (4 activities/lesson)

### **Quality Metrics:**
- ✅ All vocabulary với IPA pronunciation + Vietnamese + examples
- ✅ All grammar với bilingual explanations + examples + practice
- ✅ All activities với step-by-step instructions + timing + materials
- ✅ All content age-appropriate và engaging
- ✅ TypeScript compilation success rate: 100%

---

## 🔧 SCRIPTS CẦN TẠO

### **1. thcs-audit.ts**
Kiểm tra hiện trạng:
- Count units, lessons, vocabulary, grammar
- Identify gaps và inconsistencies
- Generate audit report

### **2. thcs-enhancer.ts**
Core enhancement engine:
- Generate detailed lessons
- Expand vocabulary với examples
- Enhance grammar explanations
- Create structured activities

### **3. thcs-activity-generator.ts**
Generate age-appropriate activities:
- Games và interactive tasks
- Group work và pair work
- Projects và presentations
- Assessment activities

### **4. thcs-validator.ts**
Validate content quality:
- Check IPA pronunciations
- Validate Vietnamese translations
- Ensure grammar accuracy
- Test age-appropriateness

### **5. thcs-update-curriculum.ts**
Update all files:
- Save enhanced content
- Format correctly
- Test build
- Generate reports

---

## 📚 DELIVERABLES

### **Documentation:**
1. ✅ THCS_CURRICULUM_PLAN.md (this file)
2. ⏳ THCS_ENHANCEMENT_STANDARD.md
3. ⏳ THCS_ENHANCEMENT_GUIDE.md
4. ⏳ THCS_TEACHER_GUIDE.md
5. ⏳ THCS_PROGRESS_REPORT.md

### **Scripts:**
1. ⏳ thcs-audit.ts
2. ⏳ thcs-enhancer.ts
3. ⏳ thcs-activity-generator.ts
4. ⏳ thcs-validator.ts
5. ⏳ thcs-update-curriculum.ts

### **Enhanced Files:**
1. ⏳ data/sw6.ts (enhanced)
2. ⏳ data/sw7.ts (enhanced)
3. ⏳ data/sw8.ts (enhanced)
4. ⏳ data/sw9.ts (enhanced)

---

## ⏱️ TIMELINE

### **Week 1: Analysis & Planning**
- Day 1-2: Audit hiện trạng, phân tích gaps
- Day 3-4: Tạo standards và guidelines
- Day 5-7: Develop templates và sample lessons

### **Week 2-3: Development**
- Week 2: Enhance Grades 6 & 7
- Week 3: Enhance Grades 8 & 9

### **Week 4: QA & Documentation**
- Day 1-3: Testing và validation
- Day 4-5: Documentation
- Day 6-7: Final review và deployment

---

## 🎯 SUCCESS CRITERIA

### **Content Quality:**
- ✅ All lessons follow standard structure
- ✅ Vocabulary với IPA + Vietnamese + examples
- ✅ Grammar với detailed explanations
- ✅ Activities với clear instructions
- ✅ Age-appropriate content

### **Technical Quality:**
- ✅ TypeScript compilation success
- ✅ No errors or warnings
- ✅ Consistent formatting
- ✅ Proper data structure

### **Educational Quality:**
- ✅ Aligned với Vietnamese THCS curriculum
- ✅ Skills-based approach (4 skills + grammar)
- ✅ Progressive difficulty (Grade 6 → Grade 9)
- ✅ Engaging và relevant content

---

## 🚀 BƯỚC TIẾP THEO

**Bạn muốn bắt đầu từ đâu?**

**Option A**: Tạo audit script và chạy phân tích chi tiết cho THCS
**Option B**: Tạo THCS_ENHANCEMENT_STANDARD.md trước
**Option C**: Bắt đầu enhance Grade 6 làm mẫu
**Option D**: Tạo tất cả scripts trước rồi enhance hàng loạt

**Đề xuất của tôi: Option A** - Chạy audit để hiểu rõ hiện trạng trước khi lập kế hoạch chi tiết.

---

**📅 Created**: October 7, 2025
**📝 Status**: Planning Phase
**👤 Owner**: Curriculum Development Team
**🎯 Target Completion**: November 2025
