import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import GreenCard from '../cards/GreenCard';
import { Title } from '../typography';
import Question, { QuestionItem } from './Question';

interface CategoryProps {
  name: string;
  questionId?: string;
  questions: QuestionItem[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} 0 ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10)} 0 ${theme.spacing(8.27)}`,
    },
  },
  title: {
    letterSpacing: '1px',
    fontWeight: 800,
    color: theme.palette.secondary.dark,
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      padding: `0 ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(7.75)}`,
    },
  },
}));

const Category = ({
  questions,
  name,
  questionId,
}: CategoryProps): JSX.Element => {
  const classes = useStyles();

  return (
    <GreenCard className={classes.root}>
      <Title variant="h6" className={classes.title}>
        {name}
      </Title>
      {questions.map((q, i) => (
        <div key={i}>
          <Question
            questionId={questionId}
            first={i === 0}
            last={i === questions.length - 1}
            question={q.question}
            answer={q.answer}
            isShareable
          />
        </div>
      ))}
    </GreenCard>
  );
};

export default Category;
