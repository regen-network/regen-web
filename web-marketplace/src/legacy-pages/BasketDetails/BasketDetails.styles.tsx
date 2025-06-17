import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useSectionLayoutStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(15, 5, 20),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
      maxWidth: theme.breakpoints.values.lg,
    },
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));
