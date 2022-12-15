import { PaginationItem, SxProps } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

import { pxToRem, Theme } from '../../theme/muiTheme';

export const usePaginationStyles = makeStyles()(theme => ({
  root: {
    '.MuiPagination-ul': {
      flexWrap: 'nowrap',
    },
    '.MuiPagination-ul>li:last-child>button': {
      paddingRight: 0,
      marginRight: 0,
    },
  },
}));

export const StyledPaginationItem = withStyles(
  PaginationItem,
  (theme: Theme, { disabled }) => ({
    icon: {
      fontSize: pxToRem(40),
      [theme.breakpoints.up('md')]: {
        fontSize: pxToRem(50),
      },
      color: disabled ? theme.palette.grey[100] : theme.palette.secondary.main,
    },
    text: {
      fontSize: pxToRem(18),
      padding: `0 ${pxToRem(8)}`,
      [theme.breakpoints.up('md')]: {
        padding: `0 ${pxToRem(10)}`,
      },
      minWidth: 0,
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

type GetArrowSkipStyleType = {
  theme: Theme;
  disabled: boolean;
};

export const getArrowSkipStyle = ({
  theme,
  disabled,
}: GetArrowSkipStyleType): SxProps =>
  ({
    fontSize: pxToRem(50),
    color: disabled ? theme.palette.grey[100] : theme.palette.secondary.main,
  } as SxProps);
