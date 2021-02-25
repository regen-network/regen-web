import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Section from './index';

interface OnBoardingContainerProps {
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12.5),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(8.75)} ${theme.spacing(2)} ${theme.spacing(20)}`,
    },
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
}));

const OnBoardingContainer: React.FC<OnBoardingContainerProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Section className={classes.root} title={title} titleVariant="h3" titleClassName={classes.content}>
      <div className={classes.content}>{children}</div>
    </Section>
  );
};

export default OnBoardingContainer;
