import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import Card from './Card';

export interface PartnerCardProps {
  imageUrl?: string;
  sortOrder?: number;
  className?: string;
  link?: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxHeight: '90%',
    maxWidth: '80%',
  },
}));

export default function PartnerCard({
  imageUrl,
  sortOrder,
  className,
  link,
  children,
}: PartnerCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card elevation={1} className={clsx(classes.card, className)} key={sortOrder}>
        {imageUrl ? <img className={classes.img} src={imageUrl} alt={imageUrl} /> : ''}
        {children ? children : ''}
      </Card>
    </a>
  );
}
