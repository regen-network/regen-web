import React, { useState } from 'react';

import PlanStepper from './PlanStepper';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { IncludesGrasslandsForm, IncludesGrasslandsValues } from './forms/IncludesGrasslandsForm';
import { AdditionalityForm, AdditionalityValues } from './forms/AdditionalityForm';

type FormInfo = {
  title: string;
  form: JSX.Element;
};

const Eligibility: React.FC = () => {
  const [step, setStep] = useState(1);

  const saveAndExit = (): void => {
    // TODO: functionality
  };

  const submitIncludesGrasslands = (values: IncludesGrasslandsValues): Promise<void> => {
    // TODO: functionality:
    // if includesGrasslands === true, next screen is 'Eligibility: Land Use History'
    // if includesGrasslands === false, next screen is 'Sorry, you are not eligible for this credit class.'
    setStep(2);
    return Promise.resolve();
  };

  async function submitAdditionality(values: AdditionalityValues): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  function getFormInfo(): FormInfo {
    switch (step) {
      case 2:
        return {
          title: 'Eligibility: Additionality',
          form: <AdditionalityForm submit={submitAdditionality} goBack={() => setStep(1)} />,
        };
      case 1:
      default:
        return {
          title: 'Eligibility',
          form: <IncludesGrasslandsForm submit={submitIncludesGrasslands} goForward={() => setStep(2)} />,
        };
    }
  }

  const { form, title } = getFormInfo();
  return (
    <>
      <PlanStepper activeStep={0} />
      <OnBoardingSection title={title} linkText="Save & Exit" onLinkClick={saveAndExit} formContainer>
        {form}
      </OnBoardingSection>
    </>
  );
};

export default Eligibility;
