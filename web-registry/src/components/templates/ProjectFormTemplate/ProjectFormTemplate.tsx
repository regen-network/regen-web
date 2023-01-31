import React from 'react';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';

type Props = {
  isEdit?: boolean;
  title: string;
  saveAndExit?: () => Promise<void>;
};

const ProjectFormTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  isEdit,
  title,
  saveAndExit,
  children,
}) => {
  return isEdit ? (
    <EditFormTemplate>{children}</EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title={title}
      saveAndExit={saveAndExit}
    >
      {children}
    </OnboardingFormTemplate>
  );
};

export { ProjectFormTemplate };
