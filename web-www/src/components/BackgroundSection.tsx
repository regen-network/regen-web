import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import Box from '@material-ui/core/Box';

import Title from 'web-components/lib/components/title';

interface Props {
  className?: string;
  titleClassName?: string;
  titleVariant?: Variant;
  body?: React.ReactNode;
  header?: React.ReactNode;
  linearGradient?: string;
  linearGradientMobile?: string;
  children?: React.ReactNode;
  imageData: any;
  imageDataMobile?: any;
  withSlider?: boolean;
  topSection?: boolean;
}

interface StyleProps {
  linearGradient?: string;
  linearGradientMobile?: string;
  withSlider?: boolean;
  topSection?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      paddingTop: props.topSection ? theme.spacing(70) : theme.spacing(17.75),
      paddingBottom: theme.spacing(13),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: props.topSection ? theme.spacing(80) : theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
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
    [theme.breakpoints.up('sm')]: {
      background:
        props.linearGradient ||
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    [theme.breakpoints.down('xs')]: {
      background:
        props.linearGradientMobile ||
        props.linearGradient ||
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    opacity: 0.8,
  }),
  text: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      '& h1': {
        lineHeight: '130%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      '& h1': {
        lineHeight: '140%',
        maxWidth: theme.spacing(220),
      },
      '& div': {
        [theme.breakpoints.up('sm')]: {
          maxWidth: theme.spacing(167.5),
        },
      },
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
  },
  children: props => ({
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: props.withSlider ? 0 : theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    zIndex: 1,
    position: 'relative',
  }),
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
  titleClassName,
  titleVariant = 'h1',
  imageData,
  imageDataMobile,
  linearGradient,
  linearGradientMobile,
  body,
  header,
  children,
  withSlider,
  topSection = true,
}: Props): JSX.Element => {
  const classes = useStyles({ linearGradientMobile, linearGradient, topSection });
  let headerJSX, bodyJSX, textJSX;
  // Tried to use && operator, but it doesn't seem to play nicely with passing in dynamic props to the object
  if (header) {
    headerJSX = (
      <Title color="primary" variant={titleVariant} className={clsx(titleClassName, classes.title)}>
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
          backgroundColor="transparent"
        >
          {linearGradient !== 'unset' && <div className={classes.backgroundGradient} />}
          {textJSX}
          <div className={classes.children}>{children}</div>
        </BackgroundImage>
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <BackgroundImage
          Tag="section"
          className={clsx(className, classes.root)}
          fluid={imageData}
          backgroundColor="transparent"
        >
          {linearGradient !== 'unset' && <div className={classes.backgroundGradient} />}
          {textJSX}
          <div className={classes.children}>{children}</div>
        </BackgroundImage>
      </Box>
    </>
  );
};

export default BackgroundSection;
