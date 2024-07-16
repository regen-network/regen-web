import { Box, SxProps, TooltipProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import InfoIcon from '../icons/InfoIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: TooltipProps['title'];
  outlined?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
}

export default function InfoTooltipWithIcon({
  title,
  outlined,
  sx,
  className = '',
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <Box sx={{ display: 'inline-flex' }} data-testid="info-tooltip">
        {outlined ? (
          <InfoIconOutlined sx={sx} className={className} />
        ) : (
          <InfoIcon sx={sx} className={className} />
        )}
      </Box>
    </InfoTooltip>
  );
}
