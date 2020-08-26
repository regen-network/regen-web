import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '../icons/social/GithubIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';

import Title from '../title';

export interface teamItemProps {
  name: string;
  title: string;
  desc?: string;
  imgUrl: string;
  linkedUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'inherit',
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
  },
  img: {
    width: theme.spacing(38.5),
    height: theme.spacing(37.75),
    marginBottom: theme.spacing(6),
    boxShadow: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.palette.info.light}`,
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
    marginBottom: theme.spacing(4.5),
  },
  socials: {},
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
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <img className={classes.img} src={imgUrl} alt={name} />
      <Title className={classes.name} variant="h4" align="center">
        {name}
      </Title>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.desc}>{desc}</Typography>
      <div className={classes.socials}></div>
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
