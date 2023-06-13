import type { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  linearGradient?: string;
  linearGradientMobile?: string;
  topSection?: boolean;
  titleVariant?: Variant;
}

export const useBackgroundSectionStyles = makeStyles<StyleProps>()(
  (theme, props) => ({
    root: {
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        paddingTop: props.topSection ? theme.spacing(70) : theme.spacing(17.75),
        paddingBottom: theme.spacing(13),
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: props.topSection ? theme.spacing(80) : theme.spacing(21.5),
        paddingBottom: theme.spacing(27.5),
      },
      backgroundSize: 'cover',
    },
    backgroundGradient: {
      height: '100%',
      zIndex: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        background:
          props.linearGradient ||
          'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
      },
      [theme.breakpoints.down('sm')]: {
        background:
          props.linearGradientMobile ||
          props.linearGradient ||
          'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
      },
      opacity: 0.8,
    },
    text: {
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
        '& h1': {
          maxWidth: theme.spacing(220),
        },
        '& div': {
          [theme.breakpoints.up('sm')]: {
            maxWidth: theme.spacing(167.5),
          },
        },
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(37.5),
        paddingRight: theme.spacing(37.5),
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
      maxWidth: theme.breakpoints.values.lg,
      margin: '0 auto',
      position: 'relative',
    },
    children: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(37.5),
        paddingRight: theme.spacing(37.5),
      },
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
      maxWidth: theme.breakpoints.values.lg,
      margin: '0 auto',
      zIndex: 1,
      position: 'relative',
    },
  }),
);
