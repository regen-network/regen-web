import React from 'react';
import { useHistory } from 'react-router-dom';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import PlanStepper from '../PlanStepper';
import { IncludesGrasslandsForm, IncludesGrasslandsValues } from './IncludesGrasslandsForm';

const Eligibility: React.FC = () => {
  const history = useHistory();

  function saveAndExit(): void {
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
    <>
      <PlanStepper activeStep={0} />
      <OnBoardingSection title="Eligibility" linkText="Save & Exit" onLinkClick={saveAndExit} formContainer>
        <IncludesGrasslandsForm submit={submitIncludesGrasslands} goForward={() => next()} />
      </OnBoardingSection>
    </>
  );
};

export { Eligibility };
