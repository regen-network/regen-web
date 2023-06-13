import { makeStyles } from 'tss-react/mui';

export const useTitleDescriptionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(15),
    },
  },
}));
