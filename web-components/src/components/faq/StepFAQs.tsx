import React, { useState } from 'react';
import { makeStyles, Theme, Collapse, useTheme } from '@material-ui/core';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import Title from '../title';
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
  inactiveGradient: {
    background: `linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, ${theme.palette.info.light} 100%)`,
  },
  questionRoot: {
    padding: theme.spacing(4, 4, 2),
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
        <Button className={classes.addButton} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <MinusIcon className={classes.expandCollapse} color={theme.palette.secondary.main} />
          ) : (
            <PlusIcon className={classes.expandCollapse} color={theme.palette.secondary.main} />
          )}
        </Button>
      </div>

      <Collapse in={isExpanded}>
        {questionItems.map((questionItem, i) => (
          <Question
            classNames={{
              root: classes.questionRoot,
              container: classes.questionContainer,
              gradient: isActive ? '' : classes.inactiveGradient,
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
