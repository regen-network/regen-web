import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface DescriptionProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.info.main,
    marginBottom: theme.spacing(1.5),
  },
}));

export default function Description({ children }: DescriptionProps): JSX.Element {
  const classes = useStyles({});
  return <Typography className={classes.root}>{children}</Typography>;
}
