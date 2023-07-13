import { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Grid,
  SwipeableDrawer,
  SxProps,
  Theme,
} from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Checkbox from 'web-components/lib/components/inputs/new/CheckBox/Checkbox';
import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
import { Subtitle } from 'web-components/lib/components/typography';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { UseStateSetter } from 'types/react/use-state';

import { SIDE_FILTERS_BUTTON } from './Projects.constants';
import { getCreditClassesMapping } from './Projects.utils';

type Props = {
  creditClassesData?: AllCreditClassQuery;
  creditClassFilter: Record<string, boolean>;
  setCreditClassFilter: UseStateSetter<Record<string, boolean>>;
  sx?: SxProps<Theme>;
};

export const ProjectsSideFilter = ({
  creditClassesData,
  creditClassFilter,
  setCreditClassFilter,
  sx = [],
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const creditClassesMapping = getCreditClassesMapping({ creditClassesData });
  const creditClassesPaths = Object.keys(creditClassesMapping ?? {});

  return (
    <>
      <OutlinedButton
        size="small"
        onClick={() => setIsOpen(true)}
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
            <Subtitle size="lg">{'Filters'}</Subtitle>
            <Box
              onClick={() => setCreditClassFilter({})}
              sx={{
                color: 'secondary.main',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {'Reset filters'}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Subtitle size="md" sx={{ mb: 3.75 }}>
              {'Credit Class'}
            </Subtitle>
            <CollapseList
              max={3}
              items={creditClassesPaths.map(creditClass => (
                <Grid
                  container
                  direction={'column'}
                  wrap="nowrap"
                  key={creditClass}
                >
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Box>
                          <Checkbox
                            sx={{ p: 0, mr: 3 }}
                            checked={creditClassFilter?.[creditClass] ?? false}
                            onChange={event =>
                              setCreditClassFilter({
                                ...creditClassFilter,
                                [creditClass]: event.target.checked,
                              })
                            }
                          />
                        </Box>
                      }
                      label={creditClassesMapping?.[creditClass]}
                      sx={{ whiteSpace: 'nowrap', mb: 2, ml: 0, fontSize: 14 }}
                    />
                  </Grid>
                </Grid>
              ))}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
