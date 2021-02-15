import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: 'Nilland',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    width: theme.spacing(6.25),
    height: theme.spacing(6.25),
  },
}));

export default function IconIcon({ className }: { className?: string }): JSX.Element {
  const classes = useStyles();
  return <div className={clsx(className, classes.root)}>i</div>;
}
