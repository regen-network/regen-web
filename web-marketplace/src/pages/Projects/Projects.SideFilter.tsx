import { useState } from 'react';
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
import { Body, Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  creditClassSelectedFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { useTracker } from 'lib/tracker/useTracker';

import { CommunityFilter } from './Projects.CommunityFilter';
import {
  COMMUNITY_FILTER_LABEL,
  CREDIT_CLASS_FILTER_LABEL,
  FILTERS_LABEL,
  RESET_FILTERS_LABEL,
  SIDE_FILTERS_BUTTON,
  UNREGISTERED_PATH,
} from './Projects.constants';
import { CreditClassFilter, FilterCreditClassEvent } from './Projects.types';
import {
  getCreditClassSelectedFilters,
  getFilterSelected,
} from './Projects.utils';

type Props = {
  creditClassFilters?: CreditClassFilter[];
  hasCommunityProjects: boolean;
  showFiltersReset: boolean;
  resetFilter: () => void;
  sx?: SxProps<Theme>;
};

export const ProjectsSideFilter = ({
  creditClassFilters = [],
  hasCommunityProjects,
  showFiltersReset,
  resetFilter,
  sx = [],
}: Props) => {
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
      <OutlinedButton
        size="small"
        onClick={() => setIsOpen(true)}
        startIcon={
          <FilterIcon sx={{ color: 'secondary.dark', with: 25, height: 24 }} />
        }
        sx={[{ mr: 4 }, ...sxToArray(sx)]}
      >
        {SIDE_FILTERS_BUTTON}
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
            <Subtitle size="lg">{FILTERS_LABEL}</Subtitle>
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
                {RESET_FILTERS_LABEL}
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Subtitle size="md" sx={{ mb: 3.75 }}>
              {CREDIT_CLASS_FILTER_LABEL}
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
                Select all
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
                Clear all
              </Subtitle>
            </div>
            <CollapseList
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
                                track<
                                  'filterCreditClass',
                                  FilterCreditClassEvent
                                >('filterCreditClass', {
                                  creditClassId: path,
                                  selected: getFilterSelected(
                                    event.target.checked,
                                  ),
                                });
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
                  {COMMUNITY_FILTER_LABEL}
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
