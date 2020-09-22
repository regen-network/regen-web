import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import MediaCard from './MediaCard';
import Description from '../description';
import OutlinedButton from '../buttons/OutlinedButton';

interface ArticleCardProps {
  name: string;
  date: string;
  author: string;
  imgSrc: string;
  url: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    flex: '1 0 auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
    },
  },
  author: {
    fontWeight: 'bold',
  },
  button: {
    marginBottom: theme.spacing(7.5),
    maxWidth: theme.spacing(38),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
    },
  },
  separator: {
    fontWeight: 100,
  },
}));

export default function ArticleCard({
  className,
  name,
  date,
  author,
  imgSrc,
  url,
}: ArticleCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <MediaCard className={className} name={name} imgSrc={imgSrc} backgroundGradient={false} elevation={1}>
      <Description className={classes.description}>
        <span className={classes.author}>{author}</span>
        <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span>{date}</span>
      </Description>
      <OutlinedButton className={classes.button} href={url} target="_blank">
        read article
      </OutlinedButton>
    </MediaCard>
  );
}
