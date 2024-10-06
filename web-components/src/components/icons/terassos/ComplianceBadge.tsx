import { Box } from '@mui/material';

export default function ComplianceBadge() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="24px"
      height="24px"
      padding="3px"
      borderRadius="50%"
      fontSize="12px"
      fontWeight={700}
      sx={{
        borderRadius: '40px',
        border: '1px dashed var(--surface-stroke, #D2D5D9)',
        background: 'var(--surface-selected-item-background, #EFEFEF)',
        ml: 2,
      }}
      // eslint-disable-next-line lingui/no-unlocalized-strings
    >
      ha.
    </Box>
  );
}
