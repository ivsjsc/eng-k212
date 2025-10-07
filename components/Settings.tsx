import React, { useState, useEffect } from 'react';
import type { User, Classes } from '../types';
import ProfileEditModal from './ProfileEditModal';
// FIX: Removed setApiKey and clearApiKey as per API guidelines.
import { isAiConfigured } from '../services/geminiService';
import { auth } from '../services/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, linkWithCredential } from 'firebase/auth';
import { enableSounds, disableSounds, soundsEnabled, setVolume } from '../utils/sound';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
  classes: Classes;
  onUpdateClasses: (classes: Classes) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: 'en' | 'vi';
  setLanguage: (language: 'en' | 'vi') => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  fontWeight: number;
  setFontWeight: (weight: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser, classes, onUpdateClasses, theme, setTheme, language, setLanguage, fontSize, setFontSize, fontWeight, setFontWeight }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [soundVolume, setSoundVolume] = useState<number>(0.14);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'appearance' | 'data' | 'ai'>('profile');
  
  // Account tab states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const getGradeLevelDisplay = (gradeLevel: string | undefined, language: 'en' | 'vi') => {
    if (!gradeLevel) return 'N/A';

    const gradeLabels: Record<string, { en: string; vi: string }> = {
      'kindergarten-3': { en: 'Kindergarten Age 3', vi: 'Mầm non 3 tuổi' },
      'kindergarten-4': { en: 'Kindergarten Age 4', vi: 'Mầm non 4 tuổi' },
      'kindergarten-5': { en: 'Kindergarten Age 5', vi: 'Mầm non 5 tuổi' },
      'primary-1': { en: 'Grade 1', vi: 'Lớp 1' },
      'primary-2': { en: 'Grade 2', vi: 'Lớp 2' },
      'primary-3': { en: 'Grade 3', vi: 'Lớp 3' },
      'primary-4': { en: 'Grade 4', vi: 'Lớp 4' },
      'primary-5': { en: 'Grade 5', vi: 'Lớp 5' },
      'secondary-6': { en: 'Grade 6', vi: 'Lớp 6' },
      'secondary-7': { en: 'Grade 7', vi: 'Lớp 7' },
      'secondary-8': { en: 'Grade 8', vi: 'Lớp 8' },
      'secondary-9': { en: 'Grade 9', vi: 'Lớp 9' },
      'highschool-10': { en: 'Grade 10', vi: 'Lớp 10' },
      'highschool-11': { en: 'Grade 11', vi: 'Lớp 11' },
      'highschool-12': { en: 'Grade 12', vi: 'Lớp 12' },
      // Fallback for old format
      'kindergarten': { en: 'Kindergarten', vi: 'Mầm non' },
      'primary': { en: 'Primary School', vi: 'Tiểu học' },
      'secondary': { en: 'Secondary School', vi: 'THCS' },
      'highschool': { en: 'High School', vi: 'THPT' },
    };

    return gradeLabels[gradeLevel]?.[language] || gradeLevel;
  };

  useEffect(() => {
    setAiStatus(isAiConfigured());
    // Check if user has password provider
    const currentUser = auth?.currentUser;
    if (currentUser) {
      const hasEmailProvider = currentUser.providerData.some(p => p.providerId === 'password');
      setHasPassword(hasEmailProvider);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ivs-sounds-enabled');
      const vol = localStorage.getItem('ivs-sounds-volume');
      // Default to ENABLED if not set (first time user)
      let enabled = true;
      if (saved === null) {
        localStorage.setItem('ivs-sounds-enabled', '1');
        enabled = true;
      } else {
        enabled = saved === '1';
      }
      const volNum = vol ? parseFloat(vol) : 0.14;
      setSoundEnabled(enabled);
      setSoundVolume(volNum);
      if (enabled) enableSounds('/sounds');
      try { setVolume('click', volNum); setVolume('confirm', volNum); setVolume('cancel', volNum); setVolume('open', volNum); setVolume('close', volNum); setVolume('notification', volNum); } catch (e) { }
    } catch (err) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // FIX: Updated translations to remove user-facing API key management text.
  const t = {
    en: {
        title: "Settings",
        subtitle: "Manage your profile and application preferences.",
        tabProfile: "Profile",
        tabAccount: "Account",
        tabAppearance: "Appearance",
        tabData: "Data",
        tabAI: "AI Settings",
        profileTitle: "Profile",
        role: "Role",
        student: "Student",
        teacher: "Teacher",
        grade: "Grade",
        subject: "Subject",
        editProfile: "Edit Profile",
        roleTitle: "Role",
        roleDesc: "Switching your role will change the app's layout and available features to better suit your needs.",
        roleConfirm: (role: string) => `Are you sure you want to switch to the ${role} role? This will change your dashboard and available features.`,
        accountTitle: "Account Security",
        accountEmail: "Email",
        accountProvider: "Sign-in method",
        changePassword: "Change Password",
        setPassword: "Set Password",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmPassword: "Confirm password",
        passwordUpdated: "Password updated successfully!",
        passwordSet: "Password set successfully! You can now sign in with email and password.",
        passwordMismatch: "Passwords do not match",
        passwordTooShort: "Password must be at least 6 characters",
        passwordWeak: "Password is too weak",
        wrongPassword: "Current password is incorrect",
        savingPassword: "Saving...",
        appearanceTitle: "Appearance & Language",
        themeTitle: "Theme",
        light: "Light",
        dark: "Dark",
        languageTitle: "Language",
        fontSettingsTitle: "Font Settings",
        fontSize: "Font Size",
        fontSmall: "Small",
        fontNormal: "Normal",
        fontLarge: "Large",
        fontWeight: "Font Weight",
        fontLight: "Light",
        fontRegular: "Normal",
        dataTitle: "Data Management",
        backup: "Backup Data",
        restore: "Restore Data",
        dataDesc: "Save your profile, classes, and settings to a file, or restore from a backup.",
        restoreSuccess: "Data restored successfully!",
        restoreInvalid: "Invalid backup file format.",
        restoreFail: "Failed to read or parse the backup file.",
        aiSettingsTitle: "AI Settings",
        aiStatusLabel: "AI Services Status:",
        aiStatusActive: "Active",
        aiStatusInactive: "Inactive",
        aiDesc: "AI-powered features like Writing Grader and Speaking Partner are enabled by an administrator. If services are inactive, please contact support.",
    },
    vi: {
        title: "Cài đặt",
        subtitle: "Quản lý hồ sơ và tùy chọn ứng dụng của bạn.",
        tabProfile: "Hồ sơ",
        tabAccount: "Tài khoản",
        tabAppearance: "Giao diện",
        tabData: "Dữ liệu",
        tabAI: "Cài đặt AI",
        profileTitle: "Hồ sơ",
        role: "Vai trò",
        student: "Học sinh",
        teacher: "Giáo viên",
        grade: "Cấp lớp",
        subject: "Môn học",
        editProfile: "Chỉnh sửa Hồ sơ",
        roleTitle: "Vai trò",
        roleDesc: "Chuyển đổi vai trò sẽ thay đổi giao diện và các tính năng có sẵn của ứng dụng để phù hợp hơn với nhu cầu của bạn.",
        roleConfirm: (role: string) => `Bạn có chắc chắn muốn chuyển sang vai trò ${role} không? Điều này sẽ thay đổi bảng điều khiển và các tính năng có sẵn của bạn.`,
        accountTitle: "Bảo mật Tài khoản",
        accountEmail: "Email",
        accountProvider: "Phương thức đăng nhập",
        changePassword: "Đổi mật khẩu",
        setPassword: "Đặt mật khẩu",
        currentPassword: "Mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        confirmPassword: "Xác nhận mật khẩu",
        passwordUpdated: "Đã cập nhật mật khẩu thành công!",
        passwordSet: "Đã đặt mật khẩu thành công! Bây giờ bạn có thể đăng nhập bằng email và mật khẩu.",
        passwordMismatch: "Mật khẩu không khớp",
        passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự",
        passwordWeak: "Mật khẩu quá yếu",
        wrongPassword: "Mật khẩu hiện tại không đúng",
        savingPassword: "Đang lưu...",
        appearanceTitle: "Giao diện & Ngôn ngữ",
        themeTitle: "Chủ đề",
        light: "Sáng",
        dark: "Tối",
        languageTitle: "Ngôn ngữ",
        fontSettingsTitle: "Cài đặt Font chữ",
        fontSize: "Cỡ chữ",
        fontSmall: "Nhỏ",
        fontNormal: "Vừa",
        fontLarge: "Lớn",
        fontWeight: "Độ đậm",
        fontLight: "Nhạt",
        fontRegular: "Thường",
        dataTitle: "Quản lý Dữ liệu",
        backup: "Sao lưu Dữ liệu",
        restore: "Phục hồi Dữ liệu",
        dataDesc: "Lưu hồ sơ, lớp học và cài đặt của bạn vào một tệp, hoặc khôi phục từ một bản sao lưu.",
        restoreSuccess: "Dữ liệu đã được khôi phục thành công!",
        restoreInvalid: "Định dạng tệp sao lưu không hợp lệ.",
        restoreFail: "Không thể đọc hoặc phân tích tệp sao lưu.",
        aiSettingsTitle: "Cài đặt AI",
        aiStatusLabel: "Trạng thái Dịch vụ AI:",
        aiStatusActive: "Hoạt động",
        aiStatusInactive: "Không hoạt động",
        aiDesc: "Các tính năng AI như Chấm bài viết và Luyện nói được quản trị viên kích hoạt. Nếu dịch vụ không hoạt động, vui lòng liên hệ bộ phận hỗ trợ.",
    }
  }[language];

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('ivs-theme', newTheme);
    // Only apply theme to settings modal, not entire app
    const settingsModal = document.querySelector('[data-settings-modal]');
    if (settingsModal) {
      if (newTheme === 'dark') {
        settingsModal.classList.add('dark');
      } else {
        settingsModal.classList.remove('dark');
      }
    }
  };

  const handleRoleChange = (newRole: 'student' | 'teacher') => {
    if (user.role === newRole) return;
    const translatedRole = newRole === 'student' ? t.student : t.teacher;

    if (window.confirm(t.roleConfirm(translatedRole))) {
      const baseUser: Partial<User> = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        points: user.points,
        badges: user.badges,
        streak: user.streak,
        pinnedCourses: user.pinnedCourses,
        age: user.age,
        gender: user.gender,
        level: user.level,
      };

      let updatedUser: User;

      if (newRole === 'teacher') {
        updatedUser = {
          ...baseUser,
          role: 'teacher',
          title: user.title || 'English Teacher',
          subject: user.subject || 'English, Literature',
        } as User;
      } else { // newRole === 'student'
        updatedUser = {
          ...baseUser,
          role: 'student',
          gradeLevel: user.gradeLevel || '',
        } as User;
      }
      onUpdateUser(updatedUser);
    }
  };
  
  const handleBackup = () => {
    const dataToBackup = {
        user,
        classes,
        settings: {
            theme,
            language,
            fontSize,
            fontWeight,
        }
    };
    const jsonString = JSON.stringify(dataToBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ivs-english-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const result = e.target?.result;
            if (typeof result === 'string') {
                const data = JSON.parse(result);
                if (data.user && data.classes && data.settings) {
                    onUpdateUser(data.user);
                    onUpdateClasses(data.classes);
                    handleThemeChange(data.settings.theme || 'light');
                    setLanguage(data.settings.language || 'en');
                    setFontSize(data.settings.fontSize || '16px');
                    setFontWeight(data.settings.fontWeight || 400);
                    alert(t.restoreSuccess);
                } else {
                    alert(t.restoreInvalid);
                }
            }
        } catch (error) {
            console.error("Failed to restore data:", error);
            alert(t.restoreFail);
        }
    };
    reader.readAsText(file);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError(t.passwordMismatch);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(t.passwordTooShort);
      return;
    }

    setIsChangingPassword(true);

    try {
      const currentUser = auth?.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No authenticated user');
      }

      if (hasPassword) {
        // User already has password - change it
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        setPasswordSuccess(t.passwordUpdated);
      } else {
        // User signed in with Google - link password
        const credential = EmailAuthProvider.credential(currentUser.email, newPassword);
        await linkWithCredential(currentUser, credential);
        setHasPassword(true);
        setPasswordSuccess(t.passwordSet);
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
      if (err.code === 'auth/wrong-password') {
        setPasswordError(t.wrongPassword);
      } else if (err.code === 'auth/weak-password') {
        setPasswordError(t.passwordWeak);
      } else {
        setPasswordError(err.message?.replace('Firebase: ', '') || 'Failed to update password');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in" data-settings-modal>
        <div className="text-center mb-8">
            <i className="fa-solid fa-cog text-5xl text-blue-500 mb-4"></i>
            <h1 className="text-4xl font-bold">{t.title}</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <i className="fa-solid fa-user mr-2"></i>{t.tabProfile}
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <i className="fa-solid fa-shield-halved mr-2"></i>{t.tabAccount}
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'appearance' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <i className="fa-solid fa-palette mr-2"></i>{t.tabAppearance}
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'data' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <i className="fa-solid fa-database mr-2"></i>{t.tabData}
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'ai' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <i className="fa-solid fa-robot mr-2"></i>{t.tabAI}
          </button>
        </div>

        <div className="space-y-8">
        <div className="text-right">
          <button onClick={() => window.open(window.location.origin + '/IVS_APP_INTRODUCTION.md', '_blank', 'noopener')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm text-white/90">
            <i className="fa-solid fa-info-circle"></i>
            About
          </button>
        </div>
            {activeTab === 'profile' && (
              <>
                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4">{t.profileTitle}</h2>
                  <div className="flex items-center gap-6 mb-6">
                      {/* show image avatar when available, fallback to font-awesome */}
                      {/* import Avatar lazily to avoid changing bundle significantly */}
                      <img src={user.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('/')) ? user.avatar : `/images/avatars/${user.avatar}.svg`} alt="avatar" className="w-16 h-16 rounded-full" />
                      <div className="flex-grow">
                          <p className="text-xl font-bold">{user.name}</p>
                          <p className="text-slate-500 dark:text-slate-400 capitalize">{user.role === 'student' ? t.student : t.teacher}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.role === 'student' ? `${t.grade}: ${getGradeLevelDisplay(user.gradeLevel, language)}` : `${t.subject}: ${user.subject || 'N/A'}`}
                          </p>
                      </div>
                      <button onClick={() => setIsEditModalOpen(true)} className="btn btn-secondary">
                          <i className="fa-solid fa-pen-to-square mr-2"></i> {t.editProfile}
                      </button>
                  </div>
                  
                  {/* Grade Level Editor for Students */}
                  {user.role === 'student' && (
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <label className="block text-sm font-semibold mb-2">{t.grade}</label>
                      <select
                        value={user.gradeLevel || ''}
                        onChange={(e) => {
                          const updatedUser = { ...user, gradeLevel: e.target.value };
                          onUpdateUser(updatedUser);
                        }}
                        className="form-input w-full max-w-md"
                      >
                        <option value="">{language === 'vi' ? 'Chọn cấp lớp' : 'Select grade level'}</option>
                        <optgroup label={language === 'vi' ? 'Mầm non' : 'Kindergarten'}>
                          <option value="kindergarten-3">{language === 'vi' ? 'Mầm non 3 tuổi' : 'Kindergarten Age 3'}</option>
                          <option value="kindergarten-4">{language === 'vi' ? 'Mầm non 4 tuổi' : 'Kindergarten Age 4'}</option>
                          <option value="kindergarten-5">{language === 'vi' ? 'Mầm non 5 tuổi' : 'Kindergarten Age 5'}</option>
                        </optgroup>
                        <optgroup label={language === 'vi' ? 'Tiểu học' : 'Primary School'}>
                          <option value="primary-1">{language === 'vi' ? 'Lớp 1' : 'Grade 1'}</option>
                          <option value="primary-2">{language === 'vi' ? 'Lớp 2' : 'Grade 2'}</option>
                          <option value="primary-3">{language === 'vi' ? 'Lớp 3' : 'Grade 3'}</option>
                          <option value="primary-4">{language === 'vi' ? 'Lớp 4' : 'Grade 4'}</option>
                          <option value="primary-5">{language === 'vi' ? 'Lớp 5' : 'Grade 5'}</option>
                        </optgroup>
                        <optgroup label={language === 'vi' ? 'Trung học Cơ sở' : 'Secondary School'}>
                          <option value="secondary-6">{language === 'vi' ? 'Lớp 6' : 'Grade 6'}</option>
                          <option value="secondary-7">{language === 'vi' ? 'Lớp 7' : 'Grade 7'}</option>
                          <option value="secondary-8">{language === 'vi' ? 'Lớp 8' : 'Grade 8'}</option>
                          <option value="secondary-9">{language === 'vi' ? 'Lớp 9' : 'Grade 9'}</option>
                        </optgroup>
                        <optgroup label={language === 'vi' ? 'Trung học Phổ thông' : 'High School'}>
                          <option value="highschool-10">{language === 'vi' ? 'Lớp 10' : 'Grade 10'}</option>
                          <option value="highschool-11">{language === 'vi' ? 'Lớp 11' : 'Grade 11'}</option>
                          <option value="highschool-12">{language === 'vi' ? 'Lớp 12' : 'Grade 12'}</option>
                        </optgroup>
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {language === 'vi' ? 'Chọn cấp lớp chính xác để hệ thống hiển thị chương trình học phù hợp nhất với trình độ của bạn.' : 'Select your exact grade level to display the most appropriate curriculum for your learning level.'}
                      </p>
                    </div>
                  )}
                </section>
                
                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4">{t.roleTitle}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t.roleDesc}</p>
                  <div className="flex gap-2">
                      <button onClick={() => handleRoleChange('student')} className={`btn flex-1 ${user.role === 'student' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                          <i className="fa-solid fa-user-graduate mr-2"></i> {t.student}
                      </button>
                      <button onClick={() => handleRoleChange('teacher')} className={`btn flex-1 ${user.role === 'teacher' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                          <i className="fa-solid fa-chalkboard-user mr-2"></i> {t.teacher}
                      </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'account' && (
              <section className="card-glass p-6">
                <h2 className="text-2xl font-bold mb-4">{t.accountTitle}</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t.accountEmail}</label>
                    <p className="text-slate-600 dark:text-slate-400">{auth?.currentUser?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t.accountProvider}</label>
                    <div className="flex gap-2 flex-wrap">
                      {auth?.currentUser?.providerData.map((provider, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {provider.providerId === 'google.com' && <><i className="fa-brands fa-google mr-1"></i>Google</>}
                          {provider.providerId === 'password' && <><i className="fa-solid fa-key mr-1"></i>Email/Password</>}
                          {provider.providerId === 'phone' && <><i className="fa-solid fa-phone mr-1"></i>Phone</>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <h3 className="text-xl font-bold">{hasPassword ? t.changePassword : t.setPassword}</h3>
                  
                  {hasPassword && (
                    <div>
                      <label className="form-label">{t.currentPassword}</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="form-label">{t.newPassword}</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-input"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="form-label">{t.confirmPassword}</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-input"
                      required
                      minLength={6}
                    />
                  </div>

                  {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                  {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? t.savingPassword : (hasPassword ? t.changePassword : t.setPassword)}
                  </button>
                </form>
              </section>
            )}

            {activeTab === 'appearance' && (
              <>
                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4">{t.appearanceTitle}</h2>
                  
                  {/* Enhanced Theme Selector with Preview Cards */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-palette"></i>
                      {t.themeTitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Light Theme Card */}
                      <button 
                        onClick={() => handleThemeChange('light')}
                        className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          theme === 'light' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg ring-2 ring-blue-300' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        {/* Preview Card */}
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-slate-200">
                          <div className="h-2 bg-slate-200 rounded mb-2"></div>
                          <div className="h-2 bg-slate-100 rounded w-3/4 mb-2"></div>
                          <div className="h-1 bg-slate-100 rounded w-1/2"></div>
                        </div>
                        {/* Title */}
                        <div className="flex items-center justify-center gap-2">
                          <i className="fa-solid fa-sun text-2xl text-yellow-500"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{t.light}</span>
                        </div>
                        {/* Checkmark Badge */}
                        {theme === 'light' && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-check text-sm"></i>
                          </div>
                        )}
                      </button>

                      {/* Dark Theme Card */}
                      <button 
                        onClick={() => handleThemeChange('dark')}
                        className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          theme === 'dark' 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg ring-2 ring-purple-300' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-purple-400'
                        }`}
                      >
                        {/* Preview Card */}
                        <div className="bg-slate-800 rounded-lg p-3 mb-3 shadow-sm border border-slate-700">
                          <div className="h-2 bg-slate-600 rounded mb-2"></div>
                          <div className="h-2 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-1 bg-slate-700 rounded w-1/2"></div>
                        </div>
                        {/* Title */}
                        <div className="flex items-center justify-center gap-2">
                          <i className="fa-solid fa-moon text-2xl text-purple-500"></i>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{t.dark}</span>
                        </div>
                        {/* Checkmark Badge */}
                        {theme === 'dark' && (
                          <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-check text-sm"></i>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-globe"></i>
                      {t.languageTitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setLanguage('en')} 
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 flex items-center justify-center gap-3 ${
                          language === 'en' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg ring-2 ring-blue-300' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        <span className="text-3xl">🇺🇸</span>
                        <span className="font-bold text-lg">English</span>
                        {language === 'en' && (
                          <i className="fa-solid fa-check text-blue-500 ml-auto"></i>
                        )}
                      </button>
                      <button 
                        onClick={() => setLanguage('vi')} 
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 flex items-center justify-center gap-3 ${
                          language === 'vi' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg ring-2 ring-blue-300' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        <span className="text-3xl">🇻🇳</span>
                        <span className="font-bold text-lg">Tiếng Việt</span>
                        {language === 'vi' && (
                          <i className="fa-solid fa-check text-blue-500 ml-auto"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </section>

                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-volume-high text-blue-500"></i>
                    {language === 'en' ? 'UI Sounds' : 'Âm thanh giao diện'}
                  </h2>
                  
                  <div className="flex flex-col gap-4">
                    {/* Sound Toggle with Enhanced UI */}
                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      soundEnabled 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={soundEnabled} 
                        onChange={(e) => {
                          const on = e.target.checked;
                          setSoundEnabled(on);
                          localStorage.setItem('ivs-sounds-enabled', on ? '1' : '0');
                          if (on) {
                            enableSounds('/sounds');
                            // Play test sound
                            try {
                              const audio = new Audio('/sounds/click.mp3');
                              audio.volume = soundVolume;
                              audio.play().catch(() => {});
                            } catch (e) {}
                          } else {
                            disableSounds();
                          }
                        }} 
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-lg">
                          {language === 'en' ? 'Enable UI Sounds' : 'Bật âm thanh giao diện'}
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {language === 'en' 
                            ? 'Play sounds when clicking buttons and interacting with the interface' 
                            : 'Phát âm thanh khi nhấn nút và tương tác với giao diện'}
                        </p>
                      </div>
                      {soundEnabled && (
                        <i className="fa-solid fa-check-circle text-2xl text-green-500"></i>
                      )}
                    </label>

                    {/* Volume Slider with Visual Indicator */}
                    {soundEnabled && (
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <label className="font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-volume-low text-slate-400"></i>
                            {language === 'en' ? 'Volume' : 'Âm lượng'}
                          </label>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {Math.round(soundVolume * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-volume-off text-slate-400"></i>
                          <input 
                            type="range" 
                            min={0} 
                            max={1} 
                            step={0.01} 
                            value={soundVolume} 
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              setSoundVolume(v);
                              localStorage.setItem('ivs-sounds-volume', v.toString());
                              try { 
                                setVolume('click', v); 
                                setVolume('confirm', v); 
                                setVolume('cancel', v); 
                                setVolume('open', v); 
                                setVolume('close', v); 
                                setVolume('notification', v); 
                              } catch (e) { }
                            }} 
                            className="flex-1 h-2"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${soundVolume * 100}%, #e5e7eb ${soundVolume * 100}%, #e5e7eb 100%)`
                            }}
                          />
                          <i className="fa-solid fa-volume-high text-blue-500"></i>
                        </div>
                        {/* Test Button */}
                        <button
                          onClick={() => {
                            try {
                              const audio = new Audio('/sounds/notification.mp3');
                              audio.volume = soundVolume;
                              audio.play().catch(() => {});
                            } catch (e) {}
                          }}
                          className="btn btn-secondary mt-3 w-full"
                        >
                          <i className="fa-solid fa-play mr-2"></i>
                          {language === 'en' ? 'Test Sound' : 'Kiểm tra âm thanh'}
                        </button>
                      </div>
                    )}

                    {/* Warning if sounds folder doesn't exist */}
                    {soundEnabled && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg text-sm">
                        <p className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                          <i className="fa-solid fa-info-circle"></i>
                          {language === 'en' 
                            ? 'Sound files should be placed in /public/sounds/ folder. See README for details.' 
                            : 'File âm thanh cần được đặt trong thư mục /public/sounds/. Xem README để biết chi tiết.'}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-keyboard text-purple-500"></i>
                    {language === 'en' ? 'Keyboard Shortcuts' : 'Phím tắt'}
                  </h2>
                  
                  <div className="flex flex-col gap-4">
                    {/* Enhanced Toggle with Better UX */}
                    <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      localStorage.getItem('ivs-enable-shortcuts') === '1'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                        : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                    }`}>
                      <input 
                        type="checkbox" 
                        defaultChecked={localStorage.getItem('ivs-enable-shortcuts') === '1'} 
                        onChange={(e) => {
                          const on = e.target.checked;
                          try {
                            localStorage.setItem('ivs-enable-shortcuts', on ? '1' : '0');
                          } catch (err) {}
                          // Better feedback - offer to reload
                          if (window.confirm(
                            language === 'en'
                              ? 'Keyboard shortcuts updated! Would you like to reload the page to apply changes now?'
                              : 'Đã cập nhật phím tắt! Bạn có muốn tải lại trang để áp dụng ngay không?'
                          )) {
                            window.location.reload();
                          }
                        }} 
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-lg">
                          {language === 'en' ? 'Enable Global Shortcuts' : 'Bật phím tắt toàn cục'}
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {language === 'en' 
                            ? 'Use keyboard shortcuts for faster navigation and actions. Press ? to see all shortcuts.' 
                            : 'Sử dụng phím tắt để điều hướng và thao tác nhanh hơn. Nhấn ? để xem tất cả phím tắt.'}
                        </p>
                      </div>
                      {localStorage.getItem('ivs-enable-shortcuts') === '1' && (
                        <i className="fa-solid fa-check-circle text-2xl text-purple-500"></i>
                      )}
                    </label>

                    {/* Shortcut Quick Reference */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-lightbulb text-yellow-500"></i>
                        {language === 'en' ? 'Quick Reference' : 'Tham khảo nhanh'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">?</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Show all shortcuts' : 'Hiện tất cả phím tắt'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">Esc</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Close/Go back' : 'Đóng/Quay lại'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">Ctrl</kbd>
                          <span className="text-xs">+</span>
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">F</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Global search' : 'Tìm kiếm toàn cục'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">Ctrl</kbd>
                          <span className="text-xs">+</span>
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">K</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Open sidebar' : 'Mở thanh bên'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">↑↓←→</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Navigate items' : 'Điều hướng'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">Ctrl</kbd>
                          <span className="text-xs">+</span>
                          <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border text-xs font-mono">S</kbd>
                          <span className="text-slate-600 dark:text-slate-400">
                            {language === 'en' ? 'Save (context)' : 'Lưu (ngữ cảnh)'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Trigger the keyboard help modal
                          window.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
                        }}
                        className="btn btn-secondary mt-3 w-full"
                      >
                        <i className="fa-solid fa-list mr-2"></i>
                        {language === 'en' ? 'View All Shortcuts' : 'Xem tất cả phím tắt'}
                      </button>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg text-sm">
                      <p className="flex items-start gap-2 text-blue-800 dark:text-blue-200">
                        <i className="fa-solid fa-star text-yellow-500 mt-0.5"></i>
                        <span>
                          <strong>{language === 'en' ? 'Pro Tip:' : 'Mẹo:'}</strong>{' '}
                          {language === 'en' 
                            ? 'Keyboard shortcuts are enabled by default for new users. You can always toggle them here.' 
                            : 'Phím tắt được bật mặc định cho người dùng mới. Bạn có thể bật/tắt bất cứ lúc nào.'}
                        </span>
                      </p>
                    </div>
                  </div>
                </section>

                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4">{t.fontSettingsTitle}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <h3 className="text-lg font-semibold mb-2">{t.fontSize}</h3>
                          <div className="flex gap-2">
                              <button onClick={() => setFontSize('14px')} className={`btn flex-1 ${fontSize === '14px' ? 'btn-primary' : 'btn-secondary-outline'}`}>{t.fontSmall}</button>
                              <button onClick={() => setFontSize('16px')} className={`btn flex-1 ${fontSize === '16px' ? 'btn-primary' : 'btn-secondary-outline'}`}>{t.fontNormal}</button>
                              <button onClick={() => setFontSize('18px')} className={`btn flex-1 ${fontSize === '18px' ? 'btn-primary' : 'btn-secondary-outline'}`}>{t.fontLarge}</button>
                          </div>
                      </div>
                       <div>
                          <h3 className="text-lg font-semibold mb-2">{t.fontWeight}</h3>
                          <div className="flex gap-2">
                              <button onClick={() => setFontWeight(300)} className={`btn flex-1 ${fontWeight === 300 ? 'btn-primary' : 'btn-secondary-outline'}`}>{t.fontLight}</button>
                              <button onClick={() => setFontWeight(400)} className={`btn flex-1 ${fontWeight === 400 ? 'btn-primary' : 'btn-secondary-outline'}`}>{t.fontRegular}</button>
                          </div>
                      </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'data' && (
              <section className="card-glass p-6">
                <h2 className="text-2xl font-bold mb-4">{t.dataTitle}</h2>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button onClick={handleBackup} className="btn btn-primary w-full sm:w-auto">
                        <i className="fa-solid fa-download mr-2"></i> {t.backup}
                    </button>
                    <label className="btn btn-secondary w-full sm:w-auto cursor-pointer">
                        <i className="fa-solid fa-upload mr-2"></i> {t.restore}
                        <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
                    </label>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-0 sm:ml-4">
                        {t.dataDesc}
                    </p>
                </div>
              </section>
            )}

            {activeTab === 'ai' && (
              <section className="card-glass p-6">
                <h2 className="text-2xl font-bold mb-4">{t.aiSettingsTitle}</h2>
                 <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold">{t.aiStatusLabel}</span>
                    {aiStatus ? (
                        <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-green-800 bg-green-100 dark:text-green-100 dark:bg-green-700/50 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {t.aiStatusActive}
                        </span>
                    ) : (
                        <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-800 bg-red-100 dark:text-red-100 dark:bg-red-700/50 rounded-full">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {t.aiStatusInactive}
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.aiDesc}</p>
              </section>
            )}
        </div>

        {isEditModalOpen && (
            <ProfileEditModal 
                user={user} 
                onClose={() => setIsEditModalOpen(false)} 
                onSave={(updatedUser) => {
                    onUpdateUser(updatedUser);
                    setIsEditModalOpen(false);
                }} 
                language={language}
            />
        )}
    </div>
  );
};

export default Settings;
