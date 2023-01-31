import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

export const useCheckboxStyles = makeStyles()((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));
