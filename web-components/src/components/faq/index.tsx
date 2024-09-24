import React from 'react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import { Label } from '../typography';
import Category from './Category';
import Navigation from './Navigation';
import { QuestionItem } from './Question';

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
  backText: string;
  copyText: string;
  copySuccessText: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
  backText,
  copyText,
  copySuccessText,
}: Props): JSX.Element => {
  const { classes } = useStyles();
  if (!categories.length) {
    return <></>;
  }

  const categoriesHeader: { label: string; value: string }[] = categories.map(
    c => ({ label: c.header, value: c.header }),
  );

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
            copyText={copyText}
            copySuccessText={copySuccessText}
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
              <BreadcrumbIcon
                className={cn(classes.icon, 'text-brand-400')}
                direction="prev"
              />
              {backText}
            </Label>
            <Category
              questionId={questionId}
              name={category.header}
              questions={category.questions}
              copyText={copyText}
              copySuccessText={copySuccessText}
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
