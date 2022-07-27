import { Variant } from '@mui/material/styles/createTypography';

export type TextSize =
  | 'xxs' // 10px
  | 'xs' // 12px
  | 'sm' // 14px
  | 'md' // 16px
  | 'lg' // 18px
  | 'xl'; // 22px

export type LabelSize = Exclude<TextSize, 'xl'>;

// Maps `TextSize` to the MUI custom `text` variant with those values
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
export function getSizeVariant(size: TextSize): Variant {
  let variant;
  switch (size) {
    case 'xxs':
      variant = 'textXXSmall';
      break;
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
      variant = 'textMedium';
      break;
  }
  return variant as Variant;
}
