import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

import Card from './Card';
import Title from '../title';

export interface MediaCardProps {
  children?: any;
  name: string;
  imgSrc: string;
  tag?: string;
  onClick?: () => void;
  width?: string;
  titleVariant?: ThemeStyle;
  elevation?: number;
  borderColor?: string;
  borderRadius?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4.5)} ${theme.spacing(5.25)}`,
    },
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    height: theme.spacing(48.75),
    cursor: 'pointer',
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
    background: 'linear-gradient(180.28deg, rgba(0, 0, 0, 0) 65.91%, rgba(0, 0, 0, 0.4) 99.59%)',
  },
}));

export default function MediaCard({
  children,
  name,
  imgSrc,
  onClick,
  width,
  titleVariant = 'h5',
  elevation = 0,
  borderColor,
  borderRadius,
  tag,
}: MediaCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card
      onClick={onClick}
      width={width}
      elevation={elevation}
      borderColor={borderColor}
      borderRadius={borderRadius}
    >
      <CardMedia className={classes.image} image={imgSrc}>
        <div className={classes.backgroundGradient} />
        {tag && <div className={classes.tag}>{tag}</div>}
      </CardMedia>
      <div className={classes.container}>
        <Title variant={titleVariant}>{name}</Title>
        <div className={classes.content}>{children}</div>
      </div>
    </Card>
  );
}
