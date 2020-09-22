import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import MediaCard from './MediaCard';
import Description from '../description';
import OutlinedButton from '../buttons/OutlinedButton';
import PlayIcon from '../icons/PlayIcon';

interface ArticleCardProps {
  buttonText?: string;
  name: string;
  date: string;
  author: string;
  imgSrc: string;
  url: string;
  className?: string;
  play?: boolean;
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
    maxWidth: theme.spacing(50),
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
  play: {
    background: theme.palette.primary.main,
    borderRadius: '50%',
    width: theme.spacing(17.5),
    height: theme.spacing(17.5),
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: theme.spacing(15.625),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))',
  },
  icon: {
    width: theme.spacing(8.75),
    height: theme.spacing(8.75),
  },
}));

export default function ArticleCard({
  buttonText = 'read article',
  className,
  name,
  date,
  author,
  imgSrc,
  url,
  play = false,
}: ArticleCardProps): JSX.Element {
  const classes = useStyles({});
  return (
    <MediaCard className={className} name={name} imgSrc={imgSrc} backgroundGradient={false} elevation={1}>
      {play && (
        <div className={classes.play}>
          <PlayIcon className={classes.icon} />
        </div>
      )}
      <Description className={classes.description}>
        <span className={classes.author}>{author}</span>
        <span className={classes.separator}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span>{date}</span>
      </Description>
      <OutlinedButton className={classes.button} href={url} target="_blank">
        {buttonText}
      </OutlinedButton>
    </MediaCard>
  );
}
