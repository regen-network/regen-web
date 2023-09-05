import { Theme } from '../../../../theme/muiTheme';
import { makeStyles } from 'tss-react/mui';

export const useLocationStyles = makeStyles()((theme: Theme) => ({
  result: {
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.25),
    cursor: 'pointer',
  },
}));
