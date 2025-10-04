import React, { FC, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { email: string; password: string }) => void;
};

const AuthModal: FC<Props> = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError('Vui lòng nhập email.');
    if (!password) return setError('Vui lòng nhập mật khẩu.');
    if (!captchaChecked) return setError('Vui lòng xác nhận bạn không phải robot.');

    setLoading(true);
    try {
      await Promise.resolve(onSubmit ? onSubmit({ email, password }) : undefined);
    } catch (err: any) {
      setError(err?.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/90 rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600"
          >
            ✕
          </button>

          <div className="p-6 pt-8">
            <h3 className="text-center text-orange-500 font-semibold text-lg mb-4">ĐĂNG NHẬP</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="sr-only">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="w-full rounded border border-gray-300 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="sr-only">Mật khẩu</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  type="password"
                  className="w-full rounded border border-gray-300 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div className="mt-2 flex items-center space-x-3">
                <input
                  id="captcha"
                  type="checkbox"
                  checked={captchaChecked}
                  onChange={(e) => setCaptchaChecked(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                />
                <label htmlFor="captcha" className="text-sm text-gray-700">
                  Tôi không phải là người máy
                </label>
                <div className="ml-auto text-xs text-gray-400">reCAPTCHA</div>
              </div>

              {error && <div className="text-sm text-red-600 mt-1">{error}</div>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded mt-2"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2">
                Chưa có tài khoản?{' '}
                <button type="button" onClick={() => alert('Chuyển sang form Đăng ký')} className="text-orange-500 font-medium">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
