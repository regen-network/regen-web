import React from 'react';
import { makeStyles } from '@mui/styles';

import background from '../../assets/topography-pattern-full-1.png';
import Stepper from 'web-components/lib/components/stepper';
import { Theme } from 'web-components/lib/theme/muiTheme';

interface PlanStepperProps {
  activeStep: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    maxWidth: theme.spacing(240),
  },
}));

const steps = ['Project Page', 'Finished'];

const PlanStepper: React.FC<PlanStepperProps> = ({ activeStep }) => {
  const classes = useStyles();

  return (
    <Stepper
      className={classes.stepper}
      activeStep={activeStep}
      steps={steps}
      background={background}
    />
  );
};

export { PlanStepper };
