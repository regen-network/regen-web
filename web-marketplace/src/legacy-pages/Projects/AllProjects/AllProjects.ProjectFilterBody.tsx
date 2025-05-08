import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { msg, useLingui } from '@lingui/react';
import { useAtom, useAtomValue } from 'jotai';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import ProjectFilters from 'web-components/src/components/organisms/ProjectFilters';
import type { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';
import {
  countChangedBoolFilters,
  countChangedFilters,
} from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters.utils';

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
  onCloseFilterModal?: () => void;
  className?: string;
};

const ProjectFilterBody = ({
  allProjects,
  creditClassFilterOptions = [],
  resetFilters,
  showResetButton = true,
  hasCommunityProjects,
  buyingOptionsFilterOptions,
  mobile, // on mobile, filters are only applied after clicking "apply filters" button
  onCloseFilterModal,
  className,
}: Props) => {
  const { _ } = useLingui();

  const {
    clientFilters,
    resetTempClientFilters,
    numberOfTempFilters,
    setClientFilters,
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
  const [creditClassFilters, setCreditClassFilters] = useAtom(
    creditClassFiltersAtom,
  );
  const creditClassInitialFilters = useAtomValue(creditClassInitialFiltersAtom);
  const [tempCreditClassFilters, setTempCreditClassFilters] =
    useState(creditClassFilters);

  const [showCommunityProjects, setShowCommunityProjects] = useAtom(
    showCommunityProjectsAtom,
  );
  const [tempShowCommunityProjects, setTempShowCommunityProjects] = useState(
    showCommunityProjects,
  );

  const tempResetFilters = useCallback(() => {
    resetTempClientFilters();
    setTempShowCommunityProjects(DEFAULT_COMMUNITY_PROJECTS_FILTER);
    setTempCreditClassFilters(creditClassInitialFilters);
    setTempBuyingOptionsFilters(initialActiveFilters.buyingOptionsFilters);
  }, [creditClassInitialFilters, resetTempClientFilters]);

  const numberOfTempSelectedFilters = useMemo(
    () =>
      numberOfTempFilters +
      countChangedFilters(
        tempBuyingOptionsFilters,
        initialActiveFilters.buyingOptionsFilters,
      ) +
      countChangedFilters(tempCreditClassFilters, creditClassInitialFilters) +
      countChangedBoolFilters(
        tempShowCommunityProjects,
        DEFAULT_COMMUNITY_PROJECTS_FILTER,
      ),
    [
      numberOfTempFilters,
      tempBuyingOptionsFilters,
      tempCreditClassFilters,
      creditClassInitialFilters,
      tempShowCommunityProjects,
    ],
  );

  return (
    <>
      <ProjectFilters
        className={className}
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
                : setBuyingOptionsFilters(prev => ({
                    ...prev,
                    [id]: !prev[id],
                  }));
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
        showResetButton={
          mobile ? !!numberOfTempSelectedFilters : showResetButton
        }
        labels={{
          title: _(msg`Filters`),
          reset: _(msg`Reset`),
          expand: _(msg`+ See more`),
          collapse: _(msg`- See less`),
        }}
      />
      {mobile && (
        <div className="shadow-[0_-4px_10px_0_rgba(0,0,0,0.10)] sticky bottom-0 left-0 w-full border-0 border-solid border-t border-sc-surface-stroke flex justify-end h-[62px] py-10 px-20 bg-sc-surface-page-background-light">
          <ContainedButton
            onClick={() => {
              setClientFilters();
              setCreditClassFilters(tempCreditClassFilters);
              setBuyingOptionsFilters(tempBuyingOptionsFilters);
              setShowCommunityProjects(tempShowCommunityProjects);
              onCloseFilterModal && onCloseFilterModal();
            }}
          >
            {numberOfTempSelectedFilters
              ? `${_(msg`apply filters`)} (${numberOfTempSelectedFilters})`
              : _(msg`show all projects`)}
          </ContainedButton>{' '}
        </div>
      )}
    </>
  );
};

export default ProjectFilterBody;
