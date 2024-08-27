import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import WithLoader from 'components/atoms/WithLoader';
import { RolesForm } from 'components/organisms/RolesForm/RolesForm';
import { RolesFormSchemaType } from 'components/organisms/RolesForm/RolesForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useAuth } from '../../lib/auth/auth';
import { useWallet } from '../../lib/wallet/wallet';
import { useProjectEditContext } from '../ProjectEdit';
import { useRolesSubmit } from './hooks/useRolesSubmit';
import { getProjectStakeholderInitialValues } from './Roles.utils';

const Roles: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { wallet, loaded } = useWallet();
  const { navigateNext } = useNavigateNext({ step: 'description', projectId });
  const { activeAccount } = useAuth();

  const {
    isEdit,
    onChainProject,
    projectEditSubmit,
    isLoading: editContextLoading,
  } = useProjectEditContext();

  const {
    metadata,
    offChainProject,
    metadataReload,
    loading: withMetadataLoading,
  } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
    projectEditSubmit,
    navigateNext,
  });
  const { rolesSubmit } = useRolesSubmit({
    projectEditSubmit,
    offChainProject,
    onChainProject,
    metadata,
    isEdit,
    metadataReload,
    navigateNext,
    admin: onChainProject?.admin,
  });

  const projectDeveloper = offChainProject?.accountByDeveloperId;
  const verifier = offChainProject?.accountByVerifierId;

  const initialValues: RolesFormSchemaType = useMemo(
    () => ({
      // In edit mode, use existing on chain project admin
      // In creation mode, use active account wallet address
      admin: (isEdit ? onChainProject?.admin : activeAccount?.addr) || '',
      projectDeveloper: getProjectStakeholderInitialValues(_, projectDeveloper),
      verifier: getProjectStakeholderInitialValues(_, verifier),
    }),
    [
      isEdit,
      onChainProject?.admin,
      activeAccount?.addr,
      _,
      projectDeveloper,
      verifier,
    ],
  );

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title={_(msg`Roles`)}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={withMetadataLoading}
    >
      <WithLoader isLoading={!loaded || editContextLoading}>
        <RolesForm
          submit={rolesSubmit}
          onPrev={navigatePrev}
          initialValues={initialValues}
          isOnChain={
            !editContextLoading && !!onChainProject && !!wallet?.address
          }
          projectId={offChainProject?.id}
        />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Roles };
