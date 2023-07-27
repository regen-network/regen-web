import React from 'react';

import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';
import { ProjectFormAccessTemplate } from './ProjectFormAccessTemplate';

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
  const adminAddr = project?.walletByAdminWalletId?.addr;
  return (
    <ProjectFormAccessTemplate
      loading={loading}
      project={project}
      adminAddr={adminAddr}
    >
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
    </ProjectFormAccessTemplate>
  );
};

export { ProjectFormTemplate };
