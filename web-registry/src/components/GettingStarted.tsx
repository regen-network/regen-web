import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import StepCircleBadge from 'web-components/lib/components/icons/StepCircleBadge';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

type Props = {};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  step: {},
  stepTitle: {},
  stepDescription: {
    textAlign: 'center',
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
      <OnBoardingCard>
        <div className={classes.cardTop}>
          <StepCircleBadge icon={<InterfaceIcon className={classes.interfaceIcon} />} />
        </div>
        <div className={classes.cardBottom}>
          <div className={classes.step}>Step 1</div>
          <div className={classes.stepTitle}>Fill out a project plan</div>
          <div className={classes.stepDescription}>
            This project plan includes all the details about your monitoring, management practices, and more.{' '}
          </div>
        </div>
      </OnBoardingCard>
    </div>
  );
};

export default GettingStarted;
