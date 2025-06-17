import { atom } from 'jotai';
import { sortOptions } from 'legacy-pages/Projects/AllProjects/AllProjects.config';
import { initialActiveFilters } from 'web-marketplace/src/legacy-pages/Projects/AllProjects/AllProjects.ProjectFilterBody.utils';

import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from 'lib/env';

export const showCommunityProjectsAtom = atom<boolean | undefined>(
  DEFAULT_COMMUNITY_PROJECTS_FILTER,
);
export const creditClassFiltersAtom = atom<Record<string, boolean>>({});
export const creditClassInitialFiltersAtom = atom<Record<string, boolean>>({});
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
