import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useCheckboxStyles = makeStyles()((theme: Theme) => ({
  check: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));
