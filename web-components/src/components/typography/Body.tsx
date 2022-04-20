import { styled, Typography, TypographyProps } from '@mui/material';
import { getSizeVariants, TextSize } from './sizing';

interface Props extends TypographyProps {
  size?: TextSize;
  mobileSize?: TextSize;
}

export const Body = styled(Typography, {
  name: 'RegenBodyText',
  shouldForwardProp: prop =>
    prop !== 'size' && prop !== 'mobileSize' && prop !== 'sx',
})<Props>(({ theme, mobileSize, size = 'md' }) => {
  const { breakpoints, typography } = theme;
  const { variant, mobileVariant } = getSizeVariants(size, mobileSize);
  return {
    lineHeight: '150%',
    fontWeight: 400,
    whiteSpace: 'pre-wrap',
    fontSize: typography[mobileVariant].fontSize,
    [breakpoints.up('sm')]: {
      fontSize: typography[variant].fontSize,
    },
    '& a': {
      fontWeight: 'bold',
    },
  };
});

Body.defaultProps = {
  size: 'md',
  color: 'info.dark',
};
