import { styled, Typography, TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

type TitleVariant = Variant | 'textSmall';

function getDefaultMobileVariant(variant: TitleVariant): TitleVariant {
  switch (variant) {
    case 'h1':
      return 'h3';
    case 'h2':
      return 'h4';
    case 'h3':
      return 'h4';
    case 'h4':
      return 'h5';
    case 'h5':
      return 'h6';
    case 'h6':
      return 'h6';
    default:
      return variant;
  }
}

export interface TitleProps extends TypographyProps {
  variant?: TitleVariant;
  mobileVariant?: TitleVariant;
}

export const Title = styled(Typography, {
  name: 'RegenTitle',
  shouldForwardProp: prop => prop !== 'mobileVariant',
})<TitleProps>(({ theme, mobileVariant, variant = 'h1' }) => {
  const { breakpoints, typography } = theme;
  const { up, down } = breakpoints;
  const typographyVariant = typography[variant];
  const mobileTypographyVariant =
    typography[mobileVariant || getDefaultMobileVariant(variant)];

  return {
    [up('sm')]: {
      fontSize: typographyVariant.fontSize,
      lineHeight: typographyVariant.lineHeight,
    },
    [down('sm')]: {
      fontSize: mobileTypographyVariant.fontSize,
      lineHeight: mobileTypographyVariant.lineHeight,
    },
  };
});

Title.defaultProps = {
  variant: 'h1',
};
