import React, { useMemo } from 'react';
import { curriculumData } from '../data/curriculum';
import type { Curriculum, User, Course } from '../types';

interface CurriculumProps {
  language: 'en' | 'vi';
  user: User;
  onSelectCourse: (course: Course) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ language, user, onSelectCourse }) => {
  const data: Curriculum = curriculumData;

  // Filter curriculum based on user's gradeLevel
  const getFilteredCurriculum = () => {
    if (!user.gradeLevel) return data; // Show all if no gradeLevel set
    
    const gradeMap: Record<string, string[]> = {
      'kindergarten': ['Kindergarten', 'Mầm non'],
      'primary': ['Primary', 'Tiểu học', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
      'secondary': ['Secondary', 'THCS', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'],
      'high-school': ['High School', 'THPT', 'Grade 10', 'Grade 11', 'Grade 12'],
    };

    const keywords = gradeMap[user.gradeLevel] || [];
    return data.filter(cat => 
      keywords.some(kw => cat.category.en.includes(kw) || cat.category.vi.includes(kw))
    );
  };

  const filteredData = getFilteredCurriculum();

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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">{language === 'vi' ? 'Chương trình học' : 'Learning Programs'}</h1>
      <p className="text-slate-300 mb-6">{language === 'vi' ? 'Chọn một chương trình để xem chi tiết.' : 'Choose a program to view details.'}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((cat, idx) => {
          const colorClasses = [
            'from-sky-500/20 to-blue-600/20 border-sky-400/30',
            'from-emerald-500/20 to-green-600/20 border-emerald-400/30',
            'from-purple-500/20 to-pink-600/20 border-purple-400/30',
            'from-amber-500/20 to-orange-600/20 border-amber-400/30',
            'from-indigo-500/20 to-violet-600/20 border-indigo-400/30',
          ];
          const colorClass = colorClasses[idx % colorClasses.length];

          const buttonText = user.role === 'teacher' 
            ? (language === 'vi' ? 'Xem chương trình' : 'View Program')
            : (language === 'vi' ? 'Bắt đầu học' : 'Start Learning');

          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur hover:scale-[1.02] transition cursor-pointer`}
              onClick={() => handleCategoryClick(idx)}
            >
              <h3 className="font-bold text-xl text-white mb-2">{cat.category[language]}</h3>
              <p className="text-sm text-slate-200 mb-4">{cat.levels?.[0]?.subtitle?.[language] || ''}</p>
              <button className="btn bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg text-sm font-semibold">
                {buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center text-slate-400 mt-12">
          <p>{language === 'vi' ? 'Không tìm thấy chương trình phù hợp. Vui lòng cập nhật thông tin cá nhân.' : 'No programs found. Please update your profile.'}</p>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
