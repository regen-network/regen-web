import { makeStyles } from 'tss-react/mui';

export const useMediaStyles = makeStyles()(theme => ({
  background: {
    backgroundColor: theme.palette.grey[50],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(22.5),
      paddingTop: theme.spacing(7.5),
    },
  },
  card: {
    height: '100%',
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(13.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(7.5),
      fontSize: theme.spacing(8),
    },
  },
  show: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
    fontSize: theme.spacing(3),
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5.75),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(3),
    },
  },
  select: {
    '& .MuiInputBase-root': {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(67.5),
    },
  },
  form: {
    paddingBottom: theme.spacing(6),
  },
}));
