import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Box from '@mui/material/Box';

import Navigation from './Navigation';
import Category from './Category';
import { QuestionItem } from './Question';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import { Label } from '../typography';

export interface FAQProps {
  categories: {
    header: string;
    questions: QuestionItem[];
  }[];
  header?: string; // current category header
}

interface Props extends FAQProps {
  navigate: (c: string) => void;
  questionId?: string; // current question title from url anchor
}

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(57.5),
      float: 'left',
      marginRight: theme.spacing(15),
    },
  },
  icon: {
    height: theme.spacing(2.25),
    width: theme.spacing(3.75),
    marginRight: theme.spacing(2.25),
  },
}));

const FAQ = ({
  navigate,
  header,
  categories,
  questionId,
}: Props): JSX.Element => {
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
          <Navigation
            category={category.header}
            categories={categoriesHeader}
            onClick={handleClick}
          />
        </div>
        <div>
          <Category
            questionId={questionId}
            name={category.header}
            questions={category.questions}
          />
        </div>
      </Box>

      <Box display={{ xs: 'block', sm: 'none' }}>
        {header ? (
          <div>
            <Label
              mobileSize="sm"
              color="secondary"
              role="button"
              onClick={handleBack}
              sx={{
                position: 'absolute',
                cursor: 'pointer',
                top: theme => theme.spacing(12),
              }}
            >
              <BreadcrumbIcon className={classes.icon} direction="prev" />
              back
            </Label>
            <Category
              questionId={questionId}
              name={category.header}
              questions={category.questions}
            />
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
