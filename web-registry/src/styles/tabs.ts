import { SxProps } from '@mui/material';

export const tabsStyles = {
  tabsInsideCard: {
    tab: {
      outer: {
        mt: { xs: '10px', sm: '15px', lg: '20px' },
        mx: { xs: '6px', sm: '8px', lg: '10px' },
      } as SxProps,
      inner: { mb: { xs: '6px', sm: '9px', lg: '12px' }, ml: 0 } as SxProps,
    },
    panel: { inner: { p: 0 } as SxProps },
  },
};
