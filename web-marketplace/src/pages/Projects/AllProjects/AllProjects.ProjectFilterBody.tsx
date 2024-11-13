import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { SxProps, Theme } from '@mui/material';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';

import { useEcosystemTags } from 'hooks/useEcosystemTags';

import {
  filterEcosystemIds,
  getFilters,
} from './AllProjects.ProjectFilterBody.TerrasosFilters';

type Props = {
  sx?: SxProps<Theme>;
  className?: string;
  style?: React.CSSProperties;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  resetFilters: () => void;
};

const ProjectFilterBody = ({
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
