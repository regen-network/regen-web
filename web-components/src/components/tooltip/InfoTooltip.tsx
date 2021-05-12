import { withStyles, Theme } from '@material-ui/core';
import Tooltip from './';

const InfoTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(3, 4),
    maxWidth: theme.spacing(78),
  },
}))(Tooltip);

export default InfoTooltip;
