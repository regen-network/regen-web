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
