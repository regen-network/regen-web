import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Section from './index';

interface OnBoardingSectionProps {
  title: string;
  formContainer?: boolean; // set max width and center
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12.5, 0, 30),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8.75, 2, 20),
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
}));

const OnBoardingSection: React.FC<OnBoardingSectionProps> = ({ formContainer = false, ...p }) => {
  const classes = useStyles();

  return (
    <Section className={classes.root} title={p.title} titleVariant="h3">
      <div className={clsx(formContainer && classes.formWrap)}>{p.children}</div>
    </Section>
  );
};

export default OnBoardingSection;
