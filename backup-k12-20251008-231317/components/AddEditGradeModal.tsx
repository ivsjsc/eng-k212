import React, { useState, useEffect } from 'react';
import type { Grade } from '../types';

interface AddEditGradeModalProps {
  grade: Grade | null;
  onSave: (grade: Grade) => void;
  onClose: () => void;
  language: 'en' | 'vi';
}

const AddEditGradeModal: React.FC<AddEditGradeModalProps> = ({ grade, onSave, onClose, language }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState<number | ''>('');
  const [coefficient, setCoefficient] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD

  const t = {
    en: {
      editTitle: "Edit Grade",
      addTitle: "Add New Grade",
      nameLabel: "Name / Type",
      namePlaceholder: "e.g., Mid-term HK1, 15-min Test",
      scoreLabel: "Score (0-10)",
      scorePlaceholder: "e.g., 8.5",
      coeffLabel: "Coefficient",
      dateLabel: "Date",
      cancel: "Cancel",
      save: "Save Changes",
      add: "Add Grade",
      alert: "Please fill in all fields correctly. Score must be between 0 and 10."
    },
    vi: {
      editTitle: "Chỉnh sửa Điểm",
      addTitle: "Thêm Điểm Mới",
      nameLabel: "Tên / Loại Điểm",
      namePlaceholder: "VD: Giữa HK1, Kiểm tra 15 phút",
      scoreLabel: "Điểm (0-10)",
      scorePlaceholder: "VD: 8.5",
      coeffLabel: "Hệ số",
      dateLabel: "Ngày",
      cancel: "Hủy",
      save: "Lưu thay đổi",
      add: "Thêm Điểm",
      alert: "Vui lòng điền đúng tất cả các trường. Điểm phải từ 0 đến 10."
    }
  }[language];

  useEffect(() => {
    if (grade) {
      setName(grade.name);
      setScore(grade.score);
      setCoefficient(grade.coefficient);
      setDate(grade.date);
    }
  }, [grade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && score !== '' && score >= 0 && score <= 10) {
      const savedGrade: Grade = {
        id: grade ? grade.id : '',
        name: name.trim(),
        score: score,
        coefficient,
        date,
      };
      onSave(savedGrade);
    } else {
        alert(t.alert);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] transition-opacity animate-fade-in p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 transform transition-all animate-slide-in-up">
        <div className="flex justify-between items-center mb-6 border-b dark:border-slate-700 pb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {grade ? t.editTitle : t.addTitle}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="gradeName" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.nameLabel}</label>
            <input
              id="gradeName" type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input" placeholder={t.namePlaceholder} required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label htmlFor="score" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.scoreLabel}</label>
                <input
                    id="score" type="number" step="0.1" min="0" max="10" value={score}
                    onChange={(e) => setScore(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="form-input" placeholder={t.scorePlaceholder} required
                />
            </div>
            <div>
                <label htmlFor="coefficient" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.coeffLabel}</label>
                <select 
                    id="coefficient" value={coefficient}
                    onChange={(e) => setCoefficient(Number(e.target.value) as 1 | 2 | 3)}
                    className="form-select"
                >
                    <option value="1">x1</option>
                    <option value="2">x2</option>
                    <option value="3">x3</option>
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.dateLabel}</label>
            <input
              id="date" type="date" value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input" required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {grade ? t.save : t.add}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditGradeModal;