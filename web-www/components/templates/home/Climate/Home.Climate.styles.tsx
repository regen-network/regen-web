import { makeStyles } from 'tss-react/mui';

export const useClimateStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(9),
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  card: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
      width: theme.spacing(83.75),
      position: 'absolute',
    },
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)}`,
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      width: '60%',
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: '100%',
    },
  },
  line: {
    position: 'absolute',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  problemLine: {
    zIndex: 0,
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(78.11deg)',
      width: theme.spacing(115),
      bottom: theme.spacing(64),
      left: '0',
    },
    [theme.breakpoints.up('xl')]: {
      width: theme.spacing(70),
      bottom: theme.spacing(57),
      left: '5%',
    },
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(116.57deg)',
      width: theme.spacing(65),
      top: theme.spacing(70),
      left: theme.spacing(-5),
    },
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(50),
      left: theme.spacing(-15),
    },
  },
  solutionLine: {
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(9.71deg)',
      width: theme.spacing(57.75),
      right: 'calc(6% + 20.9375rem - 4px)',
      top: theme.spacing(52),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(58),
      width: '25%',
    },
    [theme.breakpoints.down('md')]: {
      zIndex: -1,
      transform: 'rotate(68.36deg)',
      right: '12%',
      width: theme.spacing(87.5),
      top: theme.spacing(-20),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(35),
      top: theme.spacing(-16),
    },
  },
  problemCard: {
    [theme.breakpoints.up('md')]: {
      left: '10%',
      bottom: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: '20%',
      marginLeft: theme.spacing(5),
    },
  },
  solutionCard: {
    [theme.breakpoints.up('md')]: {
      right: '6%',
      top: theme.spacing(48.5),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(60),
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      overflow: 'visible',
      marginLeft: '30%',
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(-11.25),
    },
  },
  titleContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 'calc(18% + 20.9375rem)',
      paddingRight: '8%',
      marginTop: '-6%',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '-8%',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(15),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
}));
