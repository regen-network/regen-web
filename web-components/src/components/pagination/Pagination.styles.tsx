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
  colorScheme: ColorScheme;
  disableRipple: boolean;
}) => {
  return <PaginationItem {...props} />;
};

export const StyledPaginationItem = withStyles(
  PaginationItemWrapper,
  (theme: Theme, { disabled, colorScheme }) => ({
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
        backgroundColor:
          colorScheme === 'terrasos'
            ? theme.palette.warning.main
            : theme.palette.secondary.main,
      },
    },
  }),
);

type GetArrowSkipStyleType = {
  theme: Theme;
  disabled: boolean;
  colorScheme: ColorScheme;
};

export const getArrowSkipStyle = ({
  theme,
  disabled,
  colorScheme,
}: GetArrowSkipStyleType): SxProps => {
  const enabledColor =
    colorScheme === 'terrasos'
      ? theme.palette.primary.contrastText
      : theme.palette.secondary.main;
  return {
    fontSize: pxToRem(50),
    color: disabled ? theme.palette.grey[100] : enabledColor,
  } as SxProps;
};
