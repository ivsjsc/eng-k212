import React, { useState } from 'react';

interface DeleteClassModalProps {
  className: string;
  onClose: () => void;
  onConfirm: () => void;
  language: 'en' | 'vi';
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({ className, onClose, onConfirm, language }) => {
  const [confirmText, setConfirmText] = useState('');

  const t = {
    en: {
      title: "Delete Class",
      warning: (name: string) => `Are you sure you want to permanently delete the class "${name}"? This action cannot be undone. All student data associated with this class will be lost.`,
      prompt: `To confirm, please type "DELETE" in the box below.`,
      cancel: "Cancel",
      confirm: "Confirm Delete"
    },
    vi: {
      title: "Xóa Lớp học",
      warning: (name: string) => `Bạn có chắc chắn muốn xóa vĩnh viễn lớp học "${name}" không? Hành động này không thể hoàn tác. Tất cả dữ liệu học sinh liên quan đến lớp này sẽ bị mất.`,
      prompt: `Để xác nhận, vui lòng gõ "DELETE" vào ô bên dưới.`,
      cancel: "Hủy",
      confirm: "Xác nhận Xóa"
    }
  }[language];

  const isConfirmed = confirmText === 'DELETE';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <div className="modal-content p-6 w-full max-w-lg m-4 transform transition-all animate-slide-in-up">
        <div className="flex justify-between items-center border-b pb-3 border-red-500/50">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">{t.title}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-4">
            <p className="text-slate-700 dark:text-slate-300">{t.warning(className)}</p>
            <p className="font-medium text-slate-800 dark:text-slate-200">{t.prompt}</p>
            <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="form-input border-slate-300 dark:border-slate-600 focus:border-red-500 focus:ring-red-500"
                placeholder="DELETE"
            />
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className="btn bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300 disabled:cursor-not-allowed"
            disabled={!isConfirmed}
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClassModal;