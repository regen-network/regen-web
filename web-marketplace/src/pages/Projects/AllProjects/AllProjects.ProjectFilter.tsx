import { useState } from 'react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Box,
  FormControlLabel,
  Grid,
  SwipeableDrawer,
  SxProps,
  Theme,
} from '@mui/material';
import { useAtom } from 'jotai';
import { sxToArray } from 'utils/mui/sxToArray';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import FilterIcon from 'web-components/src/components/icons/FilterIcon';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';
import { CollapseList } from 'web-components/src/components/organisms/CollapseList/CollapseList';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  creditClassSelectedFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';
import { COLOR_SCHEME, IS_TERRASOS } from 'lib/env';
import { useTracker } from 'lib/tracker/useTracker';

import { CommunityFilter } from './AllProjects.CommunityFilter';
import {
  COMMUNITY_FILTER_LABEL,
  CREDIT_CLASS_FILTER_LABEL,
  FILTERS_LABEL,
  RESET_FILTERS_LABEL,
  SIDE_FILTERS_BUTTON,
  UNREGISTERED_PATH,
} from './AllProjects.constants';
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
};

const ProjectFilter = ({
  // creditClassFilters = [],
  // hasCommunityProjects,
  // showFiltersReset,
  // resetFilter,
  sx = [],
}: Props) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  // const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
  //   creditClassSelectedFiltersAtom,
  // );
  // const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  // const filteredCreditClassFilters = creditClassFilters.filter(
  //   ({ isCommunity, path }) =>
  //     path === UNREGISTERED_PATH ||
  //     useCommunityProjects ||
  //     (!useCommunityProjects && !isCommunity),
  // );
  // const { track } = useTracker();

  // const values = Object.values(creditClassSelectedFilters);
  // const selectAllEnabled = values.includes(false);
  // const clearAllEnabled = values.includes(true);

  return (
    <>
      <OutlinedButton
        size="small"
        onClick={() => setIsOpen(true)}
        startIcon={
          <FilterIcon
            sx={{
              with: 25,
              height: 24,
            }}
          />
        }
        sx={[
          {
            mr: 4,
          },
          ...sxToArray(sx),
        ]}
      >
        {_(SIDE_FILTERS_BUTTON)}
      </OutlinedButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        hello
      </SwipeableDrawer>
    </>
  );
};

export default ProjectFilter;
