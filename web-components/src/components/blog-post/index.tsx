import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Title from '../title';
import OutlinedButton from '../buttons/OutlinedButton';

export interface BlogPostProps {
  header: string;
  description: string;
  img: JSX.Element;
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    '& img': {
      width: '100%',
      borderRadius: '10px',
      border: `1px solid ${theme.palette.info.light}`,
    },
  },
  header: {
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.25),
      paddingBottom: theme.spacing(2),
    },
  },
  description: {
    paddingBottom: theme.spacing(5.75),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
    color: theme.palette.info.dark,
    lineHeight: '150%',
  },
  button: {
    width: '50%',
    height: theme.spacing(10),
  },
}));

export default function BlogPost({ header, description, img, url }: BlogPostProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div>
      <div className={classes.image}>{img}</div>
      <Title variant="h5" className={classes.header}>
        {header}
      </Title>
      <Typography className={classes.description}>{description}</Typography>
      <OutlinedButton className={classes.button} href={url} target="_blank" rel="noopener noreferrer">
        read more
      </OutlinedButton>
    </div>
  );
}
