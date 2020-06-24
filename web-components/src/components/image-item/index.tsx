import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';

import Title from '../title';
import Description from '../description';
import { getFontSize } from '../../theme/sizing';

export interface ImageItemProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string;
  titleVariant?: Variant;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    lineHeight: '150%',
    paddingBottom: theme.spacing(2.5),
  },
  h3title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
    },
  },
}));

export default function ImageItem({
  img,
  title,
  description,
  titleVariant = 'h4',
}: ImageItemProps): JSX.Element {
  const classes = useStyles({ titleVariant });

  return (
    <div className={classes.root}>
      {img}
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
