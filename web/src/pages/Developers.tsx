import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));
const Developers = (): JSX.Element => {
  const classes = useStyles();
  return <div>Developers</div>;
};

export default Developers;
