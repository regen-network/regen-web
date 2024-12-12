import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';

import {
  creditClassInitialFiltersAtom,
  creditClassSelectedFiltersAtom,
  environmentTypeFiltersAtom,
  marketTypeFiltersAtom,
  regionFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from 'lib/env';

import { initialActiveFilters } from '../AllProjects/AllProjects.ProjectFilterBody.utils';

export const useResetFilters = () => {
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );
  const [creditClassInitialFilters] = useAtom(creditClassInitialFiltersAtom);
  const [useCommunityProjects, setUseCommunityProjects] = useAtom(
    useCommunityProjectsAtom,
  );
  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );

  const resetFilters = useCallback(() => {
    setMarketTypeFilters(initialActiveFilters.marketTypeFilters);
    setEnvironmentTypeFilters(initialActiveFilters.environmentTypeFilters);
    setRegionFilters(initialActiveFilters.regionFilters);
    setUseCommunityProjects(DEFAULT_COMMUNITY_PROJECTS_FILTER);
    setCreditClassSelectedFilters(creditClassInitialFilters);
  }, [
    creditClassInitialFilters,
    setCreditClassSelectedFilters,
    setEnvironmentTypeFilters,
    setMarketTypeFilters,
    setRegionFilters,
    setUseCommunityProjects,
  ]);
  console.log('creditClassSelectedFilters', creditClassSelectedFilters);
  console.log('creditClassInitialFilters', creditClassInitialFilters);
  const showResetButton = useMemo(
    () =>
      Object.entries(marketTypeFilters).filter(([_, value]) => value).length !==
        Object.entries(initialActiveFilters.marketTypeFilters).length ||
      Object.entries(environmentTypeFilters).filter(([_, value]) => value)
        .length !==
        Object.entries(initialActiveFilters.environmentTypeFilters).length ||
      Object.entries(regionFilters).filter(([_, value]) => value).length !==
        Object.entries(initialActiveFilters.regionFilters).length ||
      Object.entries(creditClassSelectedFilters).filter(([_, value]) => value)
        .length !==
        Object.entries(creditClassInitialFilters).filter(([_, value]) => value)
          .length ||
      useCommunityProjects !== DEFAULT_COMMUNITY_PROJECTS_FILTER,
    [
      creditClassInitialFilters,
      creditClassSelectedFilters,
      environmentTypeFilters,
      marketTypeFilters,
      regionFilters,
      useCommunityProjects,
    ],
  );

  return { resetFilters, showResetButton };
};
