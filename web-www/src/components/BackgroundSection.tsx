import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';

import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
  body?: React.ReactNode;
  header?: React.ReactNode;
  linearGradient?: string;
  children?: React.ReactNode;
  padding?: string;
  paddingMobile?: string;
  imageData: any;
}

interface StyleProps {
  linearGradient?: string;
  padding?: string;
  paddingMobile?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    [theme.breakpoints.up('sm')]: {
      padding:
        props.padding ||
        `${theme.spacing(80)} ${theme.spacing(37.5)} ${theme.spacing(27.5)} ${theme.spacing(37.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '-700px',
      padding:
        props.paddingMobile ||
        `${theme.spacing(38)} ${theme.spacing(4)} ${theme.spacing(10.5)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.up('xl')]: {
      padding: props.padding || `${theme.spacing(80)} 25% ${theme.spacing(27.5)} ${theme.spacing(37.5)}`,
    },
    backgroundSize: 'cover',
  }),
  backgroundGradient: props => ({
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background:
      props.linearGradient ||
      'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    opacity: 0.8,
  }),
  text: {
    [theme.breakpoints.down('xs')]: {
      '& h1': {
        lineHeight: '130%',
      },
    },
    [theme.breakpoints.up('sm')]: {
      '& h1': {
        lineHeight: '140%',
      },
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

const BackgroundSection = ({
  className,
  imageData,
  linearGradient,
  body,
  header,
  padding,
  paddingMobile,
  children,
}: Props): JSX.Element => {
  const classes = useStyles({ padding, paddingMobile, linearGradient });
  let headerJSX, bodyJSX, textJSX;
  //Tried to use && operator, but it doesn't seem to play nicely with passing in dynamic props to the object
  if (header) {
    headerJSX = (
      <Title color="primary" variant="h1" className={classes.title}>
        {header}
      </Title>
    );
  }
  if (body) {
    bodyJSX = (
      <Typography component="div" className={classes.subtitle}>
        {body}
      </Typography>
    );
  }
  if (body || header) {
    textJSX = (
      <div className={classes.text}>
        {headerJSX}
        {bodyJSX}
      </div>
    );
  }
  return (
    <BackgroundImage
      Tag="section"
      className={clsx(classes.root, className)}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <div className={classes.backgroundGradient} />
      {textJSX}
      {children}
    </BackgroundImage>
  );
};

export default BackgroundSection;
