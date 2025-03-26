import { styled } from '@mui/material';

import { Box } from 'web-components/src/components/box/Box';

/**
 * Styled box with grey text.
 * Could be refactored to simply use tailwind class instead,
 * when migrating away from MUI.
 */
export const GreyText = styled(Box)(({ theme }) => ({
  color: theme.palette.info.main,
}));
