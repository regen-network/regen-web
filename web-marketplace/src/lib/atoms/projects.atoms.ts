import { atom } from 'jotai';
import { initialActiveFilters } from 'web-marketplace/src/pages/Projects/AllProjects/AllProjects.ProjectFilterBody.utils';

import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from 'lib/env';

import { sortOptions } from 'pages/Projects/AllProjects/AllProjects.config';

export const useCommunityProjectsAtom = atom<boolean | undefined>(
  DEFAULT_COMMUNITY_PROJECTS_FILTER,
);
export const creditClassSelectedFiltersAtom = atom<Record<string, boolean>>({});
export const projectsSortAtom = atom(sortOptions[0].value);

export const environmentTypeFiltersAtom = atom<Record<string, boolean>>(
  initialActiveFilters.environmentTypeFilters,
);

export const regionFiltersAtom = atom<Record<string, boolean>>(
  initialActiveFilters.regionFilters,
);

export const marketTypeFiltersAtom = atom<Record<string, boolean>>(
  initialActiveFilters.marketTypeFilters,
);
