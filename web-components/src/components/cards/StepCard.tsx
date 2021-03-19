import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Card } from '@material-ui/core';
import clsx from 'clsx';

import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';
import Tag from '../tag';

interface StepCardProps {
  className?: string;
  icon: JSX.Element;
  tagName?: string;
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
  cardTopLeft: {
    display: 'flex',
    flex: 1,
  },
  cardTopCenter: {
    flex: 1,
  },
  cardTopRight: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
  },
  tag: {
    marginLeft: 'auto',
    marginRight: 0,
    borderRadius: 0,
    fontSize: theme.spacing(3),
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
  tagName,
  stepText,
  title,
  description,
}: StepCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <Card variant="outlined" className={clsx(className, classes.card)}>
      <div className={classes.cardTop}>
        <div className={classes.cardTopLeft}></div>
        <StepCircleBadge icon={icon} className={classes.cardTopCenter} />
        <div className={classes.cardTopRight}>
          {tagName && <Tag className={classes.tag} name={tagName} color={theme.palette.secondary.main} />}
        </div>
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
