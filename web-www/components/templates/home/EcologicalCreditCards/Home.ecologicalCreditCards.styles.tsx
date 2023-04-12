import { makeStyles } from 'tss-react/mui';

export const useEcologicalCreditCardsStyles = makeStyles()(theme => ({
  root: {
    paddingTop: 0,
  },
  slider: {
    '& .slick-track': {
      '& .slick-slide': {
        margin: '0 0',
        paddingRight: 0,
      },
    },
  },
  image: {
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      height: 216,
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
      width: 400,
    },
  },
}));
