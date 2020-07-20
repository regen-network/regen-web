import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

interface BannerProps {
  text: string;
  duration?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center',
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

export default function Banner({ text, duration = 10000 }: BannerProps): JSX.Element {
  const classes = useStyles({});
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      className={classes.root}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={duration}
    >
      <div>{text}</div>
    </Snackbar>
  );
}
