import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import InterfaceIcon from 'web-components/lib/components/icons/InterfaceIcon';
import StepCircleBadge from 'web-components/lib/components/icons/StepCircleBadge';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

type Props = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  card: {
    borderColor: theme.palette.grey[100],
    borderRadius: 5,
    padding: theme.spacing(3.5, 0),
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: theme.spacing(3.5, 3.5, 0),
  },
  step: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
    fontSize: theme.spacing(3.5),
  },
  stepTitle: {
    padding: theme.spacing(3.5, 0),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  stepDescription: {
    textAlign: 'center',
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
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

      <Card variant="outlined" className={classes.card}>
        <div className={classes.cardTop}>
          <StepCircleBadge icon={<InterfaceIcon className={classes.interfaceIcon} />} />
        </div>
        <div className={classes.cardBottom}>
          <Title variant="h6" className={classes.step}>
            STEP 1
          </Title>
          <Title variant="h4" className={classes.stepTitle}>
            Fill out a project plan
          </Title>
          <Description className={classes.stepDescription}>
            This project plan includes all the details about your monitoring, management practices, and more.{' '}
          </Description>
        </div>
      </Card>
    </div>
  );
};

export default GettingStarted;
