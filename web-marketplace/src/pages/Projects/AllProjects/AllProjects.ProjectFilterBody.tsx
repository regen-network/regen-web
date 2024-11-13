import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';
import { cn } from 'web-components/src/utils/styles/cn';

// import {
//   creditClassSelectedFiltersAtom,
//   useCommunityProjectsAtom,
// } from 'lib/atoms/projects.atoms';
// import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';
// import { COLOR_SCHEME, IS_TERRASOS } from 'lib/env';
// import { useTracker } from 'lib/tracker/useTracker';
import { useEcosystemTags } from 'hooks/useEcosystemTags';

// import { CommunityFilter } from './AllProjects.CommunityFilter';
// import {
//   COMMUNITY_FILTER_LABEL,
//   CREDIT_CLASS_FILTER_LABEL,
//   FILTERS_LABEL,
//   RESET_FILTERS_LABEL,
//   SIDE_FILTERS_BUTTON,
//   UNREGISTERED_PATH,
// } from './AllProjects.constants';
import {
  filterEcosystemIds,
  getFilters,
} from './AllProjects.ProjectFilterBody.TerrasosFilters';
import { CreditClassFilter, FilterCreditClassEvent } from './AllProjects.types';
import {
  getCreditClassSelectedFilters,
  getFilterSelected,
} from './AllProjects.utils';

type Props = {
  // creditClassFilters?: CreditClassFilter[];
  // hasCommunityProjects: boolean;
  // showFiltersReset: boolean;
  // resetFilter: () => void;
  sx?: SxProps<Theme>;
  className?: string;
  style?: React.CSSProperties;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  resetFilters: () => void;
};

const ProjectFilterBody = ({
  // creditClassFilters = [],
  // hasCommunityProjects,
  // showFiltersReset,
  // resetFilter,
  sx = [],
  className = '',
  style = {},
  activeFilters,
  setActiveFilters,
  resetFilters,
}: Props) => {
  const { _ } = useLingui();

  const ecosystemIcons = useEcosystemTags(filterEcosystemIds);
  const filters = getFilters(_, ecosystemIcons);
  const initialActiveFilters = filters.flatMap(filter =>
    filter.options.map(option => option.id),
  );
  // const [activeFiltersLocal, setActiveFiltersLocal] =
  //   useState<string[]>(initialActiveFilters);
  // const onFilterChangeLocal = (id: string) => {
  //   const newFilters = activeFiltersLocal.includes(id)
  //     ? activeFiltersLocal.filter(filterId => filterId !== id)
  //     : [...activeFiltersLocal, id];
  //   setActiveFiltersLocal(newFilters);
  // };
  const onFilterChange = (id: string) => {
    const newFilters = activeFilters.includes(id)
      ? activeFilters.filter(filterId => filterId !== id)
      : [...activeFilters, id];
    setActiveFilters(newFilters);
  };

  return (
    <div>
      <ProjectFilters
        filters={filters}
        activeFilterIds={activeFilters}
        onFilterChange={onFilterChange}
        onFilterReset={() => setActiveFilters(initialActiveFilters)}
        labels={{
          title: _(msg`Filters`),
          reset: _(msg`Reset`),
          expand: _(msg`+ See more`),
          collapse: _(msg`- See less`),
        }}
      />
    </div>
  );
};

export default ProjectFilterBody;
