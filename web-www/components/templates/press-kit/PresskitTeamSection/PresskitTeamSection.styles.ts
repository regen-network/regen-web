import { makeStyles } from 'tss-react/mui';

export const usePressKitTeamStyles = makeStyles()(theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
}));
