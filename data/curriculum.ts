// Re-export curriculum for legacy components that import from data/curriculum
import { allModules, foundationModules, industryModules } from '../src/data/curriculum';

export const curriculumData = {
  modules: allModules,
  foundation: foundationModules,
  industry: industryModules
};

export default curriculumData;
