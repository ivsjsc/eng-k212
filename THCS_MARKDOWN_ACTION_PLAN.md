# ACTION PLAN: CHỈNH SỬA CÁC FILE MARKDOWN THCS
## (Grade 6, 7, 8, 9 - i-Learn Smart World)

**Ngày tạo**: 2025-10-07  
**Mục tiêu**: Chuẩn hóa cấu trúc markdown để Grok Code Fast dễ soạn và convert sang TypeScript

---

## 📋 OVERVIEW

### Hiện trạng:
- ✅ Có 4 files: `grade6.md`, `grade7.md`, `grade8.md`, `grade9.md`
- ❌ Cấu trúc không nhất quán giữa các file
- ❌ Thiếu IPA pronunciation
- ❌ Thiếu phân loại Activity types
- ❌ Chỉ có 3 Lessons/Unit (thiếu 4 Lessons)

### Mục tiêu:
- ✅ Chuẩn hóa cấu trúc theo `THCS_MARKDOWN_STRUCTURE_GUIDE.md`
- ✅ Thêm IPA pronunciation cho tất cả vocabulary
- ✅ Phân loại rõ ràng Activity types
- ✅ Chuẩn bị nền tảng để mở rộng lên 7 Lessons/Unit

---

## 🎯 PRIORITY ORDER (Theo THCS Audit Report)

### Priority 1: Grade 7 (HIGH) ⚠️
- **Lý do**: Lowest vocab/lesson (5.6), low activities (1.4)
- **Units**: 10 units, 30 lessons
- **Estimated time**: 8-10 hours

### Priority 2: Grade 8 (HIGH) ⚠️
- **Lý do**: Lowest activities/lesson (1.2)
- **Units**: 8 units, 30 lessons (in file shows only 8 units)
- **Estimated time**: 8-10 hours

### Priority 3: Grade 6 (MEDIUM) ⚡
- **Lý do**: Medium performance (6.5 vocab/lesson)
- **Units**: 10 units, 30 lessons
- **Estimated time**: 8-10 hours

### Priority 4: Grade 9 (LOW) ✅
- **Lý do**: Best performing (6.6 vocab, 2.3 activities)
- **Units**: 8 units, 24 lessons
- **Estimated time**: 6-8 hours

---

## 📝 DETAILED TASKS

### PHASE 1: REVIEW & ANALYZE (1-2 hours)

#### Task 1.1: Read all 4 files completely
- [ ] Read `grade6.md` (263 lines) - estimated 30 mins
- [ ] Read `grade7.md` (226 lines) - estimated 30 mins
- [ ] Read `grade8.md` (301 lines) - estimated 30 mins
- [ ] Read `grade9.md` (517 lines) - estimated 45 mins

#### Task 1.2: Create comparison table
- [ ] Compare structures across 4 grades
- [ ] Identify unique features in each grade
- [ ] List all vocabulary without IPA
- [ ] List all activities without Type labels

**Output**: `THCS_COMPARISON_ANALYSIS.md`

---

### PHASE 2: STANDARDIZE GRADE 7 (8-10 hours) - PILOT

#### Task 2.1: Backup original file
```bash
cp grade7.md grade7.md.backup
```

#### Task 2.2: Unit-by-Unit editing (Grade 7)

**For each Unit (10 units):**

**Step 1: Add Unit Overview (10 mins/unit)**
```markdown
### 📌 Tổng quan Unit
- **Chủ đề chính**: [...]
- **Mục tiêu tổng quát**: [3-4 points]
- **Kỹ năng trọng tâm**: [Skills]
- **Cấu trúc ngữ pháp chính**: [Grammar structures]
```

**Step 2: Standardize Lesson structure (30 mins/lesson × 3 lessons)**

For each lesson:

1. **Aims Section**:
   - [ ] Format as bullet list
   - [ ] Separate EN and VI clearly
   - [ ] Add pronunciation aim if relevant

