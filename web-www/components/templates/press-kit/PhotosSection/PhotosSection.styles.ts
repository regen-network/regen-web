import { makeStyles } from 'tss-react/mui';

export const usePhotosSectionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  slider: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(236.5),
      paddingBottom: theme.spacing(15),
      margin: '0 auto',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(9.75),
    },
  },
}));
