import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import Card from './Card';

export interface PartnerCardProps {
  imageUrl?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  img: {},
}));

export default function PartnerCard({ imageUrl }: PartnerCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card
      className={classes.card}
      width={width}
      elevation={elevation}
      borderColor={borderColor}
      borderRadius={borderRadius}
    >
      <img className={classes.img} src={imageUrl} alt={imageUrl}></img>
    </Card>
  );
}
