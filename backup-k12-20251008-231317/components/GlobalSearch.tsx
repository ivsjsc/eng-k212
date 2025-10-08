import React, { useState, useMemo, useEffect } from 'react';
import type { View } from '../types';
import { curriculumData } from '../data/curriculum';

interface GlobalSearchProps {
  language: 'en' | 'vi';
  onClose: () => void;
  onOpenCourse?: (levelIndex: number, unitIndex?: number, lessonId?: string) => void;
}

type SearchResult = {
  type: 'level' | 'unit' | 'lesson';
  title: string;
  subtitle?: string;
  levelIndex: number;
  unitIndex?: number;
  lessonId?: string;
};

const buildIndex = (lang: 'en' | 'vi') => {
  const results: SearchResult[] = [];
  curriculumData.forEach((category, catIndex) => {
    category.levels.forEach((level, levelIndex) => {
      results.push({ type: 'level', title: level.title[lang], subtitle: level.subtitle[lang], levelIndex, unitIndex: undefined });
      level.units.forEach((unit, unitIndex) => {
        results.push({ type: 'unit', title: unit.title[lang], levelIndex, unitIndex });
        unit.lessons.forEach((lesson) => {
          results.push({ type: 'lesson', title: lesson.title[lang], levelIndex, unitIndex, lessonId: lesson.id.toString() });
        });
      });
    });
  });
  return results;
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ language, onClose, onOpenCourse }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const index = useMemo(() => buildIndex(language), [language]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 50);
    return index.filter(item => item.title.toLowerCase().includes(q) || (item.subtitle && item.subtitle.toLowerCase().includes(q))).slice(0, 100);
  }, [query, index]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        const item = results[selectedIndex];
        if (item) {
          if (onOpenCourse) onOpenCourse(item.levelIndex, item.unitIndex, item.lessonId);
          onClose();
        }
      }
      if (e.key === 'ArrowDown') setSelectedIndex(i => Math.min(i + 1, results.length - 1));
      if (e.key === 'ArrowUp') setSelectedIndex(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selectedIndex, onClose, onOpenCourse]);

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-6 bg-black/60">
      <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={language === 'vi' ? 'Tìm kiếm khóa học, đơn vị, bài học...' : 'Search courses, units, lessons...'}
            className="w-full bg-slate-800 text-white rounded-md px-4 py-3 outline-none border border-slate-700 focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={onClose} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white">{language === 'vi' ? 'Đóng' : 'Close'}</button>
        </div>
        <div className="max-h-[60vh] overflow-auto">
          {results.map((r, idx) => (
            <div
              key={`${r.type}-${r.levelIndex}-${r.unitIndex}-${r.lessonId}-${idx}`}
              className={`p-3 border-b border-slate-800 cursor-pointer ${idx === selectedIndex ? 'bg-slate-800' : ''}`}
              onClick={() => { if (onOpenCourse) onOpenCourse(r.levelIndex, r.unitIndex, r.lessonId); onClose(); }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.title}</div>
                  {r.subtitle && <div className="text-sm text-slate-400">{r.subtitle}</div>}
                </div>
                <div className="text-xs text-slate-500">{r.type.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
