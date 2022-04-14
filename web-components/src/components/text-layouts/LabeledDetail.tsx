import React from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';
import { Label } from '../typography';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

/** Grey label over child elements */
export const LabeledDetail: React.FC<{
  label: string;
  sx?: {
    root?: SxProps<Theme>;
    label?: SxProps<Theme>;
  };
}> = ({ label, children, sx }) => (
  <Root sx={sx?.root}>
    <Label
      sx={{ color: 'info.main', fontSize: { xs: 12, sm: 14 }, ...sx?.label }}
    >
      {label}
    </Label>
    <div>{children}</div>
  </Root>
);
