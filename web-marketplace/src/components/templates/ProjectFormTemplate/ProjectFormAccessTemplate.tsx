import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useCanAccessManageProjectWithRole } from 'legacy-pages/Dashboard/MyProjects/hooks/useCanAccessManageProjectWithRole';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { Loading } from 'web-components/src/components/loading';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { getCanEditProject } from 'components/templates/ProjectFormTemplate/ProjectFormAccessTemplate.utils';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { ProjectDenied } from '../../organisms/ProjectDenied/ProjectDenied';

type Props = {
  adminAddr?: string | null;
  loading: boolean;
  offChainProject?: OffChainProject;
  onChainProject?: ProjectInfo;
  isEdit?: boolean;
};

const ProjectFormAccessTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  adminAddr,
  loading,
  offChainProject,
  onChainProject,
  children,
  isEdit,
}) => {
  const { projectId } = useParams();
  const { wallet } = useWallet();
  const { activeAccountId } = useAuth();
  const { role } = useCanAccessManageProjectWithRole({
    onChainProject,
    offChainProject,
    activeAccountId,
    wallet,
  });
  const { canEdit } = getCanEditProject({
    role,
  });
  const hasProject = !!onChainProject || !!offChainProject;
  const isDraft = !isEdit && !hasProject && projectId === DRAFT_ID;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!hasProject && !isDraft && <NotFoundPage />}
      {hasProject && !canEdit && !isDraft && (
        <ProjectDenied
          isEdit={isEdit}
          address={adminAddr}
          projectId={onChainProject?.id || offChainProject?.id}
        />
      )}
      {((hasProject && canEdit) || isDraft) && <>{children}</>}
    </>
  );
};

export { ProjectFormAccessTemplate };
