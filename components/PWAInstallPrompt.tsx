import React, { useEffect, useState } from 'react';

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('pwa-install-available', handler as EventListener);

    // If a prompt already captured on load
    if ((window as any).__PWAINSTALL__) {
      setDeferredPrompt((window as any).__PWAINSTALL__);
      setVisible(true);
    }

    return () => window.removeEventListener('pwa-install-available', handler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
    } catch (err) {
      console.error('Install prompt failed', err);
    } finally {
      setVisible(false);
      setDeferredPrompt(null);
      (window as any).__PWAINSTALL__ = null;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg flex items-center gap-3">
        <div className="text-sm">Cài đặt ứng dụng</div>
        <button onClick={handleInstall} className="btn btn-primary text-sm">Cài đặt</button>
        <button onClick={() => setVisible(false)} className="btn btn-secondary text-sm">Đóng</button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
