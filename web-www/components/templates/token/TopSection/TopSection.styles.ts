import { makeStyles } from 'tss-react/mui';

export const useTopSectionStyles = makeStyles()(theme => ({
  section: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  token: {
    width: 70,
    height: 70,
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
}));

export const tokenTopSectionGradient =
  'linear-gradient(180deg, #000000 6.73%, rgba(0, 0, 0, 0) 30.65%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)';
