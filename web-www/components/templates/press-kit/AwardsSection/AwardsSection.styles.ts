import { makeStyles } from 'tss-react/mui';

export const useAwardsStyles = makeStyles()(theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
    },
    '& .slick-slide': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: `${theme.spacing(4.125)} !important`,
      },
    },
    '& .slick-track': {
      margin: '0 auto',
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  imageContainer: {
    aspectRatio: '3 / 2',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    borderRadius: '5px',
  },
}));
