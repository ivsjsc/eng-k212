# 📚 Hướng dẫn Nâng cấp Nội dung Chương trình Học (Grade 10-12)

## ✅ CÔNG VIỆC ĐÃ HOÀN THÀNH

### Lớp 10 (g10.ts)

#### ✨ Unit 1: Family Life - **ĐÃ NÂNG CẤP HOÀN CHỈNH**
- **7 bài học chi tiết** thay vì 7 bài sơ sài
- Mỗi bài bao gồm:
  - 3-4 mục tiêu học tập cụ thể (bằng 2 ngôn ngữ)
  - 8-16 từ vựng với phát âm IPA và nghĩa tiếng Việt đầy đủ
  - Ngữ pháp với giải thích chi tiết, ví dụ và cách dùng (bằng 2 ngôn ngữ)
  - 3-4 hoạt động phong phú với mô tả chi tiết từng bước

#### ✨ Unit 2: Humans and the Environment - **ĐÃ NÂNG CẤP HOÀN CHỈNH**
- **6 bài học chi tiết** với cùng cấu trúc chuyên nghiệp
- Tập trung vào: môi trường, biến đổi khí hậu, lối sống xanh
- Ngữ pháp: Future tenses (will vs be going to), Passive Voice

---

## 📋 NHỮNG GÌ ĐÃ ĐƯỢC CẢI THIỆN

### ❌ Trước đây (Sơ sài):
```typescript
{
    title: { en: 'Language', vi: 'Ngôn ngữ' },
    aims: { 
        en: ['Learn vocabulary about family life'], 
        vi: ['Học từ vựng về cuộc sống gia đình'] 
    },
    vocabulary: ['breadwinner', 'housework', 'homemaker'], // Chỉ liệt kê tên
    grammar: ['Present simple vs. Present continuous'], // Không có giải thích
    activities: ['Pronunciation practice'] // Quá ngắn gọn
}
```

### ✅ Bây giờ (Chi tiết, chuyên nghiệp):
```typescript
{
    id: 100102,
    day: 2,
    title: { en: 'Language Focus: Pronunciation, Vocabulary & Grammar', vi: 'Trọng tâm ngôn ngữ: Phát âm, từ vựng & ngữ pháp' },
    aims: { 
        en: [
            'Master the pronunciation of consonant blends /br/, /kr/, and /tr/ in context',
            'Expand vocabulary related to family life, household responsibilities, and gender roles',
            'Understand and correctly use present simple tense to express habits and routines',
            'Distinguish between present simple and present continuous tenses in family contexts'
        ], 
        vi: [
            'Nắm vững cách phát âm các cụm phụ âm /br/, /kr/, và /tr/ trong ngữ cảnh',
            'Mở rộng vốn từ vựng liên quan đến cuộc sống gia đình, trách nhiệm gia đình và vai trò giới',
            'Hiểu và sử dụng đúng thì hiện tại đơn để diễn tả thói quen và hoạt động thường xuyên',
            'Phân biệt giữa thì hiện tại đơn và hiện tại tiếp diễn trong các tình huống gia đình'
        ] 
    },
    vocabulary: [
        { term: 'breadwinner', pronunciation: '/ˈbredwɪnə(r)/', vietnamese: 'trụ cột gia đình (người trụ trì về kinh tế)' },
        { term: 'homemaker', pronunciation: '/ˈhəʊmmeɪkə(r)/', vietnamese: 'người nội trợ' },
        // ... 14 từ khác với phát âm và nghĩa đầy đủ
    ],
    grammar: [
        {
            title: { en: 'Present Simple for Habits and Routines', vi: 'Thì hiện tại đơn cho thói quen và hoạt động thường xuyên' },
            explanation: { 
                en: [
                    'Use: We use present simple to talk about regular habits, daily routines, and general truths.',
                    'Form: Subject + V(base form/s/es) + Object',
                    'Examples: - My father does the cooking every evening...',
                    'Time expressions: every day, usually, often, always...'
                ], 
                vi: [
                    'Cách dùng: Chúng ta dùng thì hiện tại đơn để nói về thói quen đều đặn...',
                    'Cấu trúc: Chủ ngữ + Động từ (nguyên mẫu/thêm s/es) + Tân ngữ',
                    'Ví dụ: - Bố tôi nấu ăn mỗi tối...',
                    'Trạng từ thời gian: every day (mỗi ngày), usually (thường)...'
                ] 
            }
        },
        // ... 2 grammar points khác với giải thích chi tiết
    ],
    activities: [
        { 
            type: 'Pronunciation Practice', 
            description: { 
                en: [
                    'Listen and repeat words with /br/: bread, breakfast, breadwinner...',
                    'Practice sentences: "My brother brings bread for breakfast."'
                ], 
                vi: [
                    'Nghe và lặp lại các từ có /br/: bread, breakfast, breadwinner...',
                    'Luyện các câu: "Anh trai tôi mang bánh mì cho bữa sáng."'
                ] 
            } 
        },
        // ... 2 hoạt động khác với hướng dẫn từng bước
    ]
}
```

