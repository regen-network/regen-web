import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navigation from './Navigation';
import Category from './Category';

interface Question {
  question: string;
  answer: string;
}

export interface Group {
  name: string;
  questions: Question[];
}

interface FAQProps {
  categories: Group[];
}

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(57.5),
      float: 'left',
      marginRight: theme.spacing(15),
    },
  },
  content: {
    [theme.breakpoints.up('sm')]: {},
  },
}));

const FAQ = ({ categories }: FAQProps): JSX.Element => {
  const classes = useStyles();
  const [category, setCategory] = useState(0);

  const handleClick = (c: number): void => {
    setCategory(c);
  };

  return (
    <div>
      <div className={classes.navigation}>
        <Navigation category={category} categories={categories.map(c => c.name)} onClick={handleClick} />
      </div>
      <div className={classes.content}>
        <Category name={categories[category].name} questions={categories[category].questions} />
      </div>
    </div>
  );
};

export default FAQ;
