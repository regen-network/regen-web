import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Card } from '@material-ui/core';

import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';

interface StepCardProps {
  className?: string;
  icon: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderColor: theme.palette.grey[100],
    borderRadius: 5,
    padding: theme.spacing(3.5, 0),
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
}));

export default function StepCard({ className, icon }: StepCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card variant="outlined" className={classes.card}>
      <div className={classes.cardTop}>
        <StepCircleBadge icon={icon} />
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
  );
}
