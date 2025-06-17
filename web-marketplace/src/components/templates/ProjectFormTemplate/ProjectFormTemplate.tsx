import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';

import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';
import { ProjectFormAccessTemplate } from './ProjectFormAccessTemplate';
import { CREATE_PROJECT_URL_REGEX } from './ProjectFormTemplate.constants';

type Props = {
  isEdit?: boolean;
  title: string;
  loading: boolean;
  offChainProject?: OffChainProject;
  onChainProject?: ProjectInfo;
};

const ProjectFormTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  isEdit,
  title,
  loading,
  offChainProject,
  onChainProject,
  children,
}) => {
  const { projectId } = useParams();
  const adminAddr =
    onChainProject?.admin || offChainProject?.accountByAdminAccountId?.addr;
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
      {isEdit &&
        (!!onChainProject ||
          (!onChainProject && offChainProject?.published)) && (
          <EditFormTemplate>{children}</EditFormTemplate>
        )}
      {(!!offChainProject || projectId === DRAFT_ID) && !isEdit && (
        <OnboardingFormTemplate activeStep={0} title={title}>
          {children}
        </OnboardingFormTemplate>
      )}
    </ProjectFormAccessTemplate>
  );
};

export { ProjectFormTemplate };
