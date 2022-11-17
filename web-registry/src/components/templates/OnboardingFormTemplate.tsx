import React from 'react';
import Box from '@mui/material/Box';

import { Loading } from 'web-components/lib/components/loading';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { PlanStepper } from '../molecules';

type Props = {
  title: string;
  activeStep: number;
  loading?: boolean;
  saveAndExit?: () => Promise<void>;
};

const OnboardingFormTemplate: React.FC<React.PropsWithChildren<Props>> =
  props => {
    return (
      <Box sx={{ bgcolor: 'grey.50' }}>
        <PlanStepper activeStep={props.activeStep} />
        <OnBoardingSection
          title={props.title}
          formContainer
          // Only commenting this for now if at some point,
          // we want to add back the "save & exit" feature
          // https://github.com/regen-network/regen-registry/issues/553
          // linkText="Save & Exit"
          // onLinkClick={props.saveAndExit}
          // exampleProjectUrl="/projects/wilmot"
        >
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
