import { Box, styled } from '@mui/material';

export { Box };

export const Flex = styled(Box)({ display: 'flex' });

export const Center = styled(Box)({
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

export const FlexCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
