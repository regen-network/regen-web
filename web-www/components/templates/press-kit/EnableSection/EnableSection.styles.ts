import { makeStyles } from 'tss-react/mui';

export const useEnableStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(32),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(22.5),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(10),
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(14),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing(170),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(152),
    },
    marginRight: 'auto',
  },
  imageContainer: {
    position: 'relative',
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      flexBasis: '50%',
      maxWidth: '50%',
    },
  },
  imageBackground: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(-6.25),
    },
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(-3),
    },
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
}));
