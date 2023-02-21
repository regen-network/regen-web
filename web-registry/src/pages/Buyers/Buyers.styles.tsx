import { makeStyles } from 'tss-react/mui';

export const useBuyersStyles = makeStyles()(theme => ({
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
      '& h1': {
        lineHeight: '130%',
      },
      '& h4': {
        marginTop: theme.spacing(3),
      },
      '& p': {
        fontSize: theme.typography.pxToRem(18),
        lineHeight: '160%',
      },
    },
  },
  bottomHeroSection: {
    paddingTop: 0,
    maxWidth: 790,
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));
