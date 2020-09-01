import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';

export interface ActionProps {
  name: string;
  description: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
      paddingTop: theme.spacing(2.8),
      paddingBottom: theme.spacing(1.2),
    },
  },
  description: {
    fontSize: '0.875rem',
    color: theme.palette.info.dark,
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
}));

export default function Action({ name, description, imgSrc }: ActionProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Grid container direction="column">
      <img className={classes.image} src={imgSrc} alt={name} />
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.description}>{ReactHtmlParser(description)}</Typography>
    </Grid>
  );
}
