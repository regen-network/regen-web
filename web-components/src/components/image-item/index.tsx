import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Title from '../title';
import Description from '../description';
import { getFontSize } from '../../theme/sizing';

export interface ImageItemProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
}));

export default function ImageItem({ img, title, description }: ImageItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {img}
      <Title align="center" variant="h3">
        {title}
      </Title>
      <Description fontSize={getFontSize('big')}>{description}</Description>
    </div>
  );
}
