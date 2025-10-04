import React, { useState } from 'react';

interface CreateTestModalProps {
  onClose: () => void;
  onCreateTest: (testData: any) => void;
  language: 'en' | 'vi';
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ onClose, onCreateTest, language }) => {
  const [testName, setTestName] = useState('');
  const [testDate, setTestDate] = useState('');
  const [duration, setDuration] = useState('60');
  const [testType, setTestType] = useState<'Oral' | '15-min' | 'Mid-term' | 'Final-term'>('15-min');
  const [totalPoints, setTotalPoints] = useState('100');
  const [instructions, setInstructions] = useState('');

  const t = {
    en: {
      title: "Create New Test/Assessment",
      nameLabel: "Test Name",
      namePlaceholder: "e.g., Unit 3 Vocabulary Quiz",
      dateLabel: "Test Date",
      durationLabel: "Duration (minutes)",
      typeLabel: "Test Type",
      types: {
        oral: "Oral (x1)",
        min15: "15-minute (x1)",
        midterm: "Mid-term (x2)",
        final: "Final-term (x3)"
      },
      totalPointsLabel: "Total Points",
      instructionsLabel: "Instructions & Notes",
      instructionsPlaceholder: "Enter test instructions, topics covered, materials allowed, etc.",
      rubricSection: "Grading Rubric (Optional)",
      rubricInfo: "Define grading criteria and point distribution",
      addCriterion: "Add Criterion",
      cancel: "Cancel",
      create: "Create Test",
      aiGenerate: "Generate with AI",
      validation: {
        nameRequired: "Please enter a test name",
        dateRequired: "Please select a test date"
      }
    },
    vi: {
      title: "Tạo Bài kiểm tra/Đánh giá Mới",
      nameLabel: "Tên Bài kiểm tra",
      namePlaceholder: "VD: Kiểm tra Từ vựng Unit 3",
      dateLabel: "Ngày kiểm tra",
      durationLabel: "Thời lượng (phút)",
      typeLabel: "Loại kiểm tra",
      types: {
        oral: "Miệng (x1)",
        min15: "15 phút (x1)",
        midterm: "Giữa kỳ (x2)",
        final: "Cuối kỳ (x3)"
      },
      totalPointsLabel: "Tổng điểm",
      instructionsLabel: "Hướng dẫn & Ghi chú",
      instructionsPlaceholder: "Nhập hướng dẫn, chủ đề bao quát, tài liệu được phép sử dụng, v.v.",
      rubricSection: "Tiêu chí Chấm điểm (Tùy chọn)",
      rubricInfo: "Xác định tiêu chí chấm điểm và phân bổ điểm",
      addCriterion: "Thêm Tiêu chí",
      cancel: "Hủy",
      create: "Tạo Bài kiểm tra",
      aiGenerate: "Tạo bằng AI",
      validation: {
        nameRequired: "Vui lòng nhập tên bài kiểm tra",
        dateRequired: "Vui lòng chọn ngày kiểm tra"
      }
    }
  }[language];

  const handleSubmit = () => {
    if (!testName.trim()) {
      alert(t.validation.nameRequired);
      return;
    }
    if (!testDate) {
      alert(t.validation.dateRequired);
      return;
    }

    const testData = {
      id: `test-${Date.now()}`,
      name: testName.trim(),
      date: testDate,
      duration: parseInt(duration),
      type: testType,
      totalPoints: parseInt(totalPoints),
      instructions: instructions.trim(),
      createdAt: new Date().toISOString()
    };

    onCreateTest(testData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <div className="modal-content p-6 w-full max-w-2xl m-4 transform transition-all animate-slide-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-4">
          {/* Test Name */}
          <div>
            <label htmlFor="test-name" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.nameLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="test-name"
              type="text"
              className="form-input"
              placeholder={t.namePlaceholder}
              value={testName}
              onChange={e => setTestName(e.target.value)}
            />
          </div>

          {/* Date and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="test-date" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.dateLabel} <span className="text-red-500">*</span>
              </label>
              <input
                id="test-date"
                type="date"
                className="form-input"
                value={testDate}
                onChange={e => setTestDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.durationLabel}
              </label>
              <input
                id="duration"
                type="number"
                className="form-input"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min="1"
              />
            </div>
          </div>

          {/* Test Type and Total Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="test-type" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.typeLabel}
              </label>
              <select
                id="test-type"
                className="form-select"
                value={testType}
                onChange={e => setTestType(e.target.value as any)}
              >
                <option value="Oral">{t.types.oral}</option>
                <option value="15-min">{t.types.min15}</option>
                <option value="Mid-term">{t.types.midterm}</option>
                <option value="Final-term">{t.types.final}</option>
              </select>
            </div>

            <div>
              <label htmlFor="total-points" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.totalPointsLabel}
              </label>
              <input
                id="total-points"
                type="number"
                className="form-input"
                value={totalPoints}
                onChange={e => setTotalPoints(e.target.value)}
                min="1"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.instructionsLabel}
            </label>
            <textarea
              id="instructions"
              className="form-input min-h-[100px]"
              placeholder={t.instructionsPlaceholder}
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>

          {/* Rubric Section */}
          <div className="border dark:border-slate-600 rounded-lg p-4">
            <h4 className="font-medium mb-2">{t.rubricSection}</h4>
            <p className="text-sm text-slate-500 mb-3">{t.rubricInfo}</p>
            <button className="btn btn-secondary-outline text-sm">
              <i className="fa-solid fa-plus mr-2"></i>
              {t.addCriterion}
            </button>
          </div>

          {/* AI Generate Option */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fa-solid fa-wand-magic-sparkles text-purple-500 text-xl mr-3"></i>
                <div>
                  <p className="font-medium">{t.aiGenerate}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'vi' ? 'Tạo câu hỏi tự động dựa trên chủ đề' : 'Auto-generate questions based on topic'}
                  </p>
                </div>
              </div>
              <button className="btn btn-primary text-sm">
                <i className="fa-solid fa-sparkles mr-2"></i>
                {language === 'vi' ? 'Thử ngay' : 'Try Now'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t dark:border-slate-700">
          <button onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            <i className="fa-solid fa-check mr-2"></i>
            {t.create}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;