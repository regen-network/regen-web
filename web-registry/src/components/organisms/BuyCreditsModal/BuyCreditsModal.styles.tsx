import { makeStyles } from '@mui/styles';

export const useBuyCreditsModalStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  thumbnailCard: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(26.75),
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    '&:last-child': {
      paddingBottom: theme.spacing(4),
    },
  },
  projectThumbnail: {
    height: theme.spacing(12.5),
    width: theme.spacing(12.5),
    borderRadius: 5,
  },
  description: {
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(14),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
  stateCountryGrid: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  stateCountryTextField: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      '&:first-of-type': {
        marginRight: theme.spacing(2.375),
      },
      '&:last-of-type': {
        marginLeft: theme.spacing(2.375),
      },
    },
  },
  postalCodeField: {
    marginTop: theme.spacing(6),
  },
  creditInput: {
    width: theme.spacing(42.5),
  },
  creditWidget: {
    display: 'flex',
  },
  regenIcon: {
    height: theme.typography.pxToRem(26),
    alignSelf: 'flex-start',
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(4),
  },
}));
