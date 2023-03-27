import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { RolesForm, RolesFormValues } from '../../components/organisms';
import { useWallet } from '../../lib/wallet/wallet';
import { useProjectEditContext } from '../ProjectEdit';
import { useRolesSubmit } from './hooks/useRolesSubmit';

const Roles: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { wallet } = useWallet();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, offChainProject, metadataReload } = useProjectWithMetadata({
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
  const [initialValues, setInitialValues] = useState<RolesFormValues>();

  useEffect(() => {
    let values: RolesFormValues = {
      // In edit mode, use existing on chain project admin
      // In creation mode, use current wallet address
      admin: isEdit ? onChainProject?.admin : wallet?.address,
    };
    if (
      metadata?.['regen:projectDeveloper'] &&
      offChainProject?.partyByDeveloperId?.id
    ) {
      const projectDeveloper = {
        ...metadata['regen:projectDeveloper'],
        id: offChainProject.partyByDeveloperId.id,
      };
      values = {
        ...values,
        'regen:projectDeveloper': projectDeveloper,
      };
    }
    setInitialValues(values);
  }, [
    isEdit,
    metadata,
    offChainProject?.partyByDeveloperId?.id,
    onChainProject?.admin,
    wallet?.address,
  ]);

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
      <RolesForm
        submit={rolesSubmit}
        onNext={navigateNext}
        onPrev={navigatePrev}
        initialValues={initialValues}
        projectId={offChainProject?.id}
        // graphData={graphData}
      />
    </ProjectFormTemplate>
  );
};

export { Roles };
