import React from 'react';
import { curriculumData } from '../data/curriculum';
import type { Curriculum } from '../types';

interface CurriculumProps {
  language: 'en' | 'vi';
  onExplore: () => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ language, onExplore }) => {
  const data: Curriculum = curriculumData;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{language === 'vi' ? 'Khám phá chương trình' : 'Explore the curriculum'}</h1>
      <p className="text-slate-400 mb-6">{language === 'vi' ? 'Chọn một chương trình để bắt đầu học hoặc xem chi tiết từng cấp.' : 'Choose a program to begin or view details for each level.'}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 9).map((cat, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/8 hover:scale-[1.01] transition">
            <h3 className="font-semibold text-lg text-white">{cat.category[language]}</h3>
            <p className="text-sm text-slate-300 mt-2">{cat.levels?.[0]?.subtitle?.[language] || ''}</p>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={onExplore} className="btn bg-sky-500 text-white py-2 px-3 rounded">{language === 'vi' ? 'Bắt đầu tại đây' : 'Start here'}</button>
              <span className="text-xs text-slate-400">{language === 'vi' ? 'Xem toàn bộ chương trình' : 'Browse full program'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
