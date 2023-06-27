import { Box, SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';

export interface Props {
  sx?: SxProps<Theme>;
  children: JSX.Element;
}

const StickyBar = ({ sx = [], children }: Props): JSX.Element => {
  return (
    <Box
      sx={[
        {
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          py: { xs: 3.5, md: 7.5 },
          px: { xs: 5, md: 38.5 },
          boxShadow: 7,
          backgroundColor: 'primary.main',
          zIndex: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export { StickyBar };
