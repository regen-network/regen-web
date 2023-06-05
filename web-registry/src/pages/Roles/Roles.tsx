import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import WithLoader from 'components/atoms/WithLoader';
import { RolesForm } from 'components/organisms/RolesForm/RolesForm';
import { RolesFormSchemaType } from 'components/organisms/RolesForm/RolesForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useWallet } from '../../lib/wallet/wallet';
import { useProjectEditContext } from '../ProjectEdit';
import { useRolesSubmit } from './hooks/useRolesSubmit';
import { getProjectStakeholderInitialValues } from './Roles.utils';

const Roles: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { wallet, loaded } = useWallet();
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
    metadata,
    isEdit,
    metadataReload,
    navigateNext,
  });

  const projectDeveloper = offChainProject?.partyByDeveloperId;
  const verifier = offChainProject?.partyByVerifierId;

  const initialValues: RolesFormSchemaType = useMemo(
    () => ({
      // In edit mode, use existing on chain project admin
      // In creation mode, use current wallet address
      admin: (isEdit ? onChainProject?.admin : wallet?.address) || '',
      projectDeveloper: getProjectStakeholderInitialValues(projectDeveloper),
      verifier: getProjectStakeholderInitialValues(verifier),
    }),
    [
      isEdit,
      onChainProject?.admin,
      projectDeveloper,
      verifier,
      wallet?.address,
    ],
  );

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Roles"
      saveAndExit={saveAndExit}
    >
      <WithLoader
        isLoading={!loaded || editContextLoading || withMetadataLoading}
      >
        <RolesForm
          submit={rolesSubmit}
          onNext={navigateNext}
          onPrev={navigatePrev}
          initialValues={initialValues}
        />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Roles };
