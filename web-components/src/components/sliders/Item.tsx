import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';

export interface ItemProps {
  name: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
  },
  img: {
    borderRadius: '5px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '130%',
    paddingTop: theme.spacing(1.5),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function Item({ name, imgSrc }: ItemProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <img className={classes.img} src={imgSrc} alt={name} />
      <Typography className={classes.name}>{name}</Typography>
    </div>
  );
}
