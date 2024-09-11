import { Box } from '@mui/material';

import { Subtitle } from '../../typography';

export type BadgeProps = {
  label: string;
  className?: string;
  icon: JSX.Element;
};
export const Badge = ({ label, className, icon }: BadgeProps) => (
  <Box
    className={className}
    sx={{
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      p: 0.75,
      zIndex: 1,
    }}
  >
    {icon}
    <Subtitle size="sm" sx={{ pl: 1 }}>
      {label}
    </Subtitle>
  </Box>
);
