import { makeStyles } from 'tss-react/mui';

export const useBlogStyles = makeStyles()(theme => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
  },
  item: {
    maxWidth: 393,
  },
  image: {
    width: '100%',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(50.75),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(63),
    },
    '&:before, &:after': {
      borderRadius: '10px',
    },
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(19.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25.25),
    },
    [theme.breakpoints.up('md')]: {},
  },
}));
