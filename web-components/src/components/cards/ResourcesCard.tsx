import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Card from './Card';
import Img from 'gatsby-image';
import Title from '../title';
import Typography from '@material-ui/core/Typography';

export interface ResourcesCardProps {
  image: any;
  title: string;
  updated: string;
  description: string;
  buttonText: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(112.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(10)} ${theme.spacing(16.25)}`,
    },
  },
  img: {
    width: '100%',
    height: '45%',
    display: 'block',
  },
}));

export default function ResourcesCard({
  image,
  title,
  updated,
  description,
  buttonText,
}: ResourcesCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card width="350px" className={classes.root} borderRadius="10px" elevation={1}>
      <Img style={{ width: '100%', height: '45%', display: 'block' }} fixed={image} />
      <div className={classes.text}>
        <Title align="center">{title}</Title>
        {updated}
        <Typography>{description}</Typography>
      </div>
    </Card>
  );
}
