import React from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
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
  const { wallet } = useWallet();
  const isAdmin = adminAddr && adminAddr === wallet?.address;
  const hasProject = !!onChainProject || !!offChainProject;

  return (
    <>
      {!loading && !hasProject && <NotFoundPage />}
      {!loading && hasProject && !isAdmin && (
        <ProjectDenied
          isEdit={isEdit}
          address={adminAddr}
          projectId={onChainProject?.id || offChainProject?.id}
        />
      )}
      {!loading && hasProject && isAdmin && <>{children}</>}
    </>
  );
};

export { ProjectFormAccessTemplate };
