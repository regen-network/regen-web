import React from 'react';

import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

import { EditFormTemplate } from './EditFormTemplate';
import { OnboardingFormTemplate } from './OnboardingFormTemplate';
import { ProjectDenied } from './Project.Denied';

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
  const { wallet } = useWallet();
  const adminAddr = project?.walletByAdminWalletId?.addr;
  return (
    <>
      {!loading && !project && <NotFoundPage />}
      {!!project && adminAddr !== wallet?.address ? (
        <ProjectDenied address={adminAddr} projectId={project.id} />
      ) : (
        <>
          {!!project && isEdit && (
            <EditFormTemplate>{children}</EditFormTemplate>
          )}
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
      )}
    </>
  );
};

export { ProjectFormTemplate };
