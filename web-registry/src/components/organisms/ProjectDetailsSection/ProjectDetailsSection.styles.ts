import { makeStyles } from 'tss-react/mui';

export const useSectionStyles = makeStyles()(theme => ({
  headerWrap: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8.5),
    },
  },
}));
