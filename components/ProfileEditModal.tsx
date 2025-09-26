import React, { useState } from 'react';
import type { User } from '../types';

interface ProfileEditModalProps {
  user: User;
  onSave: (user: User) => void;
  onClose: () => void;
  language: 'en' | 'vi';
}

const avatars = [
  'fa-user-astronaut', 'fa-user-secret', 'fa-user-ninja', 'fa-user-doctor', 
  'fa-user-graduate', 'fa-user-tie', 'fa-user-nurse', 'fa-user-md'
];

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, onSave, onClose, language }) => {
  const [formData, setFormData] = useState<User>(user);

  const t = {
    en: {
      title: "Edit Profile",
      avatarLabel: "Avatar",
      nameLabel: "Name",
      ageLabel: "Age",
      gradeLabel: "Grade Level",
      gradePlaceholder: "e.g., Grade 5",
      titleLabel: "Title",
      titlePlaceholder: "e.g., English Teacher",
      subjectLabel: "Subject(s)",
      subjectPlaceholder: "e.g., English, Literature",
      cancel: "Cancel",
      save: "Save Changes",
    },
    vi: {
      title: "Chỉnh sửa Hồ sơ",
      avatarLabel: "Ảnh đại diện",
      nameLabel: "Tên",
      ageLabel: "Tuổi",
      gradeLabel: "Cấp lớp",
      gradePlaceholder: "VD: Lớp 5",
      titleLabel: "Chức danh",
      titlePlaceholder: "VD: Giáo viên Tiếng Anh",
      subjectLabel: "Môn học",
      subjectPlaceholder: "VD: Tiếng Anh, Văn học",
      cancel: "Hủy",
      save: "Lưu thay đổi",
    }
  }[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData({ ...formData, avatar });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalData = { ...formData };
    if (finalData.role === 'student') {
        delete (finalData as Partial<User>).title;
        delete (finalData as Partial<User>).subject;
    } else if (finalData.role === 'teacher') {
        delete (finalData as Partial<User>).gradeLevel;
    }
    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <form onSubmit={handleSubmit} className="modal-content p-6 w-full max-w-lg m-4 transform transition-all animate-slide-in-up">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-2">{t.avatarLabel}</label>
            <div className="flex flex-wrap gap-3">
              {avatars.map(avatar => (
                <button
                  type="button"
                  key={avatar}
                  onClick={() => handleAvatarChange(avatar)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    formData.avatar === avatar ? 'bg-blue-500 text-white scale-110 ring-2 ring-blue-300' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <i className={`fa-solid ${avatar}`}></i>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.nameLabel}</label>
            <input
              id="name" name="name" type="text"
              value={formData.name} onChange={handleChange}
              className="form-input" required
            />
          </div>

          {user.role === 'student' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.ageLabel}</label>
                <input
                  id="age" name="age" type="number"
                  value={formData.age || ''} onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.gradeLabel}</label>
                <input
                  id="gradeLevel" name="gradeLevel" type="text"
                  value={formData.gradeLevel || ''} onChange={handleChange}
                  className="form-input" placeholder={t.gradePlaceholder}
                />
              </div>
            </div>
          ) : ( // Teacher fields
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.ageLabel}</label>
                  <input
                    id="age" name="age" type="number"
                    value={formData.age || ''} onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.titleLabel}</label>
                  <input
                    id="title" name="title" type="text"
                    value={formData.title || ''} onChange={handleChange}
                    className="form-input" placeholder={t.titlePlaceholder}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.subjectLabel}</label>
                <input
                  id="subject" name="subject" type="text"
                  value={formData.subject || ''} onChange={handleChange}
                  className="form-input" placeholder={t.subjectPlaceholder}
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {t.save}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditModal;