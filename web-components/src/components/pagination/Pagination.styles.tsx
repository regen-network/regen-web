/* eslint-disable lingui/no-unlocalized-strings */
import { PaginationItem, PaginationItemProps, SxProps } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

import { pxToRem, Theme } from '../../theme/muiTheme';
import { ColorScheme } from '../../theme/theme.types';

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

const PaginationItemWrapper = ({
  ...props
}: PaginationItemProps & {
  disableRipple: boolean;
}) => {
  return <PaginationItem {...props} />;
};

export const StyledPaginationItem = withStyles(
  PaginationItemWrapper,
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
        backgroundColor: 'rgba(var(--sc-tabs-tab-underline) / 1)',
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
}: GetArrowSkipStyleType): SxProps => {
  return {
    fontSize: pxToRem(50),
    color: disabled
      ? theme.palette.grey[100]
      : 'rgba(var(--sc-button-text-icon-dark) / 1)',
  } as SxProps;
};
