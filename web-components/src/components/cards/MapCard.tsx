import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

export interface MapCardProps {
  name: string;
  description: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {},
  name: {
    fontWeight: 'bold',
    fontSize: '1.375rem',
    color: theme.palette.primary.light,
  },
  description: {
    fontWeight: 'normal',
    fontSize: '1rem',
    color: theme.palette.info.dark,
  },
}));

export default function CreditCard({ name, description, imgSrc }: MapCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <Card borderColor={theme.palette.grey[50]} elevation={2}>
      <Grid container>
        <Grid item>
          <img className={classes.image} src={imgSrc} alt={name} />
        </Grid>
        <Grid item>
          <div className={classes.name}>{name}</div>
          <div className={classes.description}>{description}</div>
        </Grid>
      </Grid>
    </Card>
  );
}
