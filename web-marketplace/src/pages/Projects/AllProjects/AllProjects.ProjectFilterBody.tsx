import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom, useAtomValue } from 'jotai';

import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';
import { hasChangedFilters } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters.utils';

import {
  creditClassFiltersAtom,
  creditClassInitialFiltersAtom,
  showCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { DEFAULT_COMMUNITY_PROJECTS_FILTER, IS_REGEN } from 'lib/env';

import { useBuyingOptionsFilters } from '../hooks/useBuyingOptionsFilters';
import { useClientFilters } from '../hooks/useClientFilters';
import { CREDIT_CARD_BUYING_OPTION_ID } from '../Projects.constants';
import { CommunityFilter } from './AllProjects.CommunityFilter';
import {
  COMMUNITY_FILTER_LABEL,
  CREDIT_CLASS_FILTER_LABEL,
} from './AllProjects.constants';
import { CreditClassFilters } from './AllProjects.CreditClassFilters';
import { initialActiveFilters } from './AllProjects.ProjectFilterBody.utils';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type Props = {
  allProjects: ProjectWithOrderData[];
  creditClassFilterOptions?: CreditClassFilter[];
  resetFilters: () => void;
  showResetButton?: boolean;
  hasCommunityProjects: boolean;
  buyingOptionsFilterOptions: FilterOption[];
  mobile?: boolean;
};

const ProjectFilterBody = ({
  allProjects,
  creditClassFilterOptions = [],
  resetFilters,
  showResetButton = true,
  hasCommunityProjects,
  buyingOptionsFilterOptions,
  mobile, // on mobile, filters are only applied after clicking "apply filters" button
}: Props) => {
  const { _ } = useLingui();

  const {
    clientFilters,
    resetTempClientFilters,
    showResetButtonForTempClientFilters,
  } = useClientFilters({
    allProjects,
    mobile,
  });

  const location = useLocation();
  const prefinance = location.pathname.includes('prefinance');

  const [buyingOptionsFilters, setBuyingOptionsFilters] =
    useBuyingOptionsFilters();
  const [tempBuyingOptionsFilters, setTempBuyingOptionsFilters] =
    useState(buyingOptionsFilters);

  const selectedBuyingOptionFilters = useMemo(
    () => (mobile ? tempBuyingOptionsFilters : buyingOptionsFilters),
    [buyingOptionsFilters, mobile, tempBuyingOptionsFilters],
  );
  const creditClassFilters = useAtomValue(creditClassFiltersAtom);
  const creditClassInitialFilters = useAtomValue(creditClassInitialFiltersAtom);
  const [tempCreditClassFilters, setTempCreditClassFilters] =
    useState(creditClassFilters);

  const showCommunityProjects = useAtomValue(showCommunityProjectsAtom);
  const [tempShowCommunityProjects, setTempShowCommunityProjects] = useState(
    showCommunityProjects,
  );

  const tempResetFilters = useCallback(() => {
    resetTempClientFilters();
    setTempShowCommunityProjects(DEFAULT_COMMUNITY_PROJECTS_FILTER);
    setTempCreditClassFilters(creditClassInitialFilters);
    setTempBuyingOptionsFilters(initialActiveFilters.buyingOptionsFilters);
  }, [creditClassInitialFilters, resetTempClientFilters]);

  const showTempResetButton = useMemo(
    () =>
      showResetButtonForTempClientFilters ||
      hasChangedFilters(
        tempBuyingOptionsFilters,
        initialActiveFilters.buyingOptionsFilters,
      ) ||
      hasChangedFilters(tempCreditClassFilters, creditClassInitialFilters) ||
      tempShowCommunityProjects !== DEFAULT_COMMUNITY_PROJECTS_FILTER,
    [
      showResetButtonForTempClientFilters,
      tempBuyingOptionsFilters,
      tempCreditClassFilters,
      creditClassInitialFilters,
      tempShowCommunityProjects,
    ],
  );

  return (
    <ProjectFilters
      filters={[
        {
          selectedFilters: prefinance
            ? // Show credit card option as checked by default from prefinance tab
              {
                ...selectedBuyingOptionFilters,
                [CREDIT_CARD_BUYING_OPTION_ID]: true,
              }
            : selectedBuyingOptionFilters,
          displayType: 'checkbox',
          title: _(msg`Buying options`),
          options: buyingOptionsFilterOptions,
          onFilterChange: (id: string) => {
            mobile
              ? setTempBuyingOptionsFilters(prev => ({
                  ...prev,
                  [id]: !prev[id],
                }))
              : setBuyingOptionsFilters(prev => ({ ...prev, [id]: !prev[id] }));
          },
          hidden: !IS_REGEN,
        },
        {
          children: (
            <CreditClassFilters
              creditClassFilterOptions={creditClassFilterOptions}
              tempCreditClassFilters={tempCreditClassFilters}
              setTempCreditClassFilters={setTempCreditClassFilters}
              mobile={mobile}
            />
          ),
          title: _(CREDIT_CLASS_FILTER_LABEL),
          displayType: 'children',
          options: [],
          hidden: prefinance || !IS_REGEN,
        },
        {
          children: (
            <CommunityFilter
              tempShowCommunityProjects={tempShowCommunityProjects}
              setTempShowCommunityProjects={setTempShowCommunityProjects}
              mobile={mobile}
            />
          ),
          title: _(COMMUNITY_FILTER_LABEL),
          displayType: 'children',
          options: [],
          hidden: !hasCommunityProjects || prefinance || !IS_REGEN,
        },
        ...clientFilters,
      ]}
      onFilterReset={mobile ? tempResetFilters : resetFilters}
      showResetButton={mobile ? showTempResetButton : showResetButton}
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
