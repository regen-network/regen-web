import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';
import { ProjectFormAccessTemplate } from './ProjectFormAccessTemplate';
import { CREATE_PROJECT_URL_REGEX } from './ProjectFormTemplate.constants';

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
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { onChainId } = project ?? {};

  useEffect(() => {
    if (pathname.match(CREATE_PROJECT_URL_REGEX) && !!onChainId) {
      const newUrl = pathname.replace(
        CREATE_PROJECT_URL_REGEX,
        `/project-pages/${onChainId}/edit/$2`,
      );

      navigate(newUrl);
    }
  }, [project, pathname, onChainId, navigate]);

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
