import { makeStyles } from 'tss-react/mui';

export const useFieldFormControlStyles = makeStyles()(theme => ({
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    margin: 0,
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  label: {
    marginBottom: theme.spacing(2.25),
  },
  firstOfType: {
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  default: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.typography.pxToRem(40),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.typography.pxToRem(33),
    },
  },
}));
