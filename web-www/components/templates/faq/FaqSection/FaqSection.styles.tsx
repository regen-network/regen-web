import { makeStyles } from 'tss-react/mui';

export const useFaqStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(13.75),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(20),
      position: 'relative',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
  },
}));
