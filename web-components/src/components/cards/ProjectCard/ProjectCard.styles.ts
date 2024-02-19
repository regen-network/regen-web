import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useProjectCardStyles = makeStyles()((theme: Theme) => ({
  separator: {
    border: `0.5px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      // marginTop: theme.spacing(6.25),
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
    },
    [theme.breakpoints.down('sm')]: {
      // marginTop: theme.spacing(4.5),
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
    },
  },
  placeInfo: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.75, 5.25, 5.25),
      flex: '1 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.75, 4.5, 5),
    },
  },
  userInfo: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(5.25)} ${theme.spacing(4.5)}`,
    },
  },
  comingSoon: {
    position: 'absolute',
    borderBottom: `${theme.spacing(5.75)} solid ${theme.palette.primary.main}`,
    borderLeft: `${theme.spacing(5.75)} solid transparent`,
    borderRight: `${theme.spacing(5.75)} solid transparent`,
    height: 0,
    width: theme.spacing(30.5),
    lineHeight: theme.spacing(5.75),
    opacity: 0.8,
    transform: 'rotate(45deg)',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
    textAlign: 'center',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: theme.palette.info.dark,
    fontSize: theme.spacing(2.5),
    right: theme.spacing(-6.5),
    top: theme.spacing(5.75),
    whiteSpace: 'nowrap',
  },
  comingSoonText: {
    marginLeft: theme.spacing(-1),
  },
  units: {
    fontSize: theme.spacing(3.5),
    fontWeight: 'bold',
    color: theme.palette.primary.light,
    lineHeight: '145%',
  },
  details: {
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  viewDetails: {
    color: theme.palette.secondary.main,
    lineHeight: theme.spacing(5),
    cursor: 'pointer',
    paddingLeft: theme.spacing(2.5),
  },
  detailsContent: {
    lineHeight: '150%',
    color: theme.palette.info.dark,
    fontSize: theme.spacing(3.5),
    display: 'inline',
  },
  purchaseInfo: {
    paddingTop: theme.spacing(3.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.75),
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
      paddingBottom: theme.spacing(4),
    },
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(1.25),
  },
  purchaseDetails: {
    paddingTop: theme.spacing(2),
  },
  prefinancing: {
    background:
      'linear-gradient(179deg, #515D89 19.77%, #7DC9BF 114.05%, #FAEBD1 200.67%)',
  },
}));
