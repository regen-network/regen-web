import { makeStyles } from 'tss-react/mui';

export const useMetadataFormStyles = makeStyles()(theme => ({
  field: {
    '& .MuiInputBase-root': {
      fontSize: 16,
      lineHeight: '24px',
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
