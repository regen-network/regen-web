import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled, CardMedia } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import cx from 'clsx';

import Card from './Card';
import { Image, OptimizeImageProps } from '../image';
import { Label, Title } from '../typography';
import { parseText } from '../../utils/textParser';

import type { Theme } from '~/theme/muiTheme';

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
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  image: {
    height: theme.spacing(48.75),
    position: 'relative',
  },
}));

const BackgroundGradient = styled('div')({
  height: '100%',
  zIndex: 0,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderRadius: '9px 9px 0px 0px',
  background:
    'linear-gradient(180.28deg, rgba(0, 0, 0, 0) 65.91%, rgba(0, 0, 0, 0.6) 99.59%)',
});

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
  imageStorageBaseUrl,
  apiServerUrl,
}: MediaCardProps): JSX.Element {
  const classes = useStyles({});

  const optimizedImage = (): JSX.Element => (
    <Image
      className={cx(imageClassName, classes.image)}
      backgroundImage
      src={imgSrc}
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
    >
      {backgroundGradient && <BackgroundGradient />}
      {tag && (
        <Label
          sx={theme => ({
            position: 'absolute',
            bottom: theme.spacing(5),
            left: theme.spacing(5),
            py: 1.75,
            px: 3.75,
            color: 'primary.main',
            backgroundColor: 'secondary.main',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '50px',
            textShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
          })}
        >
          {tag}
        </Label>
      )}
    </Image>
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
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
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
          sx={theme => ({
            p: {
              xs: theme.spacing(4, 4.5, 0.8),
              sm: theme.spacing(4.5, 5.25, 0.8),
            },
            borderTop: `1px solid ${theme.palette.grey[100]}`,
          })}
        >
          {parseText(name)}
        </Title>
      )}
      {children}
    </Card>
  );
}
