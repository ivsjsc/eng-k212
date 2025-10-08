import React, { useState } from 'react';

interface MobileAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}

export const MobileAccordion: React.FC<MobileAccordionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  icon = 'fa-chevron-down' 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
      >
        <span className="font-semibold text-white">{title}</span>
        <i 
          className={`fa-solid ${icon} text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 pt-0 text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
};

interface MobileTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export const MobileTabs: React.FC<MobileTabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="space-y-4">
      {/* Tab buttons - Horizontal scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {tab.icon && <i className={`fa-solid ${tab.icon}`} />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        {activeTabContent}
      </div>
    </div>
  );
};

interface MobileCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export const MobileCard: React.FC<MobileCardProps> = ({ 
  title, 
  children, 
  className = '',
  compact = false 
}) => {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
      {title && (
        <div className={`border-b border-white/10 ${compact ? 'p-3' : 'p-4'}`}>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className={compact ? 'p-3' : 'p-4'}>
        {children}
      </div>
    </div>
  );
};

interface MobileListItemProps {
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
  rightContent?: React.ReactNode;
}

export const MobileListItem: React.FC<MobileListItemProps> = ({
  icon,
  iconColor = 'text-sky-500',
  title,
  subtitle,
  badge,
  badgeColor = 'bg-sky-500/20 text-sky-400',
  onClick,
  rightContent,
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
        onClick 
          ? 'hover:bg-white/5 active:scale-95 cursor-pointer' 
          : ''
      }`}
    >
      {icon && (
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 ${iconColor}`}>
          <i className={`fa-solid ${icon}`} />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-white">{title}</p>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="truncate text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
      
      {rightContent || (onClick && (
        <i className="fa-solid fa-chevron-right text-slate-400" />
      ))}
    </Component>
  );
};

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = 'max-h-[85vh]',
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl ${maxHeight} overflow-hidden`}
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-slate-600" />
        </div>

        {/* Header */}
        {title && (
          <div className="border-b border-white/10 px-6 pb-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {children}
        </div>
      </div>
    </>
  );
};

// Utility hook for mobile detection
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
