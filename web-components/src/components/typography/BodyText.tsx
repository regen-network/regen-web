import { styled, Typography, TypographyProps } from '@mui/material';
import { getSizeVariants, TextSize } from './sizing';

interface Props extends TypographyProps {
  size?: TextSize;
  mobileSize?: TextSize;
}

export const BodyText = styled(Typography, {
  name: 'RegenBodyText',
  shouldForwardProp: prop =>
    prop !== 'size' && prop !== 'mobileSize' && prop !== 'sx',
})<Props>(({ theme, mobileSize, size = 'md' }) => {
  const { breakpoints, typography } = theme;
  const { variant, mobileVariant } = getSizeVariants(size, mobileSize);
  return {
    lineHeight: '150%',
    fontWeight: 400,
    marginBottom: theme.spacing(1.5),
    whiteSpace: 'pre-wrap',
    // TODO - ideally this would work, but gets overriden by global styles
    // color: 'info.dark',
    fontSize: typography[mobileVariant].fontSize,
    [breakpoints.up('sm')]: {
      fontSize: typography[variant].fontSize,
    },
    '& a': {
      fontWeight: 'bold',
    },
  };
});

BodyText.defaultProps = {
  size: 'md',
};
