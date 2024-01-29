import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useBasicInfoStyles = makeStyles()((theme: Theme) => ({
  parcelField: {
    marginTop: theme.spacing(4),
  },
  parcelSize: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: '57%',
      marginRight: theme.spacing(1.25),
    },
  },
  parcelUnit: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2.5),
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(1.25),
      width: '43%',
    },
  },
}));
