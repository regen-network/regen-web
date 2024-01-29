import { Box, FormControlLabel, SxProps, Theme } from '@mui/material';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/src/components/box';
import Checkbox from 'web-components/src/components/inputs/new/CheckBox/Checkbox';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';

import { useOffChainProjectsAtom } from 'lib/atoms/projects.atoms';

import { OFFCHAIN_FILTER, OFFCHAIN_FILTER_Tooltip } from './Projects.constants';

type CommunityFilterProps = {
  sx?: SxProps<Theme>;
};

export const OffChainFilter = ({ sx }: CommunityFilterProps) => {
  const [useOffChainProjects, setUseOffChainProjects] = useAtom(
    useOffChainProjectsAtom,
  );

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
