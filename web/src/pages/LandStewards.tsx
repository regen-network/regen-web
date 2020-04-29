import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
const LandStewards = (): JSX.Element => {
  const classes = useStyles();
  return <div>Land Stewards</div>;
};

export default LandStewards;
