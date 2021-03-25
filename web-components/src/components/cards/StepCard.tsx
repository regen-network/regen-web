import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import Card from '../cards/Card';
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
  step?: ProjectPlanStep;
}

export interface ProjectPlanStep {
  tagName?: string;
  title: string;
  description?: string;
  faqs?: QuestionItem[];
  video?: string;
  isActive?: boolean;
  stepNumber: number | string;
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
    margin: theme.spacing(3, 0),
    backgroundColor: theme.palette.info.light, // (inactive color by default)
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
    maxWidth: theme.spacing(22),
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
      marginBottom: theme.spacing(2),
      height: theme.spacing(55),
    },
  },
}));

const fallbackStep: ProjectPlanStep = {
  stepNumber: 404,
  title: 'Not found',
  tagName: 'Not found',
  isActive: false,
  description: 'Please set up content for this step number',
  faqs: [],
};

export default function StepCard({ className, icon, step = fallbackStep }: StepCardProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Card className={clsx(className, classes.card, step.isActive && classes.activeCard)}>
        {step.video && (
          <CardMedia
            className={classes.video}
            component="iframe"
            src={step.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className={classes.cardTop}>
          <div className={classes.cardTopThird}></div>
          <div className={clsx(classes.cardTopThird, classes.cardTopCenter)}>
            <StepCircleBadge icon={icon} isActive={step.isActive} />
          </div>
          <div className={clsx(classes.cardTopThird, classes.cardTopRight)}>
            {step.tagName && (
              <Tag className={classes.tag} name={step.tagName} color={theme.palette.secondary.main} />
            )}
          </div>
        </div>
        <div className={classes.cardBottom}>
          <Title variant="h6" className={clsx(classes.step, step.isActive && classes.activeColor)}>
            step {step.stepNumber}
          </Title>
          <Title variant="h4" className={clsx(classes.stepTitle, step.isActive && classes.activeTitle)}>
            {step.title}
          </Title>
          <Description className={classes.stepDescription}>
            {ReactHtmlParser(step.description || '')}
          </Description>
        </div>
        {step.faqs && step.faqs.length > 0 && <StepFAQs questionItems={step.faqs} isActive={step.isActive} />}
      </Card>
      <ArrowFilledIcon className="down-arrow" color={theme.palette.info.main} />
    </div>
  );
}
