import { withStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

import Tooltip from './';

const InfoTooltip = withStyles(Tooltip, (theme: Theme) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(3, 4),
    maxWidth: theme.spacing(78),
    textAlign: 'center',
  },
}));

export default InfoTooltip;