2. **Vocabulary Section**:
   - [ ] Create table: `Term | IPA | Vietnamese | Example`
   - [ ] Add IPA for ALL words (use dictionary or phonetic tool)
   - [ ] Add Extension Vocabulary subsection
   - [ ] Add Collocations subsection
   - [ ] Target: 8-12 words/lesson

**Example transformation**:

**Before** (Grade 7, Unit 1, Lesson 1):
```
Từ vựng: collect soccer stickers, build models, bake, make vlogs, read comics, play online games
```

**After**:
```markdown
#### 📚 Vocabulary (Từ vựng)

| Term | IPA Pronunciation | Vietnamese | Example Sentence |
|------|-------------------|------------|------------------|
| collect | /kəˈlekt/ | sưu tập | I collect soccer stickers. |
| sticker | /ˈstɪkər/ | nhãn dán, hình dán | He has many soccer stickers. |
| build | /bɪld/ | xây dựng, lắp ráp | We build models every weekend. |
| model | /ˈmɑːdl/ | mô hình | This model took me 3 hours. |
| bake | /beɪk/ | nướng (bánh) | She loves to bake cakes. |
| vlog | /vlɒɡ/ | video blog | I make vlogs about my hobbies. |
| comic | /ˈkɑːmɪk/ | truyện tranh | Do you read comics? |
| online game | /ˈɑːnlaɪn ɡeɪm/ | trò chơi trực tuyến | He plays online games after school. |

#### Extension Vocabulary:
| Term | IPA | Vietnamese |
|------|-----|------------|
| stamp | /stæmp/ | tem thư |
| board game | /bɔːrd ɡeɪm/ | trò chơi trên bàn |
| DIY (Do It Yourself) | /ˌdiː aɪ ˈwaɪ/ | tự làm |

#### Collocations:
- **collect stamps/coins** - sưu tập tem/tiền xu
- **build models/furniture** - lắp ráp mô hình/đồ nội thất
- **play board games/online games** - chơi board game/game online
```

3. **Grammar Section**:
   - [ ] Add Title for each grammar structure
   - [ ] Add Function/Usage
   - [ ] Add Form (with +, -, ? patterns)
   - [ ] Add Examples (3-5 examples)
   - [ ] Add Common Mistakes table
   - [ ] Add Practice Patterns
   - [ ] Separate EN and VI explanations

**Example transformation**:

**Before**:
```
Ngữ pháp: Present Simple for habits. S + V(s/es). Do/Does + S + V?
```

**After**:
```markdown
#### 📖 Grammar (Ngữ pháp)

**Grammar Point 1: Present Simple for Habits and Routines**

**Title**: Present Simple - Habits (Thì Hiện tại đơn - Thói quen)

**Function/Usage**:
- Talk about habits and routines
- State general truths
- Express facts

**Form**:
- (+) S + V(s/es)
- (-) S + don't/doesn't + V (base)
- (?) Do/Does + S + V (base)?

**Examples**:
- I collect soccer stickers every week.
- She doesn't bake cakes often.
- Do you play online games?

**Common Mistakes**:
| ❌ Wrong | ✅ Correct |
|----------|-----------|
| He collect stamps. | He collects stamps. |
| Do she play games? | Does she play games? |

**Practice Patterns**:
- What do you do in your free time?
- How often do you...?
```

4. **Activities Section**:
   - [ ] Add Type label for each activity
   - [ ] Add full Description (EN + VI)
   - [ ] Add Duration
   - [ ] Add Skills
   - [ ] Add Interaction pattern
   - [ ] Add Materials
   - [ ] Add Differentiation (for Speaking/Writing)

**Example transformation**:

**Before**:
```
Hoạt động: Brainstorm hobbies. Làm survey về sở thích.
```

