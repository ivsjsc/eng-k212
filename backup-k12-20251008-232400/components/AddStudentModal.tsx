import React, { useState } from 'react';

interface AddStudentModalProps {
  onClose: () => void;
  onAddStudent: (studentName: string) => void;
  language: 'en' | 'vi';
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onAddStudent, language }) => {
  const [studentName, setStudentName] = useState('');

  const t = {
    en: {
      title: "Add New Student",
      label: "Student's Full Name",
      placeholder: "e.g., Nguyen Van An",
      cancel: "Cancel",
      add: "Add Student"
    },
    vi: {
      title: "Thêm Học sinh Mới",
      label: "Họ và Tên Học sinh",
      placeholder: "VD: Nguyễn Văn An",
      cancel: "Hủy",
      add: "Thêm Học sinh"
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      onAddStudent(studentName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <form onSubmit={handleSubmit} className="modal-content p-6 w-full max-w-sm m-4 transform transition-all animate-slide-in-up">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        <div className="mt-6">
          <label htmlFor="studentName" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.label}</label>
          <input
            id="studentName"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="form-input"
            placeholder={t.placeholder}
            required
          />
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {t.add}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentModal;