import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    zIndex: 1,
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.info.dark,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.h1.fontFamily,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(7.75),
      width: theme.spacing(7.75),
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(5.25),
      width: theme.spacing(5.25),
      fontSize: theme.spacing(3),
    },
  },
  active: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  completed: {
    fontWeight: 700,
  },
}));

const RegenStepIcon = (props: StepIconProps): JSX.Element => {
  const classes = useStyles();
  const { active, completed, icon } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icon}
    </div>
  );
};

export default RegenStepIcon;
