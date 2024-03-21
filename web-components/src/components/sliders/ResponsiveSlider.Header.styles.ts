import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttons: {
    '& div:last-child': {
      marginLeft: theme.spacing(2),
    },
  },
  title: {
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    color: theme.palette.info.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));
