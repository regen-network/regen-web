import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

interface BannerProps {
  text: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 1000,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: '145%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(17.5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.25),
      fontSize: theme.spacing(3.5),
      height: theme.spacing(11.5),
    },
  },
}));

export default function Banner({ text }: BannerProps): JSX.Element {
  const classes = useStyles({});

  return <div className={classes.root}>{text}</div>;
}
