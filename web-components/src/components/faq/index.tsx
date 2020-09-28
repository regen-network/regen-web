import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Navigation from './Navigation';
import Category from './Category';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';

interface Question {
  question: string;
  answer: string;
}

export interface Group {
  name: string;
  questions: Question[];
}

interface FAQProps {
  questions: {
    [key: string]: Question[];
  };
  categories: string[];
  defaultCategory?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(57.5),
      float: 'left',
      marginRight: theme.spacing(15),
    },
  },
  back: {
    fontSize: theme.spacing(3.5),
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.secondary.main,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 800,
    lineHeight: theme.spacing(4.5),
    position: 'absolute',
    top: theme.spacing(12),
    cursor: 'pointer',
  },
  icon: {
    height: theme.spacing(2.25),
    width: theme.spacing(3.75),
    marginRight: theme.spacing(2.25),
  },
}));

const FAQ = ({ questions, categories, defaultCategory }: FAQProps): JSX.Element => {
  const classes = useStyles();
  const [category, setCategory] = useState(defaultCategory || categories[0]);
  const [selected, setSelected] = useState(false); // for mobile

  const handleClick = (c: string): void => {
    setSelected(true);
    setCategory(c);
  };

  const handleBack = (): void => {
    setSelected(false);
  };

  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <div className={classes.navigation}>
          <Navigation category={category} categories={categories} onClick={handleClick} />
        </div>
        <div>
          <Category name={category} questions={questions[category]} />
        </div>
      </Box>

      <Box display={{ xs: 'block', sm: 'none' }}>
        {selected ? (
          <div>
            <div className={classes.back} onClick={handleBack}>
              <BreadcrumbIcon className={classes.icon} direction="prev" />
              back
            </div>
            <Category name={category} questions={questions[category]} />
          </div>
        ) : (
          <div className={classes.navigation}>
            <Navigation category={category} categories={categories} onClick={handleClick} />
          </div>
        )}
      </Box>
    </>
  );
};

export default FAQ;
