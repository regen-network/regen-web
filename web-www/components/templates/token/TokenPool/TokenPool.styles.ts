import { makeStyles } from 'tss-react/mui';

export const useTokenDetailsStyles = makeStyles()(theme => ({}));

export const useTokenPoolStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(24),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    margin: theme.spacing(4, 0, 8),
  },
  image: {
    width: '100%',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));