---

## 🎯 CẤU TRÚC CHUẨN CHO MỖI BÀI HỌC

### 1. **Lesson Properties (Thuộc tính bài học)**
```typescript
{
    id: number,              // VD: 100101 (Unit 1, Lesson 1)
    day: number,             // Thứ tự bài học trong unit
    title: {en, vi},         // Tiêu đề cụ thể, hấp dẫn
    aims: {en: [], vi: []},  // 3-4 mục tiêu rõ ràng
    vocabulary: [...],       // 8-16 từ
    grammar: [...],          // 1-3 điểm ngữ pháp
    activities: [...]        // 3-4 hoạt động
}
```

### 2. **Vocabulary Structure (Cấu trúc từ vựng)**
```typescript
vocabulary: [
    { 
        term: 'carbon footprint',                    // Từ/cụm từ
        pronunciation: '/ˈkɑːbən ˈfʊtprɪnt/',       // Phiên âm IPA
        vietnamese: 'dấu chân carbon, lượng khí thải carbon'  // Nghĩa tiếng Việt
    },
    // ... 7-15 từ khác
]
```

### 3. **Grammar Structure (Cấu trúc ngữ pháp)**
```typescript
grammar: [
    {
        title: { en: 'Grammar Point Name', vi: 'Tên điểm ngữ pháp' },
        explanation: { 
            en: [
                'Use: When and why to use this grammar',
                'Form: Structure with examples',
                'Examples: 3-5 example sentences',
                'Time expressions: Related words/phrases',
                'Note: Special cases or exceptions'
            ], 
            vi: [
                'Cách dùng: Khi nào và tại sao dùng ngữ pháp này',
                'Cấu trúc: Công thức với ví dụ',
                'Ví dụ: 3-5 câu ví dụ',
                'Trạng từ thời gian: Các từ/cụm từ liên quan',
                'Lưu ý: Trường hợp đặc biệt hoặc ngoại lệ'
            ] 
        }
    }
]
```

### 4. **Activities Structure (Cấu trúc hoạt động)**
```typescript
activities: [
    { 
        type: 'Pre-Reading Discussion',  // Loại hoạt động
        description: { 
            en: [
                'Step 1: Clear instruction',
                'Step 2: Another instruction',
                'Discussion: Open-ended question'
            ], 
            vi: [
                'Bước 1: Hướng dẫn rõ ràng',
                'Bước 2: Hướng dẫn khác',
                'Thảo luận: Câu hỏi mở'
            ] 
        } 
    }
]
```

---

## 🔧 TEMPLATE CHO CÁC UNIT CÒN LẠI

### Các loại bài học phổ biến:

#### **1. Getting Started (Bài mở đầu)**
- **Aims**: Introduce topic, activate prior knowledge, practice vocabulary
- **Vocabulary**: 8-12 từ cơ bản về chủ đề
- **Activities**: Picture description, Listen & Read, Group discussion

#### **2. Language Focus (Trọng tâm ngôn ngữ)**
- **Aims**: Master pronunciation, expand vocabulary, understand grammar
- **Vocabulary**: 12-16 từ chi tiết hơn
- **Grammar**: 2-3 điểm ngữ pháp với giải thích đầy đủ
- **Activities**: Pronunciation drills, Vocabulary exercises, Grammar practice

#### **3. Reading (Đọc)**
- **Aims**: Develop reading skills (skimming, scanning), understand text
- **Vocabulary**: 6-10 từ từ bài đọc
- **Activities**: Pre-reading, While-reading (skim, scan, comprehension), Post-reading discussion

#### **4. Speaking (Nói)**
- **Aims**: Express opinions, discuss topics, use functional language
- **Vocabulary**: 6-8 cụm từ chức năng (functional phrases)
- **Activities**: Useful expressions, Controlled practice, Freer practice (pair/group work)

#### **5. Listening (Nghe)**
- **Aims**: Listen for main ideas and details, take notes
- **Vocabulary**: 6-8 từ khóa
- **Activities**: Pre-listening prediction, While-listening tasks, Post-listening discussion

