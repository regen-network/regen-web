import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { Variant } from '@material-ui/core/styles/createTypography';
import cx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Card from './Card';
import { Image, OptimizeImageProps } from '../image';
import Title from '../title';

export interface MediaCardProps extends OptimizeImageProps {
  children?: any;
  imgSrc: string;
  name?: string;
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
  tag: {
    position: 'absolute',
    bottom: theme.spacing(5),
    left: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '50px',
    textShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontFamily: theme.typography.fontFamily,
    padding: `${theme.spacing(1.75)} ${theme.spacing(3.75)}`,
  },
  backgroundGradient: {
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: '9px 9px 0px 0px',
    background: 'linear-gradient(180.28deg, rgba(0, 0, 0, 0) 65.91%, rgba(0, 0, 0, 0.6) 99.59%)',
  },
  title: {
    lineHeight: '150%',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(5.25)} ${theme.spacing(0.8)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4.5)} ${theme.spacing(0.8)}`,
    },
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    '& p': {
      margin: 0,
    },
  },
  h4title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
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
      {backgroundGradient && <div className={classes.backgroundGradient} />}
      {tag && <div className={classes.tag}>{tag}</div>}
    </Image>
  );

  const media = (): JSX.Element => (
    <CardMedia className={cx(imageClassName, classes.image)} component={optimizedImage} />
  );

  return (
    <Card
      className={cx(classes.root, className)}
      onClick={onClick}
      width={width}
      elevation={elevation}
      borderColor={borderColor}
      borderRadius={borderRadius}
    >
      {href ? (
        <a href={href} target={target}>
          {media()}
        </a>
      ) : (
        media()
      )}
      {name && (
        <Title
          className={
            titleVariant === 'h4' && titleOverwrite ? cx(classes.h4title, classes.title) : classes.title
          }
          variant={titleVariant}
        >
          {ReactHtmlParser(name)}
        </Title>
      )}
      {children}
    </Card>
  );
}
