import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';

import { hasChangedFilters } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters.utils';

import {
  creditClassFiltersAtom,
  creditClassInitialFiltersAtom,
  environmentTypeFiltersAtom,
  marketTypeFiltersAtom,
  regionFiltersAtom,
  showCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { DEFAULT_COMMUNITY_PROJECTS_FILTER } from 'lib/env';

import { initialActiveFilters } from '../AllProjects/AllProjects.ProjectFilterBody.utils';
import { useBuyingOptionsFilters } from './useBuyingOptionsFilters';

export const useResetFilters = () => {
  const [creditClassFilters, setCreditClassFilters] = useAtom(
    creditClassFiltersAtom,
  );
  const [creditClassInitialFilters] = useAtom(creditClassInitialFiltersAtom);
  const [showCommunityProjects, setShowCommunityProjects] = useAtom(
    showCommunityProjectsAtom,
  );
  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );
  const [buyingOptionsFilters, setBuyingOptionsFilters] =
    useBuyingOptionsFilters();

  const resetFilters = useCallback(() => {
    setMarketTypeFilters(initialActiveFilters.marketTypeFilters);
    setEnvironmentTypeFilters(initialActiveFilters.environmentTypeFilters);
    setRegionFilters(initialActiveFilters.regionFilters);
    setShowCommunityProjects(DEFAULT_COMMUNITY_PROJECTS_FILTER);
    setCreditClassFilters(creditClassInitialFilters);
    setBuyingOptionsFilters(initialActiveFilters.buyingOptionsFilters);
  }, [
    creditClassInitialFilters,
    setBuyingOptionsFilters,
    setCreditClassFilters,
    setEnvironmentTypeFilters,
    setMarketTypeFilters,
    setRegionFilters,
    setShowCommunityProjects,
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
      hasChangedFilters(creditClassFilters, creditClassInitialFilters) ||
      showCommunityProjects !== DEFAULT_COMMUNITY_PROJECTS_FILTER,
    [
      buyingOptionsFilters,
      creditClassInitialFilters,
      creditClassFilters,
      environmentTypeFilters,
      marketTypeFilters,
      regionFilters,
      showCommunityProjects,
    ],
  );

  return { resetFilters, showResetButton };
};
