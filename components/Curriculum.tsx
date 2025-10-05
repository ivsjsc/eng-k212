import React, { useMemo } from 'react';
import { curriculumData } from '../data/curriculum';
import type { Curriculum, User, Course } from '../types';

interface CurriculumProps {
  language: 'en' | 'vi';
  user: User;
  onSelectCourse: (course: Course) => void;
  setView?: (v: string) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ language, user, onSelectCourse, setView }) => {
  const data: Curriculum = curriculumData;

  // Normalize gradeLevel values and filter curriculum accordingly
  const normalizeGradeLevel = (raw?: string) => {
    if (!raw) return '';
    const s = raw.toString().trim().toLowerCase();
    // common numeric forms -> map to buckets
    const gradeNumMatch = s.match(/(grade\s*-?\s*)?(\d{1,2})/i);
    if (gradeNumMatch) {
      const n = Number(gradeNumMatch[2]);
      if (n <= 5) return 'primary';
      if (n >= 6 && n <= 9) return 'secondary';
      if (n >= 10) return 'high-school';
    }
    if (s.includes('kindergarten') || s.includes('mầm') || s.includes('preschool')) return 'kindergarten';
    if (s.includes('primary') || s.includes('tiểu') || s.includes('grade 1') || s.includes('grade 5')) return 'primary';
    if (s.includes('secondary') || s.includes('thcs') || s.includes('grade 6')) return 'secondary';
    if (s.includes('high') || s.includes('thpt') || s.includes('grade 10')) return 'high-school';
    return '';
  };

  const getFilteredCurriculum = () => {
    const normalized = normalizeGradeLevel(user.gradeLevel);
    if (!normalized) return data; // Show all if no gradeLevel set or not parsable

    const gradeMap: Record<string, string[]> = {
      'kindergarten': ['Kindergarten', 'Mầm non'],
      'primary': ['Primary', 'Tiểu học', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
      'secondary': ['Secondary', 'THCS', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'],
      'high-school': ['High School', 'THPT', 'Grade 10', 'Grade 11', 'Grade 12'],
    };

    const keywords = gradeMap[normalized] || [];
    return data.filter(cat => 
      keywords.some(kw => cat.category.en.includes(kw) || cat.category.vi.includes(kw))
    );
  };

  const filteredData = getFilteredCurriculum();
  // If the user's gradeLevel produced zero matches, fall back to showing all programs
  // but keep a flag so we can show a helpful notice explaining what's happening.
  const noMatchesForGrade = !!user.gradeLevel && filteredData.length === 0;
  const effectiveData = noMatchesForGrade ? data : filteredData;

  const allCourses = useMemo(() => {
    const colorPalette = ['#4A90E2', '#50E3C2', '#F5A623', '#BD10E0', '#9013FE', '#D0021B', '#F8E71C', '#7ED321'];
    let colorIndex = 0;
    const slug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return filteredData.flatMap(category =>
      category.levels.map(level => {
        const courseId = `course-${slug(level.title.en)}`;
        return {
          id: courseId,
          title: language === 'vi' ? level.title.vi : level.title.en,
          series: language === 'vi' ? category.category.vi : category.category.en,
          level: (level.subtitle.en.split(' - ')[0]) as Course['level'],
          imageUrl: `https://picsum.photos/seed/${level.level}/400/225`,
          description: language === 'vi' ? level.subtitle.vi : level.subtitle.en,
          lessons: [],
          color: colorPalette[colorIndex++ % colorPalette.length],
          progress: 0,
          rawLevel: level,
        } as Course;
      })
    );
  }, [filteredData, language]);

  const handleCategoryClick = (categoryIndex: number) => {
    const category = filteredData[categoryIndex];
    if (category && category.levels.length > 0) {
      // Find the first course for this category
      const firstCourse = allCourses.find(course => course.series === (language === 'vi' ? category.category.vi : category.category.en));
      if (firstCourse) {
        onSelectCourse(firstCourse);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white">{language === 'vi' ? 'Chương trình học' : 'Learning Programs'}</h1>
      <p className="text-slate-300 mb-8">{language === 'vi' ? 'Chọn khóa học để bắt đầu học tập' : 'Select a course to start learning'}</p>

      {/* Show all courses grouped by category */}
      {noMatchesForGrade && (
        <div className="mb-6 p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 flex items-center justify-between">
          <div>
            {language === 'vi'
              ? 'Không có chương trình khớp với cấp học bạn đã chọn. Hiện đang hiển thị tất cả chương trình.'
              : 'No programs match the grade level you selected. Showing all programs instead.'}
            <div className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              {language === 'vi' ? 'Bạn có thể chỉnh sửa thông tin hồ sơ để xem chương trình phù hợp.' : 'You can edit your profile to see matching programs.'}
            </div>
          </div>
          <div>
            <button
              onClick={() => setView ? setView('settings') : undefined}
              className="btn btn-sm btn-primary"
            >
              {language === 'vi' ? 'Chỉnh sửa hồ sơ' : 'Edit Profile'}
            </button>
          </div>
        </div>
      )}

      {effectiveData.map((cat, catIdx) => (
        <div key={catIdx} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
            {cat.category[language]}
            <span className="text-sm font-normal text-slate-400">({cat.levels.length} {language === 'vi' ? 'khóa học' : 'courses'})</span>
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.levels.map((level, levelIdx) => {
              const course = allCourses.find(c => c.rawLevel === level);
              if (!course) return null;

              const colorClasses = [
                'from-sky-500/20 to-blue-600/20 border-sky-400/30',
                'from-emerald-500/20 to-green-600/20 border-emerald-400/30',
                'from-purple-500/20 to-pink-600/20 border-purple-400/30',
                'from-amber-500/20 to-orange-600/20 border-amber-400/30',
                'from-indigo-500/20 to-violet-600/20 border-indigo-400/30',
                'from-rose-500/20 to-pink-600/20 border-rose-400/30',
              ];
              const colorClass = colorClasses[levelIdx % colorClasses.length];

              const buttonText = user.role === 'teacher' 
                ? (language === 'vi' ? 'Xem chi tiết' : 'View Details')
                : (language === 'vi' ? 'Bắt đầu học' : 'Start Learning');

              return (
                <div
                  key={levelIdx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur hover:scale-[1.02] transition cursor-pointer group`}
                  onClick={() => onSelectCourse(course)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold text-white">
                      {language === 'vi' ? `Lớp ${level.level}` : `Grade ${level.level}`}
                    </span>
                    <i className="fa-solid fa-arrow-right text-white opacity-0 group-hover:opacity-100 transition"></i>
                  </div>
                  
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-200 mb-4 line-clamp-1">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-300">
                      <i className="fa-solid fa-book mr-1"></i>
                      {level.units?.length || 0} {language === 'vi' ? 'bài' : 'units'}
                    </div>
                    <button className="btn bg-white/20 hover:bg-white/30 text-white py-1 px-3 rounded-lg text-xs font-semibold">
                      {buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredData.length === 0 && (
        <div className="text-center text-slate-400 mt-12">
          <i className="fa-solid fa-book text-4xl mb-4"></i>
          <p>{language === 'vi' ? 'Không tìm thấy chương trình phù hợp. Vui lòng cập nhật thông tin cá nhân.' : 'No programs found. Please update your profile.'}</p>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
