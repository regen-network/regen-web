import { styled } from '@mui/material';

import { Box } from 'web-components/lib/components/box/Box';

export const GreyText = styled(Box)(({ theme }) => ({
  color: theme.palette.info.main,
}));
