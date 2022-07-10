import { styled } from '@mui/material';
import Tooltip from './';

const InfoTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(3, 4),
    maxWidth: theme.spacing(78),
    textAlign: 'center',
  },
}));

export default InfoTooltip;
