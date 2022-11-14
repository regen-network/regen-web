import { makeStyles } from 'tss-react/mui';

export const useHomeStyles = makeStyles()(theme => ({
  section: {
    paddingBottom: theme.spacing(16.25),
    maxWidth: '1240px',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  bottomSectionWidth: {
    maxWidth: theme.spacing(200),
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(17.75),
  },
  creditClassBackground: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(22.25),
    },
    paddingBottom: theme.spacing(22.25),
    border: '1px solid',
    borderColor: theme.palette.grey['100'],
  },
}));
