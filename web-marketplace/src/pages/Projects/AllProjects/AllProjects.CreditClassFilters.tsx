import { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, FormControlLabel, Grid } from '@mui/material';
import { useAtom } from 'jotai';

import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';
import { CollapseList } from 'web-components/src/components/organisms/CollapseList/CollapseList';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  creditClassSelectedFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';
import { useTracker } from 'lib/tracker/useTracker';

import { UNREGISTERED_PATH } from './AllProjects.constants';
import { CreditClassFilter, FilterCreditClassEvent } from './AllProjects.types';
import {
  getCreditClassSelectedFilters,
  getFilterSelected,
} from './AllProjects.utils';

type Props = {
  creditClassFilters?: CreditClassFilter[];
};

export const CreditClassFilters = ({ creditClassFilters = [] }: Props) => {
  const { _ } = useLingui();
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );
  const { track } = useTracker();

  const filteredCreditClassFilters = useMemo(
    () =>
      creditClassFilters.filter(
        ({ isCommunity, path }) =>
          path === UNREGISTERED_PATH ||
          useCommunityProjects ||
          (!useCommunityProjects && !isCommunity),
      ),
    [creditClassFilters, useCommunityProjects],
  );

  const values = Object.values(creditClassSelectedFilters);
  const selectAllEnabled = values.includes(false);
  const clearAllEnabled = values.includes(true);

  return (
    <>
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
                getCreditClassSelectedFilters(creditClassSelectedFilters, true),
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
            clearAllEnabled ? 'cursor-pointer text-brand-400' : 'text-grey-400',
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
                      checked={creditClassSelectedFilters?.[path] ?? false}
                      onChange={event => {
                        setCreditClassSelectedFilters({
                          ...creditClassSelectedFilters,
                          [path]: event.target.checked,
                        });
                        if (path !== UNREGISTERED_PATH)
                          track<FilterCreditClassEvent>('filterCreditClass', {
                            creditClassId: path,
                            selected: getFilterSelected(event.target.checked),
                          });
                      }}
                    />
                  </Box>
                }
                label={name}
                sx={{
                  mb: 2,
                  ml: 0,
                  '& > span': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 250,
                    fontSize: 14,
                  },
                }}
              />
            </Grid>
          </Grid>
        ))}
      />
    </>
  );
};
