import React from 'react';
import { SxProps } from '@mui/material';

import type { Theme } from 'src/theme/muiTheme';

import { FlexCol } from '../box';
import { Label } from '../typography';
import type { LabelSize } from '../typography/sizing';

/** Grey label over child elements */
export const LabeledDetail: React.FC<{
  label: string;
  sx?: SxProps<Theme>;
  sxLabel?: SxProps<Theme>;
  labelSize?: LabelSize;
}> = ({ label, children, labelSize, sx = [], sxLabel = [] }) => (
  <FlexCol sx={{ gap: 2, ...sx }}>
    <Label
      size={labelSize || 'sm'}
      sx={[
        { color: 'info.main', width: '100%' },
        ...(Array.isArray(sxLabel) ? sxLabel : [sxLabel]),
      ]}
    >
      {label}
    </Label>
    <div>{children}</div>
  </FlexCol>
);
