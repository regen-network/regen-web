import React from 'react';
import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Stepper from 'web-components/lib/components/stepper';

type Props = {
  title: string;
  saveAndExit?: () => Promise<void>;
  activeStep: number;
};

const steps = ['Credit Basics', 'Recipient(s)', 'Review', 'Finished'];

const CreditBatchFormTemplate: React.FC<Props> = ({
  title,
  saveAndExit,
  activeStep,
  children,
}) => {
  return (
    <>
      <Stepper sx={{ mw: 240 }} steps={steps} activeStep={activeStep} />
      <OnBoardingSection title={title} onLinkClick={saveAndExit} formContainer>
        <Box minHeight="50vh">{children}</Box>
      </OnBoardingSection>
    </>
  );
};

export { CreditBatchFormTemplate };
