import { makeStyles } from 'tss-react/mui';

import type { Theme } from 'web-components/src/theme/muiTheme';

export const useProfileEditStyles = makeStyles()((theme: Theme) => ({
  nav: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '10px',
    height: 'fit-content',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(74.25),
    },
    [theme.breakpoints.between('xs', 'xl')]: {
      minWidth: theme.spacing(47.5),
    },
  },
  navItem: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: 'none !important',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));
