import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';

import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
  body: React.ReactNode;
  header: React.ReactNode;
  linearGradient?: string;
  imageData: any;
}

interface StyleProps {
  linearGradient?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
    },
  },
  backgroundGradient: props => ({
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      props.linearGradient ||
      'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    opacity: 0.8,
  }),
  text: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(38),
      paddingBottom: theme.spacing(10.5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      '& h1': {
        lineHeight: '130%',
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(80),
      paddingBottom: theme.spacing(27.5),
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
      '& h1': {
        lineHeight: '140%',
      },
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: '25%',
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
  },
  subtitle: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3.75),
      fontSize: theme.spacing(5.5),
    },
    lineHeight: '160%',
    color: theme.palette.primary.main,
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      lineHeight: '130%',
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: '140%',
    },
  },
}));

const BackgroundSection = ({ className, imageData, linearGradient, body, header }: Props) => {
  const classes = useStyles({ linearGradient });
  return (
    <BackgroundImage
      Tag="section"
      className={clsx(classes.root, className)}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <div className={classes.backgroundGradient} />
      <div className={classes.text}>
        <Title color="primary" variant="h1" className={classes.title}>
          {header}
        </Title>
        <Typography component="div" className={classes.subtitle}>
          {body}
        </Typography>
      </div>
    </BackgroundImage>
  );
};

export default BackgroundSection;
