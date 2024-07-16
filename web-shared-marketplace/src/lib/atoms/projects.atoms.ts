import { atom } from 'jotai';
import { sortOptions } from 'src/pages/Projects/AllProjects/AllProjects.config';

import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from '../env';

export const useCommunityProjectsAtom = atom<boolean | undefined>(
  DEFAULT_COMMUNITY_PROJECTS_FILTER,
);
export const creditClassSelectedFiltersAtom = atom<Record<string, boolean>>({});
export const projectsSortAtom = atom(sortOptions[0].value);
