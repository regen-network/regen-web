import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Card, Button } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import clsx from 'clsx';

import ArrowFilledIcon from '../icons/ArrowFilledIcon';
import StepCircleBadge from '../icons/StepCircleBadge';
import Title from '../title';
import Description from '../description';
import Tag from '../tag';
import StepFAQs from '../faq/StepFAQs';

interface StepCardProps {
  className?: string;
  icon: JSX.Element;
  tagName?: string;
  stepText: string;
  title: string;
  description?: string | JSX.Element;
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
    color: theme.palette.secondary.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  stepTitle: {
    padding: theme.spacing(3.5, 0),
    textAlign: 'center',
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
  const questionItems = [
    { question: 'How do i so and so?', answer: 'you just do' },
    {
      question: 'How do i so and so? Like really what do i do?',
      answer:
        'you just do. you just do. you just do. ok okok okok okookok ABC123 okokokok ok. you just do. you just do. you just do. ',
    },
    { question: 'How do i so and so?', answer: 'you just do' },
    { question: 'How do i so and so?', answer: 'you just do' },
  ];

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={clsx(className, classes.card)}>
        <div className={classes.cardTop}>
          <div className={classes.cardTopLeft}></div>
          <div className={classes.cardTopCenter}>
            <StepCircleBadge icon={icon} />
          </div>
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
        <StepFAQs questions={questionItems} />
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}