#### **6. Writing (Viết)**
- **Aims**: Learn text structure, write coherent paragraphs
- **Vocabulary**: 6-8 từ nối và cụm từ viết
- **Activities**: Model analysis, Pre-writing (brainstorm/outline), While-writing, Post-writing (peer editing)

#### **7. Culture/CLIL (Văn hóa)**
- **Aims**: Cross-cultural awareness, apply language to real contexts
- **Vocabulary**: 6-10 từ văn hóa/liên môn
- **Activities**: Reading & discussion, Comparison, Project work

---

## 📝 HƯỚNG DẪN ÁP DỤNG CHO CÁC UNITS CÒN LẠI

### Lớp 10 - Các units cần làm:
- ✅ Unit 1: Family Life - **XONG**
- ✅ Unit 2: Humans and the Environment - **XONG**
- ⏳ Unit 3: Music
- ⏳ Unit 4: For a Better Community
- ⏳ Unit 5: Inventions
- ⏳ Unit 6: Gender Equality
- ⏳ Unit 7: Viet Nam and International Organisations
- ⏳ Unit 8: New Ways to Learn
- ⏳ Unit 9: Protecting the Environment
- ⏳ Unit 10: Ecotourism

### Lớp 11 (g11.ts) - Cần làm lại hoàn toàn:
- Hiện tại: Mỗi unit chỉ có 1 bài "Unit Overview" rất sơ sài
- Cần: Tách thành 6-7 bài học chi tiết như lớp 10

### Lớp 12 (g12.ts) - Cần làm lại hoàn toàn:
- Hiện tại: Mỗi unit chỉ có 1 bài "Unit Overview"
- Cần: Tách thành 6-7 bài học chi tiết như lớp 10

---

## 🚀 BƯỚC TIẾP THEO

### Lựa chọn 1: Tự động hóa (Khuyến nghị)
Tôi có thể tạo một script TypeScript để tự động generate các bài học theo template cho tất cả các units còn lại. Script này sẽ:
- Đọc nội dung hiện tại của từng unit
- Tạo 6-7 bài học theo cấu trúc chuẩn
- Điền nội dung dựa trên chủ đề của unit

### Lựa chọn 2: Làm thủ công từng unit
Tiếp tục như Unit 1 và 2 - làm từng unit một để có nội dung chính xác và chi tiết nhất.

### Lựa chọn 3: Kết hợp
- Dùng script tạo khung cơ bản cho tất cả units
- Sau đó review và bổ sung chi tiết cho từng unit quan trọng

---

## 💡 TIPS QUAN TRỌNG

1. **Aims (Mục tiêu)**: 
   - Luôn bắt đầu bằng động từ hành động (Learn, Practice, Develop, Understand, etc.)
   - Cụ thể và đo lường được
   - 3-4 aims mỗi bài

2. **Vocabulary**:
   - Ưu tiên từ vựng thực tế, hay gặp
   - Phải có phát âm IPA chuẩn
   - Nghĩa tiếng Việt rõ ràng, có thể có giải thích thêm

3. **Grammar**:
   - Giải thích bằng 2 ngôn ngữ
   - Có ví dụ minh họa
   - Có so sánh với các cấu trúc tương tự nếu cần

4. **Activities**:
   - Phải có hướng dẫn từng bước
   - Có hoạt động cá nhân, cặp đôi, và nhóm
   - Có câu hỏi mở để phát triển tư duy

---

## ❓ CÂU HỎI CHO BẠN

**Bạn muốn tôi tiếp tục như thế nào?**

A. Làm chi tiết toàn bộ Unit 3-10 cho lớp 10 (mất nhiều thời gian)
B. Tạo một script tự động để sinh nội dung cho tất cả units (nhanh nhưng cần review sau)
C. Chuyển sang làm lớp 11 và 12 trước
D. Làm một vài unit mẫu cho mỗi lớp, sau đó tôi sẽ tự áp dụng template

---

**Lưu ý**: Việc làm chi tiết cho TOÀN BỘ 10 units lớp 10 + 9 units lớp 11 + 10 units lớp 12 = **29 units** với mỗi unit có **6-7 bài học** sẽ tạo ra một khối lượng công việc rất lớn. Đề xuất của tôi là:

1. ✅ Hoàn thành 2-3 unit mẫu cho mỗi lớp (đã có 2 unit cho lớp 10)
2. Tạo script/tool để sinh nội dung tự động cho các units còn lại
3. Review và tinh chỉnh nội dung được sinh tự động

Bạn muốn như thế nào? 🎯
