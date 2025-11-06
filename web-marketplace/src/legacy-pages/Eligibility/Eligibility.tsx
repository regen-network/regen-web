import React from 'react';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import {
  IncludesGrasslandsForm,
  IncludesGrasslandsValues,
} from '../../components/organisms';
import { OnboardingFormTemplate } from '../../components/templates';

const Eligibility: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  function next(): void {
    navigate('/project-plans/eligibility/additionality');
  }

  async function submitIncludesGrasslands(
    values: IncludesGrasslandsValues,
  ): Promise<void> {
    // TODO: functionality:
    // if includesGrasslands === true, next screen is 'Eligibility: Land Use History'
    // if includesGrasslands === false, next screen is 'Sorry, you are not eligible for this credit class.'
    // setStep(2);
    next();
    return Promise.resolve();
  }

  return (
    <OnboardingFormTemplate activeStep={0} title={_(msg`Eligibility`)}>
      <IncludesGrasslandsForm submit={submitIncludesGrasslands} />
    </OnboardingFormTemplate>
  );
};

export { Eligibility };
