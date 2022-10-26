import { useCallback } from 'react';
import { CardMedia, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from 'src/theme/muiTheme';

import { parseText } from '../../utils/textParser';
import { OptimizeImageProps } from '../image';
import { Title } from '../typography';
import Card from './Card';
import { MediaCardImage } from './MediaCard.Image';

export interface MediaCardProps extends OptimizeImageProps {
  children?: any;
  imgSrc: string;
  name?: JSX.Element | string;
  href?: string;
  target?: string;
  tag?: string;
  onClick?: () => void;
  width?: string;
  titleVariant?: Variant;
  elevation?: number;
  borderColor?: string;
  borderRadius?: string;
  className?: string;
  backgroundGradient?: boolean;
  imageClassName?: string;
  titleOverwrite?: boolean;
  truncateTitle?: boolean;
  sx?: SxProps<Theme>;
}

const useStyles = makeStyles()((theme: Theme) => ({
  image: {
    height: theme.spacing(48.75),
    position: 'relative',
  },
}));

export default function MediaCard({
  children,
  name,
  imgSrc,
  href,
  target = '_blank',
  onClick,
  width,
  titleVariant = 'h4',
  elevation = 0,
  borderColor,
  borderRadius,
  className,
  tag,
  backgroundGradient = true,
  imageClassName,
  titleOverwrite = true,
  truncateTitle,
  imageStorageBaseUrl,
  apiServerUrl,
  sx = [],
}: MediaCardProps): JSX.Element {
  const { classes, cx } = useStyles();
  const optimizedImage = useCallback(
    (): JSX.Element => (
      <MediaCardImage
        apiServerUrl={apiServerUrl}
        backgroundGradient={backgroundGradient}
        classes={classes}
        imageClassName={imageClassName}
        imageStorageBaseUrl={imageStorageBaseUrl}
        imgSrc={imgSrc}
        tag={tag}
      />
    ),
    [
      apiServerUrl,
      backgroundGradient,
      classes,
      imageClassName,
      imageStorageBaseUrl,
      imgSrc,
      tag,
    ],
  );

  const media = (
    <CardMedia
      className={cx(imageClassName, classes.image)}
      component={optimizedImage}
    />
  );

  return (
    <Card
      className={className}
      onClick={onClick}
      width={width}
      elevation={elevation}
      borderColor={borderColor}
      borderRadius={borderRadius}
      sx={[
        {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {href ? (
        <a href={href} target={target}>
          {media}
        </a>
      ) : (
        media
      )}
      {name && (
        <Title
          variant={titleVariant}
          mobileVariant={titleOverwrite ? 'h6' : undefined}
          as="div"
          sx={[
            theme => ({
              p: {
                xs: theme.spacing(4, 4.5, 0.8),
                sm: theme.spacing(4.5, 5.25, 0.8),
              },
              borderTop: `1px solid ${theme.palette.grey[100]}`,
            }),
            !!truncateTitle && {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          ]}
        >
          {parseText(name)}
        </Title>
      )}
      {children}
    </Card>
  );
}
