# QUICK REFERENCE: MARKDOWN STRUCTURE THCS
## Tra cứu nhanh - Cheat Sheet

---

## 📝 VOCABULARY TABLE TEMPLATE

```markdown
#### 📚 Vocabulary (Từ vựng)

| Term | IPA Pronunciation | Vietnamese | Example Sentence |
|------|-------------------|------------|------------------|
| pool | /puːl/ | hồ bơi | Our apartment has a pool. |
| balcony | /ˈbælkəni/ | ban công | I sit on the balcony. |

#### Extension Vocabulary:
| Term | IPA | Vietnamese |
|------|-----|------------|
| rooftop | /ˈruːftɒp/ | sân thượng |

#### Collocations:
- **have a pool** - có hồ bơi
- **live in an apartment** - sống trong căn hộ
```

---

## 📖 GRAMMAR STRUCTURE TEMPLATE

```markdown
#### 📖 Grammar (Ngữ pháp)

**Grammar Point 1: [TITLE]**

**Title**: Present Simple (Thì Hiện tại đơn)

**Function**: Talk about facts, habits, general truths

**Form**:
- (+) S + V(s/es)
- (-) S + don't/doesn't + V
- (?) Do/Does + S + V?

**Examples**:
- I live in an apartment.
- She doesn't have a pool.
- Do you like your house?

**Common Mistakes**:
| ❌ Wrong | ✅ Correct |
|----------|-----------|
| He live here. | He lives here. |

**Practice Patterns**:
- Do you + V?
- Does he/she + V?
```

---

## 🎭 ACTIVITY TEMPLATE

```markdown
#### 🎭 Activities (Hoạt động)

**Activity 1: [NAME]**
- **Type**: [Warm-up/Vocabulary/Reading/Grammar/Speaking/Writing/Pronunciation/Conversation Skill]
- **Description** (EN): [English description]
- **Description** (VI**: [Vietnamese description]
- **Duration**: [X] minutes
- **Skills**: [Listening/Speaking/Reading/Writing]
- **Interaction**: [T→Ss / Pairs / Groups / Individual]
- **Materials**: [Materials needed]
- **Differentiation** (optional):
  - **Weak students**: [Support]
  - **Strong students**: [Challenge]
```

---

## 📋 ACTIVITY TYPES TAXONOMY

### Core Types:
- **Warm-up**: Icebreaker, brainstorming
- **Vocabulary**: Presentation, practice, games
- **Reading**: Comprehension, scanning, skimming
- **Grammar**: Presentation, controlled practice, error correction
- **Speaking**: Information gap, role-play, discussion, survey, debate
- **Writing**: Guided writing, free writing, peer editing
- **Listening**: For gist, for detail, note-taking
- **Pronunciation**: Sound focus, intonation, stress
- **Conversation Skill**: Functional language, pragmatics

### Interaction Patterns:
- T → Ss (Teacher to Students)
- Ss → Ss (Students to Students)
- Individual work
- Pairs
- Groups (3-4, 4-5, etc.)
- Whole class

---

## 🎯 UNIT OVERVIEW TEMPLATE

```markdown
## UNIT [N]: [TITLE EN] ([TITLE VI])

### 📌 Tổng quan Unit
- **Chủ đề chính**: [Brief description]
- **Mục tiêu tổng quát**: 
  - [Goal 1]
  - [Goal 2]
  - [Goal 3]
- **Kỹ năng trọng tâm**: [Listening/Speaking/Reading/Writing]
- **Cấu trúc ngữ pháp chính**: [Grammar structures]
```

---

## ✅ LESSON CHECKLIST

### Must-have for each lesson:
- [ ] **Aims** (3-4 aims, EN + VI)
- [ ] **Vocabulary** (8-12 words with IPA, extensions, collocations)
- [ ] **Grammar** (1-2 structures with full explanation)
- [ ] **Activities** (3-4 activities with Type labels)

### Optional but recommended:
- [ ] Homework section
- [ ] Assessment criteria
- [ ] Teacher notes
- [ ] Materials list

---

## 🔢 TARGET NUMBERS

| Metric | Target | Current (Audit) |
|--------|--------|-----------------|
| Vocabulary/lesson | 8-12 words | 6.3 avg |
| Grammar/lesson | 1-2 structures | 0.83 avg |
| Activities/lesson | 3-4 activities | 1.57 avg |
| IPA coverage | 100% | 0% |
| Lessons/Unit | 7 lessons | 3 lessons |

---

