import React, { useState, useEffect, useRef } from 'react';
import { 
    auth, 
    db, 
    googleProvider,
    microsoftProvider,
    linkedinProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    setDoc,
    getDoc,
    doc,
    updateProfile
} from '../services/firebase.ts';
import { MOCK_USER } from '../constants.ts';
import type { User } from '../types.ts';
import AuthModal from './AuthModal';

interface ResetPasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (email: string) => Promise<void> | void;
    loading: boolean;
    translations: {
        title: string;
        description: string;
        emailLabel: string;
        back: string;
        submit: string;
        success: string;
        emailRequired: string;
    };
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
    open,
    onClose,
    onSubmit,
    loading,
    translations
}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const closeTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!open) {
            setEmail('');
            setError(null);
            setSuccess(null);
            if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
        }
    }, [open]);

    useEffect(() => () => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
        }
    }, []);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email) {
            setError(translations.emailRequired);
            return;
        }
        try {
            await onSubmit(email);
            setSuccess(translations.success);
            if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
            }
            closeTimerRef.current = window.setTimeout(() => {
                onClose();
            }, 2400);
        } catch (err: any) {
            setError(err?.message?.replace('Firebase: ', '') || 'Unable to send reset email');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{translations.title}</h3>
                        <button onClick={onClose} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{translations.description}</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="form-label" htmlFor="reset-email">{translations.emailLabel}</label>
                        <input
                            id="reset-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                        {error && <p className="text-sm text-red-600 message-slide">{error}</p>}
                        {success && <p className="text-sm text-emerald-600 message-slide">{success}</p>}
                        <div className="flex items-center justify-between gap-3 pt-2">
                            <button type="button" onClick={onClose} className="btn bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                <i className="fa-solid fa-chevron-left mr-2"></i>
                                {translations.back}
                            </button>
                            <button type="submit" className="btn btn-primary min-w-[140px] justify-center" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading-spinner h-4 w-4"></span>
                                        {translations.submit}
                                    </span>
                                ) : translations.submit}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Add RecaptchaVerifier to window interface
declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
        confirmationResult?: any;
    }
}

