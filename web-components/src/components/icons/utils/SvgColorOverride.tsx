import { useMemo } from 'react';
import { SvgIcon, SxProps } from '@mui/material';

export default function SvgColorOverride({
  src,
  sx,
  color,
  filterIntensity = 10,
  alt,
  className,
}: {
  src: string;
  sx?: SxProps;
  color: string;
  filterIntensity?: number;
  alt?: string;
  className?: string;
}) {
  const maskId = useMemo(() => `mask_${Math.random()}`, []);
  return (
    <SvgIcon sx={sx} aria-label={alt} className={className}>
      <mask id={maskId}>
        <image
          href={src}
          // filter: 'brightness(10)' is used to make the image full intensity for the mask
          style={{ filter: `brightness(${filterIntensity})` }}
          height="100%"
          width="100%"
        />
      </mask>
      <rect
        mask={`url(#${maskId})`}
        width="100%"
        height="100%"
        style={{ fill: color }}
      />
    </SvgIcon>
  );
}
