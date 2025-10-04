import React, { useEffect, useState } from 'react';

interface Props {
  language: 'en' | 'vi';
  onClose: () => void;
  onGoToCurriculum: () => void;
}

const FirstUseOverlay: React.FC<Props> = ({ language, onClose, onGoToCurriculum }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('ivs-first-use-shown');
    if (!shown) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('ivs-first-use-shown', '1');
    setVisible(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white/95 p-6 text-slate-900">
        <h3 className="text-xl font-bold">{language === 'vi' ? 'Bắt đầu tại đây' : 'Get started'}</h3>
        <p className="text-sm text-slate-700 mt-2">{language === 'vi' ? 'Chúng tôi đã chuẩn bị lộ trình và chương trình cho bạn. Hãy khám phá hoặc xem hướng dẫn nhanh.' : 'We prepared a starting curriculum for you. Explore the program or read a quick guide.'}</p>
        <div className="mt-4 flex gap-3">
          <button onClick={() => { onGoToCurriculum(); handleDismiss(); }} className="btn bg-sky-500 text-white py-2 px-3 rounded">{language === 'vi' ? 'Khám phá khoá học' : 'Explore courses'}</button>
          <button onClick={handleDismiss} className="btn bg-slate-200 text-slate-900 py-2 px-3 rounded">{language === 'vi' ? 'Đóng' : 'Dismiss'}</button>
        </div>
      </div>
    </div>
  );
};

export default FirstUseOverlay;
