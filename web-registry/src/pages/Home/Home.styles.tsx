import { makeStyles } from '@mui/styles';

export const useHomeStyles = makeStyles(theme => ({
  section: {
    paddingBottom: theme.spacing(16.25),
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
