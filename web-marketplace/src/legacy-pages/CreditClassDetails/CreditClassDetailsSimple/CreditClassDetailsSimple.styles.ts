import { makeStyles } from 'tss-react/mui';

import type { Theme } from 'web-components/src/theme/muiTheme';

export const useCreditClassDetailsSimpleStyles = makeStyles()(
  (theme: Theme) => ({
    sectionPadding: {
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(30),
        paddingBottom: theme.spacing(30),
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
      },
    },
    topSection: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(12),
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(10),
      },
    },
    label: {
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(3),
    },
    link: {
      color: theme.palette.secondary.main,
      fontWeight: 700,
    },
    description: {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(22),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(18),
      },
    },
    marginBottom: {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(10),
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(7.5),
      },
    },
    sidebarItemMargin: {
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(8.75),
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(8),
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    arrow: {
      fontSize: theme.typography.pxToRem(16),
    },
    title: {
      textAlign: 'left',
    },
    textContainer: {
      paddingTop: 0,
    },
  }),
);
