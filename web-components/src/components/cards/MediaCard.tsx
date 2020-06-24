import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { Variant } from '@material-ui/core/styles/createTypography';

import Card from './Card';
import Title from '../title';

export interface MediaCardProps {
  children?: any;
  name: string;
  imgSrc: string;
  tag?: string;
  onClick?: () => void;
  width?: string;
  titleVariant?: Variant;
  elevation?: number;
  borderColor?: string;
  borderRadius?: string;
}

interface StyleProps {
  titleVariant: Variant;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  title: props => ({
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(5.25)} ${theme.spacing(3)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4.5)} ${theme.spacing(3)}`,
      fontSize: props.titleVariant === 'h4' ? theme.spacing(4.5) : 'inherit',
    },
  }),
}));

export default function MediaCard({
  children,
  name,
  imgSrc,
  onClick,
  width,
  titleVariant = 'h4',
  elevation = 0,
  borderColor,
  borderRadius,
  tag,
}: MediaCardProps): JSX.Element {
  const classes = useStyles({ titleVariant });

  return (
    <Card
      onClick={onClick}
      width={width}
      elevation={elevation}
      borderColor={borderColor}
      borderRadius={borderRadius}
    >
      <div className={classes.root}>
        <CardMedia className={classes.image} image={imgSrc}>
          <div className={classes.backgroundGradient} />
          {tag && <div className={classes.tag}>{tag}</div>}
        </CardMedia>
        <Title className={titleVariant === 'h4' ? classes.title : ''} variant={titleVariant}>
          {name}
        </Title>
        {children}
      </div>
    </Card>
  );
}
