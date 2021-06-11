import React from 'react';
import { useHistory } from 'react-router-dom';

import { IncludesGrasslandsForm, IncludesGrasslandsValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';

const Eligibility: React.FC = () => {
  const history = useHistory();

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function next(): void {
    history.push('/project-plans/eligibility/additionality');
  }

  async function submitIncludesGrasslands(values: IncludesGrasslandsValues): Promise<void> {
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
      submit={submitIncludesGrasslands}
      goForward={next}
      saveAndExit={saveAndExit}
    >
      <IncludesGrasslandsForm submit={submitIncludesGrasslands} />
    </OnboardingFormTemplate>
  );
};

export { Eligibility };