## 📂 FILE STRUCTURE

```
grade[X].md
├── Header (Title, Level, Info)
├── UNIT 1
│   ├── Unit Overview
│   ├── LESSON 1
│   │   ├── Aims
│   │   ├── Vocabulary
│   │   ├── Grammar
│   │   └── Activities
│   ├── LESSON 2
│   │   └── [same structure]
│   └── LESSON 3
│       └── [same structure]
├── UNIT 2
│   └── [same structure]
└── ...
```

---

## 🛠️ USEFUL TOOLS

### IPA Lookup:
- https://tophonetics.com/
- https://www.phonetizer.com/
- Cambridge Dictionary (dictionary.cambridge.org)

### Markdown Editing:
- VS Code + Markdown Preview
- Markdown Table Generator extension
- Markdownlint (linter)

### Quality Check:
```bash
# Count vocabulary items
grep -c "{ term:" file.ts

# Find missing IPA
grep "pronunciation: ''" file.ts

# Count activities
grep -c "type:" file.ts
```

---

## 🚨 COMMON MISTAKES TO AVOID

### Vocabulary:
❌ Missing IPA: `pool - hồ bơi`  
✅ With IPA: `pool /puːl/ - hồ bơi`

❌ No example: `pool /puːl/ - hồ bơi`  
✅ With example: `pool /puːl/ - hồ bơi | We have a pool.`

### Grammar:
❌ Only explanation: "We use Present Simple for facts"  
✅ Full structure: Explanation + Form + Examples + Mistakes

### Activities:
❌ No type: "Students do a survey"  
✅ With type: **Type**: Speaking / Information Gap

❌ English only: "Work in pairs"  
✅ Bilingual: **EN**: Work in pairs | **VI**: Làm việc theo cặp

---

## 📊 CONVERSION TO TYPESCRIPT

### Markdown Structure → TypeScript Mapping

```markdown
## UNIT 1: Home
### LESSON 1: My Home
#### Aims: [List of aims]
#### Vocabulary: [Table]
#### Grammar: [Structures]
#### Activities: [List]
```

↓ Converts to ↓

```typescript
{
  id: 601,
  title: { en: 'Unit 1: Home', vi: 'Bài 1: Nhà cửa' },
  lessons: [
    {
      id: 60101,
      title: { en: 'Lesson 1: My Home', vi: 'Bài học 1: Nhà của tôi' },
      aims: { en: [...], vi: [...] },
      vocabulary: [{ term: '', pronunciation: '', vietnamese: '' }, ...],
      grammar: [{ title: {...}, explanation: {...} }, ...],
      activities: [{ type: '', description: {...} }, ...]
    }
  ]
}
```

---

## 🎯 WORKFLOW SUMMARY

### For each Unit:
1. ✍️ Write Unit Overview (5 mins)
2. 📝 For each Lesson (30 mins):
   - Write Aims (3-4 aims, EN+VI)
   - Create Vocabulary table (8-12 words + IPA)
   - Write Grammar (full structure)
   - List Activities (3-4 activities with Type)
3. ✅ Quality Check (5 mins):
   - All vocab has IPA? ✓
   - All grammar has examples? ✓
   - All activities have Type? ✓

### Total time/Unit:
- **With 3 Lessons**: ~1.5-2 hours
- **With 7 Lessons**: ~3.5-4 hours

---

## 💡 PRO TIPS

1. **Copy-paste templates** from `THCS_MARKDOWN_EXAMPLE_UNIT.md`
2. **Use IPA tool batch mode** for multiple words
3. **Write in English first**, then translate to Vietnamese
4. **Keep grammar explanations simple** (THCS level)
5. **Use real student names** in examples (Phong, Linh, Mai, Nam)
6. **Add pictures/diagrams** for complex concepts (optional)
7. **Test activities mentally** - Can students do this in 10-15 mins?

---

## 📞 QUICK HELP

### Need example?
→ See `THCS_MARKDOWN_EXAMPLE_UNIT.md` (Unit 1, Lesson 1 - complete)

### Need full guide?
→ See `THCS_MARKDOWN_STRUCTURE_GUIDE.md` (detailed explanations)

### Ready to start?
→ See `THCS_MARKDOWN_ACTION_PLAN.md` (step-by-step process)

### Check current status?
→ See `THCS_AUDIT_REPORT.md` (statistics by grade)

---

**Quick Reference created by**: GitHub Copilot  
**Print this page**: For quick reference while editing  
**Last updated**: 2025-10-07
