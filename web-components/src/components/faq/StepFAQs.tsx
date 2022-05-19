import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import { Collapse } from '@mui/material';
import { Button } from '@mui/material';
import clsx from 'clsx';

import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import { Title } from '../typography';
import Question, { QuestionItem } from './Question';

interface StepFAQProps {
  questionItems: QuestionItem[];
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  faq: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(3, 0),
  },
  lessPaddingBottom: {
    paddingBottom: 0,
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 3, 0, 4),
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.5),
  },
  addButton: {
    padding: 0,
    minWidth: 'unset',
  },
  expandCollapse: {
    height: 30,
    width: 30,
  },
  questionContainer: {
    padding: 0,
  },
  gradient: {
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(-4),
    },
  },
  inactiveGradient: {
    background: `linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, ${theme.palette.info.light} 100%)`,
  },
  questionRoot: {
    padding: theme.spacing(4, 4, 2),
    '&:last-child': {
      paddingBottom: theme.spacing(5),
    },
  },
  questionTitle: {
    fontSize: theme.spacing(4.5),
  },
  answer: {
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  collapsedAnswer: {
    [theme.breakpoints.up('sm')]: {
      maxHeight: theme.spacing(8),
    },
  },
  questionIcon: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(5.75),
    },
  },
}));

const StepFAQs: React.FC<StepFAQProps> = ({ questionItems, isActive }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx(classes.faq, isExpanded && classes.lessPaddingBottom)}>
      <div className={classes.top}>
        <Title variant="h6" className={classes.title}>
          top faqs
        </Title>
        <Button
          className={classes.addButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <MinusIcon
              className={classes.expandCollapse}
              color={theme.palette.secondary.main}
            />
          ) : (
            <PlusIcon
              className={classes.expandCollapse}
              color={theme.palette.secondary.main}
            />
          )}
        </Button>
      </div>

      <Collapse in={isExpanded}>
        {questionItems.map((questionItem, i) => (
          <Question
            classNames={{
              root: classes.questionRoot,
              container: classes.questionContainer,
              gradient: clsx(
                classes.gradient,
                !isActive && classes.inactiveGradient,
              ),
              question: classes.questionTitle,
              answer: classes.answer,
              collapsed: classes.collapsedAnswer,
              icon: classes.questionIcon,
            }}
            key={questionItem.question}
            question={questionItem.question}
            answer={questionItem.answer}
            first={i === 0}
            last={i === questionItems.length - 1}
          />
        ))}
      </Collapse>
    </div>
  );
};

export default StepFAQs;
