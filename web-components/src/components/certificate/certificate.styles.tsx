import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  background?: string;
}

export const useCertificateStyles = makeStyles<StyleProps>()(
  (theme, { background }) => ({
    root: {
      backgroundImage: `url("${background}")`,
      backgroundSize: 'cover',
      border: `1px solid ${theme.palette.grey[100]}`,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6),
        maxWidth: 960,
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2.5),
      },
      '@media print': {
        padding: theme.spacing(2.5),
      },
    },
    content: {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.grey[100]}`,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(15)} ${theme.spacing(10)}`,
        paddingTop: theme.spacing(12.5),
      },
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(3.75)} ${theme.spacing(3.25)}`,
      },
      '@media print': {
        padding: `${theme.spacing(3.75)} ${theme.spacing(3.25)}`,
      },
    },
    bannerSide: {
      backgroundColor: theme.palette.secondary.dark,
      position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(16),
        height: theme.spacing(21.75),
        bottom: theme.spacing(-5.5),
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(6),
        height: theme.spacing(8),
        bottom: theme.spacing(-2.12),
      },
      '@media print': {
        width: theme.spacing(6),
        height: theme.spacing(8),
        bottom: theme.spacing(-2.12),
      },
    },
    whiteTriangle: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      [theme.breakpoints.up('sm')]: {
        borderWidth: `${theme.spacing(10.875)} 0 ${theme.spacing(
          10.875,
        )} ${theme.spacing(5)}`,
      },
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        left: '-1px',
        borderWidth: `${theme.spacing(4)} 0 ${theme.spacing(4)} ${theme.spacing(
          1.85,
        )}`,
      },
      '@media print': {
        position: 'absolute',
        left: '-1px',
        borderWidth: `${theme.spacing(4)} 0 ${theme.spacing(4)} ${theme.spacing(
          1.85,
        )}`,
      },
      borderColor: `transparent transparent transparent ${theme.palette.primary.main}`,
    },
    greenTriangle: {
      width: 0,
      height: 0,
      position: 'absolute',
      right: 0,
      bottom: 0,
      borderStyle: 'solid',
      [theme.breakpoints.up('sm')]: {
        borderWidth: `0 ${theme.spacing(5.5)} ${theme.spacing(5.5)} 0`,
      },
      [theme.breakpoints.down('sm')]: {
        borderWidth: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
      },
      '@media print': {
        borderWidth: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
      },
      borderColor: `transparent ${theme.palette.secondary.contrastText} transparent transparent`,
    },
    bannerSideRight: {
      transform: 'scale(-1, 1)',
      right: 0,
    },
    bannerContent: {
      background: `linear-gradient(360deg, ${theme.palette.secondary.main} 14.67%, ${theme.palette.secondary.contrastText} 97.14%)`,
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(4.5)} ${theme.spacing(7)}`,
        marginLeft: theme.spacing(9.5),
        marginRight: theme.spacing(9.5),
      },
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(3)} ${theme.spacing(2.5)}`,
        marginLeft: theme.spacing(3.65),
        marginRight: theme.spacing(3.65),
      },
      '@media print': {
        padding: `${theme.spacing(2)} ${theme.spacing(1.5)}`,
        marginLeft: theme.spacing(3.65),
        marginRight: theme.spacing(3.65),
      },
      zIndex: 1,
      position: 'relative',
      textAlign: 'center',
    },
    banner: {
      position: 'relative',
      margin: '0 auto',
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2.5 + 5.5),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1 + 2.12),
      },
      '@media print': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
    },
    icon: {
      float: 'right',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(35.25),
        height: theme.spacing(15.75),
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(17),
        height: theme.spacing(7.5),
      },
      '@media print': {
        width: theme.spacing(17),
        height: theme.spacing(7.5),
      },
    },
    text: {
      margin: '0 auto',
      textAlign: 'center',
    },
  }),
);
