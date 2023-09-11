import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

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
  offChainProject?: OffChainProject;
  onChainProject?: ProjectInfo;
};

const ProjectFormTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  isEdit,
  title,
  saveAndExit,
  loading,
  offChainProject,
  onChainProject,
  children,
}) => {
  const adminAddr =
    onChainProject?.admin || offChainProject?.walletByAdminWalletId?.addr;
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const onChainId = onChainProject?.id || offChainProject?.onChainId;

  useEffect(() => {
    if (pathname.match(CREATE_PROJECT_URL_REGEX) && !!onChainId) {
      const newUrl = pathname.replace(
        CREATE_PROJECT_URL_REGEX,
        `/project-pages/${onChainId}/edit/$2`,
      );

      navigate(newUrl);
    }
  }, [pathname, onChainId, navigate]);

  return (
    <ProjectFormAccessTemplate
      isEdit={isEdit}
      loading={loading}
      onChainProject={onChainProject}
      offChainProject={offChainProject}
      adminAddr={adminAddr}
    >
      {!!onChainProject && isEdit && (
        <EditFormTemplate>{children}</EditFormTemplate>
      )}
      {!!offChainProject && !isEdit && (
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
