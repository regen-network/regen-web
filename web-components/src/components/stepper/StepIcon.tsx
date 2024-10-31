import React from 'react';
import { StepIconProps } from '@mui/material/StepIcon';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';
import CheckIcon from '../icons/CheckIcon';

const useStyles = makeStyles()((theme: Theme) => ({
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
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
    fontWeight: 700,
  },
}));

const RegenStepIcon = (props: StepIconProps): JSX.Element => {
  const { classes } = useStyles();
  const { active, completed, icon } = props;

  return (
    <div
      className={cn(
        classes.root,
        completed && 'text-grey-0 bg-brand-400',
        active &&
          'text-brand-400 bg-grey-0 border border-solid border-brand-400',
        'w-full',
      )}
    >
      {completed ? <CheckIcon className="w-full px-3" /> : icon}
    </div>
  );
};

export default RegenStepIcon;
