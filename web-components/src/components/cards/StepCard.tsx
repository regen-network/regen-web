import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Card, CardMedia } from '@material-ui/core';
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
  video?: string;
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.spacing(139),
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
    width: '100%',
    borderColor: theme.palette.grey[100],
    borderRadius: 5,
    margin: theme.spacing(4, 0),
    backgroundColor: theme.palette.info.light, // (inactive style by default)
  },
  activeCard: {
    backgroundColor: theme.palette.primary.main,
  },
  cardTop: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',

    paddingTop: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
    },
  },
  cardTopThird: {
    display: 'flex',
    flex: 1,
  },
  cardTopCenter: {
    justifyContent: 'center',
  },
  cardTopRight: {
    alignItems: 'flex-start',
  },
  tag: {
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
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
    padding: theme.spacing(3.5, 3.5, 6),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  step: {
    color: theme.palette.info.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.5),
  },
  activeColor: {
    color: theme.palette.secondary.main,
  },
  stepTitle: {
    color: theme.palette.info.dark,
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
    fontSize: theme.spacing(4.5),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  video: {
    height: theme.spacing(81),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
      height: theme.spacing(55),
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
  video,
  isActive,
}: StepCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  // TODO: ProjectStep prop, move all data to mocks json

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={clsx(className, classes.card, isActive && classes.activeCard)}>
        {video && (
          <CardMedia
            className={classes.video}
            component="iframe"
            src={video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className={classes.cardTop}>
          <div className={classes.cardTopThird}></div>
          <div className={clsx(classes.cardTopThird, classes.cardTopCenter)}>
            <StepCircleBadge icon={icon} isActive={isActive} />
          </div>
          <div className={clsx(classes.cardTopThird, classes.cardTopRight)}>
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
        {questionItems && <StepFAQs questionItems={questionItems} isActive={isActive} />}
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}
