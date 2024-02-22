import { Button, ButtonProps, styled } from '@mui/material';

import { getMobileSize, LabelSize } from '../typography/sizing';

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

interface Props extends ButtonProps {
  textSize?: LabelSize;
  mobileTextSize?: LabelSize;
  target?: string;
}

export const TextButton = styled(Button, {
  name: 'RegenTextButton',
  shouldForwardProp: prop => prop !== 'size' && prop !== 'mobileFontSize',
})<Props>(({ theme, mobileTextSize, textSize = 'md' as LabelSize }) => {
  const { breakpoints, typography } = theme;
  const _mobileSize = mobileTextSize || getMobileSize(textSize);
  return {
    color: theme.palette.secondary.main,
    border: 'none',
    fontFamily: typography.h1.fontFamily,
    textTransform: 'uppercase',
    display: 'inline-block',
    ':hover': {
      color: theme.palette.secondary.contrastText,
    },
    [breakpoints.up('sm')]: {
      padding: 0,
      margin: 0,
      fontSize: typography.pxToRem(SIZES[textSize]),
      lineHeight: typography.pxToRem(LINE_HEIGHTS[textSize]),
    },
    [breakpoints.down('sm')]: {
      padding: 0,
      margin: 0,
      fontSize: typography.pxToRem(SIZES[_mobileSize]),
      lineHeight: typography.pxToRem(LINE_HEIGHTS[_mobileSize]),
    },
  };
});

TextButton.defaultProps = {
  variant: 'text',
  disableTouchRipple: true,
};
