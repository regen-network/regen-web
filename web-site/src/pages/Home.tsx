import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
const Home = (): JSX.Element => {
  const classes = useStyles();
  return <div className={classes.root}>Home</div>;
};

export default Home;
