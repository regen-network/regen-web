import { Box, BoxProps, SxProps } from '@mui/material';
import Image, { ImageProps, StaticImageData } from 'next/image';

import { useBackgroundImageStyles } from './BackgroundImage.styles';

import { Theme } from 'web-components/src/theme/muiTheme';
import { sxToArray } from 'web-components/src/utils/mui/sxToArray';

type Props = {
  src: string | StaticImageData;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  component?: BoxProps['component'];
  sx?: SxProps<Theme>;
};

export const BackgroundImage = ({
  src,
  alt,
  className,
  component,
  sx = [],
  children,
}: Props) => {
  const { classes } = useBackgroundImageStyles();
  const placeholder: ImageProps['placeholder'] =
    typeof src === 'string' ? 'empty' : 'blur';

  return (
    <Box
      component={component ?? 'div'}
      className={className}
      sx={[{ position: 'relative' }, ...sxToArray(sx)]}
    >
      <Image
        src={src}
        alt={alt ?? ''}
        className={classes.image}
        placeholder={placeholder}
        sizes="100vw"
        priority
        fill
      />
      <Box sx={{ zIndex: 1, position: 'relative' }}>{children}</Box>
    </Box>
  );
};
