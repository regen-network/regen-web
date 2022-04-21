import React from 'react';
import { Box, SxProps } from '@mui/material';
import { ButtonText } from '../typography';

import type { LabelSize } from '../typography/sizing';
import type { Theme } from '~/theme/muiTheme';

/** Grey label over child elements */
export const LabeledDetail: React.FC<{
  label: string;
  sx?: SxProps<Theme>;
  labelSize?: LabelSize;
}> = ({ label, children, labelSize, sx }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ...sx }}>
    <ButtonText size={labelSize || 'md'} color="info.main">
      {label}
    </ButtonText>
    <div>{children}</div>
  </Box>
);
