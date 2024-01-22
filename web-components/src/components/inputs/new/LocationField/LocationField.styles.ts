import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../../theme/muiTheme';

export const useLocationStyles = makeStyles()((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
    zIndex: 1,
  },
}));
