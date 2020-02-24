import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
}));

export default function CloseIcon(): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 26 26" className={classes.root}>
      <rect
        x="7.08997"
        y="20.0477"
        width="2"
        height="17.9581"
        rx="0.25"
        transform="rotate(-135 7.08997 20.0477)"
        fill="#545555"
      />
      <rect
        width="2"
        height="17.9581"
        rx="0.25"
        transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 18.42 20.1125)"
        fill="#545555"
      />
    </SvgIcon>
  );
}
