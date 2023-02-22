import { makeStyles } from 'tss-react/mui';

export const useBuyersStyles = makeStyles()(theme => ({
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    paddingTop: theme.spacing(50),
    [theme.breakpoints.up('sm')]: {
      minHeight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 0,
      paddingBottom: theme.spacing(12),
      paddingTop: theme.spacing(40),
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
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: 630,
    },
    [theme.breakpoints.up('sm')]: {
      height: 600,
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));
