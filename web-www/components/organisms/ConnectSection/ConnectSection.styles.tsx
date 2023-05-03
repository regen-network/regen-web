import { makeStyles } from 'tss-react/mui';

export const useConnectSectionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(28.5),
    },
  },
}));
