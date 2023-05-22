import { makeStyles } from 'tss-react/mui';

export const useFaqSectionStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(20),
      paddingTop: theme.spacing(52.5),
      paddingBottom: theme.spacing(52.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(56.25),
      paddingBottom: theme.spacing(56.25),
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    textAlign: 'center',
  },
  title: {
    maxWidth: theme.spacing(172),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
  },
  withChildren: {
    '& $title': {
      paddingBottom: 0,
    },
  },
  children: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
