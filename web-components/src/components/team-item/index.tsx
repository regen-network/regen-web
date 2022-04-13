import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import GithubIcon from '../icons/social/GithubIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';
import { Title } from '../typography';

export interface TeamItemProps {
  name: string;
  title: string;
  description?: string;
  imgUrl: string;
  bgUrl: string;
  linkedUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'inherit',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(8),
      paddingLeft: theme.spacing(8),
    },
  },
  img: {
    objectFit: 'cover',
    position: 'absolute',
    width: theme.spacing(38.5),
    height: theme.spacing(37.75),
    top: 0,
    left: 0,
    zIndex: 1,
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
  description: {
    fontSize: theme.spacing(3.5),
    lineHeight: '150%',
    color: theme.palette.info.dark,
    marginBottom: theme.spacing(4.5),
  },
  imgContainer: {
    position: 'relative',
    width: theme.spacing(38.5),
    height: theme.spacing(37.75),
    margin: `0 auto ${theme.spacing(6)}`,
  },
  bg: {
    position: 'absolute',
    width: theme.spacing(38.5),
    height: theme.spacing(37.75),
    top: theme.spacing(2.5),
    left: theme.spacing(2.5),
    zIndex: 0,
  },
}));

export default function TeamItem({
  name,
  title,
  description,
  imgUrl,
  bgUrl,
  linkedUrl,
  githubUrl,
  twitterUrl,
}: TeamItemProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img className={classes.bg} src={bgUrl} alt="background" />
        <img className={classes.img} src={imgUrl} alt={name} />
      </div>

      <Title className={classes.name} variant="h4" align="center">
        {name}
      </Title>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.description}>{description}</Typography>
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <GithubIcon color={theme.palette.secondary.main} />
        </a>
      )}
      {twitterUrl && (
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <TwitterIcon color={theme.palette.secondary.main} />
        </a>
      )}
      {linkedUrl && (
        <a href={linkedUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon color={theme.palette.secondary.main} />
        </a>
      )}
    </div>
  );
}
