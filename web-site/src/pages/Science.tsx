import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
const Science = (): JSX.Element => {
  const classes = useStyles();
  return <div className={classes.root}>Science</div>;
};

export default Science;
