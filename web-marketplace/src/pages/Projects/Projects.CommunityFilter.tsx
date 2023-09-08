import { Box, FormControlLabel, Link, SxProps, Theme } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import Checkbox from 'web-components/lib/components/inputs/new/CheckBox/Checkbox';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';

import { UseStateSetter } from 'types/react/use-state';
import { useTracker } from 'lib/tracker/useTracker';

import { COMMUNITY_FILTER } from './Projects.constants';
import { FilterCommunityCreditsEvent } from './Projects.types';
import { getFilterSelected } from './Projects.utils';

type CommunityFilterProps = {
  useCommunityProjects?: boolean;
  setUseCommunityProjects: UseStateSetter<boolean | undefined>;
  sx?: SxProps<Theme>;
};

export const CommunityFilter = ({
  useCommunityProjects = false,
  setUseCommunityProjects,
  sx,
}: CommunityFilterProps) => {
  const { track } = useTracker();

  return (
    <Flex sx={sx}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ p: 0, mr: 3 }}
            checked={useCommunityProjects}
            onChange={event => {
              setUseCommunityProjects(event.target.checked);
              track<'filterPermissionlessCredits', FilterCommunityCreditsEvent>(
                'filterPermissionlessCredits',
                {
                  selected: getFilterSelected(event.target.checked),
                },
              );
            }}
          />
        }
        label={COMMUNITY_FILTER}
        sx={{ whiteSpace: 'nowrap', mr: 1, ml: 0, fontSize: 14 }}
      />
      <InfoTooltipWithIcon
        title={
          <Box sx={{ textAlign: 'start' }}>
            Community credits are credits that have not been through the{' '}
            <Link
              href="https://registry.regen.network/"
              target="_blank"
              sx={{ color: 'secondary.main', fontWeight: 700, mr: 1 }}
            >
              Regen Registry program
            </Link>
            or are not associated with another known registry. <br />
            <br />
            To create your own credits,{' '}
            <Link
              href="https://docs.regen.network/tutorials/"
              target="_blank"
              sx={{ color: 'secondary.main', fontWeight: 700 }}
            >
              learn more in our docs.
            </Link>
          </Box>
        }
        outlined
      />
    </Flex>
  );
};
