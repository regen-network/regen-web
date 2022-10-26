import { withStyles } from 'tss-react/mui';

import Tooltip from './';

// fix issue with emotion+TS
// https://github.com/emotion-js/emotion/issues/1182
const textAlign: 'center' = 'center';

const InfoTooltip = withStyles(Tooltip, theme => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(3, 4),
    maxWidth: theme.spacing(78),
    textAlign,
  },
}));

export default InfoTooltip;
