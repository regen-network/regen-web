import { Box, FormControlLabel, SxProps, Theme } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import Checkbox from 'web-components/lib/components/inputs/new/CheckBox/Checkbox';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';

import { UseStateSetter } from 'types/react/use-state';

import { OFFCHAIN_FILTER, OFFCHAIN_FILTER_Tooltip } from './Projects.constants';

type CommunityFilterProps = {
  useOffChainProjects?: boolean;
  setUseOffChainProjects: UseStateSetter<boolean | undefined>;
  sx?: SxProps<Theme>;
};

export const OffChainFilter = ({
  useOffChainProjects = false,
  setUseOffChainProjects,
  sx,
}: CommunityFilterProps) => {
  return (
    <Flex sx={sx}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ p: 0, mr: 3 }}
            checked={useOffChainProjects}
            onChange={event => {
              setUseOffChainProjects(event.target.checked);
            }}
          />
        }
        label={OFFCHAIN_FILTER}
        sx={{ whiteSpace: 'nowrap', mr: 1, ml: 0, fontSize: 14 }}
      />
      <InfoTooltipWithIcon
        title={<Box sx={{ textAlign: 'start' }}>{OFFCHAIN_FILTER_Tooltip}</Box>}
        outlined
      />
    </Flex>
  );
};
