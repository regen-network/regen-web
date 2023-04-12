import { makeStyles } from 'tss-react/mui';

export const useBlogStyles = makeStyles()(theme => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey['300']}`,
  },
  item: {},
  image: {
    width: '100%',
    height: '100%',
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
