import React, { useState, useEffect } from 'react';
import { 
    auth, 
    db, 
    googleProvider,
  onAuthStateChanged,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithRedirect,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    setDoc, 
    getDoc,
    doc, 
    updateProfile 
} from '../services/firebase.ts';
import { MOCK_USER } from '../constants.ts';
import type { User } from '../types.ts';

// Add RecaptchaVerifier to window interface
declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
        confirmationResult?: any;
    }
}

interface AuthPageProps {
  language: 'en' | 'vi';
  selectedRole: 'student' | 'teacher';
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

  // State management
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const t = {
    en: {
      loginTitle: "Log in",
      signupTitle: "Sign up",
      loginPrompt: "Don't have an account?",
      signupPrompt: "Already have an account?",
      nameLabel: "Your Name",
      emailLabel: "Email address",
      phoneLabel: "Phone number",
      phonePlaceholder: "e.g., +84912345678",
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
    },
    vi: {
      loginTitle: "Đăng nhập",
      signupTitle: "Đăng ký",
      loginPrompt: "Chưa có tài khoản?",
      signupPrompt: "Đã có tài khoản?",
      nameLabel: "Họ và Tên",
      emailLabel: "Địa chỉ email",
      phoneLabel: "Số điện thoại",
      phonePlaceholder: "VD: +84912345678",
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
    }
  }[language];

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
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Đăng nhập thành công. Chuyển hướng...');
        // short delay to let UI update then redirect to home
        setTimeout(() => { window.location.href = '/'; }, 900);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });

        const newUser: User = { ...MOCK_USER, id: firebaseUser.uid, name, role: selectedRole };
        await setDoc(doc(db, "users", firebaseUser.uid), newUser);
        setSuccessMessage('Tạo tài khoản thành công. Chuyển hướng...');
        setTimeout(() => { window.location.href = '/'; }, 900);
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
            phone: user.phoneNumber || phoneNumber
        };
        await setDoc(userDocRef, newUser);
      }
      setSuccessMessage('Xác thực thành công. Chuyển hướng...');
      setTimeout(() => { window.location.href = '/'; }, 900);

    } catch (err: any) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    if (!auth || !db || !googleProvider) {
        setError(t.authError);
        setIsLoading(false);
        return;
    }

    try {
        // Save the selected role before redirecting
        sessionStorage.setItem('authRole', selectedRole);
        // Use redirect method to avoid referrer issues
        await signInWithRedirect(auth, googleProvider);
    } catch (err: any) {
        setError(err.message.replace('Firebase: ', ''));
        setIsLoading(false); // Only set loading to false on error, as redirect will navigate away
    }
  };

  const renderEmailForm = () => (
    <form onSubmit={handleEmailAuth} className="space-y-4">
      {!isLoginView && (
          <div>
              <label className="form-label">{t.nameLabel}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required />
          </div>
      )}
        <div>
          <label className="form-label">{t.emailLabel}</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" required />
      </div>
        <div>
          <div className="flex justify-between">
              <label className="form-label">{t.passwordLabel}</label>
              {isLoginView && <a href="#" className="text-sm text-blue-500 hover:underline">{t.forgotPassword}</a>}
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
            <div>
              <label className="form-label">{t.nameLabel}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required />
            </div>
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
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6">
       <div id="recaptcha-container"></div>
       <div className="w-full max-w-sm">
            <div className="card-glass p-8">
                <div className="text-center mb-6">
                    <img src="https://ivs.edu.vn/wp-content/uploads/2023/11/logo-ivs-no-bg-e1700125959147.png" alt="IVS English Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">{isLoginView ? `${t.loginTitle}` : `${t.signupTitle}`}</h2>
                </div>
                
                {authMethod === 'email' ? renderEmailForm() : renderPhoneForm()}

                {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
                
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300 dark:border-slate-600"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-slate-800 text-slate-500">{t.or}</span></div>
                </div>

                <div className="space-y-3">
                  <button onClick={handleGoogleSignIn} className="btn bg-slate-700 hover:bg-slate-800 text-white w-full" disabled={isLoading}>
                      <i className="fa-brands fa-google mr-2"></i> {t.googleBtn}
                  </button>
                  {authMethod === 'email' ? (
                    <button onClick={() => setAuthMethod('phone')} className="btn btn-secondary w-full" disabled={isLoading}>
                      <i className="fa-solid fa-phone mr-2"></i> {t.phoneBtn}
                    </button>
                  ) : (
                     <button onClick={() => setAuthMethod('email')} className="btn btn-secondary w-full" disabled={isLoading}>
                      <i className="fa-solid fa-envelope mr-2"></i> {t.emailBtn}
                    </button>
                  )}
                </div>
                
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                    {isLoginView ? t.loginPrompt : t.signupPrompt}{' '}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="font-semibold text-blue-500 hover:underline">
                        {isLoginView ? t.signupTitle : t.loginTitle}
                    </button>
                </p>
            </div>

            <div className="text-center mt-6">
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-blue-500 hover:underline">
                    <i className="fa-solid fa-arrow-left mr-2"></i>{t.goBack}
                </button>
            </div>
       </div>
    </div>
  );
};

export default AuthPage;