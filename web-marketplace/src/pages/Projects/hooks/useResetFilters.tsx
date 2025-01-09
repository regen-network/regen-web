import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';

import { hasChangedFilters } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters.utils';

import {
  buyingOptionsFiltersAtom,
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
  const [buyingOptionsFilters, setBuyingOptionsFilters] = useAtom(
    buyingOptionsFiltersAtom,
  );

  const resetFilters = useCallback(() => {
    setMarketTypeFilters(initialActiveFilters.marketTypeFilters);
    setEnvironmentTypeFilters(initialActiveFilters.environmentTypeFilters);
    setRegionFilters(initialActiveFilters.regionFilters);
    setUseCommunityProjects(DEFAULT_COMMUNITY_PROJECTS_FILTER);
    setCreditClassSelectedFilters(creditClassInitialFilters);
    setBuyingOptionsFilters(initialActiveFilters.buyingOptionsFilters);
  }, [
    creditClassInitialFilters,
    setBuyingOptionsFilters,
    setCreditClassSelectedFilters,
    setEnvironmentTypeFilters,
    setMarketTypeFilters,
    setRegionFilters,
    setUseCommunityProjects,
  ]);

  const showResetButton = useMemo(
    () =>
      hasChangedFilters(
        marketTypeFilters,
        initialActiveFilters.marketTypeFilters,
      ) ||
      hasChangedFilters(
        environmentTypeFilters,
        initialActiveFilters.environmentTypeFilters,
      ) ||
      hasChangedFilters(regionFilters, initialActiveFilters.regionFilters) ||
      hasChangedFilters(
        buyingOptionsFilters,
        initialActiveFilters.buyingOptionsFilters,
      ) ||
      hasChangedFilters(
        creditClassSelectedFilters,
        creditClassInitialFilters,
      ) ||
      useCommunityProjects !== DEFAULT_COMMUNITY_PROJECTS_FILTER,
    [
      buyingOptionsFilters,
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
