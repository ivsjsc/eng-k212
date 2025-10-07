import React, { useState } from 'react';
import type { User } from '../types';

interface Props {
  user: User;
  language: 'en' | 'vi';
  onComplete: (updatedUser: Partial<User>) => Promise<void>;
}

const ProfileSetupModal: React.FC<Props> = ({ user, language, onComplete }) => {
  const [name, setName] = useState(user.name || '');
  const [age, setAge] = useState<number | ''>('');
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      title: 'Complete your profile',
      subtitle: 'Help us personalize your learning experience',
      nameLabel: 'Full name',
      ageLabel: 'Age',
      gradeLevelLabel: user.role === 'student' ? 'Your grade level' : 'Grade level you teach',
      gradeLevelPlaceholder: 'Select...',
      gradeOptions: [
        { value: 'kindergarten-3', label: 'Kindergarten Age 3' },
        { value: 'kindergarten-4', label: 'Kindergarten Age 4' },
        { value: 'kindergarten-5', label: 'Kindergarten Age 5' },
        { value: 'primary-1', label: 'Grade 1' },
        { value: 'primary-2', label: 'Grade 2' },
        { value: 'primary-3', label: 'Grade 3' },
        { value: 'primary-4', label: 'Grade 4' },
        { value: 'primary-5', label: 'Grade 5' },
        { value: 'secondary-6', label: 'Grade 6' },
        { value: 'secondary-7', label: 'Grade 7' },
        { value: 'secondary-8', label: 'Grade 8' },
        { value: 'secondary-9', label: 'Grade 9' },
        { value: 'highschool-10', label: 'Grade 10' },
        { value: 'highschool-11', label: 'Grade 11' },
        { value: 'highschool-12', label: 'Grade 12' },
      ],
      submit: 'Save and Continue',
      submitting: 'Saving...',
    },
    vi: {
      title: 'Hoàn tất hồ sơ',
      subtitle: 'Giúp chúng tôi cá nhân hóa trải nghiệm học tập của bạn',
      nameLabel: 'Họ và tên',
      ageLabel: 'Tuổi',
      gradeLevelLabel: user.role === 'student' ? 'Cấp học hiện tại' : 'Cấp bạn giảng dạy',
      gradeLevelPlaceholder: 'Chọn...',
      gradeOptions: [
        { value: 'kindergarten-3', label: 'Mầm non 3 tuổi' },
        { value: 'kindergarten-4', label: 'Mầm non 4 tuổi' },
        { value: 'kindergarten-5', label: 'Mầm non 5 tuổi' },
        { value: 'primary-1', label: 'Lớp 1' },
        { value: 'primary-2', label: 'Lớp 2' },
        { value: 'primary-3', label: 'Lớp 3' },
        { value: 'primary-4', label: 'Lớp 4' },
        { value: 'primary-5', label: 'Lớp 5' },
        { value: 'secondary-6', label: 'Lớp 6' },
        { value: 'secondary-7', label: 'Lớp 7' },
        { value: 'secondary-8', label: 'Lớp 8' },
        { value: 'secondary-9', label: 'Lớp 9' },
        { value: 'highschool-10', label: 'Lớp 10' },
        { value: 'highschool-11', label: 'Lớp 11' },
        { value: 'highschool-12', label: 'Lớp 12' },
      ],
      submit: 'Lưu và Tiếp tục',
      submitting: 'Đang lưu...',
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onComplete({
        name,
        age: age === '' ? undefined : Number(age),
        gradeLevel,
        profileCompleted: true,
      });
    } catch (err) {
      console.error('Profile setup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="form-label">{t.nameLabel}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">{t.ageLabel}</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
              className="form-input"
              min={3}
              max={100}
            />
          </div>

          <div>
            <label className="form-label">{t.gradeLevelLabel}</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="form-input"
              required
            >
              <option value="">{t.gradeLevelPlaceholder}</option>
              {t.gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
