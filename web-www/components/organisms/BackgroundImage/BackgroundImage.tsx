import { Box, BoxProps, SxProps } from '@mui/material';
import Image from 'next/image';

import { useBackgroundImageStyles } from './BackgroundImage.styles';

import { Theme } from '@/../web-components/lib/theme/muiTheme';
import { sxToArray } from '@/../web-components/lib/utils/mui/sxToArray';

type Props = {
  src: string;
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
        sizes="100vw"
        priority
        fill
      />
      <Box sx={{ zIndex: 1, position: 'relative' }}>{children}</Box>
    </Box>
  );
};
