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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

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
      resetPasswordTitle: "Reset Password",
      resetPasswordDesc: "Enter your email address and we'll send you a link to reset your password.",
      sendResetEmailBtn: "Send Reset Link",
      backToLogin: "Back to Login",
      resetEmailSent: "Password reset email sent! Check your inbox.",
      emailNotVerified: "Please verify your email before logging in. Check your inbox for verification link.",
      verificationEmailSent: "Verification email sent! Please check your inbox and verify your email before logging in.",
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
      resetPasswordTitle: "Khôi phục mật khẩu",
      resetPasswordDesc: "Nhập địa chỉ email của bạn và chúng tôi sẽ gửi link để đặt lại mật khẩu.",
      sendResetEmailBtn: "Gửi link khôi phục",
      backToLogin: "Quay lại đăng nhập",
      resetEmailSent: "Email khôi phục mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.",
      emailNotVerified: "Vui lòng xác thực email trước khi đăng nhập. Kiểm tra hộp thư để tìm link xác thực.",
      verificationEmailSent: "Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư và xác thực email trước khi đăng nhập.",
    }
  }[language];

  const projectIdForConsole = 'arctic-outpost-472823-r2';
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
          <div className="text-center mb-6">
              <img src="/images/logo/logo.png" alt="IVS English Logo" className="w-20 h-20 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-sky-700">{isLoginView ? `${t.loginTitle}` : `${t.signupTitle}`}</h2>
              <p className="text-sm text-slate-600 mt-1">{isLoginView ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</p>
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
        // Đăng nhập với email và mật khẩu
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        // Kiểm tra email đã xác thực chưa
        if (!firebaseUser.emailVerified) {
          // Nếu chưa xác thực, hiển thị lỗi và đăng xuất
          setError(t.emailNotVerified);
          await signOut(auth);
          setIsLoading(false);
          return;
        }
        
        setSuccessMessage('Đăng nhập thành công. Chuyển hướng...');
        // short delay to let UI update then redirect to home
        setTimeout(() => { window.location.href = '/'; }, 900);
      } else {
        // Tạo tài khoản mới
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });

        // Gửi email xác thực
        await sendEmailVerification(firebaseUser);

        // Lưu thông tin người dùng vào Firestore với đầy đủ thông tin
        const newUser: User = { 
          ...MOCK_USER, 
          id: firebaseUser.uid, 
          email: firebaseUser.email || email,
          name, 
          role: selectedRole 
        };
        
        // Thêm createdAt vào document
        await setDoc(doc(db, "users", firebaseUser.uid), {
          ...newUser,
          uid: firebaseUser.uid,
          createdAt: new Date().toISOString()
        });
        
        // Đăng xuất sau khi đăng ký để bắt buộc xác thực email
        await signOut(auth);
        
        setSuccessMessage(t.verificationEmailSent);
        // Chuyển sang chế độ đăng nhập sau 3 giây
        setTimeout(() => { 
          setIsLoginView(true);
          setSuccessMessage(null);
        }, 3000);
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
        // Lưu thông tin người dùng vào Firestore với createdAt
        await setDoc(userDocRef, {
          ...newUser,
          uid: user.uid,
          createdAt: new Date().toISOString()
        });
      }
      setSuccessMessage('Xác thực thành công. Chuyển hướng...');
      setTimeout(() => { window.location.href = '/'; }, 900);

    } catch (err: any) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý gửi email khôi phục mật khẩu
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!auth) {
      setError(t.authError);
      setIsLoading(false);
      return;
    }

    try {
      // Gửi email khôi phục mật khẩu
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage(t.resetEmailSent);
      // Đóng modal và reset form sau 2 giây
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail('');
        setSuccessMessage(null);
      }, 2000);
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
              {isLoginView && (
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)} 
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
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white flex items-center justify-center p-6">
       <div id="recaptcha-container"></div>
       <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-2xl p-8">
                <div className="text-center mb-6">
                    <img src="https://ivs.edu.vn/wp-content/uploads/2023/11/logo-ivs-no-bg-e1700125959147.png" alt="IVS English Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-sky-700">{isLoginView ? `${t.loginTitle}` : `${t.signupTitle}`}</h2>
                    <p className="text-sm text-slate-600 mt-1">{isLoginView ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</p>
                </div>

                {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">{successMessage}</div>}
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">{getFriendlyError(error)}</div>}

                <div className="space-y-4">
                  {authMethod === 'email' ? renderEmailForm() : renderPhoneForm()}
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-slate-500">{t.or}</span></div>
                </div>

                <div className="space-y-3">
                  <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-3 w-full py-2 rounded-lg border border-slate-200 bg-white hover:bg-sky-50" disabled={isLoading}>
                      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" /> <span className="text-slate-700">{t.googleBtn}</span>
                  </button>
                  {authMethod === 'email' ? (
                    <button onClick={() => setAuthMethod('phone')} className="flex items-center justify-center gap-3 w-full py-2 rounded-lg bg-sky-600 text-white" disabled={isLoading}>
                      <i className="fa-solid fa-phone"></i> {t.phoneBtn}
                    </button>
                  ) : (
                     <button onClick={() => setAuthMethod('email')} className="flex items-center justify-center gap-3 w-full py-2 rounded-lg bg-sky-600 text-white" disabled={isLoading}>
                      <i className="fa-solid fa-envelope"></i> {t.emailBtn}
                    </button>
                  )}
                </div>

                <p className="text-center text-sm text-slate-600 mt-6">
                    {isLoginView ? t.loginPrompt : t.signupPrompt}{' '}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(null); setSuccessMessage(null); }} className="font-semibold text-sky-600 hover:underline">
                        {isLoginView ? t.signupTitle : t.loginTitle}
                    </button>
                </p>
            </div>

            <div className="text-center mt-6">
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-sky-600 hover:underline">
                    <i className="fa-solid fa-arrow-left mr-2"></i>{t.goBack}
                </button>
            </div>
       </div>

       {/* Modal Quên mật khẩu */}
       {showForgotPassword && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
             <h3 className="text-2xl font-bold text-sky-700 mb-2">{t.resetPasswordTitle}</h3>
             <p className="text-sm text-slate-600 mb-6">{t.resetPasswordDesc}</p>
             
             {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded text-sm">{successMessage}</div>}
             {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">{getFriendlyError(error)}</div>}
             
             <form onSubmit={handleForgotPassword} className="space-y-4">
               <div>
                 <label className="form-label">{t.emailLabel}</label>
                 <input 
                   type="email" 
                   value={resetEmail} 
                   onChange={e => setResetEmail(e.target.value)} 
                   className="form-input" 
                   required 
                   placeholder={t.emailLabel}
                 />
               </div>
               
               <div className="flex gap-3">
                 <button 
                   type="button"
                   onClick={() => {
                     setShowForgotPassword(false);
                     setResetEmail('');
                     setError(null);
                     setSuccessMessage(null);
                   }}
                   className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                   disabled={isLoading}
                 >
                   {t.backToLogin}
                 </button>
                 <button 
                   type="submit"
                   className="flex-1 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                   disabled={isLoading}
                 >
                   {isLoading ? t.loading : t.sendResetEmailBtn}
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
    </div>
  );
};

export default AuthPage;
