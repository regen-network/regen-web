import { Box, FormControlLabel, Link, SxProps, Theme } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import Checkbox from 'web-components/lib/components/inputs/new/CheckBox/Checkbox';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';

import { UseStateSetter } from 'types/react/use-state';

import { COMMUNITY_FILTER } from './Projects.constants';

type CommunityFilterProps = {
  setUseCommunityProjects: UseStateSetter<boolean>;
  sx?: SxProps<Theme>;
};

export const CommunityFilter = ({
  setUseCommunityProjects,
  sx,
}: CommunityFilterProps) => {
  return (
    <Flex sx={sx}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ p: 0, mr: 3 }}
            onChange={event => setUseCommunityProjects(event.target.checked)}
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
              href="https://regennetwork.notion.site/Welcome-to-Regen-Registry-0d55aab2a2d64f27aee2a468df172990"
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
