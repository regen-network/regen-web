import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import StepCard from 'web-components/lib/components/cards/StepCard';
import Title from 'web-components/lib/components/title';

type Props = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
  },
  interfaceIcon: {
    width: 100,
    height: 100,
  },
}));

const GettingStarted: React.FC<Props> = ({}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title variant="h3" className={classes.title}>
        Getting Started
      </Title>
      <StepCard icon={<InterfaceIcon className={classes.interfaceIcon} />} />
    </div>
  );
};

export default GettingStarted;
