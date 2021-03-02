import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Navigation from './Navigation';
import Category from './Category';
import { QuestionItem } from './Question';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';

interface FAQProps {
  navigate: (c: string) => void;
  categories: {
    header: string;
    questions: QuestionItem[];
  }[];
  header?: string; // current category header
  question?: number; // current question to show from url query param, starting at 1
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

const FAQ = ({ navigate, header, categories, question }: FAQProps): JSX.Element => {
  const classes = useStyles();
  if (!categories.length) {
    return <></>;
  }

  const categoriesHeader: string[] = categories.map(c => c.header);

  let category = categories[0];
  if (header) {
    category = categories.filter(c => c.header === header)[0];
  }

  const handleClick = (c: string): void => {
    navigate(`/faq/${c}`);
  };

  const handleBack = (): void => {
    navigate(`/faq`);
  };

  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <div className={classes.navigation}>
          <Navigation category={category.header} categories={categoriesHeader} onClick={handleClick} />
        </div>
        <div>
          <Category question={question} name={category.header} questions={category.questions} />
        </div>
      </Box>

      <Box display={{ xs: 'block', sm: 'none' }}>
        {header ? (
          <div>
            <div className={classes.back} onClick={handleBack}>
              <BreadcrumbIcon className={classes.icon} direction="prev" />
              back
            </div>
            <Category question={question} name={category.header} questions={category.questions} />
          </div>
        ) : (
          <div className={classes.navigation}>
            <Navigation categories={categoriesHeader} onClick={handleClick} />
          </div>
        )}
      </Box>
    </>
  );
};

export default FAQ;
