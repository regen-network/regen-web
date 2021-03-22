import React, { useState } from 'react';
import { makeStyles, Theme, Collapse } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import Title from '../title';
import Question, { QuestionItem } from './Question';

interface StepFAQProps {
  questions: QuestionItem[];
}

const useStyles = makeStyles((theme: Theme) => ({
  faq: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(4),
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
    color: theme.palette.secondary.main,
  },
  question: {
    padding: 0,
  },
}));

const StepFAQs: React.FC<StepFAQProps> = ({ questions }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={classes.faq}>
      <div className={classes.top}>
        <Title variant="h6" className={classes.title}>
          top faqs
        </Title>
        <Button className={classes.addButton} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <RemoveOutlinedIcon className={classes.expandCollapse} />
          ) : (
            <AddOutlinedIcon className={classes.expandCollapse} />
          )}
        </Button>
      </div>

      <Collapse in={isExpanded}>
        {questions.map(question => (
          <Question
            classNames={{ container: classes.question }}
            key={question.question}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </Collapse>
    </div>
  );
};

export default StepFAQs;
