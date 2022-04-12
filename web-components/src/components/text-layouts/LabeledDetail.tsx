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
  sx?: {
    root?: SxProps<Theme>;
    label?: SxProps<Theme>;
  };
}> = ({ label, children, sx }) => (
  <Root sx={sx?.root}>
    <Label sx={sx?.label}>{label}</Label>
    <div>{children}</div>
  </Root>
);
