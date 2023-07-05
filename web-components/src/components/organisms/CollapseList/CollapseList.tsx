import { useState } from 'react';
import { Box, Collapse, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { TextButton } from '../../buttons/TextButton';
import { LabelSize } from '../../typography/sizing';
import { SEE_LESS, SEE_MORE } from './CollapseList.constants';

type Props = {
  items: JSX.Element[];
  max?: number;
  buttonTextSize?: LabelSize;
  sx?: SxProps<Theme>;
};

export const CollapseList = ({
  items,
  max = 3,
  buttonTextSize = 'xs',
  sx,
}: Props): JSX.Element | null => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (items.length === 0) {
    return null;
  }
  if (items.length <= max) {
    return <>{items.map(item => item)}</>;
  }

  const alwaysVisible = items.slice(0, max);
  const underCollapse = items.slice(max);

  return (
    <Box sx={[...sxToArray(sx)]}>
      {alwaysVisible.map(item => item)}
      <Collapse in={expanded}>{underCollapse.map(item => item)}</Collapse>
      <TextButton
        textSize={buttonTextSize}
        onClick={() => setExpanded(!expanded)}
        sx={{
          px: [0],
          ':hover': { bgcolor: 'transparent' },
        }}
      >
        {expanded ? `${SEE_LESS}` : `${SEE_MORE}`}
      </TextButton>
    </Box>
  );
};
