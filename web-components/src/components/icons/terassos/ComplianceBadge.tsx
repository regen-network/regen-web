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
      className="rounded-full ml-2"
      fontWeight={700}
      sx={{
        border: '1px dashed var(--sc-surface-stroke, #D2D5D9)',
        background: 'var(--sc-surface-selected-item-background, #EFEFEF)',
      }}
      // eslint-disable-next-line lingui/no-unlocalized-strings
    >
      ha.
    </Box>
  );
}
