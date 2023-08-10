import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useImageItemsStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(25),
    },
  },
}));
