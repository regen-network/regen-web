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
  creditClassFilters?: CreditClassFilter[];
  hasCommunityProjects: boolean;
  showFiltersReset: boolean;
  resetFilter: () => void;
  sx?: SxProps<Theme>;
};

export const SideFilter = ({
  creditClassFilters = [],
  hasCommunityProjects,
  showFiltersReset,
  resetFilter,
  sx = [],
}: Props) => {
  const { _ } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const filteredCreditClassFilters = creditClassFilters.filter(
    ({ isCommunity, path }) =>
      path === UNREGISTERED_PATH ||
      useCommunityProjects ||
      (!useCommunityProjects && !isCommunity),
  );
  const { track } = useTracker();

  const values = Object.values(creditClassSelectedFilters);
  const selectAllEnabled = values.includes(false);
  const clearAllEnabled = values.includes(true);

  return (
    <>
      {/* @ts-ignore */}
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
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <Box sx={{ px: 5, py: 11 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 7.5,
            }}
          >
            <Subtitle size="lg">{_(FILTERS_LABEL)}</Subtitle>
            {showFiltersReset && (
              <Box
                onClick={resetFilter}
                sx={{
                  color: 'secondary.main',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {_(RESET_FILTERS_LABEL)}
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Subtitle size="md" sx={{ mb: 3.75 }}>
              {_(CREDIT_CLASS_FILTER_LABEL)}
            </Subtitle>
            <div className="pb-15 text-grey-500">
              <Subtitle
                component="span"
                size="xs"
                className={cn(
                  selectAllEnabled
                    ? 'text-brand-400 cursor-pointer'
                    : 'text-grey-400',
                  'pr-10',
                )}
                onClick={() => {
                  if (selectAllEnabled)
                    setCreditClassSelectedFilters(
                      getCreditClassSelectedFilters(
                        creditClassSelectedFilters,
                        true,
                      ),
                    );
                }}
              >
                <Trans>Select all</Trans>
              </Subtitle>
              |
              <Subtitle
                component="span"
                size="xs"
                className={cn(
                  clearAllEnabled
                    ? 'cursor-pointer text-brand-400'
                    : 'text-grey-400',
                  'pl-10',
                )}
                onClick={() => {
                  if (clearAllEnabled)
                    setCreditClassSelectedFilters(
                      getCreditClassSelectedFilters(
                        creditClassSelectedFilters,
                        false,
                      ),
                    );
                }}
              >
                <Trans>Clear all</Trans>
              </Subtitle>
            </div>
            <CollapseList
              seeMoreText={_(SEE_MORE)}
              seeLessText={_(SEE_LESS)}
              max={3}
              items={filteredCreditClassFilters.map(({ name, path }) => (
                <Grid container direction={'column'} wrap="nowrap" key={path}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Box>
                          <Checkbox
                            sx={{ p: 0, mr: 3 }}
                            checked={
                              creditClassSelectedFilters?.[path] ?? false
                            }
                            onChange={event => {
                              setCreditClassSelectedFilters({
                                ...creditClassSelectedFilters,
                                [path]: event.target.checked,
                              });
                              if (path !== UNREGISTERED_PATH)
                                track<FilterCreditClassEvent>(
                                  'filterCreditClass',
                                  {
                                    creditClassId: path,
                                    selected: getFilterSelected(
                                      event.target.checked,
                                    ),
                                  },
                                );
                            }}
                          />
                        </Box>
                      }
                      label={name}
                      sx={{
                        mb: 2,
                        ml: 0,
                        fontSize: 14,
                        '& > span': {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: 250,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            />
          </Box>
          {hasCommunityProjects && (
            <>
              <Box sx={{ height: '1px', bgcolor: 'info.light', my: 7.5 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Subtitle size="md" sx={{ mb: 3.75 }}>
                  {_(COMMUNITY_FILTER_LABEL)}
                </Subtitle>

                <CommunityFilter
                  sx={{
                    mr: { xs: 0, lg: 7.5 },
                    width: { xs: '100%', lg: 'auto' },
                    order: { xs: 2, lg: 1 },
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
};
