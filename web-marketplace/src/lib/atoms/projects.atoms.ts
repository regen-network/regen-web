import { atom } from 'jotai';

import { sortOptions } from 'pages/Projects/AllProjects/AllProjects.config';

export const useCommunityProjectsAtom = atom<boolean | undefined>(false);
export const creditClassSelectedFiltersAtom = atom<Record<string, boolean>>({});
export const projectsSortAtom = atom(sortOptions[0].value);
