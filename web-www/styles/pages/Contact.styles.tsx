import { makeStyles } from 'tss-react/mui';

export const useContactStyles = makeStyles()(theme => ({
  background: {
    backgroundColor: theme.palette.grey[200],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2.5),
      fontSize: theme.spacing(8),
    },
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(175.25),
      paddingBottom: theme.spacing(32),
      margin: '0 auto',
    },
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(13.75, 7.5, 12.75),
      marginBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(9.5, 5, 11.25),
      marginBottom: theme.spacing(16.25),
    },
  },
  textField: {
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
  textAreaField: {
    '& .MuiInputBase-root': {
      overflow: 'hidden',
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(43.75),
      },
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(25),
      },
    },
  },
  defaultSelect: {
    '& .MuiInputBase-root': {
      color: theme.palette.info.main,
    },
  },
  map: {
    width: '100%',
    objectFit: 'contain',
  },
}));
