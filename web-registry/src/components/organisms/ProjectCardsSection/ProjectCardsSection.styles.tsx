import { makeStyles } from '@mui/styles';

export const useSectionStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(21.5),
    paddingBottom: theme.spacing(16.25),
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
}));
