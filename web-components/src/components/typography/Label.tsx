import { styled, Typography, TypographyProps } from '@mui/material';
import { getMobileSize, LabelSize } from './sizing';

// correspond to pixel sizes in the theme for button text, which differ from other sizing in values + no `xl`
// see: https://www.figma.com/file/MuSpCtCdU2ns4cFAsPfvsx/Text-Styles-%26-Components-(current)?node-id=0%3A1
const SIZES = {
  xl: 21, // XL doesn't actually exist on Button Text sizes, but is included here to avoid duplicate logic with `getMobileSize` helper
  lg: 21,
  md: 18,
  sm: 14,
  xs: 12,
  xxs: 10,
};

const LINE_HEIGHTS = {
  xl: 26,
  lg: 26,
  md: 23,
  sm: 18,
  xs: 15,
  xxs: 12,
};

export interface LabelProps extends TypographyProps {
  size?: LabelSize;
  mobileSize?: LabelSize;
}

export const Label = styled(Typography, {
  name: 'RegenLabel',
  shouldForwardProp: prop => prop !== 'size' && prop !== 'mobileSize',
})<LabelProps>(({ theme, mobileSize, size = 'md' }) => {
  const { breakpoints, typography } = theme;
  const _mobileSize = mobileSize || getMobileSize(size);
  return {
    fontWeight: 800,
    fontFamily: typography.h1.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    [breakpoints.up('sm')]: {
      fontSize: typography.pxToRem(SIZES[size]),
      lineHeight: typography.pxToRem(LINE_HEIGHTS[size]),
    },
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(SIZES[_mobileSize]),
      lineHeight: typography.pxToRem(LINE_HEIGHTS[_mobileSize]),
    },
  };
});

Label.defaultProps = {
  size: 'md',
};
