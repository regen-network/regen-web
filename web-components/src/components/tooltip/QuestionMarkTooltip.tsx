import { Box, SxProps, TooltipProps } from '@mui/material';
import { cn } from 'web-components/src/utils/styles/cn';

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
  placement?: TooltipProps['placement'];
  className?: string;
}

export default function QuestionMarkTooltip({
  title,
  sx,
  color = 'secondary.main',
  size = 'sm',
  placement = 'top',
  className = '',
}: Props): JSX.Element {
  return (
    <InfoTooltip
      arrow
      placement={placement}
      title={title}
      className={cn(className)}
      data-testid="question-mark-tooltip"
    >
      <Box
        className={className}
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
