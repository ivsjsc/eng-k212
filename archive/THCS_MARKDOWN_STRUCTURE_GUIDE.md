# HƯỚNG DẪN CẤU TRÚC MARKDOWN CHO CHƯƠNG TRÌNH THCS
## (i-Learn Smart World 6-7-8-9)

**Mục đích**: Cung cấp template và quy chuẩn để viết nội dung markdown (.md) một cách dễ đọc, logic, và dễ chuyển đổi sang TypeScript curriculum data.

**Ngày tạo**: 2025-10-07  
**Target**: Grok Code Fast & AI Content Generation

---

## 📊 PHÂN TÍCH CẤU TRÚC HIỆN TẠI

### ✅ Điểm mạnh (Cần giữ lại)
1. **Bố cục theo Unit-Lesson rõ ràng**
2. **Có phân loại đầy đủ**: Mục tiêu, Từ vựng, Ngữ pháp, Hoạt động
3. **Nội dung song ngữ (Anh-Việt)** cho dễ hiểu
4. **Chi tiết sư phạm cao** (phân hóa học sinh, bài tập mở rộng)

### ❌ Vấn đề cần khắc phục

#### 1. **Định dạng bảng không nhất quán**
- Grade 6: Dùng bảng dạng text (không có header rõ ràng)
- Grade 7: Dùng bảng có cột "Phần" + "Nội dung chi tiết"
- Grade 8: Dùng bảng dạng cột "Phần | Mục tiêu | Từ vựng | Ngữ pháp | Hoạt động"

#### 2. **Từ vựng thiếu IPA (phiên âm quốc tế)**
- Các file .md chỉ liệt kê từ, không có /pronunciation/
- Trong khi TypeScript data cần format: `{ term: 'pool', pronunciation: '/puːl/', vietnamese: 'hồ bơi' }`

#### 3. **Ngữ pháp thiếu cấu trúc rõ ràng**
- Thiếu phần `title` (tên cấu trúc ngữ pháp)
- Thiếu phần `explanation` (giải thích + ví dụ cụ thể)

#### 4. **Hoạt động thiếu phân loại type**
- Không có nhãn rõ ràng: Warm-up, Vocabulary, Reading, Grammar, Speaking, Writing
- Cần thêm `type` và `description` để dễ parse

#### 5. **Mỗi bài học chỉ có 3 Lessons, thiếu 4 Lessons còn lại**
- Target chuẩn: 7 Lessons/Unit (Getting Started, Language Focus, Reading, Speaking, Listening, Writing, Culture/CLIL)
- Hiện tại: chỉ có 3 Lessons/Unit

---

## 📝 CẤU TRÚC CHUẨN ĐỀ XUẤT

### Template Markdown cho mỗi Grade

