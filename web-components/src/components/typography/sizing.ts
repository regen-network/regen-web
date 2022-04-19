import { Variant } from '@mui/material/styles/createTypography';

export type TextSize =
  /** 12px */
  | 'xs'
  /** 14px */
  | 'sm'
  /** 16px */
  | 'md'
  /** 18px */
  | 'lg'
  /** 22px */
  | 'xl';

export function getSizeVariants(
  size: TextSize,
  mobileSize?: TextSize,
): { variant: Variant; mobileVariant: Variant } {
  const _mobileSize = mobileSize || getMobileSize(size);
  return {
    variant: getSizeVariant(size),
    mobileVariant: getSizeVariant(_mobileSize),
  };
}
export function getMobileSize(size: TextSize): TextSize {
  switch (size) {
    case 'xs':
      return 'xs';
    case 'sm':
      return 'xs';
    case 'lg':
      return 'md';
    case 'xl':
      return 'lg';
    case 'md':
    default:
      return 'sm';
  }
}

/** takes a `TextSize` and returns a custom MUI theme `variant` */
// Possible TODO: should this also accept pixel (or REM) values?
function getSizeVariant(size: TextSize): Variant {
  let variant;
  switch (size) {
    case 'xs':
      variant = 'textXSmall';
      break;
    case 'sm':
      variant = 'textSmall';
      break;
    case 'lg':
      variant = 'textLarge';
      break;
    case 'xl':
      variant = 'textXLarge';
      break;
    case 'md':
    default:
      variant = 'body1';
      break;
  }
  return variant as Variant;
}
