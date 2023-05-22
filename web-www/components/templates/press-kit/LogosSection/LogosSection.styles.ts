import { makeStyles } from 'tss-react/mui';

export const useLogosSectionStyles = makeStyles()(theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(34.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  logo: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(65),
      height: theme.spacing(29),
      marginTop: theme.spacing(13.75),
      marginBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(43.5),
      height: theme.spacing(19.4),
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(5),
    },
  },
}));
