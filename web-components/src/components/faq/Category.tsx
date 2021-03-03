import React, { useRef, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import GreenCard from '../cards/GreenCard';
import Title from '../title';
import Question, { QuestionItem } from './Question';

interface CategoryProps {
  name: string;
  question?: number;
  questions: QuestionItem[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      padding: `0 ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(7.75)}`,
    },
  },
}));

const Category = ({ questions, name, question }: CategoryProps): JSX.Element => {
  const classes = useStyles();
  const elems = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question && elems.current[question - 1]) {
      elems.current[question - 1]?.scrollIntoView();
    }
  }, [elems, question]);

  return (
    <GreenCard className={classes.root}>
      <Title variant="h6" className={classes.title}>
        {name}
      </Title>
      {questions.map((q, i) => (
        <div key={i} ref={(element: HTMLDivElement) => (elems.current[i] = element)}>
          <Question
            initOpen={question ? i === question - 1 : false}
            first={i === 0}
            last={i === questions.length - 1}
            question={q.question}
            answer={q.answer}
          />
        </div>
      ))}
    </GreenCard>
  );
};

export default Category;
