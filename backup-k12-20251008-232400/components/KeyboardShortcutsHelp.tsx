import React from 'react';

interface KeyboardShortcutsHelpProps {
  language: 'en' | 'vi';
  onClose: () => void;
}

interface Shortcut {
  keys: string[];
  description: { en: string; vi: string };
  category: { en: string; vi: string };
}

const shortcuts: Shortcut[] = [
  // Navigation
  {
    keys: ['Esc'],
    description: { en: 'Go back / Close modal', vi: 'Quay lại / Đóng cửa sổ' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['Enter'],
    description: { en: 'Select / Confirm', vi: 'Chọn / Xác nhận' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['↑'],
    description: { en: 'Move up', vi: 'Di chuyển lên' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['↓'],
    description: { en: 'Move down', vi: 'Di chuyển xuống' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['←'],
    description: { en: 'Move left / Previous', vi: 'Sang trái / Trước' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['→'],
    description: { en: 'Move right / Next', vi: 'Sang phải / Sau' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  {
    keys: ['Tab'],
    description: { en: 'Navigate between sections', vi: 'Điều hướng giữa các phần' },
    category: { en: 'Navigation', vi: 'Điều hướng' }
  },
  
  // Search & Actions
  {
    keys: ['Ctrl', 'F'],
    description: { en: 'Search / Find', vi: 'Tìm kiếm' },
    category: { en: 'Actions', vi: 'Hành động' }
  },
  {
    keys: ['Ctrl', 'K'],
    description: { en: 'Open command palette', vi: 'Mở bảng lệnh' },
    category: { en: 'Actions', vi: 'Hành động' }
  },
  {
    keys: ['Ctrl', 'S'],
    description: { en: 'Save changes', vi: 'Lưu thay đổi' },
    category: { en: 'Actions', vi: 'Hành động' }
  },
  
  // Views - Updated shortcuts
  {
    keys: ['Ctrl', 'H'],
    description: { en: 'Go to Home', vi: 'Về Trang chủ' },
    category: { en: 'Quick Navigation', vi: 'Điều hướng nhanh' }
  },
  {
    keys: ['Ctrl', 'L'],
    description: { en: 'Go to Lessons/Curriculum', vi: 'Đến Bài học/Chương trình' },
    category: { en: 'Quick Navigation', vi: 'Điều hướng nhanh' }
  },
  {
    keys: ['Ctrl', ','],
    description: { en: 'Open Settings', vi: 'Mở Cài đặt' },
    category: { en: 'Quick Navigation', vi: 'Điều hướng nhanh' }
  },
  {
    keys: ['Ctrl', 'Shift', 'T'],
    description: { en: 'Toggle theme (Light/Dark)', vi: 'Chuyển chủ đề (Sáng/Tối)' },
    category: { en: 'Quick Navigation', vi: 'Điều hướng nhanh' }
  },
  
  // Help
  {
    keys: ['?'],
    description: { en: 'Show keyboard shortcuts', vi: 'Hiển thị phím tắt' },
    category: { en: 'Help', vi: 'Trợ giúp' }
  },
  {
    keys: ['F1'],
    description: { en: 'Open User Guide', vi: 'Mở Hướng dẫn' },
    category: { en: 'Help', vi: 'Trợ giúp' }
  }
];

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({ language, onClose }) => {
  const categories = [...new Set(shortcuts.map(s => s.category[language]))];
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-keyboard text-2xl text-white"></i>
            <h2 className="text-2xl font-bold text-white">
              {language === 'vi' ? 'Phím tắt' : 'Keyboard Shortcuts'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-sm"></i>
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(s => s.category[language] === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-slate-300">{shortcut.description[language]}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <span className="text-slate-500 mx-1">+</span>}
                            <kbd className="px-3 py-1.5 text-sm font-semibold bg-slate-700 text-white rounded-md shadow-md border border-slate-600 min-w-[2.5rem] text-center">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 px-6 py-4 border-t border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <i className="fa-solid fa-lightbulb text-yellow-500"></i>
            <span>
              {language === 'vi' 
                ? 'Nhấn ? hoặc F1 bất cứ lúc nào để xem phím tắt' 
                : 'Press ? or F1 anytime to view shortcuts'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            {language === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
