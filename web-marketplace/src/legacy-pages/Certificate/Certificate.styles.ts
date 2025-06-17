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
    maxWidth: theme.spacing(236),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
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
    width: theme.spacing(236),
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.25),
      paddingBottom: theme.spacing(23),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(9.25),
      paddingBottom: theme.spacing(20),
      paddingRight: theme.spacing(20),
      paddingLeft: theme.spacing(20),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
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
