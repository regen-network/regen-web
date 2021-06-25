import React from 'react';
import { AdditionalityForm, AdditionalityValues } from '../components/organisms/AdditionalityForm';
import { OnboardingFormTemplate } from '../components/templates';

const Additionality: React.FC = () => {

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submitAdditionality(values: AdditionalityValues): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  return (
    <OnboardingFormTemplate activeStep={0} title="Eligibility" saveAndExit={saveAndExit}>
      <AdditionalityForm submit={submitAdditionality} />
    </OnboardingFormTemplate>
  );
};

export { Additionality };
