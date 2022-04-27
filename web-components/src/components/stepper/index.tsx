import React from 'react';
import { makeStyles, DefaultTheme as Theme, withStyles } from '@mui/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  SxProps,
} from '@mui/material';
import clsx from 'clsx';

import RegenStepIcon from './StepIcon';

interface StepperProps {
  className?: string;
  activeStep: number;
  background?: string;
  steps: string[];
  sx?: SxProps<Theme>;
}

interface StyleProps {
  background?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.info.light,
    backgroundImage: `url(${props.background})`,
  }),
  stepper: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5, 0),
    },
  },
  step: {
    width: theme.spacing(7.75),
    height: theme.spacing(7.75),
  },
  alternativeLabel: {
    '&.MuiStepLabel-label': {
      fontSize: theme.spacing(4),
      fontWeight: 700,
      color: theme.palette.info.dark,
      marginTop: theme.spacing(1),

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
    },
  },
}));

const RegenStepConnector = withStyles((theme: Theme) => ({
  alternativeLabel: {
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(3.75),
      left: `calc(-50% + ${theme.spacing(3.75)})`,
      right: `calc(50% + ${theme.spacing(3.75)})`,
    },
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(2.75),
      left: `calc(-50% + ${theme.spacing(2.5)})`,
      right: `calc(50% + ${theme.spacing(2.5)})`,
    },
  },
  active: {
    '& $line': {
      borderColor: theme.palette.info.main,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.info.main,
    },
  },
  line: {
    borderColor: theme.palette.info.main,
  },
}))(StepConnector);

const RegenStepper = ({
  className,
  activeStep,
  steps,
  background,
  sx,
}: StepperProps): JSX.Element => {
  const classes = useStyles({ background });

  return (
    <div className={classes.root}>
      <Stepper
        sx={sx}
        className={clsx(className, classes.stepper)}
        activeStep={activeStep}
        alternativeLabel
        connector={<RegenStepConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
              classes={{
                alternativeLabel: classes.alternativeLabel,
              }}
              StepIconComponent={RegenStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default RegenStepper;
