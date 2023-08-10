import React from 'react';

import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { ProjectDenied } from '../../organisms/ProjectDenied/ProjectDenied';

type Props = {
  adminAddr?: string;
  loading: boolean;
  project?: OffChainProject;
};

const ProjectFormAccessTemplate: React.FC<React.PropsWithChildren<Props>> = ({
  adminAddr,
  loading,
  project,
  children,
}) => {
  const { wallet } = useWallet();
  const isAdmin = adminAddr && adminAddr === wallet?.address;
  return (
    <>
      {!loading && !project && <NotFoundPage />}
      {!!project && !isAdmin && (
        <ProjectDenied address={adminAddr} projectId={project.id} />
      )}
      {!!project && isAdmin && <>{children}</>}
    </>
  );
};

export { ProjectFormAccessTemplate };
