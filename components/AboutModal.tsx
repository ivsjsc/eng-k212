import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'vi';
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow">IV</div>
            <div>
              <h2 id="about-modal-title" className="text-2xl font-extrabold text-white">IVS English Learning App</h2>
              <div className="text-sm text-slate-300">Nền Tảng Giáo Dục Tiếng Anh Toàn Diện K-12</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/6 hover:bg-white/10 text-white"
              aria-label="Close about dialog"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="max-h-[60vh] overflow-y-auto pr-2 text-slate-200 leading-relaxed space-y-4">
            {/* English short summary for English users */}
            {language === 'en' && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Overview & Highlights</h3>
                <p>
                  IVS English Learning App is a comprehensive K-12 English platform (ages 3-18) combining an extensive curriculum (392 Units, 381 Lessons) with AI-powered personalization. It delivers interactive lessons, real-time feedback, analytics for teachers and parents, and a complete K-12 learning path.
                </p>
              </div>
            )}

            {/* Vietnamese full content (user-provided) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">IVS English Learning App - Nền Tảng Giáo Dục Tiếng Anh Toàn Diện K-12</h3>

              <p>🎓 Tổng Quan & Điểm Vượt Trội</p>
              <p>
                IVS English Learning App là nền tảng học tiếng Anh số hóa toàn diện, bao phủ toàn bộ quá trình học tập từ Mầm non đến THPT (3-18 tuổi). Điểm khác biệt cốt lõi là sự kết hợp giữa hệ thống nội dung học thuật sâu rộng (392 Units, 381 Lessons) và công nghệ Trí tuệ Nhân tạo (AI) để tạo ra trải nghiệm học tập cá nhân hóa triệt để theo từng cấp độ phát triển của học sinh.
              </p>

              <p>🌐 Website: <a href="https://eng.ivsacademy.edu.vn" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://eng.ivsacademy.edu.vn</a></p>
              <p>🎯 Đối tượng: Học sinh từ 3-18 tuổi, Giáo viên, và Phụ huynh.</p>
              <p>🚀 Cam kết: Hoàn thành 100% nội dung chương trình K-12.</p>

              <h4 className="mt-4 font-semibold">📚 Hệ Thống Chương Trình Học và Chiến Lược Cá Nhân Hóa</h4>
              <p>
                Hệ thống IVS áp dụng chiến lược cá nhân hóa phương pháp giảng dạy theo cấp học, đảm bảo tính hiệu quả và phù hợp với tâm lý học tập:
              </p>

              <h5 className="mt-3 font-semibold">🧸 1. Cấp Mầm Non (3-5 tuổi) - Goal Digger Series</h5>
              <p>
                Trọng tâm: Phát triển toàn diện, Học qua trò chơi, Liên kết gia đình (Whole-Child Approach). Phương pháp: Loại bỏ áp lực học thuật. Chỉ tập trung 6-8 từ vựng quen thuộc/lesson và ngữ pháp được tiếp thu tự nhiên qua hoạt động. Hoạt động vượt trội: Tăng cường trò chơi tương tác (Sensory play, charades), hoạt động sáng tạo (Art, music), và đặc biệt là Tăng cường Phối hợp Phụ huynh (Parent Involvement sections) để tạo môi trường song ngữ liền mạch tại nhà. Chương trình: 4 Units (Goal Digger 1-4) với 12 Lessons.
              </p>

              <h5 className="mt-3 font-semibold">🎒 2. Cấp Tiểu Học (6-10 tuổi) - Super Minds Series</h5>
              <p>
                Trọng tâm: Xây dựng nền tảng, Từ vựng, Ngữ pháp có hệ thống. Nội dung: Chương trình chuẩn quốc tế (Super Minds Starter đến Super Minds 4). Thống kê: 58 Units, 39 Lessons, tập trung vào từ vựng có IPA pronunciation và ngữ pháp cơ bản để học sinh làm quen với việc học tập chủ động.
              </p>

              <h5 className="mt-3 font-semibold">🏫 3. Cấp THCS & THPT (11-18 tuổi) - IVS-Mastery Series</h5>
              <p>
                Trọng tâm: Học thuật chuyên sâu, Ứng dụng thực tế, Chuẩn bị Đại học.
              </p>

              <div className="bg-white/3 p-3 rounded-lg mt-2">
                <table className="w-full text-sm text-slate-200">
                  <thead>
                    <tr className="text-left text-slate-300">
                      <th className="pb-2">Cấp học</th>
                      <th className="pb-2">Units</th>
                      <th className="pb-2">Lessons</th>
                      <th className="pb-2">Cấu trúc Lessons/Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pt-2">THCS (6-9)</td>
                      <td className="pt-2">120</td>
                      <td className="pt-2">120</td>
                      <td className="pt-2">3</td>
                    </tr>
                    <tr>
                      <td className="pt-2">THPT (10-12)</td>
                      <td className="pt-2">210</td>
                      <td className="pt-2">210</td>
                      <td className="pt-2">7</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-2">Điểm Vượt Trội của Cấp THPT: Cấu Trúc 7 Bước Chuyên Nghiệp: Mỗi Unit có 7 Lessons (tăng 133% so với THCS), bao gồm đầy đủ các kỹ năng (Reading, Speaking, Listening, Writing) và tích hợp Culture/CLIL (Kiến thức văn hóa/liên môn) ở cấp độ cao.</p>
              <p>Nền Tảng Ngữ Pháp Chuyên Sâu: Cung cấp 150+ điểm ngữ pháp với giải thích Song ngữ (Complete EN + VN) chi tiết, bao gồm cả lỗi sai thường gặp và bảng so sánh cấu trúc.</p>
              <p>Nội dung Academic Nâng Cao: Chuẩn bị từ vựng học thuật và các chủ đề cấp Đại học/Quốc tế (Urbanization, Economic Reforms), cùng với kỹ năng Tư duy phản biện và Nghiên cứu/Thuyết trình cần thiết.</p>
              <p>Khung Đánh Giá Toàn Diện: Tích hợp Success Criteria cho mỗi hoạt động và khả năng Progress Tracking để theo dõi chi tiết hiệu suất học tập.</p>

              <h4 className="mt-4 font-semibold">🚀 Tính năng Nổi Bật & Công Nghệ AI</h4>
              <p>Ứng dụng IVS sử dụng công nghệ tiên tiến, đặc biệt là Trí tuệ Nhân tạo, để tối ưu hóa quá trình giảng dạy và học tập:</p>
              <p>🤖 Trí Tuệ Nhân Tạo (AI) Tích Hợp: Gemini Realtime & IVS Assistant: Trợ lý AI cá nhân hóa, cung cấp phản hồi ngay lập tức, sửa lỗi phát âm/ngữ pháp và giải thích nội dung. AI Content Generator: Tự động tạo bài tập, ví dụ, và nội dung học tập bổ sung dựa trên điểm mạnh/yếu của từng học sinh. Personalized Learning Path: Thiết lập đường học cá nhân hóa dựa trên phân tích dữ liệu, đảm bảo học sinh học đúng nội dung cần thiết.</p>

              <h4 className="mt-4 font-semibold">📊 Phân Tích Dữ Liệu Học Tập</h4>
              <p>Class Analytics Dashboard: Phân tích lớp học chi tiết theo thời gian thực cho giáo viên. Student Progress Tracking: Theo dõi tiến độ học sinh qua từng kỹ năng, từ vựng, ngữ pháp. Learning Insights: Báo cáo thành tích và phân tích điểm mạnh/điểm yếu một cách khoa học.</p>

              <h4 className="mt-4 font-semibold">🎮 Trải Nghiệm Học Tập Hiện Đại</h4>
              <p>Interactive Lessons & Gamification: Bài học tương tác, hệ thống điểm thưởng và huy hiệu giúp tăng tính hấp dẫn và động lực học tập. Real-time Collaboration: Hỗ trợ học nhóm, tương tác trực tuyến giữa học sinh và giáo viên.</p>

              <h4 className="mt-4 font-semibold">🌟 Lợi Ích Cốt Lõi và Giá Trị Mang Lại</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="font-semibold">Học sinh</div>
                  <div>Học tập cá nhân hóa & Hiệu quả — Học theo lộ trình riêng, nội dung chất lượng cao, phát triển kỹ năng toàn diện qua tương tác và game hóa.</div>
                </div>
                <div>
                  <div className="font-semibold">Giáo viên</div>
                  <div>Tối ưu hóa thời gian & Hiệu suất — Tiết kiệm thời gian soạn bài nhờ AI, công cụ quản lý lớp học hiện đại, phân tích dữ liệu chi tiết (Dashboard) để đưa ra quyết định giảng dạy chính xác.</div>
                </div>
                <div>
                  <div className="font-semibold">Phụ huynh</div>
                  <div>Tham gia & Theo dõi sát sao — Theo dõi việc học của con qua báo cáo tiến độ, nhận hướng dẫn phối hợp hiệu quả tại nhà (đặc biệt ở cấp Mầm non).</div>
                </div>
                <div>
                  <div className="font-semibold">Trường học</div>
                  <div>Nâng cao chất lượng & Hiện đại hóa — Tích hợp hệ thống K-12 hoàn chỉnh, nâng cao chất lượng giáo dục, tiết kiệm chi phí vận hành, nâng cao uy tín trường học.</div>
                </div>
              </div>

              <h4 className="mt-4 font-semibold">🎯 Tầm Nhìn & Kết Luận</h4>
              <p>Sứ mệnh: Đem đến trải nghiệm học tiếng Anh hiện đại, hiệu quả cho mọi học sinh Việt Nam.</p>
              <p>Tầm nhìn: Trở thành nền tảng học tiếng Anh số 1 Việt Nam, kết nối giáo dục với công nghệ AI.</p>
              <p className="mt-2">IVS English Learning App là giải pháp giáo dục toàn diện, kết hợp sự hoàn hảo về nội dung chuyên môn (392 Units) với sức mạnh của công nghệ AI, sẵn sàng dẫn dắt học sinh Việt Nam đến tương lai toàn cầu.</p>

              <div className="mt-4 flex gap-3">
                <a href="/auth" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">Đăng ký miễn phí</a>
                <button onClick={onClose} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 hover:bg-white/10 text-white">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
