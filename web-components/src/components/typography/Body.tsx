import { styled, Typography, TypographyProps } from '@mui/material';
import { getSizeVariants, TextSize } from './sizing';

interface Props extends TypographyProps {
  size?: TextSize;
  mobileSize?: TextSize;
}

export const Body = styled(Typography, {
  shouldForwardProp: prop => prop !== 'size' && prop !== 'mobileSize',
})<Props>(({ theme, mobileSize, size = 'md' }) => {
  const { breakpoints, typography } = theme;
  const { variant, mobileVariant } = getSizeVariants(size, mobileSize);
  return {
    lineHeight: '150%',
    fontWeight: 400,
    fontSize: typography[mobileVariant].fontSize,
    [breakpoints.up('sm')]: {
      fontSize: typography[variant].fontSize,
    },
  };
});
