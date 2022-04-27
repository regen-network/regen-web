import React from 'react';
import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { BatchStepper } from '../molecules';

type Props = {
  title: string;
  saveAndExit?: () => Promise<void>;
  activeStep: number;
};

const CreditBatchFormTemplate: React.FC<Props> = ({
  title,
  saveAndExit,
  activeStep,
  children,
}) => {
  return (
    <>
      <BatchStepper activeStep={activeStep} />
      <OnBoardingSection
        title={title}
        // linkText="Save & Exit"
        onLinkClick={saveAndExit}
        formContainer
      >
        <Box minHeight="50vh">{children}</Box>
      </OnBoardingSection>
    </>
  );
};

export { CreditBatchFormTemplate };
