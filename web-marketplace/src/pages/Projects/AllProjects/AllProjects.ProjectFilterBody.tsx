import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { buyingOptionsFiltersAtom } from 'lib/atoms/projects.atoms';
import { IS_REGEN } from 'lib/env';

import { useClientFilters } from '../hooks/useClientFilters';
import { CREDIT_CARD_BUYING_OPTION_ID } from '../Projects.constants';
import { CommunityFilter } from './AllProjects.CommunityFilter';
import {
  COMMUNITY_FILTER_LABEL,
  CREDIT_CLASS_FILTER_LABEL,
} from './AllProjects.constants';
import { CreditClassFilters } from './AllProjects.CreditClassFilters';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  creditClassFilters?: CreditClassFilter[];
  resetFilters: () => void;
  showResetButton?: boolean;
  hasCommunityProjects: boolean;
  buyingOptionsFilterOptions: FilterOption[];
};

const ProjectFilterBody = ({
  allProjects,
  creditClassFilters = [],
  resetFilters,
  showResetButton = true,
  hasCommunityProjects,
  buyingOptionsFilterOptions,
}: Props) => {
  const { _ } = useLingui();

  const clientFilters = useClientFilters({
    allProjects,
  });

  const location = useLocation();

  const prefinance = location.pathname.includes('prefinance');

  const [buyingOptionsFilters, setBuyingOptionsFilterAtom] = useAtom(
    buyingOptionsFiltersAtom,
  );

  return (
    <ProjectFilters
      filters={[
        {
          selectedFilters: prefinance
            ? // Show credit card option as checked by default from prefinance tab
              { ...buyingOptionsFilters, [CREDIT_CARD_BUYING_OPTION_ID]: true }
            : buyingOptionsFilters,
          displayType: 'checkbox',
          title: _(msg`Buying options`),
          options: buyingOptionsFilterOptions,
          onFilterChange: (id: string) => {
            setBuyingOptionsFilterAtom(prev => ({ ...prev, [id]: !prev[id] }));
          },
          hidden: !IS_REGEN,
        },
        {
          children: (
            <CreditClassFilters creditClassFilters={creditClassFilters} />
          ),
          title: _(CREDIT_CLASS_FILTER_LABEL),
          displayType: 'children',
          options: [],
          hidden: prefinance || !IS_REGEN,
        },
        {
          children: <CommunityFilter />,
          title: _(COMMUNITY_FILTER_LABEL),
          displayType: 'children',
          options: [],
          hidden: !hasCommunityProjects || prefinance || !IS_REGEN,
        },
        ...clientFilters,
      ]}
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
