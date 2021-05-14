import React from 'react';

import { BasicInfoForm, BasicInfoFormValues } from '../organisms';
import { OnboardingFormTemplate } from '../templates';

const BasicInfo: React.FC = () => {
  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: BasicInfoFormValues): Promise<void> {
    // TODO: functionality
  }

  return (
    <OnboardingFormTemplate
      activeStep={0}
      title="Basic Info"
      submit={submit}
      goBack={() => Promise.resolve()}
      goForward={() => Promise.resolve()}
      saveAndExit={saveAndExit}
    >
      <BasicInfoForm submit={submit} />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
