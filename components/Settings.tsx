import React, { useState, useEffect } from 'react';
import type { User, Classes } from '../types';
import ProfileEditModal from './ProfileEditModal';
// FIX: Removed setApiKey and clearApiKey as per API guidelines.
import { isAiConfigured } from '../services/geminiService';
import { auth } from '../services/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, linkWithCredential } from 'firebase/auth';

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
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'appearance' | 'data' | 'ai'>('profile');
  
  // Account tab states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    setAiStatus(isAiConfigured());
    // Check if user has password provider
    const currentUser = auth?.currentUser;
    if (currentUser) {
      const hasEmailProvider = currentUser.providerData.some(p => p.providerId === 'password');
      setHasPassword(hasEmailProvider);
    }
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
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
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
            {activeTab === 'profile' && (
              <>
                <section className="card-glass p-6">
                  <h2 className="text-2xl font-bold mb-4">{t.profileTitle}</h2>
                  <div className="flex items-center gap-6">
                      <i className={`${user.avatar} text-6xl text-blue-500`}></i>
                      <div className="flex-grow">
                          <p className="text-xl font-bold">{user.name}</p>
                          <p className="text-slate-500 dark:text-slate-400 capitalize">{user.role === 'student' ? t.student : t.teacher}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.role === 'student' ? `${t.grade}: ${user.gradeLevel || 'N/A'}` : `${t.subject}: ${user.subject || 'N/A'}`}
                          </p>
                      </div>
                      <button onClick={() => setIsEditModalOpen(true)} className="btn btn-secondary">
                          <i className="fa-solid fa-pen-to-square mr-2"></i> {t.editProfile}
                      </button>
                  </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <h3 className="text-lg font-semibold mb-2">{t.themeTitle}</h3>
                          <div className="flex gap-2">
                              <button onClick={() => handleThemeChange('light')} className={`btn flex-1 ${theme === 'light' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                                  <i className="fa-solid fa-sun mr-2"></i> {t.light}
                              </button>
                              <button onClick={() => handleThemeChange('dark')} className={`btn flex-1 ${theme === 'dark' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                                  <i className="fa-solid fa-moon mr-2"></i> {t.dark}
                              </button>
                          </div>
                      </div>
                       <div>
                          <h3 className="text-lg font-semibold mb-2">{t.languageTitle}</h3>
                          <div className="flex gap-2">
                               <button onClick={() => setLanguage('en')} className={`btn flex-1 ${language === 'en' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                                  English
                              </button>
                               <button onClick={() => setLanguage('vi')} className={`btn flex-1 ${language === 'vi' ? 'btn-primary' : 'btn-secondary-outline'}`}>
                                  Tiếng Việt
                              </button>
                          </div>
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
