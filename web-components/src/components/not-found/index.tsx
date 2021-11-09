import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ContainedButton from '../buttons/ContainedButton';
import Title from '../title';

interface NotFoundProps {
  img: JSX.Element;
  home?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    textAlign: 'center',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.up(theme.breakpoints.values['tablet'])]: {
      paddingTop: theme.spacing(17),
      paddingLeft: 'unset',
      paddingRight: 'unset',
      width: theme.spacing(132.75),
      margin: '0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(7),
    },
  },
  image: {
    '& img': {
      width: '70%',
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(6.25),
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(2),
      },
      margin: '0 auto',
      left: `-${theme.spacing(1.5)}`,
    },
  },
  fourOFour: {
    fontFamily: theme.typography.h1.fontFamily,
    fontStyle: 'normal',
    fontWeight: 900,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(48),
      lineHeight: theme.spacing(42.75),
      marginBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(28),
      lineHeight: theme.spacing(30.75),
      marginBottom: theme.spacing(2),
    },

    textAlign: 'center',
    letterSpacing: theme.spacing(1),
    textTransform: 'uppercase',
    color: theme.palette.secondary.dark,
  },
  h1: {
    fontWeight: 900,
    lineHeight: '130%',
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4.25),
  },
  text: {
    lineHeight: '150%',
    fontSize: theme.spacing(4.5),
    marginBottom: theme.spacing(6.5),
  },
  button: {
    textTransform: 'uppercase',
    height: theme.spacing(15),
    lineHeight: theme.spacing(5.75),
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)} ${theme.spacing(7.5)}`,
      fontSize: theme.spacing(4.5),
      height: 'unset',
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(12.5)}`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

const NotFound = ({ img, home = '/' }: NotFoundProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.image}>{img}</div>
        <div className={classes.fourOFour}>404</div>
        <Title className={classes.h1} align="center" variant="h1">
          Oops! Page not found.
        </Title>
        <Typography align="center" className={classes.text}>
          The page you are looking for might have been temporarily removed or
          had its name changed.
        </Typography>
        <ContainedButton
          style={{ whiteSpace: 'nowrap' }}
          href={home}
          className={classes.button}
        >
          Visit Our Homepage{' '}
          <Box display={{ xs: 'none', sm: 'inline' }}>{'\u00A0'}Instead</Box>
        </ContainedButton>
      </div>
    </div>
  );
};

export default NotFound;
