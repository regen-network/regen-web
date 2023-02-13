import { Box, SxProps, TooltipProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import InfoIcon from '../icons/InfoIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: TooltipProps['title'];
  outlined?: boolean;
  sx?: SxProps<Theme>;
}

export default function InfoTooltipWithIcon({
  title,
  outlined,
  sx,
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <Box sx={{ display: 'inline-flex' }}>
        {outlined ? <InfoIconOutlined sx={sx} /> : <InfoIcon sx={sx} />}
      </Box>
    </InfoTooltip>
  );
}
