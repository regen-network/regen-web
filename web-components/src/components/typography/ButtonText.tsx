import { styled, Typography, TypographyProps } from '@mui/material';
import { getMobileSize } from './sizing';

type BtnTextSize = 'lg' | 'md' | 'sm' | 'xs';

interface Props extends TypographyProps {
  size?: BtnTextSize;
  mobileSize?: BtnTextSize;
}

// correspond to pixel sizes in the theme for button text, which differ from other sizing in values + no `xl`
// see: https://www.figma.com/file/MuSpCtCdU2ns4cFAsPfvsx/Text-Styles-%26-Components-(current)?node-id=0%3A1
const SIZES = {
  lg: 21,
  md: 18,
  sm: 14,
  xs: 12,
};

const LINE_HEIGHTS = {
  lg: 26,
  md: 23,
  sm: 18,
  xs: 15,
};

export const ButtonText = styled(Typography, {
  name: 'RegenButtonText',
  shouldForwardProp: prop => prop !== 'size' && prop !== 'mobileSize',
})<Props>(({ theme, mobileSize, size = 'md' }) => {
  const { breakpoints, typography } = theme;
  const _mobileSize = mobileSize || (getMobileSize(size) as BtnTextSize);
  return {
    fontWeight: 800,
    fontFamily: typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: typography.pxToRem(SIZES[_mobileSize]),
    lineHeight: typography.pxToRem(LINE_HEIGHTS[_mobileSize]),
    [breakpoints.up('sm')]: {
      fontSize: typography.pxToRem(SIZES[size]),
      lineHeight: typography.pxToRem(LINE_HEIGHTS[size]),
    },
  };
});

ButtonText.defaultProps = {
  size: 'md',
};
