import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Card } from '@material-ui/core';
import clsx from 'clsx';

import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';
import Tag from '../tag';

interface StepCardProps {
  className?: string;
  icon: JSX.Element;
  stepText: string;
  title: string;
  description?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderColor: theme.palette.grey[100],
    borderRadius: 5,
    padding: theme.spacing(3.5, 0),
    margin: theme.spacing(2, 0),
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
}));

export default function StepCard({
  className,
  icon,
  stepText,
  title,
  description,
}: StepCardProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Card variant="outlined" className={clsx(className, classes.card)}>
      <div className={classes.cardTop}>
        <StepCircleBadge icon={icon} />
      </div>
      <div className={classes.cardBottom}>
        <Title variant="h6" className={classes.step}>
          {stepText}
        </Title>
        <Title variant="h4" className={classes.stepTitle}>
          {title}
        </Title>
        <Description className={classes.stepDescription}>{description}</Description>
      </div>
    </Card>
  );
}
