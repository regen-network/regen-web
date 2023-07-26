import React from 'react';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';

type Props = {
  isEdit?: boolean;
  title: string;
  saveAndExit?: () => Promise<void>;
  loading: boolean;
  project?: OffChainProject;
};

const ProjectFormTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  isEdit,
  title,
  saveAndExit,
  loading,
  project,
  children,
}) => {
  return (
    <>
      {!loading && !project && <NotFoundPage />}
      {!!project && isEdit && <EditFormTemplate>{children}</EditFormTemplate>}
      {!!project && !isEdit && (
        <OnboardingFormTemplate
          activeStep={0}
          title={title}
          saveAndExit={saveAndExit}
        >
          {children}
        </OnboardingFormTemplate>
      )}
    </>
  );
};

export { ProjectFormTemplate };
