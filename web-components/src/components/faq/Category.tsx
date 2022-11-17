import React from 'react';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import GreenCard from '../cards/GreenCard';
import { Label } from '../typography';
import Question, { QuestionItem } from './Question';

interface CategoryProps {
  name: string;
  questionId?: string;
  questions: QuestionItem[];
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} 0 ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10)} 0 ${theme.spacing(8.27)}`,
    },
  },
}));

const Category = ({
  questions,
  name,
  questionId,
}: CategoryProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <GreenCard className={classes.root}>
      <Label sx={{ color: 'secondary.dark', px: [5.25, 7.75] }}>{name}</Label>
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
