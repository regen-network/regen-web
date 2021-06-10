import React from 'react';
import { useHistory } from 'react-router-dom';

import PlanStepper from '../../PlanStepper';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { AdditionalityForm, AdditionalityValues } from './AdditionalityForm';

const Additionality: React.FC = () => {
  const history = useHistory();

  function saveAndExit(): void {
    // TODO: functionality
  }

  async function submitAdditionality(values: AdditionalityValues): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  return (
    <>
      <PlanStepper activeStep={0} />
      <OnBoardingSection
        formContainer
        title="Eligibility: Additionality"
        linkText="Save & Exit"
        onLinkClick={saveAndExit}
      >
        <AdditionalityForm
          submit={submitAdditionality}
          goBack={() => history.push('/project-plans/eligibility')}
        />
      </OnBoardingSection>
    </>
  );
};

export { Additionality };
