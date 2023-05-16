import { makeStyles } from 'tss-react/mui';

export const useSectionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8.5),
    },
  },
}));
