import React, { useMemo } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'lesson' | 'assignment' | 'test';
}

interface LearningCalendarProps {
  events?: CalendarEvent[];
  language: 'en' | 'vi';
}

const LearningCalendar: React.FC<LearningCalendarProps> = ({ events = [], language }) => {
  const t = {
    en: {
      title: 'Learning Calendar',
      today: 'Today',
      upcoming: 'Upcoming',
      noEvents: 'No scheduled events',
      lesson: 'Lesson',
      assignment: 'Assignment',
      test: 'Test'
    },
    vi: {
      title: 'Lịch học tập',
      today: 'Hôm nay',
      upcoming: 'Sắp tới',
      noEvents: 'Không có sự kiện nào',
      lesson: 'Bài học',
      assignment: 'Bài tập',
      test: 'Kiểm tra'
    }
  }[language];

  const typeIcons = {
    lesson: 'fa-book-open',
    assignment: 'fa-pen-to-square',
    test: 'fa-clipboard-question'
  };

  const typeColors = {
    lesson: 'text-blue-500',
    assignment: 'text-green-500',
    test: 'text-red-500'
  };

  const typeLabels = {
    lesson: t.lesson,
    assignment: t.assignment,
    test: t.test
  };

  const today = useMemo(() => new Date(), []);
  const todayEvents = events.filter(e => 
    e.date.toDateString() === today.toDateString()
  );
  const upcomingEvents = events.filter(e => 
    e.date > today
  ).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    }).format(date);
  };

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-calendar-days mr-2 text-purple-500"></i>
        {t.title}
      </h3>

      {/* Today's Events */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">
          {t.today}
        </h4>
        {todayEvents.length > 0 ? (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div key={event.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <i className={`fa-solid ${typeIcons[event.type]} ${typeColors[event.type]}`}></i>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{event.title}</p>
                  <p className="text-xs text-slate-500">{typeLabels[event.type]}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">{t.noEvents}</p>
        )}
      </div>

      {/* Upcoming Events */}
      <div>
        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">
          {t.upcoming}
        </h4>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                <i className={`fa-solid ${typeIcons[event.type]} ${typeColors[event.type]}`}></i>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{event.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">{t.noEvents}</p>
        )}
      </div>
    </div>
  );
};

export default LearningCalendar;
