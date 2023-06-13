import { makeStyles } from 'tss-react/mui';

export const useInfoSectionStyles = makeStyles()(theme => ({
  card: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  image: {
    position: 'relative',
    margin: 0,
    '& img': {
      objectFit: 'cover',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
      maxHeight: '100%',
      '& img': {
        objectPosition: 'center top',
      },
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      height: theme.spacing(50),
      '& img': {
        objectPosition: 'center top',
      },
    },
  },
}));
