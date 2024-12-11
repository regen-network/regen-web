import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';

import {
  creditClassSelectedFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';

import { useEcosystemTags } from 'hooks/useEcosystemTags';

import { CommunityFilter } from './AllProjects.CommunityFilter';
import {
  COMMUNITY_FILTER_LABEL,
  CREDIT_CLASS_FILTER_LABEL,
  UNREGISTERED_PATH,
} from './AllProjects.constants';
import { CreditClassFilters } from './AllProjects.CreditClassFilters';
import {
  filterEcosystemIds,
  getClientFilters,
} from './AllProjects.ProjectFilterBody.utils';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  creditClassFilters?: CreditClassFilter[];
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  resetFilters: () => void;
  showResetButton?: boolean;
  hasCommunityProjects: boolean;
};

const ProjectFilterBody = ({
  allProjects,
  creditClassFilters = [],
  activeFilters,
  setActiveFilters,
  resetFilters,
  showResetButton = true,
  hasCommunityProjects,
}: Props) => {
  const { _ } = useLingui();
  const ecosystemIcons = useEcosystemTags(filterEcosystemIds);
  const clientFilters = getClientFilters(_, ecosystemIcons, allProjects);
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );
  console.log('hasCommunityProjects', hasCommunityProjects);

  const onFilterChange = (id: string) => {
    const newFilters = activeFilters.includes(id)
      ? activeFilters.filter(filterId => filterId !== id)
      : [...activeFilters, id];
    setActiveFilters(newFilters);
  };

  return (
    <ProjectFilters
      filters={[
        {
          children: (
            <CreditClassFilters creditClassFilters={creditClassFilters} />
          ),
          title: _(CREDIT_CLASS_FILTER_LABEL),
          displayType: 'children',
          options: [],
        },
        {
          children: <CommunityFilter />,
          title: _(COMMUNITY_FILTER_LABEL),
          displayType: 'children',
          options: [],
          hidden: !hasCommunityProjects,
        },
        ...clientFilters,
      ]}
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
