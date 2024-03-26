import React from 'react';
import Box from '@mui/material/Box';

import { Loading } from 'web-components/src/components/loading';
import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';

import { PlanStepper } from '../../molecules';

type Props = {
  title: string;
  activeStep: number;
  loading?: boolean;
};

const OnboardingFormTemplate: React.FC<React.PropsWithChildren<Props>> =
  props => {
    return (
      <Box sx={{ bgcolor: 'grey.50' }}>
        <PlanStepper activeStep={props.activeStep} />
        <OnBoardingSection title={props.title} formContainer>
          {props.loading ? (
            <Loading />
          ) : (
            <Box minHeight="50vh">{props.children}</Box>
          )}
        </OnBoardingSection>
      </Box>
    );
  };

export { OnboardingFormTemplate };
