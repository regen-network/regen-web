import { makeStyles } from 'tss-react/mui';

import type { Theme } from 'web-components/src/theme/muiTheme';

export const useProjectEditStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-evenly',
      padding: theme.spacing(8.75),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 3.75),
    },
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(7.5),
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  back: {
    display: 'flex',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(12),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(74.25),
    },
  },
  arrow: {
    fontSize: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
  },
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
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  sectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      padding: 'none',
    },
  },
  section: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(185.75),
    },
  },
  navItem: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: 'none !important',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  topAlign: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(10),
      marginBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
    },
  },
}));
