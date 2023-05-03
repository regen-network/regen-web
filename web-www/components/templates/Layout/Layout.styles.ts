import { makeStyles } from 'tss-react/mui';

export const useLayoutStyles = makeStyles()(theme => ({
  root: {
    background: theme.palette.primary.main,
  },
}));
