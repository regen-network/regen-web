import { makeStyles } from 'tss-react/mui';

import type { Theme } from '../../../theme/muiTheme';

export const useCreditClassCardStyles = makeStyles()((theme: Theme) => ({
  image: {
    flexShrink: 0,
    height: theme.spacing(35),
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      minHeight: theme.spacing(54.5),
      width: theme.spacing(62.5),
    },
  },
}));
