import { Curriculum } from '../types';

// Import all per-book curriculum data
import { goaldigger1Data } from './gd1';
import { goaldigger2Data } from './gd2';
import { goaldigger3Data } from './gd3';
import { goaldigger4Data } from './gd4';
import { smStarterData } from './sm-starter';
import { sm1Data } from './sm1';
import { sm2Data } from './sm2';
import { sm3Data } from './sm3';
import { sm4Data } from './sm4';
import { sw6Data } from './sw6';
import { sw7Data } from './sw7';
import { sw8Data } from './sw8';
import { sw9Data } from './sw9';
import { g10Data } from './g10';
import { g11Data } from './g11';
import { g12Data } from './g12';

// Complete curriculum with all imported data
export const curriculumData: Curriculum = [
  {
    category: { en: 'Kindergarten IVS-Mastery', vi: 'Mầm non IVS-Mastery' },
    levels: [
      goaldigger1Data,
      goaldigger2Data,
      goaldigger3Data,
      goaldigger4Data,
    ],
  },
  {
    category: { en: 'Primary IVS-Mastery', vi: 'Tiểu học IVS-Mastery' },
    levels: [
      smStarterData,
      sm1Data,
      sm2Data,
      sm3Data,
      sm4Data,
    ],
  },
  {
    category: { en: 'Secondary IVS-Mastery', vi: 'Trung học IVS-Mastery' },
    levels: [
      sw6Data,
      sw7Data,
      sw8Data,
      sw9Data,
    ],
  },
  {
    category: { en: 'Highschool IVS-Mastery', vi: 'Trung học phổ thông IVS-Mastery' },
    levels: [
      g10Data,
      g11Data,
      g12Data,
    ],
  },
];

export default curriculumData;
