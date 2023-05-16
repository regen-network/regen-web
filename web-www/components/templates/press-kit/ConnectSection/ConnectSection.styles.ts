import { makeStyles } from 'tss-react/mui';

export const useConnectStyles = makeStyles()(theme => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexGrow: '20%',
    },
  },
}));
