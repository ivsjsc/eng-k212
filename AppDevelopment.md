# 📘 English Learners K-12 – Mobile-first Learning Platform

## 🧱 2. Công nghệ đề xuất

| Thành phần | Công nghệ |
|------------|-----------|
| Frontend | React hoặc Next.js  
| Styling | Tailwind CSS  
| Routing | React Router / Next.js routing  
| State | Context API / Zustand  
| Backend | Firebase / Supabase / Node.js  
| CI/CD | Vercel / Netlify  
| AI Feedback | OpenAI API / Azure AI

---

## 📁 3. Cấu trúc thư mục ứng dụng
english-learners-k12-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── modules/
│   ├── data/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   └── styles/
├── .env
├── README.md
└── package.json

---

## 📱 4. Cấu trúc tương tác người dùng

### Tabs chính:

- Home  
- Learn  
- Practice  
- Resources  
- Profile

### Flow học bài:

1. Chọn module → hiển thị danh sách bài học  
2. Mỗi bài gồm: từ vựng, hội thoại, bài tập, video, tài nguyên  
3. Hoàn thành → cập nhật tiến độ → mở bài tiếp theo

---

## 📚 5. Giáo trình cơ bản

### Phần nền tảng (Grades 1-6):

| Module | Nội dung | Kỹ năng |
|--------|----------|--------|
| Basic Vocabulary | Từ vựng cơ bản | Đọc, viết
| Simple Sentences | Câu đơn giản | Ngữ pháp
| Family & Friends | Gia đình & bạn bè | Nghe, nói
| Colors & Shapes | Màu sắc & hình dạng | Nhận biết
| Numbers & Time | Số đếm & thời gian | Toán học
| Animals & Nature | Động vật & thiên nhiên | Khoa học

### Phần nâng cao (Grades 7-12):

| Module | Nội dung | Kỹ năng |
|--------|----------|--------|
| Academic Writing | Viết học thuật | Viết, ngữ pháp
| Public Speaking | Nói trước đám đông | Trình bày
| Debate Skills | Kỹ năng tranh luận | Tư duy phê phán
| Literature Analysis | Phân tích văn học | Đọc hiểu
| Research Skills | Nghiên cứu | Phương pháp
| Cultural Studies | Nghiên cứu văn hóa | Xã hội
| Sales & Marketing | English for Persuasion  
| Human Resources | English for HR  
| Finance & Accounting | English for Finance  
| Logistics | English for Operations  
| IT & Tech | English for Tech Teams  
| Legal | English for Legal Contexts  
| Hospitality | English for Service Excellence

---

## 📅 6. Lộ trình học 30 ngày

| Tuần | Chủ đề | Nội dung |
|------|--------|----------|
| Tuần 1 | Email Writing | Cấu trúc, mẫu, phản hồi  
| Tuần 2 | Meetings | Giao tiếp, phản xạ  
| Tuần 3 | Presentations | Giới thiệu, trình bày  
| Tuần 4 | Negotiation & Culture | Đàm phán, đa văn hóa

---

## 📘 7. Tài nguyên Microsoft tích hợp

| Module | Microsoft Learn | Link |
|--------|------------------|------|
| Digital Literacy | Office Basics | https://learn.microsoft.com/en-us/training/paths/microsoft-365-fundamentals/
| Word Processing | Word for Students | https://learn.microsoft.com/en-us/training/modules/create-and-format-documents-word/
| Presentations | PowerPoint for Education | https://learn.microsoft.com/en-us/training/modules/create-impactful-presentations-powerpoint/
| Data Analysis | Excel for Students | https://learn.microsoft.com/en-us/training/modules/excel-basics/

---

## 📺 8. Video học ngoài giáo trình

| Kênh | Nội dung | Link |
|------|----------|------|
| Tiffani | Giao tiếp, phản xạ | https://www.youtube.com/@SpeakEnglishWithTiffani  
| Lucy | Phát âm, từ vựng | https://www.youtube.com/@EnglishwithLucy  
| BBC | Hội thoại công sở | https://www.youtube.com/@bbclearningenglish  
| Rachel | Phát âm giọng Mỹ | https://www.youtube.com/@RachelsEnglish  
| Hadar | Shadowing, ngữ điệu | https://www.youtube.com/@AccentWayEnglish

---

## 🧠 9. Cấu trúc bài học mẫu

```js
{
  id: "email-01",
  title: "Professional Greetings",
  vocabulary: ["Dear", "Best regards"],
  dialogue: [
    { speaker: "A", text: "Dear Mr. Smith..." },
    { speaker: "B", text: "Thank you for reaching out..." }
  ],
  exercise: {
    type: "fill-in-the-blank",
    question: "___ Mr. Johnson...",
    options: ["Hello", "Dear", "Hi", "Hey"],
    answer: "Dear"
  },
  video: "https://youtube.com/embed/abc123",
  resource: "https://learn.microsoft.com/en-us/training/modules/write-professional-emails-outlook/",
  audioPractice: true
}
⚙️ 10. CI/CD & triển khai
Chiến lược tiết kiệm tài nguyên:
- Tắt Auto Build
- Khóa Deploy
- Chỉ build khi merge vào main
- Ghi chú rõ trong README
Nhánh Git:
|  |  | 
| dev |  | 
| staging |  | 
| main |  | 



🚀 11. Checklist triển khai
- [ ] Tạo repo english-learners-k12-app
- [ ] Cấu hình CI/CD thủ công
- [ ] Đăng ký domain k12.ivsacademy.edu.vn
- [ ] Tạo landing page
- [ ] Tích hợp Microsoft Learn
- [ ] Nhúng video YouTube
- [ ] Thiết kế onboarding flow

---


