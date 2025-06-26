import { makeStyles } from 'tss-react/mui';

export const useMarketplaceStyles = makeStyles()(theme => ({
  root: {
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(25),
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
    height: 'min-content',
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    '& h2': {
      width: '100%',
      fontFamily: 'var(--font-muli)',
      margin: '0 auto',
      lineHeight: '150%',
      paddingBottom: theme.spacing(10),
      marginBottom: theme.spacing(2),
      fontWeight: 900,
    },
    '& .MuiGrid-item.MuiGrid-root': {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      '& p': {
        color: theme.palette.info.dark,
      },
    },
  },
  registry: {
    color: theme.palette.secondary.main,
  },
  bgdiv: {
    marginBottom: theme.spacing(4),
  },
  inner: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '85%',
    },
    margin: '0 auto',
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      flexBasis: 'auto',
      marginBottom: theme.spacing(8),
    },
  },
  popover: {
    cursor: 'pointer',
    borderBottom: `3px dashed ${theme.palette.secondary.main}`,
  },
}));
