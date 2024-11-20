import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';

import { useEcosystemTags } from 'hooks/useEcosystemTags';

import {
  filterEcosystemIds,
  getFilters,
} from './AllProjects.ProjectFilterBody.utils';
import { ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  resetFilters: () => void;
  showResetButton?: boolean;
};

const ProjectFilterBody = ({
  allProjects,
  activeFilters,
  setActiveFilters,
  resetFilters,
  showResetButton = true,
}: Props) => {
  const { _ } = useLingui();
  const ecosystemIcons = useEcosystemTags(filterEcosystemIds);
  const filters = getFilters(_, ecosystemIcons, allProjects);

  const onFilterChange = (id: string) => {
    const newFilters = activeFilters.includes(id)
      ? activeFilters.filter(filterId => filterId !== id)
      : [...activeFilters, id];
    setActiveFilters(newFilters);
  };

  return (
    <ProjectFilters
      filters={filters}
      activeFilterIds={activeFilters}
      onFilterChange={onFilterChange}
      onFilterReset={resetFilters}
      showResetButton={showResetButton}
      labels={{
        title: _(msg`Filters`),
        reset: _(msg`Reset`),
        expand: _(msg`+ See more`),
        collapse: _(msg`- See less`),
      }}
    />
  );
};

export default ProjectFilterBody;