interface AuthPageProps {
    language: 'en' | 'vi';
    selectedRole: 'student' | 'teacher' | 'foreigner-teacher';
    onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ language, selectedRole, onBack }) => {
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [isLoginView, setIsLoginView] = useState(true);
    
    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');

    // State management
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isResetLoading, setIsResetLoading] = useState(false);

    const t = {
        en: {
            loginTitle: "Log in",
            signupTitle: "Sign up",
            loginPrompt: "Don't have an account?",
            signupPrompt: "Already have an account?",
            loginSubtitle: "Welcome back! Access your classes and assignments in seconds.",
            signupSubtitle: "Create an account to unlock the full ENGLISH LEARNERS by IVS experience.",
            nameLabel: "Your Name",
            emailLabel: "Email address",
            phoneLabel: "Phone number",
            phonePlaceholder: "e.g., +84912345678",
            gradeLabel: "Grade Level",
            selectGrade: "Select your grade level",
            passwordLabel: "Password",
            otpLabel: "Verification Code",
            loginBtn: "Login",
            signupBtn: "Create Account",
            sendCodeBtn: "Send Code",
            verifyBtn: "Verify & Sign In",
            loading: "Processing...",
            authError: "Authentication services are unavailable. Please contact an administrator.",
            googleBtn: "Continue with Google",
            phoneBtn: "Continue with Phone",
            emailBtn: "Continue with Email",
            forgotPassword: "Forgot password?",
            or: "OR",
            goBack: "Go back to role selection",
            resetTitle: "Reset your password",
            resetDescription: "Enter the email you used to create your account and we'll send you a secure link to reset your password.",
            resetEmailLabel: "Email address",
            resetSubmit: "Send reset link",
            resetBack: "Back",
            resetSuccess: "A password reset email has been sent. Please check your inbox.",
            emailNotVerified: "Please verify your email address before signing in. We've just sent you a new verification email.",
            verificationSent: "Verification email sent. Check your inbox to activate your account.",
            emailRequired: "Email is required",
            loginSuccess: "Welcome back! Redirecting to your dashboard...",
            signupSuccess: "Account created! Please verify your email before signing in.",
            otpSent: "Verification code sent. Please check your phone.",
            otpSuccess: "Phone number verified! Redirecting...",
            quickLogin: "Quick login",
            authNotReady: "Authentication service is not ready yet. Please refresh and try again.",
            loginFailed: "Login failed. Please check your credentials and try again.",
        },
        vi: {
            loginTitle: "Đăng nhập",
            signupTitle: "Đăng ký",
            loginPrompt: "Chưa có tài khoản?",
            signupPrompt: "Đã có tài khoản?",
            loginSubtitle: "Chào mừng trở lại! Truy cập lớp học và bài tập chỉ trong vài giây.",
            signupSubtitle: "Tạo tài khoản để trải nghiệm đầy đủ ENGLISH LEARNERS by IVS.",
            nameLabel: "Họ và Tên",
            emailLabel: "Địa chỉ email",
            phoneLabel: "Số điện thoại",
            phonePlaceholder: "VD: +84912345678",
            gradeLabel: "Cấp lớp",
            selectGrade: "Chọn cấp lớp của bạn",
            passwordLabel: "Mật khẩu",
            otpLabel: "Mã xác thực",
            loginBtn: "Đăng nhập",
            signupBtn: "Đăng ký ngay",
            sendCodeBtn: "Gửi mã",
            verifyBtn: "Xác thực & Đăng nhập",
            loading: "Đang xử lý...",
            authError: "Dịch vụ xác thực không khả dụng. Vui lòng liên hệ quản trị viên.",
            googleBtn: "Tiếp tục với Google",
            phoneBtn: "Tiếp tục với SĐT",
            emailBtn: "Tiếp tục với Email",
            forgotPassword: "Quên mật khẩu?",
            or: "HOẶC",
            goBack: "Quay lại chọn vai trò",
            resetTitle: "Khôi phục mật khẩu",
            resetDescription: "Nhập email bạn đã đăng ký, chúng tôi sẽ gửi đường dẫn bảo mật để đặt lại mật khẩu.",
            resetEmailLabel: "Email",
            resetSubmit: "Gửi liên kết",
            resetBack: "Quay lại",
            resetSuccess: "Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
            emailNotVerified: "Vui lòng xác thực email của bạn trước khi đăng nhập. Chúng tôi đã gửi lại email xác thực.",
            verificationSent: "Email xác thực đã được gửi. Hãy kiểm tra hộp thư để kích hoạt tài khoản.",
            emailRequired: "Vui lòng nhập email",
            loginSuccess: "Chào mừng trở lại! Đang chuyển hướng vào bảng điều khiển...",
            signupSuccess: "Tạo tài khoản thành công! Vui lòng xác thực email trước khi đăng nhập.",
            otpSent: "Mã xác thực đã được gửi. Vui lòng kiểm tra điện thoại.",
            otpSuccess: "Xác thực thành công! Đang chuyển hướng...",
            quickLogin: "Đăng nhập nhanh",
            authNotReady: "Dịch vụ xác thực chưa sẵn sàng. Vui lòng tải lại trang và thử lại.",
            loginFailed: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.",
        }
    }[language];

    const heroCopy = {
        en: {
            headline: 'Empowering every English classroom',
            subheadline: 'A single workspace for lessons, progress tracking, AI support, and student engagement.',
            features: [
                { icon: 'fa-sparkles', title: 'AI-assisted planning', description: 'Generate lesson plans and personalized practice in seconds.' },
                { icon: 'fa-chart-line', title: 'Real-time analytics', description: 'Spot learning gaps early with intelligent progress dashboards.' },
                { icon: 'fa-earth-asia', title: 'Bilingual experience', description: 'Switch seamlessly between Vietnamese and English anytime.' },
            ],
            trustNote: 'Secured by Firebase Authentication and Firestore.',
            trustCta: 'Built for IVS teachers, loved by learners.',
        },
        vi: {
            headline: 'Nâng tầm mọi tiết học tiếng Anh',
            subheadline: 'Một không gian để quản lý bài giảng, theo dõi tiến độ, hỗ trợ AI và kết nối học sinh.',
            features: [
                { icon: 'fa-sparkles', title: 'Lên kế hoạch cùng AI', description: 'Tạo giáo án và bài luyện cá nhân hoá chỉ trong vài giây.' },
                { icon: 'fa-chart-line', title: 'Phân tích tức thì', description: 'Nhận diện lỗ hổng kiến thức với bảng theo dõi thông minh.' },
                { icon: 'fa-earth-asia', title: 'Song ngữ linh hoạt', description: 'Chuyển đổi tiếng Việt ↔ tiếng Anh bất cứ lúc nào.' },
            ],
            trustNote: 'Bảo mật bởi Firebase Authentication & Firestore.',
            trustCta: 'Thiết kế cho giáo viên IVS, đồng hành cùng học sinh.',
        }
    }[language];

    // Prefer the project id from environment (comes from .env.local) so
    // any console links in the UI point to the correct Firebase project.
    const projectIdForConsole = (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || 'english-c0f9d';
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const authRedirectUrl = currentOrigin ? `${currentOrigin.replace(/\/$/, '')}/__/auth/handler` : '';

    const getFriendlyError = (raw?: string | null) => {
        if (!raw) return null;
        // map common Firebase auth errors to friendly messages
        if (raw.includes('requests-from-referrer')) {
            const displayHost = currentHost || 'your-domain.com';
            const displayOrigin = currentOrigin || 'https://your-domain.com';
            const redirectUri = authRedirectUrl || `${displayOrigin.replace(/\/$/, '')}/__/auth/handler`;
            const clipboardText = [
                `Firebase Console → Authentication → Settings → Authorized domains → Add: ${displayHost}`,
                `Google Cloud Console → OAuth client → Authorized JavaScript origins → ${displayOrigin}`,
                `Google Cloud Console → OAuth client → Authorized redirect URIs → ${redirectUri}`
            ].join('\n');
            const msg = (
                <div className="text-sm text-red-700">
                    Firebase chặn yêu cầu từ trang này vì domain chưa được phép.
                    <div className="mt-2">
                        Hãy thêm <strong>{displayHost}</strong> (hoặc domain/dev của bạn) vào Authorized domains trong Firebase Console và cập nhật OAuth client.
                    </div>
                    <ul className="mt-3 list-disc pl-4 space-y-1 text-red-600/90">
                        <li>Firebase Console → Authentication → Settings → Authorized domains → Add <strong>{displayHost}</strong>.</li>
                        <li>Google Cloud Console → OAuth client → thêm JavaScript origin: <strong>{displayOrigin}</strong>.</li>
                        <li>Google Cloud Console → OAuth client → thêm Redirect URI: <strong>{redirectUri}</strong>.</li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <a className="text-sm text-blue-700 underline" target="_blank" rel="noreferrer" href={`https://console.firebase.google.com/project/${projectIdForConsole}/authentication/settings`}>
                            Mở Firebase Authentication settings
                        </a>
                        <button className="text-sm px-2 py-1 bg-gray-100 rounded" onClick={() => { navigator.clipboard?.writeText(clipboardText); }}>
                            Sao chép hướng dẫn
                        </button>
                    </div>
                </div>
            );
            return msg;
        }
        // default: normalized message
        return <span className="text-red-600">{raw}</span>;
    };

    const setupRecaptcha = () => {
        if (!auth) return;
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                }
            });
        }
    };
    
    useEffect(() => {
        if (authMethod === 'phone') {
            setupRecaptcha();
        }
        // subscribe to auth state to show signed-in user profile in UI
        if (auth) {
            const unsub = onAuthStateChanged(auth, (u) => {
                setCurrentUser(u || null);
            });
            return () => unsub();
        }
    }, [authMethod]);
    
    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        if (!auth || !db) {
            setError(t.authError);
            setIsLoading(false);
            return;
        }

        try {
            if (isLoginView) {
                const credential = await signInWithEmailAndPassword(auth, email, password);

                if (!credential.user.emailVerified) {
                    await sendEmailVerification(credential.user);
                    await signOut(auth);
                    setSuccessMessage(null);
                    setError(t.emailNotVerified);
                    return;
                }

                setSuccessMessage(t.loginSuccess);
                setTimeout(() => { window.location.href = '/'; }, 900);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const firebaseUser = userCredential.user;
                await updateProfile(firebaseUser, { displayName: name });

                const newUser: User = {
                    ...MOCK_USER,
                    id: firebaseUser.uid,
                    name,
                    role: selectedRole,
                    email: firebaseUser.email || email,
                    gradeLevel: selectedGrade,
                };
                await setDoc(doc(db, "users", firebaseUser.uid), {
                    ...newUser,
                    createdAt: new Date().toISOString(),
                });

                await sendEmailVerification(firebaseUser);
                await signOut(auth);

                setIsLoginView(true);
                setSuccessMessage(t.signupSuccess);
                setPassword('');
                setOtp('');
                setIsOtpSent(false);
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!auth || !db) {
            setError(t.authError);
            setIsLoading(false);
            return;
        }

        try {
            const appVerifier = window.recaptchaVerifier!;
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            window.confirmationResult = confirmationResult;
            setIsOtpSent(true);
            setSuccessMessage(t.otpSent);
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!window.confirmationResult) {
            setError("Confirmation result not found.");
            setIsLoading(false);
            return;
        }
        
        try {
            const result = await window.confirmationResult.confirm(otp);
            const user = result.user;
            
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                const newName = name || `User ${user.uid.substring(0, 5)}`;
                const newUser: User = {
                    ...MOCK_USER,
                    id: user.uid,
                    name: newName,
                    role: selectedRole,
                    phone: user.phoneNumber || phoneNumber,
                    gradeLevel: selectedGrade,
                };
                await setDoc(userDocRef, newUser);
            }
            setSuccessMessage(t.otpSuccess);
            setTimeout(() => { window.location.href = '/'; }, 900);

        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordResetRequest = async (emailAddress: string) => {
        if (!emailAddress) {
            throw new Error(t.emailRequired);
        }

        if (!auth) {
            throw new Error(t.authError);
        }

        setIsResetLoading(true);
        try {
            await sendPasswordResetEmail(auth, emailAddress);
        } catch (err) {
            throw err;
        } finally {
            setIsResetLoading(false);
        }
    };

    // Primary Google sign-in using popup (more reliable than redirect)
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!auth || !db || !googleProvider) {
                setError(t.authError);
                setIsLoading(false);
                return;
            }

            sessionStorage.setItem('authRole', selectedRole);
            console.info('Google popup sign-in', { origin: currentOrigin, host: currentHost, role: selectedRole });

            const result = await signInWithPopup(auth, googleProvider as any);
            const u = result?.user;
            if (u) {
                setSuccessMessage(`${t.loginSuccess} (${u.email || u.uid})`);
                console.info('Sign-in success:', result);

                // Ensure Firestore user document exists
                try {
                    const userDocRef = doc(db, 'users', u.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (!userDoc.exists()) {
                        const fallbackName = u.displayName || u.email?.split('@')[0] || (selectedRole === 'teacher' ? 'New Teacher' : 'New Student');
                        const newUser = {
                            ...MOCK_USER,
                            id: u.uid,
                            name: fallbackName,
                            email: u.email || undefined,
                            role: selectedRole,
                            avatar: MOCK_USER.avatar,
                        } as any;
                        await setDoc(userDocRef, { ...newUser, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
                        sessionStorage.removeItem('authRole');
                    }
                } catch (e) {
                    console.warn('Failed to ensure user doc', e);
                }

                window.location.href = '/';
                return;
            } else {
                setError('Sign-in failed.');
                console.warn('No user returned');
            }
        } catch (err: any) {
            const code = err?.code || 'unknown';
            const raw = (err?.message || String(err)).replace('Firebase: ', '');
            console.error('Google sign-in error', { code, raw, err });

            if (code === 'auth/popup-closed-by-user') {
                setError(language === 'vi' ? 'Đã đóng cửa sổ đăng nhập.' : 'Popup closed.');
            } else if (code === 'auth/unauthorized-domain' || raw.includes('requests-from-referrer')) {
                setError(language === 'vi' ? 'Domain chưa được ủy quyền.' : 'Domain not authorized.');
            } else {
                setError(raw);
            }
        } finally {
            setIsLoading(false);
        }
    };



    const renderEmailForm = () => (
        <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLoginView && (
                <>
                    <div>
                        <label className="form-label">{t.nameLabel}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required />
                    </div>
                    <div>
                        <label className="form-label">{t.gradeLabel}</label>
                        <select 
                            value={selectedGrade} 
                            onChange={e => setSelectedGrade(e.target.value)} 
                            className="form-input" 
                            required
                        >
                            <option value="">{t.selectGrade}</option>
                            <option value="kindergarten">Mầm non (3-5 tuổi)</option>
                            <option value="primary">Tiểu học (6-10 tuổi)</option>
                            <option value="secondary">Trung học Cơ sở (11-15 tuổi)</option>
                            <option value="highschool">Trung học Phổ thông (16-18 tuổi)</option>
                        </select>
                    </div>
                </>
            )}
            <div>
                <label className="form-label">{t.emailLabel}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" required />
            </div>
            <div>
                <div className="flex justify-between">
                    <label className="form-label">{t.passwordLabel}</label>
                    {isLoginView && (
                        <button
                            type="button"
                            onClick={() => {
                                setShowForgotPassword(true);
                                setError(null);
                            }}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {t.forgotPassword}
                        </button>
                    )}
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" required />
            </div>

            <button type="submit" className="btn btn-primary w-full !mt-6" disabled={isLoading}>
                {isLoading ? t.loading : (isLoginView ? t.loginBtn : t.signupBtn)}
            </button>
        </form>
    );

    const renderPhoneForm = () => (
        <>
            {!isOtpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    {!isLoginView && (
                        <>
                            <div>
                                <label className="form-label">{t.nameLabel}</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required />
                            </div>
                            <div>
                                <label className="form-label">{t.gradeLabel}</label>
                                <select 
                                    value={selectedGrade} 
                                    onChange={e => setSelectedGrade(e.target.value)} 
                                    className="form-input" 
                                    required
                                >
                                    <option value="">{t.selectGrade}</option>
                                    <option value="kindergarten">Mầm non (3-5 tuổi)</option>
                                    <option value="primary">Tiểu học (6-10 tuổi)</option>
                                    <option value="secondary">Trung học Cơ sở (11-15 tuổi)</option>
                                    <option value="highschool">Trung học Phổ thông (16-18 tuổi)</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="form-label">{t.phoneLabel}</label>
                        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-input" placeholder={t.phonePlaceholder} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full !mt-6" disabled={isLoading}>
                        {isLoading ? t.loading : t.sendCodeBtn}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                        <label className="form-label">{t.otpLabel}</label>
                        <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="form-input" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full !mt-6" disabled={isLoading}>
                        {isLoading ? t.loading : t.verifyBtn}
                    </button>
                </form>
            )}
        </>
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950/70 to-black" />
                <div className="pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-sky-500/30 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_55%)]" />
            </div>

            <div id="recaptcha-container"></div>

            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-12 lg:px-16">
                <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
                    <section className="hidden flex-col gap-10 text-slate-100 lg:flex">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-sky-200/70">
                                <span className="h-px w-8 bg-sky-300/50"></span>
                                IVS ENGLISH
                            </div>
                            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">{heroCopy.headline}</h1>
                            <p className="max-w-xl text-lg text-slate-300">{heroCopy.subheadline}</p>
                        </div>
                        <div className="grid gap-4">
                            {heroCopy.features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-200 group-hover:bg-sky-500/30">
                                            <i className={`fa-solid ${feature.icon} text-xl`}></i>
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-white">{feature.title}</p>
                                            <p className="text-sm text-slate-300">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-200">
                                <i className="fa-solid fa-shield-halved text-xl"></i>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">{heroCopy.trustNote}</p>
                                <p className="text-lg font-semibold text-white">{heroCopy.trustCta}</p>
                            </div>
                        </div>
                    </section>

                    <section className="relative">
                        <div className="mx-auto w-full max-w-lg rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,8,24,0.9),rgba(7,10,30,0.95))] text-slate-50 shadow-2xl backdrop-blur-md">
                            <div className="absolute -top-16 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-white/5 text-white shadow-xl ring-2 ring-white/20">
                                <img src="public/images/logo/logo-lighting.webp" alt="logo" className="h-14 w-auto" />
                            </div>
                            <div className="space-y-6 px-6 py-8 sm:px-10">
                                <div className="space-y-4 text-center">
                                    <div className="mx-auto h-40 w-full overflow-hidden rounded-md hidden lg:block">
                                        <div className="w-full h-full bg-center bg-cover rounded-md" style={{ backgroundImage: `url('/public/images/banner/ivs-login-preview.png')` }} aria-hidden="true" />
                                    </div>
                                    <img src="public/images/banner/ivs-presentitation.webp" alt="IVS Login" className="w-full h-full object-cover rounded-md" />
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-extrabold text-white">
                                            {isLoginView ? t.loginTitle : t.signupTitle}
                                        </h2>
                                        <p className="text-sm text-slate-300">
                                            {isLoginView ? t.loginSubtitle : t.signupSubtitle}
                                        </p>
                                    </div>
                                </div>

                                {successMessage && (
                                    <div className="message-slide flex items-start gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                                        <i className="fa-solid fa-circle-check mt-0.5"></i>
                                        <span>{successMessage}</span>
                                    </div>
                                )}

                                {error && (
                                    <div className="message-slide flex items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/90 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
                                        <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
                                        <span>{getFriendlyError(error)}</span>
                                    </div>
                                )}

                                <div className="space-y-5">
                                    {authMethod === 'email' ? renderEmailForm() : renderPhoneForm()}
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <span className="w-full border-t border-slate-200/70 dark:border-slate-700/70"></span>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white/90 px-3 text-xs font-medium uppercase tracking-[0.3em] text-slate-400 dark:bg-slate-950/75">
                                            {t.or}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-white transition hover:brightness-105"
                                        disabled={isLoading}
                                    >
                                        <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
                                        <span>{t.googleBtn}</span>
                                    </button>

                                                            <button
                                                                onClick={async () => {
                                                                    setIsLoading(true);
                                                                    setError(null);
                                                                    try {
                                                                        if (!auth || !db || !microsoftProvider) {
                                                                            setError(t.authError);
                                                                            return;
                                                                        }
                                                                        sessionStorage.setItem('authRole', selectedRole);
                                                                        const result = await signInWithPopup(auth, microsoftProvider as any);
                                                                        const u = result?.user;
                                                                        if (u) {
                                                                            setSuccessMessage(`${t.loginSuccess} (${u.email || u.uid})`);
                                                                            window.location.href = '/';
                                                                            return;
                                                                        }
                                                                        setError('Microsoft sign-in failed.');
                                                                    } catch (err: any) {
                                                                        const raw = (err?.message || String(err)).replace('Firebase: ', '');
                                                                        setError(raw);
                                                                    } finally {
                                                                        setIsLoading(false);
                                                                    }
                                                                }}
                                                                className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-white transition hover:brightness-105"
                                                                disabled={isLoading}
                                                            >
                                                                <img src="/microsoft-icon.svg" alt="Microsoft" className="h-5 w-5" />
                                                                <span>{language === 'vi' ? 'Tiếp tục với Microsoft' : 'Continue with Microsoft'}</span>
                                                            </button>

                                                            <button
                                                                onClick={async () => {
                                                                    setIsLoading(true);
                                                                    setError(null);
                                                                    try {
                                                                        if (!auth || !db || !linkedinProvider) {
                                                                            setError(t.authError);
                                                                            return;
                                                                        }
                                                                        sessionStorage.setItem('authRole', selectedRole);
                                                                        const result = await signInWithPopup(auth, linkedinProvider as any);
                                                                        const u = result?.user;
                                                                        if (u) {
                                                                            setSuccessMessage(`${t.loginSuccess} (${u.email || u.uid})`);
                                                                            window.location.href = '/';
                                                                            return;
                                                                        }
                                                                        setError('LinkedIn sign-in failed.');
                                                                    } catch (err: any) {
                                                                        const raw = (err?.message || String(err)).replace('Firebase: ', '');
                                                                        setError(raw);
                                                                    } finally {
                                                                        setIsLoading(false);
                                                                    }
                                                                }}
                                                                className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-white transition hover:brightness-105"
                                                                disabled={isLoading}
                                                            >
                                                                <img src="/linkedin-icon.svg" alt="LinkedIn" className="h-5 w-5" />
                                                                <span>{language === 'vi' ? 'Tiếp tục với LinkedIn' : 'Continue with LinkedIn'}</span>
                                                            </button>

                                    {/* Phone auth disabled due to Firebase billing requirements */}
                                    {authMethod === 'email' ? (
                                        <button
                                            onClick={() => {
                                                setError(language === 'vi' 
                                                    ? 'Đăng nhập bằng số điện thoại tạm thời không khả dụng (yêu cầu Firebase billing). Vui lòng sử dụng Email hoặc Google.' 
                                                    : 'Phone sign-in is temporarily unavailable (requires Firebase billing plan). Please use Email or Google.');
                                            }}
                                            className="flex items-center justify-center gap-3 rounded-xl bg-slate-600/60 py-3 font-semibold text-slate-300 shadow-md cursor-not-allowed"
                                            disabled={true}
                                        >
                                            <i className="fa-solid fa-phone"></i>
                                            {t.phoneBtn}
                                            <span className="text-xs opacity-75">(disabled)</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setAuthMethod('email')}
                                            className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
                                            disabled={isLoading}
                                        >
                                            <i className="fa-solid fa-envelope"></i>
                                            {t.emailBtn}
                                        </button>
                                    )}
                                </div>

                                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                                    {isLoginView ? t.loginPrompt : t.signupPrompt}{' '}
                                    <button
                                        onClick={() => {
                                            setIsLoginView(!isLoginView);
                                            setError(null);
                                            setSuccessMessage(null);
                                        }}
                                        className="font-semibold text-sky-600 hover:underline dark:text-sky-400"
                                    >
                                        {isLoginView ? t.signupTitle : t.loginTitle}
                                    </button>
                                </p>

                                <div className="mt-4">
                                    <button
                                        onClick={onBack}
                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-slate-700/40 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700/60"
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                        {t.goBack}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <AuthModal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                onSubmit={async ({ email, password }) => {
                    try {
                        if (!auth) throw new Error(t.authNotReady);
                        await signInWithEmailAndPassword(auth, email, password);
                        setAuthModalOpen(false);
                        setSuccessMessage(t.loginSuccess);
                        setTimeout(() => { window.location.href = '/'; }, 500);
                    } catch (err: any) {
                        throw new Error(err.message.replace('Firebase: ', '') || t.loginFailed);
                    }
                }}
            />
            <ResetPasswordDialog
                open={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                onSubmit={handlePasswordResetRequest}
                loading={isResetLoading}
                translations={{
                    title: t.resetTitle,
                    description: t.resetDescription,
                    emailLabel: t.resetEmailLabel,
                    back: t.resetBack,
                    submit: t.resetSubmit,
                    success: t.resetSuccess,
                    emailRequired: t.emailRequired,
                }}
            />
        </div>
    );
};

export default AuthPage;