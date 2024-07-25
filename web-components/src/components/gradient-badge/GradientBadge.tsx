import { Box, SxProps } from '@mui/material';

import { headerFontFamily, pxToRem, Theme } from '../../theme/muiTheme';
import { GradientBadgeVariant } from './GradientBadge.types';
import { GradientBadgeVariantMapping } from './GradientBadge.utils';

export interface Props {
  label: string;
  variant?: GradientBadgeVariant;
  sx?: SxProps<Theme>;
  className?: string;
}

const GradientBadge = ({
  label,
  variant = 'green',
  sx = [],
  className,
}: Props): JSX.Element => {
  return (
    <Box
      className={className}
      sx={[
        {
          width: 'fit-content',
          background: GradientBadgeVariantMapping[variant],
          borderRadius: pxToRem(5),
          fontSize: pxToRem(12),
          lineHeight: pxToRem(15),
          letterSpacing: pxToRem(1),
          paddingY: pxToRem(4),
          paddingX: pxToRem(8),
          textTransform: 'uppercase',
          fontWeight: 800,
          fontFamily: headerFontFamily,
          color: 'primary.main',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {label}
    </Box>
  );
};

export { GradientBadge };
