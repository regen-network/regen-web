import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, FormControlLabel, Grid } from '@mui/material';
import { useAtom } from 'jotai';

import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';
import { CollapseList } from 'web-components/src/components/organisms/CollapseList/CollapseList';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { UseStateSetter } from 'types/react/use-state';
import {
  creditClassFiltersAtom,
  showCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';
import { useTracker } from 'lib/tracker/useTracker';

import { UNREGISTERED_PATH } from './AllProjects.constants';
import { CreditClassFilter, FilterCreditClassEvent } from './AllProjects.types';
import { getCreditClassFilters, getFilterSelected } from './AllProjects.utils';

type Props = {
  creditClassFilterOptions?: CreditClassFilter[];
  tempCreditClassFilters: Record<string, boolean>;
  setTempCreditClassFilters: UseStateSetter<Record<string, boolean>>;
  mobile?: boolean;
};

export const CreditClassFilters = ({
  creditClassFilterOptions = [],
  tempCreditClassFilters,
  setTempCreditClassFilters,
  mobile,
}: Props) => {
  const { _ } = useLingui();
  const [showCommunityProjects] = useAtom(showCommunityProjectsAtom);
  const [creditClassFilters, setCreditClassFilters] = useAtom(
    creditClassFiltersAtom,
  );
  const { track } = useTracker();

  const filteredCreditClassFilters = useMemo(
    () =>
      creditClassFilterOptions.filter(
        ({ isCommunity, path }) =>
          path === UNREGISTERED_PATH ||
          showCommunityProjects ||
          (!showCommunityProjects && !isCommunity),
      ),
    [creditClassFilterOptions, showCommunityProjects],
  );

  const creditClassSelectedFilters = useMemo(
    () => (mobile ? tempCreditClassFilters : creditClassFilters),
    [creditClassFilters, mobile, tempCreditClassFilters],
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
            if (selectAllEnabled) {
              if (mobile) {
                setTempCreditClassFilters(
                  getCreditClassFilters(creditClassSelectedFilters, true),
                );
              } else
                setCreditClassFilters(
                  getCreditClassFilters(creditClassSelectedFilters, true),
                );
            }
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
            if (clearAllEnabled) {
              if (mobile) {
                setTempCreditClassFilters(
                  getCreditClassFilters(creditClassSelectedFilters, false),
                );
              } else
                setCreditClassFilters(
                  getCreditClassFilters(creditClassSelectedFilters, false),
                );
            }
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
                        if (mobile) {
                          setTempCreditClassFilters({
                            ...creditClassSelectedFilters,
                            [path]: event.target.checked,
                          });
                        } else {
                          setCreditClassFilters({
                            ...creditClassSelectedFilters,
                            [path]: event.target.checked,
                          });
                        }
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
