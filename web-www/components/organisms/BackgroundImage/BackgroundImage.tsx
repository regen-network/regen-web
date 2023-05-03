import { Box, BoxProps, SxProps } from '@mui/material';
import Image from 'next/image';

import { Theme } from '@/../web-components/lib/theme/muiTheme';
import { sxToArray } from '@/../web-components/lib/utils/mui/sxToArray';

type Props = {
  src: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  component?: BoxProps['component'];
  sx?: SxProps<Theme>;
};

export const BackgroundImage = ({
  src,
  alt,
  className,
  component,
  sx = [],
  children,
}: Props) => (
  <Box
    component={component ?? 'div'}
    className={className}
    sx={[{ position: 'relative' }, ...sxToArray(sx)]}
  >
    <Box
      component={Image}
      src={src}
      alt={alt ?? ''}
      fill
      sx={{ objectFit: 'cover', position: 'absolute' }}
    />
    <Box sx={{ zIndex: 1, position: 'relative' }}>{children}</Box>
  </Box>
);
