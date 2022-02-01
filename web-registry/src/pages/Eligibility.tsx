import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IncludesGrasslandsForm,
  IncludesGrasslandsValues,
} from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';

const Eligibility: React.FC = () => {
  const navigate = useNavigate();

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

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
    <OnboardingFormTemplate
      activeStep={0}
      title="Eligibility"
      saveAndExit={saveAndExit}
    >
      <IncludesGrasslandsForm submit={submitIncludesGrasslands} />
    </OnboardingFormTemplate>
  );
};

export { Eligibility };