**After**:
```markdown
#### 🎭 Activities (Hoạt động)

**Activity 1: Warm-up - Brainstorming Hobbies**
- **Type**: Warm-up / Vocabulary Activation
- **Description** (EN): Students brainstorm 5-7 hobbies using "Think-Pair-Share" technique.
- **Description** (VI): Học sinh suy nghĩ 5-7 sở thích sử dụng kỹ thuật "Suy nghĩ-Ghép đôi-Chia sẻ".
- **Duration**: 5 minutes
- **Skills**: Speaking, Vocabulary
- **Interaction**: Individual → Pairs → Whole class
- **Materials**: Whiteboard, markers

**Activity 2: Hobby Survey**
- **Type**: Speaking / Information Gap
- **Description** (EN): Work in groups (4-5 students). Survey each other about hobbies and frequency. Report results using third person.
- **Description** (VI**: Làm việc nhóm (4-5 học sinh). Khảo sát nhau về sở thích và tần suất. Báo cáo kết quả bằng ngôi thứ ba.
- **Duration**: 15 minutes
- **Skills**: Speaking, Listening
- **Interaction**: Groups of 4-5
- **Materials**: Survey worksheet
- **Differentiation**:
  - **Weak students**: Provide question frames
  - **Strong students**: Add follow-up questions and opinions
```

**Step 3: Add Homework/Assessment sections (5 mins/lesson)**
```markdown
### 📝 Homework
1. Workbook exercises [page numbers]
2. Write [X] sentences about [topic]
3. Learn vocabulary + practice pronunciation

### 🎯 Assessment
- [ ] Can name [X] vocabulary items
- [ ] Can use [Grammar structure] correctly
- [ ] Can [skill] fluently
```

**Step 4: Quality Check (10 mins/unit)**
- [ ] All vocabulary has IPA? (target: 100%)
- [ ] All grammar has Title + Explanation? (target: 100%)
- [ ] All activities have Type + Description? (target: 100%)
- [ ] 8-12 vocab items/lesson? (target: met)
- [ ] 3-4 activities/lesson? (target: met)

**Time Estimate for Grade 7**:
- 10 units × [10 min overview + (30 min × 3 lessons) + 10 min QC] = 10 × 110 min = **18.3 hours**

*Can be reduced with practice and templates*

---

### PHASE 3: APPLY TO REMAINING GRADES (24-30 hours)

#### Task 3.1: Grade 8 (8-10 hours)
- [ ] Apply same process as Grade 7
- [ ] Focus on adding more activities (currently 1.2/lesson)

#### Task 3.2: Grade 6 (8-10 hours)
- [ ] Apply same process as Grade 7
- [ ] Focus on vocabulary expansion (currently 6.5/lesson)

#### Task 3.3: Grade 9 (6-8 hours)
- [ ] Apply same process as Grade 7
- [ ] Already best performing, mainly format standardization

---

### PHASE 4: VALIDATION & TESTING (4-6 hours)

#### Task 4.1: Cross-check all files
- [ ] Run automated checklist on all 4 files
- [ ] Verify IPA accuracy (sample check)
- [ ] Check grammar explanations completeness

#### Task 4.2: Generate sample TypeScript
- [ ] Convert 1 unit from each grade to TypeScript
- [ ] Verify data structure matches `sw6.ts` format
- [ ] Test with curriculum.ts import

#### Task 4.3: Create conversion script (optional)
- [ ] Write markdown → TypeScript converter
- [ ] Test on sample units
- [ ] Document conversion process

---

## 🛠️ TOOLS & RESOURCES

### Required Tools:
1. **IPA Pronunciation Generator**:
   - https://tophonetics.com/
   - https://www.phonetizer.com/
   - Cambridge Dictionary online

2. **Markdown Editor**:
   - VS Code with Markdown Preview
   - Markdown Table Generator extensions

3. **Quality Checkers**:
   - Markdown linter
   - Custom checklist script (to be created)

