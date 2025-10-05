import { Curriculum } from '../types';

// Minimal clean curriculum scaffold. We'll populate this with imported
// per-book modules after the workspace is stable.
export const curriculumData: Curriculum = [
  {
    category: { en: 'Kindergarten IVS-Mastery', vi: 'Mầm non IVS-Mastery' },
    levels: [],
  },
  {
    category: { en: 'Primary IVS-Mastery', vi: 'Tiểu học IVS-Mastery' },
    levels: [],
  },
  {
    category: { en: 'Secondary IVS-Mastery', vi: 'Trung học IVS-Mastery' },
    levels: [],
  },
  {
    category: { en: 'Highschool IVS-Mastery', vi: 'Trung học phổ thông IVS-Mastery' },
    levels: [],
  },
];

export default curriculumData;
