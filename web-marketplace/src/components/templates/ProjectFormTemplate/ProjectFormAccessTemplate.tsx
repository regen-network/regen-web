import React from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { ProjectDenied } from '../../organisms/ProjectDenied/ProjectDenied';
import { useParams } from 'react-router-dom';
import { DRAFT_ID } from 'pages/Dashboard/MyProjects/MyProjects.constants';

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
  const isAdmin =
    (adminAddr && adminAddr === wallet?.address) ||
    (offChainProject?.adminAccountId &&
      offChainProject?.adminAccountId === activeAccountId);
  const hasProject = !!onChainProject || !!offChainProject;
  const isDraft = !isEdit && !hasProject && projectId === DRAFT_ID;
  console.log('isDraft', isDraft);
  return (
    <>
      {!loading && !hasProject && !isDraft && <NotFoundPage />}
      {!loading && hasProject && !isAdmin && !isDraft && (
        <ProjectDenied
          isEdit={isEdit}
          address={adminAddr}
          projectId={onChainProject?.id || offChainProject?.id}
        />
      )}
      {!loading && ((hasProject && isAdmin) || isDraft) && <>{children}</>}
    </>
  );
};

export { ProjectFormAccessTemplate };
