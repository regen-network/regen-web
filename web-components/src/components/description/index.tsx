import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface DescriptionProps {
  children?: any;
  size?: string;
}

interface StyleProps {
  size: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    color: theme.palette.info.main,
    marginBottom: theme.spacing(1.5),
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('sm')]: {
      fontSize: props.size === 'big' ? '1.375rem' : '1.125rem',
    },
    fontSize: '1rem',
  }),
}));

export default function Description({ children, size = 'big' }: DescriptionProps): JSX.Element {
  const classes = useStyles({ size });
  return (
    <Typography component="div" className={classes.root}>
      {children}
    </Typography>
  );
}
