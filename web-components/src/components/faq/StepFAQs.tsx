import React, { useState } from 'react';
import { makeStyles, Theme, Collapse, useTheme } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
    padding: theme.spacing(2, 4),
    '& $container': {
      padding: 0,
      background: 'pink',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  addButton: {
    padding: theme.spacing(1),
    minWidth: 'unset', //todo
  },
  expandCollapse: {
    height: 30,
    width: 30,
  },
  question: {
    padding: 0,
  },
  inactiveGradient: {
    background: `linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, ${theme.palette.info.light} 100%)`,
  },
  questionRoot: {
    padding: theme.spacing(4, 0),
  },
}));

const StepFAQs: React.FC<StepFAQProps> = ({ questionItems, isActive }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={classes.faq}>
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
        {questionItems.map(questionItem => (
          <Question
            classNames={{
              root: classes.questionRoot,
              container: classes.question,
              gradient: isActive ? '' : classes.inactiveGradient,
            }}
            key={questionItem.question}
            question={questionItem.question}
            answer={questionItem.answer}
          />
        ))}
      </Collapse>
    </div>
  );
};

export default StepFAQs;
