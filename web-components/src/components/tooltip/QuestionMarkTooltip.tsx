import { Box, SxProps, TooltipProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { sxToArray } from '../../utils/mui/sxToArray';
import { Body } from '../typography/Body';
import { TextSize } from '../typography/sizing';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: TooltipProps['title'];
  sx?: SxProps<Theme>;
  color?: string;
  size?: TextSize;
}

export default function QuestionMarkTooltip({
  title,
  sx,
  color = 'secondary.main',
  size = 'sm',
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <Box
        sx={[
          {
            borderRadius: '50%',
            width: 17,
            height: 17,
            border: `1px solid`,
            borderColor: color,
          },
          ...sxToArray(sx),
        ]}
      >
        <Body
          sx={{
            cursor: 'default',
            lineHeight: [1],
            textAlign: 'center',
            color,
            fontWeight: 'normal',
          }}
          size={size}
          mobileSize={size}
        >
          ?
        </Body>
      </Box>
    </InfoTooltip>
  );
}
