import { makeStyles } from 'tss-react/mui';

export const useLedgerStyles = makeStyles()(theme => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
      paddingBottom: theme.spacing(25),
    },
  },
}));
