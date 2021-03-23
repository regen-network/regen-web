import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Card } from '@material-ui/core';
import clsx from 'clsx';

import ArrowFilledIcon from '../icons/ArrowFilledIcon';
import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';
import Tag from '../tag';
import StepFAQs from '../faq/StepFAQs';
import { QuestionItem } from '../faq/Question';

interface StepCardProps {
  className?: string;
  icon: JSX.Element;
  tagName?: string;
  stepText: string;
  title: string;
  description?: string | JSX.Element;
  questionItems?: QuestionItem[];
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', //TODO why not flexgrow?

    '&:last-child': {
      '& .down-arrow': {
        display: 'none',
        visibility: 'hidden',
      },
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', //TODO why not flexgrow?
    borderColor: theme.palette.grey[100],
    borderRadius: 5,
    padding: theme.spacing(4, 0, 0),
    margin: theme.spacing(4, 0),
    backgroundColor: theme.palette.info.light, // (inactive style by default)
  },
  activeCard: {
    backgroundColor: theme.palette.primary.main,
  },
  cardTop: {
    display: 'flex',
    flex: 1,
    width: '100%', //TODO why not flexgrow?
    justifyContent: 'space-between',
  },
  cardTopLeft: {
    display: 'flex',
    flex: 1,
  },
  cardTopCenter: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
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
    maxWidth: '90%',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: theme.spacing(3.5, 3.5, 4),
  },
  step: {
    color: theme.palette.info.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  activeColor: {
    color: theme.palette.secondary.main,
  },
  stepTitle: {
    color: theme.palette.info.main,
    padding: theme.spacing(3.5, 0),
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  activeTitle: {
    color: theme.palette.primary.contrastText,
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
  questionItems,
  isActive,
}: StepCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={clsx(className, classes.card, isActive && classes.activeCard)}>
        <div className={classes.cardTop}>
          <div className={classes.cardTopLeft}></div>
          <div className={classes.cardTopCenter}>
            <StepCircleBadge icon={icon} isActive={isActive} />
          </div>
          <div className={classes.cardTopRight}>
            {tagName && <Tag className={classes.tag} name={tagName} color={theme.palette.secondary.main} />}
          </div>
        </div>
        <div className={classes.cardBottom}>
          <Title variant="h6" className={clsx(classes.step, isActive && classes.activeColor)}>
            {stepText}
          </Title>
          <Title variant="h4" className={clsx(classes.stepTitle, isActive && classes.activeTitle)}>
            {title}
          </Title>
          <Description className={classes.stepDescription}>{description}</Description>
        </div>
        {questionItems && <StepFAQs questions={questionItems} />}
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}
