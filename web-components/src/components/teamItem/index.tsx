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
      <img src={imgUrl} alt={name} />
      <Title variant="h4" align="center">
        {name}
      </Title>
      <Typography>{title}</Typography>
      <Typography>{desc}</Typography>
    </div>
  );
}
