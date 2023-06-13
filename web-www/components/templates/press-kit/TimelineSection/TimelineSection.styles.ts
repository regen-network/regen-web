import { makeStyles } from 'tss-react/mui';

export const useTimelineStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(28.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      fontSize: theme.spacing(8),
    },
  },
}));
