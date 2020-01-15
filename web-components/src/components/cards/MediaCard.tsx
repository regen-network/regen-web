import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Card from './Card';
import Title from '../title';

export interface MediaCardProps {
  children?: any;
  name: string;
  imgSrc: string;
  onClick?: () => void;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4.75),
    marginBottom: theme.spacing(5.25),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    height: theme.spacing(48.75),
    cursor: 'pointer',
  },
}));

export default function MediaCard({ children, name, imgSrc, onClick, width }: MediaCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card onClick={onClick} width={width}>
      <CardMedia className={classes.image} image={imgSrc} />
      <div className={classes.container}>
        <Title variant="h4">{name}</Title>
        <div className={classes.content}>{children}</div>
      </div>
    </Card>
  );
}
