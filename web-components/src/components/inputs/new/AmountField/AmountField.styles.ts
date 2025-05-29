import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../../theme/muiTheme';

export const useAmountFieldStyles = makeStyles()((theme: Theme) => ({
  textField: {
    '& .MuiInputBase-root': {
      paddingRight: '0 !important',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  mainLabel: {
    marginRight: theme.spacing(8),
  },
  auxiliarLabelDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  auxiliarLabelMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  availableLabel: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: theme.palette.info.dark,
  },
  availableAmount: {
    fontFamily: 'Muli',
    fontSize: '12px',
    color: theme.palette.info.dark,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  denom: {
    fontFamily: 'Muli',
    fontSize: '12px',
    fontWeight: 'bold',
    color: theme.palette.info.dark,
  },
}));
