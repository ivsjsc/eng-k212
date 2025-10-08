import React, { useState } from 'react';
import {
  MobileAccordion,
  MobileTabs,
  MobileCard,
  MobileListItem,
  MobileBottomSheet,
  useIsMobile
} from './MobileComponents';

/**
 * Demo component showcasing mobile-optimized UI components
 * This can be used as a reference or integrated into existing pages
 */
const MobileComponentsDemo: React.FC<{ language: 'en' | 'vi' }> = ({ language }) => {
  const isMobile = useIsMobile();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const t = {
    en: {
      title: 'Mobile Components Demo',
      description: 'Example usage of mobile-optimized components',
      accordionSection: 'Accordion Examples',
      tabsSection: 'Tabs Examples',
      cardsSection: 'Card Examples',
      listSection: 'List Item Examples',
      bottomSheetSection: 'Bottom Sheet Example',
      openSheet: 'Open Bottom Sheet',
      tab1: 'Grammar',
      tab2: 'Vocabulary',
      tab3: 'Practice',
      unit1: 'Unit 1: Present Tenses',
      unit2: 'Unit 2: Past Tenses',
      unit3: 'Unit 3: Future Tenses',
      lesson1: 'Lesson 1: Introduction',
      lesson2: 'Lesson 2: Practice',
      cardTitle: 'Course Progress',
      settings: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
    },
    vi: {
      title: 'Demo Components Mobile',
      description: 'Ví dụ sử dụng các components tối ưu mobile',
      accordionSection: 'Ví dụ Accordion',
      tabsSection: 'Ví dụ Tabs',
      cardsSection: 'Ví dụ Card',
      listSection: 'Ví dụ List Item',
      bottomSheetSection: 'Ví dụ Bottom Sheet',
      openSheet: 'Mở Bottom Sheet',
      tab1: 'Ngữ pháp',
      tab2: 'Từ vựng',
      tab3: 'Luyện tập',
      unit1: 'Unit 1: Các thì hiện tại',
      unit2: 'Unit 2: Các thì quá khứ',
      unit3: 'Unit 3: Các thì tương lai',
      lesson1: 'Bài 1: Giới thiệu',
      lesson2: 'Bài 2: Thực hành',
      cardTitle: 'Tiến độ khóa học',
      settings: 'Cài đặt',
      profile: 'Hồ sơ',
      notifications: 'Thông báo',
    }
  };

  const text = t[language];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">{text.title}</h1>
        <p className="text-slate-400">{text.description}</p>
        <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
          {isMobile ? '📱 Mobile View' : '💻 Desktop View'}
        </div>
      </div>

      {/* Accordion Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">{text.accordionSection}</h2>
        <div className="space-y-3">
          <MobileAccordion title={text.unit1} defaultOpen={true}>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-slate-300">
                <i className="fa-solid fa-play-circle text-sky-500" />
                <span>{text.lesson1}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <i className="fa-solid fa-play-circle text-sky-500" />
                <span>{text.lesson2}</span>
              </li>
            </ul>
          </MobileAccordion>

          <MobileAccordion title={text.unit2}>
            <p className="text-slate-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </MobileAccordion>

          <MobileAccordion title={text.unit3} icon="fa-book">
            <div className="space-y-2">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold text-white mb-1">Simple Future</p>
                <p className="text-sm text-slate-400">Will + base verb</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold text-white mb-1">Going to Future</p>
                <p className="text-sm text-slate-400">Be going to + base verb</p>
              </div>
            </div>
          </MobileAccordion>
        </div>
      </section>

      {/* Tabs Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">{text.tabsSection}</h2>
        <MobileTabs
          tabs={[
            {
              id: 'grammar',
              label: text.tab1,
              icon: 'fa-book',
              content: (
                <div className="space-y-3">
                  <p className="text-white font-semibold">Grammar Content</p>
                  <p className="text-slate-300">
                    This is the grammar tab content. You can put any React component here.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Present Simple', 'Present Continuous', 'Present Perfect', 'Past Simple'].map(item => (
                      <div key={item} className="rounded-lg bg-white/5 p-3 text-center">
                        <p className="text-sm text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: 'vocabulary',
              label: text.tab2,
              icon: 'fa-spell-check',
              content: (
                <div className="space-y-3">
                  <p className="text-white font-semibold">Vocabulary Content</p>
                  <div className="space-y-2">
                    {['Apple', 'Book', 'Cat', 'Dog', 'Egg'].map(word => (
                      <div key={word} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                        <span className="text-white">{word}</span>
                        <button className="text-sky-400 hover:text-sky-300">
                          <i className="fa-solid fa-volume-up" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: 'practice',
              label: text.tab3,
              icon: 'fa-dumbbell',
              content: (
                <div className="space-y-3">
                  <p className="text-white font-semibold">Practice Content</p>
                  <p className="text-slate-300">
                    Interactive exercises and quizzes would go here.
                  </p>
                  <button className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white">
                    Start Practice
                  </button>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Cards Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">{text.cardsSection}</h2>
        <div className="space-y-3">
          <MobileCard title={text.cardTitle}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Completed</span>
                <span className="font-bold text-white">15/30 lessons</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-2xl font-bold text-white">120</p>
                  <p className="text-xs text-slate-400">Points</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-xs text-slate-400">Streak</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-2xl font-bold text-white">A2</p>
                  <p className="text-xs text-slate-400">Level</p>
                </div>
              </div>
            </div>
          </MobileCard>

          <MobileCard compact>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <i className="fa-solid fa-trophy text-xl" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Achievement Unlocked!</p>
                <p className="text-sm text-slate-400">Complete 10 lessons</p>
              </div>
            </div>
          </MobileCard>
        </div>
      </section>

      {/* List Items Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">{text.listSection}</h2>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-2">
          <MobileListItem
            icon="fa-cog"
            iconColor="text-slate-400"
            title={text.settings}
            subtitle="Manage your preferences"
            onClick={() => console.log('Settings clicked')}
          />
          <MobileListItem
            icon="fa-user"
            iconColor="text-sky-400"
            title={text.profile}
            subtitle="View and edit profile"
            badge="90%"
            badgeColor="bg-sky-500/20 text-sky-400"
            onClick={() => console.log('Profile clicked')}
          />
          <MobileListItem
            icon="fa-bell"
            iconColor="text-amber-400"
            title={text.notifications}
            badge="5"
            badgeColor="bg-red-500 text-white"
            onClick={() => console.log('Notifications clicked')}
          />
          <MobileListItem
            icon="fa-heart"
            iconColor="text-rose-400"
            title="Favorites"
            subtitle="12 items"
            rightContent={
              <button className="rounded-lg bg-rose-500/20 px-3 py-1 text-sm text-rose-400">
                View
              </button>
            }
          />
        </div>
      </section>

      {/* Bottom Sheet Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">{text.bottomSheetSection}</h2>
        <button
          onClick={() => setShowBottomSheet(true)}
          className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30"
        >
          {text.openSheet}
        </button>

        <MobileBottomSheet
          isOpen={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          title="Filter Options"
        >
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-semibold text-white">Difficulty</p>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map(level => (
                  <button
                    key={level}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-white">Topics</p>
              <div className="space-y-2">
                {['Grammar', 'Vocabulary', 'Listening', 'Reading', 'Writing'].map(topic => (
                  <label key={topic} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-white">{topic}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowBottomSheet(false)}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Apply Filters
            </button>
          </div>
        </MobileBottomSheet>
      </section>

      {/* Usage Tips */}
      <section className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-6">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-sky-400">
          <i className="fa-solid fa-lightbulb" />
          Usage Tips
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• <code className="rounded bg-slate-800 px-2 py-1">MobileAccordion</code> - For collapsible sections</li>
          <li>• <code className="rounded bg-slate-800 px-2 py-1">MobileTabs</code> - For content categories</li>
          <li>• <code className="rounded bg-slate-800 px-2 py-1">MobileCard</code> - For content blocks</li>
          <li>• <code className="rounded bg-slate-800 px-2 py-1">MobileListItem</code> - For navigation lists</li>
          <li>• <code className="rounded bg-slate-800 px-2 py-1">MobileBottomSheet</code> - For modals/filters</li>
          <li>• <code className="rounded bg-slate-800 px-2 py-1">useIsMobile</code> - For responsive logic</li>
        </ul>
      </section>
    </div>
  );
};

export default MobileComponentsDemo;
