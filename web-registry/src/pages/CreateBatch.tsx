import React, { useState } from 'react';
import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Stepper from 'web-components/lib/components/stepper';

import {
  BatchBasicsForm,
  BatchBasicsFormValues,
} from '../components/organisms/BatchBasicsForm';

const steps = [
  { stepName: 'Credit Basics', sectionTitle: 'Create Credit Batch' },
  { stepName: 'Recipients', sectionTitle: 'Recipients' },
  { stepName: 'Review', sectionTitle: 'Review' },
  { stepName: 'Finished', sectionTitle: '' }, // This step title will depend on success|error state; Can be handled in component.
];

const CreateBatch: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBasicsSubmit = (values: BatchBasicsFormValues): Promise<void> => {
    // console.log(JSON.stringify(values)); // TODO: set values to parent context in issues/regen-network/regen-registry/899
    setActiveStep(1);
    return Promise.resolve();
  };

  return (
    <>
      <Stepper
        sx={{ mw: 240 }}
        steps={steps.map(step => step.stepName)}
        activeStep={activeStep}
        onStepClick={(stepIndex: number) => setActiveStep(stepIndex)}
      />
      <OnBoardingSection title={steps[activeStep].sectionTitle} formContainer>
        <Box minHeight="50vh">
          {activeStep === 0 && <BatchBasicsForm submit={handleBasicsSubmit} />}
        </Box>
      </OnBoardingSection>
    </>
  );
};

export { CreateBatch };
