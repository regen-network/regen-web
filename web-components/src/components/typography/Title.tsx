import { styled, Typography, TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface Props extends TypographyProps {
  mobileVariant?: Variant;
}

export const Title = styled(Typography, {
  name: 'RegenTitle',
  shouldForwardProp: prop => prop !== 'mobileVariant',
})<Props>(({ theme, mobileVariant, variant }) => {
  const { breakpoints, typography } = theme;
  const { up } = breakpoints;
  return {
    ...(variant === 'h1' && {
      fontSize: typography[mobileVariant || 'h3'].fontSize,
      lineHeight: typography[mobileVariant || 'h3'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h1.fontSize, // 48px | 3rem
        lineHeight: typography.h1.lineHeight,
      },
    }),
    ...(variant === 'h2' && {
      fontSize: typography[mobileVariant || 'h4'].fontSize,
      lineHeight: typography[mobileVariant || 'h4'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h2.fontSize, // 38px | 2.375rem
        lineHeight: typography.h2.lineHeight,
      },
    }),
    ...(variant === 'h3' && {
      fontSize: typography[mobileVariant || 'h4'].fontSize,
      lineHeight: typography[mobileVariant || 'h4'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h3.fontSize, // 32px | 2rem
        lineHeight: typography.h3.lineHeight,
      },
    }),
    ...(variant === 'h4' && {
      fontSize: typography[mobileVariant || 'h5'].fontSize,
      lineHeight: typography[mobileVariant || 'h5'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h4.fontSize, // 24px | 1.5rem
        lineHeight: typography.h4.lineHeight,
      },
    }),
    ...(variant === 'h5' && {
      fontSize: typography[mobileVariant || 'h6'].fontSize,
      lineHeight: typography[mobileVariant || 'h6'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h5.fontSize, // 21px | 1.313rem
        lineHeight: typography.h5.lineHeight,
      },
    }),
    ...(variant === 'h6' && {
      fontSize: typography[mobileVariant || 'h6'].fontSize,
      lineHeight: typography[mobileVariant || 'h6'].lineHeight,
      [up('sm')]: {
        fontSize: typography.h6.fontSize, // 18px | 1.125rem
        lineHeight: typography.h6.lineHeight,
      },
    }),
  };
});

Title.defaultProps = {
  variant: 'h1',
};
