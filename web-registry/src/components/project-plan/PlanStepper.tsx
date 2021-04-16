import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import background from '../../assets/topography-pattern-full-1.png';
import Stepper from 'web-components/lib/components/stepper';

interface PlanStepperProps {
  activeStep: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    maxWidth: theme.spacing(240),
  },
}));

const steps = ['Project Plan', 'Sign Contracts', 'Project Page'];

const PlanStepper: React.FC<PlanStepperProps> = ({ activeStep }) => {
  const classes = useStyles();

  return (
    <Stepper className={classes.stepper} activeStep={activeStep} steps={steps} background={background} />
  );
};

export default PlanStepper;
