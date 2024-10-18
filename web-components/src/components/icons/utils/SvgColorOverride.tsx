import { useMemo } from 'react';
import { SvgIcon, SxProps } from '@mui/material';

export default function SvgThemeWrapper({
  src,
  sx,
  color,
}: {
  src: string;
  sx?: SxProps;
  color: string;
}) {
  const maskId = useMemo(() => `mask_${Math.random()}`, []);
  return (
    <SvgIcon sx={sx}>
      <mask id={maskId}>
        <image
          href={src}
          // filter: 'brightness(10)' is used to make the image full intensity for the mask
          style={{ filter: 'brightness(10)' }}
          height="100%"
          width="100%"
        />
      </mask>
      <rect mask={`url(#${maskId})`} width="100%" height="100%" fill={color} />
    </SvgIcon>
  );
}
