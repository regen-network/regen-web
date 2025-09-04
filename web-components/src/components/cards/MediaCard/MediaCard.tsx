import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { CardMedia, SxProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from '../../../theme/muiTheme';
import { parseText } from '../../../utils/textParser';
import { OptimizeImageProps } from '../../image';
import { Title } from '../../typography';
import Card from '../Card';
import { MediaCardImage } from './MediaCard.Image';

export interface MediaCardProps extends OptimizeImageProps {
  children?: any;
  imgSrc: string;
  name?: JSX.Element | string;
  href?: string;
  target?: string;
  LinkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }>;
  tag?: string;
  onClick?: () => void;
  width?: string;
  titleVariant?: Variant;
  elevation?: number;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: string;
  className?: string;
  backgroundGradient?: boolean;
  imageClassName?: string;
  titleOverwrite?: boolean;
  truncateTitle?: boolean;
  imageChildren?: ReactNode;
  sx?: SxProps<Theme>;
  draft?: boolean;
  draftText: string;
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
  LinkComponent,
  onClick,
  width,
  titleVariant = 'h4',
  elevation = 0,
  borderWidth,
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
  imageChildren,
  sx = [],
  draft,
  draftText,
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
        children={imageChildren}
        draft={draft}
        draftText={draftText}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      apiServerUrl,
      backgroundGradient,
      classes,
      imageClassName,
      imageStorageBaseUrl,
      imgSrc,
      tag,
      draft,
      // do not add imageChildren here
      // this would make the card image blinking
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
      borderWidth={borderWidth}
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
        LinkComponent ? (
          <LinkComponent
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {media}
          </LinkComponent>
        ) : (
          <a
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {media}
          </a>
        )
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
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLignClamp: '2',
              WebkitBoxOrient: 'vertical',
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
