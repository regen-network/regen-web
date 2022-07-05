import React from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';

import GithubIcon from '../icons/social/GithubIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';
import { Body, Label, Title } from '../typography';
import { styled } from '@mui/material';

export interface TeamItemProps {
  name: string;
  title: string;
  description?: string;
  imgUrl: string;
  bgUrl: string;
  linkedinUrl?: string;
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

const ImgContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: theme.spacing(38.5),
  // height: theme.spacing(37.75),
  height: theme.spacing(44.75),
  margin: `0 auto ${theme.spacing(6)}`,
}));

const Hexagon = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  background: '#000',
  clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%)',
}));

const Image = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1,
}));

export function TeamItem({
  name,
  title,
  // description, // legacy - some team members have descriptions, but we're no longer showing
  imgUrl,
  bgUrl,
  linkedinUrl,
  githubUrl,
  twitterUrl,
}: TeamItemProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      {/* <div className={classes.imgContainer}> */}
      <ImgContainer>
        {/* <img className={classes.bg} src={bgUrl} alt="background" /> */}
        <Hexagon>
          <Image src={imgUrl} alt={name} />
          {/* <img className={classes.bg} src={bgUrl} alt="background" /> */}
        </Hexagon>
        {/* <img className={classes.img} src={imgUrl} alt={name} /> */}
        {/* <img src={imgUrl} alt={name} /> */}
      </ImgContainer>
      {/* </div> */}

      <Title variant="h4" align="center" sx={{ mb: 2 }}>
        {name}
      </Title>
      <Label size="xs" sx={{ color: 'info.main', mb: 2.5 }}>
        {title}
      </Label>
      {/* {description && (
        <Body size="sm" mb={4.5}>
          {description}
        </Body>
      )} */}
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
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon color={theme.palette.secondary.main} />
        </a>
      )}
    </div>
  );
}