```markdown
# CHƯƠNG TRÌNH TIẾNG ANH LỚP [X] - I-LEARN SMART WORLD
## (Phiên bản Chi tiết - Chuẩn TypeScript)

**Giáo trình**: i-Learn Smart World [X]  
**Cấp độ**: Trung học cơ sở - Lớp [X]  
**Số Unit**: 10 Units  
**Số Lessons/Unit**: 7 Lessons (Getting Started, Language Focus, Reading, Speaking, Listening, Writing, Culture/CLIL)

---

## UNIT [N]: [UNIT TITLE EN] ([UNIT TITLE VI])

### 📌 Tổng quan Unit
- **Chủ đề chính**: [Mô tả ngắn gọn]
- **Mục tiêu tổng quát**: [3-4 câu tóm tắt]
- **Kỹ năng trọng tâm**: [Listening/Speaking/Reading/Writing]

---

### LESSON 1: [LESSON TITLE EN] ([LESSON TITLE VI])

#### 🎯 Aims (Mục tiêu)
**English**:
- [Aim 1]
- [Aim 2]
- [Aim 3]

**Tiếng Việt**:
- [Mục tiêu 1]
- [Mục tiêu 2]
- [Mục tiêu 3]

#### 📚 Vocabulary (Từ vựng)

| Term (Thuật ngữ) | IPA Pronunciation | Vietnamese | Example Sentence (Optional) |
|------------------|-------------------|------------|----------------------------|
| pool | /puːl/ | hồ bơi | Our apartment has a pool. |
| balcony | /ˈbælkəni/ | ban công | I like to sit on the balcony. |
| garage | /ɡəˈrɑːʒ/ | nhà để xe | Their house has a big garage. |

**Từ mở rộng** (Extension):
- apartment building, penthouse, studio, duplex

**Collocations**:
- have a pool, live in an apartment, move into a house

#### 📖 Grammar (Ngữ pháp)

**1. Present Simple (Thì Hiện tại đơn)**

**Title**: Present Simple for Facts and Habits

**Explanation** (English):
- We use the Present Simple to talk about facts, general truths, and habits.
- **Form**: 
  - (+) S + V(s/es)
  - (-) S + do/does + not + V (base)
  - (?) Do/Does + S + V (base)?
- **Examples**:
  - I live in an apartment.
  - She doesn't live in a house.
  - Do you live in a house?

**Giải thích** (Tiếng Việt):
- Chúng ta dùng thì Hiện tại đơn để nói về sự thật, chân lý và thói quen.
- **Cấu trúc**: [Same as English với tiếng Việt]
- **Ví dụ**: [Vietnamese examples]

**Common Mistakes** (Lỗi thường gặp):
- ❌ He live in a house. ✅ He lives in a house.
- ❌ Do she live here? ✅ Does she live here?

**Practice Patterns**:
- Do you + V? → Yes, I do. / No, I don't.
- Does he/she + V? → Yes, he/she does. / No, he/she doesn't.

---

#### 🎭 Activities (Hoạt động)

**Activity 1: Warm-up**
- **Type**: Warm-up / Icebreaker
- **Description** (EN): Brainstorm 5-7 different types of homes. Use "Think-Pair-Share" technique.
- **Description** (VI): Suy nghĩ và liệt kê 5-7 loại nhà khác nhau. Sử dụng kỹ thuật "Suy nghĩ-Ghép đôi-Chia sẻ".
- **Duration**: 5 minutes
- **Skills**: Speaking, Vocabulary

**Activity 2: Vocabulary Introduction**
- **Type**: Vocabulary / Presentation
- **Description** (EN): Teacher uses flashcards/pictures to introduce new words. Students listen and repeat. Use "Matching Game" to check understanding.
- **Description** (VI): Giáo viên dùng flashcard/hình ảnh để giới thiệu từ mới. Học sinh nghe và lặp lại. Dùng trò chơi "Ghép từ" để kiểm tra hiểu.
- **Duration**: 10 minutes
- **Skills**: Listening, Speaking

**Activity 3: Reading Comprehension**
- **Type**: Reading / Comprehension
- **Description** (EN): Read a blog about Ken's family and answer True/False questions. Identify sentences using Present Simple.
- **Description** (VI**: Đọc blog về gia đình Ken và trả lời câu hỏi Đúng/Sai. Xác định các câu sử dụng thì Hiện tại đơn.
- **Duration**: 15 minutes
- **Skills**: Reading, Grammar
- **Material**: Student Book page 4

**Activity 4: Grammar Practice**
- **Type**: Grammar / Controlled Practice
- **Description** (EN): Complete gap-fill exercises. Write 5 sentences about family members' habits using adverbs of frequency.
- **Description** (VI): Hoàn thành bài tập điền từ. Viết 5 câu về thói quen của thành viên gia đình sử dụng trạng từ tần suất.
- **Duration**: 10 minutes
- **Skills**: Writing, Grammar

**Activity 5: Speaking (Survey)**
- **Type**: Speaking / Production
- **Description** (EN): Work in groups (4-5 students). Survey each other about homes using "Do you live in...?" and "Does your house have...?". Report results to class.
- **Description** (VI**: Làm việc nhóm (4-5 học sinh). Khảo sát nhau về nhà cửa sử dụng "Do you live in...?" và "Does your house have...?". Báo cáo kết quả trước lớp.
- **Duration**: 15 minutes
- **Skills**: Speaking, Listening
- **Differentiation**:
  - **Weak students**: Provide sentence frames and adverbs list
  - **Strong students**: Use emphasis structures like "What I really enjoy is..."

**Activity 6: Pronunciation**
- **Type**: Pronunciation
- **Description** (EN): Focus on intonation for Yes/No questions (rising intonation).
- **Description** (VI**: Tập trung vào ngữ điệu cho câu hỏi Yes/No (ngữ điệu đi lên).
- **Duration**: 5 minutes
- **Skills**: Pronunciation

**Activity 7: Conversation Skill**
- **Type**: Conversation Skill / Function
- **Description** (EN): Practice getting someone's attention: "Excuse me.", "Sorry to bother you."
- **Description** (VI**: Luyện tập thu hút sự chú ý: "Xin lỗi.", "Xin lỗi đã làm phiền bạn."
- **Duration**: 5 minutes
- **Skills**: Speaking

---

### LESSON 2: [Next lesson...]
[Repeat same structure]

---

### LESSON 3: [Next lesson...]
[Repeat same structure]

---

### LESSON 4: Reading (NEW)
[To be developed]

---

### LESSON 5: Listening (NEW)
[To be developed]

---

### LESSON 6: Writing (NEW)
[To be developed]

---

### LESSON 7: Culture/CLIL (Geography) (NEW)
[To be developed]

---

## 📋 ASSESSMENT CRITERIA (Tiêu chí đánh giá)

- **Vocabulary**: 8-12 words/lesson with IPA
- **Grammar**: 1-2 structures/lesson with full explanation
- **Activities**: 3-4 activities/lesson with type labels
- **Skills balance**: All 4 skills (Listening, Speaking, Reading, Writing)

---

## 🔄 CONVERSION TO TYPESCRIPT

**From Markdown → TypeScript format**:

```typescript
{
  id: 60101,
  title: { en: 'Lesson 1: My Home', vi: 'Bài học 1: Nhà của tôi' },
  aims: {
    en: ['Ask about people\'s homes', 'Use the Present Simple', ...],
    vi: ['Hỏi về nhà của mọi người', 'Sử dụng thì Hiện tại đơn', ...]
  },
  vocabulary: [
    { term: 'pool', pronunciation: '/puːl/', vietnamese: 'hồ bơi' },
    // ... extracted from Vocabulary table
  ],
  grammar: [
    { 
      title: { en: 'Present Simple', vi: 'Thì Hiện tại đơn' },
      explanation: { en: ['...'], vi: ['...'] }
    }
  ],
  activities: [
    { 
      type: 'Warm-up',
      description: { en: '...', vi: '...' }
    },
    // ... extracted from Activities section
  ]
}
```

---

## ✅ CHECKLIST KHI VIẾT MARKDOWN

### For each Unit:
- [ ] Có Tổng quan Unit (Overview)
- [ ] Có 7 Lessons đầy đủ
- [ ] Mỗi Lesson có đủ 4 phần: Aims, Vocabulary, Grammar, Activities

### For Vocabulary:
- [ ] Có bảng với 4 cột: Term | IPA | Vietnamese | Example (optional)
- [ ] Có 8-12 từ chính/lesson
- [ ] Có phần "Từ mở rộng" (Extension)
- [ ] Có phần "Collocations" (nếu có)

### For Grammar:
- [ ] Có Title (tên cấu trúc)
- [ ] Có Explanation (giải thích đầy đủ với Form + Examples)
- [ ] Có phiên bản English và Tiếng Việt
- [ ] Có phần "Common Mistakes" (lỗi thường gặp)
- [ ] Có phần "Practice Patterns" (mẫu câu luyện tập)

### For Activities:
- [ ] Có Type (Warm-up, Vocabulary, Reading, Grammar, Speaking, Writing, Pronunciation, Conversation Skill)
- [ ] Có Description (EN + VI)
- [ ] Có Duration (thời gian)
- [ ] Có Skills (kỹ năng rèn luyện)
- [ ] Có Differentiation cho Weak/Strong students (nếu là Speaking/Writing activity)

---

## 🎯 BEST PRACTICES

### 1. Vocabulary Section
✅ **DO**:
- Luôn cung cấp IPA pronunciation chuẩn
- Thêm example sentences cho từ khó
- Nhóm từ theo chủ đề (nouns, verbs, adjectives)
- Thêm phần "Collocations" cho các từ quan trọng

❌ **DON'T**:
- Chỉ liệt kê từ mà không có phiên âm
- Dùng phiên âm sai hoặc không chuẩn
- Liệt kê quá nhiều từ (>15 words/lesson)

### 2. Grammar Section
✅ **DO**:
- Luôn có cấu trúc Form (+, -, ?)
- Cung cấp ít nhất 3 ví dụ cho mỗi form
- Có phần "Common Mistakes" để tránh lỗi
- Giải thích khi nào dùng (Usage/Function)

❌ **DON'T**:
- Chỉ giải thích mà không có ví dụ
- Không phân biệt các trường hợp đặc biệt
- Giải thích quá phức tạp cho cấp THCS

### 3. Activities Section
✅ **DO**:
- Luôn có Type label rõ ràng
- Cung cấp Duration và Skills
- Thêm Differentiation cho Speaking/Writing
- Liệt kê Materials cần thiết

❌ **DON'T**:
- Mô tả hoạt động quá ngắn gọn, không rõ ràng
- Không có phiên bản Tiếng Việt
- Không phân loại theo Type

### 4. Bilingual Content
✅ **DO**:
- Cung cấp đầy đủ cả English và Tiếng Việt
- Dùng format: `**English**: ... / **Tiếng Việt**: ...`
- Dịch chính xác, dễ hiểu

❌ **DON'T**:
- Chỉ có một ngôn ngữ
- Dịch máy không kiểm tra lại
- Dùng thuật ngữ quá chuyên môn

---

## 📊 EXAMPLE: UNIT 1 - LESSON 1 (FULL)

[See next section for complete example]

---

## 🚀 NEXT STEPS

### Immediate Actions:
1. **Review và chỉnh sửa Grade 6-9 .md files** theo template trên
2. **Thêm IPA pronunciation** cho tất cả vocabulary
3. **Chuẩn hóa Activities** với Type labels
4. **Mở rộng từ 3 Lessons → 7 Lessons/Unit**

### Enhancement Priorities (theo THCS Audit):
1. **Grade 7** (HIGH priority - 5.6 vocab/lesson)
2. **Grade 8** (HIGH priority - 1.2 activities/lesson)
3. **Grade 6** (MEDIUM priority)
4. **Grade 9** (LOW priority - best performing)

### Tools Needed:
- IPA pronunciation generator
- Grammar structure templates
- Activity type taxonomy
- Auto-formatter for markdown tables

---

## 📞 SUPPORT

**For questions or clarifications**:
- Review `THCS_CURRICULUM_PLAN.md` for overall strategy
- Review `THCS_AUDIT_REPORT.md` for current status
- Check TypeScript data structure in `data/sw6.ts` for reference

**Created by**: GitHub Copilot  
**Last updated**: 2025-10-07
