import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export interface ItemProps {
  name: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  name: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '130%',
  },
}));

export default function Item({ name, imgSrc }: ItemProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div>
      <img src={imgSrc} alt={name} />
      <Typography className={classes.name}>{name}</Typography>
    </div>
  );
}
