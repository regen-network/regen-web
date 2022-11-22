import { makeStyles } from 'tss-react/mui';

import type { Theme } from '../../../theme/muiTheme';

export const useCreditClassCardStyles = makeStyles()((theme: Theme) => ({
  image: {
    height: theme.spacing(35),
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(54.5),
      width: theme.spacing(62.5),
    },
  },
}));
