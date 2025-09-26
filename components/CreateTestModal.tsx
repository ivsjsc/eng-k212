import React from 'react';

interface CreateTestModalProps {
  onClose: () => void;
  language: 'en' | 'vi';
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ onClose, language }) => {
  const t = {
    en: {
      title: "Create New Test",
      placeholder: "This is a placeholder for the test creation form.",
      cancel: "Cancel",
      create: "Create Test"
    },
    vi: {
      title: "Tạo Bài kiểm tra Mới",
      placeholder: "Đây là placeholder cho form tạo bài kiểm tra.",
      cancel: "Hủy",
      create: "Tạo Bài kiểm tra"
    }
  }[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <div className="modal-content p-6 w-full max-w-lg m-4 transform transition-all animate-slide-in-up">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        <div className="mt-4">
          <p className="text-slate-700 dark:text-slate-300">{t.placeholder}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button onClick={onClose} className="btn btn-primary">
            {t.create}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;