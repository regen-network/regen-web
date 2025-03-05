import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  btn: {
    padding: `${theme.spacing(3)} !important`,
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      height: theme.spacing(11),
    },
  },
}));
