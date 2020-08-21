import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Title from '../title';

export interface teamItemProps {
  name: string;
  title: string;
  desc: string;
  imgUrl: string;
  linkedUrl: string;
  githubUrl: string;
  twitterUrl: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'inherit',
    padding: theme.spacing(8),
  },
  img: {
    width: theme.spacing(38.5),
    height: theme.spacing(37.75),
    marginBottom: theme.spacing(6),
  },
  name: {
    lineHeight: '145%',
    fontWeight: 900,
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: theme.spacing(3),
    lineHeight: '150%',
    fontWeight: 800,
    letterSpacing: theme.spacing(0.25),
    textTransform: 'uppercase',
    color: theme.palette.info.main,
    marginBottom: theme.spacing(2.5),
  },
  desc: {
    fontSize: theme.spacing(3.5),
    lineHeight: '150%',
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(12.5),
  },
}));
export default function TeamItem({
  name,
  title,
  desc,
  imgUrl,
  linkedUrl,
  githubUrl,
  twitterUrl,
}: teamItemProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.img} src={imgUrl} alt={name} />
      <Title className={classes.name} variant="h4" align="center">
        {name}
      </Title>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.desc}>{desc}</Typography>
    </div>
  );
}
