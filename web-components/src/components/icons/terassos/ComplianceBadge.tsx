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
      className="rounded-full ml-2 border border-dashed border-sc-surface-stroke bg-sc-icon-standard-background"
      fontWeight={700}
      // eslint-disable-next-line lingui/no-unlocalized-strings
    >
      ha.
    </Box>
  );
}
