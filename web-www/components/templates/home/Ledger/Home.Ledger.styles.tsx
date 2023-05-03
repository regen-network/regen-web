import { makeStyles } from 'tss-react/mui';

export const useLedgerStyles = makeStyles()(theme => ({
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingBottom: theme.spacing(51.25),
      flexDirection: 'column',
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(30.25),
      paddingBottom: theme.spacing(39.5),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
    },
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  imgContainer: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(25),
      flexGrow: 0,
      maxWidth: '45%',
      flexBasis: '45%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      width: '100%',
    },
  },
  text: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      maxWidth: '55%',
      flexBasis: '55%',
    },
  },
}));
