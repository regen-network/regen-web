import { SxProps } from '@mui/system';

import SvgColorOverride from './SvgColorOverride';

export default function SvgWithIsSelectedColor({
  src,
  sx,
  isSelected = false,
  unselectedColor,
  selectedColor,
}: {
  src: string;
  sx?: SxProps;
  isSelected?: boolean;
  unselectedColor: string;
  selectedColor: string;
}) {
  return (
    <SvgColorOverride
      src={src}
      sx={sx}
      color={isSelected ? selectedColor : unselectedColor}
    />
  );
}
