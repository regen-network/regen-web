import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useLoginButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    paddingRight: theme.spacing(2),
  },
  walletAddress: {
    fontSize: theme.typography.pxToRem(10),
  },
  alert: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alertIcon: {
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: 0,
  },
  alertMessage: {
    paddingTop: theme.spacing(1),
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
}));
