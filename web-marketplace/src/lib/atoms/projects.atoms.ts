import { atom } from 'jotai';

import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from 'lib/env';

import { sortOptions } from 'pages/Projects/AllProjects/AllProjects.config';

export const useCommunityProjectsAtom = atom<boolean | undefined>(
  DEFAULT_COMMUNITY_PROJECTS_FILTER,
);
export const creditClassSelectedFiltersAtom = atom<Record<string, boolean>>({});
export const projectsSortAtom = atom(sortOptions[0].value);
