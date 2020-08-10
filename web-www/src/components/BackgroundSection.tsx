import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import Box from '@material-ui/core/Box';

import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
  body?: React.ReactNode;
  header?: React.ReactNode;
  linearGradient?: string;
  children?: React.ReactNode;
  imageData: any;
  imageDataMobile?: any;
}

interface StyleProps {
  linearGradient?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(80)} ${theme.spacing(37.5)} ${theme.spacing(27.5)} ${theme.spacing(37.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(38)} ${theme.spacing(4)} ${theme.spacing(10.5)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.up('xl')]: {
      padding: `${theme.spacing(80)} 25% ${theme.spacing(27.5)} ${theme.spacing(37.5)}`,
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
  imageDataMobile,
  linearGradient,
  body,
  header,
  children,
}: Props): JSX.Element => {
  const classes = useStyles({ linearGradient });
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
    <>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <BackgroundImage
          Tag="section"
          className={clsx(className, classes.root)}
          fluid={imageDataMobile ? imageDataMobile : imageData}
          backgroundColor={`#040e18`}
        >
          <div className={classes.backgroundGradient} />
          {textJSX}
          {children}
        </BackgroundImage>
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <BackgroundImage
          Tag="section"
          className={clsx(className, classes.root)}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          <div className={classes.backgroundGradient} />
          {textJSX}
          {children}
        </BackgroundImage>
      </Box>
    </>
  );
};

export default BackgroundSection;
