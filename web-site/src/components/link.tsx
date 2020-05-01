import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  io: {},
}));

interface linkProps {
  anchor: string;
  target: string;
}
export default function Link(props: linkProps): JSX.Element {
  const classes = useStyles({});
  // TODO: Add search/menu logic
  return (
    <a className={classes.io} href="{props.target}">
      {props.anchor}
    </a>
  );
}
