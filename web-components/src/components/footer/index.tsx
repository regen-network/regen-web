import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

interface FooterProps {}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.info.light,
  },
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(9.25)} ${theme.spacing(37.5)} ${theme.spacing(38)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(9.25)} ${theme.spacing(10)} ${theme.spacing(38)}`,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      padding: `${theme.spacing(9.25)} ${theme.spacing(4)} ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
  copyrightContainer: {
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'flex-end',
    },
  },
  copyright: {
    color: theme.palette.info.main,
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(13.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3.25),
    },
  },
}));

export default function Footer(): JSX.Element {
  const classes = useStyles({});

  return <div className={classes.background}></div>;
}
