import React from 'react';

import {
  AdditionalityForm,
  AdditionalityValues,
} from '../../components/organisms/AdditionalityForm';
import { OnboardingFormTemplate } from '../../components/templates';

const Additionality: React.FC<React.PropsWithChildren<unknown>> = () => {
  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submitAdditionality(
    values: AdditionalityValues,
  ): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  return (
    <OnboardingFormTemplate activeStep={0} title="Eligibility">
      <AdditionalityForm submit={submitAdditionality} />
    </OnboardingFormTemplate>
  );
};

export { Additionality };
