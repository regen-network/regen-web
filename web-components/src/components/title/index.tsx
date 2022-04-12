import { styled, Typography, TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface Props extends TypographyProps {
  mobileVariant?: Variant;
}

const Title = styled(Typography)<Props>(
  ({ theme, mobileVariant, variant = 'h1' }) => {
    const { breakpoints, typography } = theme;
    const { down } = breakpoints;
    return {
      ...(variant === 'h1' && {
        [down('sm')]: {
          fontSize: typography[mobileVariant || 'h3'].fontSize,
          lineHeight: typography[mobileVariant || 'h3'].lineHeight,
        },
      }),
      ...(variant === 'h2' && {
        [down('sm')]: {
          fontSize: typography[mobileVariant || 'h4'].fontSize,
          lineHeight: typography[mobileVariant || 'h4'].lineHeight,
        },
      }),
      ...(variant === 'h3' && {
        [down('sm')]: {
          fontSize: typography[mobileVariant || 'h4'].fontSize,
          lineHeight: typography[mobileVariant || 'h4'].lineHeight,
        },
      }),
      ...(variant === 'h4' && {
        [down('sm')]: {
          fontSize: typography.h5.fontSize,
          lineHeight: typography[mobileVariant || 'h5'].lineHeight,
        },
      }),
      ...(variant === 'h5' && {
        [down('sm')]: {
          fontSize: typography.h6.fontSize,
          lineHeight: typography[mobileVariant || 'h6'].lineHeight,
        },
      }),
    };
  },
);

export default Title;
