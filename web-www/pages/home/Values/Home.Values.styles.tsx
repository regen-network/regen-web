import { makeStyles } from 'tss-react/mui';

export const useValuesStyles = makeStyles()(theme => ({
  root: {
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(30),
    },
  },
  sliderContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7.75),
    },
  },
  image: {
    height: theme.spacing(39),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
}));
