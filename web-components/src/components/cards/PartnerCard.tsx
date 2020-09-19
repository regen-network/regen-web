import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import Card from './Card';

export interface PartnerCardProps {
  imageUrl?: string;
  sortOrder?: number;
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
    <Card key={sortOrder} className={classes.card}>
      <img className={classes.img} src={imageUrl} alt={imageUrl}></img>
    </Card>
  );
}
