import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';

import Section from '../components/Section';

const useStyles = makeStyles((theme: Theme) => ({
  section: {},
}));

const CoreTeamSection = (): JSX.Element => {
  const classes = useStyles();
  return <Section></Section>;
};

export default CoreTeamSection;
