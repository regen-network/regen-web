'use client';
import { styled } from '@mui/material';

import { Box } from 'web-components/src/components/box/Box';

/**
 * Styled Box that allows text with long words to break
 * and wrap onto the next line, and aligns text to the right.
 * Could be refactored to simply use tailwind class instead,
 * when migrating away from MUI.
 */
export const BreakTextEnd = styled(Box)({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  textAlign: 'end',
});
