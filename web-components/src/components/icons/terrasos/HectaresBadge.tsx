import { Box } from '@mui/material';

import { cn } from '../../../utils/styles/cn';

type Props = {
  className?: string;
};

export default function HectaresBadge({ className }: Props) {
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
      className={cn(
        'rounded-full ml-2 border border-dashed border-sc-surface-stroke bg-sc-icon-standard-background',
        className,
      )}
      fontWeight={700}
      // eslint-disable-next-line lingui/no-unlocalized-strings
    >
      ha.
    </Box>
  );
}
