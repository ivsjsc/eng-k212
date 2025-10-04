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
        { value: 'kindergarten', label: 'Kindergarten (3-5 years)' },
        { value: 'primary', label: 'Primary (Grade 1-5)' },
        { value: 'secondary', label: 'Secondary (Grade 6-9)' },
        { value: 'high-school', label: 'High School (Grade 10-12)' },
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
        { value: 'kindergarten', label: 'Mầm non (3-5 tuổi)' },
        { value: 'primary', label: 'Tiểu học (Lớp 1-5)' },
        { value: 'secondary', label: 'THCS (Lớp 6-9)' },
        { value: 'high-school', label: 'THPT (Lớp 10-12)' },
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
