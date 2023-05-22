import { makeStyles } from 'tss-react/mui';

export const useStackingStyles = makeStyles()(theme => ({
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
}));
