import React, { useState } from 'react';
import { Announcement } from '../types';

interface AnnouncementModalProps {
  onClose: () => void;
  onSave: (announcement: Announcement) => void;
  language: 'en' | 'vi';
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ onClose, onSave, language }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [targetAudience, setTargetAudience] = useState<'Students' | 'Parents' | 'Both'>('Students');

  const t = {
    en: {
      title: "Create Announcement",
      titleLabel: "Announcement Title",
      titlePlaceholder: "e.g., Parent-Teacher Meeting Next Week",
      contentLabel: "Message Content",
      contentPlaceholder: "Enter your announcement message here...",
      priorityLabel: "Priority Level",
      priorities: {
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      audienceLabel: "Target Audience",
      audiences: {
        students: "Students Only",
        parents: "Parents Only",
        both: "Students & Parents"
      },
      cancel: "Cancel",
      broadcast: "Broadcast",
      previewInfo: "Recipients will receive this announcement via in-app notifications and email.",
      validation: {
        titleRequired: "Please enter a title",
        contentRequired: "Please enter message content"
      }
    },
    vi: {
      title: "Tạo Thông báo",
      titleLabel: "Tiêu đề Thông báo",
      titlePlaceholder: "VD: Họp Phụ huynh Tuần Tới",
      contentLabel: "Nội dung Thông báo",
      contentPlaceholder: "Nhập nội dung thông báo tại đây...",
      priorityLabel: "Mức độ Ưu tiên",
      priorities: {
        low: "Thấp",
        medium: "Trung bình",
        high: "Cao"
      },
      audienceLabel: "Đối tượng",
      audiences: {
        students: "Chỉ Học sinh",
        parents: "Chỉ Phụ huynh",
        both: "Học sinh & Phụ huynh"
      },
      cancel: "Hủy",
      broadcast: "Gửi đi",
      previewInfo: "Người nhận sẽ nhận được thông báo này qua ứng dụng và email.",
      validation: {
        titleRequired: "Vui lòng nhập tiêu đề",
        contentRequired: "Vui lòng nhập nội dung"
      }
    }
  }[language];

  const handleSubmit = () => {
    if (!title.trim()) {
      alert(t.validation.titleRequired);
      return;
    }
    if (!content.trim()) {
      alert(t.validation.contentRequired);
      return;
    }

    const announcement: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      author: 'Current Teacher',
      priority,
      targetAudience
    };

    onSave(announcement);
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
          {/* Title */}
          <div>
            <label htmlFor="announcement-title" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.titleLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="announcement-title"
              type="text"
              className="form-input"
              placeholder={t.titlePlaceholder}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="announcement-content" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.contentLabel} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="announcement-content"
              className="form-input min-h-[150px]"
              placeholder={t.contentPlaceholder}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          {/* Priority and Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.priorityLabel}
              </label>
              <select
                id="priority"
                className="form-select"
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
              >
                <option value="Low">{t.priorities.low}</option>
                <option value="Medium">{t.priorities.medium}</option>
                <option value="High">{t.priorities.high}</option>
              </select>
            </div>

            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.audienceLabel}
              </label>
              <select
                id="audience"
                className="form-select"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value as any)}
              >
                <option value="Students">{t.audiences.students}</option>
                <option value="Parents">{t.audiences.parents}</option>
                <option value="Both">{t.audiences.both}</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          {(title || content) && (
            <div className="border dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{title || language === 'vi' ? 'Tiêu đề...' : 'Title...'}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  priority === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                  'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {priority === 'High' ? t.priorities.high : priority === 'Medium' ? t.priorities.medium : t.priorities.low}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {content || language === 'vi' ? 'Nội dung thông báo...' : 'Announcement content...'}
              </p>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start">
              <i className="fa-solid fa-info-circle text-blue-500 mt-0.5 mr-2"></i>
              <p className="text-sm text-blue-700 dark:text-blue-300">{t.previewInfo}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t dark:border-slate-700">
          <button onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            <i className="fa-solid fa-bullhorn mr-2"></i>
            {t.broadcast}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
