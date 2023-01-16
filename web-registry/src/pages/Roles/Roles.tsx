import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { RolesForm, RolesValues } from '../../components/organisms';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import { useWallet } from '../../lib/wallet/wallet';
import { useProjectEditContext } from '../ProjectEdit';
import { useRolesSubmit } from './hooks/useRolesSubmit';

const Roles: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { wallet } = useWallet();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, offChainProject } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
  });
  const { rolesSubmit } = useRolesSubmit({
    projectEditSubmit,
    offChainProject,
    metadata,
    isEdit,
  });

  // TODO validation regen-registry/issues/1501
  // const creditClassId = isEdit
  //   ? onChainProject?.classId
  //   : metadata?.['regen:creditClassId'];
  // const { data: graphData } = useShaclGraphByUriQuery({
  //   // do not fetch SHACL Graph until we get the creditClassId
  //   // this prevents from fetching this twice
  //   skip: !creditClassId,
  //   variables: {
  //     uri: getProjectShapeIri(creditClassId),
  //   },
  // });

  let initialValues: RolesValues = {
    // In edit mode, use existing on chain project admin
    // In creation mode, use current wallet address
    admin: isEdit ? onChainProject?.admin : wallet?.address,
  };
  if (metadata) {
    const projectDeveloper = {
      ...metadata['regen:projectDeveloper'],
      id: offChainProject?.partyByDeveloperId?.id,
    };
    initialValues = {
      ...initialValues,
      'regen:projectDeveloper': projectDeveloper,
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  const Form = (): JSX.Element => (
    <RolesForm
      submit={rolesSubmit}
      onNext={navigateNext}
      onPrev={navigatePrev}
      initialValues={initialValues}
      projectId={offChainProject?.id}
      // graphData={graphData}
    />
  );

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Roles"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { Roles };
