import React from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import {
  AdditionalityForm,
  AdditionalityValues,
} from '../../components/organisms/AdditionalityForm';
import { OnboardingFormTemplate } from '../../components/templates';

const Additionality: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();

  async function submitAdditionality(
    values: AdditionalityValues,
  ): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  return (
    <OnboardingFormTemplate activeStep={0} title={_(msg`Eligibility`)}>
      <AdditionalityForm submit={submitAdditionality} />
    </OnboardingFormTemplate>
  );
};

export { Additionality };
