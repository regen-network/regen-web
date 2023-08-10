import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  field: {
    '& .MuiInputBase-root': {
      padding: 0,
      '& textarea': {
        resize: 'vertical',
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2),
        },
      },
    },
  },
}));
