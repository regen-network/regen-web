import { makeStyles } from 'tss-react/mui';

export const useCarbonPlusStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(20),
      paddingLeft: theme.spacing(37.5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(9.5),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(15),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
  button: {
    fontSize: theme.spacing(4.5),
    height: theme.spacing(12.5),
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: theme.spacing(3.5),
    },
  },
  grid: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
}));
