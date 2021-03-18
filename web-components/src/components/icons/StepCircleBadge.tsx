import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

type Props = {
  className?: string;
  icon: () => JSX.Element;
};

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 111,
    height: 111,
    background: theme.palette.secondary.contrastText,
    borderRadius: '50%',
  },
}));

const StepCircleBadge: React.FC<Props> = ({ className, icon }) => {
  const classes = useStyles();

  return <div className={clsx(className, classes.circle)}>{icon}</div>;
};

export default StepCircleBadge;
