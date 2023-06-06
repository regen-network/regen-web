import { Box, SxProps } from '@mui/material';

import {
  defaultFontFamily,
  headerFontFamily,
  pxToRem,
  Theme,
} from '../../theme/muiTheme';

type Props = {
  name: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export const CertificateItem = ({ name, children, sx }: Props) => (
  <Box sx={sx}>
    <Box
      component="span"
      sx={{
        fontSize: { xs: pxToRem(11), sm: pxToRem(12) },
        textTransform: 'uppercase',
        fontFamily: { xs: defaultFontFamily, sm: headerFontFamily },
        fontWeight: 800,
        letterSpacing: '1px',
        color: 'info.dark',
        '@media print': {
          fontSize: pxToRem(8),
          fontFamily: defaultFontFamily,
          lineHeight: 0.4,
        },
      }}
    >
      <Box component="span" sx={{ mr: 1 }}>{`${name}: `}</Box>
    </Box>
    {children}
  </Box>
);
