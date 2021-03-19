import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

interface TagProps {
  color: string;
  name: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  tag: props => ({
    backgroundColor: props.color || theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: theme.spacing(4.5),
    fontSize: theme.spacing(3.5),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
    marginRight: theme.spacing(2.5),
  }),
}));

export default function Tag({ name, color }: TagProps): JSX.Element {
  const classes = useStyles({ color });
  return <span className={classes.tag}>{name}</span>;
}
