import { Box, SxProps, TooltipProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { sxToArray } from '../../utils/mui/sxToArray';
import { Label } from '../typography/Label';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: TooltipProps['title'];
  sx?: SxProps<Theme>;
}

export default function QuestionMarkTooltip({ title, sx }: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <Box
        sx={[
          {
            borderRadius: '50%',
            width: 17,
            height: 17,
            border: `1px solid`,
            borderColor: 'secondary.main',
          },
          ...sxToArray(sx),
        ]}
      >
        <Label
          sx={{
            cursor: 'default',
            lineHeight: [1],
            textAlign: 'center',
            color: 'secondary.main',
            fontWeight: 'normal',
          }}
          size="sm"
          mobileSize="sm"
        >
          ?
        </Label>
      </Box>
    </InfoTooltip>
  );
}
