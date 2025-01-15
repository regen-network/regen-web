import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import type { Filter } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

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
} from '../AllProjects/AllProjects.ProjectFilterBody.utils';
import { ProjectWithOrderData } from '../AllProjects/AllProjects.types';

type Params = {
  allProjects: ProjectWithOrderData[];
};

export const useClientFilters = ({ allProjects }: Params): Filter[] => {
  const { _ } = useLingui();
  const ecosystemIcons = useEcosystemTags(filterEcosystemIds);

  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );

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

    return [
      {
        selectedFilters: regionFilters,
        displayType: 'tag',
        title: _(msg`Region`),
        options: getRegionTags(_, uniqueRegions),
        onFilterChange: (id: string) => {
          setRegionFilters(prev => ({ ...prev, [id]: !prev[id] }));
        },
      },
      {
        selectedFilters: environmentTypeFilters,
        displayType: 'tag',
        title: _(msg`Ecosystem`),
        options: getEcosystemTags(_, ecosystemIcons, uniqueEcosystemTypes),
        hasCollapse: true,
        onFilterChange: (id: string) => {
          setEnvironmentTypeFilters(prev => ({ ...prev, [id]: !prev[id] }));
        },
      },
      {
        selectedFilters: marketTypeFilters,
        displayType: 'checkbox',
        title: _(msg`Market`),
        options: getMarketCheckboxes(_, uniqueMarketTypes),
        onFilterChange: (id: string) => {
          setMarketTypeFilters(prev => ({ ...prev, [id]: !prev[id] }));
        },
      },
    ];
  }
  return [];
};
