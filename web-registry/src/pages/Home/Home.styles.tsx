import { makeStyles } from '@mui/styles';

export const useHomeStyles = makeStyles(theme => ({
  section: {
    paddingBottom: theme.spacing(16.25),
    maxWidth: '1240px',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  bottomSectionWidth: {
    maxWidth: theme.spacing(200),
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(17.75),
  },
}));
