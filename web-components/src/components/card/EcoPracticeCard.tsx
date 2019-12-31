import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

interface EcoPractiveCardProps {
  name: string;
  description: string;
  imgSrc: string;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  image: {
    width: '6.0625rem',
    height: '5.8125rem',
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: '0.75rem',
    textAlign: 'center',
  },
}));

export default function EcoPractiveCard({
  name,
  description,
  imgSrc,
  width,
}: EcoPractiveCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Card width={width}>
      <Grid className={classes.container} container alignItems="center" direction="column">
        <CardMedia className={classes.image} image={imgSrc} />
        <Typography className={classes.name}>{name}</Typography>
        <Typography
          color="secondary"
          className={classes.description}>
          {description}
        </Typography>
      </Grid>
    </Card>
  );
}
