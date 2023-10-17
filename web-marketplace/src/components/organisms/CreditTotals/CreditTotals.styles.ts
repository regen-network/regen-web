import { makeStyles } from 'tss-react/mui';

export const useCreditTotalsStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7, 0, 11),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 0, 11),
    },
  },
  item: {
    minWidth: 'fit-content',
  },
}));
