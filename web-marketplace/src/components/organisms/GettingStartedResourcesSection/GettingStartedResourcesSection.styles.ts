import { makeStyles } from 'tss-react/mui';

export const useSectionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.5),
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  hiddenScrollBar: {
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
