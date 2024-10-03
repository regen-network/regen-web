import { Box, SxProps, SvgIcon } from '@mui/material';

export default function SvgThemeWrapper({
  src,
  sx,
  color,
}: {
  src: string;
  sx: SxProps;
  color: string;
}) {
  // TODO: support svg react components
  return (
    // <Box
    //   sx={{
    //     maskImage: `url(${src})`,
    //     maskSize: 'contain',
    //     maskRepeat: 'no-repeat',
    //     maskPosition: 'center',
    //     boxSizing: 'border-box',
    //     width: '30px',
    //     height: '30px',
    //     background: color,
    //     ...sx,
    //   }}
    // />
    <SvgIcon sx={sx}>
      <mask id="mask_123">
        <image
          href={src}
          style={{ filter: 'brightness(10)' }}
          height="100%"
          width="100%"
        />
      </mask>
      <rect mask="url(#mask_123)" width="100%" height="100%" fill={color} />
    </SvgIcon>
  );
}
