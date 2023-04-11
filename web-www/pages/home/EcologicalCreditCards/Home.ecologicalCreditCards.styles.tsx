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
}));
