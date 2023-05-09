import { makeStyles } from 'tss-react/mui';

export const useProjectImpactSectionStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(20),
    },
  },
  title: {
    paddingBottom: theme.spacing(7.5),
  },
  slider: {
    margin: theme.spacing(0, -1.75),
    '& .slick-track': {
      display: 'flex',
    },
    '& .slick-slide': {
      height: 'inherit',
      marginRight: 20,
      '& > div': {
        height: '100%',
      },
    },
    '& .slick-list': {
      overflow: 'visible',
      [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
        overflow: 'visible',
      },
      '& .slick-slide': {
        display: 'flex',
        '& > div': {
          width: '97%',
        },
      },
    },
  },
  swipe: {
    display: 'flex',
    marginLeft: theme.spacing(-4),
    marginRight: theme.spacing(-4),
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    minWidth: theme.spacing(73),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.875),
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1.875),
      '& > div': {
        height: '100%',
      },
      '&:first-child': {
        marginLeft: theme.spacing(4),
      },
      '&:last-child': {
        marginRight: theme.spacing(4),
      },
    },
  },
  buttons: {
    paddingTop: theme.spacing(0.25),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.75),
      paddingBottom: theme.spacing(10),
    },
    '& div': {
      marginLeft: theme.spacing(2.5),
    },
  },
}));
