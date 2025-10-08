// PWA Install Prompt Component
import React, { useState, useEffect } from 'react';

interface PWAInstallPromptProps {
  onClose?: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    setIsStandalone(isInStandaloneMode);

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if user has already dismissed the prompt
    const promptDismissed = localStorage.getItem('pwa-prompt-dismissed');
    const dismissTime = promptDismissed ? parseInt(promptDismissed) : 0;
    const daysSinceDismiss = (Date.now() - dismissTime) / (1000 * 60 * 60 * 24);

    // Show prompt if not in standalone, not dismissed recently, and not iOS (iOS uses manual prompt)
    if (!isInStandaloneMode && daysSinceDismiss > 7) {
      if (iOS) {
        // Show iOS install instructions after a delay
        setTimeout(() => setShowPrompt(true), 5000);
      } else {
        // Listen for beforeinstallprompt event (Chrome/Edge)
        const handler = (e: Event) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setShowPrompt(true);
        };
        
        window.addEventListener('beforeinstallprompt', handler);
        
        return () => window.removeEventListener('beforeinstallprompt', handler);
      }
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted installation');
    } else {
      console.log('[PWA] User dismissed installation');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    setShowPrompt(false);
    onClose?.();
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
              <img src="/images/logo/logo-lighting.png" alt="IVS" className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">
                Cài đặt IVS English
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                {isIOS 
                  ? 'Nhấn nút Chia sẻ ở thanh menu, sau đó chọn "Thêm vào Màn hình chính"'
                  : 'Cài đặt ứng dụng để truy cập nhanh và sử dụng offline'
                }
              </p>
              
              {!isIOS && deferredPrompt && (
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    📲 Cài đặt
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    Để sau
                  </button>
                </div>
              )}
              
              {isIOS && (
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                  <span className="text-2xl">⬆️</span>
                  <span className="text-xs text-slate-300">
                    Nhấn biểu tượng Share → "Add to Home Screen"
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
