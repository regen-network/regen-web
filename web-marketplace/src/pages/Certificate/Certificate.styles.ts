import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useCertificateStyles = makeStyles<{
  pageBackground: string;
}>()((theme: Theme, { pageBackground }) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  background: {
    backgroundImage: `url("${pageBackground}") !important`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  certificate: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.between(theme.breakpoints.values.tablet, 'lg')]: {
      paddingRight: theme.spacing(30),
      paddingLeft: theme.spacing(30),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    '@media print': {
      padding: '0 !important',
    },
  },
  slider: {
    '& .slick-dots': {
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(16),
        paddingTop: theme.spacing(7),
      },
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(12),
        paddingTop: theme.spacing(6),
      },
    },
    '& .slick-list': {
      overflow: 'hidden',
    },
    '& .slick-track': {
      '& .slick-slide': {
        paddingRight: 0,
        '& > div': {
          width: '100%',
        },
      },
    },
  },
  share: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.25),
      paddingBottom: theme.spacing(23),
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(9.25),
      paddingBottom: theme.spacing(20),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
  },
  shareTitle: {
    paddingBottom: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  printButton: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      height: theme.spacing(14.75),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(10),
      marginTop: theme.spacing(7.5),
      paddingLeft: theme.spacing(10.5),
      paddingRight: theme.spacing(10.5),
      width: '100%',
    },
  },
  projects: {
    paddingBottom: theme.spacing(20),
    backgroundRepeat: 'no-repeat',
  },
  projectsTitle: {
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(8),
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  issuer: {
    margin: '0 auto',
    textAlign: 'center',
    '& img': {
      objectFit: 'contain',
    },
  },
  issuerInfo: {
    paddingBottom: theme.spacing(4.25),
    paddingTop: theme.spacing(4),
  },
  issuanceButton: {
    marginRight: theme.spacing(1.25),
  },
  projectPageButton: {
    marginLeft: theme.spacing(1.25),
  },
}));
