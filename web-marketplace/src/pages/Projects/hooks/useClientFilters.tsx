import { useCallback, useMemo, useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import type { Filter } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';
import { countChangedFilters } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters.utils';

import {
  environmentTypeFiltersAtom,
  marketTypeFiltersAtom,
  regionFiltersAtom,
} from 'lib/atoms/projects.atoms';
import { IS_TERRASOS } from 'lib/env';

import { useEcosystemTags } from 'hooks/useEcosystemTags';

import {
  extractUniqueValues,
  filterEcosystemIds,
  getEcosystemTags,
  getMarketCheckboxes,
  getRegionTags,
  initialActiveFilters,
} from '../AllProjects/AllProjects.ProjectFilterBody.utils';
import { ProjectWithOrderData } from '../AllProjects/AllProjects.types';
import { toggleFilter } from '../Projects.utils';

type Params = {
  allProjects: ProjectWithOrderData[];
  mobile?: boolean;
};

export const useClientFilters = ({
  allProjects,
  mobile,
}: Params): {
  clientFilters: Filter[];
  resetTempClientFilters: () => void;
  numberOfTempFilters: number;
  setClientFilters: () => void;
} => {
  const { _ } = useLingui();
  const ecosystemIcons = useEcosystemTags(filterEcosystemIds);

  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );

  // Temporary filters used for handling filters states in the mobile filter modal
  const [tempEnvironmentTypeFilters, setTempEnvironmentTypeFilters] = useState(
    environmentTypeFilters,
  );
  const [tempRegionFilters, setTempRegionFilters] = useState(regionFilters);
  const [tempMarketTypeFilters, setTempMarketTypeFilters] =
    useState(marketTypeFilters);

  const resetTempClientFilters = useCallback(() => {
    setTempMarketTypeFilters(initialActiveFilters.marketTypeFilters);
    setTempEnvironmentTypeFilters(initialActiveFilters.environmentTypeFilters);
    setTempRegionFilters(initialActiveFilters.regionFilters);
  }, []);

  const setClientFilters = useCallback(() => {
    setMarketTypeFilters(tempMarketTypeFilters);
    setEnvironmentTypeFilters(tempEnvironmentTypeFilters);
    setRegionFilters(tempEnvironmentTypeFilters);
  }, [
    setEnvironmentTypeFilters,
    setMarketTypeFilters,
    setRegionFilters,
    tempEnvironmentTypeFilters,
    tempMarketTypeFilters,
  ]);

  const numberOfTempFilters = useMemo(
    () =>
      countChangedFilters(
        tempMarketTypeFilters,
        initialActiveFilters.marketTypeFilters,
      ) +
      countChangedFilters(
        tempEnvironmentTypeFilters,
        initialActiveFilters.environmentTypeFilters,
      ) +
      countChangedFilters(
        tempRegionFilters,
        initialActiveFilters.regionFilters,
      ),
    [tempEnvironmentTypeFilters, tempMarketTypeFilters, tempRegionFilters],
  );
  let clientFilters: Filter[] = [];

  if (IS_TERRASOS) {
    const uniqueRegions = [
      ...new Set(
        allProjects
          .map(project => project.region?.toLowerCase())
          .filter(Boolean),
      ),
    ] as string[];
    const uniqueEcosystemTypes = extractUniqueValues(
      allProjects,
      'ecosystemType',
      true,
    );
    const uniqueMarketTypes = extractUniqueValues(
      allProjects,
      'marketType',
      false,
    );

    clientFilters = [
      {
        selectedFilters: mobile ? tempRegionFilters : regionFilters,
        displayType: 'tag',
        title: _(msg`Region`),
        options: getRegionTags(_, uniqueRegions),
        onFilterChange: (id: string) => {
          mobile
            ? setTempRegionFilters(toggleFilter(id))
            : setRegionFilters(toggleFilter(id));
        },
      },
      {
        selectedFilters: mobile
          ? tempEnvironmentTypeFilters
          : environmentTypeFilters,
        displayType: 'tag',
        title: _(msg`Ecosystem`),
        options: getEcosystemTags(_, ecosystemIcons, uniqueEcosystemTypes),
        hasCollapse: true,
        onFilterChange: (id: string) => {
          mobile
            ? setTempEnvironmentTypeFilters(toggleFilter(id))
            : setEnvironmentTypeFilters(toggleFilter(id));
        },
      },
      {
        selectedFilters: mobile ? tempMarketTypeFilters : marketTypeFilters,
        displayType: 'checkbox',
        title: _(msg`Market`),
        options: getMarketCheckboxes(_, uniqueMarketTypes),
        onFilterChange: (id: string) => {
          mobile
            ? setTempMarketTypeFilters(toggleFilter(id))
            : setMarketTypeFilters(toggleFilter(id));
        },
      },
    ];
  }
  return {
    clientFilters,
    resetTempClientFilters,
    numberOfTempFilters,
    setClientFilters,
  };
};
