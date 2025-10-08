import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';

interface Props {
  language: 'en' | 'vi';
  onComplete: () => void;
  onSkip: () => void;
}

const LinkPasswordModal: React.FC<Props> = ({ language, onComplete, onSkip }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      title: 'Secure your account',
      subtitle: 'Create a password so you can also sign in with email',
      passwordLabel: 'Password',
      confirmLabel: 'Confirm password',
      submit: 'Set Password',
      skip: 'Skip for now',
      submitting: 'Setting...',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
      success: 'Password set successfully!',
    },
    vi: {
      title: 'Bảo mật tài khoản',
      subtitle: 'Tạo mật khẩu để có thể đăng nhập bằng email',
      passwordLabel: 'Mật khẩu',
      confirmLabel: 'Xác nhận mật khẩu',
      submit: 'Đặt mật khẩu',
      skip: 'Bỏ qua',
      submitting: 'Đang lưu...',
      passwordMismatch: 'Mật khẩu không khớp',
      passwordTooShort: 'Mật khẩu phải có ít nhất 6 ký tự',
      success: 'Đã đặt mật khẩu thành công!',
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }

    setIsSubmitting(true);
    try {
      const user = auth?.currentUser;
      if (!user || !user.email) {
        throw new Error('No current user or email');
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await linkWithCredential(user, credential);
      
      onComplete();
    } catch (err: any) {
      const msg = err?.message?.replace('Firebase: ', '') || 'Failed to set password';
      setError(msg);
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
            <label className="form-label">{t.passwordLabel}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="form-label">{t.confirmLabel}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onSkip}
              className="btn bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex-1"
            >
              {t.skip}
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkPasswordModal;
