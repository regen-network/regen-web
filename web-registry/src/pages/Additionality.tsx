import React from 'react';
import { useHistory } from 'react-router-dom';
import { AdditionalityForm, AdditionalityValues } from '../components/organisms/AdditionalityForm';
import { OnboardingFormTemplate } from '../components/templates';

const Additionality: React.FC = () => {
  const history = useHistory();

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submitAdditionality(values: AdditionalityValues): Promise<void> {
    // TODO
    return Promise.resolve();
  }

  return (
    <OnboardingFormTemplate
      activeStep={0}
      title="Eligibility"
      submit={submitAdditionality}
      goBack={() => history.push('/project-plans/eligibility')}
      goForward={() => Promise.resolve()}
      saveAndExit={saveAndExit}
    >
      <AdditionalityForm submit={submitAdditionality} />
    </OnboardingFormTemplate>
  );
};

export { Additionality };
