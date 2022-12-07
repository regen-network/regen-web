import { PaginationItem } from '@mui/material';
import { withStyles } from 'tss-react/mui';

import { pxToRem, Theme } from '../../theme/muiTheme';

export const StyledPaginationItem = withStyles(
  PaginationItem,
  (theme: Theme, { disabled }) => ({
    icon: {
      fontSize: pxToRem(50),
      color: disabled ? theme.palette.grey[100] : theme.palette.secondary.main,
    },
    text: {
      ':hover': {
        backgroundColor: 'transparent',
      },
    },
    selected: {
      backgroundColor: 'transparent !important',
      '&:after': {
        content: '""',
        position: 'absolute' as any,
        bottom: 0,
        width: '11px',
        height: '4px',
        backgroundColor: theme.palette.secondary.main,
      },
    },
  }),
);