### Reference Documents:
- `THCS_MARKDOWN_STRUCTURE_GUIDE.md` (master template)
- `THCS_MARKDOWN_EXAMPLE_UNIT.md` (full example)
- `data/sw6.ts` (TypeScript data structure reference)
- `THCS_AUDIT_REPORT.md` (current status)

---

## 📊 TRACKING PROGRESS

### Checklist for Each Grade

#### Grade 7 (Priority 1)
- [ ] Phase 1: Review & Analyze
- [ ] Phase 2: Unit 1 standardized
- [ ] Phase 2: Unit 2 standardized
- [ ] Phase 2: Unit 3 standardized
- [ ] Phase 2: Unit 4 standardized
- [ ] Phase 2: Unit 5 standardized
- [ ] Phase 2: Unit 6 standardized
- [ ] Phase 2: Unit 7 standardized
- [ ] Phase 2: Unit 8 standardized
- [ ] Phase 2: Unit 9 standardized
- [ ] Phase 2: Unit 10 standardized
- [ ] Phase 4: Quality validation

#### Grade 8 (Priority 2)
- [ ] All units standardized
- [ ] Quality validation

#### Grade 6 (Priority 3)
- [ ] All units standardized
- [ ] Quality validation

#### Grade 9 (Priority 4)
- [ ] All units standardized
- [ ] Quality validation

---

## 📈 SUCCESS METRICS

### Quantitative Targets:
- **Vocabulary**: 8-12 items/lesson with 100% IPA coverage
- **Grammar**: 1-2 structures/lesson with full explanation
- **Activities**: 3-4 activities/lesson with Type labels
- **Time**: Complete all 4 grades in 35-45 hours

### Qualitative Targets:
- **Consistency**: All files follow same structure
- **Completeness**: No missing sections
- **Clarity**: Easy for AI/humans to parse
- **Convertibility**: Can auto-convert to TypeScript with minimal errors

---

## 🚀 NEXT STEPS

### Immediate Actions (Today):
1. ✅ Create `THCS_MARKDOWN_STRUCTURE_GUIDE.md` (DONE)
2. ✅ Create `THCS_MARKDOWN_EXAMPLE_UNIT.md` (DONE)
3. ✅ Create this Action Plan (DONE)
4. 🔄 **DECISION POINT**: Get user approval to start Phase 2

### After Approval:
1. Start Phase 2 with Grade 7, Unit 1, Lesson 1
2. Test the process and refine
3. Scale to all units

### Long-term (After completion):
1. Expand from 3 Lessons → 7 Lessons/Unit
2. Create automated conversion scripts
3. Build AI-assisted content generation tools

---

## 💡 RECOMMENDATIONS

### Approach A: Manual Editing (Recommended for first unit)
- **Pros**: High quality, full control, learn the process
- **Cons**: Time-consuming (18 hours/grade)
- **Best for**: Grade 7, Unit 1 as pilot

### Approach B: Semi-automated (Recommended after pilot)
- **Pros**: Faster, consistent results
- **Cons**: Requires script development, may need manual fixes
- **Best for**: Remaining units after pilot success

### Approach C: AI-assisted (Recommended for scale)
- **Pros**: Very fast, can handle multiple units simultaneously
- **Cons**: Requires careful prompting and validation
- **Best for**: After templates and examples are refined

---

## ❓ DECISION POINT

**Question for user**: 

Bạn muốn:

**Option A**: Bắt đầu chỉnh sửa ngay Grade 7, Unit 1, Lesson 1 để test cấu trúc mới?

**Option B**: Tạo thêm công cụ/script tự động trước khi bắt đầu chỉnh sửa?

**Option C**: Review và điều chỉnh template/example trước?

**Option D**: Cần giải thích thêm về bất kỳ phần nào?

---

**Created by**: GitHub Copilot  
**Purpose**: Action Plan for THCS Markdown Standardization  
**Last updated**: 2025-10-07  
**Estimated total time**: 35-45 hours for all 4 grades
