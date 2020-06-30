import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface SectionProps {
  children?: any;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
	  paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  },
}));

const Section = ({ children, className }: SectionProps) => {
  const classes = useStyles({});
  return (
    <div className={clsx(classes.root, className)}>
      {children}
    </div>
  );
};

export default Section;
