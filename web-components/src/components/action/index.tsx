import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface ActionProps {
  name: string;
  description: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // marginTop: theme.spacing(3.75),
    // marginBottom: theme.spacing(3.75),
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  name: {
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      paddingTop: theme.spacing(2.25),
      paddingBottom: theme.spacing(1.75),
    },
  },
  description: {
    fontSize: '0.875rem',
    color: theme.palette.info.main,
  },
}));

export default function Action({ name, description, imgSrc }: ActionProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Grid className={classes.root} container direction="column">
      <img className={classes.image} src={imgSrc} alt={name} />
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.description}>{description}</Typography>
    </Grid>
  );
}
