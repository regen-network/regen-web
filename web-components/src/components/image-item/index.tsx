import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import Title from '../title';
import Description from '../description';
import { getFontSize } from '../../theme/sizing';

export interface ImageItemProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string;
  imageHeight?: string;
  titleVariant?: Variant;
}

export interface StyleProps {
  imageHeight?: string;
  titleVariant: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    lineHeight: '150%',
    paddingBottom: theme.spacing(2.5),
  },
  image: props => ({
    height: props.imageHeight || theme.spacing(32.5),
    [theme.breakpoints.up('xs')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(6.25),
    },
  }),
  h3title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
    },
  },
}));

export default function ImageItem({
  img,
  title,
  imageHeight,
  description,
  titleVariant = 'h4',
}: ImageItemProps): JSX.Element {
  const classes = useStyles({ titleVariant, imageHeight });

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.image}>
        {img}
      </Grid>
      <Title
        align="center"
        variant={titleVariant}
        className={titleVariant === 'h3' ? clsx(classes.title, classes.h3title) : classes.title}
      >
        {title}
      </Title>
      <Description fontSize={getFontSize('big')}>{description}</Description>
    </div>
  );
}
