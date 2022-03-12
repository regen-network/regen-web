import React from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';
import { Label as UnstyledLabel } from '../label';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const Label = styled(UnstyledLabel)(({ theme }) => ({
  color: theme.palette.info.main,
  fontSize: 12,
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  },
}));

/** Grey label over child elements */
export const LabeledDetail: React.FC<{
  label: string;
  sx?: SxProps<Theme>;
  styles?: {
    label?: SxProps<Theme>;
  };
}> = ({ label, children, sx, styles }) => (
  <Root sx={sx}>
    <Label sx={styles?.label}>{label}</Label>
    <div>{children}</div>
  </Root>
);
