import { ElementType } from 'react';
import { styled, Typography } from '@mui/material';

export const Label = styled(Typography)<{ component?: ElementType }>(
  ({ theme }) => ({
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  }),
);
